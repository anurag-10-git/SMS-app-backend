const dotenv = require('dotenv');
const fast2sms = require('fast-two-sms');
const nodemailer = require('nodemailer');
const sendinblueTransport = require('nodemailer-sendinblue-transport');

dotenv.config();

const transporter = nodemailer.createTransport(
  new sendinblueTransport({
    apiKey: process.env.SNB_API_KEY,
  })
  );

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
let twilioNum = process.env.TWILIO_PHONE_NUMBER;

const client = require('twilio')(accountSid, authToken);

const messagebird = require('messagebird').initClient(process.env.MESSAGEBIRD_API_KEY);

class UserController {
    static sendMessage =(req,res) => {    
      const otp = Math.floor(100000 + Math.random() * 900000);

    //   var params = {
    //     template: "Your Login OTP is %token",
    //     timeout: 300
    //   }
       
    //   messagebird.verify.create(newPhoneNumber, params,(err, response) =>{
    //     if(err) {
    //      console.log("OTP send error",err);
    //      return res.status(400).json({
    //          "status" : "failed",
    //          "message": "Unable to send OTP"
    //      })
    //     } 
    //     console.log("OTP",response);

    //     res.status(200).send({
    //         "status": "success",
    //         "message": "OTP sent successfully",
    //         "id" : response.id
    //     })
    //   })

  //  console.log(process.env.FAST2SMS_API_KEY, req.body);
  //   fast2sms.sendMessage({ authorization: process.env.FAST2SMS_API_KEY, message: req.body.message, numbers: [phoneNumber] }).then(response => {
  //       console.log(response);
  //      return res.json(response);
  //  }).catch(error => {
  //   console.log(error);
  //  })

  client.messages.create({
    body: `${req.body.message}.This is your OTP: ${otp}`,
    from: '+12166773249',
    to: '+916206396234'
  }).then(message => {
    res.status(200).json({phone:'+916206396234', otp, msg:req.body.message})
  }).catch(error => {
    console.log(error);
    return res.json({error: error.message})
  })
    }

    static sendEmail = (req,res,next) => {

      transporter.sendMail({
        to: req.body.email,
        from: 'SmsKissan@contact.com',
        subject: 'Email from kissan network!',
        text: req.body.message,
        html: `<h1>${req.body.message}</h1>`                
      }).then(response=> {
        res.json({message: 'Email sent successfully!'})
      }).catch(error => {
        console.log(error)
      })
      
    }
}

module.exports = UserController;