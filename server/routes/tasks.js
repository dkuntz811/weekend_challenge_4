var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/omicron'

router.get('/', function (req, res){

	pg.connect(connectionString, function (err, client, done) {
		if (err) {
			res.sendStatus(500);
		}
		client.query('SELECT * FROM tasks', function (err, result){
			done();

			if (err) {
				res.sendStatus(500);
			}
			res.send(result.rows);
		});
	});

});

router.post('/', function (req, res) {
	var task = req.body;
	console.log(req.body);
	console.log("Body: ", task);

	pg.connect(connectionString, function (err, client, done){
		if (err) {
			res.sendStatus(500);
			console.log("Database connection failed");
		}
		client.query('INSERT INTO tasks (todo, todo_number) '
	             + 'VALUES ($1, $2)',
						    [task.todo, task.todo_number],
							function (err, result){
								done();

								if (err) {
									res.sendStatus(500);
									console.log(err);
								}
						      res.sendStatus(201);
							});
	});

});

module.exports = router;
