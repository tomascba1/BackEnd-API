const transport = require("../config/nodemailer")

async function sendMessage(req, res){
    const {name, email, message} = req.body
    const emailMsg = {
        to: "help@dobermanlifestyle.com",
        from: email,
        subjet: "Mensaje desde formulario de contacto",
        html: `Contacto de ${name}: ${message}`
    }

    const sendMailStatus = await transport.sendMail(emailMsg)
    let sendMailFeedback = ""
    if(sendMailStatus.rejected.length){
        sendMailFeedback = "No pudimos enviar el mensaje, intente nuevamente"
        res.render("contact") 
    } else {
        sendMailFeedback = "El mensaje se envio correctamente"
    }
    res.render("contact", {message: sendMailFeedback})
}

module.exports = sendMessage