const express = require('express');
const app = express();

app.get('/', (req,res) => {
  res.redirect('/greetings/Devin');
})

app.get('/greetings/:username', (req, res)=>{
  res.send(`Hellow there, ${req.params.username}`);
});
