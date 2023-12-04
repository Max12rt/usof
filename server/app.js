/*require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const authRouter = require('./routers/authenticateRouter');
const userRouter = require('./routers/userRouter');
const postRouter = require('./routers/postRouter');
const categoryRouter = require('./routers/categoryRouter');
const commentRouter = require('./routers/commentRouter');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set the correct views directory

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static('avatars'));
app.use(fileUpload());

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/comments', commentRouter);

app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, '..', 'client','src', 'index.js');
    res.sendFile(indexPath);
});

app.get("/register", function (req, res) {
    res.render("client/components/index", { title: "About dogs", message: "Dogs rock!" });
});

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}`);
});*/

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const path = require('path');

const authRouter = require('./routers/authenticateRouter');
const userRouter = require('./routers/userRouter');
const postRouter = require('./routers/postRouter');
const categoryRouter = require('./routers/categoryRouter');
const commentRouter = require('./routers/commentRouter');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('avatars'));
app.use(fileUpload());

// Routers
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/comments', commentRouter);

// Serve React app
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}`);
});

