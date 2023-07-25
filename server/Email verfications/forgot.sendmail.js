const nodemailer = require("nodemailer")
const Mailgen = require('mailgen')
const {EMAIL, PASSWORD} = require("../env")

module.exports = async function(email, shortcode){
  
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
        link: 'http://localhost:3000/'
    }
  });

  var response = {
    body: {
        intro: 'Change Password.',
        action: {
            instructions: 'To change your account\'s password, please click here:',
            button: {
                color: '#ff0000', 
                text: 'Change your Password',
                link: `http://localhost:3000/change/${shortcode}`
            }
        },
        outro: ''
    }
  };

  var emailBody = mailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: email,
    subject: 'Forgot Password',
    html: emailBody
  }

  transporter.sendMail(message).then(() =>{
  
  }).catch(error => {
    
  })
}

