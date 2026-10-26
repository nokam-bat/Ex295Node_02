Dans cette branche on utilise une base de donné où on mets notre connexion à découvert, sans .env

### Dans db-activities.js
on import mysql2/promise

on crée la connexion non sécurisée avec les identifiants à la vue de tous

on crée l'objet db qui va regrouper les opérations sur la BD:

getAllActivities qui affiche l'ensemble des activité poposées au CPNV
getActivityById qui affiche une activité donnée par l'utilisateur via son ID
createActivity qui ajoute une nouvelle activité
updateActivity qui mets à jour une activité existante
deleteActivity qui supprime une activité via son id


### Dans activities.js
on import db de db-activities.js

on modifie les fonctions:
on rajoute aync, on rajoute la const activities ou autres, etc
on mets let pour delete
on mets params.id car c'est un paramètre dynamique



Par exemple:
activitiesRouter.get('/', (req, res) => {
res.json( activities )
});
DEVIENT
activitiesRouter.get('/', async (req, res) => {
const activities = await db.getAllActivities();
res.json( activities )
});

OU ENCORE

const activity = activities.find(value => value.id === id);
res.json({activity});
DEVIENT
const activities = await db.getAllActivities();
res.json({activities});
