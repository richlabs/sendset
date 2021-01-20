////////////////////////////////////////////////////////////
// EDIT TERMINALS
////////////////////////////////////////////////////////////
var edit = {xmlFile:'', templateFile:'', mode:'landscape', sortNum:0, templateNum:0, answerNum:0, inputNum:0, videoNum:0, replay:false, con:''};

/*!
 * 
 * EDIT READY
 * 
 */
$(function() {
	 $.editor.enable = true;
});

function loadEditPage(){
	jQuery.ajax({ 
		 url: "editTools.html", dataType: "html" 
	}).done(function( responseHtml ) {
		loadTemplateXML('template.xml');
		
		$("body").prepend(responseHtml);
		buildEditButtons();
		loadEditQuestion(true);
		
		$('#editWrapper').show();
		$('#gameHolder').addClass('editBorder');
		$('#option, #gameStatus, #buttonNextQues, #buttonPreviewQues').hide();
	});
}

function buildEditButtons(){
	$("#modelist").change(function() {
		if($(this).val() != edit.mode){
			edit.mode = $(this).val();
			gameData.mode = $(this).val();
			
			var modeValue = 'Landscape';
			if(edit.mode == 'landscape'){
				modeValue = 'Portrait';
			}
			$('#updateQuestion').val('Update To '+modeValue);
			
			loadEditQuestion(true);
			loadEditVideo();
			loadEditAnswer();
			loadEditInput();
			loadEditExplanation();
			resizeGameFunc();
		}
	});
	
	buildQuestionList();
	
	$("#questionslist").change(function() {
		if($(this).val() != ''){
			gameData.questionNum = $(this).val();
			gameData.sequenceNum = gameData.sequence_arr[gameData.questionNum];
			edit.answerNum = 0;
			edit.inputNum = 0;
			edit.videoNum = 0;
			loadEditQuestion(true);
		}
	});
	
	$('#sortQuestion').click(function(){
		toggleEditOption('sort');
	});
	
	$('#newQuestion').click(function(){
		toggleEditOption('template');
	});
	
	$('#removeQuestion').click(function(){
		actionQuestion('remove');
	});
	
	$('#prevQuestion').click(function(){
		toggleQuestion(false);
	});
	
	$('#nextQuestion').click(function(){
		toggleQuestion(true);
	});
	
	$('#editQuestion').click(function(){
		toggleEditOption('question');
	});
	
	$('#editVideo').click(function(){
		toggleEditOption('video');
	});
	
	$('#editAnswers').click(function(){
		toggleEditOption('answers');
	});
	
	$('#editInputs').click(function(){
		toggleEditOption('inputs');
	});
	
	$('#editExplanation').click(function(){
		toggleEditOption('explanation');
	});
	
	$('#generateXML').click(function(){
		generateXML();
	});
	
	$('#saveXML').click(function(){
		var n = prompt('Enter password to save.');
		if ( n!=null && n!="" ) {
			saveXML(n);
		}
	});
	
	$('#doneQuestion').click(function(){
		updateQuestion(edit.mode);
		toggleEditOption('');
	});
	
	$('#previewQuestion').click(function(){
		updateQuestion(edit.mode);
	});
	
	$('#updateQuestion').click(function(){
		updateQuestion('landscape');
		updateQuestion('portrait');
	});
	
	//video
	$("#videoslist").change(function() {
		if($(this).val() != ''){
			edit.videoNum = $(this).val();
			loadEditVideo();
		}
	});
	
	$('#prevVideo').click(function(){
		toggleVideo(false);
	});
	
	$('#nextVideo').click(function(){
		toggleVideo(true);
	});
	
	$('#removeVideo').click(function(){
		actionVideo('remove');
	});
	
	$('#addVideo').click(function(){
		actionVideo('add');
	});
	
	$('#doneVideo').click(function(){
		updateVideo(edit.mode);
		toggleEditOption('');
	});
	
	$('#previewVideo').click(function(){
		updateVideo(edit.mode);
	});
	
	//answer
	$("#answerslist").change(function() {
		if($(this).val() != ''){
			edit.answerNum = $(this).val();
			loadEditAnswer();
		}
	});
	
	$('#prevAnswer').click(function(){
		toggleAnswer(false);
	});
	
	$('#nextAnswer').click(function(){
		toggleAnswer(true);
	});
	
	$('#removeAnswer').click(function(){
		actionAnswer('remove');
	});
	
	$('#addAnswer').click(function(){
		actionAnswer('add');
	});
	
	$('#doneAnswer').click(function(){
		updateAnswers();
		toggleEditOption('');
	});
	
	$('#previewAnswer').click(function(){
		updateAnswers();
	});
	
	//input
	$("#inputslist").change(function() {
		if($(this).val() != ''){
			edit.inputNum = $(this).val();
			loadEditInput();
		}
	});
	
	$('#prevInput').click(function(){
		toggleInput(false);
	});
	
	$('#nextInput').click(function(){
		toggleInput(true);
	});
	
	$('#removeInput').click(function(){
		actionInput('remove');
	});
	
	$('#addInput').click(function(){
		actionInput('add');
	});
	
	$('#doneInput').click(function(){
		updateInputs();
		toggleEditOption('');
	});
	
	$("#inputtype").change(function() {
		toggleInputCorrect($(this).val());
	});
	
	$('#previewInput').click(function(){
		updateInputs();
	});
	
	//template
	$('#doneTemplate').click(function(){
		toggleEditOption('');
	});
	
	$('#addNewTemplate').click(function(){
		actionQuestion('add');
	});
	
	$("#templatelist").change(function() {
		if($(this).val() != gameData.templateNum){
			gameData.templateNum = $(this).val();
		}
	});
	
	//sort
	$('#moveQuestionUp').click(function(){
		swapQuestion(false);
	});
	
	$('#moveQuestionDown').click(function(){
		swapQuestion(true);
	});
	
	$('#doneSort').click(function(){
		toggleEditOption('');
	});
	
	$("#sortquestionslist").change(function() {
		if($(this).val() != ''){
			edit.sortNum = $(this).val();
		}
	});
	
	//explanation
	$('#doneExplanation').click(function(){
		updateExplanation(edit.mode);
		toggleEditOption('');
	});
	
	$('#previewExplanation').click(function(){
		updateExplanation();
		playAudioLoop();
	});
}

