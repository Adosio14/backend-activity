const express = require('express')
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

// App
app.use(checkHeader)


app.get('/', function(req,res){
    res.sendFile(__dirname+'/src/views/home.html')
})


app.listen(4000)