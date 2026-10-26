//on importe le modue express (il doit être installé avec "npm install express")
import express from 'express';
import activities from './db/mock-activities.js';

// on crée une application Express qui est donnée au serveur HTTP pour qu'elle puisse traiter les requêtes reçues
const app = express();
// On définit le port sur lequel le serveur va écouter.
const port = process.env.PORT || 3000;


// On crée une route GET sur la racine ("/")
// Quand un utilisateur ouvre http://localhost:3000/ dans son navigateur,
// cette fonction est appelée et renvoie le text "Hello World!"
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//On crée une route GET sur "/api/" qui redirige l'utilisateur vers la racine de l'application
app.get('/api/', (req, res) => {
    res.redirect(`http://localhost:${port}/`)
});

// On crée une route GET sur "/api/activities" qui renvoie la liste des activités sous format JSON
app.get('/api/activities', (req, res) => {
    res.json(activities)
});

// On démarre le serveur HTTP sur le port spécifié et on affiche un message de confirmation.
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});