function toggleEditOption(con){
	edit.con = con;
	
	$('#actionWrapper').hide();
	$('#sortWrapper').hide();
	$('#templateWrapper').hide();
	$('#questionWrapper').hide();
	$('#videoWrapper').hide();
	$('#answersWrapper').hide();
	$('#inputsWrapper').hide();
	$('#explanationWrapper').hide();
	$('#topWrapper').hide();
	$('#selectQuestionWrapper').hide();
	$('#questionHolder').show();
	$('#questionResultHolder').hide();
	
	if(con == 'sort'){
		$('#sortWrapper').show();
	}else if(con == 'template'){
		gameData.templateNum = -1;
		$('#templateWrapper').show();
	}else if(con == 'question'){
		$('#questionWrapper').show();
		$('#selectQuestionWrapper').show();
	}else if(con == 'video'){
		$('#videoWrapper').show();
	}else if(con == 'answers'){
		$('#answersWrapper').show();
	}else if(con == 'inputs'){
		$('#inputsWrapper').show();
	}else if(con == 'explanation'){
		$('#explanationWrapper').show();
		$('#questionHolder').hide();
		$('#questionResultHolder').show();
		playAudioLoop();
	}else{
		$('#actionWrapper').show();	
		$('#topWrapper').show();
		$('#selectQuestionWrapper').show();
	}
	
	loadEditQuestion(false);
}


/*!
 * 
 * TOGGLE QUESTION - This is the function that runs to toggle question
 * 
 */
function toggleQuestion(con){
	if(con){
		gameData.questionNum++;
		gameData.questionNum = gameData.questionNum > gameData.targetArray.length - 1 ? 0 : gameData.questionNum;
	}else{
		gameData.questionNum--;
		gameData.questionNum = gameData.questionNum < 0 ? gameData.targetArray.length - 1 : gameData.questionNum;
	}
	
	gameData.sequenceNum = gameData.sequence_arr[gameData.questionNum];
	$('#questionslist').prop("selectedIndex", gameData.sequenceNum);
	
	edit.answerNum = 0;
	edit.inputNum = 0;
	edit.videoNum = 0;
	loadEditQuestion(true);
}

/*!
 * 
 * TOGGLE ANSWER - This is the function that runs to toggle answer
 * 
 */
function toggleAnswer(con){
	if(con){
		edit.answerNum++;
		edit.answerNum = edit.answerNum > gameData.targetArray[gameData.sequenceNum].answer.length - 1 ? 0 : edit.answerNum;
	}else{
		edit.answerNum--;
		edit.answerNum = edit.answerNum < 0 ? gameData.targetArray[gameData.sequenceNum].answer.length - 1 : edit.answerNum;
	}
	
	$('#answerslist').prop("selectedIndex", edit.answerNum);
	loadEditAnswer();
}

/*!
 * 
 * TOGGLE INPUT - This is the function that runs to toggle input
 * 
 */
function toggleInput(con){
	if(con){
		edit.inputNum++;
		edit.inputNum = edit.inputNum > gameData.targetArray[gameData.sequenceNum].input.length - 1 ? 0 : edit.inputNum;
	}else{
		edit.inputNum--;
		edit.inputNum = edit.inputNum < 0 ? gameData.targetArray[gameData.sequenceNum].input.length - 1 : edit.inputNum;
	}
	
	$('#inputslist').prop("selectedIndex", edit.inputNum);
	loadEditInput();
}

/*!
 * 
 * TOGGLE ANSWER - This is the function that runs to toggle answer
 * 
 */
function toggleVideo(con){
	if(con){
		edit.videoNum++;
		edit.videoNum = edit.videoNum > gameData.targetArray[gameData.sequenceNum].videos.length - 1 ? 0 : edit.videoNum;
	}else{
		edit.videoNum--;
		edit.videoNum = edit.videoNum < 0 ? gameData.targetArray[gameData.sequenceNum].videos.length - 1 : edit.videoNum;
	}
	
	$('#videoslist').prop("selectedIndex", edit.videoNum);
	loadEditVideo();
}

/*!
 * 
 * ACTION ANSWER - This is the function that runs to add/remove answer
 * 
 */
function actionAnswer(con){
	if(con == 'add'){
		if(gameData.targetArray[gameData.sequenceNum].answer.length < 8){
			var newAnswerText = 'Answer'+(gameData.targetArray[gameData.sequenceNum].answer.length+1);
			gameData.targetArray[gameData.sequenceNum].answer.push({text:newAnswerText,
																	type:'text',
																	width:'',
																	height:'',
																	top:'',
																	left:'',
																	fontSize:'',
																	lineHeight:'',
																	color:'',
																	align:'center',
																	audio:'',
																	offsetTop:''});
			$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers').append('<answer type="text">'+newAnswerText+'</answer>');
			
			$('#answertype').prop("selectedIndex", 0);
			$('#answerText').val(newAnswerText);
			$('#answerFontSize').val('');
			$('#answerLineHeight').val('');
			$('#answerOffsetTop').val('');
			$('#answerWidth').val('');
			$('#answerHeight').val('');
			$('#answerTop').val('');
			$('#answerLeft').val('');
			$('#answerColor').val('');
			$('#answerAlign').prop("selectedIndex", 1);
			$('#answerAudio').val('');
			
			edit.answerNum = gameData.targetArray[gameData.sequenceNum].answer.length-1;
			updateAnswers();
		}else{
			alert('Maximum 8 answers!');	
		}
	}else{
		gameData.targetArray[gameData.sequenceNum].answer.splice(edit.answerNum, 1);
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).remove();
		
		edit.answerNum = 0;
		loadEditQuestion(false);	
	}
}

/*!
 * 
 * ACTION INPUT - This is the function that runs to add/remove input
 * 
 */
