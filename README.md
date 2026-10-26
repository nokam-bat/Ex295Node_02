Dans cette branche on utilise une base de donné où on mets notre connexion à découvert, sans .env

On va gérer les cas d'erreurs:
1. On valide l'entrée des données
2. On gère les cas d'erreurs avec les bon codes HTTP
3. on protège le serveur contre les plantages

### Dans db-activities.js
process.loadEnvFile(); à mettre en haut pour utiliser .env
on sécurise la connextion avec des variables d'environnement.
je crée un fichier .env.exemple

Dans activitiesRouter.get("/:id",
On modifie parseInt(req.params.id) Par Number
et on fait un if !isValidId(id) pour vérifier si l'ID est valide selon ce qu'on a écrit dans helper.js

const activities devient const activity pour getActivityById(id)

On va créer un pool de connexion
on va modifier con par poolConn car on remplace une connexion unique (con) par un poll de connexions (createPool)

On va modifier les fonctions en rajoutant le poolConn + le try + le catch + le console.log + le throw
throw err est super important pour renvoyer l'erreur au routeur de l'API. sans ça il penserait que tout va bien. (pas trop capté en vrai)

dans la BD ma colonne s'appelle activity_date donc j'enlève date pour ça pour les []

### Dans helper.js
On créer les fonctions de vérifications pour les champs (duration, id, etc)


### Dans activities.js
On importe ls fonctions isValidId et  checkData de helper.js
On gère les cas d'erreurs avec:
try...
if...
else..
catch... 
et des messages d'erreurs avec code de status
Et on se sert de fonctions de vérifications faite dans helper.js

Pour activitiesRouter.post
on utilise un try pour filtrer les donnée
puis un deuxième try pour enrengistrer dans la BD
sans oublier le catch error qui renvoi un message d'erreur


Pour activitiesrouter.put /:id on change complètement la structure du code

Pour .delete aussi on change entièrement en rajoutant des try, else, if, catch, catch global, Number à la place de parseInt, etc

### Dans app.js

On a ajouté un Middleware pour le frontend

On ajoute un app.use avec un message d'erreur si la route URL n'existe pas.
