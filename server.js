// see a list of pre-populated movies
// add a movie to the list
// update movie information
// remove a movie
// see only released movies

const express = require('express');

const server = express();

server.use(express.json()); // teaches express to parse JSON body
let movieId = 5;
let actorId = 3;
let actors = [
  {
    id: 1,
    name: 'Elijah Wood',
    movies: [1, 2],
  },
  {
    id: 2,
    name: 'Chris Evans',
    movies: [4],
  },
];
let movies = [
  {
    id: 1,
    name: 'The Fellowship of the Ring',
    released: true,
    rating: 5,
  },
  {
    id: 2,
    name: 'The Two Towers',
    released: true,
    rating: 4,
  },
  {
    id: 3,
    name: 'The Children of Hurin',
    released: false,
    rating: null,
  },
  {
    id: 4,
    name: 'Avengers Endgame',
    released: true,
    rating: 5,
  },
];

// sanity check endpoint
server.get('/', (req, res) => {
  res.status(200).json({ api: 'up...' });
});

// test query string: localhost:8000/api/movies?minrating=3
server.get('/api/movies', (req, res) => {
  const minRating = req.query.minrating;

  let result = [...movies];

  // if the client provides a minrating, filter the response
  if (minRating) {
    result = movies.filter(m => m.rating >= minRating);
  }

  res.status(200).json(result);
});

server.post('/api/movies', (req, res) => {
  const movie = req.body;

  // add the new id
  movie.id = movieId++;
  movies.push(movie);

  // return correct http status code for operation
  res.status(201).json(movies);
});

server.delete('/api/movies/:id', (req, res) => {
  const id = req.params.id;

  movies = movies.filter(m => m.id !== Number(id));

  res.status(200).json(movies);
});

// as user of this api, I want and endpoint to see a list of actors, so that I can see all the actors

// export default server; // ES2015 modules
// module.exports = { server }; // CommonJS modules (node)
module.exports = server; // CommonJS modules (node)
