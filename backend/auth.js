import express from "express";
import Database from "better-sqlite3";

const router = express.Router();

const db = new Database("./emails.db");

const data = db.prepare('SELECT sender, recipient FROM emails').all()

const uniqueEmails = new Set();
data.forEach(entry => {
    uniqueEmails.add(entry.sender);
    uniqueEmails.add(entry.recipient);
});
const users = Array.from(uniqueEmails).map(email => ({ user: email }));
// const users = [
//     {
//         email: "test@voltway.co",
//         password: "test"
//     },
//     {
//         email: "123@voltway.co",
//         password: "test"
//     },
//     {
//         email: "warehouse_manager@voltway.co",
//         password: "test"
//     },
//     {
//         email: "logistics@supA.com",
//         password: "test"
//     },
//     {
//         email: "sales@supB.com",
//         password: "test"
//     },
//     {
//         email: "purchasing@voltway.co",
//         password: "test"
//     },
//     {
//         email: "contracts@voltway.co",
//         password: "test"
//     },
//     {
//         email: "contracts@fleet-giant.com",
//         password: "test"
//     },
//     {
//         email: "operations@voltway.co",
//         password: "test"
//     },
//     {
//         email: "orders@supC.com",
//         password: "test"
//     },
//     {
//         email: "product-updates@supA.com",
//         password: "test"
//     },
//     {
//         email: "engineering@voltway.co",
//         password: "test"
//     },
//     {
//         email: "proposals@supD.com",
//         password: "test"
//     },
//     {
//         email: "shipping@supB.com",
//         password: "test"
//     },
//     {
//         email: "qa-team@supA.com",
//         password: "test"
//     },
//     {
//         email: "shipping@supC.com",
//         password: "test"
//     },
//     {
//         email: "sales@supA.com",
//         password: "test"
//     }
// ];

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    const user = users.find(user => user.user === email);
    if (user) {
        console.log("Login successful");
        return res.status(200).json({ message: "Login successful" });
    } else {
        return res.status(401).json({ message: "Invalid email or password" });
    }
});

export default router;