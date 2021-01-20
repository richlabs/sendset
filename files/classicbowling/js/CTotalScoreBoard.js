function CTotalScoreBoard(iXPos, iYPos, oSprite, oParentContainer) {

    var _oTurnBoard;
    var _oContainer;
    var _oTextTotal;
    var _oTextScore;
    var _oParentContainer = oParentContainer;

    this._init = function (iXPos, iYPos, oSprite) {

        _oContainer = new createjs.Container();
        _oContainer.x = iXPos;
        _oContainer.y = iYPos;
        _oParentContainer.addChild(_oContainer);

        _oTurnBoard = createBitmap(oSprite);

        _oContainer.regY = oSprite.height;

        _oContainer.addChild(_oTurnBoard);

        _oContainer.addChild(_oTextTotal = this.createText(oSprite.width * 0.5, 17, TEXT_TOTAL, 18, "center"));
        _oContainer.addChild(_oTextScore = this.createText(oSprite.width * 0.5, oSprite.height * 0.70, "0", 30, "center"));

    };

    this.refreshText = function (szText) {
        _oTextScore.text = szText;
    };

    this.createText = function (iX, iY, szText, iSize, szTextAlign) {
        var oText = new createjs.Text(szText, iSize + "px " + FONT_GAME, "#ffffff");
        oText.textAlign = szTextAlign;
        oText.textBaseline = "middle";
        oText.x = iX;
        oText.y = iY;

        return oText;
    };

    this.unload = function () {
        _oParentContainer.removeChild(_oContainer);
    };

    this.setVisible = function (bVisible) {
        _oContainer.visible = bVisible;
    };

    this._init(iXPos, iYPos, oSprite);

    return this;
}
