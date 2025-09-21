
const fs   = require('fs');
const path = require('path');


let buf = Buffer.from('Node.js buffers are powerful');



buf.write('FAST ');


const extraBuf = Buffer.from(' and flexible!');


const finalBuf = Buffer.concat([buf, extraBuf]);


const finalString = finalBuf.toString();


const outputPath = path.join(__dirname, 'buffer_output.txt');
fs.writeFileSync(outputPath, finalString);


console.log('File saved at:', outputPath);
