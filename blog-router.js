const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { BlogPosts } = require('./models');

BlogPosts.create('Paceline - The Beginning', 'Once upon a time there was a man named Bill Smith', 'Jane Bishop', '5/24/2018')
BlogPosts.create('Skyview Spirit Run', 'It is almost time for the 2018 Fund Run for Skyview Academy.', 'Jim Bishop', '5/1/2018')
BlogPosts.create('Soccer for Kids', 'Get the ball rolling and sign up the kids for soccer.', 'Bob Bishop', '5/15/2018')
BlogPosts.create('Solve the Cube!', 'You too can solve the Rubiks Cube.', 'Joe Bob Bishop', '5/15/2018')

router.get('/', (req, res) => {
    res.json(BlogPosts.get());
})

router.delete('/:id', (req, res) => {
    BlogPosts.delete(req.params.id)
    console.log(`Deleted Blog Post id: ${req.params.id}`)
    res.status(204).end();
})

router.post('/', jsonParser, (req, res) => {
    const requiredFields = ['title', 'content', 'author'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    };
    const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
    res.status(201).json(item);
})

router.put('/:id', jsonParser, (req, res) => {
    const requiredFields = ['title', 'content', 'author'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    };
    if (req.params.id !== req.body.id) {
        const message = `The body id doesn't match the path ${req.params.id}`;
        console.error(message);
        res.status(401).send(message);
    }
    console.log(`Updating blog post id: ${req.body.id}`);
    const {id, title, author, content, publishDate} = req.body;
    const updatedItem = BlogPosts.update( {
        //...req.body
        id, title, author, content, publishDate
    });
    res.status(200).end();
});

module.exports = router;