
const nodeMailer=require("nodemailer")


// email send for restart password
const sendEmail=async(options)=>{
  
    const tarnsporter=nodeMailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        secure: true,
        service:process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD,
        }
    })

    const mailOption={
        from:process.env.SMPT_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message
    }
      await tarnsporter.sendMail(mailOption)
 
}

module.exports=sendEmail;

