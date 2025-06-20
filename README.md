# jetclientDev

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```


JetBet Crash Game Integration
Overview
This repository contains a Vue.js-based web application for the "JetBet" platform, featuring a crash game integrated with a Node.js backend. The application handles user authentication, game token generation, and balance updates via webhooks from your game provider. Developed as of 07:17 PM EAT on Wednesday, June 18, 2025, this codebase is designed for both development and production environments with proper security considerations.
Code Structure
Directory Layout
jetclientDev/
├── node_modules/          # Node.js dependencies
├── public/               # Static assets
│   ├── index.html        # Main HTML file
├── src/                  # Source code
│   ├── assets/           # CSS and images
│   │   ├── base.css
│   │   ├── logo.svg
│   │   ├── main.css
│   ├── components/       # Vue components
│   │   ├── CrashGame.vue # Game interface
│   │   ├── Login.vue     # Login form
│   │   ├── Register.vue  # Registration form
│   ├── services/         # Utility services
│   │   ├── gameService.js # Game iframe generation
│   │   ├── jwtService.js # JWT handling
│   ├── stores/           # Pinia stores
│   │   ├── auth.js      # Authentication state
│   ├── views/            # Vue components
│   │   ├── App.vue      # Root component
│   ├── controllers/      # Backend controllers
│   │   ├── gameWebhookController.js # Webhook handling
│   ├── middleware/       # Authentication middleware
│   │   ├── webhookAuth.js # Webhook authentication
│   ├── routes/           # API routes
│   │   ├── gameRoutes.js # Webhook and token endpoints
├── .gitignore            # Git ignore file
├── jsconfig.json         # JavaScript configuration
├── package-lock.json     # Dependency lock file
├── package.json          # Project dependencies
├── README.md             # This file
├── vite.config.js        # Vite configuration
├── .env                  # Environment variables

Functionality

User Authentication

Users can log in or register via simple forms (Login.vue, Register.vue).
Authentication state is managed in a Pinia store (auth.js).


Game Integration

A JSON Web Token (JWT) is generated using jwtService.js and embedded in an iframe (CrashGame.vue) to load your game.
The iframe URL is constructed with a base URL (VUE_APP_GAME_URL) and token as a query parameter.


Webhook Processing

Your game provider sends webhook data to the /game/webhook endpoint.
The backend (gameWebhookController.js) verifies the signature (x-game-signature) using HMAC-SHA256 and updates user balances.
The webhookAuth.js middleware ensures secure webhook authentication.


Balance Updates

Webhook data (e.g., status, payout, bet_amount) is processed to adjust the user's balance.
The frontend listens for postMessage events from the iframe to sync balance changes in real-time.



Prerequisites

Node.js: Version 14 or higher.
Dependencies: Install with npm install.
Required packages: express, jsonwebtoken, pinia, vue, crypto-js.


Environment Variables: Configure in .env:
WEBHOOK_SECRET: Secret key for signature verification.
VUE_APP_CLIENT_ID: Client ID for JWT.
VUE_APP_SHARED_SECRET: Secret for JWT signing.
VUE_APP_GAME_URL: Base URL of your game provider.



Setup Instructions

Clone the Repository
git clone <repository-url>


Install Dependencies
Navigate to the project directory: cd jetclientDev
Run: npm install


Configure Environment Variables
Create a .env file in the root directory and add the required variables.
Example:WEBHOOK_SECRET=your-secret-key
VUE_APP_CLIENT_ID=your-client-id
VUE_APP_SHARED_SECRET=your-shared-secret
VUE_APP_GAME_URL=https://api.yourgameprovider.com




Start the Development Server
Run: npm run dev
The application will be available at http://localhost:5173.


Build for Production
Run: npm run build
This generates a dist folder with production-ready files.



Deployment Notes

Server Setup: Deploy the Node.js backend on a server (e.g., Heroku, AWS, or a VPS) with a public URL for webhook access.
Frontend Hosting: Serve the dist folder using a static file server (e.g., Nginx, Netlify).
Security: Use HTTPS and a reverse proxy (e.g., NGINX) to handle requests securely.
Webhook URL: Provide your server’s /game/webhook endpoint to the game provider.

Integration with Your Provider

Webhook Endpoint: Send POST requests to http://your-server-domain/game/webhook with a x-game-signature header.
Payload Requirements:
Required fields: user_id, bet_amount, status, timestamp.
Optional fields: payout, crash_point, transaction_id.


Signature: Use HMAC-SHA256 with the shared WEBHOOK_SECRET.


Game URL: Provide the game URL to be set as VUE_APP_GAME_URL.
Message Events: Use postMessage to send webhook data to the iframe with type: 'webhook' and a payload object matching the webhook structure.

Security Notes

JWT Generation: Currently client-side for development. For production, implement server-side token generation via an API endpoint (e.g., /game/token).
Signature Verification: Ensure your webhook signatures match the HMAC-SHA256 algorithm with the shared secret.
Origin Validation: The iframe origin is set to https://api.yourgameprovider.com in CrashGame.vue. Update this to match your domain.
Environment Security: Keep .env files out of version control (already in .gitignore).

Troubleshooting

Missing Dependencies: Run npm install if errors occur during startup.
Webhook 401 Errors: Verify the x-game-signature and WEBHOOK_SECRET.
Iframe Not Loading: Check VUE_APP_GAME_URL and ensure the token is valid.
Balance Sync Issues: Ensure postMessage events are sent with the correct type and payload.

Contributing

Submit issues or pull requests for improvements via the repository.
Contact the developer at [your-email@example.com] for support or collaboration.

License
This project is licensed under the MIT License. See the LICENSE file for details.
MIT License

Copyright (c) 2025 [Your Name/Organization]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

