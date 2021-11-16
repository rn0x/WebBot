import fs from 'fs-extra';
import website from './server/website.js';
import folder from './server/folder.js';
import Telegram from './Telegram/index.js';
import Whatsapp from './Whatsapp/index.js';
import moment from 'moment-timezone';
import figlet from 'figlet';
import input from "input";


console.log(figlet.textSync('WebBot'));
console.log("                  Start " + moment.tz("Asia/Riyadh").format('LT'))
console.log("               Telegram @BinAttia \n\n")

if (fs.existsSync('./config.json') === false ){

    let Domain = await input.text("Please enter your Domain www.example.com : ");
    let name = await input.text("Please enter your Web site name ");
    
    fs.writeJsonSync('./config.json', {domain: Domain , title: name});
  
}

await folder()
await Telegram()
await website()
await Whatsapp()