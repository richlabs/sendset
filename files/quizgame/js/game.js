////////////////////////////////////////////////////////////
// GAME
////////////////////////////////////////////////////////////

/*!
 * 
 * GAME SETTING CUSTOMIZATION START
 * 
 */

var stageW=1200; //game width
var stageH=650; //game height
var portraitW=380; //game portrait width
var portraitH=600; //game portrait height
var fitToScreen = true; //fit to browser screen
var maintainAspectRatio = true; //maintain aspect ratio

var loaderText = 'Loading question...'; //game loading text

var categoryPage = true; //show/hide category select page
var categoryAllOption = true; //add ALL category select option
var categoryAllText = 'All'; //text for all category select option

var questionTotalDisplay = '[NUMBER]/[TOTAL]:'; //current question and total question display
var totalQuestions = 0; //set 0 for all questions, set more than 0 to limit questions

var enableRandomQuestion = true; //enable question in random sequence
var enableRandomAnswer = true; //enable answer in random sequence
var enableRevealAnswer = true; //enable reveal answer
var enableExplanation = true; //enable show explanation

var enableCountdownTimer = true; //enable countdown timer
var coundownTimer = 25; //countdown timer

//question property
var questionFontSize = 50;
var questionLineHeight = 50;
var questionColor = '#fff';
var questionTop = 25;
var questionLeft = 5;
var questionWidth = 90;
var questionHeight = 30;
var questionAlign = 'center';

//video property
var videoTop = 15;
var videoLeft = 30;
var videoWidth = 40;
var videoHeight = 41;
var videoAutoplay = true;
var videoControls = true;

//answers property
var answerFontSize = 40;
var answerLineHeight = 40;
var answerColor = '#fff';
var answerAlign = 'center';
var answerWidth = 30;
var answerHeight = 14;
var answerOffsetTop = -15;

var answerListsEnable = true; //enable answer list style
var answerLists = ['a) ','b) ','c) ','d) ','e) ','f) ','g) ','h) ']; //answer list style formatn, maximum 8
var answerAnimationEnable = true; //enable answer animation

var answerButtonBgEnable = true; //toggle answer button background
var answerButtonBgRoundNumber = 15; //answer button background round corner number
var answerButtonBgColour = '#a2cd4a'; //answer button background colour
var answerButtonBgShadowColour = '#6fad4e'; //answer button background shadow colour
var answeredButtonBgColour = '#f89a31'; //answered button background colour
var answeredButtonBgShadowColour = '#dc4832'; //answered button background shadow colour
var wrongButtonBgColour = '#989898'; //answered button background colour
var wrongButtonBgShadowColour = '#666'; //answered button background shadow colour

var audioQuestionDelay = 300; //timer delay to play question audio
var audioAnswerDelay = 100; //timer delay to play answer audio

//inputs property
var inputFontSize = 40;
var inputLineHeight = 40;
var inputColor = '#333';
var inputBackground = '#fff';
var inputAlign = 'center';
var inputWidth = 20;
var inputHeight = 10;
var inputTop = 50;
var inputLeft = 40;
var inputOffsetTop = -15;

//correct or wrong property
var correctDisplayText = 'That\'s Correct!';
var wrongDisplayText = 'Incorrect!';
var quesResultFontSize = 50;
var quesResultLineHeight = 50;
var quesResultColor = '#fff';
var quesResultTop = 30;
var quesResultLeft = 5;
var quesResultWidth = 90;
var quesResultHeight = 30;
var quesResultAlign = 'center';

//explanation property
var explanationFontSize = 35;
var explanationLineHeight = 35;
var explanationColor = '#ccc';
var explanationTop = 45;
var explanationLeft = 5;
var explanationWidth = 90;
var explanationHeight = 10;
var explanationAlign = 'center';

//result
var scoreDisplayText = 'You score : [NUMBER]!'; //score result display text

//Social share, [SCORE] will replace with game score
var shareEnable = true; //toggle share
var shareTitle = 'Highscore on Quiz Game 2 Game is [SCORE]pts';//social share score title
var shareMessage = '[SCORE] is mine new highscore on Quiz Game 2 Game! Try it now!'; //social share score message

/*!
 *
 * GAME SETTING CUSTOMIZATION END
 *
 */
$.editor = {enable:false};
var playerData = {score:0, answered:false, answerType:'', answer_arr:[]};
var gameData = {page:'', questionNum:0, sequenceNum:0, categoryNum:0, category_arr:[], categoryThumb_arr:[], sequence_arr:[], targetArray:null, targetAnswerSequence:null, mode:'landscape', oldMode:'landscape', build:false};

var quesLandscape_arr = [];
var quesPortrait_arr = [];
var quesLandscapeSequence_arr = [];
var quesPortraitSequence_arr = [];
var categoryData = {page:1, total:0, thumb:16, max:3};

var audioLandscape_arr = [];
var audioPortrait_arr = [];
var audioData = {audioNum:0, audioInterval:null};

var timeData = {enable:false, startDate:null, nowDate:null, timer:0};

/*!
 * 
 * GAME BUTTONS - This is the function that runs to setup button event
 * 
 */
function buildGameButton(){
	$('#buttonStart').click(function() {
		playSound('soundClick');
        if(categoryPage){
			goPage('category');
		}else{
        	goPage('game');
		}
    });
	
	$('#buttonNextCat').click(function() {
		playSound('soundClick');
		toggleCategory(true);
    });
	
	$('#buttonPrevCat').click(function() {
		playSound('soundClick');
		toggleCategory(false);
    });
	
	$('#buttonOk').click(function() {
		playSound('soundClick');
		toggleConfirm(false);
		goPage('main');
    });
	
	$('#buttonCancel').click(function() {
		playSound('soundClick');
		toggleConfirm(false);
    });
	
	$('#buttonNextQues').click(function() {
		playSound('soundClick');
		prepareNextQuestion();
    });
	
	$('#buttonPreviewQues').click(function() {
		playSound('soundClick');
		previewQuestion();
    });
	
	$('#buttonReplay').click(function() {
		playSound('soundClick');
		if(categoryPage){
			goPage('category');
		}else{
        	goPage('game');
		}
    });
	
	$('#buttonFacebook').click(function() {
        share('facebook');
    });
	
	$('#buttonTwitter').click(function() {
        share('twitter');
    });
	
	$('#buttonGoogle').click(function() {
        share('google');
    });
	
	$('#buttonOption').click(function() {
		playSound('soundClick');
        toggleGameOption();
    });
	
	$('#buttonSound').click(function() {
		playSound('soundClick');
        toggleGameMute();
    });
	
	$('#buttonFullscreen').click(function() {
		playSound('soundClick');
        toggleFullScreen();
    });
	
	$('#buttonExit').click(function() {
		playSound('soundClick');
		toggleGameOption();
        toggleConfirm(true);
    });
	
	$(window).focus(function() {
        //resizeGameDetail();
    });
}

/*!
 * 
 * GAME STYLE - This is the function that runs to build game style
 * 
 */
function buildGameStyle(){
	$('.preloadText').html(loaderText);
	
	$('.questionResultText').html(correctDisplayText);
	$('.questionResultText').css('font-size', quesResultFontSize+'px');
	$('.questionResultText').css('line-height', quesResultLineHeight+'px');
	
	$('.questionResultText').attr('data-fontSize', quesResultFontSize);
	$('.questionResultText').attr('data-lineHeight', quesResultLineHeight);
	$('.questionResultText').css('color', quesResultColor);
	
	$('.questionResultText').css('top', quesResultTop+'%');
	$('.questionResultText').css('left', quesResultLeft+'%');
	
	$('.questionResultText').css('width', quesResultWidth+'%');
	$('.questionResultText').css('height', quesResultHeight+'%');
	$('.questionResultText').css('text-align', quesResultAlign);
	
	if(!enableCountdownTimer){
		$('.gameTimer').hide();	
	}
	
	toggleConfirm(false);
}


/*!
 * 
 * DISPLAY PAGES - This is the function that runs to display pages
 * 
 */
function goPage(page){
	gameData.page = page;
	$('#logoHolder').hide();
	$('#categoryHolder').hide();
	$('#gameHolder').hide();
	$('#resultHolder').hide();
	$('#buttonExit').show();
	
	var targetContainer = ''
	switch(page){
		case 'main':
			targetContainer = $('#logoHolder');
			$('#buttonExit').hide();
		break;
		
		case 'category':
			targetContainer = $('#categoryHolder');
		break;
		
		case 'game':
			targetContainer = $('#gameHolder');
			startGame();
		break;
		
		case 'result':
			targetContainer = $('#resultHolder');
			if(!shareEnable){
				$('#shareOption').hide();	
			}
			
			$('#resultScore').html(scoreDisplayText.replace('[NUMBER]', playerData.score));
			playSound('soundResult');
			stopGame();
			saveGame(playerData.score, gameData.category_arr[gameData.categoryNum]);
			
			goScorePage('');
			toggleSaveButton(true);
		break;
	}
	
	targetContainer.show();
	TweenMax.to(targetContainer, 0, {opacity:0, overwrite:true});
	TweenMax.to(targetContainer, 1, {opacity:1, overwrite:true});
	resizeGameDetail();
}

/*!
 * 
 * BUILD CATEGORY - This is the function that runs to build category page
 * 
 */
