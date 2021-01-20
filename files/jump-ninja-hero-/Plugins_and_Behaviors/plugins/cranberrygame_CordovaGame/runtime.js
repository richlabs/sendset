// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/*
//cranberrygame start: structure
cr.plugins_.cranberrygame_CordovaGame = function(runtime)
{
	this.runtime = runtime;
	Type
		onCreate
	Instance
		onCreate
		draw
		drawGL		
	cnds
		//MyCondition
		//TriggerCondition
	acts
		//MyAction
		//TriggerAction
	exps
		//MyExpression
};		
//cranberrygame end: structure
*/

/////////////////////////////////////
// Plugin class
// *** CHANGE THE PLUGIN ID HERE *** - must match the "id" property in edittime.js
//          vvvvvvvv
cr.plugins_.cranberrygame_CordovaGame = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	/////////////////////////////////////
	// *** CHANGE THE PLUGIN ID HERE *** - must match the "id" property in edittime.js
	//                            vvvvvvvv
	var pluginProto = cr.plugins_.cranberrygame_CordovaGame.prototype;
		
	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;

	// called on startup for each object type
	typeProto.onCreate = function()
	{
		
/*			
		//cranberrygame
		var newScriptTag=document.createElement('script');
		newScriptTag.setAttribute("type","text/javascript");
		newScriptTag.setAttribute("src", "mylib.js");
		document.getElementsByTagName("head")[0].appendChild(newScriptTag);
		//cranberrygame
		var scripts=document.getElementsByTagName("script");
		var scriptExist=false;
		for(var i=0;i<scripts.length;i++){
			//alert(scripts[i].src);//http://localhost:50000/jquery-2.0.0.min.js
			if(scripts[i].src.indexOf("cordova.js")!=-1||scripts[i].src.indexOf("phonegap.js")!=-1){
				scriptExist=true;
				break;
			}
		}
		if(!scriptExist){
			var newScriptTag=document.createElement("script");
			newScriptTag.setAttribute("type","text/javascript");
			newScriptTag.setAttribute("src", "cordova.js");
			document.getElementsByTagName("head")[0].appendChild(newScriptTag);
		}
*/		
//cranberrygame start
		if(this.runtime.isBlackberry10 || this.runtime.isWindows8App || this.runtime.isWindowsPhone8 || this.runtime.isWindowsPhone81){
			var scripts=document.getElementsByTagName("script");
			var scriptExist=false;
			for(var i=0;i<scripts.length;i++){
				//alert(scripts[i].src);//http://localhost:50000/jquery-2.0.0.min.js
				if(scripts[i].src.indexOf("cordova.js")!=-1||scripts[i].src.indexOf("phonegap.js")!=-1){
					scriptExist=true;
					break;
				}
			}
			if(!scriptExist){
				var newScriptTag=document.createElement("script");
				newScriptTag.setAttribute("type","text/javascript");
				newScriptTag.setAttribute("src", "cordova.js");
				document.getElementsByTagName("head")[0].appendChild(newScriptTag);
			}
		}
//cranberrygame end		
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
		
		// any other properties you need, e.g...
		// this.myValue = 0;
	};
	
	var instanceProto = pluginProto.Instance.prototype;

	// called whenever an instance is created
	instanceProto.onCreate = function()
	{
		// note the object is sealed after this call; ensure any properties you'll ever need are set on the object
		// e.g...
		// this.myValue = 0;
		
/*
		var self=this;
		window.addEventListener("resize", function () {//cranberrygame
			self.runtime.trigger(cr.plugins_.cranberrygame_CordovaGame.prototype.cnds.TriggerCondition, self);
		});
*/
//cranberrygame start
		if (!(this.runtime.isAndroid || this.runtime.isiOS))
			return;
        if (typeof game == 'undefined')
            return;	
		
		//this.playerId
		//this.playerDisplayName
		//this.playerImageUrl
		//this.playerScore
		//this.curTag
		
		var self = this;
		
		game["setUp"]();

		game['onLoginSucceeded'] = function(result) {
			var playerDetail = result;
			self.playerId = playerDetail['playerId'];
			self.playerDisplayName = playerDetail['playerDisplayName'];
			self.curTag = game['tag'];			
			self.runtime.trigger(cr.plugins_.cranberrygame_CordovaGame.prototype.cnds.OnLoginSucceeded, self);
		};	
		game['onLoginFailed'] = function() {
			self.curTag = game['tag'];		
			self.runtime.trigger(cr.plugins_.cranberrygame_CordovaGame.prototype.cnds.OnLoginFailed, self);
		};		
		game['onGetPlayerImageSucceeded'] = function(result) {
			self.playerImageUrl = result;
			self.runtime.trigger(cr.plugins_.cranberrygame_CordovaGame.prototype.cnds.OnGetPlayerImageSucceeded, self);
		};	
		game['onGetPlayerImageFailed'] = function() {
			self.runtime.trigger(cr.plugins_.cranberrygame_CordovaGame.prototype.cnds.OnGetPlayerImageFailed, self);
		};
		game['onGetPlayerScoreSucceeded'] = function(result) {
			self.playerScore = result;
			self.curTag = game['tag'];
			self.runtime.trigger(cr.plugins_.cranberrygame_CordovaGame.prototype.cnds.OnGetPlayerScoreSucceeded, self);
		};	
		game['onGetPlayerScoreFailed'] = function() {
			self.curTag = game['tag'];
			self.runtime.trigger(cr.plugins_.cranberrygame_CordovaGame.prototype.cnds.OnGetPlayerScoreFailed, self);
		};
		game['onSubmitScoreSucceeded'] = function() {
			self.curTag = game['tag'];
			self.runtime.trigger(cr.plugins_.cranberrygame_CordovaGame.prototype.cnds.OnSubmitScoreSucceeded, self);
		};	
		game['onSubmitScoreFailed'] = function() {
			self.curTag = game['tag'];
			self.runtime.trigger(cr.plugins_.cranberrygame_CordovaGame.prototype.cnds.OnSubmitScoreFailed, self);
		};
		game['onUnlockAchievementSucceeded'] = function() {
			self.curTag = game['tag'];
			self.runtime.trigger(cr.plugins_.cranberrygame_CordovaGame.prototype.cnds.OnUnlockAchievementSucceeded, self);
		};	
		game['onUnlockAchievementFailed'] = function() {
			self.curTag = game['tag'];
			self.runtime.trigger(cr.plugins_.cranberrygame_CordovaGame.prototype.cnds.OnUnlockAchievementFailed, self);
		};		
		game['onIncrementAchievementSucceeded'] = function() {
			self.curTag = game['tag'];		
			self.runtime.trigger(cr.plugins_.cranberrygame_CordovaGame.prototype.cnds.OnIncrementAchievementSucceeded, self);
		};	
		game['onIncrementAchievementFailed'] = function() {
			self.curTag = game['tag'];		
			self.runtime.trigger(cr.plugins_.cranberrygame_CordovaGame.prototype.cnds.OnIncrementAchievementFailed, self);
		};		
		game['onResetAchievementsSucceeded'] = function() {
			self.runtime.trigger(cr.plugins_.cranberrygame_CordovaGame.prototype.cnds.OnResetAchievementsSucceeded, self);
		};	
		game['onResetAchievementsFailed'] = function() {
			self.runtime.trigger(cr.plugins_.cranberrygame_CordovaGame.prototype.cnds.OnResetAchievementsFailed, self);
		};		
//cranberrygame end			
	};
	
