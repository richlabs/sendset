////////////////////////////////////////////////////////////
// SCORE
////////////////////////////////////////////////////////////

/*!
 * 
 * SCOREBOARD SETTING CUSTOMIZATION START
 * 
 */
var displayScoreBoard = false; //toggle submit and scoreboard button
var scoreBoardTitle = 'TOP 10 Scoreboard'; //text for scoreboard title
var scoreRank_arr = ['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th']; //scoreboard ranking list

var submitTitle = 'Submit your score'; //text for submit title

var score_arr = [{col:'RANK', percent:8, align:'center'},
				{col:'NAME', percent:42, align:'left'},
				{col:'CATEGORY', percent:20, align:'center'},
				{col:'SCORE', percent:30, align:'center'}];

/*!
 * 
 * SCOREBOARD SETTING CUSTOMIZATION END
 * 
 */
 
$.scoreList={};

function buildScoreboard(){
	$('.fontScoreTitle').html(scoreBoardTitle);
	$('.fontSubmitTitle').html(submitTitle);
	
	$('#buttonSave').click(function(){
		goScorePage('submit');
	});
	
	$('#buttonScore').click(function(){
		goScorePage('scoreboard');
	});
	
	$('#buttonBack').click(function(){
		goScorePage('');
	});
	
	$('#buttonSubmit').click(function(){
		if(categoryPage){
			submitUserScore(gameData.category_arr[gameData.categoryNum], playerData.score);
		}else{
			submitUserScore('', playerData.score);	
		}
	});
	
	$('#buttonCancelSubmit').click(function(){
		goScorePage('');
	});
	
	for(var n=0;n<11;n++){
		var scoreHTML = '<li class="ignorePadding">';
		for(var s=0;s<score_arr.length;s++){
			if(n == 0){
				scoreHTML += '<div class="list fontScoreList resizeFont" style="width:'+score_arr[s].percent+'%; text-align:\''+score_arr[s].align+'\';">'+score_arr[s].col+'</div>';
			}else{
				var rankText = '';
				if(s==0){
					rankText = scoreRank_arr[n-1];
				}
				scoreHTML += '<div class="list fontScoreList resizeFont" style="width:'+score_arr[s].percent+'%; text-align:\''+score_arr[s].align+'\';">'+rankText+'</div>';	
			}
		}
		scoreHTML += '<div style="clear:both;"></div></li>';
		$('ul.scoreList').append(scoreHTML);	
	}
}

/*!
 * 
 * TOGGLE SUBMIT SCORE BUTTON - This is the function that runs to display submit score button
 * 
 */
function toggleSaveButton(con){
	if(!displayScoreBoard){
		return;
	}else{
		$('.resultContent .option').removeClass('singleOption');
	}
	
	if(con){
		$('.resultContent .option').removeClass('NoSaveOption');
	}else{
		$('.resultContent .option').addClass('NoSaveOption');
	}
}

/*!
 * 
 * DISPLAY TOP 10 SCOREBOARD - This is the function that runs to display top ten scoreboard
 * 
 */

function goScorePage(page){
	var targetContainer;
	$('.resultExtra').show();
	$('.scoreContent').hide();
	$('.submitContent').hide();
	
	switch(page){
		case 'submit':
			targetContainer = $('.submitContent');
		break;
		
		case 'scoreboard':
			targetContainer = $('.scoreContent');
			if(categoryPage){
				loadScoreboard(gameData.category_arr[gameData.categoryNum]);
			}else{
				loadScoreboard('');	
			}
		break;
		
		case '':
			targetContainer = null
			$('.resultExtra').hide();
		break;
	}
	
	if(targetContainer != null){
		targetContainer.show();
	}
}

function submitUserScore(type, score){
	var errorCon = false;
	var errorMessage = 'Submission error:';
	
	if($('#uName').val().length == 0){
		errorCon = true;
		errorMessage += '\n*Please enter your name';
	}
	
	if($('#uEmail').val().length == 0){
		errorCon = true;
		errorMessage += '\n*Please enter your email';
	}
	
	if(!validateEmail($('#uEmail').val())){
		errorCon = true;
		errorMessage += '\n*Please enter a valite email';
	}
	
	if(errorCon){
		alert(errorMessage);	
	}else{
		//proceed	
		$.ajax({
		  type: "POST",
		  url: 'addScoreUnique.php',
		  data: { name: $('#uName').val(), email: $('#uEmail').val(), type: type, score: score },
		  success: submitScoreSuccess,
		  dataType  : 'json'
		});
	}
}

function submitScoreSuccess(data){
	if(data.status == true){
		toggleSaveButton(false);
		goScorePage('');
	}else{
		alert('Submission error, please try again.')	
	}
}

function validateEmail($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test( $email );
}

function loadScoreboard(type){
	$.ajax({
	  type: "POST",
	  url: 'topRank.php',
	  data: { type: type},
	  success: loadScoreboardSuccess,
	  dataType  : 'json'
	});	
}

function loadScoreboardSuccess(data){
	if(data.status == true){
		var scoreList = data.datas;
		
		if(scoreList.length>0){
			for(var i=0; i<scoreList.length; i++){
				if(typeof scoreList[i] != "undefined"){
					$('ul.scoreList li').eq(i+1).find('div').eq(0).html(scoreRank_arr[i]);
					$('ul.scoreList li').eq(i+1).find('div').eq(1).html(scoreList[i].name);
					$('ul.scoreList li').eq(i+1).find('div').eq(2).html(scoreList[i].type);
					$('ul.scoreList li').eq(i+1).find('div').eq(3).html(scoreList[i].score);
				}
			}
		}
	}
}