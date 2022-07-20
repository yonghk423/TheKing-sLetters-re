const { user, mileage } = require('../../models');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const ejs = require('ejs')
const path = require('path')
const appDir = path.dirname(require.main.filename);

module.exports = async (req, res) => {
console.log(req.body)
  const { name, email, password, mobile, gender } = req.body

  if(!name || !email || !password || !mobile || !gender) {
    res.status(422).send('필수 항목을 모두 채워주세요.')
  }

  const salt = Math.round((new Date().valueOf() * Math.random())) + "";
  const hashedPassword = crypto.createHash("sha512").update(password + salt).digest("hex");

  const emailOverlap = await user.findOne({
    where: { email: email }
  })
  const nameOverlap = await user.findOne({
    where: { name: name }
  })

  if(emailOverlap) {
    res.status(409).send('이미 존재하는 이메일입니다.')
  } else if(nameOverlap) {
    res.status(409).send('중복되는 닉네임입니다.')
  } else {
    let firstKey=crypto.randomBytes(256).toString('hex').substr(100, 5);
    let secondKey=crypto.randomBytes(256).toString('base64').substr(50, 5);
    let verifyKey=firstKey+secondKey;
    const forVerify = () => {
      if(verifyKey.includes('+')) {
        firstKey=crypto.randomBytes(256).toString('hex').substr(100, 5);
        secondKey=crypto.randomBytes(256).toString('base64').substr(50, 5);
        verifyKey=firstKey+secondKey;
        if(verifyKey.includes('+')){
          forVerify()
        }
      }
    }
    forVerify()

    let emailTemplete;
    //url
    const url = 'http://' + req.get('host')+'/confirmemail'+'?key='+verifyKey;
    ejs.renderFile(appDir+'/controllers/users/template/mail.ejs', {url : url, name: name}, function (err, data) {
      if(err){console.log(err)}
      emailTemplete = data;
    });

    const newUser = await user.create({
      name: name,
      email: email,
      password: hashedPassword,
      mobile: mobile,
      gender: gender,
      image: req.body.image || "https://cdn.discordapp.com/attachments/859214492265480213/902849333752377354/106_20211027182045.png",
      salt: salt,
      verified: false,
      verifyKey: verifyKey
    })

    mileage.create({
      mileage: 0,
      userId: newUser.id
    })

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASS,
      },
    });
    
    //옵션
    let from = `나랏말싸미 <kingsletter1443@gmail.com>`
    const mailOptions = {
      from: from,
      to: email,
      subject: '[나랏말싸미] 회원가입 인증 메일입니다.',
      html: emailTemplete
    };

    //전송
    transporter.sendMail(mailOptions, function(err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log('Email sent: ' + info.response);
      }
      transporter.close();
    });

    res.status(201).send('이메일을 확인하세요.');
  }
};

