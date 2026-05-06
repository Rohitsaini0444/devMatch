const express = require('express');
const app = express();
const {adminAuth} = require('./middlewares/auth');

app.use('/admin',adminAuth);

app.use('/admin/all',(req, res)=>{
  res.send("Sent all admin data");
});

app.listen(3000, ()=>{
  console.log("Server is running on port 3000");
});