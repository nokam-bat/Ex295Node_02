import express from 'express';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';
import {activitiesRouter} from './routes/activities.js';
import {openApiSpecification} from './swagger.js'

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiSpecification, {explorer:true}));

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

// Fichiers statiques pour Vue
app.use(express.static(path.join(__dirname, 'dist')));

app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});



// Si aucune route n'existe, donc si l'utilisateur entre une mauvaise URL
app.use((req,res) => {
    const message = "Impossible de trouver la ressource demandée. Vous pouvez essayer une autre URL";
    res.status(404).send(message);
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});