const fs = require('fs');
const http = require('http');
const requests = require('requests');
const home = fs.readFileSync("home.html","utf-8");
const func1 = ((old,updated)=>{
let newVal = old.replace("{%quote%}",updated.text);
newVal=newVal.replace("{%author%}",updated.author);
return newVal;
});
const server=http.createServer((req,res)=>{
    if(req.url=="/")
    {
        requests("https://type.fit/api/quotes")
        .on("data",(chunk)=>{
            const obj = JSON.parse(chunk);
            var x = Math.floor(Math.random()*1643);
            const newFunc = func1(home,obj[x]);
            res.write(newFunc);
        })
        .on("end",(err)=>{
            if(err)
            res.end();
        })
    }
});
server.listen(3000);
