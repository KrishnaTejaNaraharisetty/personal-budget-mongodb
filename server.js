const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const budgetModel = require('./models/budget_model')
const mongoose = require('mongoose')

let url = 'mongodb://localhost:27017/week8db';

app.use('/' , express.static('public'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));





// app.get('/budget', (req, res) => {
//     const samp=require('./data.json')
//     res.json(samp);
// });


// app.get('/budget', (req,res) => {
//     mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
//         .then(() => {
//             console.log("Connected to Database");
//                 myBudget.find().exec().then(data =>{
//                 //console.log(data);
//                 res.json(data);
//                 mongoose.connection.close();
//                 console.log("Connection Closed");
//             })
//             .catch(err =>{
//             console.log(err);
//             })
//         })
//         .catch((connectionError) => {
//             console.log(connectionError);
//     })
// });

// app.post('/budget', (req,res) => {
//     const add = new myBudget({ title: req.body.title, budget: req.body.budget, color: req.body.color});
//     mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
//         .then(() => {
//             console.log("Connected to Database");
//             myBudget.insertMany(add)
//                     .then((data) => {
//                     res.send('Added')
//                     mongoose.connection.close();
//                     console.log("Connection Closed");
//                     })
//                     .catch((connectionError) => {
//                     console.log(connectionError)
//                     })
//         })
//         .catch((connectionError) => {
//             console.log(connectionError);
//     })
// });

app.get("/budget", (req, res) => {
    mongoose.connect("mongodb://localhost:27017/week8db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to the Database");
      budgetModel.find({})
        .then((data) => {
          res.json(data);
          console.log(data);
          mongoose.connection.close();
        })
        .catch((connectionError) => {
          console.error(connectionError);
        });
    })
    .catch((err) => {
      console.error(err);
    });
  });


app.post("/budget", (req, res) => {
    mongoose.connect("mongodb://localhost:27017/week8db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to the database");
  
      const data = req.body; // Assuming req.body is an array of budget items
  
      // Validate that the request body is an array
      if (!Array.isArray(data)) {
        return res.status(400).json({ error: "Invalid request format. Expecting an array of budget items." });
      }
  
      // Use Promise.all to create and save all budget items
      Promise.all(data.map(itemData => {
        const newItem = new budgetModel(itemData);
        return newItem.save();
      }))
        .then((savedItems) => {
          res.json('Succesfully posted data');
          console.log(savedItems);
          mongoose.connection.close();
        })
        .catch((connectionError) => {
          console.error(connectionError);
          res.status(500).json({ error: 'Internal Server Error' });
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Server Error' });
    });
  });

app.listen(port, ()=> {
    console.log('Example app listening at http://localhost:$(port)');
});
