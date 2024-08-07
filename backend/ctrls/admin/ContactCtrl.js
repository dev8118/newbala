const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const sgMail = require("@sendgrid/mail");
const Contact = require("../../models/ContactModel");

const fetch = async (req, res) => {
  const { search } = req.query;
  const contacts = await Contact.find({
    $or: [
      {
        name: new RegExp(search, "i"),
      },
      {
        email: new RegExp(search, "i"),
      },
      {
        phone: new RegExp(search, "i"),
      },
      {
        message: new RegExp(search, "i"),
      },
    ],
  });

  return res.json(contacts);
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    await Contact.findByIdAndUpdate(id, data);
    return res.json({
      status: true,
      msg: "با موفقیت به روز شد.",
    });
  } catch (err) {
    return res.json({
      status: false,
      msg: err.message,
    });
  }
};

const sendEmail = async (req, res) => {
  try {
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const SENDGRID_USER = process.env.SENDGRID_USER;
    const { id } = req.params;
    const { email, content } = req.body;
    const contact = await Contact.findById(id);
    sgMail.setApiKey(SENDGRID_API_KEY);
    const template = fs.readFileSync(
      path.join(__dirname, "../../templates/ContactReplyEmail.ejs"),
      "utf-8"
    );
    const params = {
      logoUrl: `${req.protocol}://${req.headers.host}/images/logo-email.png`,
      name: contact.name,
      content: content,
    };
    const compiledTemplate = handlebars.compile(template);
    const html = compiledTemplate(params);
    await sgMail.send({
      to: email,
      from: SENDGRID_USER,
      subject: "مديرية بلدية الكوت - محافظة واسط",
      html: html,
    });

    return res.json({
      status: true,
      msg: "تم ارسال الايميل بنجاح",
    });
  } catch (err) {
    return res.json({
      status: false,
      msg: err.message,
    });
  }
};

const sendSms = async (req, res) => {
  try {
    const TWILIO_API_KEY = process.env.TWILIO_API_KEY;
    const TWILIO_SECRET_KEY = process.env.TWILIO_SECRET_KEY;
    const TWILIO_PHONE = process.env.TWILIO_PHONE;
    const { id } = req.params;
    const { phone, content } = req.body;
    const contact = await Contact.findById(id);
    const twilio = require("twilio")(TWILIO_API_KEY, TWILIO_SECRET_KEY);
    let smsContent = `السلام عليكم\r\n\r\n`;
    smsContent += `عزيزي المرسل ${contact.name}\r\n\r\n`;
    smsContent += `${content}\r\n\r\n`;
    smsContent += `شكرا لتواصلكم\r\n`;
    smsContent += `قسم الدعم\r\n\r\n`;
    smsContent += `مديرية بلدية الكوت\r\n`;
    smsContent += `محافظة واسط\r\n`;
    smsContent += `جمهورية العراق`;

    await twilio.messages.create({
      body: smsContent,
      from: `+${TWILIO_PHONE}`,
      to: `+${phone}`,
    });

    return res.json({
      status: true,
      msg: "تم ارسال الايميل بنجاح",
    });
  } catch (err) {
    console.log(err)
    return res.json({
      status: false,
      msg: err.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);

    return res.json({
      status: true,
      msg: "با موفقیت حذف شد.",
    });
  } catch (err) {
    return res.json({
      status: false,
      msg: err.message,
    });
  }
};

module.exports = {
  fetch,
  update,
  sendEmail,
  sendSms,
  remove,
};