function actionInput(con){
	if(con == 'add'){
		if(gameData.targetArray[gameData.sequenceNum].input.length < 8){
			gameData.targetArray[gameData.sequenceNum].input.push({text:'',
																	type:'blank',
																	width:'',
																	height:'',
																	top:'',
																	left:'',
																	fontSize:'',
																	lineHeight:'',
																	color:'',
																	align:'center',
																	audio:'',
																	offsetTop:'',
																	correctAnswer:'',
																	bacgkround:'',});
																	
			$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs').append('<input type="blank"></input>');
			
			$('#inputtype').prop("selectedIndex", 0);
			$('#inputText').val('');
			$('#inputFontSize').val('');
			$('#inputLineHeight').val('');
			$('#inputOffsetTop').val('');
			$('#inputWidth').val('');
			$('#inputHeight').val('');
			$('#inputTop').val('');
			$('#inputLeft').val('');
			$('#inputColor').val('');
			$('#inputAlign').prop("selectedIndex", 1);
			$('#inputAudio').val('');
			$('#inputBackground').val('');
			
			edit.inputNum = gameData.targetArray[gameData.sequenceNum].input.length-1;
			updateInputs();
		}else{
			alert('Maximum 8 answers!');	
		}
	}else{
		gameData.targetArray[gameData.sequenceNum].input.splice(edit.answerNum, 1);
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).remove();
		
		edit.inputNum = 0;
		loadEditQuestion(false);	
	}
}

/*!
 * 
 * ACTION VIDEO - This is the function that runs to add/remove video
 * 
 */
function actionVideo(con){
	if(con == 'add'){
		gameData.targetArray[gameData.sequenceNum].videos.push({src:'',
																width:'',
																height:'',
																top:'',
																left:'',
																autoplay:'true',
																controls:'true'});
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos').append('<video></video>');
		$('#videoSrc').val('');
		
		edit.videoNum = gameData.targetArray[gameData.sequenceNum].videos.length-1;
		updateVideo();
	}else{
		gameData.targetArray[gameData.sequenceNum].videos.splice(edit.videoNum, 1);
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos video').eq(edit.videoNum).remove();
		
		edit.videoNum = 0;
		loadEditQuestion(false);	
	}
}

/*!
 * 
 * ACTION QUESTION - This is the function that runs to add/remove quesiton
 * 
 */
function actionQuestion(con){
	if(con == 'add'){
		if(gameData.templateNum == -1){
			alert('Please select a template to add');
			return;	
		}
		toggleEditOption('');
		
		var newTemplate = $(edit.templateFile).find('item').eq(gameData.templateNum).clone();
		$(edit.xmlFile).find('questions').append(newTemplate);
		
		var lastArrayNum = gameData.targetArray.length;
		$(edit.xmlFile).find('item').each(function(questionIndex, questionElement){
			if(lastArrayNum == questionIndex){
				var curCategory = $(questionElement).find('category').text();
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
											audio:$(landscapeElement).find('question').attr('audio')});
							
					$(landscapeElement).find('answers answer').each(function(answerIndex, answerElement){
						quesLandscape_arr[questionIndex].answer.push({text:$(answerElement).text(),
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
											answer:[],
											input:[],
											audio:$(portraitElement).find('question').attr('audio')});
											
					$(portraitElement).find('answers answer').each(function(answerIndex, answerElement){
						quesPortrait_arr[questionIndex].answer.push({text:$(answerElement).text(),
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
			}
		});
		
		filterCategoryQuestion();
		gameData.questionNum = gameData.targetArray.length-1;
	}else{
		filterCategoryQuestion();
		quesLandscape_arr.splice(gameData.sequenceNum, 1);
		quesPortrait_arr.splice(gameData.sequenceNum, 1);
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).remove();
		
		gameData.questionNum = 0;
	}
	
	gameData.sequenceNum = gameData.sequence_arr[gameData.questionNum];
	filterCategoryQuestion();
	buildQuestionList();
	loadEditQuestion(false);
}

/*!
 * 
 * LOAD EDIT QUESTION - This is the function that runs to load question value
 * 
 */
function loadEditQuestion(con){
	//edit question
	$('#category').val(gameData.targetArray[gameData.sequenceNum].category);
	
	var questionType = gameData.targetArray[gameData.sequenceNum].type == 'text' ? 0 : 1;
	var questionAlign = gameData.targetArray[gameData.sequenceNum].align;
	if(questionAlign == undefined){
		questionAlign = 1;
	}else{
		if(questionAlign == 'left'){
			questionAlign = 0;	
		}else if(questionAlign == 'center'){
			questionAlign = 1;
		}else{
			questionAlign = 2;	
		}
	}
	
	$('#questiontype').prop("selectedIndex", questionType);
	$('#questionText').val(gameData.targetArray[gameData.sequenceNum].question);
	$('#questionFontSize').val(gameData.targetArray[gameData.sequenceNum].fontSize);
	$('#questionLineHeight').val(gameData.targetArray[gameData.sequenceNum].lineHeight);
	$('#questionAlign').prop("selectedIndex", questionAlign);
	$('#questionTop').val(gameData.targetArray[gameData.sequenceNum].top);
	$('#questionLeft').val(gameData.targetArray[gameData.sequenceNum].left);
	$('#questionWidth').val(gameData.targetArray[gameData.sequenceNum].width);
	$('#questionHeight').val(gameData.targetArray[gameData.sequenceNum].height);
	$('#questionColor').val(gameData.targetArray[gameData.sequenceNum].color);
	$('#questionAudio').val(gameData.targetArray[gameData.sequenceNum].audio);
	
	//edit video
	$('#videoslist').empty();
	for(n=0;n<gameData.targetArray[gameData.sequenceNum].videos.length;n++){
		$('#videoslist').append($("<option/>", {
			value: n,
			text: 'Video '+(n+1)
		}));
	}
	$('#videoslist').prop("selectedIndex", edit.videoNum);
	loadEditVideo();
	
	//edit answers
	$('#answerslist').empty();
	for(n=0;n<gameData.targetArray[gameData.sequenceNum].answer.length;n++){
		$('#answerslist').append($("<option/>", {
			value: n,
			text: 'Answer '+(n+1)
		}));
	}
	$('#answerslist').prop("selectedIndex", edit.answerNum);
	loadEditAnswer();
	
	//edit inputs
	$('#inputslist').empty();
	for(n=0;n<gameData.targetArray[gameData.sequenceNum].input.length;n++){
		$('#inputslist').append($("<option/>", {
			value: n,
			text: 'Input '+(n+1)
		}));
	}
	$('#inputslist').prop("selectedIndex", edit.inputNum);
	loadEditInput();
	
	loadEditExplanation();
	
	edit.replay = con;
	loadQuestion();
}

/*!
 * 
 * LOAD EDIT ANSWER - This is the function that runs to load answer value
 * 
 */
function loadEditVideo(){
	if(gameData.targetArray[gameData.sequenceNum].videos == undefined){
		$('#videoSrc').val('');
		$('#videoWidth').val('');
		$('#videoHeight').val('');
		$('#videoTop').val('');
		$('#videoLeft').val('');
		$('#videoAutoplay').prop("selectedIndex", 0);
		$('#videoControls').prop("selectedIndex", 0);
		
		return;		
	}
	
	if(gameData.targetArray[gameData.sequenceNum].videos.length <= 0){
		$('#videoSrc').val('');
		$('#videoWidth').val('');
		$('#videoHeight').val('');
		$('#videoTop').val('');
		$('#videoLeft').val('');
		$('#videoAutoplay').prop("selectedIndex", 0);
		$('#videoControls').prop("selectedIndex", 0);
		
		return;	
	}
	
	var videoAutoplay = gameData.targetArray[gameData.sequenceNum].videos[0].autoplay;
	if(videoAutoplay == undefined || videoAutoplay == 'true'){
		videoAutoplay = 0;
	}else{
		videoAutoplay = 1;	
	}
	
	var videoControls = gameData.targetArray[gameData.sequenceNum].videos[0].controls;
	if(videoControls == undefined || videoControls == 'true'){
		videoControls = 0;
	}else{
		videoControls = 1;	
	}
	
	var videoType = gameData.targetArray[gameData.sequenceNum].videos[edit.videoNum].type;
	if(videoType == undefined){
		videoType = 0;
	}else{
		if(videoType == 'video/mp4'){
			videoType = 0;	
		}else if(answerAlign == 'video/webm'){
			videoType = 1;
		}else if(answerAlign == 'video/ogg'){
			videoType = 2;
		}
	}
	
	$('#videotype').prop("selectedIndex", videoType);
	$('#videoSrc').val(gameData.targetArray[gameData.sequenceNum].videos[edit.videoNum].src);
	$('#videoWidth').val(gameData.targetArray[gameData.sequenceNum].videos[0].width);
	$('#videoHeight').val(gameData.targetArray[gameData.sequenceNum].videos[0].height);
	$('#videoTop').val(gameData.targetArray[gameData.sequenceNum].videos[0].top);
	$('#videoLeft').val(gameData.targetArray[gameData.sequenceNum].videos[0].left);
	$('#videoAutoplay').prop("selectedIndex", videoAutoplay);
	$('#videoControls').prop("selectedIndex", videoControls);
}

/*!
 * 
 * LOAD EDIT ANSWER - This is the function that runs to load answer value
 * 
 */
function loadEditAnswer(){
	if(gameData.targetArray[gameData.sequenceNum].answer.length <= 0){
		$('#answerslist').empty();
		$('#correctAnswer').val('');
		$('#answerText').val('');
		$('#answerFontSize').val('');
		$('#answerLineHeight').val('');
		$('#answerOffsetTop').val('');
		$('#answerWidth').val('');
		$('#answerHeight').val('');
		$('#answerTop').val('');
		$('#answerLeft').val('');
		$('#answerColor').val('');
		$('#answerAlign').prop("selectedIndex", 0);
		$('#answerAudio').val('');
		return;	
	}
	
	$('#correctAnswer').val(gameData.targetArray[gameData.sequenceNum].correctAnswer);
	
	var answerSubmit = 0;
	if(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].submit == 'false' || gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].submit == undefined){
		answerSubmit = 1;
	}else{
		answerSubmit = 0;
	}
	
	$('#answerSubmit').prop("selectedIndex", answerSubmit);
	
	var answerType = gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].type == 'image' ? 1 : 0;
	$('#answertype').prop("selectedIndex", answerType);
	
	var answerAlign = gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].align;
	if(answerAlign == undefined){
		answerAlign = 1;
	}else{
		if(answerAlign == 'left'){
			answerAlign = 0;	
		}else if(answerAlign == 'center'){
			answerAlign = 1;
		}else{
			answerAlign = 2;	
		}
	}
	
	$('#answerText').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].text);
	$('#answerFontSize').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].fontSize);
	$('#answerLineHeight').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].lineHeight);
	$('#answerOffsetTop').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].offsetTop);
	$('#answerWidth').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].width);
	$('#answerHeight').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].height);
	$('#answerTop').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].top);
	$('#answerLeft').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].left);
	$('#answerColor').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].color);
	$('#answerAlign').prop("selectedIndex", answerAlign);
	$('#answerAudio').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].audio);
}

