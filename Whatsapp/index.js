import { WAConnection, MessageType, Mimetype } from '@adiwajshing/baileys';
import fs from 'fs-extra';
import moment from 'moment-timezone';
import { CreateHtmlPhoto_WH, CreateHtmlVideo_WH } from '../server/CreateHtml.js'

export default async function Whatsapp() {

    try{

        const client = new WAConnection();

        client.on('open', () => {

            console.log (`credentials updated!`);
            fs.writeFileSync('./Whatsapp/info.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'));

        });

        
        if (fs.existsSync('./Whatsapp/info.json')) {

            client.loadAuthInfo('./Whatsapp/info.json'); 
          
        } 

        if (fs.existsSync('./Whatsapp/db') === false) {

            fs.mkdirSync('./Whatsapp/db');
            
        }

        if (fs.existsSync('./Whatsapp/db/media.json') === false) {
          
            fs.writeJsonSync("./Whatsapp/db/media.json", []);
          
        }

        client.on('close', async (cls) =>{

            if (cls.reason === 'unknown' && cls.isReconnecting === true) {

                if (fs.existsSync('./Whatsapp/info.json')) {

                    fs.removeSync('./Whatsapp/info.json');
                }
            }

            else if (cls.reason === 'invalid_session' && cls.isReconnecting === false){

                if (fs.existsSync('./Whatsapp/info.json')) {

                    fs.removeSync('./Whatsapp/info.json');
                }
            }

        });

        client.on('chat-update', async (msg) => {

            if (msg.messages && msg.count && msg.hasNewMessage && client.contacts[msg.jid] !== undefined) {

                let variables = {
    
                    messages: msg.messages.array[0].message,
                    download_msg: msg.messages.array[0],
                    from: msg.jid ,
                    pushname: client.contacts[msg.jid].notify ? client.contacts[msg.jid].notify : client.contacts[msg.jid].name ? client.contacts[msg.jid].name : 'بدون إسم',           
    
                }

                if (variables.messages.imageMessage) {

                    let Time = moment.tz("Asia/Riyadh").locale('ar').format('LLLL')
                    let file = await client.downloadMediaMessage(variables.download_msg);
                    let fileName = NumberMx(35) ;
                    let json_photo = fs.readJsonSync('./Whatsapp/db/media.json')
                    let json_user = {

                        FirstName: variables.pushname,
                        From_Id: variables.from.split(/(@s.whatsapp.net|@g.us)/,1)[0],
                        Message: variables.messages.imageMessage.caption !== undefined ? variables.messages.imageMessage.caption : ' ' ,
                        FileName: fileName,
                        Time: Time,
                        Format: "photo"
                    };

                    json_photo.unshift(json_user)
                    fs.writeJsonSync('./Whatsapp/db/media.json', json_photo)
                    fs.writeFileSync(`./server/www/Whatsapp/media/${fileName}.jpeg`, file);
                    CreateHtmlPhoto_WH(json_user.Message, json_user.FileName, json_user.From_Id, json_user.FirstName, Time)
                    
                }

                else if (variables.messages.videoMessage) {

                    let Time = moment.tz("Asia/Riyadh").locale('ar').format('LLLL')
                    let file = await client.downloadMediaMessage(variables.download_msg);
                    let fileName = NumberMx(35) ;
                    let json_photo = fs.readJsonSync('./Whatsapp/db/media.json')
                    let json_user = {

                        FirstName: variables.pushname,
                        From_Id: variables.from.split(/(@s.whatsapp.net|@g.us)/,1)[0],
                        Message: variables.messages.videoMessage.caption !== undefined ? variables.messages.videoMessage.caption : ' ' ,
                        FileName: fileName,
                        Time: Time,
                        Format: "video"
                    };

                    json_photo.unshift(json_user)
                    fs.writeJsonSync('./Whatsapp/db/media.json', json_photo)
                    fs.writeFileSync(`./server/www/Whatsapp/media/${fileName}.mp4`, file);
                    CreateHtmlVideo_WH(json_user.Message, json_user.FileName, json_user.From_Id, json_user.FirstName, Time)
                    
                }

                
            }

        });

        await client.connect() 

    } catch(err) {

        console.log(err.toString());
    }

}

function NumberMx(n) {

    let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let res = "";
    for (let i = 0; i < n; i++) {

        let id = Math.ceil(Math.random() * 35);
        res += chars[id];

    }

    return res;
}