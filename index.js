const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/routes')
const app = express()

// app.use(express.json()); 
// app.express(express.static('public'));
app.use(cors())
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:"50mb",extended:true,parameterLimit:5000}))    
app.use(express.json())
app.use(router);
app.listen(4500, () => {
    console.log('server 4500 start successfully')
})