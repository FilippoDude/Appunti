import express, { Request, Response } from 'express'; 
import cors from 'cors';
import WebSocket, { WebSocketServer } from 'ws';
import { validate } from '@telegram-apps/init-data-node';

const secretToken = '6673088965:AAHkCuEmoTyiyjL-ZoQ_DL-IxdmlsZQEZ5U';
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
}));

// Handling new connections

const clients: Set<WebSocket> = new Set(); 

// Create a WebSocket server
const wss = new WebSocketServer({ port: 3000 });
var text = "";


wss.on('connection', (socket: WebSocket) => {
   console.log('New client connected');
   clients.add(socket);
   socket.send(text)
   socket.on('message', (data: any) => handleTextUpdate(socket, data));

   socket.on('close', () => handleClientDisconnect(socket));

   // Optionally listen for errors
   socket.on('error', (error: any) => {
      console.log('WebSocket error:', error);
   });
});

// Function to broadcast text updates to all other clients
const broadcast = (senderSocket: WebSocket, data: any) => {
    clients.forEach((client) => {
       if (client !== senderSocket && client.readyState === WebSocket.OPEN) {
          client.send(data);
       }
    });
};

// Handle text updates received from clients
const handleTextUpdate = (socket: WebSocket, data: any) => {
   console.log(`Received data from a client: ${data}`);
   // Broadcast the update to all other clients
   text = data
   broadcast(socket, data);
};


// Handle client disconnection
const handleClientDisconnect = (socket: WebSocket) => {
   console.log('Client disconnected');
   // Remove the client from the clients set
   clients.delete(socket);
};



// POST route
app.post('/', (req: Request, res: Response) => { 
    const { type } = req.body
    const { authorization } = req.headers;
    
    try {
        if(typeof authorization == "string"){
            validate(authorization, secretToken);
            if(type === "authenticate"){
                res.status(200).send('Authorized');
            } else if(type === "getPostFromId"){

            }
        } else {
            throw new Error("Authorization token header non-existant")
        }
    } catch (e) {
        res.status(400).send('Invalid authorization');
    }
});

// Start server
app.listen(3004, () => {
    console.log('Server is listening on port 3000!');
});

