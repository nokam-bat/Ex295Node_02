# Ex295Node_02
## Installer l'environnement d'exécution node.JS
Télécharger le fichier windows installer .msi
choisir la version TLS, pour la stabilité et la sécurité
Vérifier que l'installation est correcte:
- Node.js: node -version (ou node -v)
- Npm : npm -version
S'il y a un problème de droits d'accès:
Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope CurrentUser

## Développement
Il faut créer un fichier package.json en tapant:
npm init
Entrer une valeur pour: un point d'entrée (app.js), type (module).

Pour lancer le projet:
node app.js (le nom doit être identique à celui indiqué au point d'entrée)

## Lors de la création de nouvelles branches
Il faut installer les dépendances dans le package.json:
npm install

Les dépendances sont:
dotenv
express
mysql2
swagger-jsdoc
swagger-ui-express

Les dépendances de développeur (devDependencies) sont:
nodemon

Si le package.json n'est pas téléchargé:
npm install dotenv express mysql2 swagger-jsdoc swagger-ui-express
npm install --save-dev nodemon

Pour la connection à la Base de Donnée, on se fie au .env.exemple.