function buildCategory(){
	categoryData.thumb = gameData.category_arr.length;
	resetCategory();
	
	$('#categoryList').empty();
	for(var c=0; c<categoryData.thumb; c++){
		var thumbSrc = 'assets/item_thumb.png';
		if(gameData.categoryThumb_arr.length > 0){
			for(var t=0; t<gameData.categoryThumb_arr.length; t++){
				if(gameData.category_arr[c] == gameData.categoryThumb_arr[t].name){
					thumbSrc = 	gameData.categoryThumb_arr[t].src;
				}
			}
		}
		var categoryHTML = '<li class="categoryThumb buttonClick"><div><img src="'+thumbSrc+'" /></div><div class="categoryTitle fontCategory resizeFont"  data-fontSize="30" data-lineHeight="30">'+gameData.category_arr[c]+'</div></li>';
		$('#categoryList').append(categoryHTML);	
	}
	
	$('.categoryThumb').click(function(){
		playSound('soundClick');
		gameData.categoryNum = $(this).index();
		goPage('game');
	});
	
	displayCategory();
}

function resetCategory(){
	if(gameData.mode == 'portrait'){
		categoryData.max = 4;
	}else{
		categoryData.max = 3;
	}
	
	categoryData.total = categoryData.thumb/categoryData.max;
	if (String(categoryData.total).indexOf('.') > -1){
		categoryData.total=Math.floor(categoryData.total)+1;
	}
	
	displayCategory();
}

function toggleCategory(con){
	if(con){
		categoryData.page++;
		categoryData.page = categoryData.page > categoryData.total ? categoryData.total : categoryData.page;
	}else{
		categoryData.page--;
		categoryData.page = categoryData.page < 1 ? 1 : categoryData.page;
	}
	displayCategory();	
}

function displayCategory(){
	var startPageNum = (categoryData.page-1) * categoryData.max;
	var endPageNum = startPageNum + categoryData.max;
	$('#categoryList li').hide();
	$('#categoryList li').each(function(index, element) {
        if(index >= startPageNum && index < endPageNum){
			$(this).show();
		}
    });
}

/*!
 * 
 * FILTER CATEGORY - This is the function that runs to filter category
 * 
 */
function filterCategoryQuestion(){
	gameData.sequence_arr = [];
	for(n=0;n<gameData.targetArray.length;n++){
		gameData.sequence_arr.push(n);
	}
	
	if($.editor.enable){
		return;
	}
	
	//do nothing if category page is off
	if(!categoryPage){
		return;
	}
	
	//do nothing if category all is selected
	if(categoryAllOption && gameData.category_arr[gameData.categoryNum] == categoryAllText){
		return;
	}
	
	//filter the category
	gameData.sequence_arr = [];
	for(n=0;n<gameData.targetArray.length;n++){
		if(gameData.category_arr[gameData.categoryNum] == gameData.targetArray[n].category){
			gameData.sequence_arr.push(n);
		}
	}
}

/*!
 * 
 * START GAME - This is the function that runs to start play game
 * 
 */
function startGame(){
	gameData.questionNum = 0;
	gameData.sequenceNum = 0;
	playerData.score = 0;
	$('#gameStatus .gameQuestionStatus').html('');
	toggleResult(true);
	
	filterCategoryQuestion();
	if(enableRandomQuestion && !$.editor.enable){
		shuffle(gameData.sequence_arr);	
	}
	loadQuestion();
}

 /*!
 * 
 * STOP GAME - This is the function that runs to stop play game
 * 
 */
function stopGame(){
	TweenMax.killAll(false, true, false);
	$('.questionHolder').remove();
}

function saveGame(score, type){
	
	
	/*$.ajax({
      type: "POST",
      url: 'saveResults.php',
      data: {score:score},
      success: function (result) {
          console.log(result);
      }
    });*/
}

/*!
 * 
 * LOAD QUESTION - This is the function that runs to load new question
 * 
 */
function loadQuestion(){
	$('#questionHolder').show();
	$('#questionResultHolder').hide();
	
	toggleQuestionLoader(true);
	resetQuestion();
	fileFest=[];
	audioLandscape_arr=[];
	audioPortrait_arr=[];
	gameData.build = false;
	playerData.answered = false;
	gameData.sequenceNum = gameData.sequence_arr[gameData.questionNum];
	
	//landscape
	var thisMode = 'landscape';
	if(quesLandscape_arr[gameData.sequenceNum].type == 'image'){
		fileFest.push({src:quesLandscape_arr[gameData.sequenceNum].question, id:thisMode+'questionImage'})
	}
	
	var questionAudio = quesLandscape_arr[gameData.sequenceNum].audio;
	questionAudio = questionAudio == undefined ? '' : questionAudio;
	
	if(questionAudio != ''){
		audioLandscape_arr.push({type:'question', id:thisMode+'questionAudio', list:0});
		fileFest.push({src:quesLandscape_arr[gameData.sequenceNum].audio, id:thisMode+'questionAudio'})
	}
	
	var randomAnswerLayout = false;
	quesLandscapeSequence_arr = [];
	var submitLandscapeButton = -1;
	for(n=0;n<quesLandscape_arr[gameData.sequenceNum].answer.length;n++){
		if(quesLandscape_arr[gameData.sequenceNum].answer[n].submit == 'false' || quesLandscape_arr[gameData.sequenceNum].answer[n].submit == undefined){
			quesLandscapeSequence_arr.push(n);
		}else{
			submitLandscapeButton = n;
		}
	}
	
	quesPortraitSequence_arr = [];
	var submitPortraitButton = -1;
	for(n=0;n<quesPortrait_arr[gameData.sequenceNum].answer.length;n++){
		if(quesPortrait_arr[gameData.sequenceNum].answer[n].submit == 'false' || quesPortrait_arr[gameData.sequenceNum].answer[n].submit == undefined){
			quesPortraitSequence_arr.push(n);
		}else{
			submitPortraitButton = n;
		}
	}
	
	if(enableRandomAnswer && !$.editor.enable){
		randomAnswerLayout = true;
	}
	
	if(randomAnswerLayout){
		shuffle(quesLandscapeSequence_arr);
		shuffle(quesPortraitSequence_arr);
	}
	if(submitLandscapeButton != -1){
		quesLandscapeSequence_arr.push(submitLandscapeButton);
	}
	if(submitPortraitButton != -1){
		quesPortraitSequence_arr.push(submitPortraitButton);
	}
	
	for(var n=0;n<quesLandscape_arr[gameData.sequenceNum].answer.length;n++){
		if(quesLandscape_arr[gameData.sequenceNum].answer[n].type == 'image'){
			fileFest.push({src:quesLandscape_arr[gameData.sequenceNum].answer[n].text, id:thisMode+'answerImage'+n})
		}
		
		var answerNum = quesLandscapeSequence_arr[n];
		var answerAudio = quesLandscape_arr[gameData.sequenceNum].answer[answerNum].audio;
		answerAudio = answerAudio == undefined ? '' : answerAudio;
		if(answerAudio != ''){
			audioLandscape_arr.push({type:'answer', id:thisMode+'answerAudio'+answerNum, list:n});
			fileFest.push({src:quesLandscape_arr[gameData.sequenceNum].answer[answerNum].audio, id:thisMode+'answerAudio'+answerNum})
		}
	}
	
	for(var n=0;n<quesLandscape_arr[gameData.sequenceNum].input.length;n++){
		if(quesLandscape_arr[gameData.sequenceNum].input[n].type == 'image'){
			fileFest.push({src:quesLandscape_arr[gameData.sequenceNum].input[n].text, id:thisMode+'inputImage'+n})
		}
	}
	
	if(quesLandscape_arr[gameData.sequenceNum].explanationType == 'image'){
		fileFest.push({src:quesLandscape_arr[gameData.sequenceNum].explanation, id:thisMode+'explanationImage'})
	}
	
	var explanationAudio = quesLandscape_arr[gameData.sequenceNum].explanationAudio;
	explanationAudio = explanationAudio == undefined ? '' : explanationAudio;
	
	if(explanationAudio != ''){
		audioLandscape_arr.push({type:'explanation', id:thisMode+'explanationAudio', list:0});
		fileFest.push({src:quesLandscape_arr[gameData.sequenceNum].explanationAudio, id:thisMode+'explanationAudio'})
	}
	
	//portrait
	var thisMode = 'portrait';
	if(quesPortrait_arr[gameData.sequenceNum].type == 'image'){
		fileFest.push({src:quesPortrait_arr[gameData.sequenceNum].question, id:thisMode+'questionImage'})
	}
	
	var questionAudio = quesPortrait_arr[gameData.sequenceNum].audio;
	questionAudio = questionAudio == undefined ? '' : questionAudio;
	
	if(questionAudio != ''){
		audioPortrait_arr.push({type:'question', id:thisMode+'questionAudio', list:0});
		fileFest.push({src:quesPortrait_arr[gameData.sequenceNum].audio, id:thisMode+'questionAudio'})
	}
	
	for(var n=0;n<quesPortrait_arr[gameData.sequenceNum].answer.length;n++){
		if(quesPortrait_arr[gameData.sequenceNum].answer[n].type == 'image'){
			fileFest.push({src:quesPortrait_arr[gameData.sequenceNum].answer[n].text, id:thisMode+'answerImage'+n})
		}
		
		var answerNum = quesPortraitSequence_arr[n];
		var answerAudio = quesPortrait_arr[gameData.sequenceNum].answer[answerNum].audio;
		answerAudio = answerAudio == undefined ? '' : answerAudio;
		if(answerAudio != ''){
			audioPortrait_arr.push({type:'answer', id:thisMode+'answerAudio'+answerNum, list:n});
			fileFest.push({src:quesPortrait_arr[gameData.sequenceNum].answer[answerNum].audio, id:thisMode+'answerAudio'+answerNum})
		}
	}
	
	for(var n=0;n<quesPortrait_arr[gameData.sequenceNum].input.length;n++){
		if(quesPortrait_arr[gameData.sequenceNum].input[n].type == 'image'){
			fileFest.push({src:quesPortrait_arr[gameData.sequenceNum].input[n].text, id:thisMode+'inputImage'+n})
		}
	}
	
	if(quesPortrait_arr[gameData.sequenceNum].explanationType == 'image'){
		fileFest.push({src:quesPortrait_arr[gameData.sequenceNum].explanation, id:thisMode+'explanationImage'})
	}
	
	var explanationAudio = quesPortrait_arr[gameData.sequenceNum].explanationAudio;
	explanationAudio = explanationAudio == undefined ? '' : explanationAudio;
	
	if(explanationAudio != ''){
		audioPortrait_arr.push({type:'explanation', id:thisMode+'explanationAudio', list:0});
		fileFest.push({src:quesPortrait_arr[gameData.sequenceNum].explanationAudio, id:thisMode+'explanationAudio'});
	}
	
	if(fileFest.length > 0){
		loadQuestionAssets();	
	}else{
		buildQuestion();
	}
}

