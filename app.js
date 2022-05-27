const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const path = require('path');

const MONGODB_URI = `mongodb+srv://account:1234567a@project2.8qut4pc.mongodb.net/project2?retryWrites=true&w=majority`;

const Account = require('./models/account');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

// api routes
// app.use('/', routes);

app.get('/accounts', (req, res) => {
  Account.find({}, function(err, accounts) {
    res.render('index', {
      accountList: accounts
    });
  });
});

app.get('/accounts/:id', (req, res) => {
  const id = req.params.id;
  Account.findById(id, function(err, account) {
    res.render('account', {
      account
    });
  });
});


mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDb...');
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Listening to port ${port}...`);
    });
  })
  .catch((err) => console.log(err));

