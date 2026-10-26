// Ici, on fait la connexion à la base de donnée app_activities
import mysql from 'mysql2/promise'; // ça représente la connexion à la base de donnée

const con = await mysql.createPool({ // c'est la constante pour se connecter
    host: "localhost",
    user: "root",
    password: "root",
    port:3306,
    database: "app_activities",
});

// on va créer un objet db qui va grouper les différentes opérations applicables sur la BD
const db = {

    getAllActivities: async () => {
        //the getAllActivities function waits until the query is finished to execute
        //if there is some code after the call of this function, it will be executed without waiting the execution of this function
        const [rows] = await con.execute('SELECT * FROM activities');
        return rows;

        // cette fonction va afficher l'ensemble des activité poposées au CPNV
        // await dit à la fonction d'attendre la réponse de la BD sans bloquer le serveur Node.js
        // Node.js pourra s'occuper d'autres tâches/users sans être figé par l'attente de la réponse de la BD
        // const [rows] sert à déstructurer le tableau de données (lignes de la table) et de métadonnées (infos sur les colonnes)
        //quand msql2 réponds à une requête, il renvoie un tableau de données en ces deux éléments.

        //const[rows] veut donc dire qu'on veut récupérer les données du tableau et les stocker dans la variable rows
        // result[0] caar on prends le premier champ.
    },

    // cette fonction affiche une activité donnée par l'utilisateur via son ID
    getActivityById: async ( id) => {
        const [rows] = await con.execute('SELECT * FROM activities WHERE id = ?', [id]);
        return rows[0]; // renvoie l'objet unique ou undefined s'il existe pas
    },


    // Pour ajouter une nouvelle activité
    createActivity: async ( {name, date, duration}) => {
        const [result] = await con.execute(
            'INSERT INTO activities (name, activity_date, duration) VALUES (?, ?, ?)',
            [name, date, duration]
        ); // on retourne l'objet avec l'id généré par MySQL
        return {id: result.insertId, name, date, duration};
    },

    // Mettre à jour une activité existante
    updateActivity: async (id, {name, date, duration}) => { // on passe deux sortes d'arguments à la fonction: l'id crée ET des nouvelles données récupérées
        await con.execute(
            'UPDATE activities SET name = ?, activity_date = ?, duration = ? WHERE id = ?',
            [name, date, duration, id]
        );
        return {id, name, date, duration}; // On retourne l'objet mis à jour en gardant son ID d'origine
    },

    // supprimer une activité via son id
    deleteActivity: async (id) => {
        await con.execute('DELETE FROM activities WHERE id = ?', [id]);
        return {success: true};
    },
}

export default db;