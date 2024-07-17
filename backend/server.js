const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "my-blog/build")));

// Получить все посты с пагинацией
app.get("/api/posts", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  fs.readFile(
    path.join(__dirname, "./db/db.posts.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Ошибка чтения файла:", err);
        res.status(500).send("Ошибка сервера");
        return;
      }
      const posts = JSON.parse(data).posts;
      const results = {};
      if (endIndex < posts.length) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      }
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit,
        };
      }
      results.posts = posts.slice(startIndex, endIndex);
      res.json(results);
    }
  );
});

// Получить один пост по ID
app.get("/api/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  fs.readFile(
    path.join(__dirname, "./db/db.posts.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Ошибка чтения файла:", err);
        res.status(500).send("Ошибка сервера");
        return;
      }
      const posts = JSON.parse(data).posts;
      const post = posts.find((post) => post.id === postId);
      if (!post) {
        res.status(404).send("Пост не найден");
        return;
      }
      res.json(post);
    }
  );
});

// Создать новый пост с валидацией
app.post("/api/posts", (req, res) => {
  const { title, body, url, rate } = req.body;

  // Валидация обязательных полей
  if (!title || !body || !url || rate === undefined) {
    return res
      .status(400)
      .json({ error: "Поля title, body, url и rate обязательны." });
  }

  // Валидация поля title
  if (typeof title !== "string" || title.length === 0 || title.length > 50) {
    return res
      .status(400)
      .json({
        error: "Поле title должно быть строкой и не превышать 50 символов.",
      });
  }

  // Валидация поля body
  if (typeof body !== "string" || body.length === 0 || body.length > 1000) {
    return res
      .status(400)
      .json({
        error: "Поле body должно быть строкой и не превышать 1000 символов.",
      });
  }

  // Валидация поля url
  if (typeof url !== "string" || !url.includes("http")) {
    return res
      .status(400)
      .json({
        error:
          "Поле url должно содержать действительную ссылку, начинающуюся с http.",
      });
  }

  // Валидация поля rate
  if (!Number.isInteger(rate) || rate < 1 || rate > 10) {
    return res
      .status(400)
      .json({ error: "Поле rate должно быть целым числом от 1 до 10." });
  }

  fs.readFile(
    path.join(__dirname, "./db/db.posts.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Ошибка чтения файла:", err);
        res.status(500).send("Ошибка сервера");
        return;
      }
      const posts = JSON.parse(data).posts;
      const newPost = {
        id: posts.length + 1,
        title: title,
        body: body,
        url: url,
        rate: rate,
      };
      posts.push(newPost);
      fs.writeFile(
        path.join(__dirname, "./db/db.posts.json"),
        JSON.stringify({ posts }),
        "utf8",
        (err) => {
          if (err) {
            console.error("Ошибка записи файла:", err);
            res.status(500).send("Ошибка сервера");
            return;
          }
          res.status(201).json(newPost);
        }
      );
    }
  );
});

// Обновить существующий пост
app.put("/api/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  fs.readFile(
    path.join(__dirname, "./db/db.posts.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Ошибка чтения файла:", err);
        res.status(500).send("Ошибка сервера");
        return;
      }
      const posts = JSON.parse(data).posts;
      const postIndex = posts.findIndex((post) => post.id === postId);
      if (postIndex === -1) {
        res.status(404).send("Пост не найден");
        return;
      }
      const updatedPost = {
        id: postId,
        title: req.body.title,
        body: req.body.body,
        url: req.body.url,
        rate: req.body.rate,
      };
      posts[postIndex] = updatedPost;
      fs.writeFile(
        path.join(__dirname, "./db/db.posts.json"),
        JSON.stringify({ posts }),
        "utf8",
        (err) => {
          if (err) {
            console.error("Ошибка записи файла:", err);
            res.status(500).send("Ошибка сервера");
            return;
          }
          res.json(updatedPost);
        }
      );
    }
  );
});

// Удалить пост
app.delete("/api/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  fs.readFile(
    path.join(__dirname, "./db/db.posts.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Ошибка чтения файла:", err);
        res.status(500).send("Ошибка сервера");
        return;
      }
      let posts = JSON.parse(data).posts;
      posts = posts.filter((post) => post.id !== postId);
      fs.writeFile(
        path.join(__dirname, "./db/db.posts.json"),
        JSON.stringify({ posts }),
        "utf8",
        (err) => {
          if (err) {
            console.error("Ошибка записи файла:", err);
            res.status(500).send("Ошибка сервера");
            return;
          }
          res.status(204).send();
        }
      );
    }
  );
});

