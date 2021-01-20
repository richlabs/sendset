function CPinDragger(iXPos, iYPos, oSprite, oParentContainer) {

    var _oPinBinder;
    var _oParentContainer;

    this._init = function (iXPos, iYPos, oSprite, oParentContainer) {

        _oParentContainer = oParentContainer;

        var fAnimSpeed = 30 / FPS;

        var oData = {
            images: [oSprite],
            // width, height & registration point of each sprite
            frames: {width: oSprite.width / 8, height: oSprite.height / 4, regX: (oSprite.width / 2) / 8, regY: (oSprite.height / 2) / 4},
            animations: {
                up: {
                    frames: [8, 7, 6, 5, 4, 3, 2, 1, 0],
                    speed: fAnimSpeed
                },
                down: [0, 8, 8, fAnimSpeed - 0.15],
                throw_pins_0: [0, 8, "throw_pins_1", fAnimSpeed],
                throw_pins_1: [9, 31, 31, fAnimSpeed]
            }
        };
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oPinBinder = createSprite(oSpriteSheet, "run", (oSprite.width / 2) / 10, (oSprite.height / 2) / 4, oSprite.width / 10, oSprite.height / 6);

        _oPinBinder.x = iXPos;
        _oPinBinder.y = iYPos;

        _oParentContainer.addChild(_oPinBinder);

    };

    this.getX = function () {
        return _oPinBinder.x;
    };

    this.getY = function () {
        return _oPinBinder.y;
    };

    this.animThrowPins = function () {
        var oParent = this;
        _oPinBinder.gotoAndPlay("throw_pins_0");
        this.onFinishAnimation(function () {
            var oPinBinderBody = s_oScenario.getPinsBinder();
            createjs.Tween.get(oPinBinderBody.position).to({y: PIN_BINDER_TO_Y}, 900).call(function () {
                s_oGame.isAwakwePins(false);
            });
            s_oGame.isAwakwePins(true);
            _oPinBinder.gotoAndPlay("throw_pins_1");
            playSound("binder", 1, 0);
            _oPinBinder.removeAllEventListeners();
            oParent.onFinishAnimation(function () {
                _oPinBinder.gotoAndStop(31);
                _oPinBinder.removeAllEventListeners();
                createjs.Tween.get(this).wait(500).call(function () {
                    s_oGame.setPinsPhysicsMovement(false);
                    s_oGame.repositionPins();
                    s_oGame.resetScene();
                    createjs.Tween.get(this).wait(200).call(function () {
                        _oPinBinder.gotoAndPlay("down");
                        oParent.onFinishAnimation(function () {
                            _oPinBinder.gotoAndStop(8);
                            createjs.Tween.get(this).wait(200).call(function () {
                                _oPinBinder.gotoAndPlay("up");
                                s_oGame.updatePinsPosition();
                                _oPinBinder.removeAllEventListeners();
                                oParent.onFinishAnimation(function () {
                                    _oPinBinder.visible = false;
                                    s_oGame.setPinsPhysicsMovement(true);
                                    s_oGame.nextStage();
                                    _oPinBinder.removeAllEventListeners();
                                });
                            });
                        });
                    });
                });
            });
        });
    };

    this.takeRemainPinsAndRepos = function () {
        var oParent = this;
        _oPinBinder.gotoAndPlay("down");
        oParent.onFinishAnimation(function () {
            createjs.Tween.get(oParent).wait(200).call(function () {
                _oPinBinder.gotoAndPlay("up");
                s_oGame.setPinsPhysicsMovement(false);
                s_oGame.animUpRemainPins();
                _oPinBinder.removeAllEventListeners();
                oParent.onFinishAnimation(function () {
                    _oPinBinder.gotoAndPlay("throw_pins_0");
                    _oPinBinder.removeAllEventListeners();
                    oParent.onFinishAnimation(function () {
                        var oPinBinderBody = s_oScenario.getPinsBinder();
                        createjs.Tween.get(oPinBinderBody.position).to({y: PIN_BINDER_TO_Y}, 900).call(function () {
                            s_oGame.isAwakwePins(false);
                        });
                        s_oGame.isAwakwePins(true);
                        _oPinBinder.gotoAndPlay("throw_pins_1");
                        playSound("binder", 1, 0);
                        s_oGame.setPinsPhysicsMovement(true);
                        _oPinBinder.removeAllEventListeners();
                        oParent.onFinishAnimation(function () {
                            _oPinBinder.gotoAndStop(31);
                            _oPinBinder.removeAllEventListeners();
                            createjs.Tween.get(this).wait(500).call(function () {
                                s_oScenario.getPinsBinder().collisionResponse = 0;
                                createjs.Tween.get(this).wait(200).call(function () {
                                    _oPinBinder.gotoAndPlay("down");
                                    s_oGame.setPinsPhysicsMovement(false);
                                    s_oGame.repositionRemainPins();
                                    oParent.onFinishAnimation(function () {
                                        _oPinBinder.gotoAndStop(8);
                                        createjs.Tween.get(this).wait(200).call(function () {
                                            _oPinBinder.gotoAndPlay("up");
                                            _oPinBinder.removeAllEventListeners();
                                            oParent.onFinishAnimation(function () {
                                                _oPinBinder.visible = false;
                                                s_oScenario.getPinsBinder().position.y = PINS_BINDER_POSITION.y;
                                                s_oGame.activeControl();
                                                s_oGame.setPinsPhysicsMovement(true);
                                                _oPinBinder.removeAllEventListeners();
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    };

    this.setPosition = function (iXPos, iYPos) {
        _oPinBinder.x = iXPos;
        _oPinBinder.y = iYPos;
    };

    this.setVisible = function (bVal) {
        _oPinBinder.visible = bVal;
    };

    this.changeState = function (szState) {
        _oPinBinder.gotoAndPlay(szState);
    };

    this.onFinishAnimation = function (oFunc) {
        _oPinBinder.on("animationend", function () {
            oFunc();
        });
    };

    s_oPinBinder = this;

    this._init(iXPos, iYPos, oSprite, oParentContainer);
}

var s_oPinBinder;


