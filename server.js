import router from './routes/gemini.js';

import express, { json } from 'express';
const app = express();

// middleware
app.use(json());
app.use(logger);

app.set('view engine', 'ejs');

// routes
app.use('/gemini', router);

app.get('/', (req, res) => {
    res.render('index', { text: "World" });
});

// logger middleware
function logger(req, res, next) {
    console.log(req.originalUrl);
    next();
}

// server 
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
