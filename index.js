/**
 * Utilisation du fichier .env
 */
require("dotenv").config();
const express = require("express");
const app = express();

// Si la variable d'environnement PORT n'existe pas, alors prend le port 5050
const PORT = process.env.PORT || 5050;

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
