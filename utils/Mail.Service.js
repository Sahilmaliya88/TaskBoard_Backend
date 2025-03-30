const nodemailer = require("nodemailer");
const { SENDER_EMAIL, SENDER_PASSWORD } = require("../Config/Config");
const ejs = require("ejs")
const path = require("path")
class Email{
    constructor(user,url){
        this.to = user.email;
        this.username = user.username;
        this.url = url;
        this.from = `Taskbook team <taskbook@gamil.com>`
    }
    createTransporter(){
        if(process.env.NODE_ENV==="production"){
            return nodemailer.createTransport({
                service:"gmail",
                host:"smtp.gmail.com",
                secure:false,
                port:587,
                auth:{
                    user:SENDER_EMAIL,
                    pass:SENDER_PASSWORD
                }
            }) 
        }
        return nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "84063c4b2103f6",
              pass: "047f96c571c6f9"
          }
        }) 
    }
    async sendMail(template,subject){
        try{
            const template_path = path.join("/app/"+"templates",`${template}.ejs`)
            const html =await ejs.renderFile(template_path,{username:this.username,url:this.url})
            const options = {
                from: this.from,
                to: this.to,
                subject,
                html,
            }
            await this.createTransporter().sendMail(options); 
        }catch(error){
            console.log(error.message)
        }
    }
    async ResetEmail(){
        await this.sendMail('ResetPassword',"Password Reset Link")
    }
    async VericationEmail(){
        await this.sendMail("verifyaccount","Verify Account")
    }
}

module.exports = Email