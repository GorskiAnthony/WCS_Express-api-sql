require("dotenv").config();
const mysql = require("mysql2");

// const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_DATABASE } = process.env;

const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
	database: process.env.DB_DATABASE,
});

connection.connect((err) => {
	if (err) {
		console.error("error connecting: " + err.stack);
		return;
	}
	console.log("connected as id: " + connection.threadId);
});

module.exports = connection.promise();
