function CTurnsBoard(iX, iY, oParentContainer) {

    var _pStartPosContainer;
    var _oParentContainer = oParentContainer;
    var _oContainer;
    var _aTurnBoard;
    var _fScaleStart = 1;
    var _iLastX;

    this._init = function (iX, iY) {
        _pStartPosContainer = {x: iX, y: iY};

        _oContainer = new createjs.Container();
        _oContainer.x = _pStartPosContainer.x;
        _oContainer.y = _pStartPosContainer.y;

        _oParentContainer.addChild(_oContainer);

        _aTurnBoard = new Array();

        var iX = 4;

        var oSpriteTurnBoard = s_oSpriteLibrary.getSprite("turn_board");
        var oSpriteLastTurnBoard = s_oSpriteLibrary.getSprite("last_turn_board");
        _oContainer.regY = oSpriteTurnBoard.height;
        for (var i = 0; i < LAUNCH_TURN - 1; i++) {
            _aTurnBoard.push(new CTurnBoard(iX, 0, oSpriteTurnBoard, false, _oContainer));
            iX += oSpriteTurnBoard.width * 0.5;
        }
        _aTurnBoard.push(new CTurnBoard(iX, 0, oSpriteLastTurnBoard, true, _oContainer));
        iX += oSpriteTurnBoard.width * 0.5;

        _iLastX = iX;
        _aTurnBoard[0].changeState("on");
    };

    this.getTurnBoard = function (iID) {
        return _aTurnBoard[iID];
    };

    this.getStartPos = function () {
        return _pStartPosContainer;
    };

    this.getLastX = function () {
        return _iLastX;
    };

    this.setPosition = function (iX, iY) {//responsive
        _oContainer.x = iX;
        _oContainer.y = iY;
    };

    this.stateTurnBoard = function (iID, szState) {
        _aTurnBoard[iID].changeState(szState);
    };

    this.scaleFactor = function (fScaleFactor) {
        _oContainer.scaleX = _oContainer.scaleY = ((fScaleFactor * 0.5) / EDGEBOARD_X) * (TURNSBOARD_SCALE_F - _fScaleStart) + _fScaleStart;
    };

    this.unload = function () {
        _oParentContainer.removeChild(_oContainer);
    };

    this._init(iX, iY);

    return this;
}