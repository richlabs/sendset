// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

//cranberrygame start
//cranberrygame end

/*
//cranberrygame start: structure
cr.plugins_.Translation = function(runtime)
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
cr.plugins_.Translation = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	/////////////////////////////////////
	// *** CHANGE THE PLUGIN ID HERE *** - must match the "id" property in edittime.js
	//                            vvvvvvvv
	var pluginProto = cr.plugins_.Translation.prototype;
		
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
		var exist=false;
		for(var i=0;i<scripts.length;i++){
			//alert(scripts[i].src);//http://localhost:50000/jquery-2.0.0.min.js
			if(scripts[i].src.indexOf("cordova.js")!=-1||scripts[i].src.indexOf("phonegap.js")!=-1){
				exist=true;
				break;
			}
		}
		if(!exist){
			var newScriptTag=document.createElement("script");
			newScriptTag.setAttribute("type","text/javascript");
			newScriptTag.setAttribute("src", "cordova.js");
			document.getElementsByTagName("head")[0].appendChild(newScriptTag);
		}
*/		
//cranberrygame start
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
			self.runtime.trigger(cr.plugins_.Translation.prototype.cnds.TriggerCondition, self);
		});
*/
//cranberrygame start
		this.hashtable = {};		
//cranberrygame end				
	};
	
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
var language="";
var languageIsDetected=true;

	Cnds.prototype.LanguageIsDetected = function ()
	{
		if(language=="")
			language=Language(this.properties[0]);
					
		return languageIsDetected;
	};

	Cnds.prototype.LanguageIs = function (language_)
	{
		if(language=="")
			language=Language(this.properties[0]);
					
		return language==language_;
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
		self.runtime.trigger(cr.plugins_.Translation.prototype.cnds.TriggerCondition, self);	
	};	
*/
	
//cranberrygame start
	Acts.prototype.ChangeLanguage = function (language_)
	{
		language=language_;
	};		

//http://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects-dynamically
function MergeRecursive(obj1, obj2) {

  for (var p in obj2) {
    try {
      // Property in destination object set; update its value.
      if ( obj2[p].constructor==Object ) {
        obj1[p] = MergeRecursive(obj1[p], obj2[p]);

      } else {
        obj1[p] = obj2[p];

      }

    } catch(e) {
      // Property in destination object not set; create it and set its value.
      obj1[p] = obj2[p];

    }
  }

  return obj1;
}

  Acts.prototype.AddFromJSONString = function (JSONString)
	{  
    this.hashtable = MergeRecursive(this.hashtable, JSON.parse(JSONString));
    
    //alert(JSON.stringify(this.hashtable));
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
function Language(defaultLanguage){
		//https://groups.google.com/forum/#!msg/phonegap/EkCyEBO8Dj4/SRPak1gT4XgJ
		
		var mat;
		var language="";
		//temp=navigator.language;
		//code=temp.substr(0,2); //error: always return en
		if(mat = navigator.userAgent.match(/bada.*\W(\w\w)-(\w\w)\W/i)){ //bada
			language=mat[1];
		}
		//temp=navigator.language;
		//code=temp.substr(0,2); //error: always return en
		else if(mat = navigator.userAgent.match(/blackberry.*\W(\w\w)-(\w\w)\W/i)){ //blackberry blackberry
			language=mat[1];
		}
		else{
			language="";
		}

		//if(!language){
		//if(language==null){
		if(language==""){
			var temp;
			if (navigator.language) { //non-IE: ios (en-US) , blackberry playbook (en-US) , qt (en-US) , webos (en_US)
					temp = navigator.language; 
			} else if (navigator.browserLanguage) { //IE, windows-phone-8,windows-phone-7 (en-US)
					temp = navigator.browserLanguage;
			} else if (navigator.userLanguage) { //IE, windows8 not complete
					temp = navigator.userLanguage;
			} else if (navigator.systemLanguage) { //IE
					temp = navigator.systemLanguage;
			}

			language=temp.substr(0,2);
		}
		
		if (typeof WinJS!="undefined") {//windows8
			//var languages = Windows.System.UserProfile.GlobalizationPreferences.languages;//minifiy error//http://www.scirra.com/forum/error-related-with-png-recompression-option_topic74728.html
      																								   //http://www.scirra.com/forum/plugin-developers-please-test-with-the-minifier_topic45502_page1.html 
			var languages = Windows["System"]["UserProfile"]["GlobalizationPreferences"]["languages"]; //http://msdn.microsoft.com/en-us/library/windows/apps/windows.system.userprofile.globalizationpreferences.languages.aspx
      																								   //http://kraigbrockschmidt.com/blog/?p=841
      																								   //http://stackoverflow.com/questions/2678230/how-to-getting-browser-current-locale-preference-using-javascript
			language=languages[0].substr(0,2);
			//console.log(code);
		}
		else if ((typeof pokki != "undefined") || (navigator.userAgent.indexOf("NodeWebkit")!=-1)){
			language="";
		}		        
		
		if (language==""){
			languageIsDetected=false;
			//language="en";
			language=defaultLanguage;
			//alert(defaultLanguage);
		}		
		        
		return language
}

	Exps.prototype.Language = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		if(language=="")
			language=Language(this.properties[0]);
			
		ret.set_string(language);		// for ef_return_string
		//ret.set_int(1337);				// return our value
		// ret.set_float(0.5);			// for returning floats
		// ret.set_string("Hello");		// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string
	};
	
	Exps.prototype.Text = function (ret, key)
	{     
		if(language=="")
			language=Language(this.properties[0]);

		var text="";
		try
		{					
			text=this.hashtable[language][key];
  	}
  	catch(e)
  	{
  	}
      
		ret.set_string(text);		// for ef_return_string
		//ret.set_int(1337);				// return our value
		// ret.set_float(0.5);			// for returning floats
		// ret.set_string("Hello");		// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string		
	};  	
//cranberrygame end
	
	// ... other expressions here ...
	
	pluginProto.exps = new Exps();

}());