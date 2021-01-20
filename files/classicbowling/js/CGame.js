function CGame(oData) {

    var _oInterface;
    var _oTrack;
    var _oMonitor;
    var _oAnimMonitor;
    var _oShapeWall;
    var _oPinBinder;
    var _oSemaphore;
    var _oCharacter;

    var _oScene;
    var _oBall;
    var _oContainerGame;
    var _oPowerBar;
    var _oEffectArrow;
    var _oDirFunc;
    var _oAmbienceSound;
    var _bLaunched = false;
    var _bWallCollision = false;
    var _bDetectPinMovement = false;
    var _bPressedKeys = false;
    var _bSpare = false;
    var _bStrike = false;
    var _bKeyDir = false;
    var _bPinCollision = false;
    var _bAnimStrike = false;
    var _bAnimSpare = false;
    var _bAnimGutter = false;
    var _bChannelCol = false;
    var _bRepositionTurn = false;
    var _bPhysicsPinsDepends = true;
    var _bPlayCharacter = false;
    var _bExtraTurn = false;
    var _bHitFloor = false;
    var _bAwakePins = false;
    var _iScore;
    var _iTurn = 1;
    var _iTurnStrike = 2;
    var _iStage = 0;
    var _iStateLaunch = DIRECTION;
    var _iPinDown;
    var _iPinDownTurn;
    var _aObjects;
    var _aPinObject;
    var _aScoreStage;
    var _fTimeRefreshDirection;
    var _fTimeResetLaunch;

    var _iGameState = STATE_INIT;
    var _oCamera = null;

    this._init = function () {
        this.pause(true);

        _iScore = 0;
        _iPinDown = 0;
        _iPinDownTurn = 0;

        $(s_oMain).trigger("start_session");
        $(s_oMain).trigger("start_level", 1);

        _aObjects = new Array();
        _aPinObject = new Array();

        _oAmbienceSound = playSound("ambience", 1, -1);

        this.resetScoreStageArray();

        _oContainerGame = new createjs.Container();
        s_oStage.addChild(_oContainerGame);

        _oScene = new CScenario();

        _oShapeWall = new createjs.Shape();
        _oShapeWall.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, 460);
        _oContainerGame.addChild(_oShapeWall);

        _oTrack = new CTrack(0, 362, s_oSpriteLibrary.getSprite("bowling_track"), _oScene.getTrackBodyDepth(), _oContainerGame);
        _aObjects.push(_oTrack);

        _oPowerBar = new CPowerBar(100, CANVAS_HEIGHT_HALF + 225, s_oStage);
        _oPowerBar.setVisible(false);

        var oSpriteEffectArrow = s_oSpriteLibrary.getSprite("effect_arrow");
        _oEffectArrow = new CEffectArray(CANVAS_WIDTH + 10, CANVAS_HEIGHT_HALF + 430, oSpriteEffectArrow, s_oStage);
        _oEffectArrow.setVisible(false);

        if (SHOW_3D_RENDER) {
            _oCamera = camera;
        } else {
            _oCamera = createOrthoGraphicCamera();
        }

        _oScene.ballBody().mass = 0;
        var oSpirtePins = s_oSpriteLibrary.getSprite("pin");
        for (var i = 0; i < PINS_POSITION.length; i++) {
            _aPinObject[i] = new CPin(0, 0, oSpirtePins, _oScene.getPinByID(i), _oContainerGame);
            _aObjects.push(_aPinObject[i]);
            _aPinObject[i].setPosRef(OFFSET_TRACK_POSITION.z);
        }

        if (PIN_TEST) {
            _aPinObject.push(new CPin(0, 0, oSpirtePins, _oScene.getPinByID(i), _oContainerGame));
            _aObjects.push(_aPinObject[_aPinObject.length - 1]);
            _aPinObject[_aPinObject.length - 1].getPhysics().quaternion.setFromEuler(Math.radians(0), Math.radians(0), Math.radians(0), 'XYZ');
            _aPinObject[_aPinObject.length - 1].getPhysics().mass = 0;
        }

        var oSpriteBall = s_oSpriteLibrary.getSprite("ball");
        _oBall = new CBall(0, 0, oSpriteBall, _oScene.ballBody(), _oContainerGame);
        _oBall.setVisible(false);


        _aObjects.push(_oBall);

        resizeCanvas3D();

        var oSpritePinBinder = s_oSpriteLibrary.getSprite("pin_binder");

        _oPinBinder = new CPinDragger(397, 470, oSpritePinBinder, _oContainerGame);

        _oPinBinder.setVisible(false);
        _oPinBinder.changeState("throw_pins_0");

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            createjs.Tween.get(s_oSoundTrack).to({volume: 0}, MS_FADE_SOUNDTRACK);
        }

        var oSpriteMonitor = s_oSpriteLibrary.getSprite("monitor");
        _oMonitor = createBitmap(oSpriteMonitor);
        _oMonitor.y = 225;
        _oContainerGame.addChild(_oMonitor);

        var oSpriteSemaphore = s_oSpriteLibrary.getSprite("semaphore");
        _oSemaphore = new CSemaphore(CANVAS_WIDTH_HALF + 3, 381, oSpriteSemaphore, _oContainerGame);

        _oCharacter = new CCharacter(CHARACTER_START_POS.x, CHARACTER_START_POS.y, _oContainerGame);

        _oInterface = new CInterface();

        _oAnimMonitor = new CAnimMonitor(0, 291, _oInterface.getContainerBoard());


        if (!s_bMobile) {
            document.onkeydown = onKeyDown;
            document.onkeyup = onKeyUp;
        }

        if (!SHOW_3D_RENDER) {
            _oInterface.createHelpPanel();
        } else {
            this.onExitHelp();
        }
    };

    this.resetScoreStageArray = function () {
        _aScoreStage = new Array();
        for (var i = 0; i < LAUNCH_TURN; i++) {
            _aScoreStage[i] = new Array();
        }
    };

    this.refreshPos = function (iXPos, iYPos) {
        _oPowerBar.setPosition(_oPowerBar.getStartPos().x + iXPos, _oPowerBar.getStartPos().y - iYPos);
        _oEffectArrow.setPosition(_oEffectArrow.getStartPos().x - iXPos, _oEffectArrow.getStartPos().y - iYPos);
    };

    this.startPinsPosition = function () {
        this.updatePinsPosition();
        for (var i = 0; i < _aPinObject.length; i++) {
            _aPinObject[i].setStartPos(_aPinObject[i].getX(), _aPinObject[i].getY());
        }
    };

    this.onMouseDown = function () {
        if (_iStateLaunch === DIRECTION) {
            s_oGame.deactiveEventMouseMove();
            s_oGame.activeStateLaunchPower();
        } else if (_iStateLaunch === POWER) {
            _oPowerBar.removeTweensMask();
            s_oGame.activeStateLaunchEffect();
        } else if (_iStateLaunch === EFFECT) {
            s_oGame.launchBall();
            _iStateLaunch = DIRECTION;
        }
    };

    this.manageControl = function () {
        if (_bLaunched) {
            return;
        }
        if (_iStateLaunch === DIRECTION) {
            _oInterface.dirArrowsVisibility(false);
            _bKeyDir = false;
            s_oGame.activeStateLaunchPower();
        } else if (_iStateLaunch === POWER) {
            _oPowerBar.removeTweensMask();
            s_oGame.activeStateLaunchEffect();
        } else if (_iStateLaunch === EFFECT) {
            _oEffectArrow.stopAnimation();
            _oEffectArrow.removeAllEventListeners();

            _bPlayCharacter = true;
            _bWallCollision = false;
            _bLaunched = true;
            _iStateLaunch = DIRECTION;
        }
    };

    function onKeyDown(evt) {
        if (!_bPressedKeys && _iGameState === STATE_PLAY && !_bLaunched) {
            if (_iStateLaunch === DIRECTION) {
                if (evt.keyCode === 37) {
                    s_oGame.onLeft();
                    _bPressedKeys = true;
                } else if (evt.keyCode === 39) {
                    s_oGame.onRight();
                    _bPressedKeys = true;
                }
            }

            if (evt.keyCode === 32) {
                s_oGame.manageControl();
                _bPressedKeys = true;
            }
        }

        evt.preventDefault();
        return false;
    }

    function onKeyUp(evt) {
        if (_bPressedKeys && _iGameState === STATE_PLAY) {
            if (_iStateLaunch === DIRECTION) {
                if (evt.keyCode === 37) {
                    _bPressedKeys = false;
                    s_oGame.dirKeyUp();
                } else if (evt.keyCode === 39) {
                    _bPressedKeys = false;
                    s_oGame.dirKeyUp();
                }
            }
            if (evt.keyCode === 32) {
                _bPressedKeys = false;
            }
        }

        evt.preventDefault();
        return false;
    }

    this.dirKeyUp = function () {
        _bKeyDir = false;
    };

    this.onLeft = function () {
        _oDirFunc = s_oGame.onLeft;
        _bKeyDir = true;
        _fTimeRefreshDirection = TIME_REFRESH_DIRECTION;
        var oBallBody = _oScene.ballBody();
        oBallBody.position.x -= DIRECTION_VELOCITY;

        if (oBallBody.position.x > LIMIT_HAND_RANGE_POS.x) {
            oBallBody.position.x = LIMIT_HAND_RANGE_POS.x;
        } else {

            _oCharacter.setPosition(_oCharacter.getX() - DIRECTION_CHARACTER_VELOCITY, _oCharacter.getY());

        }
    };

    this.onRight = function () {
        _oDirFunc = s_oGame.onRight;
        _bKeyDir = true;
        _fTimeRefreshDirection = TIME_REFRESH_DIRECTION;
        var oBallBody = _oScene.ballBody();
        oBallBody.position.x += DIRECTION_VELOCITY;

        if (oBallBody.position.x < -LIMIT_HAND_RANGE_POS.x) {
            oBallBody.position.x = -LIMIT_HAND_RANGE_POS.x;
        } else {

            _oCharacter.setPosition(_oCharacter.getX() + DIRECTION_CHARACTER_VELOCITY, _oCharacter.getY());

        }
    };

    this.sortDepth = function (oObj1, oObj2) {
        if (oObj1 === null || oObj2 === null) {
            return;
        }
        if (oObj1.getDepthPos() < oObj2.getDepthPos()) {
            if (_oContainerGame.getChildIndex(oObj1.getObject()) > _oContainerGame.getChildIndex(oObj2.getObject())) {
                _oContainerGame.swapChildren(oObj1.getObject(), oObj2.getObject());
            }
        } else if (oObj1.getDepthPos() > oObj2.getDepthPos()) {
            if (_oContainerGame.getChildIndex(oObj2.getObject()) > _oContainerGame.getChildIndex(oObj1.getObject())) {
                _oContainerGame.swapChildren(oObj2.getObject(), oObj1.getObject());
            }
        }
    };

    this.onExitHelp = function () {
        this.pause(false);
        _oInterface.onExitFromHelp();
    };

    this.ballPosition = function () {
        var oBallBody = _oScene.ballBody();

        var oPos2DBall = this.convert3dPosTo2dScreen(oBallBody.position, _oCamera);

        var fScaleDistance = oPos2DBall.z * (BALL_SCALE_FACTOR - _oBall.getStartScale()) + _oBall.getStartScale();

        _oBall.setPosition(oPos2DBall.x, oPos2DBall.y);
        _oBall.scale(fScaleDistance);

        if (!s_bMobile) {
            this.refreshShadowCast(_oBall, oBallBody, fScaleDistance);
        }
    };

    this.refreshShadowCast = function (oObject, oBody, fScaleDistance) {
        var oFieldBody = _oScene.getTrackBody();

        if (oBody.position.z - BALL_RADIUS < oFieldBody.position.z) {
            oObject.scaleShadow(0);
            return;
        }

        var oPosShadow = {x: oBody.position.x, y: oBody.position.y, z: oFieldBody.position.z};

        var oPos2dShadow = this.convert3dPosTo2dScreen(oPosShadow, _oCamera);

        var fDistance = (-(oBody.position.z - BALL_RADIUS) + oFieldBody.position.z) + 1;

        var fScaleHeight = fDistance * fScaleDistance;
        oObject.scaleShadow(fScaleHeight);

        oObject.setAlphaByHeight(fDistance);

        oObject.setPositionShadow(oPos2dShadow.x, oPos2dShadow.y);
    };

    this.launchBall = function () {
        _oBall.setVisible(true);
        var fForce = (_oPowerBar.getMaskValue() / _oPowerBar.getMaskHeight()) * 100;
        if (fForce < MIN_LAUNCH_FORCE) {
            fForce = MIN_LAUNCH_FORCE;
        }
        s_oGame.addImpulseToBall(-fForce * FORCE_RATE);
        s_oGame.addAngularVelocityToBall(_oEffectArrow.getStoppedFrame() * EFFECT_POWER_RATE);
    };

    this.activeStateLaunchPower = function () {
        _iStateLaunch = POWER;
        _oPowerBar.setVisible(true);
        _oPowerBar.animFade(1);
        _oPowerBar.animateMask(TIME_POWER_BAR);
    };

    this.activeStateLaunchEffect = function () {
        _iStateLaunch = EFFECT;
        _oEffectArrow.animFade(1);
        _oEffectArrow.animArrow();
        _oEffectArrow.setVisible(true);
    };

    this.addAngularVelocityToBall = function (fForce) {
        var oForce = {x: 0, y: fForce, z: 0};
        _oScene.setElementAngularVelocity(_oScene.ballBody(), oForce);
    };

    this.completeLaunch = function () {
        if (_bWallCollision) {
            return;
        }
        _bWallCollision = true;
        _bDetectPinMovement = true;
        _oBall.animFade(0);
        _oBall.playSound();

        createjs.Tween.get(this).wait(1500).call(function () {
            _oCharacter.animFade(0);
        });

        _fTimeResetLaunch = TIME_RESET_LAUNCH;
    };

    this.isAwakwePins = function (bVal) {
        _bAwakePins = bVal;
    };

    this.awakePins = function () {
        if (_bAwakePins) {
            for (var i = 0; i < _aPinObject.length; i++) {
                if (_aPinObject[i].getPhysics().position.y > _oTrack.getDepthPos() && _aPinObject[i].isDownYet()) {
                    _aPinObject[i].getPhysics().wakeUp();
                } else if (_aPinObject[i].getPhysics().position.y > _oTrack.getDepthPos() && _iTurn === 1) {
                    _aPinObject[i].getPhysics().wakeUp();
                }
            }
        }
    };

    this.onStopAllPin = function () {
        var iPinDownTurn = this.countPinDown();
        _iPinDown += iPinDownTurn;
        this.controlTurnResult(iPinDownTurn);
        _oPowerBar.mask(0);
        _oEffectArrow.animFade(0);
        _oPowerBar.animFade(0);
    };

    this.setPinsPhysicsMovement = function (bVal) {
        _bPhysicsPinsDepends = bVal;
    };

    this.nextStage = function () {
        this.resetScene();
        _oPinBinder.setVisible(false);
        _oScene.getPinsBinder().collisionResponse = 0;
        _oScene.getPinsBinder().position.y = PINS_BINDER_POSITION.y;
        _iPinDownTurn = 0;
        this.activeControl();
    };

    this.pinBinderAction = function () {
        _oPinBinder.setVisible(true);
        _oScene.getPinsBinder().collisionResponse = 1;
        _oPinBinder.animThrowPins();
    };

    this.repositionPins = function () {
        for (var i = 0; i < _aPinObject.length; i++) {
            _aPinObject[i].resetState();
            _aPinObject[i].setPosition(_aPinObject[i].getX(), _aPinObject[i].getY() - 100);
            _aPinObject[i].animReposition(_aPinObject[i].getStartPos().y, function () {
            });
        }
    };

    this.controlTurnResult = function (iPinDownTurn) {
        if (_bSpare) {
            this.addSpareScore(iPinDownTurn);
            _iScore += iPinDownTurn;
        } else if (_bStrike) {
            this.addStrikeScore(iPinDownTurn);
            _iScore += iPinDownTurn;
        }
        var oResult;

        if (!_bExtraTurn) {
            oResult = this.addScoreNormalTurns(iPinDownTurn);
        } else {
            oResult = this.addExtraScore(iPinDownTurn);
        }

        var bLastStage = false;
        _iScore += iPinDownTurn;
        if (_iStage !== 9) {
            _aScoreStage[_iStage][_iTurn - 1] = iPinDownTurn;
            _aScoreStage[_iStage][2] = _iScore;
        } else {
            _aScoreStage[_iStage][_iTurn - 1] = iPinDownTurn;
            _aScoreStage[_iStage][3] = _iScore;
            bLastStage = true;
        }

        _oInterface.refreshTurnsBoard(_iStage, _iTurn, _iScore, oResult.point, bLastStage);

        if (oResult.next) {
            this.nextTurn();
            if (_iPinDown < _aPinObject.length) {
                _oPinBinder.setVisible(true);
                _oPinBinder.takeRemainPinsAndRepos();
                _oScene.getPinsBinder().collisionResponse = 1;
                _bRepositionTurn = true;
            }

        } else {
            if (_iStage !== 9) {
                _iPinDown = 0;
                _iStage++;
                _iTurn = 1;
                _oInterface.setStateTurnBoard(_iStage, "on");
                if (_iTurnStrike === 0) {
                    _bStrike = false;
                }
            } else {
                this.gameOver();
            }
        }

        _oInterface.refresTotalBoard(_iScore);
        _iPinDownTurn = 0;
        _bChannelCol = false;
        _bPinCollision = false;
        _bHitFloor = false;

    };

    this.gameOver = function () {
        _iGameState = STATE_FINISH;
        _oInterface.createEndPanel(_iScore);
    };

    this.addExtraScore = function (iPinDownTurn) {
        var oResult = {next: true, point: iPinDownTurn};
        if (iPinDownTurn >= _aPinObject.length) { //STRIKE
            if (_bExtraTurn) {
                oResult = this.strikeResult();
            } else if (_iTurn === 2 && _bExtraTurn) {
                oResult = this.spareResult();
            }
        } else if (iPinDownTurn < _aPinObject.length) { //ARITMETIC ADDICTION
            oResult = this.aritmeticResult(iPinDownTurn);
        }
        return oResult;
    };

    this.addScoreNormalTurns = function (iPinDownTurn) {
        var oResult = {next: true, point: iPinDownTurn};
        if (_iPinDown === _aPinObject.length) { //STRIKE
            if (_iTurn === 1 && !_bExtraTurn) {
                oResult = this.strikeResult();
            } else if (_iTurn === 2 && !_bExtraTurn) {
                oResult = this.spareResult();
            }
        } else if (_iPinDown < _aPinObject.length && _iTurn === 2) { //ARITMETIC ADDICTION
            oResult = this.aritmeticResult(iPinDownTurn);
        }
        return oResult;
    };

    this.aritmeticResult = function (iPinDownTurn) {
        this.pinBinderAction();
        return {next: _bExtraTurn, point: iPinDownTurn};
    };

    this.spareResult = function () {
        var szPoint, bNextTurn = false;
        _bSpare = true;
        if (_iStage === 9) {
            _bExtraTurn = true;
            bNextTurn = true;
        }
        this.pinBinderAction();
        _bAnimSpare = true;
        playSound("gingle_spare", 1, 0);
        _oAnimMonitor.setVisibleMonitorSpare(true);
        szPoint = "/";
        return {next: bNextTurn, point: szPoint};
    };

    this.strikeResult = function () {
        var szPoint, bNextTurn = false;
        _iTurnStrike = 2;
        _bStrike = true;
        _oAnimMonitor.setVisibleMonitorStrike(true);
        _bAnimStrike = true;

        playSound("gingle_strike", 1, 0);
        szPoint = "X";
        if (_iStage === 9) {
            _bExtraTurn = true;
            bNextTurn = true;
        }

        this.pinBinderAction();

        return {next: bNextTurn, point: szPoint};
    };

    this.nextTurn = function () {
        if (_bExtraTurn) {
            if (_iTurn === 3) {
                this.gameOver();
                return;
            }
        } else if (_iStage === 9 && _iTurn === 2) {
            this.gameOver();
            return;
        }
        _iTurn++;
    };

    this.addStrikeScore = function (iPinDownTurn) {
        if (_iStage !== 9) {
            if (_iStage !== 1) {
                if (_aScoreStage[_iStage - 2][0] === 10) {
                    _aScoreStage[_iStage - 2][2] += iPinDownTurn;
                    _oInterface.refreshTurnsBoard(_iStage - 2, null, _aScoreStage[_iStage - 2][2], null);
                }
            }

            _aScoreStage[_iStage - 1][2] += iPinDownTurn;
            _oInterface.refreshTurnsBoard(_iStage - 1, null, _aScoreStage[_iStage - 1][2], null);
        } else {
            _aScoreStage[_iStage][3] += iPinDownTurn;
            _oInterface.refreshTurnsBoard(_iStage, null, _aScoreStage[_iStage][3], null, true);
        }
        _iTurnStrike--;
    };

    this.addSpareScore = function (iPinDownTurn) {
        if (_iStage !== 9) {
            _aScoreStage[_iStage - 1][2] += iPinDownTurn;
            _oInterface.refreshTurnsBoard(_iStage - 1, null, _aScoreStage[_iStage - 1][2], null);
        } else {
            _aScoreStage[_iStage][3] += iPinDownTurn;
            _oInterface.refreshTurnsBoard(_iStage, null, _aScoreStage[_iStage][3], null, true);
        }
    };

    this.activeControl = function () {
        _oSemaphore.changeState("green");
        _bLaunched = false;
        _oInterface.dirArrowsVisibility(true);

        _oCharacter.setPosition(CHARACTER_START_POS.x, CHARACTER_START_POS.y);
        _oCharacter.animFade(1);
        _oCharacter.setVisible(true);

    };

    this.countPinDown = function () {
        var iPinDown = _iPinDownTurn;
        for (var i = 0; i < _aPinObject.length; i++) {
            if (!_aPinObject[i].isDownYet()) {
                var oVec3 = new CANNON.Vec3();
                _aPinObject[i].getPhysics().quaternion.toEuler(oVec3);
                oVec3.x = Math.ceil(Math.degrees(oVec3.x));
                oVec3.y = Math.ceil(Math.degrees(oVec3.y));
                oVec3.z = Math.ceil(Math.degrees(oVec3.z));
                if (oVec3.x > 20 || oVec3.x < -20 || oVec3.y > 20 || oVec3.y < -20 || _aPinObject[i].getPhysics().position.z < _oTrack.getHeightPos()) {
                    iPinDown++;
                    _aPinObject[i].setDown(true);
                }
            }
        }
        return iPinDown;
    };

    this.animUpRemainPins = function () {
        for (var i = 0; i < _aPinObject.length; i++) {
            if (!_aPinObject[i].isDownYet()) {
                _aPinObject[i].animTake(_aPinObject[i].getStartPos().y - 100);
            }
        }
    };

    this.repositionRemainPins = function () {
        for (var i = 0; i < _aPinObject.length; i++) {
            if (!_aPinObject[i].isDownYet()) {
                _aPinObject[i].getPhysics().position.set(PINS_POSITION[i].x, PINS_POSITION[i].y, PINS_POSITION[i].z);
                _aPinObject[i].getPhysics().quaternion.setFromEuler(0, 0, 0, 'XYZ');
                _aPinObject[i].getPhysics().angularVelocity.set(0, 0, 0);
                _aPinObject[i].getPhysics().velocity.set(0, 0, 0);
                _aPinObject[i].getPhysics().mass = PIN_PROPERTY.mass;
                _aPinObject[i].setPosition(_aPinObject[i].getStartPos().x, _aPinObject[i].getStartPos().y - 100);
                _aPinObject[i].setPlayedSound(false);
                var fAlpha = this.pinReflection(i, _aPinObject[i].getPhysics().position);
                _aPinObject[i].setAlphaByHeight(0);
                _aPinObject[i].animReposition(_aPinObject[i].getStartPos().y, fAlpha);
                var oPos2DPin = this.convert3dPosTo2dScreen(_aPinObject[i].getPhysics().position, _oCamera);
                this.pinScale(i, oPos2DPin);
                _aPinObject[i].setVisible(true);
                _aPinObject[i].pinRotation();
            } else {
                _aPinObject[i].setVisible(false);
            }
        }
        _bRepositionTurn = false;
    };

    this.unload = function () {
        s_oStage.removeAllChildren();
        _oInterface.unload();

        _oScene.destroyWorld();
        _oScene = null;


    };

    this.addImpulseToBall = function (fForceY) {
        if (_iGameState !== STATE_PLAY) {
            return;
        }
        _oScene.ballBody().mass = BALL_MASS;
        var fX = 0;
        var fZ = 0;
        var oDir = {x: fX, y: fForceY, z: fZ};
        var oBall = _oScene.ballBody();
        _oScene.addImpulse(oBall, oDir);
        _oScene.setElementAngularVelocity(oBall, {x: 0, y: 0, z: 0});
        _bLaunched = true;
        _oSemaphore.changeState("red");
    };

    this.pause = function (bVal) {
        if (bVal) {
            _iGameState = STATE_PAUSE;

        } else {
            _iGameState = STATE_PLAY;

        }
        createjs.Ticker.paused = bVal;
    };

    this.setPinDown = function (iID, bVal, iWhere) {
        if (_aPinObject[iID].isDownYet() === bVal || _bRepositionTurn) {
            return;
        }

        if (iWhere === WALL && !_aPinObject[iID].isDownYet()) {
            _aPinObject[iID].setVisibleRef(false);
        } else if (iWhere === SIDE_PINS_FLOOR) {
            _aPinObject[iID].setPosRef(_oScene.getSideFloorPins(0).position.z);
        }

        _aPinObject[iID].setDown(bVal);
        if (bVal) {
            _iPinDownTurn++;
        } else {
            _iPinDownTurn--;
        }
    };

    this.onExit = function () {
        this.unload();
        $(s_oMain).trigger("end_level");
        $(s_oMain).trigger("show_interlevel_ad");
        $(s_oMain).trigger("end_session");
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            createjs.Tween.get(s_oSoundTrack).to({volume: 1}, MS_FADE_SOUNDTRACK);
            _oAmbienceSound.destroy();
        }

        s_oMain.gotoMenu();
    };

    this.restartGame = function () {
        this.resetValues();
        this.resetScene();
        _iGameState = STATE_PLAY;
        $(s_oMain).trigger("restart_level", 1);
    };

    this.resetValues = function () {
        _iStage = 0;
        _iScore = 0;
        _iPinDown = 0;
        _iPinDownTurn = 0;
        _iTurn = 1;
        _bLaunched = false;
        _bWallCollision = false;
        _bDetectPinMovement = false;
        _bPressedKeys = false;
        _bSpare = false;
        _bStrike = false;
        _bKeyDir = false;
        _bPinCollision = false;
        _bAnimStrike = false;
        _bHitFloor = false;
        _bAnimSpare = false;
        _bAnimGutter = false;
        _bChannelCol = false;
        _bRepositionTurn = false;
        _bPhysicsPinsDepends = true;
        _bPlayCharacter = false;
        _bExtraTurn = false;

        this.resetScoreStageArray();

        for (var i = 0; i < LAUNCH_TURN - 1; i++) {
            for (var j = 0; j < 2; j++) {
                if (j === 0) {
                    _oInterface.refreshTurnsBoard(i, j + 1, _iScore, 0, false);
                } else {
                    _oInterface.refreshTurnsBoard(i, j + 1, _iScore, "", false);
                }
                _oInterface.setStateTurnBoard(i, "off");
            }
        }
        for (var j = 0; j < 3; j++) {
            if (j === 0) {
                _oInterface.refreshTurnsBoard(LAUNCH_TURN - 1, j + 1, _iScore, 0, true);
            } else {
                _oInterface.refreshTurnsBoard(LAUNCH_TURN - 1, j + 1, _iScore, "", true);
            }
            _oInterface.setStateTurnBoard(LAUNCH_TURN - 1, "off");

        }
        _oInterface.setStateTurnBoard(0, "on");
        _oInterface.refresTotalBoard(0);
    };

    this.resetBallPosition = function () {
        var oBallBody = _oScene.ballBody();

        oBallBody.mass = 0;

        oBallBody.position.set(POSITION_BALL.x, POSITION_BALL.y, POSITION_BALL.z);
        _oScene.setElementVelocity(oBallBody, {x: 0, y: 0, z: 0});
        _oScene.setElementAngularVelocity(oBallBody, {x: 0, y: 0, z: 0});

        _oBall.setPlayedSound(false);

    };

    this._updateInit = function () {
        _oScene.update();
        this._updateBall2DPosition();
        _iGameState = STATE_PLAY;
    };

    this.convert2dScreenPosTo3d = function (oPos2d, oBody) {
        var iWidth = (s_iCanvasResizeWidth);
        var iHeight = (s_iCanvasResizeHeight);

        var mouse3D = new THREE.Vector3((oPos2d.x / iWidth) * 2 - 1, //x
                -(oPos2d.y / iHeight) * 2 + 1, //y
                -1);                                            //z
        mouse3D.unproject(_oCamera);
        mouse3D.sub(_oCamera.position);
        mouse3D.normalize();

        var fFactor = oBody.position.y;

        mouse3D.multiply(new THREE.Vector3(fFactor, 1, fFactor));

        return mouse3D;
    };

    this.convert3dPosTo2dScreen = function (pos, oCamera) {
        var v3 = new THREE.Vector3(pos.x, pos.y, pos.z);
        var vector = v3.project(oCamera);

        var widthHalf = Math.floor(s_iCanvasResizeWidth) * 0.5;
        var heightHalf = Math.floor(s_iCanvasResizeHeight) * 0.5;


        vector.x = ((vector.x * widthHalf) + widthHalf) * s_fInverseScaling;
        vector.y = (-(vector.y * heightHalf) + heightHalf) * s_fInverseScaling;

        return vector;
    };

    this.resetScene = function () {
        this.resetPinsPosition();
        this.resetBallPosition();
    };

    this.resetPinsPosition = function () {
        for (var i = 0; i < _aPinObject.length; i++) {
            var oPinBody = _aPinObject[i].getPhysics();
            oPinBody.position.set(PINS_POSITION[i].x, PINS_POSITION[i].y, PINS_POSITION[i].z);
            oPinBody.quaternion.setFromEuler(0, 0, 0, 'XYZ');
            oPinBody.angularVelocity.set(0, 0, 0);
            oPinBody.velocity.set(0, 0, 0);
            oPinBody.collisionResponse = 1;
            oPinBody.mass = PIN_PROPERTY.mass;
            _aPinObject[i].setPosRef(_oScene.getTrackBody().position.z);
            var oPos2DPin = this.convert3dPosTo2dScreen(oPinBody.position, _oCamera);
            this.pinScale(i, oPos2DPin);
            _aPinObject[i].setDown(false);
            _aPinObject[i].setVisible(true);
            _aPinObject[i].setPlayedSound(false);
            _aPinObject[i].setVisibleRef(true);
        }
    };

    this._onEnd = function () {
        this.onExit();
    };

    this.swapChildrenIndex = function () {
        for (var i = 0; i < _aObjects.length - 1; i++) {
            for (var j = i + 1; j < _aObjects.length; j++) {
                if (_aObjects[i].getObject().visible && _aObjects[j].getObject().visible)
                    this.sortDepth(_aObjects[i], _aObjects[j]);
            }
        }
    };

    this.updatePinsPosition = function () {
        for (var i = 0; i < _aPinObject.length; i++) {
            if (_aPinObject[i].getVisible()) {
                var oPos = this.pinPosition(i);
                var fScale = this.pinScale(i, oPos);
                if (_aPinObject[i].isVisibleRef)
                    this.pinReflection(i, _aPinObject[i].getPhysics().position);

                this.pinFade(i);

                if (!PIN_TEST)
                    _aPinObject[i].pinRotation();
            }
        }
    };

    this.pinFade = function (i) {
        if (_aPinObject[i].getPhysics().position.y < _oTrack.getDepthPos()) {
            var fFade = 1 - (_aPinObject[i].getPhysics().position.y - _oTrack.getDepthPos()) * (FADE_PIN_FACTOR - _oTrack.getDepthPos());
            _aPinObject[i].setAlpha(fFade);
        }
    };

    this.pinScale = function (iID, oPos2DPin) {
        var fScaleDistance = oPos2DPin.z * (PIN_SCALE_FACTOR - _aPinObject[iID].getStartScale()) + _aPinObject[iID].getStartScale();
        _aPinObject[iID].scale(fScaleDistance);

        return fScaleDistance;
    };

    this.pinReflection = function (iID, oPosBody) {
        if (oPosBody.y < _oTrack.getDepthPos()) {
            fAlpha = 0;
            _aPinObject[iID].setAlphaByHeight(fAlpha);
            return;
        }

        var oPosRef = {x: oPosBody.x, y: oPosBody.y, z: _aPinObject[iID].getPosRef()};

        var oPos2dReflection = this.convert3dPosTo2dScreen(oPosRef, _oCamera);

        var fDistance = (oPosBody.z) + _oScene.getTrackBody().position.z;

        var fAlpha = fDistance * (PIN_ALPHA_FACTOR - 1) + 1;

        if (fAlpha > PINS_REFLECTION_LIMIT) {
            fAlpha = PINS_REFLECTION_LIMIT;
        }

        var fRegYRef = fDistance * (PIN_REF_REGY_FACTOR - _aPinObject[iID].getRegYRef()) + _aPinObject[iID].getRegYRef();

        _aPinObject[iID].setRegYRef(fRegYRef);

        _aPinObject[iID].setAlphaByHeight(fAlpha);

        _aPinObject[iID].setPositionReflection(oPos2dReflection.x, oPos2dReflection.y);

        return fAlpha;
    };

    this.setPinCollide = function () {
        _bPinCollision = true;
    };

    this.pinPosition = function (iID) {

        var oPinBody = _aPinObject[iID].getPhysics();

        var oPos2DPin = this.convert3dPosTo2dScreen(oPinBody.position, _oCamera);

        _aPinObject[iID].setPosition(oPos2DPin.x, oPos2DPin.y);

        return oPos2DPin;
    };

    this.movementKeyDown = function () {
        if (_bKeyDir) {
            if (_fTimeRefreshDirection < 0) {
                _fTimeRefreshDirection = TIME_REFRESH_DIRECTION;
                _oDirFunc();
            } else {
                _fTimeRefreshDirection -= FPS_TIME;
            }
        }
    };

    this.pinsMovementDetect = function () {
        if (!_bDetectPinMovement) {
            return;
        }
        var iPinMovement = _aPinObject.length;
        for (var i = 0; i < _aPinObject.length; i++) {
            var oVelocity = _aPinObject[i].getPhysics().velocity;
            if (Math.abs(oVelocity.x) < MIN_VELOCITY_PINS && Math.abs(oVelocity.y) < MIN_VELOCITY_PINS) {
                s_oScenario.setElementVelocity(_aPinObject[i].getPhysics(), {x: 0, y: 0, z: 0});
                iPinMovement--;
            }
        }

        if (iPinMovement === 0) {
            this.onStopAllPin();
            _bDetectPinMovement = false;
        } else if (_fTimeResetLaunch < 0) {
            this.stopAllPin();
            this.onStopAllPin();
            _bDetectPinMovement = false;
        } else {
            _fTimeResetLaunch -= FPS_TIME;
        }
    };

    this.gutterBall = function () {
        if (!_bChannelCol && !_bPinCollision) {
            _bAnimGutter = true;
            _oAnimMonitor.setVisibleMonitorGutter(true);
            _bChannelCol = true;
            playSound("gingle_gutterball", 1, 0);
        }
    };

    this.stopAllPin = function () {
        for (var i = 0; i < _aPinObject.length; i++) {
            s_oScenario.setElementVelocity(_aPinObject[i].getPhysics(), {x: 0, y: 0, z: 0});
        }
    };

    this.pinTest = function () {
        _aPinObject[_aPinObject.length - 1].pinRotation();
        console.log(_aPinObject[_aPinObject.length - 1].getPhysics().position);
    };

    this.animMonitor = function () {
        if (_bAnimStrike) {
            _bAnimStrike = _oAnimMonitor.animMonitor(_oAnimMonitor.getStrikeArray());
        } else if (_bAnimSpare) {
            _bAnimSpare = _oAnimMonitor.animMonitor(_oAnimMonitor.getSpareArray());
        } else if (_bAnimGutter) {
            _bAnimGutter = _oAnimMonitor.animMonitor(_oAnimMonitor.getGutterArray());
            if (!_bAnimGutter) {
                this.completeLaunch();
            }
        }
    };

    this.pinSoundCollision = function (iID) {
        _aPinObject[iID].playAudio();
    };

    this.twoPinsSoundCollision = function (iID1, iID2) {
        createjs.Tween.get(this).wait(Math.floor(Math.random() * 50)).call(function () {
            _aPinObject[iID1].playAudio();
        });
        createjs.Tween.get(this).wait(Math.floor(Math.random() * 50)).call(function () {
            _aPinObject[iID2].playAudio();
        });
    };

    this.ballHitFloor = function () {
        if (_bHitFloor) {
            return;
        }
        _bHitFloor = true;
        playSound("ball_hitting", 1, 0);
    };

    this.channelForceApply = function () {
        if (!_bChannelCol) {
            return;
        }
        if (_oScene.ballBody().velocity.y > MIN_FORCE_BALL_GUTTER) {
            _oScene.ballBody().applyForce({x: 0, y: -100, z: 0}, new CANNON.Vec3(0, 0, 0));
        }
    };

    this.characterAnimation = function () {
        if (_bPlayCharacter) {
            _bPlayCharacter = _oCharacter.animCharacter();
            if (_oCharacter.getFrame() === 24) {
                this.launchBall();
            }
        }
    };

    this._updatePlay = function () {
        for (var i = 0; i < PHYSICS_ACCURACY; i++) {
            _oScene.update();
            this.awakePins();
        }

        this._updateBall2DPosition();

        if (_bPhysicsPinsDepends)
            this.updatePinsPosition();

        this.swapChildrenIndex();

        this.movementKeyDown();

        this.pinsMovementDetect();

        this.channelForceApply();

        this.characterAnimation();

        if (PIN_TEST)
            this.pinTest();

        this.animMonitor();

    };

    this.update = function () {
        switch (_iGameState) {
            case STATE_INIT:
                {
                    this._updateInit();
                }
                break;
            case STATE_PLAY:
                {
                    this._updatePlay();
                }
                break;
            case STATE_FINISH:
                _oScene.update();
                this.animMonitor();
                if (_bPhysicsPinsDepends)
                    this.updatePinsPosition();
                break;
            case STATE_PAUSE:

                break;
        }
    };

    this._updateBall2DPosition = function () {

        this.ballPosition();

        _oCamera.updateProjectionMatrix();
        _oCamera.updateMatrixWorld();
    };

    s_oGame = this;

    TIME_POWER_BAR = oData.time_power_bar;
    SPEED_EFFECT_ARROW = oData.speed_effect_arrow;
    NUM_LEVEL_FOR_ADS = oData.num_levels_for_ads;


    this._init();
}

var s_oGame;