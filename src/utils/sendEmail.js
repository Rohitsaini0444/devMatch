const { SendEmailCommand } = require('@aws-sdk/client-ses');
const { sesClient } = require('./sesClient.js');
const { SENDER_EMAIL_ADDRESS } = process.env;

const createSendEmailCommand = (toAddress, subject, body) => {
    return new SendEmailCommand({
        Destination: {
            CcAddresses: [
            ],
            ToAddresses: [
                toAddress,
            ],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: body
                },
                Text: {
                    Charset: "UTF-8",
                    Data: body,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: subject,
            },
        },
        Source: SENDER_EMAIL_ADDRESS,
        ReplyToAddresses: [],
    });
};

const run = async (subject, body, toAddress) => {
    const sendEmailCommand = createSendEmailCommand(
        toAddress,
        subject,
        body
    );

    try {
        return await sesClient.send(sendEmailCommand);
    } catch (caught) {
        if (caught instanceof Error && caught.name === "MessageRejected") {
            //   /** @type { import('@aws-sdk/client-ses').MessageRejected} */
            const messageRejectedError = caught;
            return messageRejectedError;
        }
        throw caught;
    }
};

module.exports = { run };