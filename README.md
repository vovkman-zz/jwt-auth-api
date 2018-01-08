# JWT Auth API

This is an API to support user creation and authentication. It uses stateless
authentication by leveraging JWT's. Passwords are stored and encrypted using the
bcrypt package.

## Installation and Usage

1. clone the repository
2. `cd jwt-auth-api`
3. `npm install`
4. `npm run unix-dev` for mac, `npm run win-dev` for windows

in production, install the pm2 npm module, then run
`pm2 start pm2-conf.json --env production`
