
const { builtinModules } = require('module');
const mysql = require('mysql2/promise');


const path = require('path');


console.log(`logging the process.argv ${process.argv.slice(2)}`)

const args = process.argv.slice(2);

console.log(`logging args ${args}`)
console.log(`loggin the arg variable ${args}`)

const envFile = args == "test" ? '../.env.test' : '../.env';

console.log(envFile)

require('dotenv').config({
	path: path.join(__dirname, envFile),
});

const {
	DB_PASSWORD, DB_NAME, DB_USER, DB_HOST, DB_PORT,
} = process.env;
console.log(`this is the environmental variable of dbname in scripts create-database ${DB_NAME}`)

const setUpDatabase = async () => {
	try {

		const db = await mysql.createConnection({
			host: DB_HOST,
			user: DB_USER,
			password: DB_PASSWORD,
			port: DB_PORT,
		});


		await db.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
		await db.query(`USE ${DB_NAME}`);
		await db.query(`CREATE TABLE IF NOT EXISTS Artist(
	id INT PRIMARY KEY auto_increment,
	name VARCHAR(25),
	genre VARCHAR(25)
)`);
		db.close();
	} catch (err) {
		console.log(
			'Your environment variables might be wrong. Please double check .env file',
		);
		console.log('Environment Variables are:', {
			DB_PASSWORD,
			DB_NAME,
			DB_USER,
			DB_HOST,
			DB_PORT,
		});
		console.log(err);
	}
};

setUpDatabase();

exports.DB_PASSWORD = DB_PASSWORD
exports.DB_NAME = DB_NAME
exports.DB_USER = DB_USER
exports.DB_HOST = DB_HOST
exports.DB_PORT = DB_PORT