//cranberrygame start	
//cranberrygame end
	
	// only called if a layout object - draw to a canvas 2D context
	instanceProto.draw = function(ctx)
	{
	};
	
	// only called if a layout object in WebGL mode - draw to the WebGL context
	// 'glw' is not a WebGL context, it's a wrapper - you can find its methods in GLWrap.js in the install
	// directory or just copy what other plugins do.
	instanceProto.drawGL = function (glw)
	{
	};

/*
	instanceProto.at = function (x)
	{
		return this.arr[x];
	};
	
	instanceProto.set = function (x, val)
	{
		this.arr[x] = val;
	};
*/	
//cranberrygame start
//cranberrygame end
	
	//////////////////////////////////////
	// Conditions
	function Cnds() {};

/*
	// the example condition
	Cnds.prototype.MyCondition = function (myparam)
	{
		// return true if number is positive
		return myparam >= 0;
	};

	//cranberrygame
	Cnds.prototype.TriggerCondition = function ()
	{
		return true;
	};
*/
	
//cranberrygame start
	Cnds.prototype.OnLoginSucceeded = function (tag)
	{
		return cr.equals_nocase(tag, this.curTag);
	};	
	Cnds.prototype.OnLoginFailed = function (tag)
	{
		return cr.equals_nocase(tag, this.curTag);
	};	
	Cnds.prototype.IsLoggedIn = function ()
	{
		if (!(this.runtime.isAndroid || this.runtime.isiOS))
			return false;
        if (typeof game == 'undefined')
			return false;
			
		return game['isLoggedIn']();
	};
	Cnds.prototype.OnGetPlayerImageSucceeded = function ()
	{
		return true;
	};	
	Cnds.prototype.OnGetPlayerImageFailed = function ()
	{
		return true;
	};	
	Cnds.prototype.OnGetPlayerScoreSucceeded = function (tag)
	{
		return cr.equals_nocase(tag, this.curTag);
	};	
	Cnds.prototype.OnGetPlayerScoreFailed = function (tag)
	{
		return cr.equals_nocase(tag, this.curTag);
	};	
	Cnds.prototype.OnSubmitScoreSucceeded = function (tag)
	{
		return cr.equals_nocase(tag, this.curTag);
	};	
	Cnds.prototype.OnSubmitScoreFailed = function (tag)
	{
		return cr.equals_nocase(tag, this.curTag);
	};
	Cnds.prototype.OnUnlockAchievementSucceeded = function (tag)
	{
		return cr.equals_nocase(tag, this.curTag);
	};	
	Cnds.prototype.OnUnlockAchievementFailed = function (tag)
	{
		return cr.equals_nocase(tag, this.curTag);
	};
	Cnds.prototype.OnIncrementAchievementSucceeded = function (tag)
	{
		return cr.equals_nocase(tag, this.curTag);
	};	
	Cnds.prototype.OnIncrementAchievementFailed = function (tag)
	{
		return cr.equals_nocase(tag, this.curTag);
	};
	Cnds.prototype.OnResetAchievementsSucceeded = function ()
	{
		return true;
	};	
	Cnds.prototype.OnResetAchievementsFailed = function ()
	{
		return true;
	};	
