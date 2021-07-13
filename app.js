const express = require('express')
const fs = require('fs')
const { get } = require('http')
const app = express()



// MiddleWare

let checkHeader = function(req, res, next){
    let token = "Bearer 65a83e72c7e990a3e6565ae8b7cc071c"
    if (token === req.get('Authorization')){
        next()
    }else{
        return res.status(401).send('Unathorized')
    }
}
let logger = function(req, res, next){
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let data = ` ${req.ip}, ${date}, ${time} `
    fs.writeFile(date +'.'+'log' , '' , function(err){
        if (err) throw err;
    })
    if (fs.existsSync(date +'.'+'log') === true){
        fs.appendFile(date +'.'+'log', data + "\n", {encoding: 'utf8', flag: 'a'}, err =>{
            if (err) throw err;
        } )
        next()
    }
}

// App
//app.use(checkHeader)
app.use(logger)


app.get('/', function(req,res){
    res.sendFile(__dirname+'/src/views/home.html')
})


app.listen(4000)