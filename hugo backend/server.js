const express = require('express');
const app = express();

// middleware
app.use(express.json());
app.use(logger);

app.set('view engine', 'ejs');

// routes
const geminiRouter = require('./routes/gemini');
app.use('/gemini', geminiRouter);

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
