const express = require('express');
const cors = require('cors');
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Hugo API' });
});

// server 
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
