const express = require('express');
const app = express();
const PORT = 3000;
app.get("/", (req, res)=>{
    res.send(`<H1>Welcome To Home Page</H1>`);
})


app.listen(PORT, ()=>{
    console.log(`Server Started At port ${PORT}`);
})