/*!
 * 
 * LOAD EDIT INPUT - This is the function that runs to load input value
 * 
 */
function loadEditInput(){
	if(gameData.targetArray[gameData.sequenceNum].input.length <= 0){
		$('#inputSubmit').prop("selectedIndex", 0);
		$('#inputtype').prop("selectedIndex", 0);
		$('#correctInput').val('');
		$('#inputText').val('');
		$('#inputFontSize').val('');
		$('#inputLineHeight').val('');
		$('#inputWidth').val('');
		$('#inputHeight').val('');
		$('#inputTop').val('');
		$('#inputLeft').val('');
		$('#inputColor').val('');
		$('#inputBackground').val('');
		$('#inputAlign').prop("selectedIndex", 0);
		$('#inputAudio').val('');
		$('#inputOffsetTop').val('');
		return;	
	}
	
	var inputSubmit = 0;
	if(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].submit == 'false' || gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].submit == undefined){
		inputSubmit = 1;
	}else{
		inputSubmit = 0;
	}
	
	$('#inputSubmit').prop("selectedIndex", inputSubmit);
	toggleSubmitInput(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].submit)
	
	var inputType = 0;
	if(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].type == 'blank'){
		inputType = 0;
	}else if(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].type == 'text'){
		inputType = 1;
	}else if(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].type == 'image'){
		inputType = 2;
	}
	
	$('#inputtype').prop("selectedIndex", inputType);
	
	var inputAlign = gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].align;
	if(inputAlign == undefined){
		inputAlign = 1;
	}else{
		if(inputAlign == 'left'){
			inputAlign = 0;	
		}else if(inputAlign == 'center'){
			inputAlign = 1;
		}else{
			inputAlign = 2;	
		}
	}
	
	toggleInputCorrect(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].type);
	
	$('#correctInput').val(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].correctAnswer);
	$('#inputText').val(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].text);
	$('#inputFontSize').val(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].fontSize);
	$('#inputLineHeight').val(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].lineHeight);
	$('#inputWidth').val(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].width);
	$('#inputHeight').val(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].height);
	$('#inputTop').val(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].top);
	$('#inputLeft').val(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].left);
	$('#inputColor').val(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].color);
	$('#inputBackground').val(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].background);
	$('#inputAlign').prop("selectedIndex", inputAlign);
	$('#inputAudio').val(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].audio);
	$('#inputOffsetTop').val(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].offsetTop);
}

