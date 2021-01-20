function CScenario() {
    var _oWorld;
    var _oGroundMaterial;
    var _oBallMaterial;
    var _oWallMaterial;
    var _oPinMaterial;
    var _oBallShape;
    var _oBallBody;
    var _oBallMesh;
    var _oTrackBody;
    var _oChannelLeftBody;
    var _oChannelRightBody;
    var _oPinFloorBody;
    var _oPinWallForwardBody;
    var _oBodyWallPins;
    var _oBodyDepthTrack;
    var _oPinsBinderBody;
    var _oSideWallBody;
    var _oSensorPinFloor;
    var _aPin;
    var _aSidesPinsFloor;

    if (SHOW_3D_RENDER)
        var _oDemo = new CANNON.Demo();


    this.getDemo = function () {
        return _oDemo;
    };

    this._init = function () {
        _aPin = new Array();
        _aSidesPinsFloor = new Array();

        if (SHOW_3D_RENDER) {
            _oWorld = _oDemo.getWorld();
        } else {
            _oWorld = new CANNON.World();
        }

        var oSolver = new CANNON.GSSolver();
        oSolver.iterations = 10;
        oSolver.tolerance = 0.0001;

        _oWorld.allowSleep = true;

        _oWorld.gravity.set(0, 0, -(19.52 * STEP_RATE));
        _oWorld.broadphase = new CANNON.NaiveBroadphase();

        _oWorld.solver = new CANNON.SplitSolver(oSolver, 20, 0.0001);

        _oGroundMaterial = new CANNON.Material();
        _oBallMaterial = new CANNON.Material();
        _oWallMaterial = new CANNON.Material();
        _oPinMaterial = new CANNON.Material();

        var oWallBallCm = new CANNON.ContactMaterial(
                _oBallMaterial, _oWallMaterial, {
                    friction: 0.1,
                    restitution: 0.1
                });

        var oGroundBallCm = new CANNON.ContactMaterial(
                _oBallMaterial, _oGroundMaterial, {
                    friction: 0.01,
                    restitution: 0.1
                });

        var oPinBallCm = new CANNON.ContactMaterial(
                _oBallMaterial, _oPinMaterial, {
                    friction: 0.1,
                    restitution: 0.3
                });

        var oPinGroundCm = new CANNON.ContactMaterial(
                _oGroundMaterial, _oPinMaterial, {
                    friction: 0.2,
                    restitution: 0.3
                });

        var oPinPinCm = new CANNON.ContactMaterial(
                _oPinMaterial, _oPinMaterial, {
                    friction: 0.01,
                    restitution: 0.1
                });

        var oPinWallCm = new CANNON.ContactMaterial(
                _oPinMaterial, _oWallMaterial, {
                    friction: 0.01,
                    restitution: 0.1
                });

        _oWorld.addContactMaterial(oWallBallCm);
        _oWorld.addContactMaterial(oGroundBallCm);
        _oWorld.addContactMaterial(oPinBallCm);
        _oWorld.addContactMaterial(oPinGroundCm);
        _oWorld.addContactMaterial(oPinPinCm);
        _oWorld.addContactMaterial(oPinWallCm);

        s_oScenario._createBallBody();
        for (var i = 0; i < PINS_POSITION.length; i++) {
            _aPin[i] = s_oScenario.createPin(PINS_POSITION[i], i, false);
        }
        s_oScenario.importFBXTrack();
        s_oScenario.createWallPins();
        s_oScenario.createFloorPins();
        s_oScenario.createPinsBinder();
        s_oScenario.createWallFloorPins();
        s_oScenario.createSideWallTrack();
        s_oScenario.createSensorPinFloor();

        if (SHOW_DEPTH_TRACK_MODEL) {
            s_oScenario.createDepthTrack();
        }

        if (PIN_TEST) {
            _aPin.push(s_oScenario.createPin(PINS_PROPERTIES_TEST, -1, true));
        }

        var fOffsetXLeft = FLOOR_PINS_SIZE.width + FLOOR_PINS_SIDE_PROPERTIES.width - 2.7;
        var oPosLeftFloor = {x: FLOOR_PINS_POSITION.x + fOffsetXLeft, y: FLOOR_PINS_POSITION.y, z: FLOOR_PINS_POSITION.z + FLOOR_PINS_SIZE.height - 9};
        _aSidesPinsFloor.push(s_oScenario.createAFloorSidePins(oPosLeftFloor, FLOOR_PINS_SIDE_PROPERTIES.rot));

        var fOffsetXRight = -FLOOR_PINS_SIZE.width - FLOOR_PINS_SIDE_PROPERTIES.width + 2.7;
        var oPosLeftRight = {x: FLOOR_PINS_POSITION.x + fOffsetXRight, y: FLOOR_PINS_POSITION.y, z: FLOOR_PINS_POSITION.z + FLOOR_PINS_SIZE.height - 9};
        _aSidesPinsFloor.push(s_oScenario.createAFloorSidePins(oPosLeftRight, -FLOOR_PINS_SIDE_PROPERTIES.rot));
    };

    this.importFBXTrack = function () {
        var manager = new THREE.LoadingManager();
        manager.onProgress = function (item, loaded, total) {
            console.log(item, loaded, total);
        };
        var onProgress = function (xhr) {
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log(Math.round(percentComplete, 2) + '% downloaded');
            }
        };
        var onError = function (xhr) {
        };

        var loader = new THREE.FBXLoader(manager);
        var oParent = this;

        loader.load('models/stage.fbx', function (objects) {
            s_oScenario.parseFile(objects);
            objects = null;
            s_oGame.ballPosition();
            s_oGame.startPinsPosition();
        }, onProgress, onError);
    };

    this.parseFile = function (oFile) {

        for (var i = 0; i < oFile.children.length; i++) {
            var oMesh = oFile.children[i];

            console.log("oMesh.name: " + oMesh.name);

            if (oMesh.name === "floor") {
                _oTrackBody = s_oScenario._createFieldBody(oMesh, FLOOR);
                _oTrackBody.addEventListener("collide", function (e) {
                    s_oScenario.floorCollision(e);
                });
            } else if (oMesh.name === "channel_left") {
                _oChannelLeftBody = s_oScenario._createFieldBody(oMesh, CHANNEL);
                _oChannelLeftBody.addEventListener("collide", function (e) {
                    s_oScenario.channelCollision(e);
                });
            } else if (oMesh.name === "channel_right") {
                _oChannelRightBody = s_oScenario._createFieldBody(oMesh, CHANNEL);
                _oChannelRightBody.addEventListener("collide", function (e) {
                    s_oScenario.channelCollision(e);
                });
            }
        }
    };

    this.createSensorPinFloor = function () {
        var oShapeWallPinsDown = new CANNON.Box(new CANNON.Vec3(SENSOR_SIZE.width, SENSOR_SIZE.depth, SENSOR_SIZE.height));

        _oSensorPinFloor = new CANNON.Body({mass: 0, material: _oWallMaterial, userData: {type: WALL}});
        _oSensorPinFloor.addShape(oShapeWallPinsDown);

        _oSensorPinFloor.addEventListener("collide", function (e) {
            s_oScenario.sensorCollision(e);
        });

        _oSensorPinFloor.position.set(SENSOR_POSITION.x, SENSOR_POSITION.y, SENSOR_POSITION.z);
        _oWorld.addBody(_oSensorPinFloor);

        if (SHOW_3D_RENDER) {
            var sensorMaterial = new THREE.MeshPhongMaterial({color: 0x550055, specular: 0x111111, shininess: 50});
            _oDemo.addVisual(_oSensorPinFloor, sensorMaterial);
        }
    };

    this.createAFloorSidePins = function (oPos, fRotY) {
        var oBody;
        var oShape = new CANNON.Box(new CANNON.Vec3(FLOOR_PINS_SIDE_PROPERTIES.width, FLOOR_PINS_SIDE_PROPERTIES.depth, FLOOR_PINS_SIDE_PROPERTIES.height));

        oBody = new CANNON.Body({mass: 0,
            material: _oGroundMaterial,
            userData: {type: PINS_FLOOR},
            collisionFilterGroup: PINS_FLOOR,
            collisionFilterMask: PINS});

        oBody.addShape(oShape);
        oBody.quaternion.y = fRotY;

        oBody.position.set(oPos.x, oPos.y, oPos.z);

        oBody.addEventListener("collide", function (e) {
            s_oScenario.sideWallCollision(e);
        });

        _oWorld.addBody(oBody);

        if (SHOW_3D_RENDER && SHOW_PROXY_COLLISION) {
            var sideMaterial = new THREE.MeshPhongMaterial({color: 0x008800, specular: 0x111111, shininess: 50});
            _oDemo.addVisual(oBody, sideMaterial);
        }
        return oBody;
    };

    this.createDepthTrack = function () {
        var oShapeDepthTrack = new CANNON.Box(new CANNON.Vec3(WALL_TRACK_DEPTH_SIZE.width, WALL_TRACK_DEPTH_SIZE.depth, WALL_TRACK_DEPTH_SIZE.height));

        _oBodyDepthTrack = new CANNON.Body({mass: 0,
            material: _oWallMaterial});
        _oBodyDepthTrack.collisionResponse = 0;
        _oBodyDepthTrack.addShape(oShapeDepthTrack);

        _oBodyDepthTrack.position.set(WALL_TRACK_DEPTH_POSITION.x, WALL_TRACK_DEPTH_POSITION.y, WALL_TRACK_DEPTH_POSITION.z);
        _oWorld.addBody(_oBodyDepthTrack);

        if (SHOW_3D_RENDER) {
            var depthMaterial = new THREE.MeshPhongMaterial({color: 0x888800, specular: 0x111111, shininess: 50});
            _oDemo.addVisual(_oBodyDepthTrack, depthMaterial);
        }
    };

    this.createFloorPins = function () {
        var oFloorShapePins = new CANNON.Box(new CANNON.Vec3(FLOOR_PINS_SIZE.width, FLOOR_PINS_SIZE.depth, FLOOR_PINS_SIZE.height));

        _oPinFloorBody = new CANNON.Body({mass: 0,
            material: _oGroundMaterial,
            userData: {type: PINS_FLOOR},
            collisionFilterGroup: PINS_FLOOR,
            collisionFilterMask: PINS});
        _oPinFloorBody.addShape(oFloorShapePins);

        _oPinFloorBody.position.set(FLOOR_PINS_POSITION.x, FLOOR_PINS_POSITION.y, FLOOR_PINS_POSITION.z);
        _oWorld.addBody(_oPinFloorBody);

        if (SHOW_3D_RENDER && SHOW_PROXY_COLLISION) {
            var floorMaterial = new THREE.MeshPhongMaterial({color: 0x000088, specular: 0x111111, shininess: 50});
            _oDemo.addVisual(_oPinFloorBody, floorMaterial);
        }
    };

    this.createWallFloorPins = function () {
        var oWallFloorShapePins = new CANNON.Box(new CANNON.Vec3(FLOOR_WALL_PINS_SIZE.width, FLOOR_WALL_PINS_SIZE.depth, FLOOR_WALL_PINS_SIZE.height));

        _oPinWallForwardBody = new CANNON.Body({mass: 0,
            material: _oGroundMaterial,
            userData: {type: PINS_FLOOR},
            collisionFilterGroup: PINS_FLOOR,
            collisionFilterMask: PINS});
        _oPinWallForwardBody.addShape(oWallFloorShapePins);

        _oPinWallForwardBody.position.set(FLOOR_WALL_PINS_POSITION.x, FLOOR_WALL_PINS_POSITION.y, FLOOR_WALL_PINS_POSITION.z);
        _oWorld.addBody(_oPinWallForwardBody);

        if (SHOW_3D_RENDER && SHOW_PROXY_COLLISION) {
            var wallMaterial = new THREE.MeshPhongMaterial({color: 0x880000, specular: 0xffff00, shininess: 10});
            _oDemo.addVisual(_oPinWallForwardBody, wallMaterial);
        }
    };

    this.createPinsBinder = function () {
        var oPinsBinderShape = new CANNON.Box(new CANNON.Vec3(PINS_BINDER_PROPERTIES.width, PINS_BINDER_PROPERTIES.depth, PINS_BINDER_PROPERTIES.height));

        _oPinsBinderBody = new CANNON.Body({mass: 0,
            material: _oWallMaterial,
            userData: {type: PINS_FLOOR},
            collisionFilterGroup: PINS_FLOOR,
            collisionFilterMask: PINS,
            fixedRotation: true,
            allowSleep: false,
            sleepTimeLimit: 1});
        _oPinsBinderBody.addShape(oPinsBinderShape);
        _oPinsBinderBody.position.set(PINS_BINDER_POSITION.x, PINS_BINDER_POSITION.y, PINS_BINDER_POSITION.z);
        _oWorld.addBody(_oPinsBinderBody);
        _oPinsBinderBody.collisionResponse = 0;

        if (SHOW_3D_RENDER) {
            var binderMaterial = new THREE.MeshPhongMaterial({color: 0x555555, specular: 0x111111, shininess: 50});
            _oDemo.addVisual(_oPinsBinderBody, binderMaterial);
        }
    };

    this._createFieldBody = function (oMesh, iType) {
        var oFieldMesh = this.__extractMeshData(oMesh);


        var oBody = new CANNON.Body({mass: 0, material: _oGroundMaterial, userData: {type: iType}});
        oBody.addShape(oFieldMesh);

        var v3IniPos = new CANNON.Vec3(oMesh.position.x + OFFSET_TRACK_POSITION.x, oMesh.position.y + OFFSET_TRACK_POSITION.y,
                oMesh.position.z + OFFSET_TRACK_POSITION.z);
        oBody.position.copy(v3IniPos);

        _oWorld.addBody(oBody);

        if (SHOW_3D_RENDER) {
            var fieldMaterial = new THREE.MeshPhongMaterial({color: 0xdeb887, specular: 0x000000, shininess: 100});
            _oDemo.addVisual(oBody, fieldMaterial);
        }

        return oBody;
    };

    this.__extractMeshData = function (oMesh) {
        var aRawFaces = oMesh.geometry.faces;
        var aRawVerts = oMesh.geometry.vertices;
        var aOnlyFaceCoord = new Array();

        for (var i = 0; i < aRawFaces.length; i++) {
            aOnlyFaceCoord[i] = {a: aRawFaces[i].a, b: aRawFaces[i].b, c: aRawFaces[i].c};
        }

        var verts = [], faces = [];
        var fScale = 1;
        ;
        // Get vertices
        for (var i = 0; i < aRawVerts.length; i++) {
            verts.push(aRawVerts[i].x * fScale);
            verts.push(aRawVerts[i].y * fScale);
            verts.push(aRawVerts[i].z * fScale);
        }
        // Get faces
        for (var i = 0; i < aRawFaces.length; i++) {
            faces.push(aRawFaces[i].a);
            faces.push(aRawFaces[i].b);
            faces.push(aRawFaces[i].c);
        }
        // Construct polyhedron
        return new CANNON.Trimesh(verts, faces);
    };

    this.createPin = function (oPos, iID, bEnableTrackBall) {
        var oPinShape = new CANNON.Cylinder(PIN_PROPERTY.radius_top, PIN_PROPERTY.radius_bottom,
                PIN_PROPERTY.height, PIN_PROPERTY.segments);
        var oPinBody = new CANNON.Body({mass: PIN_PROPERTY.mass, material: _oPinMaterial, linearDamping: PIN_PROPERTY.linearDamping,
            angularDamping: PIN_PROPERTY.angularDamping, userData: {type: PINS, id: iID},
            collisionFilterGroup: PINS,
            collisionFilterMask: -1,
            allowSleep: true,
            sleepTimeLimit: 1});

        oPinBody.addShape(oPinShape);
        oPinBody.position.set(oPos.x, oPos.y, oPos.z);

        oPinBody.addEventListener("collide", function (e) {
            s_oScenario.pinCollision(e);
        });

        _oWorld.addBody(oPinBody);

        if (SHOW_3D_RENDER) {
            var pinMaterial = new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0x111111, shininess: 100});
            var oMesh = _oDemo.addVisual(oPinBody, pinMaterial);
            if (bEnableTrackBall && CAMERA_TEST_TRANSFORM && !CAMERA_TEST_TRACKBALL) {
                _oDemo.createTransformControl(oMesh, oPinBody);
            }
        }
        return oPinBody;
    };

    this.createWallPins = function () {
        var oWallShapePinsBack = new CANNON.Box(new CANNON.Vec3(WALL_PINS_SIZE.width, WALL_PINS_SIZE.depth, WALL_PINS_SIZE.height));
        var oShapeWallPinsSides = new CANNON.Box(new CANNON.Vec3(SIDE_WALL_PINS_SIZE.width, SIDE_WALL_PINS_SIZE.depth, SIDE_WALL_PINS_SIZE.height));
        var oShapeWallPinsDown = new CANNON.Box(new CANNON.Vec3(WALL_PINS_DOWN_SIZE.width, WALL_PINS_DOWN_SIZE.depth, WALL_PINS_DOWN_SIZE.height));
        var oShapeWallPinsForward = new CANNON.Box(new CANNON.Vec3(WALL_PINS_FORWARD_SIZE.width, WALL_PINS_FORWARD_SIZE.depth, WALL_PINS_FORWARD_SIZE.height));

        _oBodyWallPins = new CANNON.Body({mass: 0, material: _oWallMaterial, userData: {type: WALL}});
        _oBodyWallPins.addShape(oWallShapePinsBack);
        _oBodyWallPins.addShape(oShapeWallPinsSides, new CANNON.Vec3(WALL_PINS_SIZE.width, SIDE_WALL_PINS_SIZE.depth, 0));
        _oBodyWallPins.addShape(oShapeWallPinsSides, new CANNON.Vec3(-WALL_PINS_SIZE.width, SIDE_WALL_PINS_SIZE.depth, 0));
        _oBodyWallPins.addShape(oShapeWallPinsDown, new CANNON.Vec3(0, SIDE_WALL_PINS_SIZE.depth, -SIDE_WALL_PINS_SIZE.height));
        _oBodyWallPins.addShape(oShapeWallPinsForward, new CANNON.Vec3(0, WALL_PINS_DOWN_SIZE.depth * 2, -WALL_PINS_SIZE.height + WALL_PINS_FORWARD_SIZE.height));
        _oBodyWallPins.addShape(oShapeWallPinsDown, new CANNON.Vec3(0, SIDE_WALL_PINS_SIZE.depth, WALL_PINS_SIZE.height * 0.9));

        _oBodyWallPins.addEventListener("collide", function (e) {
            s_oScenario.wallCollision(e);
        });

        _oBodyWallPins.position.set(WALL_PINS_POSITION.x, WALL_PINS_POSITION.y, WALL_PINS_POSITION.z);
        _oWorld.addBody(_oBodyWallPins);

        if (SHOW_3D_RENDER) {
            var wallMaterial = new THREE.MeshPhongMaterial({color: 0x333333, specular: 0x111111, shininess: 50});
            _oDemo.addVisual(_oBodyWallPins, wallMaterial);
        }
    };

    this.createSideWallTrack = function () {
        var oSideWallShape = new CANNON.Box(new CANNON.Vec3(WALL_TRACK_SIZE.width, WALL_TRACK_SIZE.depth, WALL_TRACK_SIZE.height));
        var oRoofWallShape = new CANNON.Box(new CANNON.Vec3(ROOF_TRACK_SIZE.width, ROOF_TRACK_SIZE.depth, ROOF_TRACK_SIZE.height));

        _oSideWallBody = new CANNON.Body({mass: 0, material: _oWallMaterial, userData: {type: WALL_TRACK}});
        _oSideWallBody.addShape(oSideWallShape, new CANNON.Vec3(WALL_TRACK_SIZE.offsetX, 0, 0));
        _oSideWallBody.addShape(oSideWallShape, new CANNON.Vec3(-WALL_TRACK_SIZE.offsetX, 0, 0));
        _oSideWallBody.addShape(oRoofWallShape, new CANNON.Vec3(0, ROOF_TRACK_SIZE.offsetY, WALL_TRACK_SIZE.height * 0.85));

        _oSideWallBody.position.set(WALL_TRACK_POSITION.x, WALL_TRACK_POSITION.y, WALL_TRACK_POSITION.z);
        _oWorld.addBody(_oSideWallBody);

        if (SHOW_3D_RENDER && SHOW_PROXY_COLLISION) {
            var sideWallMaterial = new THREE.MeshPhongMaterial({color: 0xaaaaaa, specular: 0xffffff, shininess: 15});
            _oDemo.addVisual(_oSideWallBody, sideWallMaterial);
        }
    };

    this._createBallBody = function () {
        _oBallShape = new CANNON.Sphere(BALL_RADIUS);
        _oBallBody = new CANNON.Body({mass: BALL_PROPERTY.mass, material: _oBallMaterial, linearDamping: BALL_PROPERTY.linearDamping, allowSleep: false,
            angularDamping: BALL_PROPERTY.angularDamping, userData: {type: BALL}});

        var v3IniPos = new CANNON.Vec3(POSITION_BALL.x, POSITION_BALL.y, POSITION_BALL.z);
        _oBallBody.position.copy(v3IniPos);

        _oBallBody.addEventListener("collide", function (e) {
            s_oScenario.ballCollision(e);
        });

        _oBallBody.addShape(_oBallShape);
        _oWorld.add(_oBallBody);
        if (SHOW_3D_RENDER) {
            var ballMaterial = new THREE.MeshPhongMaterial({color: 0xaaaaaa, specular: 0x111111, shininess: 100});
            _oBallMesh = _oDemo.addVisual(_oBallBody, ballMaterial);
        }
    };

    this.addImpulse = function (oBody, oVec3) {
        var v3WorldPoint = new CANNON.Vec3(0, 0, BALL_RADIUS);
        var v3Impulse = new CANNON.Vec3(oVec3.x, oVec3.y, oVec3.z);
        oBody.applyImpulse(v3Impulse, v3WorldPoint);
    };

    this.addForce = function (oBody, oVec3) {
        var v3WorldPoint = new CANNON.Vec3(0, 0, 0);
        var v3Force = new CANNON.Vec3(oVec3.x, oVec3.y, oVec3.z);
        oBody.applyForce(v3Force, v3WorldPoint);
    };

    this.getBodyVelocity = function (oBody) {
        return oBody.velocity;
    };

    this.ballBody = function () {
        return _oBallBody;
    };

    this.ballMesh = function () {
        return _oBallMesh;
    };

    this.ballCollision = function (e) {
        if (e.contact.bi.userData.type === BALL && e.contact.bj.userData.type === PINS ||
                e.contact.bj.userData.type === BALL && e.contact.bi.userData.type === PINS) {
            s_oGame.setPinCollide();
        }
    };

    this.getCamera = function () {
        return _oDemo.camera();
    };

    this.floorCollision = function (e) {
        if (e.contact.bi.userData.type === BALL && e.contact.bj.userData.type === FLOOR ||
                e.contact.bj.userData.type === BALL && e.contact.bi.userData.type === FLOOR) {
            s_oGame.ballHitFloor();
        }
    };

    this.channelCollision = function (e) {
        if (e.contact.bi.userData.type === BALL && e.contact.bj.userData.type === CHANNEL ||
                e.contact.bj.userData.type === BALL && e.contact.bi.userData.type === CHANNEL) {
            s_oGame.gutterBall();
        }
    };

    this.getPinsBinder = function () {
        return _oPinsBinderBody;
    };

    this.getPinByID = function (iID) {
        return _aPin[iID];
    };

    this.setElementAngularVelocity = function (oElement, oVec3) {
        oElement.angularVelocity.set(oVec3.x, oVec3.y, oVec3.z);
    };

    this.setElementVelocity = function (oElement, oVec3) {
        var v3 = new CANNON.Vec3(oVec3.x, oVec3.y, oVec3.z);
        oElement.velocity = v3;
    };

    this.setElementLinearDamping = function (oElement, fValue) {
        oElement.linearDamping = fValue;
    };

    this.getTrackBody = function () {
        return _oTrackBody;
    };

    this.getTrackBodyDepth = function () {
        return _oBodyDepthTrack;
    };

    this.update = function () {
        _oWorld.step(PHYSICS_STEP);
    };

    this.resetPinsPosition = function () {
        for (var i = 0; i < _aPin.length; i++) {
            _aPin[i].position.set(PINS_POSITION[i].x, PINS_POSITION[i].y, PINS_POSITION[i].z);
            _aPin[i].quaternion.setFromEuler(0, 0, 0, 'XYZ');
            _aPin[i].angularVelocity.set(0, 0, 0);
            _aPin[i].velocity.set(0, 0, 0);
        }
    };

    this.getSideFloorPins = function (iID) {
        return _aSidesPinsFloor[iID];
    };

    this.pinCollision = function (e) {
        if (e.contact.bi.userData.type === PINS && e.contact.bj.userData.type === BALL) {
            s_oGame.pinSoundCollision(e.contact.bi.userData.id);
        } else if (e.contact.bj.userData.type === PINS && e.contact.bi.userData.type === BALL) {
            s_oGame.pinSoundCollision(e.contact.bj.userData.id);
        } else if (e.contact.bj.userData.type === PINS && e.contact.bi.userData.type === PINS) {
            s_oGame.twoPinsSoundCollision(e.contact.bj.userData.id, e.contact.bi.userData.id);
        }
    };

    this.sideWallCollision = function (e) {
        s_oGame.setPinDown(e.contact.bj.userData.id, true, SIDE_PINS_FLOOR);
    };

    this.sensorCollision = function (e) {
        e.contact.bj.sleep();
        if (e.contact.bj.userData.type === PINS) {
            s_oGame.setPinDown(e.contact.bj.userData.id, true, SIDE_PINS_FLOOR);
        }
    };

    this.wallCollision = function (e) {
        if (e.contact.bi.userData.type === BALL && e.contact.bj.userData.type === WALL ||
                e.contact.bj.userData.type === BALL && e.contact.bi.userData.type === WALL) {
            s_oGame.completeLaunch();
        } else if (e.contact.bj.userData.type === PINS && e.contact.bi.userData.type === WALL) {
            s_oGame.setPinDown(e.contact.bj.userData.id, true, WALL);
        }
    };

    this.destroyWorld = function () {
        var aBodies = _oWorld.bodies;

        for (var i = 0; i < aBodies.length; i++) {
            _oWorld.remove(aBodies[i]);
        }
        _oWorld = null;
    };

    s_oScenario = this;

    if (SHOW_3D_RENDER) {
        _oDemo.addScene("bowling", this._init);
        _oDemo.start();
    } else {
        this._init();
    }

}

var s_oScenario;