//cranberrygame end
	
	// ... other conditions here ...
	
	pluginProto.cnds = new Cnds();
	
	//////////////////////////////////////
	// Actions
	function Acts() {};

/*
	// the example action
	Acts.prototype.MyAction = function (myparam)
	{
		// alert the message
		alert(myparam);
	};
	
	//cranberrygame
	Acts.prototype.TriggerAction = function ()
	{
		var self=this;		
		self.runtime.trigger(cr.plugins_.cranberrygame_CordovaGame.prototype.cnds.TriggerCondition, self);
	};	
*/
	
//cranberrygame start
	Acts.prototype.Login = function (tag)
	{
		if (!(this.runtime.isAndroid || this.runtime.isiOS))
			return;
        if (typeof game == 'undefined')
            return;
		
		var self = this;
		game["login"](tag);
	};
	Acts.prototype.GetPlayerImage = function ()
	{
		if (!(this.runtime.isAndroid || this.runtime.isiOS))
			return;
        if (typeof game == 'undefined')
            return;
		
		var self = this;
		game["getPlayerImage"]();
	};	
	Acts.prototype.GetPlayerScore = function (leaderboardId, tag)
	{		
		if (!(this.runtime.isAndroid || this.runtime.isiOS))
			return;
        if (typeof game == 'undefined')
            return;
	
		var self = this;
		game["getPlayerScore"](leaderboardId, tag);
	};
	Acts.prototype.SubmitScore = function (leaderboardId, score, tag)
	{		
		if (!(this.runtime.isAndroid || this.runtime.isiOS))
			return;
        if (typeof game == 'undefined')
            return;
	
		var self = this;
		game["submitScore"](leaderboardId, score, tag);
	};
	Acts.prototype.ShowLeaderboard = function (leaderboardId)
	{
		if (!(this.runtime.isAndroid || this.runtime.isiOS))
			return;
        if (typeof game == 'undefined')
            return;
	
		var self = this;
		game["showLeaderboard"](leaderboardId);
	};
	Acts.prototype.ShowLeaderboards = function ()
	{
		if (!(this.runtime.isAndroid || this.runtime.isiOS))
			return;
        if (typeof game == 'undefined')
            return;
	
		var self = this;
		game["showLeaderboards"]();
	};
	Acts.prototype.UnlockAchievement = function (achievementId, tag)
	{
		if (!(this.runtime.isAndroid || this.runtime.isiOS))
			return;
        if (typeof game == 'undefined')
            return;
		
		var self = this;
		game["unlockAchievement"](achievementId, tag);
	};
	Acts.prototype.IncrementAchievement = function (achievementId, incrementalStepOrCurrentPercent, tag)
	{
		if (!(this.runtime.isAndroid || this.runtime.isiOS))
			return;
        if (typeof game == 'undefined')
            return;
		
		var self = this;
		game["incrementAchievement"](achievementId, incrementalStepOrCurrentPercent, tag);
	};	
	Acts.prototype.ShowAchievements = function ()
	{
		if (!(this.runtime.isAndroid || this.runtime.isiOS))
			return;
        if (typeof game == 'undefined')
            return;
	
		var self = this;
		game["showAchievements"]();
	};
	Acts.prototype.ResetAchievements = function ()
	{
		if (!(this.runtime.isAndroid || this.runtime.isiOS))
			return;
        if (typeof game == 'undefined')
            return;
	
		var self = this;
		game["resetAchievements"]();
	};	
	Acts.prototype.Logout = function ()
	{
		if (!(this.runtime.isAndroid || this.runtime.isiOS))
			return;
        if (typeof game == 'undefined')
            return;
		
		var self = this;
		game["logout"]();
	};
