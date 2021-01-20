function CPayTablePanel(){
    var _aNumSymbolComboText;
    var _aWinComboText;
    var _oWildText;
    var _oBonusText;
    var _oBg;
    var _oContainer;
    
    this._init = function(){
        _oContainer = new createjs.Container();
        
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('paytable'));
        _oContainer.addChild(_oBg);
        
        //LIST OF COMBO TEXT
        _aNumSymbolComboText = new Array();
        var i;
        var iXPos = 450;
        var iYPos = 106;
        _aNumSymbolComboText[0] = new Array();
        for(i=0;i<3;i++){
            var oText = new createjs.Text("X"+(5-i),"bold 22px "+FONT_GAME, "#ffffff");
            oText.textAlign = "center";
            oText.shadow = new createjs.Shadow("#000", 1, 1, 2);
            oText.x = iXPos;
            oText.y = iYPos;
            oText.textBaseline = "alphabetic";
            _oContainer.addChild(oText);
            
            _aNumSymbolComboText[0][i] = oText;
            
            iYPos += 30;
        }
        
        iXPos = 660;
        iYPos = 106;
        _aNumSymbolComboText[1] = new Array();
        for(i=0;i<3;i++){
            var oText = new createjs.Text("X"+(5-i),"bold 22px "+FONT_GAME, "#ffffff");
            oText.textAlign = "center";
            oText.shadow = new createjs.Shadow("#000", 1, 1, 2);
            oText.x = iXPos;
            oText.y = iYPos;
            oText.textBaseline = "alphabetic";
            _oContainer.addChild(oText);
            
            _aNumSymbolComboText[1][i] = oText;
            
            iYPos += 30;
        }
        
        iXPos = 850;
        iYPos = 106;
        _aNumSymbolComboText[2] = new Array();
        for(i=0;i<3;i++){
            var oText = new createjs.Text("X"+(5-i),"bold 22px "+FONT_GAME, "#ffffff");
            oText.textAlign = "center";
            oText.shadow = new createjs.Shadow("#000", 1, 1, 2);
            oText.x = iXPos;
            oText.y = iYPos;
            oText.textBaseline = "alphabetic";
            _oContainer.addChild(oText);
            
            _aNumSymbolComboText[2][i] = oText;
            
            iYPos += 30;
        }
        
        iXPos = 1060;
        iYPos = 102;
        _aNumSymbolComboText[3] = new Array();
        for(i=0;i<4;i++){
            var oText = new createjs.Text("X"+(5-i),"bold 21px "+FONT_GAME, "#ffffff");
            oText.textAlign = "center";
            oText.shadow = new createjs.Shadow("#000", 1, 1, 2);
            oText.x = iXPos;
            oText.y = iYPos;
            oText.textBaseline = "alphabetic";
            _oContainer.addChild(oText);
            
            _aNumSymbolComboText[3][i] = oText;
            
            iYPos += 22;
        }
        
        iXPos = 438;
        iYPos = 194;
        _aNumSymbolComboText[4] = new Array();
        for(i=0;i<4;i++){
            var oText = new createjs.Text("X"+(5-i),"bold 21px "+FONT_GAME, "#ffffff");
            oText.textAlign = "center";
            oText.shadow = new createjs.Shadow("#000", 1, 1, 2);
            oText.x = iXPos;
            oText.y = iYPos;
            oText.textBaseline = "alphabetic";
            _oContainer.addChild(oText);
            
            _aNumSymbolComboText[4][i] = oText;
            
            iYPos += 22;
        }
        
        iXPos = 660;
        iYPos = 194;
        _aNumSymbolComboText[5] = new Array();
        for(i=0;i<4;i++){
            var oText = new createjs.Text("X"+(5-i),"bold 21px "+FONT_GAME, "#ffffff");
            oText.textAlign = "center";
            oText.shadow = new createjs.Shadow("#000", 1, 1, 2);
            oText.x = iXPos;
            oText.y = iYPos;
            oText.textBaseline = "alphabetic";
            _oContainer.addChild(oText);
            
            _aNumSymbolComboText[5][i] = oText;
            
            iYPos += 22;
        }
        
        iXPos = 850;
        iYPos = 194;
        _aNumSymbolComboText[6] = new Array();
        for(i=0;i<4;i++){
            var oText = new createjs.Text("X"+(5-i),"bold 21px "+FONT_GAME, "#ffffff");
            oText.textAlign = "center";
            oText.shadow = new createjs.Shadow("#000", 1, 1, 2);
            oText.x = iXPos;
            oText.y = iYPos;
            oText.textBaseline = "alphabetic";
            _oContainer.addChild(oText);
            
            _aNumSymbolComboText[6][i] = oText;
            
            iYPos += 22;
        }
        
        iXPos = 1060;
        iYPos = 194;
        _aNumSymbolComboText[7] = new Array();
        for(i=0;i<4;i++){
            var oText = new createjs.Text("X"+(5-i),"bold 21px "+FONT_GAME, "#ffffff");
            oText.textAlign = "center";
            oText.shadow = new createjs.Shadow("#000", 1, 1, 2);
            oText.x = iXPos;
            oText.y = iYPos;
            oText.textBaseline = "alphabetic";
            _oContainer.addChild(oText);
            
            _aNumSymbolComboText[7][i] = oText;
            
            iYPos += 22;
        }
        
        //LIST OF MONEY WIN
        _aWinComboText = new Array();
        
        iXPos = 480;
        iYPos = 106;
        _aWinComboText[0] = new Array();
        for(i=0;i<3;i++){
            var oText = new createjs.Text(s_aSymbolWin[0][4-i],"22px "+FONT_GAME, "#ffff00");
            oText.textAlign = "left";
            oText.shadow = new createjs.Shadow("#000", 1, 1, 2);
            oText.x = iXPos;
            oText.y = iYPos;
            oText.textBaseline = "alphabetic";
            _oContainer.addChild(oText);
            
            _aWinComboText[0][i] = oText;
            
            iYPos += 30;
        }
        
        iXPos = 686;
        iYPos = 106;
        _aWinComboText[1] = new Array();
        for(i=0;i<3;i++){
            var oText = new createjs.Text(s_aSymbolWin[1][4-i],"22px "+FONT_GAME, "#ffff00");
            oText.textAlign = "left";
            oText.shadow = new createjs.Shadow("#000", 1, 1, 2);
            oText.x = iXPos;
            oText.y = iYPos;
            oText.textBaseline = "alphabetic";
            _oContainer.addChild(oText);
            
            _aWinComboText[1][i] = oText;
            
            iYPos += 30;
        }
        
        iXPos = 880;
        iYPos = 106;
        _aWinComboText[2] = new Array();
        for(i=0;i<3;i++){
            var oText = new createjs.Text(s_aSymbolWin[2][4-i],"22px "+FONT_GAME, "#ffff00");
            oText.textAlign = "left";
            oText.shadow = new createjs.Shadow("#000", 1, 1, 2);
            oText.x = iXPos;
            oText.y = iYPos;
            oText.textBaseline = "alphabetic";
            _oContainer.addChild(oText);
            
            _aWinComboText[2][i] = oText;
            
            iYPos += 30;
        }
       
        iXPos = 1080;
        iYPos = 102;
        _aWinComboText[3] = new Array();
        for(i=0;i<4;i++){
            var oText = new createjs.Text(s_aSymbolWin[3][4-i],"21px "+FONT_GAME, "#ffff00");
            oText.textAlign = "left";
            oText.shadow = new createjs.Shadow("#000", 1, 1, 2);
            oText.x = iXPos;
            oText.y = iYPos;
            oText.textBaseline = "alphabetic";
            _oContainer.addChild(oText);
            
            _aWinComboText[3][i] = oText;
            
            iYPos += 22;
        }
         
        iXPos = 480;
        iYPos = 194;
        _aWinComboText[4] = new Array();
        for(i=0;i<4;i++){
            var oText = new createjs.Text(s_aSymbolWin[4][4-i],"21px "+FONT_GAME, "#ffff00");
            oText.textAlign = "left";
            oText.shadow = new createjs.Shadow("#000", 1, 1, 2);
            oText.x = iXPos;
            oText.y = iYPos;
            oText.textBaseline = "alphabetic";
            _oContainer.addChild(oText);
            
            _aWinComboText[4][i] = oText;
            
            iYPos += 22;
        }
        
        iXPos = 685;
        iYPos = 194;
        _aWinComboText[5] = new Array();
        for(i=0;i<4;i++){
            var oText = new createjs.Text(s_aSymbolWin[5][4-i],"21px "+FONT_GAME, "#ffff00");
            oText.textAlign = "left";
            oText.shadow = new createjs.Shadow("#000", 1, 1, 2);
            oText.x = iXPos;
            oText.y = iYPos;
            oText.textBaseline = "alphabetic";
            _oContainer.addChild(oText);
            
            _aWinComboText[5][i] = oText;
            
            iYPos += 22;
        }
        
        iXPos = 880;
        iYPos = 194;
        _aWinComboText[6] = new Array();
        for(i=0;i<4;i++){
            var oText = new createjs.Text(s_aSymbolWin[6][4-i],"21px "+FONT_GAME, "#ffff00");
            oText.textAlign = "left";
            oText.shadow = new createjs.Shadow("#000", 1, 1, 2);
            oText.x = iXPos;
            oText.y = iYPos;
            oText.textBaseline = "alphabetic";
            _oContainer.addChild(oText);
            
            _aWinComboText[6][i] = oText;
            
            iYPos += 22;
        }
        
        iXPos = 1080;
        iYPos = 194;
        _aWinComboText[7] = new Array();
        for(i=0;i<4;i++){
            var oText = new createjs.Text(s_aSymbolWin[7][4-i],"21px "+FONT_GAME, "#ffff00");
            oText.textAlign = "left";
            oText.shadow = new createjs.Shadow("#000", 1, 1, 2);
            oText.x = iXPos;
            oText.y = iYPos;
            oText.textBaseline = "alphabetic";
            _oContainer.addChild(oText);
            
            _aWinComboText[7][i] = oText;
            
            iYPos += 22;
        }
        
        
        
        _oWildText = new createjs.Text(TEXT_HELP_WILD,"22px "+FONT_GAME, "#ffff00");
        _oWildText.shadow = new createjs.Shadow("#000", 2, 2, 2);
        _oWildText.textAlign = "center";
        _oWildText.lineHeight = 22;
        _oWildText.lineWidth = 200;
        _oWildText.x = 636;
        _oWildText.y = 286;
        _oContainer.addChild(_oWildText);
        
        _oBonusText = new createjs.Text(TEXT_HELP_BONUS,"22px "+FONT_GAME, "#ffff00");
        _oBonusText.shadow = new createjs.Shadow("#000", 2, 2, 2);
        _oBonusText.textAlign = "center";
        _oBonusText.lineHeight = 22;
        _oBonusText.lineWidth = 190;
        _oBonusText.x = 980;
        _oBonusText.y = 294;
        _oContainer.addChild(_oBonusText);
        
        _oContainer.visible = false;
        s_oStage.addChild(_oContainer);
        
        var oParent = this;
        _oContainer.on("pressup",function(){oParent._onExit()});
    };
    
    this.unload = function(){
        var oParent = this;
        _oContainer.off("pressup",function(){oParent._onExit()});
        
        s_oStage.removeChild(_oContainer);
        
        for(var i=0;i<_aNumSymbolComboText.length;i++){
            _oContainer.removeChild(_aNumSymbolComboText[i]);
        }
        
        for(var j=0;j<_aWinComboText.length;j++){
            _oContainer.removeChild(_aWinComboText[j]);
        }
        
    };
    
    this.show = function(){
        _oContainer.visible = true;
    };
    
    this.hide = function(){
        _oContainer.visible = false;
    };
    
    this.resetHighlightCombo = function(){
        for(var i=0;i<_aNumSymbolComboText.length;i++){
            for(var j=0;j<_aNumSymbolComboText[i].length;j++){
                _aNumSymbolComboText[i][j].color = "#ffffff";
                _aWinComboText[i][j].color = "#ffff00";
                createjs.Tween.removeTweens(_aWinComboText[i][j]);
                _aWinComboText[i][j].alpha = 1;
            }
        } 
    };
    
    this.highlightCombo = function(iSymbolValue,iNumCombo){
        if(iSymbolValue>8){
            return;
        }
        _aWinComboText[iSymbolValue-1][NUM_REELS-iNumCombo].color = "#ff0000";
        
        this.tweenAlpha(_aWinComboText[iSymbolValue-1][NUM_REELS-iNumCombo],0);
        
    };
    
    this.tweenAlpha = function(oText,iAlpha){
        var oParent = this;
        createjs.Tween.get(oText).to({alpha:iAlpha}, 200).call(function(){if(iAlpha === 1){
                                                                                    oParent.tweenAlpha(oText,0);
                                                                                }else{
                                                                                    oParent.tweenAlpha(oText,1);
                                                                                }
        });
    };
    
    this._onExit = function(){
        s_oGame.hidePayTable();
    };
    
    this.isVisible = function(){
        return _oContainer.visible;
    };
    
    this._init();
}