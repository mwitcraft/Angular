var express = require('express')
var app = express()
var path = require('path')
const serveStatic = require('serve-static')

// app.use('/', serveStatic('public'))
app.use(express.static('public'))						      

app.listen(3000, function(){
    console.log('listening')
})
