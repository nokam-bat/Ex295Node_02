import express from "express";
import db from "../db/db-activities.js";

// création du routeur pour les acivités
const activitiesRouter = express.Router();


activitiesRouter.get('/', async (req, res) => {
    const activities = await db.getAllActivities();
    res.json( activities )
});


activitiesRouter.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const activities = await db.getAllActivities();
    res.json({activities});
});

activitiesRouter.post("/create", async(req, res) => {
    const newActivity = await db.createActivity(req.body);
    const message = `L'activité ${newActivity.name} a bien été crée!`;
    res.json({message: message, activity: newActivity});
});

activitiesRouter.put("/:id", async (req, res) => {
    const updateActivity = await db.updateActivity(req.params.id, req.body);
    res.json({message: `activity updated`,updateActivity: updateActivity});
});

activitiesRouter.delete("/:id", async (req, res) => {
    let deletedActivity = await db.deleteActivity(req.params.id);
    res.json({message: `Activity deleted`});
});


export default activitiesRouter;
// ou export {activititesRouter}