import fs from 'fs-extra';
import server from './server.js'
import express from 'express'
import pug from 'pug'

export default async function website() {

    try {

        const app = express()
        const config = fs.readJsonSync('./config.json')

        app.use(express.static('./server/www'));
        
        app.get('/', (req, res) => {

            let Options = {

                title: `${config.title}`,
                web_home: `https://${config.domain}`,
                web_telegram: `https://${config.domain}/telegram`,
                web_whatsapp: `https://${config.domain}/whatsapp`
            }
            let render = pug.renderFile('./server/www/index.pug',Options);
        
            return res.send(render)
            
        });

        app.get('/telegram',function(req, res) {

            let file_json = fs.readJsonSync('./telegram/db/media.json')
            let Options = {

                title: `${config.title}`,
                json_db: file_json,   
                web_home: `https://${config.domain}`,
                web_telegram: `https://${config.domain}/telegram`,
                web_whatsapp: `https://${config.domain}/whatsapp`
            }
            let render = pug.renderFile('./server/www/telegram/index.pug',Options);
        
            return res.send(render)
            
        });

        app.get('/whatsapp',function(req, res) {

            let file_json = fs.readJsonSync('./whatsapp/db/media.json')
            let Options = {

                title: `${config.title}`,
                json_db: file_json,   
                web_home: `https://${config.domain}`,
                web_telegram: `https://${config.domain}/telegram`,
                web_whatsapp: `https://${config.domain}/whatsapp`
            }
            let render = pug.renderFile('./server/www/whatsapp/index.pug',Options);
        
            return res.send(render)
            
        });

        app.get('/telegram/:id',function(req, res) {

            let json_media = fs.readJsonSync('./Telegram/db/media.json')

            for (let lop of json_media) {

                if (req.params.id === lop.FileName) {

                    let render = pug.renderFile(`./server/www/Telegram/html/${lop.FileName}.pug`);
                    
                    return res.send(render);

                }
                
            }
            
        });

        app.get('/whatsapp/:id',function(req, res) {


            let json_media = fs.readJsonSync('./whatsapp/db/media.json')

            for (let lop of json_media) {

                if (req.params.id === lop.FileName){

                    let render = pug.renderFile(`./server/www/whatsapp/html/${lop.FileName}.pug`);
                    
                    return res.status(200).send(render);

                }
                
            }
            
        });

        app.get('*',function(req, res) {

            return res.send('ERrOOr')
            
        });


        server(app);

    } catch(error) {

        console.log(error.toString())
    }
    
}