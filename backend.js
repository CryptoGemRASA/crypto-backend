const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000; // پورت برای Render

app.use(express.json());
app.use(cors({
    origin: 'https://cryptogemrasa.github.io', // URL فرونت‌اندت
    methods: ['GET', 'POST'],
    credentials: true
}));

let posts = [
    { id: 1, text: "test 4", date: 1698777600, comments: [] }
];

app.get('/posts', (req, res) => {
    res.json(posts);
});

app.post('/comment', (req, res) => {
    const { postId, comment } = req.body;
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.comments.push(comment);
        res.json({ success: true });
    } else {
        res.status(404).json({ success: false, message: 'Post not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});