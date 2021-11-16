import fs from 'fs-extra';

export async function CreateHtmlPhoto_TG(Message, FileName, User, From_Id, FirstName, Time) {

    try {


        let replace = Message.replace(/ /g, '_').split("\n")
        let replace_msg = Message !== ' ' ? Message.replace(/(?:\r\n|\r|\n)/g, '\n          p.text-center ') : ''
        let config = fs.readJsonSync('./config.json')
        let Options = {

          title: `${config.title}`,
          web_home: `https://${config.domain}`,
          web_telegram: `https://${config.domain}/telegram`,
          web_whatsapp: `https://${config.domain}/whatsapp`
        }
        let code = `
doctype html
html(lang="ar")
  head
    title= '${Options.title} - ${replace}'
    meta(name="description", content='أنا بوت اقوم بنشر الصور والفيديوهات التي اتلقاها من جهات إتصالي او القروبات المنضاف إليها, أتواجد  على تيليجرام و واتساب.')
    meta(name="author", content="rn0x")
    meta(name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no")
    script(src='../load.js')
    script(src="https://code.jquery.com/jquery-3.2.1.slim.min.js") 
    script(src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js") 
    script(src="https://code.jquery.com/jquery-3.2.1.slim.min.js") 
    script(src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js") 
    link(rel="stylesheet", href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css")
    link(rel="stylesheet", href="../css/style.css")
    link(rel="icon", href="../icon/robot.png")
  body
    div.load#load
    header
      div.collapse.bg-dark#navbarHeader
        div.container
          div.row
            div.card-body#algnbtn
              h4.text-white من أنا
              p.text-muted أنا بوت اقوم بنشر الصور والفيديوهات التي اتلقاها من جهات إتصالي او القروبات المنضاف إليها, أتواجد  على تيليجرام و واتساب.
            div.card-body#algnbtn
              h4.text-white تواص معي عبر
              p.text-muted <a href="https://t.me/binattia" class="btn btn-primary my-2">تيليجرام</a> <a href="mailto: rn0x711@gmail.com" class="btn btn-secondary my-2">Gmail</a>
      div.navbar.navbar-dark.bg-primary.box-shadow
        div.container.d-flex.justify-content-between
          a(href="${Options.web_telegram}" class="navbar-brand d-flex align-items-center")
            svg(xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 20 20" fill="currentColor" class="mr-2 bi bi-robot")
              path(fill-rule="evenodd" d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Zm-8 5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 1 .182.135l.842 1.7.754-.785a.25.25 0 0 1 .166-.076 24.85 24.85 0 0 0 1.98-.19.25.25 0 0 1 .068.496 25.29 25.29 0 0 1-1.922.187l-.932.971a.25.25 0 0 1-.404-.062l-.847-1.71-.754.736a.25.25 0 0 1-.189.07 25.36 25.36 0 0 1-2.02-.192.25.25 0 1 1 .068-.495c.512.07 1.143.138 1.87.182l.921-.9a.25.25 0 0 1 .217-.067Z")
            strong= title
          button(class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation")
            span.navbar-toggler-icon
    main(role="main")
      section(class="jumbotron text-center")
        div.container
          img(src="../icon/telegram.png", alt="telegram" id="img-bot")
          p.lead.text-muted= '${Options.title} عبارة عن بوت للتيليجرام و الواتساب يقوم بنشر الصور والفيدوهات المتلقاه من جهات الاتصال او القروبات بشكل تلقائي.'
          a(href='${Options.web_telegram}' class="btn btn-outline-primary" id="link-bot") بوت تيليجرام
          a(href='${Options.web_whatsapp}' class="btn btn-outline-success" id="link-bot") بوت واتساب
      div.card.mb-4.box-shadow.container
        img(class="card-img-top" src="./media/${FileName}.jpeg" alt="${replace !== ' ' ? replace : ' '}")
        div.card-body#algnbtn
          a(href='media/${FileName}.jpeg' download= '${FileName}')
            svg(xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 20 20" fill="currentColor" class="mr-2 bi bi-cloud-arrow-down-fill" id="algntxt")
              path(fill-rule="evenodd" d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 6.854-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5a.5.5 0 0 1 1 0v3.793l1.146-1.147a.5.5 0 0 1 .708.708z")
        div.card-body
          p.text-center ${replace_msg}
          div.d-flex.justify-content-between.align-items-center
            div.card-body#algnbtn
              a(href= 'https://t.me/${User}' id="link-bot"): small#algntxt-color ${FirstName} 
                svg(xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16")
                  path(d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z")
        div#algnbtn
          svg(xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-bounding-box" viewBox="0 0 16 16")
            path(d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z")
            path(d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z")
        small.text-muted#algntxt ${From_Id}
        div#algnbtn
          svg(xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16")
            path(d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z")
            path(d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z")
        small.text-muted#algntxt ${Time}
    footer.text-muted
      div.container
        p.float-right: a(href="#")
          svg(xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 20" fill="currentColor" class="mr-2 bi bi-arrow-up-square")
            path(fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z") 
        p= 'جميع الحقوق محفوظة لموقع ${Options.title} ©'
        p Github <a href="https://github.com/rn0x">@Rn0x</a> Telegram <a href="https://t.me/binattia">https://t.me/binattia</a>
        
        `

        fs.writeFile(`./server/www/telegram/html/${FileName}.pug`, code);

    } catch(error) {

        console.log(error.toString())
    }
    
}

