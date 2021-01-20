function CAnimMonitor(iX, iY, oParentContainer) {
    var _pStartPos;
    var _aMonitorStrike = new Array();
    var _aMonitorSpare = new Array();
    var _aMonitorGutter = new Array();
    var _oPixelTiling;
    var _oParentContainer = oParentContainer;
    var _oContainer;
    var _oContainerStrike;
    var _oContainerSpare;
    var _oContainerGutter;
    var _fScaleStart = 1;
    var _iAnimMonitor = 0;
    var _fBuffer = 0;

    this._init = function (iX, iY) {
        _pStartPos = {x: iX, y: iY};
        _oContainer = new createjs.Container();
        _oContainer.x = _pStartPos.x;
        _oContainer.y = _pStartPos.y;
        _oParentContainer.addChild(_oContainer);

        _oContainerStrike = new createjs.Container();
        _oContainer.addChild(_oContainerStrike);

        _oContainerStrike.visible = false;

        _oContainerSpare = new createjs.Container();
        _oContainer.addChild(_oContainerSpare);

        _oContainerSpare.visible = false;

        _oContainerGutter = new createjs.Container();
        _oContainer.addChild(_oContainerGutter);

        _oContainerGutter.visible = false;

        var iX = 0;
        var iY = 0;

        var oSpritePixel = s_oSpriteLibrary.getSprite("pattern_monitor");

        for (var i = 0; i < NUM_SPRITE_MONITOR; i++) {
            _aMonitorStrike.push(createBitmap(s_oSpriteLibrary.getSprite("monitor_strike_" + i)));
            _aMonitorStrike[i].visible = false;
            _oContainerStrike.addChild(_aMonitorStrike[i]);

            _aMonitorSpare.push(createBitmap(s_oSpriteLibrary.getSprite("monitor_spare_" + i)));
            _aMonitorSpare[i].visible = false;
            _oContainerSpare.addChild(_aMonitorSpare[i]);

            _aMonitorGutter.push(createBitmap(s_oSpriteLibrary.getSprite("monitor_gutterball_" + i)));
            _aMonitorGutter[i].visible = false;
            _oContainerGutter.addChild(_aMonitorGutter[i]);
        }

        _aMonitorStrike[0].visible = true;
        _aMonitorSpare[0].visible = true;
        _aMonitorGutter[0].visible = true;

        var matTiling = new createjs.Matrix2D();

        matTiling.a = matTiling.d = 0.16;

        _oPixelTiling = new createjs.Shape();
        _oPixelTiling.graphics.beginBitmapFill(oSpritePixel, 'repeat', matTiling).drawRect(0, 0, 790, 88);
        _oPixelTiling.y = 1;
        _oPixelTiling.alpha = 0.65;

        _oContainer.addChild(_oPixelTiling);

        _oContainer.regY = s_oSpriteLibrary.getSprite("monitor_strike_0").height;
    };

    this.setPosition = function (iX, iY) {
        _oContainer.x = iX;
        _oContainer.y = iY;
    };

    this.getStartPos = function () {
        return _pStartPos;
    };

    this.setVisibleMonitorStrike = function (bVal) {
        _oContainerStrike.visible = bVal;
    };

    this.setVisibleMonitorSpare = function (bVal) {
        _oContainerSpare.visible = bVal;
    };

    this.setVisibleMonitorGutter = function (bVal) {
        _oContainerGutter.visible = bVal;
    };

    this.viewMonitor = function (aMonitor, iFrame) {
        aMonitor[iFrame].visible = true;
    };

    this.hideMonitor = function (aMonitor, iFrame) {
        aMonitor[iFrame].visible = false;
    };

    this.getStrikeArray = function () {
        return _aMonitorStrike;
    };

    this.getSpareArray = function () {
        return _aMonitorSpare;
    };

    this.getGutterArray = function () {
        return _aMonitorGutter;
    };

    this.scaleFactor = function (fScaleFactor) {
        _oContainer.scaleX = _oContainer.scaleY = ((fScaleFactor * 0.5) / EDGEBOARD_X) * (ANIM_MONITOR_SCALE_F - _fScaleStart) + _fScaleStart;
    };

    this.disableRunningMonitor = function () {
        _oContainerStrike.visible = false;
        _oContainerSpare.visible = false;
        _oContainerGutter.visible = false;
    };

    this.animMonitor = function (aMonitor) {
        _fBuffer += s_iTimeElaps;
        if (_fBuffer > BUFFER_ANIM_MONITOR) {
            this.hideMonitor(aMonitor, _iAnimMonitor);
            if (_iAnimMonitor + 1 < NUM_SPRITE_MONITOR) {
                this.viewMonitor(aMonitor, _iAnimMonitor + 1);
                _iAnimMonitor++;
            } else {
                this.disableRunningMonitor();
                _iAnimMonitor = 0;
                _fBuffer = 0;
                this.viewMonitor(aMonitor, _iAnimMonitor);
                return false;
            }
            _fBuffer = 0;
        }
        return true;
    };

    this._init(iX, iY);

    s_oAnimMonitor = this;

    return this;
}

var s_oAnimMonitor = null;