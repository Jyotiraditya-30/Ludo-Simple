// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS middleware
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ludo-game', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define token schema
const tokenSchema = new mongoose.Schema({
    token: String,
    gameData: Object
});

// Define token model
const Token = mongoose.model('Token', tokenSchema);

// Middleware to parse JSON bodies
app.use(express.json());

// Routes

app.get('/', async (req, res) => {
    res.json("hello")
    console.log("Hello World")
})
app.post('/save', async (req, res) => {
    try {
        const { token, gameData } = req.body;
        const existingToken = await Token.findOne({ token });
        if (existingToken) {
            existingToken.gameData = gameData;
            await existingToken.save();
        } else {
            await Token.create({ token, gameData });
        }
        console.log("game saved")
        res.status(200).json({ message: 'Game state saved successfully' });
    } catch (error) {
        console.error('Error saving game state:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/load/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const existingToken = await Token.findOne({ token });
        if (existingToken) {
            res.status(200).json(existingToken.gameData);
        } else {
            res.status(404).json({ error: 'Token not found' });
        }
    } catch (error) {
        console.error('Error loading game state:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

