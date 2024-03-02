var express = require('express');
const { insert, getRows } = require('./db/db');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.post('/data', (req, res) => {
    const { title, description, idSession } = req.body;

    if (title == undefined || description == undefined || title == "" || description == "" || idSession == undefined || idSession == "") return res.status(400).send("Missing title, description or idSession");

    const values = [title, description, idSession];

    const inserted = insert(values);

    if (inserted) res.status(201).send("OK");
    else res.status(500).send("Internal server error");
})

app.get('/data', async (req, res) => {
    try {
        const data = await getRows();

        res.status(200).json(data);
    } catch (e) {
        console.error(e);
        res.status(500).send("Internal server error");
    }
});

app.listen(6923);
console.log('Server is listening on port 6923');