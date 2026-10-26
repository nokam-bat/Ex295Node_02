# Ex295Node_02
## Installer l'environnement d'exécution node.JS
Télécharger le fichier windows installer .msi
choisir la version TLS, pour la stabilité et la sécurité
Vérifier que l'installation est correcte:
- Node.js: $ node -version (ou node -v)
- Npm : $ npm -version
S'il y a un problème de droits d'accès:
Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope CurrentUser

## Développement
Il faut créer un nouveau projet Node en tapant:
$ npm init
Entrer une valeur spécifique pour: un point d'entrée (app.js), type (module).

Pour lancer le projet:
$ node app.js (le nom doit être identique à celui indiqué au point d'entrée)

## Installer express
npm install express --save

## Intaller nodemon
$ npm install nodemon --save-dev
Puis modifier le package.json en ajoutant, dans la partie script, une entreé pour le démarrage du projet.
"scripts":{
    "test":"echo \Error: no test specified\" && exit 1",
    "start": "nodemon app.js"
},
ça va permettre à nodemon de lancer le projet plutôt que node.

Lancer la commande: npm run start

## Lors de la création de nouvelles branches
Il faut installer les dépendances dans le package.json:
$ npm install

Les dépendances sont ajoutées au fur et à mesure:
dotenv => npm install dotenv
express => npm install express --save
mysql2 =>
swagger-jsdoc  et swagger-ui-express => npm install swagger-jsdoc swagger-ui-express
en cas de problème => npm audit fix

Les dépendances de développeur (devDependencies) sont:
nodemon => npm install nodemon --save-dev


Pour la connection à la Base de Donnée, on se fie au .env.exemple.

