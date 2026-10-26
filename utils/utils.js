// cette fonction sert à générer automatiquement un nouvel identifiant unique
// donc un id unique pour la prochaine activité que je veux créer
// comme on utilise encore mock-activitites (des données en mémoires/fictives),
// on n'a pas de BD SQL qui incrémente les ID toute seule.
// la fonction getNewID fabrique des id
const getNewID = activities => {
    //array of id
    const activitiesIds = activities.map((activity) => activity.id);
    //get max id
    const maxId = Math.max(...activitiesIds); // ...spread operator pour déballer le tableau
    const id = maxId + 1; // rajoute un Id pour crée un ID unique inexistant
    return id;
}


// .map() parcourt le tableau d'activité et extrait que la propriété id de chaque objet
// Résultat: Si mes activités ont des ID 1,2 et 5, la fonction va créer un nouveau tableau contenant uniquement [1,2,5]



export default getNewID;