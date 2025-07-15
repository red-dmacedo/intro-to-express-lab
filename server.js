const express = require('express');
const app = express();
const localPort = 3000;
app.listen(localPort, ()=>{console.log(`listening on port: ${localPort}`)});
// ===== App =====
app.get('/', (req, res) => {
  // res.redirect('/greetings/Devin');
  // res.redirect('/roll/15');
  res.redirect('/shoes?min=0&max=2000&type=boot')
});

app.get('/greetings/:username', (req, res)=>{
  res.send(`<h1>Hello there, ${req.params.username}</h1>`);
});

app.get('/roll/:num', (req,res)=>{
  const num = req.params.num;
  if(!Number(num)) res.send('<h1>You must specify a number</h1>');
  res.send(`<h1>You rolled a ${rollNum(num)}</h1>`);
});

app.get('/collectibles/:index', (req,res)=>{
  let idx = req.params.index;
  if(!Number(idx)) idx = Number(idx);
  if(!Number(idx) && idx !== 0) res.send('<h1>Index must be a number</h1>');
  const item = collectibles[idx];
  if(!(item)) res.send('<h1>This item is not yet in stock</h1>');
  res.send(`<h1>So, you want the ${item.name}?</h1><h1>For ${item.price}, it can be yours!</h1>`);
});

app.get('/shoes', (req,res)=>{
  let minPrice = req.query.min;
  let maxPrice = req.query.max;
  const reqType = req.query.type;
  if(!minPrice) minPrice=0;
  if(!maxPrice) maxPrice=999999999;

  const results = shoes.filter((item) => {
    if(
      item.price >= minPrice &&
      item.price <= maxPrice
    ){
      if(
        reqType && item.type === reqType ||
        !reqType
      ){ return 1 };
    };
    return 0;
  });

  let formattedResults = "";
  for(let line of results){
    formattedResults += `<h1>${JSON.stringify(line)}</h1>`
  };

  res.send(formattedResults);
});
// ===== App End=====

// ===== Objects =====
const collectibles = [
  {name: 'shiny ball', price: 5.95},
  {name: 'autographed picture of a dog', price: 0.99},
  {name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99},
];
const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
  ];

// ===== Objects End =====

// ===== Functions =====
function rollNum(end=1, start=0){
  return Math.floor(Math.random() * (end-start+1))+start;
};
// ===== Functions End =====