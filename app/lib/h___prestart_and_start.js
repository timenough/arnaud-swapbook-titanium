function preStartApp(){

	var ever_see_intro 											= Ti.App.Properties.getString('intro');

	if( 
		ever_see_intro != null && 
		ever_see_intro != ''
	){
		
		Alloy.Globals.Logs.llog('');
		Alloy.Globals.Logs.llog('********************** PRESTART 1a : DO NOTHING **********************');
		Alloy.Globals.Logs.llog('');
		
	}
	else{
		
		Alloy.Globals.Logs.llog('');
		Alloy.Globals.Logs.llog('********************** PRESTART 1b : GO TO APP INTRO **********************');
		Alloy.Globals.Logs.llog('');
		
		Ti.App.Properties.setString('intro','OKOK');
		
		Alloy.Globals.app.goTo("index_intro_1",{});
	    
	}

};

function StartApp(){
	
	if( 
		Alloy.Globals.POSSIBLE_USER != null && 
		Alloy.Globals.POSSIBLE_USER != ''
	) {
			
		/* ********* RE-CONFIRM THE USER DATA IN BACKGROUND ********* */

		Alloy.Globals.THE_USER								= typeof Alloy.Globals.POSSIBLE_USER == 'string' ? JSON.parse(Alloy.Globals.POSSIBLE_USER) : Alloy.Globals.POSSIBLE_USER;

		//////////////////////////////////////////////
		/////////////// NOTIFICATIONS /////////
		//////////////////////////////////////////////
		
		setTimeout(function(){
			Alloy.Globals.app_NOTIFICATIONS_start_process();
		},5000);
		
		////////////////////////////////////////////
		/////////// GEOLOCATION ////////////
		////////////////////////////////////////////
		
		setTimeout(function(){
			Alloy.Globals.app_GEOLOCATION_start_process();
		},15000);
		
		/////////////////////////////////////////////////////////////
		//////////// GOOGLE ANALYTICS //////////// (https://github.com/Sitata/titanium-google-analytics/blob/master/example/app.js)
		/////////////////////////////////////////////////////////////
		
		Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
			category: 													"App. navigation process",
			label: 															"Start the application",
			action: 														"see home page",
			value: 															1
		});
		
		/////////////////////////////////////////////////////////////
		/////////// REGULAR BACKEND CHECK ////////////
		/////////////////////////////////////////////////////////////
		
		Alloy.Globals.app_BACKEND_start_process();
		
		/////////////////////////////////
		/////////// START ////////////
		/////////////////////////////////
		
		Alloy.Globals.Logs.llog('');
		Alloy.Globals.Logs.llog('********************** START OF THE APPLICATION 1a : GO TO HOME (h___prestart_and_start.js) **********************');
		Alloy.Globals.Logs.llog('');
		
		Alloy.Globals.app.goTo(Alloy.Globals.THE_START_PAGE,{});

	}
	else{
		
		/*********/
		/* ALERT */
		/*********/
		
		Alloy.Globals.Logs.llog('');
		Alloy.Globals.Logs.llog('********************** START OF THE APPLICATION 1b : STAY ON LOGIN PAGE (h___prestart_and_start.js) **********************');
		Alloy.Globals.Logs.llog('');
		
		Alloy.Globals.Logs.aalert('Tu dois être connecté(e) pour accéder à cette partie de Swapbook.','','','OK',null,null,null,null,true);
			
	}
	
};

/****************************** EXPORT FOR APPCELERATOR ******************************/

var exportFunctions 												= {
	
	preStartApp: function(){
		preStartApp();
	},
	
	StartApp: function(){
		StartApp();
	}
	
};

module.exports 														= exportFunctions;