/*!
 * 
 * BUILD QUESTION - This is the function that runs to build question
 * 
 */
function buildQuestion(){
	toggleQuestionLoader(false);
	stopAudio();
	toggleAudioInterval(false);
	audioData.audioNum = 0;
	resetQuestion();
	
	if(gameData.mode == 'landscape'){
		gameData.targetArray = quesLandscape_arr;
		gameData.targetAnswerSequence = quesLandscapeSequence_arr;
		gameData.targetAudio = audioLandscape_arr;
	}else{
		gameData.targetArray = quesPortrait_arr;
		gameData.targetAnswerSequence = quesPortraitSequence_arr;
		gameData.targetAudio = audioPortrait_arr;	
	}
	
	//total display
	var curQuestionText = questionTotalDisplay.replace('[NUMBER]', (gameData.questionNum+1));
	if(totalQuestions != 0){
		var totalMax = totalQuestions > gameData.sequence_arr.length ? gameData.sequence_arr.length : totalQuestions;
		curQuestionText = curQuestionText.replace('[TOTAL]', totalMax);
	}else{	
		curQuestionText = curQuestionText.replace('[TOTAL]', gameData.sequence_arr.length);
	}
	$('#gameStatus .gameQuestionStatus').html(curQuestionText);
	
	//questions
	var value = getArrayValue('question');
	if(value.type == 'image'){
		var questionHTML = '<div class="question fontQuestion fitImg" style="top:'+value.top+'%; left:'+value.left+'%; width:'+value.width+'%; "><img src="'+gameData.targetArray[gameData.sequenceNum].question+'" /></div>';
		
	}else{
		var questionHTML = '<div class="question fontQuestion resizeFont" data-fontSize="'+value.fontSize+'" data-lineHeight="'+value.lineHeight+'" style="font-size:'+value.fontSize+'px; line-height:'+value.lineHeight+'px; color:'+value.color+';  text-align:'+value.align+'; top:'+value.top+'%; left:'+value.left+'%; width:'+value.width+'%; height:'+value.height+'%; ">'+gameData.targetArray[gameData.sequenceNum].question+'</div>';
	}
	$('#questionHolder').append(questionHTML);
	
	buildAnswers();
	buildInputs();
	buildVideo();
	buildExplanation();
	gameData.build = true;
	resizeGameDetail();
	
	if(playerData.answered){
		presetAnswered();
		return;	
	}
	
	if(gameData.targetAudio.length == 0){
		initAnimateAnswers();
	}else if(gameData.targetAudio.length == 1 && gameData.targetAudio[0].type == 'question'){
		initAnimateAnswers();	
	}
	
	if($.editor.enable){
		if(edit.con == 'explanation'){
			$('#questionResultHolder').show();
			$('#questionHolder').hide();
			playerData.answered = true;
			playAudioLoop('explanation');
			$('#explanationHolder').show();	
		}
	}
	
	if($.editor.enable && !edit.replay){
		return;	
	}
	
	$('#questionHolder').css('opacity', 0);
	TweenMax.to($('#questionHolder'), .5, {alpha:1, overwrite:true, onComplete:function(){
		if(gameData.targetAudio.length > 0){
			playAudioLoop();
		}
	}});
	
	toggleGameTimer(true);
}

function resetQuestion(){
	$('#questionHolder').empty();	
	$('#explanationHolder').empty();
}

/*!
 * 
 * GET ARRAY VALUE - This is the function that runs to get array value
 * 
 */
