/************************************* WHEN CALL THE FUNCTION BEYOND IS THE QUESTION ? **************************************/

function Ready(_case,params){

	if( _case == 'signout_click'){
	
		Alloy.Globals.Logs.llog('');
		Alloy.Globals.Logs.llog('');
		Alloy.Globals.Logs.llog('-----> USER NOW LOGOUTED (g___signout_process.js)');
		Alloy.Globals.Logs.llog('');
		Alloy.Globals.Logs.llog('');
		
		/////////////////////////////////////////////////////////////
		//////////// GOOGLE ANALYTICS //////////// (https://github.com/Sitata/titanium-google-analytics/blob/master/example/app.js)
		/////////////////////////////////////////////////////////////
		
		Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
			category: 													"App. navigation process",
			label: 															"Quit the application",
			action: 														"log out",
			value: 															1
		});
		
		////////////
		//////////// REMOVE in Local Storage the USER ID
		////////////
		
		Ti.App.Properties.setString('user_object','');

		////////////
		//////////// REMOVE SHARE TO ALL (GLOBAL)
		////////////
		
		Alloy.Globals.THE_USER 																= null;
		Alloy.Globals.POSSIBLE_USER 													= '';

	}
	
};

/****************************** EXPORT FOR APPCELERATOR ******************************/

var exportFunctions 																				= {
	
	Ready: function(_case,params){
		Ready(_case,params);
	}
	
};

module.exports 																						= exportFunctions;