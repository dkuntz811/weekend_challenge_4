$(document).ready(function (){
	console.log("I'm Ready");
	getTasks();

	$("#txtbtn").on('click', submitTasks);
});

function getTasks () {
	$.ajax({
		type: 'GET',
		url: '/tasks',
		success: function (tasks) {
			console.log('GET /tasks returns', tasks);
			tasks.forEach (function (task) {
				var $el = $('<li></li>');
				$el.append('em' + tasks.todo + '</em>');
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
		tasks[field.name] = field.value;
	});
	$.ajax({
		type: 'POST',
		url: "/tasks",
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