function toggleSubmitInput(inputSubmit){
	$('#inputtype option[value="blank"]').attr("disabled", true);
	$('#inputtype option[value="text"]').attr("disabled", true);
	$('#inputtype option[value="image"]').attr("disabled", true);
	
	if(inputSubmit == 'true'){
		$('#inputtype option[value="text"]').removeAttr('disabled');
		$('#inputtype option[value="image"]').removeAttr('disabled');
	}else{
		$('#inputtype option[value="blank"]').removeAttr('disabled');
	}	
}

function toggleInputCorrect(inputType){
	if(inputType == 'blank'){
		$('#correctInputWrapper').show();
	}else{
		$('#correctInputWrapper').hide();
	}
}

/*!
 * 
 * LOAD EDIT EXPLANATION - This is the function that runs to load explanation value
 * 
 */
function loadEditExplanation(){
	var explainType = gameData.targetArray[gameData.sequenceNum].explanationType == 'image' ? 1 : 0;
	$('#explanationtype').prop("selectedIndex", explainType);
	
	var explanationAlign = gameData.targetArray[gameData.sequenceNum].explanationAlign;
	if(explanationAlign == undefined){
		explanationAlign = 1;
	}else{
		if(explanationAlign == 'left'){
			explanationAlign = 0;	
		}else if(explanationAlign == 'center'){
			explanationAlign = 1;
		}else{
			explanationAlign = 2;	
		}
	}
	
	$('#explanationText').val(gameData.targetArray[gameData.sequenceNum].explanation);
	$('#explanationFontSize').val(gameData.targetArray[gameData.sequenceNum].explanationFontSize);
	$('#explanationLineHeight').val(gameData.targetArray[gameData.sequenceNum].explanationLineHeight);
	$('#explanationWidth').val(gameData.targetArray[gameData.sequenceNum].explanationWidth);
	$('#explanationHeight').val(gameData.targetArray[gameData.sequenceNum].explanationHeight);
	$('#explanationTop').val(gameData.targetArray[gameData.sequenceNum].explanationTop);
	$('#explanationLeft').val(gameData.targetArray[gameData.sequenceNum].explanationLeft);
	$('#explanationColor').val(gameData.targetArray[gameData.sequenceNum].explanationColor);
	$('#explanationAlign').prop("selectedIndex", explanationAlign);
	$('#explanationAudio').val(gameData.targetArray[gameData.sequenceNum].explanationAudio);
}

/*!
 * 
 * UPDATE QUESTION - This is the function that runs to update question value
 * 
 */
function updateQuestion(){
	//update array
	quesLandscape_arr[gameData.sequenceNum].category = $('#category').val();
	quesPortrait_arr[gameData.sequenceNum].category = $('#category').val();
	
	var questionFontSize = $('#questionFontSize').val();
	questionFontSize = questionFontSize == 0 ? undefined : questionFontSize;
	var questionLineHeight = $('#questionLineHeight').val();
	questionLineHeight = questionLineHeight == 0 ? undefined : questionLineHeight;
	var questionTop = $('#questionTop').val();
	questionTop = questionTop == 0 ? undefined : questionTop;
	var questionLeft = $('#questionLeft').val();
	questionLeft = questionLeft == 0 ? undefined : questionLeft;
	var questionWidth = $('#questionWidth').val();
	questionWidth = questionWidth == 0 ? undefined : questionWidth;
	var questionHeight = $('#questionHeight').val();
	questionHeight = questionHeight == 0 ? undefined : questionHeight;
	
	gameData.targetArray[gameData.sequenceNum].type = $('#questiontype').val();
	gameData.targetArray[gameData.sequenceNum].fontSize = questionFontSize;
	gameData.targetArray[gameData.sequenceNum].lineHeight = questionLineHeight;
	gameData.targetArray[gameData.sequenceNum].align = $('#questionAlign').val();
	gameData.targetArray[gameData.sequenceNum].top = questionTop;
	gameData.targetArray[gameData.sequenceNum].left = questionLeft;
	gameData.targetArray[gameData.sequenceNum].width = questionWidth;
	gameData.targetArray[gameData.sequenceNum].height = questionHeight;
	gameData.targetArray[gameData.sequenceNum].question = $('#questionText').val();
	gameData.targetArray[gameData.sequenceNum].color = $('#questionColor').val();
	gameData.targetArray[gameData.sequenceNum].audio = $('#questionAudio').val();
	
	//update XML
	$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find('category').text($('#category').val());
	
	$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('question').attr('type', $('#questiontype').val());
	
	if($('#questiontype').val() == 'text'){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('question').html('<![CDATA['+$('#questionText').val()+']]>');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('question').html($('#questionText').val());
	}
	
	if(isNaN(questionFontSize) || questionFontSize == ''){
		//not number
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('question').removeAttr('fontSize');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('question').attr('fontSize', questionFontSize);
	}
	
	if(isNaN(questionLineHeight) || questionLineHeight == ''){
		//not number
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('question').removeAttr('lineHeight');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('question').attr('lineHeight', questionLineHeight);
	}
	
	if(isNaN(questionTop) || questionTop == ''){
		//not number
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('question').removeAttr('top');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('question').attr('top', questionTop);
	}
	
	if(isNaN(questionLeft) || questionLeft == ''){
		//not number
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('question').removeAttr('left');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('question').attr('left', questionLeft);
	}
	
	if(isNaN(questionWidth) || questionWidth == ''){
		//not number
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('question').removeAttr('width');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('question').attr('width', questionWidth);
	}
	
	if(isNaN(questionHeight) || questionHeight == ''){
		//not number
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('question').removeAttr('height');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('question').attr('height', questionHeight);
	}
	
	if($('#questionAlign').val() == questionAlign){
		//not number
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('question').removeAttr('align');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('question').attr('align', $('#questionAlign').val());
	}
	
	if($('#questionAudio').val() == ''){
		//not number
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('question').removeAttr('audio');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('question').attr('audio', $('#questionAudio').val());
	}
	
	if($('#questionColor').val() == ''){
		//not number
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('question').removeAttr('color');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('question').attr('color', $('#questionColor').val());
	}
	
	loadEditQuestion(true);
}

