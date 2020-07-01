$(document).ready(function(){

	document.getElementById("video").addEventListener("contextmenu", function(event){
		event.preventDefault();
	})

	//Will probably not work with several videos.
	var video = document.querySelector('.video');
	//$('video').attr('controlsList', 'nodownload');


	var juice = document.querySelector('.orange-juice');
	var btn = document.getElementById('play-pause');
	var skipBtn = video.querySelectorAll('.player_skip_button');

	$("#testoutille").click(function(){
		console.log("test");
		video.requestFullscreen().catch(function(e){
			console.log(e);
		})
	})

	function togglePlayPause(){
		if (video.paused){
			btn.className = 'pause';
			video.play();
		} else {
			btn.className = 'play';
			video.pause();
		}
	}

	btn.onclick = function(){
		togglePlayPause()
	}

	video.addEventListener('timeupdate', function(){
		var juicePos = video.currentTime / video.duration;
		juice.style.width = juicePos * 100 + "%";
		if (video.ended){
			btn.className = 'play';
		}
	})
})