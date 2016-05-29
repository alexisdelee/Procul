var player = document.getElementById('player');
var jump = 0;

window.addEventListener('keydown', function(e){
	if((e.keyCode == 65 || e.keyCode == 90 || e.keyCode == 69) && !jump){
		if(e.keyCode == 65) h = 20;
		else if(e.keyCode == 90) h = 40;
		else h = 60;

		jump = 1;
		Velocity(player, {top: (player.offsetTop - h) + 'px'}, 80);
		setTimeout(function(){
			Velocity(player, {top: (player.offsetTop + h) + 'px'}, 80);
			setTimeout(function(){
				jump = 0;
			}, 80);
		}, 500);
	}
});