function getArrayValue(type, answerNum, n){
	var value = {type:'', submit:'', text:'', top:'', left:'', width:'', height:'', fontSize:'', lineHeight:'', color:'', background:'', align:'', correctAnswer:''};
	
	if(type == 'question'){
		value.type = gameData.targetArray[gameData.sequenceNum].type;
		value.top = !checkValue(gameData.targetArray[gameData.sequenceNum].top) ? questionTop : gameData.targetArray[gameData.sequenceNum].top;
		value.left = !checkValue(gameData.targetArray[gameData.sequenceNum].left) ? questionLeft : gameData.targetArray[gameData.sequenceNum].left;
		value.width = !checkValue(gameData.targetArray[gameData.sequenceNum].width) ? questionWidth : gameData.targetArray[gameData.sequenceNum].width;
		value.height = !checkValue(gameData.targetArray[gameData.sequenceNum].height) ? questionHeight : gameData.targetArray[gameData.sequenceNum].height;
		value.fontSize = !checkValue(gameData.targetArray[gameData.sequenceNum].fontSize) ? questionFontSize : gameData.targetArray[gameData.sequenceNum].fontSize;
		value.lineHeight = !checkValue(gameData.targetArray[gameData.sequenceNum].lineHeight) ? questionLineHeight : gameData.targetArray[gameData.sequenceNum].lineHeight;
		value.color = !checkValue(gameData.targetArray[gameData.sequenceNum].color) ? questionColor : gameData.targetArray[gameData.sequenceNum].color;
		value.align = !checkValue(gameData.targetArray[gameData.sequenceNum].align) ? questionAlign : gameData.targetArray[gameData.sequenceNum].align;
	}else if(type == 'video'){
		value.type = gameData.targetArray[gameData.sequenceNum].videos[answerNum].type;
		value.top = !checkValue(gameData.targetArray[gameData.sequenceNum].videos[answerNum].top) ? videoTop : gameData.targetArray[gameData.sequenceNum].videos[answerNum].top;
		value.left = !checkValue(gameData.targetArray[gameData.sequenceNum].videos[answerNum].left) ? videoLeft : gameData.targetArray[gameData.sequenceNum].videos[answerNum].left;
		value.width = !checkValue(gameData.targetArray[gameData.sequenceNum].videos[answerNum].width) ? videoWidth : gameData.targetArray[gameData.sequenceNum].videos[answerNum].width;
		value.height = !checkValue(gameData.targetArray[gameData.sequenceNum].videos[answerNum].height) ? videoHeight : gameData.targetArray[gameData.sequenceNum].videos[answerNum].height;
		value.autoplay = !checkValue(gameData.targetArray[gameData.sequenceNum].videos[answerNum].autoplay) ? videoAutoplay : gameData.targetArray[gameData.sequenceNum].videos[answerNum].autoplay;
		value.controls = !checkValue(gameData.targetArray[gameData.sequenceNum].videos[answerNum].controls) ? videoControls : gameData.targetArray[gameData.sequenceNum].videos[answerNum].controls;
	}else if(type == 'answer'){
		value.submit = gameData.targetArray[gameData.sequenceNum].answer[answerNum].submit;
		value.type = gameData.targetArray[gameData.sequenceNum].answer[answerNum].type;
		value.text = gameData.targetArray[gameData.sequenceNum].answer[answerNum].text;	
		value.top = !checkValue(gameData.targetArray[gameData.sequenceNum].answer[n].top) ? questionTop : gameData.targetArray[gameData.sequenceNum].answer[n].top;
		value.left = !checkValue(gameData.targetArray[gameData.sequenceNum].answer[n].left) ? questionLeft : gameData.targetArray[gameData.sequenceNum].answer[n].left;
		value.width = !checkValue(gameData.targetArray[gameData.sequenceNum].answer[n].width) ? answerWidth : gameData.targetArray[gameData.sequenceNum].answer[n].width;
		value.height = !checkValue(gameData.targetArray[gameData.sequenceNum].answer[n].height) ? answerHeight : gameData.targetArray[gameData.sequenceNum].answer[n].height;
		value.fontSize = !checkValue(gameData.targetArray[gameData.sequenceNum].answer[n].fontSize) ? answerFontSize : gameData.targetArray[gameData.sequenceNum].answer[n].fontSize;
		value.lineHeight = !checkValue(gameData.targetArray[gameData.sequenceNum].answer[n].lineHeight) ? answerLineHeight : gameData.targetArray[gameData.sequenceNum].answer[n].lineHeight;
		value.color = !checkValue(gameData.targetArray[gameData.sequenceNum].answer[n].color) ? answerColor : gameData.targetArray[gameData.sequenceNum].answer[n].color;
		value.align = !checkValue(gameData.targetArray[gameData.sequenceNum].answer[n].align) ? answerAlign : gameData.targetArray[gameData.sequenceNum].answer[n].align;
		value.offsetTop = !checkValue(gameData.targetArray[gameData.sequenceNum].answer[n].offsetTop) ? answerOffsetTop : gameData.targetArray[gameData.sequenceNum].answer[n].offsetTop;	
	}else if(type == 'input'){
		value.type = gameData.targetArray[gameData.sequenceNum].input[answerNum].type;
		value.submit = gameData.targetArray[gameData.sequenceNum].input[answerNum].submit;
		value.correctAnswer = gameData.targetArray[gameData.sequenceNum].input[answerNum].correctAnswer;
		value.top = !checkValue(gameData.targetArray[gameData.sequenceNum].input[answerNum].top) ? inputTop : gameData.targetArray[gameData.sequenceNum].input[answerNum].top;
		value.left = !checkValue(gameData.targetArray[gameData.sequenceNum].input[answerNum].left) ? inputLeft : gameData.targetArray[gameData.sequenceNum].input[answerNum].left;
		value.width = !checkValue(gameData.targetArray[gameData.sequenceNum].input[answerNum].width) ? inputWidth : gameData.targetArray[gameData.sequenceNum].input[answerNum].width;
		value.height = !checkValue(gameData.targetArray[gameData.sequenceNum].input[answerNum].height) ? inputHeight : gameData.targetArray[gameData.sequenceNum].input[answerNum].height;
		value.fontSize = !checkValue(gameData.targetArray[gameData.sequenceNum].input[answerNum].fontSize) ? inputFontSize : gameData.targetArray[gameData.sequenceNum].input[answerNum].fontSize;
		value.lineHeight = !checkValue(gameData.targetArray[gameData.sequenceNum].input[answerNum].lineHeight) ? inputLineHeight : gameData.targetArray[gameData.sequenceNum].input[answerNum].lineHeight;
		value.color = !checkValue(gameData.targetArray[gameData.sequenceNum].input[answerNum].color) ? inputColor : gameData.targetArray[gameData.sequenceNum].input[answerNum].color;
		value.background = !checkValue(gameData.targetArray[gameData.sequenceNum].input[answerNum].background) ? inputBackground : gameData.targetArray[gameData.sequenceNum].input[answerNum].background;
		value.align = !checkValue(gameData.targetArray[gameData.sequenceNum].input[answerNum].align) ? inputAlign : gameData.targetArray[gameData.sequenceNum].input[answerNum].align;
		value.offsetTop = !checkValue(gameData.targetArray[gameData.sequenceNum].input[answerNum].offsetTop) ? inputOffsetTop : gameData.targetArray[gameData.sequenceNum].input[answerNum].offsetTop;	
	}else if(type == 'explanation'){
		value.type = gameData.targetArray[gameData.sequenceNum].explanationType;
		value.top = !checkValue(gameData.targetArray[gameData.sequenceNum].explanationTop) ? explanationTop : gameData.targetArray[gameData.sequenceNum].explanationTop;
		value.left = !checkValue(gameData.targetArray[gameData.sequenceNum].explanationLeft) ? explanationLeft : gameData.targetArray[gameData.sequenceNum].explanationLeft;
		value.width = !checkValue(gameData.targetArray[gameData.sequenceNum].explanationWidth) ? explanationWidth : gameData.targetArray[gameData.sequenceNum].explanationWidth;
		value.height = !checkValue(gameData.targetArray[gameData.sequenceNum].explanationHeight) ? explanationHeight : gameData.targetArray[gameData.sequenceNum].explanationHeight;
		value.fontSize = !checkValue(gameData.targetArray[gameData.sequenceNum].explanationFontSize) ? explanationFontSize : gameData.targetArray[gameData.sequenceNum].explanationFontSize;
		value.lineHeight = !checkValue(gameData.targetArray[gameData.sequenceNum].explanationLineHeight) ? explanationLineHeight : gameData.targetArray[gameData.sequenceNum].explanationLineHeight;
		value.color = !checkValue(gameData.targetArray[gameData.sequenceNum].explanationColor) ? explanationColor : gameData.targetArray[gameData.sequenceNum].explanationColor;
		value.align = !checkValue(gameData.targetArray[gameData.sequenceNum].explanationAlign) ? explanationAlign : gameData.targetArray[gameData.sequenceNum].explanationAlign;
	}
		
	return value;	
}

function checkValue(value){
	if(value == undefined || value == ''){
		return false;
	}else{
		return true;
	}
}

/*!
 * 
 * AUDIO - This is the function that runs to play question and answer audio
 * 
 */
function playAudioLoop(con){
	if(gameData.targetAudio.length <= 0){
		return;	
	}
	
	toggleAudioInterval(false);
	if(con == 'explanation'){
		audioData.audioNum = gameData.targetAudio.length-1;
		if(gameData.targetAudio[audioData.audioNum].type == 'explanation' && playerData.answered){
			TweenMax.to(audioData, 1, {overwrite:true, onComplete:function(){
				playAudio(gameData.targetAudio[audioData.audioNum].id);
			}});
		}
	}else{
		if(gameData.targetAudio[audioData.audioNum].type == 'question'){
			playAudio(gameData.targetAudio[audioData.audioNum].id);
		}else if(gameData.targetAudio[audioData.audioNum].type == 'answer'){
			playAudio(gameData.targetAudio[audioData.audioNum].id);
			animateAnswer(gameData.targetAudio[audioData.audioNum].list);
		}
	}
}

function playAudioComplete(){
	audioData.audioNum++;
	if(audioData.audioNum < gameData.targetAudio.length){
		toggleAudioInterval(true);
	}
}

function toggleAudioInterval(con){
	if(con){
		var audioTimer = audioAnswerDelay;
		if(gameData.targetAudio.length > 0 && gameData.targetAudio[audioData.audioNum].type == 'question'){
			audioTimer = audioQuestionDelay	
		}
		audioData.audioInterval = setInterval(function(){
			playAudioLoop();
		}, audioTimer);
	}else{
		TweenMax.killTweensOf(audioData);
		clearInterval(audioData.audioInterval);
		audioData.audioInterval = null;
	}
}

/*!
 * 
 * BUILD VIDEO - This is the function that runs to build video
 * 
 */
function buildVideo(){
	if(gameData.targetArray[gameData.sequenceNum].videos == undefined){
		return;	
	}
	if(gameData.targetArray[gameData.sequenceNum].videos.length <= 0){
		return;
	}
	
	var value = getArrayValue('video', 0);
	var videoProperty = '';
	if(value.autoplay == 'true' || value.autoplay == true){
		videoProperty += ' autoplay';
	}
	if(value.controls == 'true' || value.controls == true){
		videoProperty += ' controls';
	}
	var videoWrapperHTML = '<div id="videoHolder" style="top:'+value.top+'%; left:'+value.left+'%; width:'+value.width+'%; height:'+value.height+'%;">';
	videoWrapperHTML += '<video width="100%" height="100%"'+videoProperty+'>';
	for(var n=0; n<gameData.targetArray[gameData.sequenceNum].videos.length; n++){
		videoWrapperHTML += '<source src="'+gameData.targetArray[gameData.sequenceNum].videos[n].src+'" type="'+gameData.targetArray[gameData.sequenceNum].videos[n].type+'">';
	}
	videoWrapperHTML += 'Your browser does not support the video tag.';
	videoWrapperHTML += '</video>';
	videoWrapperHTML += '</div>';
			
	$('#questionHolder').append(videoWrapperHTML);
}

/*!
 * 
 * BUILD ANSWERS - This is the function that runs to build answers
 * 
 */
