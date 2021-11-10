import fs from 'fs-extra';
import website from './server/website.js';
import tel from './Telegram/index.js';
import moment from 'moment-timezone';
import figlet from 'figlet';
import input from "input";


console.log(figlet.textSync('Bot WebSite'));
console.log("                  Start " + moment.tz("Asia/Riyadh").format('LT'))
console.log("               Telegram @BinAttia \n\n")

if (fs.existsSync('./config.json') === false ){

    let Domain = await input.text("Please enter your Domain www.example.com : ");
    let name = await input.text("Please enter your Web site name ");
    
    fs.writeJsonSync('./config.json', {domain: Domain , title: name});
  
}

else if (fs.existsSync('./config.json')){

    let config = fs.readJsonSync('./config.json');

    console.log(`Website Link LocalHost https://localhost or http://localhost`);
    console.log(`Website Link Domain https://${config.domain} or http://${config.domain}`);

}




website()
tel()