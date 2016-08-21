$(document).ready(function (){
	console.log("I'm Ready");
	getTasks();
	$("#txtbtn").on('click', submitTasks);
	$("#delete").on('click', deleteTask);



});

function getTasks () {
	$.ajax({
		type: 'GET',
		url: '/tasks',
		success: function (tasks) {
			console.log('GET /tasks returns', tasks);
			tasks.forEach (function (task) {
				var $el = $('<li id = "list"></li>');
				$el.append('<em>'+ task.todo + '<button id = "complete">Complete</button>' + '<button id = "delete">Delete</button>' + '</em>');
				$('#tasklist').on('click', '#complete', function(){
					$(this).parent().css("background-color", "tan");
				})
				$('#tasklist').append($el);


			});
		},
		error: function (response) {
			console.log('GET /tasks failed');
		},
	});


}

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

function deleteTask () {
	$.ajax({
		type: 'DELETE',
		url: '/tasks',
		data: task,
		success: function () {
			console.log("DELETE SUCCESS");
			$('#tasklist').children.empty();
			getTasks();
		},
		error: function(){
			console.log('DELETE FAILED');
		},

	});
}
