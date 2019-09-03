
const express = require('express');

const server = express();

server.use(express.json()); // teaches express to parse JSON body
let titleId = 0;
let textId = 0;

// sanity check endpoint
server.get('/', (req, res) => {
  res.status(200).json({ api: 'up...' });
});


server.post('/api/posts', (req, res) => {
    const title = req.body;
  
    // add the new id
     title.id = titleId++;
    titles.push(title);
  
    // return correct http status code for operation
    res.status(201).json(titles);
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
    res.send(req);

  res.status(200).json(req);
});

server.get('/api/posts/:id', (req, res) => {
    res.send(req);

  res.status(200).json(req);
});

server.get('/api/posts/:id/comments', (req, res) => {
    res.send(req);

  res.status(200).json(req);
});

server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;
  
    titles = titles.filter(t => t.id !== Number(id));
  
    res.status(200).json(titles);
  });
let newTitles = []
function getTitles(item,ix,arr,id,res) {
if (arr[ix].id === id)
{newTitles.push(res)}
else
{newTitles.push(item)}
}

  server.put('/api/posts/:id', (req, res) => {
    const id = req.params.id;
 titles.map(getTitles)
    titles = newTitles
    res.status(200).json(titles);
  });
    

// export default server; // ES2015 modules
// module.exports = { server }; // CommonJS modules (node)
module.exports = server; // CommonJS modules (node)
