const nodemailer = require("nodemailer")
const Mailgen = require('mailgen')
const {EMAIL, PASSWORD} = require("../env")

module.exports = function(email, name, shortcode){
  
  let config = {
    service: 'gmail',
    auth:{
      user: EMAIL,
      pass: PASSWORD
    }
  }

  let transporter = nodemailer.createTransport(config);

  var mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'E-commerce Project',
        link: `http://localhost:3000/`
    }
  });

  var response = {
    body: {
        name: name,
        intro: 'Thanks for signing up with us.',
        action: {
            instructions: 'To verify your account, please click here:',
            button: {
                color: '#22BC66', 
                text: 'Verify your account',
                link: `http://localhost:3000/verify/${shortcode}`
            }
        },
        outro: ''
    }
  };

  var emailBody = mailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: email,
    subject: 'Email Verification',
    html: emailBody
  }

  transporter.sendMail(message).then(() =>{
    
  }).catch(error => {
    console.log(error)
  })
}

