const express = require('express');
const tagsRouter = express.Router();

const { getAllTags, getPostsByTagName } = require('../db');

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next();
});

tagsRouter.get('/', async (req, res) => {
    const tags = await getAllTags();

  res.send({
    tags
  });
});

tagsRouter.get('/:tagName/posts', async(req, res, next) => {
  console.log('reqparams:', req.params);
  try{
  const {tagName} = req.params;
  const postsByTagName = await getPostsByTagName(tagName);
  const posts = postsByTagName.filter((post) => { 
      return post.active || (req.user && req.author.id === req.user.id)
  })
  res.send({posts: posts})
  } catch ({name, message}){
      next({name: 'unsuscesful get posts by tagName', message: 'could not find posts by tag name'})
  }
})

module.exports = tagsRouter;