const express = require('express');
const app = express();
const port = 3000;

app.use('/', express.static('public'));

/*
const budget = {
    myBudget: [
    {
        title: 'Eat Out',
        budget: 30
    },

    {
        title: 'Rent',
        budget: 350
    },

    {
        title: 'Groceries',
        budget: 90
    },
    ]
}; 
*/

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

//const datax = fs.readFileSync('budget.json');
//const jsonDatax = JSON.parse(datax);

//import data from './budget.json' assert { type: 'json' };

app.get('/budget', (req, res) => {
    const samp=require('./budget.json')
    res.json(samp);
});



app.listen(port, ()=> {
    console.log('Example app listening at http://localhost:$(port)');
});