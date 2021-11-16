import fs from 'fs-extra';


export default function folder() {

    if (fs.existsSync('./server/www/Telegram/media') === false){

        fs.mkdirSync('./server/www/Telegram/media', { recursive: true });
      
    }

    if (fs.existsSync('./server/www/Telegram/html') === false){

        fs.mkdirSync('./server/www/Telegram/html', { recursive: true });
      
    }

    if (fs.existsSync('./server/www/Whatsapp/media') === false){

        fs.mkdirSync('./server/www/Whatsapp/media', { recursive: true });
      
    }

    if (fs.existsSync('./server/www/Whatsapp/html') === false){

        fs.mkdirSync('./server/www/Whatsapp/html', { recursive: true });
      
    }
    
}