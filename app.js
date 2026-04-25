const http = require('http');
const fs = require('fs');
const path = require('path');

const moviesDataPath = path.join(__dirname, 'movies.json');


const getMovies = async () => {
    const data = await fs.promises.readFile(moviesDataPath, 'utf-8');
    return JSON.parse(data);
};

const server = http.createServer(async (req, res) => {

    
    if (req.url === '/api/movies' && req.method === 'GET') {
        const movies = await getMovies();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(movies, null, 2));
    }

    
    else if (req.url.startsWith('/api/movies/') && req.method === 'GET') {
        const id = parseInt(req.url.split('/')[3]);
        const movies = await getMovies();
        const movie = movies.find(m => m.id === id);

        if (movie) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(movie, null, 2));
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Movie not found');
        }
    }
   
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});