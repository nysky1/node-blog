'use strict';

const mongoose = require('mongoose');

// this is our schema to represent a restaurant
const blogSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  author: {
    firstName: String,
    lastName: String
  }
});

blogSchema.virtual('nameString').get(function() {
    return `${this.author.firstName} ${this.author.lastName}`.trim()
});

blogSchema.methods.serialize = function() {
    return {
        id: this._id,
        title: this.title,
        content: this.content,
        author: this.nameString
    };
}

const BlogPosts = mongoose.model('Blog', blogSchema);

module.exports = {BlogPosts};