function buildAnswers(){
	if(gameData.targetArray[gameData.sequenceNum].answer.length <= 0){
		return;	
	}
	
	var answerHolderHTML = '<div id="answerHolder"></div>'
	$('#questionHolder').append(answerHolderHTML);
	playerData.answerType = 'select';
	
	var answerArray = gameData.targetArray[gameData.sequenceNum].correctAnswer.split(',').map(function(item) {
		return parseInt(item, 10);
	});
	playerData.correctAnswer = [];
	for(n=0;n<gameData.targetArray[gameData.sequenceNum].answer.length;n++){
		var answerNum = gameData.targetAnswerSequence[n];
		if(answerArray.indexOf((answerNum+1)) != -1){
			playerData.correctAnswer.push(n+1);
		}
		
		var value = getArrayValue('answer', answerNum, n);
		if(value.type == 'image'){
			var answerHTML = '<div id="answer'+n+'" class="answer fitImg buttonClick" style="top:'+value.top+'%; left:'+value.left+'%; width:'+value.width+'%; "><img src="'+value.text+'" /></div>';
			$('#answerHolder').append(answerHTML);
		}else{
			var curAnswerList = '';
			if(answerListsEnable){
				curAnswerList = answerLists[n];
			}
			if(value.submit == 'true'){
				curAnswerList = '';
			}
			
			var answerWrapperHTML = "<div id='answer"+n+"' class='answer' style='border-radius: "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px; -moz-border-radius: "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px; -webkit-border-radius: "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px; width:"+value.width+"%; height:"+value.height+"%; top:"+value.top+"%; left:"+value.left+"%;'></div>";
			
			$('#answerHolder').append(answerWrapperHTML);
			
			if(answerButtonBgEnable){
				var backgroundShadowHTML = "<div class='shadow' style='border-radius: "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px; -moz-border-radius: "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px; -webkit-border-radius: "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px; background:"+answerButtonBgShadowColour+"; width:100%; height:100%; position:absolute; top:"+value.offsetTop+"%; left:0;'></div>";
				$('#answer'+n).append(backgroundShadowHTML);
				
				var backgroundHTML = "<div class='background' style='border-radius: "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px; -moz-border-radius: "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px; -webkit-border-radius: "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px; background:"+answerButtonBgColour+"; width:100%; height:85%; position:absolute; top:"+value.offsetTop+"%; left:0;'></div>";
				$('#answer'+n).append(backgroundHTML);
			}
			
			var answerHTML = '<div id="text'+n+'" class="fontAnswer resizeFont" data-fontSize="'+value.fontSize+'" data-lineHeight="'+value.lineHeight+'" style="position:relative; font-size:'+value.fontSize+'px; line-height:'+value.lineHeight+'px; color:'+value.color+';  text-align:'+value.align+';">'+curAnswerList+value.text+'</div>';
			$('#answer'+n).append(answerHTML);
			
			var clickHTML = "<div class='buttonClick' style='position:absolute; border-radius: "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px; -moz-border-radius: "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px; -webkit-border-radius: "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px; width:100%; height:100%; position:absolute; top:"+value.offsetTop+"%;'></div>";
			$('#answer'+n).append(clickHTML);
		}
		
		$('#answer'+n).attr('data-id', n);
		$('#answer'+n).attr('data-type', value.type);
		$('#answer'+n).attr('data-submit', value.submit);
		buildAnswerEvent('#answer'+n);
	}
}

/*!
 * 
 * BUILD INPUTS - This is the function that runs to build inputs
 * 
 */
function buildInputs(){
	if(gameData.targetArray[gameData.sequenceNum].input.length <= 0){
		return;	
	}
	
	var answerHolderHTML = '<div id="inputHolder"></div>'
	$('#questionHolder').append(answerHolderHTML);
	playerData.answerType = 'input';
	
	for(n=0;n<gameData.targetArray[gameData.sequenceNum].input.length;n++){
		var value = getArrayValue('input', n);
		
		if(value.submit == 'true'){
			if(value.type == 'image'){
				var inputHTML = '<div id="input'+n+'" class="input fitImg buttonClick" style="top:'+value.top+'%; left:'+value.left+'%; width:'+value.width+'%; "><img src="'+gameData.targetArray[gameData.sequenceNum].input[n].text+'" /></div>';
				$('#inputHolder').append(answerHTML);
				buildInputEvent('#input'+n);
			}else if(value.type == 'text'){
				var inputWrapperHTML = "<div id='input"+n+"' class='input resizeFont' style='border-radius: "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px; -moz-border-radius: "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px; -webkit-border-radius: "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px; width:"+value.width+"%; height:"+value.height+"%; top:"+value.top+"%; left:"+value.left+"%;'></div>";
				
				$('#inputHolder').append(inputWrapperHTML);
				
				if(answerButtonBgEnable){
					var backgroundShadowHTML = "<div class='shadow' style='border-radius: "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px; -moz-border-radius: "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px; -webkit-border-radius: "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px; background:"+answerButtonBgShadowColour+"; width:100%; height:100%; position:absolute; top:"+value.offsetTop+"%; left:0;'></div>";
					$('#input'+n).append(backgroundShadowHTML);
					
					var backgroundHTML = "<div class='background' style='border-radius: "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px; -moz-border-radius: "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px; -webkit-border-radius: "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px; background:"+answerButtonBgColour+"; width:100%; height:85%; position:absolute; top:"+value.offsetTop+"%; left:0;'></div>";
					$('#input'+n).append(backgroundHTML);
				}
				
				var inputHTML = '<div id="text'+n+'" class="fontAnswer resizeFont" data-fontSize="'+value.fontSize+'" data-lineHeight="'+value.lineHeight+'" style="position:relative; font-size:'+value.fontSize+'px; line-height:'+value.lineHeight+'px; color:'+value.color+'; text-align:'+value.align+';">'+gameData.targetArray[gameData.sequenceNum].input[n].text+'</div>';
				$('#input'+n).append(inputHTML);
				
				var clickHTML = "<div class='buttonClick' style='border-radius: "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px; -moz-border-radius: "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px; -webkit-border-radius: "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px "+answerButtonBgRoundNumber+"px; width:100%; height:100%; position:absolute; top:"+value.offsetTop+"%;'></div>";
				$('#input'+n).append(clickHTML);
				
				buildInputEvent('#input'+n);
			}
		}else{
			if(value.type == 'blank'){
				//input
				var inputWrapperHTML = "<input id='input"+n+"' class='input fontInput' type='text' style='font-size:"+value.fontSize+"px; line-height:"+value.lineHeight+"px; color:"+value.color+"; background:"+value.background+"; text-align:"+value.align+"; width:"+value.width+"%; height:"+value.height+"%; top:"+value.top+"%; left:"+value.left+"%;' placeholder='"+gameData.targetArray[gameData.sequenceNum].input[n].text+"'></input>";
				
				$('#inputHolder').append(inputWrapperHTML);	
			}	
		}
		
		
		$('#input'+n).attr('data-id', n);
		$('#input'+n).attr('data-type', value.type);
		$('#input'+n).attr('data-answer', value.correctAnswer);
	}	
}

/*!
 * 
 * INIT ANIMATE ANSWERS - This is the function that runs to animate answers
 * 
 */
function initAnimateAnswers(){
	var animateDelayNum = .5;
	for(var n=0;n<gameData.targetArray[gameData.sequenceNum].answer.length;n++){
		if(answerAnimationEnable){
			$('#answer'+n).css('opacity',0);
			TweenMax.to($('#answer'+n), 0, {delay:animateDelayNum, scaleX:1, scaleY:1, overwrite:true, ease:Elastic.easeOut, onComplete:animateAnswer, onCompleteParams:[n]});
			animateDelayNum+=.3;
		}
	}
}

function animateAnswer(n){
	var scaleNum = .7;
	var speedNum = 1.3;
	TweenMax.to($('#answer'+n), 0, {scaleX:.5, scaleY:.5, overwrite:true});
	TweenMax.to($('#answer'+n), speedNum, {alpha:1, scaleX:1, scaleY:1, overwrite:true, ease:Elastic.easeOut});
}

/*!
 * 
 * BUILD EXPLANATION - This is the function that runs to build explanation
 * 
 */
function buildExplanation(){
	var value = getArrayValue('explanation');
	if(value.type == 'image'){
		var explanationHTML = '<div class="explanation fontExplanation fitImg" style="top:'+value.top+'%; left:'+value.left+'%; width:'+value.width+'%; "><img src="'+gameData.targetArray[gameData.sequenceNum].explanation+'" /></div>';
		
	}else{
		var explanationHTML = '<div class="explanation fontExplanation resizeFont" data-fontSize="'+value.fontSize+'" data-lineHeight="'+value.lineHeight+'" style="font-size:'+value.fontSize+'px; line-height:'+value.lineHeight+'px; color:'+value.color+';  text-align:'+value.align+'; top:'+value.top+'%; left:'+value.left+'%; width:'+value.width+'%; height:'+value.height+'%; ">'+gameData.targetArray[gameData.sequenceNum].explanation+'</div>';
	}
	$('#explanationHolder').append(explanationHTML);
}

/*!
 * 
 * BUILD ANSWER EVENT - This is the function that runs to build answer event
 * 
 */
function buildAnswerEvent(obj){
	if(!$.editor.enable){
		$(obj).click(function(){
			if(playerData.correctAnswer.length > 1){
				focusTapAnswer($(this).attr('data-id'), $(this).attr('data-type'), $(this).attr('data-submit'), true);
			}else{
				focusTapAnswer($(this).attr('data-id'), $(this).attr('data-type'), 'true', false);
			}
		});
	}
}

/*!
 * 
 * BUILD INPUT EVENT - This is the function that runs to build input event
 * 
 */
function buildInputEvent(obj){
	if(!$.editor.enable){
		$(obj).click(function(){
			checkInputAnswer();
		});
	}
}

/*!
 * 
 * FOCUS ANSWER ANIMATION - This is the function that runs to focus on answer animation
 * 
 */

