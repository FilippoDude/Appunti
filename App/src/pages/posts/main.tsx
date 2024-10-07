import React, { Component, useContext, useEffect, useRef, useState } from 'react'


var socket: WebSocket;

export function PostsPage(){
    const [text, setText] = useState("")

    async function listenToSocket(){
        socket = new WebSocket('ws://localhost:3001');
    
        // Listen for incoming messages (text updates)
        socket.onmessage = (event) => {
            if (typeof event.data === "string") {
                // If the message is already a string, use it directly
                console.log(event.data);
                setText(event.data);
            } else if (event.data instanceof Blob) {
                // If the message is a Blob, convert it to text
                const reader = new FileReader();
        
                reader.onload = () => {
                    const text = reader.result;
                    console.log(text);
                    if(typeof text == "string")
                    setText(text); // Update the editor with the incoming text
                };
        
                reader.readAsText(event.data); // Read the Blob object as text
            }
        };  
    }

    useEffect(() => {
        listenToSocket()
    }, [])

    const sendTextUpdate = (text: string | null) => {
        if(typeof text == "string"){
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(text); // Send the new text to the server
            }
        } else {
            console.log("Errore")
        }
    }

    return(
        <>
            <textarea className='w-screen h-screen' value={text} onChange={e => sendTextUpdate(e.target.value)}></textarea>
        </>
    )

}

export default PostsPage

function listenToSocker() {
    throw new Error('Function not implemented.');
}
