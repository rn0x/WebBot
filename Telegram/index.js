import fs from 'fs-extra';
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import { NewMessage } from "telegram/events/index.js";
import input from "input";
import moment from 'moment-timezone';
import { CreateHtmlPhoto, CreateHtmlVideo } from '../server/CreateHtml.js'

export default async function Telegram() {

    try {

        if (fs.existsSync('./Telegram/db') === false ){

            fs.mkdirSync('./Telegram/db', { recursive: true });
          
        }
        
        if (fs.existsSync('./Telegram/db/api.json') === false ){

            let apiid = await input.text("Please enter your Api ID: ");
            let apihash = await input.text("Please enter your Api Hash: ");
            
            fs.writeJsonSync('./Telegram/db/api.json', {api_id: Number(apiid) , api_hash: apihash});
          
        }
          
        if (fs.existsSync('./Telegram/db/session.json') === false ){
          
            fs.writeJsonSync("./Telegram/db/session.json", "");
          
        }

        if (fs.existsSync('./Telegram/db/photo.json') === false ){
          
            fs.writeJsonSync("./Telegram/db/photo.json", []);
          
        }

        if (fs.existsSync('./Telegram/db/video.json') === false ){
          
            fs.writeJsonSync("./Telegram/db/video.json", []);
          
        }

        const jsonapi = await fs.readJson('./Telegram/db/api.json').catch(() => console.log("The api.json file has been created"));
        const save_session =  await fs.readJson("./Telegram/db/session.json").catch(() => console.log("The swssion.json file has been created"));
        const apiId = jsonapi.api_id;
        const apiHash = jsonapi.api_hash;
        const stringSession = new StringSession(save_session);
        const client = new TelegramClient(stringSession, apiId, apiHash);
        await client.connect();

        if (!await client.checkAuthorization()) {

            await client.start({
          
              phoneNumber: async () => await input.text("Please enter your number: "),
              password: async () => await input.text("Please enter your password: "),
              phoneCode: async () => await input.text("Please enter the code you received: "),
              onError: (err) => console.log(err.message),
            
            });
      
        }
          
        fs.writeJsonSync('./Telegram/db/session.json', client.session.save());


        async function eventPrint(event) {

    
            const msg = event.message;
            const sender = await msg.getSender();
            const dialogs_client = await client.getDialogs({})
            const dialogs = dialogs_client[0];
            const message = msg.message
            const message_id = msg.id
            const replyTo = msg.replyTo !== null // msg.replyTo.replyToMsgId = message_id reply
            const from_id = msg.fromId !== null ? msg.fromId.userId : msg.peerId.userId ? msg.peerId.userId : msg.peerId.channelId
           // const chat_id = msg.peerId.channelId ? msg.peerId.channelId : msg.peerId.userId
            const chat_id = dialogs.id
            const member_group = event._entities.get(Array.from(event._entities.keys())[0]) !== undefined ? event._entities.get(Array.from(event._entities.keys())[0]) : ''
            const member_username = member_group.username !== undefined ? member_group.username : '' ;
            const member_firstName = member_group.firstName !== undefined ? member_group.firstName : '' ;
            const member_id = member_group.id !== undefined ? member_group.id : '' ;
            const photo = msg.photo
            const video = msg.video
            const firstName = sender.firstName ? sender.firstName : event._entities.get(Array.from(event._entities.keys())[1]).title
            const username = msg.peerId.channelId && event._entities.get(Array.from(event._entities.keys())[1]).username !== undefined ? event._entities.get(Array.from(event._entities.keys())[1]).username : sender.username !== null ? sender.username : firstName
            const buffer_photo = await client.downloadMedia(photo,{ workers: 1 })
            const buffer_video = await client.downloadMedia(video,{ workers: 1 }) 
            const config = fs.readJsonSync('./config.json');

           // chat_id.toString().includes("-") === false

            if (message !== '' && photo) { 

                let Time = moment.tz("Asia/Riyadh").format()
                let json_photo = fs.readJsonSync('./Telegram/db/photo.json')
                let fileName = NumberMx(25) ;
                let json_user = {

                    User: member_username !== '' && member_username !== 'Channel_Bot' ? member_username : username,
                    FirstName: member_firstName !== '' && member_firstName !== 'Channel' ? member_firstName : firstName,
                    From_Id: member_id !== '' && member_username !== 'Channel_Bot' ? member_id : from_id,
                    Chat_Id: chat_id,
                    Message_Id: message_id,
                    Message: message ,
                    FileName: fileName,
                    Time: Time 
                };

                json_photo.unshift(json_user)
                fs.writeJsonSync('./Telegram/db/photo.json', json_photo)
                fs.writeFileSync(`./server/www/photo/media/${fileName}.jpeg`, buffer_photo);
                CreateHtmlPhoto(message, fileName, username, firstName, from_id);
                await client.sendMessage(chat_id, {message: `تم رفع الصوره على الموقع \n\n https://${config.domain}/photo/html/${fileName}.html`, replyTo: message_id})
                .then(async (del) => setTimeout(async () => await client.deleteMessages(from_id, [del.id], { revoke: true}) , 10000))
            }
            
            else if (message === '' && photo) {

                let Time = moment.tz("Asia/Riyadh").format()
                let json_photo = fs.readJsonSync('./Telegram/db/photo.json')
                let fileName = NumberMx(25) ;
                let json_user = {

                    User: member_username !== '' && member_username !== 'Channel_Bot' ? member_username : username,
                    FirstName: member_firstName !== '' && member_firstName !== 'Channel' ? member_firstName : firstName,
                    From_Id: member_id !== '' && member_username !== 'Channel_Bot' ? member_id : from_id,
                    Chat_Id: chat_id,
                    Message: ' ' ,
                    Message_Id: message_id,
                    FileName: fileName,
                    Time: Time
                };

                json_photo.unshift(json_user)
                fs.writeJsonSync('./Telegram/db/photo.json', json_photo)
                fs.writeFileSync(`./server/www/photo/media/${fileName}.jpeg`, buffer_photo);
                CreateHtmlPhoto(message, fileName, username, firstName, from_id);
                await client.sendMessage(chat_id, {message: `تم رفع الصوره على الموقع \n\n https://${config.domain}/photo/html/${fileName}.html`, replyTo: message_id})
                .then(async (del) => setTimeout(async () => await client.deleteMessages(from_id, [del.id], { revoke: true}) , 10000))

            }

            else if (message !== '' && video) {

                let Time = moment.tz("Asia/Riyadh").format()
                let json_video = fs.readJsonSync('./Telegram/db/video.json')
                let fileName = NumberMx(25) ;
                let json_user = {

                    User: member_username !== '' && member_username !== 'Channel_Bot' ? member_username : username,
                    FirstName: member_firstName !== '' && member_firstName !== 'Channel' ? member_firstName : firstName,
                    From_Id: member_id !== '' && member_username !== 'Channel_Bot' ? member_id : from_id,
                    Chat_Id: chat_id,
                    Message: message,
                    Message_Id: message_id,
                    FileName: fileName,
                    Time: Time
                };

                json_video.unshift(json_user)
                fs.writeJsonSync('./Telegram/db/video.json', json_video)
                fs.writeFileSync(`./server/www/video/media/${fileName}.mp4`, buffer_video);
                CreateHtmlVideo(message, fileName, username, firstName, from_id)
                await client.sendMessage(chat_id, {message: `تم رفع الفيديو على الموقع \n\n https://${config.domain}/video/html/${fileName}.html`, replyTo: message_id})
                .then(async (del) => setTimeout(async () => await client.deleteMessages(from_id, [del.id], { revoke: true}) , 10000))

            }

            else if (message === '' && video) {

                let Time = moment.tz("Asia/Riyadh").format()
                let json_video = fs.readJsonSync('./Telegram/db/video.json')
                let fileName = NumberMx(25) ;
                let json_user = {

                    User: member_username !== '' && member_username !== 'Channel_Bot' ? member_username : username,
                    FirstName: member_firstName !== '' && member_firstName !== 'Channel' ? member_firstName : firstName,
                    From_Id: member_id !== '' && member_username !== 'Channel_Bot' ? member_id : from_id,
                    Chat_Id: chat_id,
                    Message: ' ' ,
                    Message_Id: message_id,
                    FileName: fileName,
                    Time: Time
                };

                json_video.unshift(json_user)
                fs.writeJsonSync('./Telegram/db/video.json', json_video)
                fs.writeFileSync(`./server/www/video/media/${fileName}.mp4`, buffer_video);
                CreateHtmlVideo(message, fileName, username, firstName, from_id)
                await client.sendMessage(chat_id, {message: `تم رفع الفيديو على الموقع \n\n https://${config.domain}/video/html/${fileName}.html`, replyTo: message_id})
                .then(async (del) => setTimeout(async () => await client.deleteMessages(from_id, [del.id], { revoke: true}) , 10000))

            }
            
    
        }
        
        client.addEventHandler(eventPrint, new NewMessage({}));
        

    } catch(error) {

        console.log(error.toString())
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