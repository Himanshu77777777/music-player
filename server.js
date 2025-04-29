const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

// Replace <username> and <password> with your MongoDB credentials
const mongoURI = '//chandan:SimSimJi@cluster0-shard-00-00.jyf9u.mongodb.net:27017,cluster0-shard-00-01.jyf9u.mongodb.net:27017,cluster0-shard-00-02.jyf9u.mongodb.net:27017/?replicaSet=atlas-jfiu0g-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Define Song Schema
const SongSchema = new mongoose.Schema({
    title: String,
    artist: String,
    src: String,
    cover: String
});

const Song = mongoose.model('Song', SongSchema);

// API to get songs
app.get('/songs', async (req, res) => {
    const songs = await Song.find();
    res.json(songs);
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
