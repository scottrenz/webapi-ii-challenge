
const express = require('express');

const db = require('./data/db.js')

const server = express();

server.use(express.json()); // teaches express to parse JSON body


// sanity check endpoint
server.get('/', (req, res) => {
  res.status(200).json({ api: 'up...' });
});


server.post('/api/posts', (req, res) => {
    const post =  req.body;
console.log('post req.body',req.body)
    // add the new id
    //  post.id = Number(postId) + 1;
    db.insert(post)
    .then(response => {
        res.status(201).json(response);
    })
    .catch(error => {
        res.status(500).json({ message: 'error adding to list of titles'})
    })
  });

  server.post('/api/posts/:id/comments', (req, res) => {
    const text = req.body;
  
    // add the new id
    text.id = textId++;
    texts.push(text);
  
    // return correct http status code for operation
    res.status(201).json(texts);
  });


  server.get('/api/posts', (req, res) => {
    db.find()
   .then(response => {
      res.status(200).json(response);
  })
  .catch(error => {
      res.status(500).json({ message: 'error getting list of titles'})
  })
  });

  server.get('/api/posts/:id', (req, res) => {
    db.findById()
   .then(response => {
      res.status(200).json(response);
  })
  .catch(error => {
      res.status(500).json({ message: 'error getting list of titles'})
  })
  });
    

server.get('/api/posts/:id/comments', (req, res) => {
    res.send(req);

  res.status(200).json(req);
});

server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;
  
    posts = posts.filter(t => t.id !== Number(id));
  
    res.status(200).json(posts);
  });
let newposts = []
function getposts(item,ix,arr,id,res) {
if (arr[ix].id === id)
{newposts.push(res)}
else
{newposts.push(item)}
}

  server.put('/api/posts/:id', (req, res) => {
    const id = req.params.id;
 posts.map(getposts)
    posts = newposts
    res.status(200).json(posts);
  });
    

// export default server; // ES2015 modules
// module.exports = { server }; // CommonJS modules (node)
module.exports = server; // CommonJS modules (node)
