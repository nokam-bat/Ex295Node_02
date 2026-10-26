import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/', (req, res) => {
    res.redirect(`http://localhost:${port}/`)
});

app.get('/api/activities', (req, res) => {
    res.json(activities)
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});