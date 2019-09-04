
const express = require('express');

const db = require('./data/db.js')

const server = express();

server.use(express.json()); // teaches express to parse JSON body


// sanity check endpoint
server.get('/', (req, res) => {
  res.status(200).json({ api: 'up...' });
});


// server.post('/api/posts/:id/comments', (req, res) => {
//     const post =  req.body;
//     console.log('post comment req.url',req.url)
//     console.log('post comment req.body',req.body)
   
//   });

  server.post('/api/posts/:id/comments', (req, res) => {
    const post =  req.body;
    console.log('post comment req.url',req.url)
    console.log('post comment req.body',req.body)
    db.insertComment(post)
    .then(response => {
        res.status(201).json(response);
    })
    .catch(error => {
        res.status(500).json({ message: 'error adding to list of titles'})
    })
  });


  server.post('/api/posts', (req, res) => {
    const post =  req.body;
console.log('post req.body',req.body)
if(!(post.title && post.contents))
{
    res.status(400).json({errorMessage: "Please provide title and contents for the post." })
}
else
{
db.insert(post)
    .then(response => {
        res.status(201).json(response);
    })
    .catch(error => {
        res.status(500).json({ message: 'error adding to list of titles'})
    })
  }});


  server.get('/api/posts/:id/comments', (req, res) => {
    console.log('by id req comments',req.url)
    // paragraph.lastIndexOf(searchTerm) str.substring(2)
    const id = req.url.replace('/comments/','').replace('/comments','').substring(req.url.lastIndexOf(":")+1)
    console.log('by id req id comments',id)
    db.findPostComments(id)
 .then(response => {
    res.status(200).json(response);
})
.catch(error => {
    res.status(500).json({ message: 'error getting list of comments'})
})
});

server.get('/api/posts/:id', (req, res) => {
    console.log('by id req',req.url)
    // paragraph.lastIndexOf(searchTerm) str.substring(2)
    const id = req.url.substring(req.url.lastIndexOf(":")+1)
    console.log('by id req id',id)
  db.findById(id)
 .then(response => {
    res.status(200).json(response);
})
.catch(error => {
    res.status(500).json({ message: 'error getting title'})
})
});

  server.get('/api/posts', (req, res) => {
       console.log('not by id req',req.body)
    db.find()
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
        console.log('by id req',req.url)
        // paragraph.lastIndexOf(searchTerm) str.substring(2)
        const id = req.url.substring(req.url.lastIndexOf(":")+1)
        console.log('by id req id',id)
      db.findById(id)
     .then(response => {
        db.remove(id)
        .then(result => {
            console.log('deleted title '+id)
          res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json({ message: 'error deleting title'})
        })
        })
    .catch(error => {
        res.status(500).json({ message: 'error deleting title'})
    })
    });

    server.put('/api/posts/:id', (req, res) => {
        const post =  req.body;
        console.log('put by id req.url',req.url)
        console.log('put by id req.body',req.body)
        // paragraph.lastIndexOf(searchTerm) str.substring(2)
        const id = req.url.substring(req.url.lastIndexOf(":")+1)
        console.log('put by id req id',id)
      db.update(id, post)
     .then(response => {
        post.id = id
        res.status(200).json(post);
    })
    .catch(error => {
        res.status(500).json({ message: 'error updating title'})
    })
    });
        

// export default server; // ES2015 modules
// module.exports = { server }; // CommonJS modules (node)
module.exports = server; // CommonJS modules (node)
