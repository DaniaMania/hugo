import express from "express";

const router = express.Router();

const users = [
    {
        email: "test@com",
        password: "test"
    },
    {
        email: "123@com",
        password: "test"
    },
    {
        email: "abc@com",
        password: "test"
    }
];

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        console.log("Login successful");
        return res.status(200).json({ message: "Login successful" });
    } else {
        return res.status(401).json({ message: "Invalid email or password" });
    }
});

export default router;