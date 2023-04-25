/**
 * Utilisation du fichier .env IL EST 20h47 Jai toujours accès !
 */
require("dotenv").config();
const express = require("express");
const app = express();

// Si la variable d'environnement PORT n'existe pas, alors prend le port 5050
const PORT = process.env.PORT || 5050;

/**
 * Je créer des routes
 */

// HOME
app.get("/", (req, res) => {
	res.send("Coucou les potos ! Le serveur fonctionne bien sur la racine '/'");
});

// GET ALL
// Fake data (simulation de l'appel à la BDD)
const users = [
	{
		id: 1,
		name: "Anthony",
	},
	{
		id: 2,
		name: "Jean-François",
	},
	{
		id: 3,
		name: "Julien",
	},
	{
		id: 4,
		name: "Benoît",
	},
];

app.get("/users", (req, res) => {
	res.json(users);
});

// GET ONE
app.get("/users/:id", (req, res) => {
	/**
	 * console.log(req);
	 * req : {
	 *  ...
	 *  params: { id: '4' }
	 *  ...
	 * }
	 */
	const id = req.params.id;
	// const {id} = req.params;

	const user = users.find((e) => e.id === parseInt(id));
	// Le but est de passer des fake data vers la DB

	if (!user) {
		return res
			.status(404)
			.json({ message: "user not found", status: "NOK" });
	}

	return res.json(user);
});

// POST ONE
let newId = 5;
// Pour avoir acces aux infos de notre user (ici, postman / insomnia)
// Je suis obligé d'utiliser la ligne ci-dessous
app.use(express.json());
app.post("/users", (req, res) => {
	// Ici, je récupère le name
	const name = req.body.name;
	// On peut extraire le name, de la manière suivante
	// const { name } = req.body

	// je créer un objet newUser qui ressemble à un user
	// de mon tableau users
	const newUser = { id: newId++, name: name };

	// Je l'ajoute à mon tableau
	users.push(newUser);

	// Puis je le rend
	res.json(users);
});

/**
 * Ne pas toucher les lignes du dessous ⬇️
 */
app.listen(PORT, (err) => {
	if (err) {
		console.error("Oups, une erreur s'est produite");
	} else {
		console.log(`L'application tourne sur le port: ${PORT}`);
	}
});
