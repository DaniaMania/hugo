import express from "express";

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

});