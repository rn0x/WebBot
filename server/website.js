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
        
            res.send(render)
            
        });

        app.get('/photo', (req, res) => {

            let file_json = fs.readJsonSync('./Telegram/db/photo.json')
            let Options = {

                title: `${config.title}`,
                json_db: file_json,   
                web_home: `https://${config.domain}`,
                web_photo: `https://${config.domain}/photo`,
                web_video: `https://${config.domain}/video`
            }
            let render = pug.renderFile('./server/www/photo/index.pug',Options);
        
            res.send(render)
            
        });

        app.get('/video', (req, res) => {

            let file_json = fs.readJsonSync('./Telegram/db/video.json')
            let Options = {

                title: `${config.title}`,
                json_db: file_json,   
                web_home: `https://${config.domain}`,
                web_photo: `https://${config.domain}/photo`,
                web_video: `https://${config.domain}/video`
            }
            let render = pug.renderFile('./server/www/video/index.pug',Options);
        
            res.send(render)
            
        });


        
        app.get('*', (req, res) => {
        
            res.send('Error')
        
        }); 

        server(app);

    } catch(error) {

        console.log(error.toString())
    }
    
}


// 






// import fs from 'fs-extra';
// import pug from 'pug'

// export default async function website(request, response) {

//     try {

        

//         if (request.url === '/') {

//             let file_json = fs.readJsonSync('./Telegram/db/photo.json')
//             let values = [];

//             file_json.forEach((el) => {

//                 let FileName = `./photo/media/${el.FileName}.jpeg`
//                 values.push(FileName)
//             })

//             let mt3yrt = {

//                 title: 'Hey',
//                 message: 'Hello there!',
//                 arry: values,
            
//             }
//             let render = pug.renderFile('./server/www/index.pug',mt3yrt);
                
//             response.writeHead(200);
//             response.end(render)
//             console.log(values)
            
            
//         } 

//         else if (request.url === '/photo') {

//             let html = fs.readFileSync('./server/www/photo/ryan-amlalki.html',"utf8")

//             response.writeHead(200);
//             response.end(html)
//         }

//         else { 

//             response.writeHead(404);
//             response.end('Error') 
        
//         }

//     } catch(error) {

//         console.log(error.toString())
//     }
    
// }










