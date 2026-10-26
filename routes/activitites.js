import express from "express";
import activities from "./db/mock-activities.js";

// ce code est fait en ne traitant pas les erreurs. On part du principe que la requête est réussie


// Création d'un router qui permet de gérer les activités
// ce routeur a plusieurs routes avec différentes méthodes HTTP et différents endpoints.
// Un routeur Express nous permet de grouper plusieurs routes relatives à la même ressource ou fonctionnalité
const activitiesRouter = express.Router();

// let lstActivities = []   ça veut dire "je déclare une variable modifiable sous forme de tableau"
// une variable déclarée en let est modifiable
activitiesRouter.get('/', (req, res) => {
    res.json( activities )
});

//:id est un paramètre dynamique de l'URL
activitiesRouter.get("/:id", (req, res) => {
    const id = parseInt(req.params.id); // parseInt tranforme le string récupéré de id en int
    const activity = activities.find(value => value.id === id); // .find cherche dans un tableau
    res.json({activity});
});

export default activitiesRouter;
// ou export {activititesRouter}