// Добавляем маршрут для поиска
app.get("/api/posts-search", (req, res) => {
  const searchTerm = req.query.term.toLowerCase();
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  fs.readFile(
    path.join(__dirname, "./db/db.posts.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Ошибка чтения файла:", err);
        res.status(500).send("Ошибка сервера");
        return;
      }

      const posts = JSON.parse(data).posts;
      const searchResults = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm) ||
          post.body.toLowerCase().includes(searchTerm)
      );
      const paginatedResults = paginateResults(searchResults, page, limit);
      res.json(paginatedResults);
    }
  );
});

// Получить комментарии для конкретного поста
app.get("/api/posts/:postId/comments", (req, res) => {
  const postId = parseInt(req.params.postId);
  fs.readFile(
    path.join(__dirname, "./db/db.comments.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Ошибка чтения файла:", err);
        res.status(500).send("Ошибка сервера");
        return;
      }
      const comments = JSON.parse(data).comments;
      const postComments = comments.filter(
        (comment) => comment.postId === postId
      );
      res.json(postComments);
    }
  );
});

// Создать новый комментарий для поста с обработкой ошибок
app.post("/api/posts/:postId/comments", (req, res) => {
  const postId = parseInt(req.params.postId);

  const { title, rate, body } = req.body;

  // Проверка поля rate: должно быть целым числом от 1 до 10
  if (!Number.isInteger(rate) || rate < 1 || rate > 10) {
    return res
      .status(400)
      .json({ error: "Поле rate должно быть целым числом от 1 до 10." });
  }

  // Проверка поля title: длина не более 30 символов
  if (typeof title !== "string" || title.length > 30) {
    return res
      .status(400)
      .json({ error: "Поле title не должно превышать 30 символов." });
  }

  // Проверка поля body: длина не более 500 символов
  if (typeof body !== "string" || body.length > 500) {
    return res
      .status(400)
      .json({ error: "Поле body не должно превышать 500 символов." });
  }

  fs.readFile(
    path.join(__dirname, "./db/db.comments.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Ошибка чтения файла:", err);
        return res.status(500).send("Ошибка сервера");
      }
      const comments = JSON.parse(data).comments;
      const newComment = {
        id: Math.floor(Math.random() * 1000000), // Генерация уникального ID
        postId: postId,
        title: title,
        rate: rate,
        body: body,
      };
      comments.push(newComment);

      fs.writeFile(
        path.join(__dirname, "./db/db.comments.json"),
        JSON.stringify({ comments }),
        "utf8",
        (err) => {
          if (err) {
            console.error("Ошибка записи файла:", err);
            return res.status(500).send("Ошибка сервера");
          }
          res.status(201).json(newComment);
        }
      );
    }
  );
});

// Пагинация
function paginateResults(data, page, limit) {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = {};
  if (endIndex < data.length) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }
  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }
  results.data = data.slice(startIndex, endIndex);
  return results;
}

const photosFilePath = path.join(__dirname, "./db/db.photos.json");

// Создать новую фотографию
app.post("/api/photos", (req, res) => {
  const { title, url, albumId } = req.body;
  if (!title || !url || !albumId) {
    return res.status(400).json({ error: "Все поля обязательны" });
  }
  if (!url.startsWith("http")) {
    return res.status(400).json({ error: "URL должен начинаться с http" });
  }

  fs.readFile(
    path.join(__dirname, "./db/db.photos.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Ошибка чтения файла:", err);
        res.status(500).send("Ошибка сервера");
        return;
      }
      const photos = JSON.parse(data).photos;
      const newPhoto = {
        id: photos.length ? photos[photos.length - 1].id + 1 : 1,
        title,
        url,
        albumId,
      };
      photos.push(newPhoto);
      fs.writeFile(
        path.join(__dirname, "./db/db.photos.json"),
        JSON.stringify({ photos }),
        "utf8",
        (err) => {
          if (err) {
            console.error("Ошибка записи файла:", err);
            res.status(500).send("Ошибка сервера");
            return;
          }
          res.status(201).json(newPhoto);
        }
      );
    }
  );
});
// Получить все фотографии
app.get("/api/photos", (req, res) => {
  fs.readFile(photosFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Ошибка чтения файла:", err);
      res.status(500).send("Ошибка сервера");
      return;
    }
    const photos = JSON.parse(data).photos;
    res.json(photos);
  });
});

// Удалить фотографию по ID
app.delete("/api/photos/:id", (req, res) => {
  const photoId = parseInt(req.params.id);
  fs.readFile(photosFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Ошибка чтения файла:", err);
      res.status(500).send("Ошибка сервера");
      return;
    }
    let photos = JSON.parse(data).photos;
    photos = photos.filter((photo) => photo.id !== photoId);
    fs.writeFile(photosFilePath, JSON.stringify({ photos }), "utf8", (err) => {
      if (err) {
        console.error("Ошибка записи файла:", err);
        res.status(500).send("Ошибка сервера");
        return;
      }
      res.status(204).send();
    });
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
