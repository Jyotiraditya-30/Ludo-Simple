// Inside your main.js file

import { Ludo } from './Ludo.js';

const ludo = new Ludo();


// Save Game Button Click Event
document.querySelector('#save-btn').addEventListener('click', () => {
    const token = generateToken(); // You need to implement this function to generate a token
    ludo.saveGameState(token);
    console.log(token)
});

// Function to generate a random token
function generateToken() {
    return Math.random().toString(36).substr(2); // Just a basic example, you might want to use a more secure method
}

document.getElementById('load-btn').addEventListener('click', () => {
    const token = prompt('Enter token to load the game:');
    if (token) {
        ludo.loadGameState(token);
    }
});
