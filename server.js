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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
