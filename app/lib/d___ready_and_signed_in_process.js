function TheUserIsStillConnected_Function(JSON_returned,local_params){

	if(
		typeof JSON_returned['error'] !== 'undefined'
	){

		var splashcreen 												= setTimeout(function(){

			Alloy.Globals.Logs.llog('-----> CALL THE StartApp() FUNCTION (d___signed_in_process.js)');
			
			Alloy.Globals.Start.preStartApp();

		},2000);

		Alloy.Globals.Logs.llog('-----> USER SESSION EMPTY/EXPIRED (d___signed_in_process.js)');
		Alloy.Globals.Logs.llog(JSON_returned['error-message']);
		
	}
	else{

		////////////
		//////////// START THE APP
		////////////

		var splashcreen 												= setTimeout(function(){

			Alloy.Globals.Logs.llog('-----> CALL THE StartApp() FUNCTION (d___signed_in_process.js)');
		
			Alloy.Globals.Start.StartApp();

		},250);

		Alloy.Globals.Logs.llog('-----> USER STILL LOGGED (d___signed_in_process.js)');
		
		////////////
		//////////// SHARE USER INFOS TO ALL (GLOBAL)
		////////////
		
		Alloy.Globals.THE_USER 									= JSON_returned['output-array'];
		
		////////////
		//////////// GOOGLE ANALYTICS
		////////////
		
		Alloy.Globals.GoogleAnalyticsTracker.setUser({
			userId: 																						""+Alloy.Globals.THE_USER.id_user+"",
			action: 																						"User Signed in",
			category: 																					"UX",
		});
		
	}

};

/************************************* WHEN CALL THE FUNCTION BEYOND IS THE QUESTION ? **************************************/

function Ready(_case,selector){
	
	Alloy.Globals.Logs.llog('-----> APPLICATION NOT READY : index.js NOT opened (d___signed_in_process.js)');
	
	if(Alloy.Globals.app_and_user_ready === false)return;
	if(!Alloy.Globals.endPoints || !Alloy.Globals.endPoints.userLogkeep)return;
	
	Alloy.Globals.Logs.llog('-----> APPLICATION  READY : index.js opened (d___signed_in_process.js)');
	Alloy.Globals.Logs.llog('');
	
	/*************************************************** ON APP READY ! ************************************************/
	
	/*****************************/
	/* Sign in needed ? */
	/*****************************/
	
	if( typeof Ti.App.Properties.getString('user_object') != 'undefined' ){
		
		if( 
			Alloy.Globals.POSSIBLE_USER != null && 
			Alloy.Globals.POSSIBLE_USER != ''
		) {
			
			/* ********* RE-CONFIRM THE USER DATA IN BACKGROUND ********* */
			
			Alloy.Globals.THE_USER								= typeof Alloy.Globals.POSSIBLE_USER == 'string' ? JSON.parse(Alloy.Globals.POSSIBLE_USER) : Alloy.Globals.POSSIBLE_USER;
			
			Alloy.Globals.Logs.llog('-----> THE USER OBJECT WE HAVE (d___signed_in_process.js) :');
			Alloy.Globals.Logs.llog(JSON.stringify(Alloy.Globals.THE_USER));
			Alloy.Globals.Logs.llog("");
			
			/* ********* QUERY PARAMS ********* */
			
			var request_input											= [];
			request_input['async_execution']				= Alloy.Globals.SignedIn.TheUserIsStillConnected_Function;
			request_input['async_params']					= [];
			
			/* ********* QUERY ********* */
			
			Alloy.Globals.Requests.RequestsMaker(
				'POST',
				true,
				Alloy.Globals.endPoints.userLogkeep,
				{
					id_user:													Alloy.Globals.THE_USER.id_user
				},
				request_input,
				false,
				true
			);
			
		}
		else{
	
			/*****************************/
			/* Splashcreen */
			/*****************************/
	
			var splashcreen 											= setTimeout(function(){
	
				Alloy.Globals.Start.preStartApp();
	
			},1500);
		
		}
	
	}
	else{

		/*****************************/
		/* Splashcreen */
		/*****************************/

		var splashcreen 												= setTimeout(function(){

			Alloy.Globals.Start.preStartApp();

		},1500);
	
	}

};

/****************************** EXPORT FOR APPCELERATOR ******************************/

var exportFunctions 													= {
	
	TheUserIsStillConnected_Function: function(JSON_returned,local_params){
		TheUserIsStillConnected_Function(JSON_returned,local_params);
	},
	
	Ready: function(_case,_item){
		Ready(_case,_item);
	}
	
};

module.exports 															= exportFunctions;