/*!
 * 
 * UPDATE VIDEO - This is the function that runs to update video value
 * 
 */
function updateVideo(){
	if(gameData.targetArray[gameData.sequenceNum].videos.length <= 0){
		return;	
	}
	
	//update array
	var videoWidth = $('#videoWidth').val();
	videoWidth = videoWidth == 0 ? undefined : videoWidth;
	var videoHeight = $('#videoHeight').val();
	videoHeight = videoHeight == 0 ? undefined : videoHeight;
	var videoTop = $('#videoTop').val();
	videoTop = videoTop == 0 ? undefined : videoTop;
	var videoLeft = $('#videoLeft').val();
	videoLeft = videoLeft == 0 ? undefined : videoLeft;
	
	gameData.targetArray[gameData.sequenceNum].videos[edit.videoNum].src = $('#videoSrc').val();
	gameData.targetArray[gameData.sequenceNum].videos[0].width = videoWidth;
	gameData.targetArray[gameData.sequenceNum].videos[0].height = videoHeight;
	gameData.targetArray[gameData.sequenceNum].videos[0].top = videoTop;
	gameData.targetArray[gameData.sequenceNum].videos[0].left = videoLeft;
	gameData.targetArray[gameData.sequenceNum].videos[0].autoplay = $('#videoAutoplay').val();
	gameData.targetArray[gameData.sequenceNum].videos[0].controls = $('#videoControls').val();
	
	gameData.targetArray[gameData.sequenceNum].videos[edit.videoNum].type = $('#videotype').val();
	
	//update XML
	if($(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos').length == 0){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).append('<videos/>');	
	}
	
	if($(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos video').length == 0){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos').append('<video/>');	
	}
	
	$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos video').eq(edit.videoNum).html($('#videoSrc').val());
	$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos video').eq(edit.videoNum).attr('type', $('#videotype').val());
	
	if(isNaN(videoLeft) || videoLeft==''){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos').eq(0).removeAttr('left');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos').eq(0).attr('left', videoLeft);
	}
	
	if(isNaN(videoTop) || videoTop==''){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos').eq(0).removeAttr('top');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos').eq(0).attr('top', videoTop);
	}
	
	if(isNaN(videoWidth) || videoWidth == ''){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos').eq(0).removeAttr('width');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos').eq(0).attr('width', videoWidth);
	}
	
	if(isNaN(videoHeight) || videoHeight == ''){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos').eq(0).removeAttr('height');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos').eq(0).attr('height', videoHeight);
	}
	
	$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos').eq(0).attr('autoplay', $('#videoAutoplay').val());
	$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos').eq(0).attr('controls', $('#videoControls').val());
	
	loadEditQuestion(true);
}

/*!
 * 
 * UPDATE ANSWERS - This is the function that runs to update answers value
 * 
 */
function updateAnswers(){
	if(gameData.targetArray[gameData.sequenceNum].answer.length <= 0){
		return;	
	}
	
	//update array
	gameData.targetArray[gameData.sequenceNum].correctAnswer = $('#correctAnswer').val();
	
	var answerFontSize = $('#answerFontSize').val();
	answerFontSize = answerFontSize == 0 ? undefined : answerFontSize;
	var answerLineHeight = $('#answerLineHeight').val();
	answerLineHeight = answerLineHeight == 0 ? undefined : answerLineHeight;
	var answerWidth = $('#answerWidth').val();
	answerWidth = answerWidth == 0 ? undefined : answerWidth;
	var answerHeight = $('#answerHeight').val();
	answerHeight = answerHeight == 0 ? undefined : answerHeight;
	var answerTop = $('#answerTop').val();
	answerTop = answerTop == 0 ? undefined : answerTop;
	var answerLeft = $('#answerLeft').val();
	answerLeft = answerLeft == 0 ? undefined : answerLeft;
	var answerOffsetTop = $('#answerOffsetTop').val();
	answerOffsetTop = answerOffsetTop == 0 ? undefined : answerOffsetTop;
	
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].submit = $('#answerSubmit').val();
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].type = $('#answertype').val();
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].text = $('#answerText').val();
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].fontSize = answerFontSize;
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].lineHeight = answerLineHeight;
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].align = $('#answerAlign').val();
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].width = answerWidth;
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].height = answerHeight;
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].top = answerTop;
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].left = answerLeft;
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].audio = $('#answerAudio').val();
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].color = $('#answerColor').val();
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].offsetTop = answerOffsetTop;
	
	//update XML
	if($(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers').length == 0){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).append('<answers/>');	
	}
	
	if($(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').length == 0){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers').append('<answer/>');	
	}
	
	$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers').attr('correctAnswer', $('#correctAnswer').val());
	
	if($('#answerSubmit').val() == 'true'){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).attr('submit', $('#answerSubmit').val());
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).removeAttr('submit');
	}
	
	$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).attr('type', $('#answertype').val());
	if($('#answertype').val() == 'text'){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).html('<![CDATA['+$('#answerText').val()+']]>');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).html($('#answerText').val());
	}
	
	if(isNaN(answerFontSize) || answerFontSize==''){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).removeAttr('fontSize');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).attr('fontSize', answerFontSize);
	}
	
	if(isNaN(answerLineHeight) || answerLineHeight==''){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).removeAttr('lineHeight');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).attr('lineHeight', answerLineHeight);
	}
	
	if(isNaN(answerLeft) || answerLeft==''){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).removeAttr('left');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).attr('left', answerLeft);
	}
	
	if(isNaN(answerTop) || answerTop==''){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).removeAttr('top');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).attr('top', answerTop);
	}
	
	if(isNaN(answerWidth) || answerWidth == ''){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).removeAttr('width');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).attr('width', answerWidth);
	}
	
	if(isNaN(answerHeight) || answerHeight == ''){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).removeAttr('height');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).attr('height', answerHeight);
	}
	
	if($('#answerAlign').val() == answerAlign){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).removeAttr('align');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).attr('align', $('#answerAlign').val());
	}
	
	if($('#answerAudio').val() == ''){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).removeAttr('audio');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).attr('audio', $('#answerAudio').val());
	}
	
	if($('#answerColor').val() == ''){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).removeAttr('color');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).attr('color', $('#answerColor').val());
	}
	
	if($('#answerOffsetTop').val() == ''){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).removeAttr('offsetTop');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).attr('offsetTop', $('#answerOffsetTop').val());
	}
	
	loadEditQuestion(true);
}

