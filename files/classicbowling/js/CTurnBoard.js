function CTurnBoard(iXPos, iYPos, oSprite, bLast, oParentContainer) {

    var _oTurnBoard;
    var _oContainer;
    var _aText;
    var _oParentContainer = oParentContainer;

    this._init = function (iXPos, iYPos, bLast, oSprite) {
        _oContainer = new createjs.Container();
        _oContainer.x = iXPos;
        _oContainer.y = iYPos;
        _oParentContainer.addChild(_oContainer);

        _aText = new Array();

        var oData = {
            images: [oSprite],
            // width, height & registration point of each sprite
            frames: {width: oSprite.width / 2, height: oSprite.height, regX: 0, regY: 0},
            animations: {on: [0], off: [1]}
        };

        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oTurnBoard = createSprite(oSpriteSheet, "off", 0, 0, oSprite.width / 2, oSprite.height);

        _oContainer.addChild(_oTurnBoard);

        if (!bLast) {
            _oContainer.addChild(_aText[0] = this.createText(19, 21, "0", 30, "center"));
            _oContainer.addChild(_aText[1] = this.createText(54, 21, "", 30, "center"));
            _oContainer.addChild(_aText[2] = this.createText(63, 56, "0", 30, "right"));
        } else {
            _oContainer.addChild(_aText[0] = this.createText(13, 21, "0", 30, "center"));
            _oContainer.addChild(_aText[1] = this.createText(35, 21, "", 30, "center"));
            _oContainer.addChild(_aText[2] = this.createText(58, 21, "", 30, "center"));
            _oContainer.addChild(_aText[3] = this.createText(63, 56, "0", 30, "right"));
        }

    };

    this.changeState = function (szState) {
        _oTurnBoard.gotoAndStop(szState);
    };

    this.refreshTextByID = function (iID, szText) {
        _aText[iID].text = szText;
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

    this._init(iXPos, iYPos, bLast, oSprite);

    return this;
}
