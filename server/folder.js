import fs from 'fs-extra';


export default function folder() {

    if (fs.existsSync('./server/www/photo/media') === false || fs.existsSync('./server/www/photo/html') === false ){

        fs.mkdirSync('./server/www/photo/media', { recursive: true });
        fs.mkdirSync('./server/www/photo/html', { recursive: true });
      
    }

    if (fs.existsSync('./server/www/video/media') === false || fs.existsSync('./server/www/video/html') === false ){

        fs.mkdirSync('./server/www/video/media', { recursive: true });
        fs.mkdirSync('./server/www/video/html', { recursive: true });
      
    }
    
}