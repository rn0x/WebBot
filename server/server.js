import fs from 'fs-extra';
import https from 'https';
import http from 'http';
import website from './website.js';

export default function server(app) {

    try {

        const port_https = 443;
        const port_http = 80;
        const key = fs.readFileSync('./server/ssl/server.key', 'utf8');
        const cert = fs.readFileSync('./server/ssl/server.crt', 'utf8');
        const config = fs.readJsonSync('./config.json');

        https.createServer({ key, cert }, app) .listen(port_https);
        http.createServer(app).listen(port_http);

        console.log(`Website Link LocalHost https://localhost or http://localhost`)
        console.log(`Website Link Domain https://${config.domain} or http://${config.domain}`)

    } catch(error) {

        console.log(error.toString());
    }
}