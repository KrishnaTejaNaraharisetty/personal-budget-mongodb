const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const myBudget = require('./models/budget_model')
const mongoose = require('mongoose')

let url = 'mongodb://localhost:27017/week8db';

app.use('/' , express.static('public'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



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

/*
app.get('/hello', (req, res) => {
    res.send('Hello World!');
});
*/
// app.get('/budget', (req, res) => {
//     const samp=require('./data.json')
//     res.json(samp);
// });


app.get('/budget', (req,res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            console.log("Connected to Database");
                myBudget.find().exec().then(data =>{
                //console.log(data);
                res.json(data);
                mongoose.connection.close();
                console.log("Connection Closed");
            })
            .catch(err =>{
            console.log(err);
            })
        })
        .catch((connectionError) => {
            console.log(connectionError);
    })
});

app.post('/budget', (req,res) => {
    const add = new myBudget({ title: req.body.title, budget: req.body.budget, color: req.body.color});
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            console.log("Connected to Database");
            myBudget.insertMany(add)
                    .then((data) => {
                    res.send('Added')
                    mongoose.connection.close();
                    console.log("Connection Closed");
                    })
                    .catch((connectionError) => {
                    console.log(connectionError)
                    })
        })
        .catch((connectionError) => {
            console.log(connectionError);
    })
});

app.listen(port, ()=> {
    console.log('Example app listening at http://localhost:$(port)');
});
