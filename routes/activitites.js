import express from "express";
import db from "../db/db-activities.js";
import {isValidId, checkData} from "../helper.js";

// Ici on va gérer les cas d'erreurs avec try, catch et les codes/messages d'erreurs.
// on va modifier toutes nos fonctions pour intégrer ce concept afin d'empêcher les erreurs de tout faire crash


// création du routeur pour les acivités
const activitiesRouter = express.Router();


activitiesRouter.get('/', async (req, res) => {
    try {
        const activities = await db.getAllActivities();
        res.json(activities);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


activitiesRouter.get("/:id", async (req, res) => {
    try{
        const id = Number(req.params.id); // On remplace parseInt ici par Number car il exige que toute la chaîne de caractère soit un nombre valide
        if (!isValidId(id)) {
            return res.status(400).json({error: "ID invalide"});
        }
        const activity = await db.getActivityById(id);
        if (activity === undefined) {
            res.status(404).json({error:"Activité non trouvée"});
        } else{
            res.json({activity})
        }
        res.json({activities});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

activitiesRouter.post("/create", async(req, res) => {
    try { // d'abord on vérifie la validation des données avec checkData de helper.js
        checkData(req.body)
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
    try { // puis on enrengistre dans la BD
        const newActivity = await db.createActivity(req.body);
        const message = `L'activité ${newActivity.name} a bien été crée!`;
        res.json({message: message, activity: newActivity});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

activitiesRouter.put("/:id", async (req, res) => {
    try{ // validation des données
        checkData(req.body)
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
    try { // mise à jour dans la base de données
        const resUpdateActivitiesNb = await db.updateActivity(req.params.id, req.body);
        if (resUpdateActivitiesNb === 0) {
            res.status(404).json({error: "Activité non trouvée"});
        } else{
            const activityUpdated = await db.updateActivity(req.params.id, req.body);
            res.json({message: `Activity updated`, updated: activityUpdated});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message});
    }

    // const resUpdateActivitiesNb = await db.updateActivity(...)
    // on demande à la BD d'exécuter la modification en lui transmettant l'ID récupéré (via req.params.id) et les nouvelles données (req.body)
    // la variable stock le nombre de lignes modifiées
    // si le test if retourne 0, ça veut dire qu'aucune ligne n'a été modifiée (car l'ID demandé n'existe pas). le serveur renvoi 404
    // si le test retourne >0, l'activité a été trouvée et modifiée. le code exécute le else
    // le else récupère l'activité mise à jour et renvoie une réponse au client avec un message de succès.
    // le catch error global à la fin est pour attraper une erreur technique (Bd en panne, erreur de syntax, etc) et renvoyer 500
});

activitiesRouter.delete("/:id", async (req, res) => {
    try{ // on fait une validation strict de l'ID
        // avec Number() qui transforme l'id récupéré dans l'URL pour le transformer en vrai nombre
        // et avec isValidId(id) qui utilise la fonction de validation pour s'assurer que c'est un entier
        const id = Number(req.params.id);
        if (!isValidId(id)) {
            return res.status(400).json({error: "ID invalide"});
        }
        let deletedActivity = await db.deleteActivity(req.params.id); // tentative de suppression, on attends la réponse de la BD avec await
        if (deletedActivity.success){ // si ça vaut true, on renvoie;
            res.json({message: `Activity deleted`});
        } else {
            res.status(404).json({error: `Activité non trouvée`});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


export default activitiesRouter;
// ou export {activititesRouter}