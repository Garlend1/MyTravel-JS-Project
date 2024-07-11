const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { paginateResults } = require('./utils/utils');
const comments = require('./db/db.comments.json');


const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'my-blog/build')));

// // Получить все посты
// app.get('/api/posts', (req, res) => {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;
  
//     fs.readFile(path.join(__dirname, './db/db.posts.json'), 'utf8', (err, data) => {
//       if (err) {
//         console.error('Ошибка чтения файла:', err);
//         res.status(500).send('Ошибка сервера');
//         return;
//       }
//       const posts = JSON.parse(data).posts;
//       const results = {};
//       if (endIndex < posts.length) {
//         results.next = {
//           page: page + 1,
//           limit: limit
//         };
//       }
//       if (startIndex > 0) {
//         results.previous = {
//           page: page - 1,
//           limit: limit
//         };
//       }
//       results.posts = posts.slice(startIndex, endIndex);
//       res.json(results);
//     });
//   });

  // Получить все посты с пагинацией
app.get('/api/posts', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  fs.readFile(path.join(__dirname, './db/db.posts.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка чтения файла:', err);
      res.status(500).send('Ошибка сервера');
      return;
    }
    const posts = JSON.parse(data).posts;
    const paginatedResults = paginateResults(posts, page, limit);
    res.json(paginatedResults);
  });
});



// Получить один пост по ID
app.get('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  fs.readFile(path.join(__dirname, './db/db.posts.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка чтения файла:', err);
      res.status(500).send('Ошибка сервера');
      return;
    }
    const posts = JSON.parse(data).posts;
    const post = posts.find(post => post.id === postId);
    if (!post) {
      res.status(404).send('Пост не найден');
      return;
    }
    res.json(post);
  });
});

// Создать новый пост
app.post('/api/posts', (req, res) => {
  fs.readFile(path.join(__dirname, './db/db.posts.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка чтения файла:', err);
      res.status(500).send('Ошибка сервера');
      return;
    }
    const posts = JSON.parse(data).posts;
    const newPost = {
      id: posts.length + 1,
      title: req.body.title,
      body: req.body.body,
      url: req.body.url
    };
    posts.push(newPost);
    fs.writeFile(path.join(__dirname, './db/db.posts.json'), JSON.stringify({ posts }), 'utf8', err => {
      if (err) {
        console.error('Ошибка записи файла:', err);
        res.status(500).send('Ошибка сервера');
        return;
      }
      res.status(201).json(newPost);
    });
  });
});

// Обновить существующий пост
app.put('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  fs.readFile(path.join(__dirname, './db/db.posts.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка чтения файла:', err);
      res.status(500).send('Ошибка сервера');
      return;
    }
    const posts = JSON.parse(data).posts;
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex === -1) {
      res.status(404).send('Пост не найден');
      return;
    }
    const updatedPost = {
      id: postId,
      title: req.body.title,
      body: req.body.body
    };
    posts[postIndex] = updatedPost;
    fs.writeFile(path.join(__dirname, './db/db.posts.json'), JSON.stringify({ posts }), 'utf8', err => {
      if (err) {
        console.error('Ошибка записи файла:', err);
        res.status(500).send('Ошибка сервера');
        return;
      }
      res.json(updatedPost);
    });
  });
});

// Удалить пост
app.delete('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  fs.readFile(path.join(__dirname, './db/db.posts.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка чтения файла:', err);
      res.status(500).send('Ошибка сервера');
      return;
    }
    let posts = JSON.parse(data).posts;
    posts = posts.filter(post => post.id !== postId);
    fs.writeFile(path.join(__dirname, './db/db.posts.json'), JSON.stringify({ posts }), 'utf8', err => {
      if (err) {
        console.error('Ошибка записи файла:', err);
        res.status(500).send('Ошибка сервера');
        return;
      }
      res.status(204).send();
    });
  });
});


// // Добавляем маршрут для поиска
// app.get('/api/posts/search', (req, res) => {
//     const searchTerm = req.query.term.toLowerCase();
  
//     fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
//       if (err) {
//         console.error('Ошибка чтения файла:', err);
//         res.status(500).send('Ошибка сервера');
//         return;
//       }
  
//       const posts = JSON.parse(data).posts;
//       const searchResults = posts.filter(post => post.title.toLowerCase().includes(searchTerm) || post.body.toLowerCase().includes(searchTerm));
//       res.json(searchResults);
//     });
//   });


// Получить результаты поиска с пагинацией
app.get('/api/posts/search', (req, res) => {
  const searchTerm = req.query.term.toLowerCase();
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  fs.readFile(path.join(__dirname, './db/db.posts.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка чтения файла:', err);
      res.status(500).send('Ошибка сервера');
      return;
    }
    const posts = JSON.parse(data).posts;
    const searchResults = posts.filter(post => post.title.toLowerCase().includes(searchTerm) || post.body.toLowerCase().includes(searchTerm));
    const paginatedResults = paginateResults(searchResults, page, limit);
    res.json(paginatedResults);
  });
});


// Получить комментарии для конкретного поста
app.get('/api/posts/:postId/comments', (req, res) => {
  const postId = parseInt(req.params.postId);

  const postComments = comments.filter(comment => comment.postId === postId);

  res.json(postComments);
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