function focusTapAnswer(n, type, submit, hide){
	if(!playerData.answered){
		stopAudio();
		toggleAudioInterval(false);
		playSound('soundSelectAnswer');
		
		if(submit == 'true'){
			toggleGameTimer(false);
			playerData.answered = true;
			if(hide){
				$('#answer'+n).hide();
			}
		}
		
		$('#answerHolder .answer').each(function(index, element) {
			TweenMax.to($(this), 0, {scaleX:1, scaleY:1, alpha:1, overwrite:true});	
		});
		
		var currentBgColor = answeredButtonBgColour;
		var currentBgShadowColor = answeredButtonBgShadowColour;
		var curScaleNum = .5;
		
		if($('#answer'+n).hasClass('answerFocus')){
			$('#answer'+n).removeClass('answerFocus');
			currentBgColor = answerButtonBgColour;
			currentBgShadowColor = answerButtonBgShadowColour;
		}else{
			$('#answer'+n).addClass('answerFocus');
		}
		
		$('#answer'+n).find('.background').css('background', currentBgColor);
		$('#answer'+n).find('.shadow').css('background', currentBgShadowColor);
		
		//image
		$('#answerHolder .answer').each(function(index, element) {
			if($(this).attr('data-type') == 'image'){
				$(this).css('opacity',.5);
				if($(this).hasClass('answerFocus')){
					$(this).css('opacity',1);	
				}
			}
        });
		
		TweenMax.to($('#answer'+n), 0, {scaleX:curScaleNum, scaleY:curScaleNum, overwrite:true});
		TweenMax.to($('#answer'+n), 1, {scaleX:1, scaleY:1, overwrite:true, ease:Elastic.easeOut, onComplete:function(){
			if(playerData.answered){
				playerData.answer_arr = [];
				$('#answerHolder .answer').each(function(index, element) {
					if($(this).hasClass('answerFocus')){
						if($(this).attr('data-submit') == undefined || $(this).attr('data-submit') == 'false'){
							playerData.answer_arr.push(Number($(this).attr('data-id')));
						}
					}
				});
				
				if(enableRevealAnswer && !checkAnswerCorrect()){
					$('#answerHolder .answer').each(function(index, element) {
						if($(this).attr('data-type') == 'image'){
							$(this).css('opacity',.5);
						}
					});
					
					for(var n=0;n<playerData.answer_arr.length;n++){
						var currentAnswer = playerData.answer_arr[n];
						$('#answer'+currentAnswer).removeClass('answerFocus');
						$('#answer'+currentAnswer).find('.background').css('background', wrongButtonBgColour);
						$('#answer'+currentAnswer).find('.shadow').css('background', wrongButtonBgShadowColour);
					}
					
					for(var n=0;n<playerData.correctAnswer.length;n++){
						var currentAnswer = playerData.correctAnswer[n]-1;
						$('#answer'+currentAnswer).addClass('answerFocus');
						$('#answer'+currentAnswer).find('.background').css('background', answeredButtonBgColour);
						$('#answer'+currentAnswer).find('.shadow').css('background', answeredButtonBgShadowColour);
						
						TweenMax.to($('#answer'+currentAnswer), 0, {scaleX:.5, scaleY:.5, overwrite:true});
						TweenMax.to($('#answer'+currentAnswer), 1, {scaleX:1, scaleY:1, alpha:1, overwrite:true, ease:Elastic.easeOut, onComplete:function(){
							TweenMax.to($('#answer'+currentAnswer), 0, {delay:1, overwrite:true, onComplete:function(){
								displayQuestionResult();
							}});
						}});	
					}
				}else{
					displayQuestionResult();
				}	
			}
		}});
	}
}

/*!
 * 
 * CHECK RIGHT ANSWER - This is the function that runs to check right answer
 * 
 */
 
function checkAnswerCorrect(){
	var correctAnswer = false;
	var correctAnswerCount = 0;
	
	$("video").each(function(){
		$(this).get(0).pause();
	});

	if(playerData.answerType == 'select'){
		for(var n=0;n<playerData.answer_arr.length;n++){
			var currentAnswer = playerData.answer_arr[n]+1;
			if(playerData.correctAnswer.indexOf(currentAnswer) != -1){
				correctAnswerCount++;	
			}
		}
		
		if(correctAnswerCount == playerData.correctAnswer.length){
			correctAnswer = true;
		}
	}else if(playerData.answerType == 'input'){
		var totalInput = $('#inputHolder input').length;
		$('#inputHolder input').each(function(index, element) {
			if($(this).val() == $(this).attr('data-answer')){
				correctAnswerCount++;	
			}
		});	
		
		if(correctAnswerCount == totalInput){
			correctAnswer = true;
		}
	}
	
	return correctAnswer;
}

function checkInputAnswer(){
	if(!playerData.answered){
		var proceedInput = false;
		var totalInput = $('#inputHolder input').length;
		var totalCount = 0;
		
		playerData.answer_arr = [];
		$('#inputHolder input').each(function(index, element) {
			if($(this).val() != ''){
				playerData.answer_arr.push($(this).val());
				totalCount++;
			}
		});
		
		if(totalInput == totalCount){
			proceedInput = true;
		}	
		
		if(proceedInput){
			playSound('soundClick');
			toggleGameTimer(false);
			stopAudio();
			toggleAudioInterval(false);
			playerData.answered = true;
			
			$("#inputHolder input").prop('disabled', true);
			displayQuestionResult();
		}
	}
}

/*!
 * 
 * DISPLAY QUESTION RESULT - This is the function that runs to display question result
 * 
 */
function displayQuestionResult(){
	if(checkAnswerCorrect()){
		playSound('soundAnswerCorrect');
		playerData.score++;
		$('.questionResultText').html(correctDisplayText);
	}else{
		playSound('soundAnswerWrong');
		$('.questionResultText').html(wrongDisplayText);
	}
	
	TweenMax.killTweensOf($('.questionResultText'));
	TweenMax.to($('.questionResultText'), 0, {scaleX:.8, scaleY:.8, alpha:0, overwrite:true});
	TweenMax.to($('.questionResultText'), 1, {delay:.2, scaleX:1, scaleY:1, alpha:1, ease:Elastic.easeOut, overwrite:true});
		
	if(enableExplanation){
		playAudioLoop('explanation');
		$('#explanationHolder').show();	
	}else{
		$('#explanationHolder').hide();	
	}
	
	$('#questionHolder').hide();
	$('#questionResultHolder').show();
	$('#questionResultHolder').css('opacity',0);
	
	TweenMax.to($('#questionResultHolder'), 1, {alpha:1, overwrite:true, onComplete:function(){
		
	}});
}

function presetAnswered(){
	TweenMax.killAll();
	
	$("video").each(function(){
		$(this).get(0).pause();
	});
	
	TweenMax.to($('.questionResultText'), 0, {scaleX:1, scaleY:1, overwrite:true});
	if(playerData.answerType == 'select'){
		$('#answerHolder .answer').each(function(index, element) {
			if($(this).attr('data-submit') == 'true'){
				$(this).hide();
			}
		});
		
		$('#answerHolder .answer').each(function(index, element) {
			if($(this).attr('data-type') == 'image'){
				$(this).css('opacity',.5);
			}
		});
		
		for(var n=0;n<playerData.answer_arr.length;n++){
			var currentAnswer = playerData.answer_arr[n];
			$('#answer'+currentAnswer).removeClass('answerFocus');
			$('#answer'+currentAnswer).find('.background').css('background', wrongButtonBgColour);
			$('#answer'+currentAnswer).find('.shadow').css('background', wrongButtonBgShadowColour);
		}
		
		if(enableRevealAnswer){
			for(var n=0;n<playerData.correctAnswer.length;n++){
				var currentAnswer = playerData.correctAnswer[n]-1;
				$('#answer'+currentAnswer).addClass('answerFocus');
				$('#answer'+currentAnswer).find('.background').css('background', answeredButtonBgColour);
				$('#answer'+currentAnswer).find('.shadow').css('background', answeredButtonBgShadowColour);
				
				TweenMax.to($('#answer'+currentAnswer), 0, {scaleX:.5, scaleY:.5, overwrite:true});
				TweenMax.to($('#answer'+currentAnswer), 1, {scaleX:1, scaleY:1, alpha:1, overwrite:true, ease:Elastic.easeOut, onComplete:function(){
					TweenMax.to($('#answer'+currentAnswer), 0, {delay:1, overwrite:true});
				}});	
			}
		}
	}else if(playerData.answerType == 'input'){
		$("#inputHolder input").prop('disabled', true);
		$('#inputHolder input').each(function(index, element) {
			$(this).val(playerData.answered[index]);
		});
	}

	if(checkAnswerCorrect()){
		$('.questionResultText').html(correctDisplayText);
	}else{
		$('.questionResultText').html(wrongDisplayText);
	}
		
	if(enableExplanation){
		$('#explanationHolder').show();	
	}else{
		$('#explanationHolder').hide();	
	}
	
	$('#questionHolder').hide();
	$('#questionResultHolder').show();
	$('#questionResultHolder').css('opacity',1);
}

function previewQuestion(){
	$('#questionResultHolder').hide();
	$('#questionHolder').show();
	$('#questionHolder').css('opacity',0);
	
	TweenMax.to($('#questionHolder'), 1, {alpha:1, overwrite:true, onComplete:function(){
		TweenMax.to($('#questionHolder'), 0, {delay:2, overwrite:true, onComplete:function(){
			$("video").each(function(){
				$(this).get(0).pause();
			});
			$('#questionHolder').hide();
			$('#questionResultHolder').show();
			$('#questionResultHolder').css('opacity',0);
			
			TweenMax.to($('#questionResultHolder'), 1, {alpha:1, overwrite:true, onComplete:function(){
				
			}});
		}});
	}});
}

