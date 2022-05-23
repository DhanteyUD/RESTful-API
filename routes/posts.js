const express = require('express');
const router = express.Router();
const Post = require('../models/posts');

// POST:  Create Post
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const savePost = await post.save();

    res.status(201).json(savePost);
    console.log('Blog post successful!');
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// GET: Get all Posts
router.get('/', async (req, res) => {
  try {
    const getPosts = await Post.find();

    res.status(200).json(getPosts);
    console.log('All Blog post retrieved!');
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// GET: Get Specific Post
router.get('/:postId', async (req, res) => {
  try {
    const getSinglePost = await Post.findById(req.params.postId);

    res.status(200).json(getSinglePost);
    console.log(`Blog post with id ${req.params.postId} retrieved!`);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// DELETE: Delete Specific Post
router.delete('/:postId', async (req, res) => {
  try {
    const deleteSinglePost = await Post.remove({ _id: req.params.postId });

    res.status(200).json(deleteSinglePost);
    console.log(`Blog post with id ${req.params.postId} deleted!`);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// UPDATE: Update Post
router.patch('/:postId', async (req, res) => {
  try {
    const updatePost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title, description: req.body.description } }
    );

    res.status(200).json(updatePost);
    console.log(`Blog post with id ${req.params.postId} updated!`);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

module.exports = router;