export async function CreateHtmlVideo_TG(Message, FileName, User, From_Id, FirstName, Time) {

  try {


      let replace = Message.replace(/ /g, '_').split("\n")
      let replace_msg = Message !== ' ' ? Message.replace(/(?:\r\n|\r|\n)/g, '\n          p.text-center ') : ''
      let config = fs.readJsonSync('./config.json')
      let Options = {

        title: `${config.title}`,
        web_home: `https://${config.domain}`,
        web_telegram: `https://${config.domain}/telegram`,
        web_whatsapp: `https://${config.domain}/whatsapp`
      }
      let code = `
doctype html
html(lang="ar")
head
  title= '${Options.title} - ${replace}'
  meta(name="description", content='أنا بوت اقوم بنشر الصور والفيديوهات التي اتلقاها من جهات إتصالي او القروبات المنضاف إليها, أتواجد  على تيليجرام و واتساب.')
  meta(name="author", content="rn0x")
  meta(name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no")
  script(src='../load.js')
  script(src="https://code.jquery.com/jquery-3.2.1.slim.min.js") 
  script(src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js") 
  script(src="https://code.jquery.com/jquery-3.2.1.slim.min.js") 
  script(src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js") 
  link(rel="stylesheet", href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css")
  link(rel="stylesheet", href="../css/style.css")
  link(rel="icon", href="../icon/robot.png")
body
  div.load#load
  header
    div.collapse.bg-dark#navbarHeader
      div.container
        div.row
          div.card-body#algnbtn
            h4.text-white من أنا
            p.text-muted أنا بوت اقوم بنشر الصور والفيديوهات التي اتلقاها من جهات إتصالي او القروبات المنضاف إليها, أتواجد  على تيليجرام و واتساب.
          div.card-body#algnbtn
            h4.text-white تواص معي عبر
            p.text-muted <a href="https://t.me/binattia" class="btn btn-primary my-2">تيليجرام</a> <a href="mailto: rn0x711@gmail.com" class="btn btn-secondary my-2">Gmail</a>
    div.navbar.navbar-dark.bg-primary.box-shadow
      div.container.d-flex.justify-content-between
        a(href="${Options.web_telegram}" class="navbar-brand d-flex align-items-center")
          svg(xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 20 20" fill="currentColor" class="mr-2 bi bi-robot")
            path(fill-rule="evenodd" d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Zm-8 5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 1 .182.135l.842 1.7.754-.785a.25.25 0 0 1 .166-.076 24.85 24.85 0 0 0 1.98-.19.25.25 0 0 1 .068.496 25.29 25.29 0 0 1-1.922.187l-.932.971a.25.25 0 0 1-.404-.062l-.847-1.71-.754.736a.25.25 0 0 1-.189.07 25.36 25.36 0 0 1-2.02-.192.25.25 0 1 1 .068-.495c.512.07 1.143.138 1.87.182l.921-.9a.25.25 0 0 1 .217-.067Z")
          strong= title
        button(class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation")
          span.navbar-toggler-icon
  main(role="main")
    section(class="jumbotron text-center")
      div.container
        img(src="../icon/telegram.png", alt="telegram" id="img-bot")
        p.lead.text-muted= '${Options.title} عبارة عن بوت للتيليجرام و الواتساب يقوم بنشر الصور والفيدوهات المتلقاه من جهات الاتصال او القروبات بشكل تلقائي.'
        a(href='${Options.web_telegram}' class="btn btn-outline-primary" id="link-bot") بوت تيليجرام
        a(href='${Options.web_whatsapp}' class="btn btn-outline-success" id="link-bot") بوت واتساب
    div.card.mb-4.box-shadow.container
      video(class="card-img-top" src='./media/${FileName}.mp4' poster controls preload="metadata")
      div.card-body#algnbtn
        a(href='media/${FileName}.mp4' download= '${FileName}')
          svg(xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 20 20" fill="currentColor" class="mr-2 bi bi-cloud-arrow-down-fill" id="algntxt")
            path(fill-rule="evenodd" d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 6.854-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5a.5.5 0 0 1 1 0v3.793l1.146-1.147a.5.5 0 0 1 .708.708z")
      div.card-body
        p.text-center ${replace_msg}
        div.d-flex.justify-content-between.align-items-center
          div.card-body#algnbtn
            a(href= 'https://t.me/${User}' id="link-bot"): small#algntxt-color ${FirstName} 
              svg(xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16")
                path(d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z")
      div#algnbtn
        svg(xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-bounding-box" viewBox="0 0 16 16")
          path(d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z")
          path(d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z")
      small.text-muted#algntxt ${From_Id}
      div#algnbtn
        svg(xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16")
          path(d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z")
          path(d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z")
      small.text-muted#algntxt ${Time}
  footer.text-muted
    div.container
      p.float-right: a(href="#")
        svg(xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 20" fill="currentColor" class="mr-2 bi bi-arrow-up-square")
          path(fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z") 
      p= 'جميع الحقوق محفوظة لموقع ${Options.title} ©'
      p Github <a href="https://github.com/rn0x">@Rn0x</a> Telegram <a href="https://t.me/binattia">https://t.me/binattia</a>
      
      `

      fs.writeFile(`./server/www/telegram/html/${FileName}.pug`, code);

  } catch(error) {

      console.log(error.toString())
  }
  
}