/*!
 * 
 * PREPARE NEXT QUESTION - This is the function that runs for next question
 * 
 */
function prepareNextQuestion(){
	stopAudio();
	if(totalQuestions != 0){
		gameData.questionNum++;
		
		var totalMax = totalQuestions > gameData.sequence_arr.length ? gameData.sequence_arr.length : totalQuestions;
		if(gameData.questionNum < totalMax){
			loadQuestion();
		}else{
			playSound('soundComplete');
			goPage('result');
		}
	}else{
		if(gameData.questionNum < gameData.sequence_arr.length-1){
			gameData.questionNum++;
			loadQuestion();
		}else{
			playSound('soundComplete');
			goPage('result');
		}
	}
}

/*!
 * 
 * TOGGLE QUESTION LOADER - This is the function that runs to display question loader
 * 
 */
function toggleQuestionLoader(con){
	if(con){
		$('#questionLoaderHolder').show();
		$('#questionHolder').hide();
	}else{
		$('#questionLoaderHolder').hide();
		$('#questionHolder').show();	
	}
}

/*!
 * 
 * GAME TIMER - This is the function that runs for game timer
 * 
 */
function toggleGameTimer(con){
	if($.editor.enable){
		return;	
	}
	
	if(!enableCountdownTimer){
		return;	
	}
	
	if(con){
		timeData.startDate = new Date();
		loopTimer();
	}
	timeData.enable = con;
}

function loopTimer(){
	TweenMax.to(timeData, .2, {overwrite:true, onComplete:updateTimer});		
}

function updateTimer(){
	timeData.nowDate = new Date();
	var elapsedTime = (timeData.nowDate.getTime() - timeData.startDate.getTime());
	elapsedTime = (elapsedTime/1000)%60;
	
	timeData.timer = Math.floor((coundownTimer+1) - elapsedTime)
	$('.gameTimerStatus').html(timeData.timer);
	
	if(timeData.timer <= 0){
		toggleResult(false);
		goPage('result');	
	}else{
		if(timeData.enable){
			loopTimer();
		}
	}
}

function toggleResult(con){
	if(con){
		$('.itemWinnerCup img').attr('src','assets/item_cup.png');	
	}else{
		$('.itemWinnerCup img').attr('src','assets/item_cup_over.png');
	}
}

/*!
 * 
 * XML - This is the function that runs to load word from xml
 * 
 */
function loadXML(src){
	$('.preloadText').show();
	$('#buttonStart').hide();
	
	$.ajax({
       url: src,
       type: "GET",
       dataType: "xml",
       success: function (result) {
			if($.editor.enable){
				edit.xmlFile = result;
			}
			
			$(result).find('thumb').each(function(catIndex, catElement){
				gameData.categoryThumb_arr.push({src:$(catElement).text(), name:$(catElement).attr('name')});
			});
			
            $(result).find('item').each(function(questionIndex, questionElement){
				var curCategory = $(questionElement).find('category').text();
				if(curCategory != ''){
					gameData.category_arr.push($(questionElement).find('category').text());
				}
				
				//landscape
				$(questionElement).find('landscape').each(function(landscapeIndex, landscapeElement){
					quesLandscape_arr.push({category:curCategory, 
											question:$(landscapeElement).find('question').text(), 
											fontSize:$(landscapeElement).find('question').attr('fontSize'), 
											lineHeight:$(landscapeElement).find('question').attr('lineHeight'), 
											color:$(landscapeElement).find('question').attr('color'), 
											align:$(landscapeElement).find('question').attr('align'), 
											top:$(landscapeElement).find('question').attr('top'), 
											left:$(landscapeElement).find('question').attr('left'),
											width:$(landscapeElement).find('question').attr('width'),
											height:$(landscapeElement).find('question').attr('height'),
											type:$(landscapeElement).find('question').attr('type'), 
											correctAnswer:$(landscapeElement).find('answers').attr('correctAnswer'),
											videos:[],
											answer:[],
											input:[],
											audio:$(landscapeElement).find('question').attr('audio'),
											explanation:$(landscapeElement).find('explanation').text(), 
											explanationFontSize:$(landscapeElement).find('explanation').attr('fontSize'), 
											explanationLineHeight:$(landscapeElement).find('explanation').attr('lineHeight'), 
											explanationColor:$(landscapeElement).find('explanation').attr('color'), 
											explanationAlign:$(landscapeElement).find('explanation').attr('align'), 
											explanationTop:$(landscapeElement).find('explanation').attr('top'), 
											explanationLeft:$(landscapeElement).find('explanation').attr('left'),
											explanationWidth:$(landscapeElement).find('explanation').attr('width'),
											explanationHeight:$(landscapeElement).find('explanation').attr('height'),
											explanationType:$(landscapeElement).find('explanation').attr('type'),
											explanationAudio:$(landscapeElement).find('explanation').attr('audio')});
											
					$(landscapeElement).find('videos').each(function(videosIndex, videosElement){
						$(videosElement).find('video').each(function(videoIndex, videoElement){
							quesLandscape_arr[questionIndex].videos.push({src:$(videoElement).text(),
																			type:$(videoElement).attr('type'),
																			width:$(videosElement).attr('width'),
																			height:$(videosElement).attr('height'),
																			top:$(videosElement).attr('top'),
																			left:$(videosElement).attr('left'),
																			autoplay:$(videosElement).attr('autoplay'),
																			controls:$(videosElement).attr('controls')});
						});
					});
							
					$(landscapeElement).find('answers answer').each(function(answerIndex, answerElement){
						quesLandscape_arr[questionIndex].answer.push({text:$(answerElement).text(),
																		submit:$(answerElement).attr('submit'),
																		type:$(answerElement).attr('type'),
																		width:$(answerElement).attr('width'),
																		height:$(answerElement).attr('height'),
																		top:$(answerElement).attr('top'),
																		left:$(answerElement).attr('left'),
																		fontSize:$(answerElement).attr('fontSize'),
																		lineHeight:$(answerElement).attr('lineHeight'),
																		color:$(answerElement).attr('color'),
																		align:$(answerElement).attr('align'),
																		audio:$(answerElement).attr('audio'),
																		offsetTop:$(answerElement).attr('offsetTop')});
					});
					
					$(landscapeElement).find('inputs input').each(function(inputIndex, inputElement){
						quesLandscape_arr[questionIndex].input.push({text:$(inputElement).text(),
																		submit:$(inputElement).attr('submit'),
																		type:$(inputElement).attr('type'),
																		width:$(inputElement).attr('width'),
																		height:$(inputElement).attr('height'),
																		top:$(inputElement).attr('top'),
																		left:$(inputElement).attr('left'),
																		fontSize:$(inputElement).attr('fontSize'),
																		lineHeight:$(inputElement).attr('lineHeight'),
																		correctAnswer:$(inputElement).attr('correctAnswer'),
																		color:$(inputElement).attr('color'),
																		bacgkround:$(inputElement).attr('bacgkround'),
																		align:$(inputElement).attr('align'),
																		audio:$(inputElement).attr('audio'),
																		offsetTop:$(inputElement).attr('offsetTop')});
					});
				});
				
				//portrait
				$(questionElement).find('portrait').each(function(portraitIndex, portraitElement){
					quesPortrait_arr.push({category:curCategory, 
											question:$(portraitElement).find('question').text(), 
											fontSize:$(portraitElement).find('question').attr('fontSize'), 
											lineHeight:$(portraitElement).find('question').attr('lineHeight'), 
											align:$(portraitElement).find('question').attr('align'), 
											top:$(portraitElement).find('question').attr('top'), 
											left:$(portraitElement).find('question').attr('left'),
											width:$(portraitElement).find('question').attr('width'), 
											height:$(portraitElement).find('question').attr('height'),
											type:$(portraitElement).find('question').attr('type'), 
											correctAnswer:$(portraitElement).find('answers').attr('correctAnswer'),
											color:$(portraitElement).find('answers').attr('color'),
											videos:[],
											answer:[],
											input:[],
											audio:$(portraitElement).find('question').attr('audio'),
											explanation:$(portraitElement).find('explanation').text(), 
											explanationFontSize:$(portraitElement).find('explanation').attr('fontSize'), 
											explanationLineHeight:$(portraitElement).find('explanation').attr('lineHeight'), 
											explanationColor:$(portraitElement).find('explanation').attr('color'), 
											explanationAlign:$(portraitElement).find('explanation').attr('align'), 
											explanationTop:$(portraitElement).find('explanation').attr('top'), 
											explanationLeft:$(portraitElement).find('explanation').attr('left'),
											explanationWidth:$(portraitElement).find('explanation').attr('width'),
											explanationHeight:$(portraitElement).find('explanation').attr('height'),
											explanationType:$(portraitElement).find('explanation').attr('type'),
											explanationAudio:$(portraitElement).find('explanation').attr('audio')});
											
					$(portraitElement).find('videos').each(function(videosIndex, videosElement){
						$(videosElement).find('video').each(function(videoIndex, videoElement){
							quesPortrait_arr[questionIndex].videos.push({src:$(videoElement).text(),
																			type:$(videoElement).attr('type'),
																			width:$(videosElement).attr('width'),
																			height:$(videosElement).attr('height'),
																			top:$(videosElement).attr('top'),
																			left:$(videosElement).attr('left'),
																			autoplay:$(videosElement).attr('autoplay'),
																			controls:$(videosElement).attr('controls')});
						});
					});
											
					$(portraitElement).find('answers answer').each(function(answerIndex, answerElement){
						quesPortrait_arr[questionIndex].answer.push({text:$(answerElement).text(),
																		submit:$(answerElement).attr('submit'),
																		type:$(answerElement).attr('type'),
																		width:$(answerElement).attr('width'),
																		height:$(answerElement).attr('height'),
																		top:$(answerElement).attr('top'),
																		left:$(answerElement).attr('left'),
																		fontSize:$(answerElement).attr('fontSize'),
																		lineHeight:$(answerElement).attr('lineHeight'),
																		color:$(answerElement).attr('color'),
																		align:$(answerElement).attr('align'),
																		audio:$(answerElement).attr('audio'),
																		offsetTop:$(answerElement).attr('offsetTop')});
					});
					
					$(portraitElement).find('inputs input').each(function(inputIndex, inputElement){
						quesPortrait_arr[questionIndex].input.push({text:$(inputElement).text(),
																		submit:$(inputElement).attr('submit'),
																		type:$(inputElement).attr('type'),
																		width:$(inputElement).attr('width'),
																		height:$(inputElement).attr('height'),
																		top:$(inputElement).attr('top'),
																		left:$(inputElement).attr('left'),
																		fontSize:$(inputElement).attr('fontSize'),
																		lineHeight:$(inputElement).attr('lineHeight'),
																		correctAnswer:$(inputElement).attr('correctAnswer'),
																		color:$(inputElement).attr('color'),
																		bacgkround:$(inputElement).attr('bacgkround'),
																		align:$(inputElement).attr('align'),
																		audio:$(inputElement).attr('audio'),
																		offsetTop:$(inputElement).attr('offsetTop')});
					});
				});
			});
			
			loadXMLComplete();
       }
	});
}

