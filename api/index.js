// core utility function imports
const express = require('express');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const logger = require('./logger');
const covid19ImpactEstimator = require('../src/estimator');

// invoke the express server
const app = express();

// Set port environment and create a Router
const port = process.env.PORT || 3000;

// TODO: Export Router logic to Router module & controllers
// Also a good practice for cleaner code
const covidRouter = express.Router();

// Route to fetch data in json
covidRouter.route('/json')
  .get((req, res) => {
    });
  });

// Route to fetch data in xml format
covidRouter.route('/xml')
  .get((req, res) => {
    
    });
  });

// Route to fetch request logs
covidRouter.route('/logs')
  .get((req, res) => {
    
    });
  });

// Vanity extension to router path
app.use('/api/v1', covidRouter);

// base url request
app.get('/', (req, res) => {
  res.send('Welcome to Covid19 Estimator');
});

// set port listener for the express app
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(chalk.blue(`Listening to app on port ${port}`));
});