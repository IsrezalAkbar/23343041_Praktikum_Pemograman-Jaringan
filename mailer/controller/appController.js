const nodemailer = require("nodemailer");
const mailgen = require("mailgen");
const { EMAIL, PASSWORD } = require("../env.js");

const signup = async (req, res) => {
  try {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    let message = {
      from: '"Fred Foo" <foo@example.com>',
      to: "bar@example.com, baz@example.com",
      subject: "Hello ✔",
      text: "Daftar Berhasil",
      html: "<b>Daftar Berhasil</b>",
    };

    transporter.sendMail(message, (err, info) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(201).json({
        msg: "Email Terkirim",
        messageId: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getBill = async (req, res) => {
  try {
    const userEmail = req.body?.userEmail || req.query?.userEmail;

    if (!userEmail) {
      return res.status(400).json({ 
        error: "userEmail diperlukan. Kirim di body JSON: {\"userEmail\": \"email@gmail.com\"}" 
      });
    }

    let config = {
      service: "gmail",
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    };
    let transporter = nodemailer.createTransport(config);

    let mailGenerator = new mailgen({
      theme: "default",
      product: {
        name: "Mailgen",
        link: "https://mailgen.js/",
      },
    });

    let response = {
      body: {
        name: "Isrezal Akbar",
        intro: "Tagihan anda telah terbit",
        table: {
          data: [
            {
              item: "nodemailer stack book",
              description: "A backend Application",
              price: "$10.99",
            },
          ],
        },
        outro: "Menantikan untuk berbelanja kembali",
      },
    };

    let mail = mailGenerator.generate(response);

    let message = {
      from: EMAIL,
      to: userEmail,
      subject: "Tagihan anda telah terbit",
      html: mail,
    };

    transporter
      .sendMail(message)
      .then(() => {
        return res.status(201).json({
          msg: "Anda seharusnya menerima email",
        });
      })
      .catch((error) => {
        return res.status(500).json({ error: error.message });
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { signup, getBill };
