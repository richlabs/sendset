function CInterface() {
    var _pStartPosAudio;
    var _pStartPosExit;
    var _oButExit;
    var _oHelpPanel = null;
    var _oAudioToggle;
    var _oPause;
    var _oTurnsBoard;
    var _oTotalBoard;
    var _oContainerBoard;
    var _oEndPanel;
    var _oController = null;
    var _iYStartPos;

    this._init = function () {
        _oContainerBoard = new createjs.Container();
        _iYStartPos = _oContainerBoard.y = 161;
        _oContainerBoard.regY = (s_oSpriteLibrary.getSprite("monitor_strike_0").height + s_oSpriteLibrary.getSprite("turn_board").height);

        s_oStage.addChild(_oContainerBoard);

        _oTurnsBoard = new CTurnsBoard(TURNS_BOARD_POS.x, TURNS_BOARD_POS.y, _oContainerBoard);

        var oSpriteTotalBoard = s_oSpriteLibrary.getSprite("total_board");
        _oTotalBoard = new CTotalScoreBoard(_oTurnsBoard.getLastX(), TURNS_BOARD_POS.y, oSpriteTotalBoard, _oContainerBoard);


        _oController = new CController();

        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.height / 2) - 10, y: (oSprite.height / 2) + 10};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: _pStartPosExit.x - oSprite.height - 10, y: _pStartPosExit.y};
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.refreshButtonPos = function (iNewX, iNewY) {
        _oButExit.setPosition(_pStartPosExit.x - iNewX, iNewY + _pStartPosExit.y);

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, iNewY + _pStartPosAudio.y);
        }
        _oContainerBoard.x = iNewX;
        _oContainerBoard.y = _iYStartPos - (iNewX) * (0.5 - 1) + 1;
        _oContainerBoard.scaleX = _oContainerBoard.scaleY = ((iNewX * 0.5) / EDGEBOARD_X) * (BOARD_SCALE_F - 1) + 1;

        s_oGame.refreshPos(iNewX, iNewY);

        if (_oController !== null) {
            var oPosLeft = _oController.getStartPositionControlLeft();
            _oController.setPositionControlLeft(oPosLeft.x + iNewX, oPosLeft.y - iNewY);

            var oPosRight = _oController.getStartPositionControlRight();
            _oController.setPositionControlRight(oPosRight.x - iNewX, oPosRight.y - iNewY);
        }

    };

    this.unload = function () {
        _oButExit.unload();
        _oButExit = null;

        this.onExitFromHelp();

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }

        s_oInterface = null;
    };

    this.getContainerBoard = function () {
        return _oContainerBoard;
    };

    this.onExitFromHelp = function () {
        if (_oHelpPanel !== null) {
            _oHelpPanel.unload();
            _oHelpPanel = null;
        }
    };

    this.createHelpPanel = function () {
        _oHelpPanel = new CHelpPanel(0, 0, s_oSpriteLibrary.getSprite("bg_help"));
    };

    this.createEndPanel = function (iScore) {
        _oEndPanel = new CEndPanel(s_oSpriteLibrary.getSprite("msg_box"));
        _oEndPanel.show(iScore);
    };

    this.resetTurnsBoard = function () {
        _oTurnsBoard.resetAllTurnBoard();
    };

    this.refreshTurnsBoard = function (iID, iTurn, iScore, iPinDown, bLastStage) {
        var oTurnBoard = _oTurnsBoard.getTurnBoard(iID);
        if (iTurn !== null) {
            oTurnBoard.refreshTextByID(iTurn - 1, iPinDown);
        }
        if (!bLastStage) {
            oTurnBoard.refreshTextByID(2, iScore);
        } else {
            oTurnBoard.refreshTextByID(3, iScore);
        }
    };

    this.refresTotalBoard = function (iScore) {
        _oTotalBoard.refreshText(iScore);
    };

    this.setStateTurnBoard = function (iID, szState) {
        _oTurnsBoard.stateTurnBoard(iID, szState);
    };

    this._onAudioToggle = function () {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this._onExit = function () {
        var _oAreYouSure = new CAreYouSurePanel(s_oStage);
        _oAreYouSure.show();
    };

    this.unloadPause = function () {
        _oPause.unload();
        _oPause = null;
    };

    this.dirArrowsVisibility = function (bVal) {
        if (_oController !== null) {
            _oController.arrowVisibility(bVal);
        }
    };

    this.onButPauseRelease = function () {
        playSound("click", 1, 0);
        _oPause = new CPause();
    };

    s_oInterface = this;

    this._init();

    return this;
}

var s_oInterface = null;