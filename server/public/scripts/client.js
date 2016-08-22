$(document).ready(function (){
	console.log("I'm Ready");
	getTasks();
	$("#txtbtn").on('click', submitTasks);
	$("#complete").on('click', putTasks);
	$('#tasklist').on('click', '#delete', deleteTask);
});

//get tasks from server and append to DOM

function getTasks () {
	$.ajax({
		type: 'GET',
		url: '/tasks',
		success: function (tasks) {
			console.log('GET /tasks returns', tasks);
			tasks.forEach (function (task) {
				var $el = $('<li id = "list"></li>');
				$el.data('taskID', task.id);
				$el.append('<em>'+ task.todo + '<button id = "complete">Complete</button>' + '<button id = "delete">Delete</button>' + '</em>');
				$('#tasklist').on('click', '#complete', function(){
					$(this).parent().css("background-color", "tan");
					$(this).parent().css("text-decoration", "line-through");
				})
				$('#tasklist').append($el);


			});
		},
		error: function (response) {
			console.log('GET /tasks failed');
		},
	});
}

//POST tasks to server and empty form

function submitTasks(){
	var task = {};
	$.each($('#taskmaster').serializeArray(), function (i, field){
		task[field.name] = field.value;
	});
	$.ajax({
		type: 'POST',
		url: '/tasks',
		data: task,
		success: function() {
			console.log("POST /tasks succeeded");
			$('#taskmaster').empty();
			getTasks();
		},
		error: function (response) {
			console.log("POST /tasks failed");
		},
	});
}

//put 'completed' into database when completed button is clicked. *****Theoretically******

function putTasks () {
	var task = {};
	var inputs = $(this).parent().children().serializeArray();
  $.each(inputs, function (i, field) {
		task[field.name] = field.value;
		console.log(task);
	});
	var taskID = $(this).parent().data('taskID');

	$.ajax({
		type: 'PUT',
		url: '/tasks/' + taskID,
		data: task,
		sucess: function () {
		getTasks();
		},
		error: function () {
			console.log('Error PUT /tasks/' + taskID);
		},

	});
}



//delete tasks from server
function deleteTask () {
	var taskID = $(this).parent().parent().data('taskID');
	console.log(this);
	console.log(taskID);
	$.ajax({
		type: 'DELETE',
		url: '/tasks/' + taskID,
		success: function () {
			console.log("DELETE SUCCESS");

				$(this).parent().parent().remove();

			 $('#tasklist').empty();
			 //reload tasks to DOM
			 getTasks();
		},
		error: function(){
			console.log('DELETE FAILED');
		},

	});
}
