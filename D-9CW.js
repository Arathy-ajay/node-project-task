
const buf = Buffer.from('NodeJS is fast');

const nodeBuf = buf.slice(0, 6);
console.log('Sliced Buffer:', nodeBuf.toString()); 


const powerBuf = Buffer.from('Powerful');

const result = nodeBuf.compare(powerBuf);

if (result < 0) {
  console.log(`${nodeBuf.toString()} comes before ${powerBuf.toString()}`);
} else if (result > 0) {
  console.log(`${powerBuf.toString()} comes before ${nodeBuf.toString()}`);
} else {
  console.log('Both buffers are equal');
}

const json = nodeBuf.toJSON();
console.log('JSON representation:', json);
