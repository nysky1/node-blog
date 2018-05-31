const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { BlogPosts } = require('./model');

router.get('/', (req, res) => {
    const filters = {};
    const queryableFields = ['title', 'author'];
    queryableFields.forEach(field => {
        if (req.query[field]) {
            filters[field] = req.query[field];
        }
    })
    console.log(filters);
    BlogPosts
        .find(filters)
        .then(BlogPosts => res.json(
            BlogPosts.map(blog => blog.serialize())
        ))
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'BlogApp - Internal Server Error' })
        });
});

router.get('/:id', (req, res) => {
    BlogPosts
        .findById(req.params.id)
        .then(blog => res.json(blog.serialize()))
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'BlogApp - Internal Server Error' });
        })
});

router.delete('/:id', (req, res) => {
    BlogPosts
        .findByIdAndRemove(req.params.id)
        .then(blog => res.status(204).end())
        .catch(err => res.send(500).json({ message: 'BlogApp - Internal Server Error' }));
});

router.post('/', (req, res) => {
    const requiredFields = ['title', 'content', 'author'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    };
    BlogPosts
        .create(
            {
                title: req.body.title,
                author: req.body.author,
                content: req.body.content
            }
        )
        .then(blog => res.status(201).json(blog.serialize()))
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Blog App: Internal Server Error' })
        });
});

// router.post('/', jsonParser, (req, res) => {
//     const requiredFields = ['title', 'content', 'author'];
//     for (let i = 0; i < requiredFields.length; i++) {
//         const field = requiredFields[i];
//         if (!(field in req.body)) {
//             const message = `Missing \`${field}\` in request body`
//             console.error(message);
//             return res.status(400).send(message);
//         }
//     };
//     const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
//     res.status(201).json(item);
// })

// router.put('/:id', jsonParser, (req, res) => {
//     const requiredFields = ['title', 'content', 'author'];
//     for (let i = 0; i < requiredFields.length; i++) {
//         const field = requiredFields[i];
//         if (!(field in req.body)) {
//             const message = `Missing \`${field}\` in request body`
//             console.error(message);
//             return res.status(400).send(message);
//         }
//     };
//     if (req.params.id !== req.body.id) {
//         const message = `The body id doesn't match the path ${req.params.id}`;
//         console.error(message);
//         res.status(401).send(message);
//     }
//     console.log(`Updating blog post id: ${req.body.id}`);
//     const {id, title, author, content, publishDate} = req.body;
//     const updatedItem = BlogPosts.update( {
//         //...req.body
//         id, title, author, content, publishDate
//     });
//     res.status(200).end();
// });

module.exports = router;