//cranberrygame end
	
	// ... other actions here ...
	
	pluginProto.acts = new Acts();
	
	//////////////////////////////////////
	// Expressions
	function Exps() {};
	
/*	
	// the example expression
	Exps.prototype.MyExpression = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		ret.set_int(1337);				// return our value
		// ret.set_float(0.5);			// for returning floats
		// ret.set_string("Hello");		// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string
	};
	
	Exps.prototype.Text = function (ret, param) //cranberrygame
	{     
		ret.set_string("Hello");		// for ef_return_string
		//ret.set_int(1337);				// return our value
		// ret.set_float(0.5);			// for returning floats
		// ret.set_string("Hello");		// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string		
	};	
*/
	
//cranberrygame start
	Exps.prototype.PlayerId = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		ret.set_string(this.playerId);		// for ef_return_string
		//ret.set_int(this.playerScore);				// return our value
		// ret.set_float(0.5);			// for returning floats
		// ret.set_string("Hello");		// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string
	};
	Exps.prototype.PlayerDisplayName = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		ret.set_string(this.playerDisplayName);		// for ef_return_string
		//ret.set_int(this.playerScore);				// return our value
		// ret.set_float(0.5);			// for returning floats
		// ret.set_string("Hello");		// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string
	};
	Exps.prototype.PlayerImageUrl = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		ret.set_string(this.playerImageUrl);		// for ef_return_string
		//ret.set_int(this.playerScore);				// return our value
		// ret.set_float(0.5);			// for returning floats
		// ret.set_string("Hello");		// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string
	};
	Exps.prototype.PlayerScore = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		ret.set_int(this.playerScore);				// return our value
		// ret.set_float(0.5);			// for returning floats
		// ret.set_string("Hello");		// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string
	};
//cranberrygame end
	
	// ... other expressions here ...
	
	pluginProto.exps = new Exps();

}());