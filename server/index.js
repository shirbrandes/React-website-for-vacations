const session= require('express-session')
const express = require('express')
require('./db/config')
const cors = require(`cors`)
const app = express ()
app.use(express.json())
app.use(cors(
    {
        origin:"http://localhost:3000",
        credentials:true
    }
))
app.use(session( {
    secret: "project",
    cookie: {
        maxAge: 100000
    }
}))


app.use('/user', require('./routes/user'))
app.use('/admin', require('./routes/admin'))


app.listen(1000, () => console.log("server up and running on port 1000"))
