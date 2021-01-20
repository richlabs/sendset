////////////////////////////////////////////////////////////
// MAIN
////////////////////////////////////////////////////////////

/*!
 * 
 * START BUILD GAME - This is the function that runs build game
 * 
 */
function initMain(){
	buildGameButton();
	buildGameStyle();
	buildScoreboard();
	
	goPage('main');
	loadXML('questions.xml');
}

var windowW=windowH=0;
var modeW=modeH=0;
var scalePercent=0;
var offset = {x:0, y:0, left:0, top:0};

/*!
 * 
 * GAME RESIZE - This is the function that runs to resize and centralize the game
 * 
 */
function resizeGameFunc(){
	setTimeout(function() {
		windowW = window.innerWidth;
		windowH = window.innerHeight;
		detectScreenSize();
		
		var newW = modeW;
		var newH = modeH;
		scalePercent = windowW/modeW;
		
		if(!$.editor.enable){
			if(detectScreenSize()){
				gameData.mode = 'portrait';		
			}else{
				gameData.mode = 'landscape';	
			}
			
			if(fitToScreen){
				newW = windowW;	
				newH = windowH;
				
				if(maintainAspectRatio){
					if(newW > modeW){
						scalePercent = newW/modeW;
						if((modeH*scalePercent)>newH){
							scalePercent = newH/modeH;
						}	
					}
					
					newW = ((modeW)*scalePercent);
					newH = ((modeH)*scalePercent);
				}
			}else{
				scalePercent = scalePercent > 1 ? 1 : scalePercent;
				newW = 	modeW > windowW ? windowW : modeW;
				newH = 	modeH > windowH ? windowH : modeH;
				
				if(maintainAspectRatio){
					if(newW > modeW){
						scalePercent = newW/modeW;
						if((modeH*scalePercent)>newH){
							scalePercent = newH/modeH;
						}	
					}
					
					newW = ((modeW)*scalePercent);
					newH = ((modeH)*scalePercent);
				}
			}
			
			$('#mainHolder').css('width', newW);
			$('#mainHolder').css('height', newH);
			
			$('#mainHolder').css('left', (windowW/2)-(newW/2));
			$('#mainHolder').css('top', (windowH/2)-(newH/2));
		}else{
			if(gameData.mode == 'portrait'){
				newW = portraitW;
				newH = portraitH;
				scalePercent = newW/portraitW;
			}else{
				scalePercent = 1;	
			}
			
			$('#mainHolder').css('width', newW);
			$('#mainHolder').css('height', newH);
			
			$('#mainHolder').css('left', 320);
			$('#mainHolder').css('top', 0);	
		}
		
		resizeGameDetail();
	}, 300);
}

/*!
 * 
 * DETECT SCREEN SIZE - This is the function that runs to detect screen size
 * 
 */
function detectScreenSize(){
	if($.browser.mobile || isTablet){
		if (window.matchMedia("(orientation: landscape)").matches) {
			modeW = stageW;
			modeH = stageH;
			return false;
		}else{
			modeW = portraitW;
			modeH = portraitH;
			return true;
		}
	}else{
		modeW = stageW;
		modeH = stageH;
		return false;
		/*if($(window).width() <= 768){
			return true;	
		}else{
			return false;	
		}*/
	}
}