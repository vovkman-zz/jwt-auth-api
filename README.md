# GigHub Auth API

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

## Logging onto server

on mac run this in the terminal in the file with LASH_BackEnd.pem
`ssh -i "LASH_BackEnd.pem" ubuntu@34.197.204.154`

## Connection Issues

If the server restarts, you need to re issue the port forwarding command to redirect requests
on port 80 to 3000. This command should be moved to a start up script in the future.

`sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 3000`