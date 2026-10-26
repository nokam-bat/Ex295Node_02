// Voici des fonctions de vérifications pour contrôler que les données sont correctes


// Vérifier qu'un identifiant id est valide.
function isValidId(value) {
    return Number.isInteger(value) && value > 0;
    // s'assure que c'est un nombre entier et que valeur>0 pour qu'il soit strictement positif
    //Number.isInteger(value): Est-ce que la valeur est un nombre entier?
    // && c'est un opérateur qui exige que les 2 conditions soient vraies
        // Si l'utilisateur envoie 5 (nombre entier - vrai) ET 5> (positif) alors le réultat sera true
    // ce qui voudra dire que l'id est valide
}

// Vérifier qu'une durée est correcte
function checkDuration(value) {
    return value > 0 && value <= 144;
}

// Vérifier qu'un champ n'est pas vide. ( null, undefined, "" )
function checkDataNotEmpty(value) {
    return !(value === null || value === undefined || value === ""); // || est l'opérateur OU
}

// Cette fonction s'assure qu'une activité est valide avant de l'enrengistrer
// Si un ou plusieurs champs sont vide, on renvoie un message d'erreur correspondant.
//other syntax for the declaration of a function
const checkData = (obj) => {                // pour que les champs soient pas vide
    if (!(checkDataNotEmpty(obj.name) && checkDataNotEmpty(obj.activity_date) && checkDataNotEmpty(obj.duration)))  {
        throw new Error("Données incomplètes");
    }
    if (!checkDuration(obj.duration)) { // pour la duration
        throw new Error("La durée doit être comprise entre 0 et 144");
    }
}

export {isValidId, checkDuration, checkDataNotEmpty, checkData};