import cors from 'cors';
import express, { json } from 'express';
import router from './routes/gemini.js';
import authRoutes from './routes/auth.js';
// import dashboardRoutes from './routes/dashboard.js';

const app = express();

// middleware
// app.use(json());
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

// app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index', { text: "World" });
});

// routes
app.use('/gemini', router);
app.use('/auth', authRoutes);

// logger middleware
function logger(req, res, next) {
    console.log(req.originalUrl);
    next();
}

// server 
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`)
// });
app.listen(5000, () => console.log('Server running on http://localhost:5000'));
