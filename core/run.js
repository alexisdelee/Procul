Velocity(document.body, {opacity: 1, top: 0}, 2000);
document.getElementById('bestScore').textContent = new Intl.NumberFormat('de-DE').format($_GET('best'));

/* Initialise */
var player = document.getElementById('player');
var hs = [];
var counter = 0;

createEnemy(window.innerWidth - 65);
hs.splice(0, 1);
score(0);

var o_time = new Date().getTime();
var index = 0, o = 3500, speed = o;
var color = '#505061';
var obs = 0;
var _end = 0;
var jump = 0;
var pause = false;
var key = false;

/* Keyboard input */
window.addEventListener('keydown', function(e){
	if(e.keyCode == 65 || e.keyCode == 90 || e.keyCode == 69) key = e.keyCode;
});

/* Traitement */
setInterval(function(){
	speed = (speed == 0 ? 0 : speed - 50);

	if(speed == 1250){
		Velocity(document.getElementsByTagName('body')[0], {backgroundColor: '#000'}, 1000);
		color = '#F9FAFB';
	}
}, 5000);

function createEnemy(x){
	var enemy = document.createElement('div');
	var height = random(1, 100);

	if(height <= 70) height = 1;
	else if(height <= 90) height = 2;
	else height = 3;

	hs.push(height);

	enemy.setAttribute('class', 'enemy');
	enemy.style.left = x + 'px';
	enemy.style.height = (20 * height) + 'px';
	enemy.style.top = (280 - (height - 1) * 20) + 'px';
	enemy.style.backgroundColor = color;

	document.getElementsByTagName('body')[0].appendChild(enemy);

	var s = speed;
	Velocity(enemy, {left: '-30px', tween: x}, {progress: function(els, complete, remaining, start, tweenValue){
		if((x - tweenValue) >= player.offsetLeft && (x - tweenValue) <= player.offsetLeft + 20){
			if(Math.abs(Math.floor((player.offsetTop - 280) / 20)) >= 0 && Math.abs(Math.floor((player.offsetTop - 280) / 20)) < hs[0]){
				_end++;

				if(_end == 2) end();
			}
		}

		if(!pause && complete != 1 && (x - tweenValue) <= player.offsetLeft && (x - tweenValue) >= (player.offsetLeft - 20)){
			if(key == 65 && hs[0] == 1) score(hs[0]);
			else if(key == 90 && hs[0] == 2) score(hs[0]);
			else if(key == 69 && hs[0] == 3) score(hs[0]);

			hs.splice(0, 1);
			pause = true;
		}

		if(complete == 1) pause = false;
	}, duration: s});

	setTimeout(function(){
		destroy(enemy);
	}, s);

	var init = setTimeout(function(){
		createEnemy(window.innerWidth - 40);
	}, random(700, 1600));
}

function random(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function end(){
	var save = counter;
	var jump = --obs;
	var done = Math.floor((o - speed) / o * 100);

	Velocity(document.body, {top: '-310px', opacity: 0}, 2000);
	setTimeout(function(){
		location.href = 'end.html?score=' + save + '&obs=' + jump + '&done=' + done + '&best=' + $_GET('best');
	}, 2000);
}

function score(h) {
	var p_time = new Date().getTime();
	if(h == 1) counter += 50 * Math.floor((p_time - o_time) / 4);
	else if(h == 2) counter += 100 * Math.floor((p_time - o_time) / 4);
	else if(h == 3) counter += 500 * Math.floor((p_time - o_time) / 4);

	var displayScore = document.getElementsByTagName('header')[0];
	displayScore.innerHTML = '<span class="score">' + (new Intl.NumberFormat('de-DE').format(counter)) + '</span>';
	displayScore.innerHTML += '<br>';
	displayScore.innerHTML += (!isNaN(Math.floor((o - speed) / o * 100)) ? Math.floor((o - speed) / o * 100) + ' %' : '');
}

function destroy(enemy){
	enemy.parentNode.removeChild(enemy);
	obs++;
}