function checkBoolean(value){
	if(value == undefined){
		return true;	
	}else{
		if(value == 'true'){
			return true;	
		}else{
			return false;
		}
	}
}

function loadXMLComplete(){
	$('.preloadText').hide();
	$('#buttonStart').show();
	
	gameData.targetArray = quesLandscape_arr;
	if(gameData.targetArray.length!=0){
		gameData.category_arr = unique(gameData.category_arr);
		gameData.category_arr.sort();
		if(categoryAllOption){
			gameData.category_arr.push(categoryAllText);
		}
	}
	
	if(categoryPage){
		buildCategory();
	}
	
	if($.editor.enable){
		loadEditPage();
		goPage('game');
	}else{
		goPage('main');
	}
}

/*!
 * 
 * QUESTION AND ANSWER IMAGE PRELOADER - This is the function that runs to preload question/answer image
 * 
 */
var imageLoader, fileFest;
function loadQuestionAssets(){
	imageLoader = new createjs.LoadQueue(false);
	createjs.Sound.alternateExtensions = ["mp3"];
	imageLoader.installPlugin(createjs.Sound);
	
	imageLoader.addEventListener("complete", handleImageComplete);
	imageLoader.loadManifest(fileFest);
}

function handleImageComplete() {
	buildQuestion();
};

/*!
 * 
 * RESIZE GAME - This is the function that runs to resize game
 * 
 */
function resizeGameDetail(){
	if(gameData.mode != gameData.oldMode){
		gameData.oldMode = gameData.mode;
		if(gameData.build && gameData.page == 'game'){
			buildQuestion();
		}
	}
	
	var curHoldeW = $('#mainHolder').outerWidth();
	if(gameData.mode == 'portrait'){
		resetCategory();
		$('.fontPreload').attr('data-fontSize', 50);
		$('.fontPreload').attr('data-lineHeight', 50);
		$('.fontCategory').attr('data-fontSize', 20);
		$('.fontCategory').attr('data-lineHeight', 20);
		
		$('.gameQuestionStatus').attr('data-fontSize', 20);
		$('.gameQuestionStatus').attr('data-lineHeight', 20);
		$('.gameTimerStatus').attr('data-fontSize', 20);
		$('.gameTimerStatus').attr('data-lineHeight', 20);
		
		$('.fontResultScore').attr('data-fontSize', 40);
		$('.fontResultScore').attr('data-lineHeight', 40);
		$('.fontShare').attr('data-fontSize', 25);
		$('.fontShare').attr('data-lineHeight', 25);
		
		$('.fontMessage').attr('data-fontSize', 25);
		$('.fontMessage').attr('data-lineHeight', 25);
		
		$('.fontScoreTitle').attr('data-fontSize', 25);
		$('.fontScoreTitle').attr('data-lineHeight', 25);
		$('.fontSubmitTitle').attr('data-fontSize', 25);
		$('.fontSubmitTitle').attr('data-lineHeight', 25);
		$('.fontScoreList').attr('data-fontSize', 15);
		$('.fontScoreList').attr('data-lineHeight', 15);
		
		$('.fontLabel').attr('data-fontSize', 20);
		$('.fontLabel').attr('data-lineHeight', 20);
		$('.fontInput').attr('data-fontSize', 20);
		$('.fontInput').attr('data-lineHeight', 20);
	}else{
		resetCategory();
		$('.fontPreload').attr('data-fontSize', 60);
		$('.fontPreload').attr('data-lineHeight', 60);
		$('.fontCategory').attr('data-fontSize', 20);
		$('.fontCategory').attr('data-lineHeight', 20);
		
		$('.gameQuestionStatus').attr('data-fontSize', 30);
		$('.gameQuestionStatus').attr('data-lineHeight', 30);
		$('.gameTimerStatus').attr('data-fontSize', 30);
		$('.gameTimerStatus').attr('data-lineHeight', 30);
		$('.fontResultScore').attr('data-fontSize', 50);
		$('.fontResultScore').attr('data-lineHeight', 50);
		$('.fontShare').attr('data-fontSize', 30);
		$('.fontShare').attr('data-lineHeight', 30);
		
		$('.fontMessage').attr('data-fontSize', 30);
		$('.fontMessage').attr('data-lineHeight', 30);
		
		$('.fontScoreTitle').attr('data-fontSize', 50);
		$('.fontScoreTitle').attr('data-lineHeight', 50);
		$('.fontSubmitTitle').attr('data-fontSize', 50);
		$('.fontSubmitTitle').attr('data-lineHeight', 50);
		$('.fontScoreList').attr('data-fontSize', 20);
		$('.fontScoreList').attr('data-lineHeight', 20);
		
		$('.fontLabel').attr('data-fontSize', 30);
		$('.fontLabel').attr('data-lineHeight', 30);
		$('.fontInput').attr('data-fontSize', 30);
		$('.fontInput').attr('data-lineHeight', 30);
	}
	
	$('.resizeFont').each(function(index, element) {
        $(this).css('font-size', Math.round(Number($(this).attr('data-fontSize'))*scalePercent)+'px');
		$(this).css('line-height', Math.round(Number($(this).attr('data-lineHeight'))*scalePercent)+'px');
    });	
}

/*!
 * 
 * TOGGLE CONFIRM - This is the function that runs to toggle confirm exit
 * 
 */
function toggleConfirm(con){
	if(con){
		$('#confirmHolder').show();
	}else{
		$('#confirmHolder').hide();	
	}
}

/*!
 * 
 * OPTIONS - This is the function that runs to mute and fullscreen
 * 
 */
function toggleGameOption(){
	if($('#buttonOption').hasClass('buttonOptionOn')){
		$('#buttonOption').removeClass('buttonOptionOn');
		$('#buttonOption').addClass('buttonOptionOff');
		$('#optionList').hide();
	}else{
		$('#buttonOption').removeClass('buttonOptionOff');
		$('#buttonOption').addClass('buttonOptionOn');
		$('#optionList').show();
	}
}

function toggleGameMute(){
	if($('#buttonSound').hasClass('buttonSoundOn')){
		$('#buttonSound').removeClass('buttonSoundOn');
		$('#buttonSound').addClass('buttonSoundOff');
		toggleMute(true);
	}else{
		$('#buttonSound').removeClass('buttonSoundOff');
		$('#buttonSound').addClass('buttonSoundOn');
		toggleMute(false);
	}
}


function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}


/*!
 * 
 * SHARE - This is the function that runs to open share url
 * 
 */
function share(action){
	var loc = location.href
	loc = loc.substring(0, loc.lastIndexOf("/") + 1);
	
	var title = '';
	var text = '';
	
	title = shareTitle.replace("[SCORE]", playerData.score);
	text = shareMessage.replace("[SCORE]", playerData.score);
	var shareurl = '';
	
	if( action == 'twitter' ) {
		shareurl = 'https://twitter.com/intent/tweet?url='+loc+'&text='+text;
	}else if( action == 'facebook' ){
		shareurl = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(loc+'share.php?desc='+text+'&title='+title+'&url='+loc+'&thumb='+loc+'share.jpg&width=590&height=300');
	}else if( action == 'google' ){
		shareurl = 'https://plus.google.com/share?url='+loc;
	}
	
	window.open(shareurl);
}