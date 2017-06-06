gameStart();

function gameStart() {
		canvas = document.getElementById('background');
		length = 5;
		gridLength = 20;
		pos = { x: canvas.width/2-gridLength, y: canvas.height/2-gridLength };
		draw = canvas.getContext('2d');
		direction = { x: 0, y: -1 };
		snake = [];
		food = { x: undefined, y: undefined };
		
		initializeSnake();

		interval = window.setInterval(function () {
				mainLoop();
		}, 150);
}

function mainLoop() {
		checkGameOver();
		spawnFood();
		eatFood();

		draw.fillStyle = 'green';
		draw.fillRect(snake[0]['x'], snake[0]['y'], gridLength, gridLength);
				
		draw.fillStyle = 'black';
		draw.fillRect(snake[snake.length-1]['x'], snake[snake.length-1]['y'], gridLength, gridLength);
		
		updatePositions();
		updateDirections();
}

function initializeSnake() {
		for (var i = 0; i < length; i++) {				
				snake[i] = { x: pos['x'], y: pos['y'], dir_x: direction['x'], dir_y: direction['y'] };
				pos['y'] += gridLength;
		}
}

function updatePositions() {	
		for (var i = 0; i < snake.length; i++) {	
				snake[i]['x'] = snake[i]['x'] + gridLength * snake[i]['dir_x'];
				snake[i]['y'] = snake[i]['y'] + gridLength * snake[i]['dir_y'];	
				
				if (snake[i]['x'] > canvas.width) snake[i]['x'] = 0;
				if (snake[i]['x'] < 0) snake[i]['x'] = canvas.width;	
				if (snake[i]['y'] > canvas.height) snake[i]['y'] = 0;
				if (snake[i]['y'] < 0) snake[i]['y'] = canvas.height;
		}
}

function updateDirections() {
		for (var i = snake.length-1; i > 0; i--) {
				snake[i]['dir_x'] = snake[i-1]['dir_x'];
				snake[i]['dir_y'] = snake[i-1]['dir_y'];
		}
}

function spawnFood() {
		if (food['x'] === undefined && food['y'] == undefined) {
				var x = Math.floor(Math.random() * (canvas.width/gridLength));
				var y = Math.floor(Math.random() * (canvas.height/gridLength));
				
				food['x'] = x * gridLength;
				food['y'] = y * gridLength;
		}
			
		draw.fillStyle = 'green';
		draw.fillRect(food['x'], food['y'], gridLength, gridLength);
}

function eatFood() {
		if (snake[0]['x'] == food['x'] && snake[0]['y'] == food['y']) {
				var last = snake[snake.length-1];
				snake[snake.length] = { x: last['x'] - gridLength*last['dir_x'], y: last['y'] - gridLength*last['dir_y'], dir_x: last['dir_x'], dir_y: last['dir_y'] };
				food['x'] = undefined;
				food['y'] = undefined;
		}
}

function checkGameOver() {
		for (var i = 1; i < snake.length-1; i++) {
				if (snake[0]['x'] == snake[i]['x'] && snake[0]['y'] == snake[i]['y']) {
						window.clearInterval(interval);
						draw.clearRect(0, 0, canvas.width, canvas.height);
						gameStart();
				}
		}
}

//key bindings
document.onkeyup = function () {
    if (event.keyCode == 32) {
        window.clearInterval(interval);
    }
}

document.onkeydown = function () {
		//up
    if (event.keyCode == 38 && snake[0]['dir_y'] != 1) {
				snake[0]['dir_x'] = 0;
        snake[0]['dir_y'] = -1;
    }
		//down
		if (event.keyCode == 40 && snake[0]['dir_y'] != -1) {
				snake[0]['dir_x'] = 0;
        snake[0]['dir_y'] = 1;
    }
		//left
		if (event.keyCode == 37 && snake[0]['dir_x'] != 1) {
        snake[0]['dir_x'] = -1;
				snake[0]['dir_y'] = 0;
    }
		//right
		if (event.keyCode == 39 && snake[0]['dir_x'] != -1) {
        snake[0]['dir_x'] = 1;
				snake[0]['dir_y'] = 0;
    }
}