/*!
 * 
 * UPDATE INPUTS - This is the function that runs to update inputs value
 * 
 */
function updateInputs(){
	if(gameData.targetArray[gameData.sequenceNum].input.length <= 0){
		return;	
	}
	
	//update array
	var inputFontSize = $('#inputFontSize').val();
	inputFontSize = inputFontSize == 0 ? undefined : inputFontSize;
	var inputLineHeight = $('#inputLineHeight').val();
	inputLineHeight = inputLineHeight == 0 ? undefined : inputLineHeight;
	var inputWidth = $('#inputWidth').val();
	inputWidth = inputWidth == 0 ? undefined : inputWidth;
	var inputHeight = $('#inputHeight').val();
	inputHeight = inputHeight == 0 ? undefined : inputHeight;
	var inputTop = $('#inputTop').val();
	inputTop = inputTop == 0 ? undefined : inputTop;
	var inputLeft = $('#inputLeft').val();
	inputLeft = inputLeft == 0 ? undefined : inputLeft;
	var inputOffsetTop = $('#inputOffsetTop').val();
	inputOffsetTop = inputOffsetTop == 0 ? undefined : inputOffsetTop;
	
	gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].correctAnswer = $('#correctInput').val();
	gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].submit = $('#inputSubmit').val();
	gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].type = $('#inputtype').val();
	gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].text = $('#inputText').val();
	gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].fontSize = inputFontSize;
	gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].lineHeight = inputLineHeight;
	gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].align = $('#inputAlign').val();
	gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].width = inputWidth;
	gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].height = inputHeight;
	gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].top = inputTop;
	gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].left = inputLeft;
	gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].audio = $('#inputAudio').val();
	gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].color = $('#inputColor').val();
	gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].background = $('#inputBackground').val();
	gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].offsetTop = inputOffsetTop;
	
	//update XML
	if($(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs').length == 0){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).append('<inputs/>');	
	}
	
	if($(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').length == 0){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs').append('<input/>');	
	}
	
	$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).attr('type', $('#inputtype').val());
	if($('#inputSubmit').val() == 'true'){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).attr('submit', $('#inputSubmit').val());			
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).removeAttr('submit');
	}
	
	if($('#inputtype').val() == 'blank'){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').attr('correctAnswer', $('#correctInput').val());
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).html('<![CDATA['+$('#inputText').val()+']]>');
	}else if($('#inputtype').val() == 'text'){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).html('<![CDATA['+$('#inputText').val()+']]>');
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).removeAttr('correctAnswer');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).html($('#inputText').val());
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).removeAttr('correctAnswer');
	}
	
	if(isNaN(inputFontSize) || inputFontSize==''){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).removeAttr('fontSize');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).attr('fontSize', inputFontSize);
	}
	
	if(isNaN(inputLineHeight) || inputLineHeight==''){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).removeAttr('lineHeight');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).attr('lineHeight', inputLineHeight);
	}
	
	if(isNaN(inputLeft) || inputLeft==''){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).removeAttr('left');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).attr('left', inputLeft);
	}
	
	if(isNaN(inputTop) || inputTop==''){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).removeAttr('top');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).attr('top', inputTop);
	}
	
	if(isNaN(inputWidth) || inputWidth == ''){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).removeAttr('width');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).attr('width', inputWidth);
	}
	
	if(isNaN(inputHeight) || inputHeight == ''){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).removeAttr('height');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).attr('height', inputHeight);
	}
	
	if($('#inputAlign').val() == inputAlign){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).removeAttr('align');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).attr('align', $('#inputAlign').val());
	}
	
	if($('#inputAudio').val() == ''){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).removeAttr('audio');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).attr('audio', $('#inputAudio').val());
	}
	
	if($('#inputColor').val() == ''){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).removeAttr('color');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).attr('color', $('#inputColor').val());
	}
	
	if($('#inputBackground').val() == ''){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).removeAttr('background');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).attr('background', $('#inputBackground').val());
	}
	
	if($('#inputOffsetTop').val() == ''){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).removeAttr('offsetTop');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).attr('offsetTop', $('#inputOffsetTop').val());
	}
	
	loadEditQuestion(true);
}

/*!
 * 
 * UPDATE EXPLANATION - This is the function that runs to update explanation value
 * 
 */
