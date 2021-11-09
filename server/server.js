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

        https.createServer({ key, cert }, app) .listen(port_https);
        http.createServer(app).listen(port_http);

    } catch(error) {

        console.log(error.toString());
    }
}

/* 

let name = 'ryan'
let msg = 'Hello'
let user = fs.readJsonSync('./user.json')
let db_user = { name: name , msg: msg }
user.name = 'r2' 
fs.writeJsonSync('./user.json', user);


*/
