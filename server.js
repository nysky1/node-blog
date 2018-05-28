
const express = require('express');
const morgan = require('morgan');

const app = express();

const blogListRouter = require('./blog-router');

//set properties of packages
app.use(morgan('common'));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.use('/blog-posts', blogListRouter);

let server;

function runServer() {
  const port = process.env.PORT || 3000;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
      resolve(server);
    }).on('error', err => {
      reject(err)
    });
  })
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('CLosing server');
    server.close(err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    })
  })
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};

   