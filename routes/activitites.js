import express from "express";
import activities from "./db/mock-activities.js";
import getNewID from "../utils/utils.js";

// Ici on va utiliser le paramètre dynamique /:id pour d'activité via son id
// On va aussi récupérer, ajouter, modifier, supprimer une activité via son id.

const activitiesRouter = express.Router();


activitiesRouter.get('/', (req, res) => {
    res.json( activities )
});


activitiesRouter.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const activity = activities.find(value => value.id === id); // .find cherche dans un tableau
    res.json({activity});

    // parseInt transforme le paramètre 'id' de l'URL (qui est une chaîne de caractères) en nombre entier
    // .find() parcourt le tableau pour trouver le premier élément qui correspond à l'ID recherché

});

activitiesRouter.post("/", (req, res) => {
    const {name, date, duration} = req.body; // on extrait les propriétés du corps de la requête (req.body)
    const id = getNewID(activities);
    const newActivity = {id, name, date, duration}; // on crée l'objet représentant le nouvelle activité
    activities.push(newActivity); // on ajoute la nouvelle activité dans le tableau en mémoire
    const message = `L'activité ${newActivity.name} a bien été crée!`;
    res.json({message: message, activity: newActivity});
    // res.send('new activity successfully added')

    // getNewId génère automatiquement un nouvel ID unique basé sur les IDs existants

});

activitiesRouter.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name, date, duration} = req.body;
    const index = activitites.findIndex(activity => activity.id === id);
    activities[index] = {id, name, date, duration}; // on remplace l'ancienne activité par les nouvelles données
    // [index] à cet index précis
    res.json({message: `activity updated`, activity: activities[index]});

    // .findIndex() cherche la position de l'activité dans le tableau

});

activititesRouter.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = activities.findIndex(activity => activity.id === id);
    //récupère l'index/la position de l'élément à supprimer
    //res.send(index);
    activities.splice(index, 1); // retire l'élément du tableau a partir de l'index trouvé (sur 1 seul élément)
    res.json({message: `Activity deleted`});
});


export default activitiesRouter;
// ou export {activititesRouter}