Dans cette branche on utilise:
mock-activities comme fausse BD
activities.js comme routeur, basé sur les données de mock-activities
utils.js de utils qui sert d'auto-incrémentation d'ID sans BD

### Dans activities.js 
on a importé les données de mock-activities


### Dans app.js
on a importé le sous-routeur qu'est activities.js
et on lui charge de la partie de l'URL qui concerne /api/activities
(app.use('/api/activities', activitiesRouter);)
et on utilise app.use car on l'utilise.

### Dans utils.js
on crée notre auto-incrémentation d'ID avec const getNewID

Et j'ai découvert .map()

activities.map((activity) => activity.id) 
//parcourt le tableau d'activité et extrait que la propriété id de chaque objet