const PDFDocument = require('pdfkit');
const fs = require('fs');




const doc = new PDFDocument();

doc.pipe(fs.createWriteStream('output.pdf'));

doc.pipe(res);



doc
    .fontSize(25)
    .text('Some text with an embedded font!');



doc
    .fillColor('blue')
    .text('Here is a link!')
    .underline(100, 100, 160, 27, { color: '#0000FF' })
    .link(100, 100, 160, 27, 'http://google.com/');


doc.end();