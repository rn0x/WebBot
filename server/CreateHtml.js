import fs from 'fs-extra';

export async function CreateHtmlPhoto(message, FileName, User, FirstName, fromid) {

    try {


       // let replace = message.replace(/ /g, '_')
        let config = fs.readJsonSync('./config.json')
        let Options = {

            title: `${config.title}`,
            web_home: `https://${config.domain}`,
            web_photo: `https://${config.domain}/photo`,
            web_video: `https://${config.domain}/video`
        }
        const code = `

        <!DOCTYPE html>
<html lang="ar">
<head>
    <title>${message} - ${Options.title}</title>
    <link rel="stylesheet" href="./css/style.css">
    <script src="../load.js"></script>
</head>
<body>
    <div class="load" id="load"></div>
    <div class="hedr">
        <img src="../icon/logo.png", alt='title'  id='logo'>
        <div class="icons_home">
            <a href=${Options.web_photo}>
                <img src="../icon/image.png" alt="image" id="icon-info">
            </a>
            <a href=${Options.web_video}>
                <img src="../icon/video.png" alt="image" id="icon-info">
            </a>
            <a href=${Options.web_home}>
                <img src="../icon/home.png" alt="image" id="icon-info">
            </a>
        </div>
    </div>
    <div class="bodyimg">
        <div class="responsive">
            <div class="gallery">
                <img src='../media/${FileName}.jpeg' alt="${message}">
            </div>
            <div class="desc">
                <p> ${message} </p>
            </div>
            <br>
            <a href="${Options.web_photo}/media/${FileName}.jpeg" download= '${FileName}'>
                <img src="../icon/download.png" alt="download" id='icon-download'>
            </a>
            <br>
            <div class="info-col">
                <div class="info">
                    <a href='https://t.me/${User}' target="_blank">
                    <p> ${FirstName} </p>
                    </a>
                    <img src="../icon/telegram.png" alt="telegram" id='icon'>
                    <p>${fromid}</p>
                    <img src="../icon/id.png" alt="id" id='icon'>
                    <br>
                </div>
            </div>
        </div>
    </div>
    <div class="footer">
        <a href="https://github.com/rn0x" target="_blank">
            <h4> Github: @rn0x  </h4>
        </a>
        <img src="../icon/logo.png", alt= 'logo' id='logo-foter'>
    </div>
    
</body>
</html>
        
        `

        fs.writeFileSync(`./server/www/photo/html/${FileName}.html`, code);

    } catch(error) {

        console.log(error.toString())
    }
    
}


export async function CreateHtmlVideo(message, FileName, User, FirstName, fromid) {

    try {


        //let replace = message.replace(/ /g, '_')
        let config = fs.readJsonSync('./config.json')
        let Options = {

            title: `${config.title}`,
            web_home: `https://${config.domain}`,
            web_photo: `https://${config.domain}/photo`,
            web_video: `https://${config.domain}/video`
        }
        const code = `

        <!DOCTYPE html>
<html lang="ar">
<head>
    <title>${message} - ${Options.title}</title>
    <link rel="stylesheet" href="./css/style.css">
    <script src="../load.js"></script>
</head>
<body>
    <div class="load" id="load"></div>
    <div class="hedr">
        <img src="../icon/logo.png", alt='title'  id='logo'>
        <div class="icons_home">
            <a href=${Options.web_photo}>
                <img src="../icon/image.png" alt="image" id="icon-info">
            </a>
            <a href=${Options.web_video}>
                <img src="../icon/video.png" alt="image" id="icon-info">
            </a>
            <a href=${Options.web_home}>
                <img src="../icon/home.png" alt="image" id="icon-info">
            </a>
        </div>
    </div>
    <div class="bodyimg">
        <div class="responsive">
            <div class="gallery">
                <video src='../media/${FileName}.mp4' controls></video>
            </div>
            <div class="desc">
                <p> ${message} </p>
            </div>
            <br>
            <a href="${Options.web_video}/media/${FileName}.mp4" download= '${FileName}'>
                <img src="../icon/download.png" alt="download" id='icon-download'>
            </a>
            <br>
            <div class="info-col">
                <div class="info">
                    <a href='https://t.me/${User}' target="_blank">
                    <p> ${FirstName} </p>
                    </a>
                    <img src="../icon/telegram.png" alt="telegram" id='icon'>
                    <p>${fromid}</p>
                    <img src="../icon/id.png" alt="id" id='icon'>
                    <br>
                </div>
            </div>
        </div>
    </div>
    <div class="footer">
        <a href="https://github.com/rn0x" target="_blank">
            <h4> Github: @rn0x  </h4>
        </a>
        <img src="../icon/logo.png", alt= 'logo' id='logo-foter'>
    </div>
    
</body>
</html>
        
        `

        fs.writeFileSync(`./server/www/video/html/${FileName}.html`, code);

    } catch(error) {

        console.log(error.toString())
    }
    
}