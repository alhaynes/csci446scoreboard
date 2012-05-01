var guessesLeft = 10;
var highScores = new Array([3, "ZedCthulhu"], [9, "HarryJamesPotter"], [2, "NearlyDied"]);

// Generate a random number
var randomNumber = Math.floor(Math.random()*101)


// Make the statment for toohigh/toolow
$("#toolow").hide();
$("#toohigh").hide();
$("#youWin").hide();
$("#youLose").hide();

$("#btnGuess").click(function() {
	if($("#guess").val() > 100 || $("#guess").val() < 0){
		alert("If you want to win, I suggest only guessing between 0 and 100");
	} else {
		if($("#guess").val() == randomNumber){
			$("#youWin").show();
			var name = prompt("Enter your name: ");
			//highScores.push([guessesLeft, name]);
			
			  $.ajax({
				url: '/scores/',
				type: 'POST',
				dataType: 'json',
				data:{
					score:{
						name: name,
						score: guessesLeft
						}
					},
				success: function(scores) {
					populateHighScores(highScores);
					if(confirm("YOU WIN!! Play again if you dare")){
						newGame();
						}
					}
				});
		} else {
			guessesLeft = guessesLeft - 1;
			if(guessesLeft == 0){
				$("youLose").show();
				if(confirm("YOU LOST - Play again for your life depends on it!")){
					newGame();
				}
			}
			updateScore(guessesLeft);
			if($("#guess").val() < randomNumber){
				$("#toolow").show();
				$("#toolow").fadeOut(2000);
			} else if($("#guess").val() > randomNumber){
				$("#toohigh").show();
				$("#toohigh").fadeOut(2000);
			} 
		}
	}
});

$(function() {
  updateScore(guessesLeft);
  populateHighScores(highScores);
});

function populateHighScores(scores) {
	/*scores.sort(function(a,b) { return a[0] < b[0]; }); 
	$('div#highScores').html("");
  for (var i = 0; i < scores.length; ++i) {
    $('div#highScores').append("<p>" + scores[i][0] + " " + scores[i][1] + "</p>");
  }*/
  $.ajax({
	url: '/scores/',
	dataType: 'json',
	success: function(scores) {
		$('div#highScores').html("");
		for (var i = 0; i < scores.length; ++i) {
			$('div#highScores').append("<p>" + scores[i].name + " " + scores[i].score + "</p>");
		}
	}
  });
}

function updateScore(score) {
  $('h2#score span#guessesLeft').html(score);
}

function newGame(){
	$("#youWin").hide();
	$("#youLose").hide();
	randomNumber = Math.floor(Math.random()*101);
	guessesLeft = 10;
	updateScore(guessesLeft);
}
	
