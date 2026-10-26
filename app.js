//On importe le module express (il doit être installé avec "npm install express")
import express from 'express';
import activitiesRouter from '../routes/activitites.js'
// On crée une application Express
const app = express();
// On définit le port sur lequel le serveur va écouter
const port = process.env.PORT || 3000;




// permet à Express de lire les données JSON reçues dans le corps des requêtes et de les rendre disponibles dans req.body
// appliqué à toutes les requêtes qui passent par cette application, en le notant avant les routes concernées
app.use(express.json());


// On crée une route GET sur la racine ("/")
// Quand un utilisateur ouvre http://localhost:3000/ dans son navigateur,
// cette fonction est appelée et envoie "Hello World!" en réponse
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/', (req, res) => {
    res.redirect(`http://localhost:${port}/`)
});


// On change de .get à .use ici
// on monte ce router dans l'application
// monter un routeur veut dire qu'on "branche" un sous-routeur venant d'un autre fichier qui s'occupera des routes
// ici on dit "dès qu'une requête commençant par /api/activities/ arrive, tu confies la suite à ce routeur.
app.use('/api/activities', activitiesRouter);


// On démarre le serveur et on lui dit d’écouter sur le port défini
// Une fois lancé, le message est affiché dans la console
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});