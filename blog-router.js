const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

BlogPosts.create('title 2','content 1','author 1','5/24/2018')

router.get('/', (req,res) => {
    res.json(BlogPosts.get());
})

module.exports = router;