export async function CreateHtmlPhoto_WH(Message, FileName, From_Id, FirstName, Time) {

  try {


      let replace = Message.replace(/ /g, '_').split("\n")
      let replace_msg = Message !== ' ' ? Message.replace(/(?:\r\n|\r|\n)/g, '\n          p.text-center ') : ''
      let config = fs.readJsonSync('./config.json')
      let Options = {

        title: `${config.title}`,
        web_home: `https://${config.domain}`,
        web_telegram: `https://${config.domain}/telegram`,
        web_whatsapp: `https://${config.domain}/whatsapp`
      }
      let code = `
doctype html
html(lang="ar")
head
  title= '${Options.title} - ${replace}'
  meta(name="description", content='أنا بوت اقوم بنشر الصور والفيديوهات التي اتلقاها من جهات إتصالي او القروبات المنضاف إليها, أتواجد  على تيليجرام و واتساب.')
  meta(name="author", content="rn0x")
  meta(name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no")
  script(src='../load.js')
  script(src="https://code.jquery.com/jquery-3.2.1.slim.min.js") 
  script(src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js") 
  script(src="https://code.jquery.com/jquery-3.2.1.slim.min.js") 
  script(src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js") 
  link(rel="stylesheet", href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css")
  link(rel="stylesheet", href="../css/style.css")
  link(rel="icon", href="../icon/robot.png")
body
  div.load#load
  header
    div.collapse.bg-dark#navbarHeader
      div.container
        div.row
          div.card-body#algnbtn
            h4.text-white من أنا
            p.text-muted أنا بوت اقوم بنشر الصور والفيديوهات التي اتلقاها من جهات إتصالي او القروبات المنضاف إليها, أتواجد  على تيليجرام و واتساب.
          div.card-body#algnbtn
            h4.text-white تواص معي عبر
            p.text-muted <a href="https://t.me/binattia" class="btn btn-primary my-2">تيليجرام</a> <a href="mailto: rn0x711@gmail.com" class="btn btn-secondary my-2">Gmail</a>
    div.navbar.navbar-dark.bg-success.box-shadow
      div.container.d-flex.justify-content-between
        a(href="${Options.web_telegram}" class="navbar-brand d-flex align-items-center")
          svg(xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 20 20" fill="currentColor" class="mr-2 bi bi-robot")
            path(fill-rule="evenodd" d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Zm-8 5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 1 .182.135l.842 1.7.754-.785a.25.25 0 0 1 .166-.076 24.85 24.85 0 0 0 1.98-.19.25.25 0 0 1 .068.496 25.29 25.29 0 0 1-1.922.187l-.932.971a.25.25 0 0 1-.404-.062l-.847-1.71-.754.736a.25.25 0 0 1-.189.07 25.36 25.36 0 0 1-2.02-.192.25.25 0 1 1 .068-.495c.512.07 1.143.138 1.87.182l.921-.9a.25.25 0 0 1 .217-.067Z")
          strong= title
        button(class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation")
          span.navbar-toggler-icon
  main(role="main")
    section(class="jumbotron text-center")
      div.container
        img(src="../icon/whatsapp.png", alt="telegram" id="img-bot")
        p.lead.text-muted= '${Options.title} عبارة عن بوت للتيليجرام و الواتساب يقوم بنشر الصور والفيدوهات المتلقاه من جهات الاتصال او القروبات بشكل تلقائي.'
        a(href='${Options.web_telegram}' class="btn btn-outline-primary" id="link-bot") بوت تيليجرام
        a(href='${Options.web_whatsapp}' class="btn btn-outline-success" id="link-bot") بوت واتساب
    div.card.mb-4.box-shadow.container
      img(class="card-img-top" src="./media/${FileName}.jpeg" alt="${replace !== ' ' ? replace : ' '}")
      div.card-body#algnbtn
        a(href='media/${FileName}.jpeg' download= '${FileName}')
          svg(xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 20 20" fill="currentColor" class="mr-2 bi bi-cloud-arrow-down-fill" id="algntxt")
            path(fill-rule="evenodd" d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 6.854-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5a.5.5 0 0 1 1 0v3.793l1.146-1.147a.5.5 0 0 1 .708.708z")
      div.card-body
        p.text-center ${replace_msg}
        div.d-flex.justify-content-between.align-items-center
          div.card-body#algnbtn
            a(href= 'https://wa.me/${From_Id}' id="link-bot"): small#algntxt-color ${FirstName} 
              svg(xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16")
                path(d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z")
      div#algnbtn
        svg(xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-bounding-box" viewBox="0 0 16 16")
          path(d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z")
          path(d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z")
      small.text-muted#algntxt ${From_Id}
      div#algnbtn
        svg(xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16")
          path(d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z")
          path(d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z")
      small.text-muted#algntxt ${Time}
  footer.text-muted
    div.container
      p.float-right: a(href="#")
        svg(xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 20" fill="currentColor" class="mr-2 bi bi-arrow-up-square")
          path(fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z") 
      p= 'جميع الحقوق محفوظة لموقع ${Options.title} ©'
      p Github <a href="https://github.com/rn0x">@Rn0x</a> Telegram <a href="https://t.me/binattia">https://t.me/binattia</a>
      
      `

      fs.writeFile(`./server/www/whatsapp/html/${FileName}.pug`, code);

  } catch(error) {

      console.log(error.toString())
  }
  
}

