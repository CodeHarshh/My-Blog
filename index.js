import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

const app = express();
const port = 3000;
const API_URL = "http://localhost:2000";

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Home - All posts
app.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    res.render('index', { posts: response.data });
  } catch (error) {
    res.status(500).send('Error loading posts');
  }
});

// New post form
app.get('/new', (req, res) => {
  res.render('modify', { heading: 'New Post', submit: 'Create Post', post: null });
});

// Edit post form
app.get('/edit/:id', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    res.render('modify', {
      heading: 'Edit Post',
      submit: 'Update Post',
      post: response.data
    });
  } catch (error) {
    res.status(500).send('Error loading post');
  }
});

// Create post
app.post('/posts', async (req, res) => {
  try {
    await axios.post(`${API_URL}/posts`, req.body);
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error creating post');
  }
});

// Update post
app.patch('/posts/:id', async (req, res) => {
  try {
    await axios.patch(`${API_URL}/posts/${req.params.id}`, req.body);
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error updating post');
  }
});

// Delete post
app.get('/api/posts/delete/:id', async (req, res) => {
  try {
    await axios.delete(`${API_URL}/posts/${req.params.id}`);
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error deleting post');
  }
});

app.listen(port, () => {
  console.log(`Frontend server running at http://localhost:${port}`);
});
