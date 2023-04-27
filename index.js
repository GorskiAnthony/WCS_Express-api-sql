/**
 * Utilisation du fichier .env IL EST 20h47 Jai toujours accès !
 */
require("dotenv").config();
const express = require("express");
const app = express();
const connection = require("./db/config.js");

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
app.get("/users", (req, res) => {
	const SQL = "SELECT * FROM formateur";

	connection
		.query(SQL)
		.then((users) => {
			// [users] === users[0]
			res.json(users[0]);
		})
		.catch((err) => {
			console.error(err);
			res.json({ error: err.message });
		});
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
	 *
	 * http://monsite.com/users/8 avec 8 === id
	 */
	const id = req.params.id;
	// const {id} = req.params;

	/**
	 * Etape 1 : Connexion avec la db via `connection`
	 * Etape 2 : Faire une requete SQL qui prend en compte l'id
	 * Ex : SELECT * FROM formateur WHERE id=id
	 * Etape 3 : Si OK alors affiche le user
	 * Etape 4 : Sinon affiche une erreur
	 */

	// connection.query().then().catch();

	const SQL = "SELECT * FROM formateur WHERE id= ?";
	connection
		.query(SQL, [id])
		.then((result) => {
			if (!result[0][0]) {
				res.status(404).json({ message: "Trainer not found" });
			} else {
				res.json(result[0][0]);
			}
		})
		.catch((err) => {
			console.error(err);
		});
});

// POST ONE
// Pour avoir acces aux infos de notre user (ici, postman / insomnia)
// Je suis obligé d'utiliser la ligne ci-dessous
app.use(express.json());
app.post("/users", (req, res) => {
	// Ici, je récupère le name
	const name = req.body.name;
	// On peut extraire le name, de la manière suivante
	// const { name } = req.body

	/**
	 * Etape 1 : Connexion avec la db via `connection`
	 * Etape 2 : Faire une requete SQL qui prend en compte le name
	 * Ex : INSERT INTO formateur (name) VALUES name = name;
	 * Etape 3 : Si OK alors affiche un message user bien ajouté
	 * Etape 4 : Sinon affiche une erreur
	 */

	// connection.query().then().catch();
	const SQL = "INSERT INTO formateur (name) VALUES (?)";
	connection
		.query(SQL, [name])
		.then(([result]) => {
			if (result.affectedRows === 1) {
				res.status(201).json({ message: "Trainer added" });
			} else {
				res.status(500).json({ message: "error" });
			}
		})
		.catch((err) => {
			console.error(err);
		});
});

// DELETE

app.delete("/users/:id", (req, res) => {
	/**
	 * Etape 1 : Connexion avec la db via `connection`
	 * Etape 2 : Faire une requete SQL qui prend en compte l'id
	 * Ex : DELETE FROM formateur WHERE id=id;
	 * Etape 3 : Si OK alors affiche un message user bien ajouté
	 * Etape 4 : Sinon affiche une erreur
	 */
	// connection.query().then().catch();
	const SQL = "DELETE FROM formateur WHERE id=?";
	connection
		.query(SQL, [req.params.id])
		.then(([result]) => {
			if (result.affectedRows === 1) {
				res.status(204).send();
			} else {
				res.status(500).json({ message: "error" });
			}
		})
		.catch((err) => {
			console.error(err);
		});
});

app.put("/users/:id", (req, res) => {
	const SQL = "UPDATE formateur SET name = ? WHERE id=?";
	connection
		.query(SQL, [req.body.name, req.params.id])
		.then(([result]) => {
			console.log(result);
			res.json("updated");
		})
		.catch((err) => {
			console.error(err);
		});
});

/**
 * Ne pas toucher les lignes du dessous ⬇️
 */

// Express
app.listen(PORT, (err) => {
	if (err) {
		console.error("Oups, une erreur s'est produite");
	} else {
		console.log(`L'application tourne sur le port: ${PORT}`);
	}
});
