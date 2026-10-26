import express from 'express';
const app = express();
const port = process.env.PORT || 3000;


import activitiesRouter from './routes/activities';


app.use(express.json());

// Middleware pour frontend
// C'est pour permettre au front de communiquer avec le back sans faire buger le navigateur web
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});



app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/', (req, res) => {
    res.redirect(`http://localhost:${port}/`)
});



app.use('/api/activities', activitiesRouter);


// Si aucune route n'existe, donc si l'utilisateur entre une mauvaise URL
app.use((req,res) => {
    const message = "Impossible de trouver la ressource demandée. Vous pouvez essayer une autre URL";
    res.status(404).send(message);
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});