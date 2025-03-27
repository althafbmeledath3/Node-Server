
const http = require('http')

const fs = require('fs')

const path = require('path')

const htmlPath = path.join(__dirname,'public',"index.html")
const cssPath = path.join(__dirname,"public","style.css")
const scriptPath = path.join(__dirname,"public","script.js")

console.log(htmlPath, cssPath);



server = http.createServer((req,res)=>{

    if(req.method==="GET"){
        console.log("Current Request");
        
        
        if(req.url==="/"){

            fs.readFile(htmlPath,(error,data)=>{

                if(error){
                    res.writeHead(500)
                    res.end(error.message)
                    
                }
                else{

                    res.writeHead(200,{"Content-Type":"text/html"})
                    res.end(data)
                }
            })  
        }   
        if(req.url==="/style.css"){
            fs.readFile(cssPath,(error,data)=>{
                if(error){
                    res.writeHead(500)
                    res.end(error.message)
                }
                else{
                    res.writeHead(200,{"Content-Type":"text/css"})
                    res.end(data)
                }
            })
        }

        if(req.url=="/script.js"){
            fs.readFile(scriptPath,(error,data)=>{
                if(error){
                    res.writeHead(500)
                    res.end(error.message)
                }
                else{
                    res.writeHead(200,{"Content-Type":"text/script"})
                    res.end(data)
                }
            })
        }

        console.log(req.url);
        
    }
})

let port = 3000

server.listen(port,()=>{
    console.log("Server Running",port);
    
})





