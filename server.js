import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 2000;

app.use(cors());
app.use(bodyParser.json());

let posts = [
  {
    id: 1,
    title: "First Post",
    content: "This is my first blog post!",
    author: "Admin",
    date: new Date().toISOString()
  }
];

app.get('/posts', (req, res) => {
  res.status(200).json(posts);
});

app.get('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.status(200).json(post);
});

app.post('/posts', (req, res) => {
  const newPost = {
    id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date().toISOString()
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.patch('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;
  post.author = req.body.author || post.author;

  res.status(200).json(post);
});

app.delete('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.status(200).json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`Backend API running at http://localhost:${port}`);
});