export async function CreateHtmlVideo_WH(Message, FileName, From_Id, FirstName, Time) {

try {


    let replace = Message.replace(/ /g, '_').split("\n")
    let replace_msg = Message !== ' ' ? Message.replace(/(?:\r\n|\r|\n)/g, '\n          p.text-center ') : ''
    let config = fs.readJsonSync('./config.json')
    let Options = {

      title: `${config.title}`,
      web_home: `https://${config.domain}`,
      web_telegram: `https://${config.domain}/telegram`,
      web_whatsapp: `https://${config.domain}/whatsapp`
    }
    let code = `
doctype html
html(lang="ar")
head
title= '${Options.title} - ${replace}'
meta(name="description", content='أنا بوت اقوم بنشر الصور والفيديوهات التي اتلقاها من جهات إتصالي او القروبات المنضاف إليها, أتواجد  على تيليجرام و واتساب.')
meta(name="author", content="rn0x")
meta(name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no")
script(src='../load.js')
script(src="https://code.jquery.com/jquery-3.2.1.slim.min.js") 
script(src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js") 
script(src="https://code.jquery.com/jquery-3.2.1.slim.min.js") 
script(src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js") 
link(rel="stylesheet", href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css")
link(rel="stylesheet", href="../css/style.css")
link(rel="icon", href="../icon/robot.png")
body
div.load#load
header
  div.collapse.bg-dark#navbarHeader
    div.container
      div.row
        div.card-body#algnbtn
          h4.text-white من أنا
          p.text-muted أنا بوت اقوم بنشر الصور والفيديوهات التي اتلقاها من جهات إتصالي او القروبات المنضاف إليها, أتواجد  على تيليجرام و واتساب.
        div.card-body#algnbtn
          h4.text-white تواص معي عبر
          p.text-muted <a href="https://t.me/binattia" class="btn btn-primary my-2">تيليجرام</a> <a href="mailto: rn0x711@gmail.com" class="btn btn-secondary my-2">Gmail</a>
  div.navbar.navbar-dark.bg-success.box-shadow
    div.container.d-flex.justify-content-between
      a(href="${Options.web_telegram}" class="navbar-brand d-flex align-items-center")
        svg(xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 20 20" fill="currentColor" class="mr-2 bi bi-robot")
          path(fill-rule="evenodd" d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Zm-8 5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 1 .182.135l.842 1.7.754-.785a.25.25 0 0 1 .166-.076 24.85 24.85 0 0 0 1.98-.19.25.25 0 0 1 .068.496 25.29 25.29 0 0 1-1.922.187l-.932.971a.25.25 0 0 1-.404-.062l-.847-1.71-.754.736a.25.25 0 0 1-.189.07 25.36 25.36 0 0 1-2.02-.192.25.25 0 1 1 .068-.495c.512.07 1.143.138 1.87.182l.921-.9a.25.25 0 0 1 .217-.067Z")
        strong= title
      button(class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation")
        span.navbar-toggler-icon
main(role="main")
  section(class="jumbotron text-center")
    div.container
      img(src="../icon/whatsapp.png", alt="telegram" id="img-bot")
      p.lead.text-muted= '${Options.title} عبارة عن بوت للتيليجرام و الواتساب يقوم بنشر الصور والفيدوهات المتلقاه من جهات الاتصال او القروبات بشكل تلقائي.'
      a(href='${Options.web_telegram}' class="btn btn-outline-primary" id="link-bot") بوت تيليجرام
      a(href='${Options.web_whatsapp}' class="btn btn-outline-success" id="link-bot") بوت واتساب
  div.card.mb-4.box-shadow.container
    video(class="card-img-top" src='./media/${FileName}.mp4' poster controls preload="metadata")
    div.card-body#algnbtn
      a(href='media/${FileName}.mp4' download= '${FileName}')
        svg(xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 20 20" fill="currentColor" class="mr-2 bi bi-cloud-arrow-down-fill" id="algntxt")
          path(fill-rule="evenodd" d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 6.854-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5a.5.5 0 0 1 1 0v3.793l1.146-1.147a.5.5 0 0 1 .708.708z")
    div.card-body
      p.text-center ${replace_msg}
      div.d-flex.justify-content-between.align-items-center
        div.card-body#algnbtn
          a(href= 'https://wa.me/${From_Id}' id="link-bot"): small#algntxt-color ${FirstName} 
            svg(xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16")
              path(d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z")
    div#algnbtn
      svg(xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-bounding-box" viewBox="0 0 16 16")
        path(d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z")
        path(d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z")
    small.text-muted#algntxt ${From_Id}
    div#algnbtn
      svg(xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16")
        path(d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z")
        path(d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z")
    small.text-muted#algntxt ${Time}
footer.text-muted
  div.container
    p.float-right: a(href="#")
      svg(xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 20" fill="currentColor" class="mr-2 bi bi-arrow-up-square")
        path(fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z") 
    p= 'جميع الحقوق محفوظة لموقع ${Options.title} ©'
    p Github <a href="https://github.com/rn0x">@Rn0x</a> Telegram <a href="https://t.me/binattia">https://t.me/binattia</a>
    
    `

    fs.writeFile(`./server/www/whatsapp/html/${FileName}.pug`, code);

} catch(error) {

    console.log(error.toString())
}

}