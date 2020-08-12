const express = require('express');

const port = process.env.PORT || 8080

app = express()

app.get("/",(req,res) => {
    return res.send("hello")
})

app.listen(port , () => {
    console.log("listening on port "+port)
})