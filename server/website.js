import fs from 'fs-extra';
import server from './server.js'
import express from 'express'
import path from 'path'
import pug from 'pug'

export default async function website() {

    try {

        const app = express()
        const config = fs.readJsonSync('./config.json')


        app.use(express.static('./server/www'))
        app.get('/', (req, res) => {

            let file_json = fs.readJsonSync('./Telegram/db/photo.json')
            let Options = {

                title: `${config.title}`,
                json_db: file_json,   
                web_home: `https://${config.domain}`,
                web_photo: `https://${config.domain}/photo`,
                web_video: `https://${config.domain}/video`
            }

            let render = pug.renderFile('./server/www/index.pug',Options);
        
            return res.send(render)
            
        });

        app.get('/:id', async function(req, res) {

            

            let json_photo = fs.readJsonSync('./Telegram/db/photo.json')
            let json_video = fs.readJsonSync('./Telegram/db/video.json')

            for (const lop of json_photo) {

                if (req.params.id === lop.FileName){

                    let Options = {

                        title: `${config.title}`,
                        web_home: `https://${config.domain}`,
                        web_photo: `https://${config.domain}/photo`,
                        web_video: `https://${config.domain}/video`
                    }
                    let render = pug.renderFile(`./server/www/photo/html/${lop.FileName}.pug`,Options);
                    
                    return res.status(200).send(render);

                }
                
            }

            for (const lop of json_video) {

                if (req.params.id === lop.FileName){

                    let Options = {

                        title: `${config.title}`,
                        web_home: `https://${config.domain}`,
                        web_photo: `https://${config.domain}/photo`,
                        web_video: `https://${config.domain}/video`
                    }
                    let render = pug.renderFile(`./server/www/video/html/${lop.FileName}.pug`,Options);
                    
                    return res.status(200).send(render);

                }
                
            }

            if (req.params.id === "photo"){

                let file_json = fs.readJsonSync('./Telegram/db/photo.json')
                let Options = {

                    title: `${config.title}`,
                    json_db: file_json,   
                    web_home: `https://${config.domain}`,
                    web_photo: `https://${config.domain}/photo`,
                    web_video: `https://${config.domain}/video`
                }
                let render = pug.renderFile('./server/www/photo/index.pug',Options);
            
                return res.send(render)
            }

            else if (req.params.id === "video"){

                let file_json = fs.readJsonSync('./Telegram/db/video.json')
                let Options = {

                    title: `${config.title}`,
                    json_db: file_json,   
                    web_home: `https://${config.domain}`,
                    web_photo: `https://${config.domain}/photo`,
                    web_video: `https://${config.domain}/video`
                }
                let render = pug.renderFile('./server/www/video/index.pug',Options);
            
                return res.send(render)
            }

            else { return res.send('Error') }


        });

        app.get('*',function(req, res) {

            return res.send('ERrOOr')
            
        })


        server(app);

    } catch(error) {

        console.log(error.toString())
    }
    
}