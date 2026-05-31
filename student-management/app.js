const express = require("express");
const PORT = process.env.PORT || 3000;
const db = require("./config/db");
const app = express();

app.use(express.json());

db.establishConnection(
    db.connection
);

app.listen(PORT, () => {
console.log(`Server is listening on port ${PORT}`);
});

app.get('/students', async (req, res) => {

    try {

        const result =
        await db.query(
            'SELECT * FROM STUDENT LIMIT 3'
        );

        res.json(result);

    }

    catch(err) {

        res.status(500).json(err);

    }

});

app.post('/students', async (req, res) => {

    try {

        const { StudentName, Email } = req.body;

        const sql =
        `INSERT INTO STUDENT
        (StudentName, Email)
        VALUES (?, ?)`;

        const result =
        await db.query(
            sql,
            [StudentName, Email]
        );

        res.json({
            message: 'Student created',
            result
        });

    }
    catch(err) {

        res.status(500).json(err);

    }

});