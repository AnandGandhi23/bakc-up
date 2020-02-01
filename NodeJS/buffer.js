var buf = Buffer.from("this is example of buffer", "utf-8");

var json = buf.toJSON(buf);
console.log(buf);
console.log(json);


var buff1 = Buffer.allocUnsafe(10);
console.log(buff1);
var buff2 = Buffer.alloc(10);
console.log(buff2);