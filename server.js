
const express = require('express');
const morgan = require('morgan');

const app = express();

const blogListRouter = require('./blog-router');

//set properties of packages
app.use(morgan('common'));

app.use('/blog-posts',blogListRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 3000}`);
  });
   