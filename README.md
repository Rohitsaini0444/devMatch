# devConnect

## Overview
`devConnect` is a developer networking backend built with Node.js, Express, and MongoDB. It enables developers to sign up, log in, manage profiles, and connect with other developers through interest-based requests.

## Features
- User registration and authentication
- Profile viewing and editing
- Password updates
- Connection requests with interested/rejected flow
- User feed and connection discovery

## Requirements
- Node.js 18+ recommended
- MongoDB connection

## Installation
```bash
git clone <repository-url>
cd devConnect
npm install
```

## Environment
Create a `.env` file in the project root with at least:
```env
MONGODB_URI=<your-mongo-connection-string>
JWT_SECRET=<your-jwt-secret>
```

## Running the app
```bash
npm start
```

For local development with automatic reloads:
```bash
npm run dev
```

## API Endpoints
### Auth
- `POST /auth/signup` — Register a new user
- `POST /auth/login` — Log in and receive an auth cookie
- `POST /auth/logout` — Log out the current user

### Profile
- `GET /profile/view` — Get the authenticated user's profile
- `PATCH /profile/edit` — Update the authenticated user's profile
- `PATCH /profile/password` — Change the authenticated user's password

### Requests
- `POST /request/send/:status/:userId` — Send a connection request (`interested` or `ignored`)
- `POST /request/review/:status/:requestId` — Review a received request (`accepted` or `rejected`)

### User
- `GET /user/user/requests/received` — Get received pending requests
- `GET /user/user/connections` — Get accepted connections
- `GET /user/feed` — Get a feed of suggested users

## Notes
- The application expects JWT authentication and uses cookies to store the token.
- The backend API is currently structured around Express routers and MongoDB models.

## License
MIT
