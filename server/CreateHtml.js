import fs from 'fs-extra';

export async function CreateHtmlPhoto(Message, FileName, User, FirstName, From_Id) {

    try {


        let replace = Message.replace(/ /g, '_').split("\n")
        let replace_msg = Message !== ' ' ? Message.replace(/(?:\r\n|\r|\n)/g, '\n            p ') : ''
        let config = fs.readJsonSync('./config.json')
        let Options = {

            title: `${config.title}`,
            web_home: `https://${config.domain}`,
            web_photo: `https://${config.domain}/photo`,
            web_video: `https://${config.domain}/video`
        }
        let code = `
doctype html
html(lang="ar")
  head
    title= '${replace} - ${Options.title}'
    block scripts
      script(src='./load.js')
    link(rel="stylesheet", href="./css/style.css")
  body
    div.load#load
    div.hedr
      img(src="../icon/logo.png", alt=title  id='logo')
      .icons_home
        a(href= '${Options.web_photo}'): img(src="./icon/image.png", alt="info" id='icon-info')
        a(href= '${Options.web_video}'): img(src="./icon/video.png", alt="info" id='icon-info')
        a(href= '${Options.web_home}'): img(src="./icon/home.png", alt="info" id='icon-info')
    .bodyimg
      .responsive
        .gallery
          img(src='./photo/media/${FileName}.jpeg', alt='${replace !== ' ' ? replace : ' '}')
          .desc 
            p ${replace_msg}
          br
          a(href='./photo/media/${FileName}.jpeg' download= '${FileName}'): img(src="./icon/download.png", alt="info" id='icon-download')
          br
          .info-col
            .info
              a(href='https://t.me/${User}' target="_blank"): p= '${FirstName}'
              img(src="./icon/telegram.png", alt="id" id='icon')
              p= '${From_Id}'
              img(src="./icon/id.png", alt="id" id='icon')
              br
    .footer
      a(href="https://github.com/rn0x" target="_blank")
        h4 Github: @rn0x 
      img(src="../icon/logo.png", alt= message id='logo-foter')`

        fs.writeFileSync(`./server/www/photo/html/${FileName}.pug`, code);

    } catch(error) {

        console.log(error.toString())
    }
    
}


export async function CreateHtmlVideo(Message, FileName, User, FirstName, From_Id) {

    try {


        let replace = Message.replace(/ /g, '_').split("\n")
        let replace_msg = Message !== ' ' ? Message.replace(/(?:\r\n|\r|\n)/g, '\n            p ') : ''
        let config = fs.readJsonSync('./config.json')
        let Options = {

            title: `${config.title}`,
            web_home: `https://${config.domain}`,
            web_photo: `https://${config.domain}/photo`,
            web_video: `https://${config.domain}/video`
        }
        let code = `
doctype html
html(lang="ar")
  head
    title= '${replace} - ${Options.title}'
    block scripts
      script(src='./load.js')
    link(rel="stylesheet", href="./css/style.css")
  body
    div.load#load
    div.hedr
      img(src="../icon/logo.png", alt=title  id='logo')
      .icons_home
        a(href= '${Options.web_photo}'): img(src="./icon/image.png", alt="info" id='icon-info')
        a(href= '${Options.web_video}'): img(src="./icon/video.png", alt="info" id='icon-info')
        a(href= '${Options.web_home}'): img(src="./icon/home.png", alt="info" id='icon-info')
    .bodyimg
      .responsive
        .gallery
          video(src='./video/media/${FileName}.mp4' controls)
          .desc 
            p ${replace_msg}
          br
          a(href='./video/media/${FileName}.mp4' download= '${FileName}'): img(src="./icon/download.png", alt="info" id='icon-download')
          br
          .info-col
            .info
              a(href='https://t.me/${User}' target="_blank"): p= '${FirstName}'
              img(src="./icon/telegram.png", alt="id" id='icon')
              p= '${From_Id}'
              img(src="./icon/id.png", alt="id" id='icon')
              br
    .footer
      a(href="https://github.com/rn0x" target="_blank")
        h4 Github: @rn0x 
      img(src="../icon/logo.png", alt= message id='logo-foter')`

        fs.writeFileSync(`./server/www/video/html/${FileName}.html`, code);

    } catch(error) {

        console.log(error.toString())
    }
    
}