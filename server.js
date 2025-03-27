const http = require("http");

const fs = require("fs");

const path = require("path");

const queryString = require("querystring");

const { json } = require("stream/consumers");

const htmlPath = path.join(__dirname, "public", "index.html");
const cssPath = path.join(__dirname, "public", "style.css");
const scriptPath = path.join(__dirname, "public", "script.js");

console.log(htmlPath, cssPath);

server = http.createServer((req, res) => {
  console.log(req.method);
  if (req.method === "GET") {
    console.log("Current Request");
    console.log(req.url);

    if (req.url === "/") {
      fs.readFile(htmlPath, (error, data) => {
        if (error) {
          res.writeHead(500);
          res.end(error.message);
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        }
      });
    }
    if (req.url === "/style.css") {
      fs.readFile(cssPath, (error, data) => {
        if (error) {
          res.writeHead(500);
          res.end(error.message);
        } else {
          res.writeHead(200, { "Content-Type": "text/css" });
          res.end(data);
        }
      });
    }

    if (req.url === "/script.js") {
      fs.readFile(scriptPath, (error, data) => {
        if (error) {
          res.writeHead(500);
          res.end(error.message);
        } else {
          res.writeHead(200, { "Content-Type": "text/script" });
          res.end(data);
        }
      });
    }
  } 
  else if (req.method == "POST") {
    if (req.url === "/send-data") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        let parsed = queryString.parse(body);
        fs.readFile("./data.json",(error,data)=>{
            
            let contents = error ? [] : JSON.parse(data)
            contents.push(parsed)
            fs.writeFile("./data.json",JSON.stringify(contents),error=>{
                if(error){
                    res.writeHead(500)
                    res.end(error.message)
                }
                else{
                    res.writeHead(200)
                    res.end("Successfully recieved Data")
                    
                }
            })
        })
      });
    }
  }
});

let port = 3000;

server.listen(port, () => {
  console.log("Server Running", port);
});
