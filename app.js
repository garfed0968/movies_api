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
    else if(req.url === 'api/movies' && req.method === 'POST'){
        let body ='';
        req.on('data' ,chunk => {
            body += chunk.toString();});
        req.on('end' , async () =>{
            const movie = JSON.parse(body);
            const newMovie =awit addMovie(movie);
            res.writeHead(201,{'Content-Type':'application/json'});
            res.end(JSON.stringify(newMovie));
        });
    }
   
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
});
const addMovie =async(ovie) => {
    const data = await fs.promises.readFile(moviesDataPath, 'utf-8');
    const newId = movies.length > 0 ? movies[movies.length-1].id + 1 : 1;
     movie.id=newId;
    movies.push(movie);
    await fs.promises.writeFile(moviesDataPath,JSON.stringify(movies, nill,2));
    return movie;
};
    
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
