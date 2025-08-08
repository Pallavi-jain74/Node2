// Import the Express module
import http from 'http';
import app from './app.js'

let PORT=3000;
let server=http.createServer(app)

server.listen(PORT,()=>{
    console.log(`Server is on port ${PORT}`);
    
})

