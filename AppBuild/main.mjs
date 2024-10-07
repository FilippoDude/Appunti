import express from 'express';
import cors from 'cors';
import path from 'path';       
import { fileURLToPath } from 'url'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Middleware
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
}));

app.use(express.static(path.join(__dirname, 'static')));

// Start server
app.listen(3000, () => {
    console.log('Server is listening on port 3000!');
});