function updateExplanation(){
	//update array
	var explanationFontSize = $('#explanationFontSize').val();
	explanationFontSize = explanationFontSize == 0 ? undefined : explanationFontSize;
	var explanationLineHeight = $('#explanationLineHeight').val();
	explanationLineHeight = explanationLineHeight == 0 ? undefined : explanationLineHeight;
	var explanationTop = $('#explanationTop').val();
	explanationTop = explanationTop == 0 ? undefined : explanationTop;
	var explanationLeft = $('#explanationLeft').val();
	explanationLeft = explanationLeft == 0 ? undefined : explanationLeft;
	var explanationWidth = $('#explanationWidth').val();
	explanationWidth = explanationWidth == 0 ? undefined : explanationWidth;
	var explanationHeight = $('#explanationHeight').val();
	explanationHeight = explanationHeight == 0 ? undefined : explanationHeight;
	
	gameData.targetArray[gameData.sequenceNum].explanationType = $('#explanationtype').val();
	gameData.targetArray[gameData.sequenceNum].explanationFontSize = explanationFontSize;
	gameData.targetArray[gameData.sequenceNum].explanationLineHeight = explanationLineHeight;
	gameData.targetArray[gameData.sequenceNum].explanationAlign = $('#explanationAlign').val();
	gameData.targetArray[gameData.sequenceNum].explanationTop = explanationTop;
	gameData.targetArray[gameData.sequenceNum].explanationLeft = explanationLeft;
	gameData.targetArray[gameData.sequenceNum].explanationWidth = explanationWidth;
	gameData.targetArray[gameData.sequenceNum].explanationHeight = explanationHeight;
	gameData.targetArray[gameData.sequenceNum].explanation = $('#explanationText').val();
	gameData.targetArray[gameData.sequenceNum].explanationColor = $('#explanationColor').val();
	gameData.targetArray[gameData.sequenceNum].explanationAudio = $('#explanationAudio').val();
	
	if($(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('explanation').length == 0){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).append('<explanation />');	
	}
	
	//update XML
	$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('explanation').attr('type', $('#explanationtype').val());
	
	if($('#explanationtype').val() == 'text'){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('explanation').html('<![CDATA['+$('#explanationText').val()+']]>');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('explanation').html($('#explanationText').val());
	}
	
	if(isNaN(explanationFontSize) || explanationFontSize == ''){
		//not number
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('explanation').removeAttr('fontSize');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('explanation').attr('fontSize', explanationFontSize);
	}
	
	if(isNaN(explanationLineHeight) || explanationLineHeight == ''){
		//not number
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('explanation').removeAttr('lineHeight');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('explanation').attr('lineHeight', explanationLineHeight);
	}
	
	if(isNaN(explanationTop) || explanationTop == ''){
		//not number
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('explanation').removeAttr('top');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('explanation').attr('top', explanationTop);
	}
	
	if(isNaN(explanationLeft) || explanationLeft == ''){
		//not number
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('explanation').removeAttr('left');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('explanation').attr('left', explanationLeft);
	}
	
	if(isNaN(explanationWidth) || explanationWidth == ''){
		//not number
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('explanation').removeAttr('width');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('explanation').attr('width', explanationWidth);
	}
	
	if(isNaN(explanationHeight) || explanationHeight == ''){
		//not number
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('explanation').removeAttr('height');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('explanation').attr('height', explanationHeight);
	}
	
	if($('#explanationAlign').val() == explanationAlign){
		//not number
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('explanation').removeAttr('align');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('explanation').attr('align', $('#explanationAlign').val());
	}
	
	if($('#explanationAudio').val() == ''){
		//not number
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('explanation').removeAttr('audio');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('explanation').attr('audio', $('#explanationAudio').val());
	}
	
	if($('#explanationColor').val() == ''){
		//not number
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('explanation').removeAttr('color');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('explanation').attr('color', $('#explanationColor').val());
	}
	
	loadEditQuestion(true);
}

/*!
 * 
 * GENERATE ARRAY - This is the function that runs to generate array
 * 
 */
function generateXML(){
	var xmlstr = edit.xmlFile.xml ? edit.xmlFile.xml : (new XMLSerializer()).serializeToString(edit.xmlFile);
	$('#outputXML').val(xmlstr);
}

function saveXML(pass){
	var xmlstr = edit.xmlFile.xml ? edit.xmlFile.xml : (new XMLSerializer()).serializeToString(edit.xmlFile);
	
	$.ajax({
		type: "POST",
		url: "save.php",
		data: {password:pass,
				data:xmlstr}
				
	}).done(function(o) {
		try {
			$.parseJSON(o);
		} catch (e) {
			alert('Error, file cannot save!');
		}
		
		var data = $.parseJSON(o);
		if (!data || data === null) {
			alert('Error, file cannot save!');
		}else{
			if(data.status==true){
				alert('File save successful!');
			}else{
				if(data.option==true){
					alert('Wrong password, file cannot save!');
				}else{
					alert('Save option disabled!');
				}
			}
		}
	});	
}

/*!
 * 
 * LOAD TEMPLATE XML - This is the function that runs to load template xml file
 * 
 */
function loadTemplateXML(src){
	$.ajax({
       url: src,
       type: "GET",
       dataType: "xml",
       success: function (result) {
			edit.templateFile = result;
			
			$('#templatelist').empty();
			$(edit.templateFile).find('item').each(function(index, element) {
				$('#templatelist').append($("<option/>", {
					value: index,
					text: $(element).find('landscape question').text()
				}));
            });
       }
	});
}

/*!
 * 
 * SWAP QUESTION - This is the function that runs to swap question
 * 
 */
function swapQuestion(con){
	var tmpLandscape = quesLandscape_arr[edit.sortNum];
	var tmpPortrait = quesPortrait_arr[edit.sortNum];
	var tmpXML = $(edit.xmlFile).find('item').eq(edit.sortNum).clone();
	
	edit.sortNum = Number(edit.sortNum);
	if(con){
		if(edit.sortNum+1 < quesLandscape_arr.length){
			quesLandscape_arr[edit.sortNum] = quesLandscape_arr[edit.sortNum+1];
			quesLandscape_arr[edit.sortNum+1] = tmpLandscape;
			
			quesPortrait_arr[edit.sortNum] = quesPortrait_arr[edit.sortNum+1];
			quesPortrait_arr[edit.sortNum+1] = tmpPortrait;
			
			$(edit.xmlFile).find('item').eq(edit.sortNum).replaceWith($(edit.xmlFile).find('item').eq(edit.sortNum+1).clone());
			$(edit.xmlFile).find('item').eq(edit.sortNum+1).replaceWith(tmpXML);
			
			edit.sortNum++;
		}
	}else{
		if(edit.sortNum-1 >= 0){
			quesLandscape_arr[edit.sortNum] = quesLandscape_arr[edit.sortNum-1];
			quesLandscape_arr[edit.sortNum-1] = tmpLandscape;
			
			quesPortrait_arr[edit.sortNum] = quesPortrait_arr[edit.sortNum-1];
			quesPortrait_arr[edit.sortNum-1] = tmpPortrait;
			
			$(edit.xmlFile).find('item').eq(edit.sortNum).replaceWith($(edit.xmlFile).find('item').eq(edit.sortNum-1).clone());
			$(edit.xmlFile).find('item').eq(edit.sortNum-1).replaceWith(tmpXML);
			
			edit.sortNum--;
		}
	}
	
	filterCategoryQuestion();
	buildQuestionList();
	loadEditQuestion(false);
}

/*!
 * 
 * BUILD QUESTION LIST - This is the function that runs to build question list
 * 
 */
function buildQuestionList(){
	$('#questionslist').empty();
	$('#sortquestionslist').empty();
	
	for(n=0;n<quesLandscape_arr.length;n++){
		$('#questionslist').append($("<option/>", {
			value: n,
			text: 'Question '+(n+1)
		}));
		$('#sortquestionslist').append($("<option/>", {
			value: n,
			text: (n+1)+' : '+quesLandscape_arr[n].question
		}));
	}
	
	$('#questionslist').prop("selectedIndex", gameData.sequenceNum);	
}