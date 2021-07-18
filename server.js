const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
const path = require('path');
const fs = require('fs');
const pdfkit = require('pdfkit');
require('dotenv').config();

var mailOptions;
let pdf = new pdfkit();

let buffers = [];
pdf.on('data', buffers.push.bind(buffers));
pdf.on('end', () => {

    let pdfData = Buffer.concat(buffers);
    const auth = {
        auth: {
            api_key: process.env.API_KEY, // TODO: 
            domain: process.env.DOMAIN // TODO:
        }
    };

    let transporter = nodemailer.createTransport(mailGun(auth));
    mailOptions = {
        from: 'tolualonge123@gmail.com',
        to: "doctorflow74@gmail.com",
        subject: 'A new app for you',
        text: 'Wooohooo it work999!!',
        attachments: [{
            filename: 'james.pdf',
            content: pdfData
        }]
    };


    return transporter.sendMail(mailOptions).then(() => {
        console.log('email sent:');
    }).catch(error => {
        console.error('There was an error while sending the email:', error);
    });

});

pdf.text('Hello boy today is my birthday ', 100, 100);
pdf.fontSize(25)
    .text('Some text with an embedded hhhhhfont!');



pdf
    .fillColor('blue')
    .text('Here is a link to my gmail account my boy!')
    .underline(100, 100, 160, 27, { color: '#0000FF' })
    .link(100, 100, 160, 27, 'http://google.com/');
pdf.end();