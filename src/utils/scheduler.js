const cron = require('node-cron');

// Schedule a cron job to run every week at 12:00 AM on Monday
const runCronJob = (fn) => {
    try {
        cron.schedule(process.env.CRON_FREQUENCY_FOR_ADMIN_EMAIL, async () => {
            await fn();
        });
    } catch (error) {
        console.error('Error occurred while scheduling email:', error);
    }
};

module.exports = { runCronJob };