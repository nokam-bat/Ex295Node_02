// Ici, on fait la connexion à la base de donnée app_activities
import mysql from 'mysql2/promise'; // ça représente la connexion à la base de donnée

// sert à charger les variables d'env
process.loadEnvFile();


// on crée un pool (bassin) de connexion
// Quand une requête arrive, le pool emprunte une connexion libre, exécute la requête rapidement et remet la connexion dans la réserve pour les autres
const poolConn = mysql.createPool({ // c'est la constante pour se connecter, de manière sécurisée
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,

    // mysql.createPool crée et configure l'objet pool en mémoire. elle ne retourne pas de promesse
// createPool() ne se connecte pas activement et immédiatement à la BD, donc utiliser await est inutile. c'est pas asynchrone
});


// on va créer un objet db qui va grouper les différentes opérations applicables sur la BD
const db = {

    getAllActivities: async () => {
        try{
            //the getAllActivities function waits until the query is finished to execute
            //if there is some code after the call of this function, it will be executed without waiting the execution of this function
            const [rows] = await poolConn.execute('SELECT * FROM activities'); //
            return rows;
        } catch (err) {
            console.log(err); // affiche l'erreur en clair dans le terminal pour savoir pourquoi ça plante
            throw err; // Relance l'erreur vers la route qui a appelé la fonction, donc le routeur recevra l'erreur et pourra l'afficher au lieu de croire que tout va bien
        }

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
        try{
            const [rows] = await poolConn.execute('SELECT * FROM activities WHERE id = ?', [id]);
            return rows[0]; // renvoie l'objet unique ou undefined s'il existe pas
        } catch (err) {
            console.log(err);
            throw err;
        }
    },


    // Pour ajouter une nouvelle activité
    createActivity: async ( {name, activity_date, duration}) => {
        try{
            const [result] = await poolConn.execute(
                'INSERT INTO activities (name, activity_date, duration) VALUES (?, ?, ?)',
                [name, activity_date, duration] // dans la BD ma colonne s'appelle activity_date donc j'enlève date pour ça
            ); // on retourne l'objet avec l'id généré par MySQL
            return {id: result.insertId, name, activity_date, duration};
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    // Mettre à jour une activité existante
    updateActivity: async (id, {name, activity_date, duration}) => { // on passe deux sortes d'arguments à la fonction: l'id crée ET des nouvelles données récupérées
        try {
            const [result] = await poolConn.execute(
                'UPDATE activities SET name = ?, activity_date = ?, duration = ? WHERE id = ?',
                [name, activity_date, duration, id]
            );
            // retourne {id, name, date, duration};
            // On retourne l'objet mis à jour en gardant son ID d'origine
            return result.affectedRows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    // supprimer une activité via son id
    deleteActivity: async (id) => {
        try{
            const [result] = await poolConn.execute('DELETE FROM activities WHERE id = ?', [id]);
            if (result.affectedRows > 0) {
                return {success: true};
            } else{
                return {success: false};
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}

export default db;