function SignUp_Function(JSON_returned,local_params){

	if(
		typeof JSON_returned['error'] !== 'undefined'
	){
		
		Alloy.Globals.Logs.llog(JSON_returned);
		
		/*****************************/
		/* ALERT */
		/*****************************/
		Alloy.Globals.Logs.aalert(
			JSON_returned['error-message'],
			'',
			'',
			'Corriger',
			null,
			null,
			null,
			null,
			true
		);
		
	}
	else{
		
		Alloy.Globals.Logs.llog('USER CREATED');
		Alloy.Globals.Logs.llog(JSON_returned['output-array']);

		/*********************************/
		/* SAVE in Local Storage the USER ID */
		/*********************************/
		
		Ti.App.Properties.setString('user_object',JSON.stringify(JSON_returned['output-array']));
		Alloy.Globals.POSSIBLE_USER							= JSON.parse(Ti.App.Properties.getString('user_object'));
		
		//////////// GOOGLE ANALYTICS
		
		Alloy.Globals.GoogleAnalyticsTracker.setUser({
			userId: 																""+Alloy.Globals.POSSIBLE_USER.id_user+"",
			action: 																"User Signup",
			category: 															"Users trackings",
		});
		
		Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
			category: 															"User account management",
			label: 																	"Create an account",
			action: 																"create a new user profile",
			value: 																	1
		});

		/////////////// BLUE POPUP
		
		Alloy.Globals.Logs.aalert('Compte Swapbook crée !','Bravo pour ton inscription et bienvenue. Tu peux dès à présent te connecter et profiter de toutes les fonctionnalités de l\'application.','','',null,'#f2000000',null,false,'BLUE');
		
		if(typeof JSON_returned['output-array']['user_email'] != 'undefined')Alloy.Globals.userField.setValue(JSON_returned['output-array']['user_email']);
		if(typeof JSON_returned['output-array']['user_password'] != 'undefined')Alloy.Globals.passField.setValue(JSON_returned['output-array']['user_password']);		

		setTimeout(function(){
			
			if( typeof Alloy.Globals.toCloseWindows['signup_step_1'] != 'undefined')Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['signup_step_1']);
			
			if(
				!Alloy.Globals.POSSIBLE_USER.id_user && 
				!Alloy.Globals.THE_USER.id_user
			)return;
			
			setTimeout(function(){
				
				Ti.App.Properties.setString('user_and_questionnaire_1','yes');
											
				Alloy.Globals.app.goToFAST("page_3_f_1_user_questions",
					{
						question_family: 			1, 
						questions_title: 				'DERNIÈRE ÉTAPE',
						questions_header: 		'Encore un dernier effort ! Remplis ce court questionnaire anonyme pour que tu puisse matcher avec un étudiant qui te correspond :'
					}
				);
				
			},1800);
			
		},6000);
		
	}

};

/************************************* WHEN CALL THE FUNCTION BEYOND IS THE QUESTION ? **************************************/

function Ready(_case,selector){
	
	/*************************************************** ON CLICK ! ************************************************/

	/*****************************/
	/* Sign up open */
	/*****************************/
	
	if( _case == 'signup_open'){
		
		Alloy.Globals.Logs.llog('-----> BIND SIGN-UP FORM BUTTON (f___signup_process.js)');
		
		selector.addEventListener('click',function(e){
			
			if(!Alloy.Globals.endPoints || !Alloy.Globals.endPoints.createUserAccount){
				
				Alloy.Globals.Requests.loadings_are_NOT_possible();
				return;
				
			}
		
			Alloy.Globals.Logs.llog('-----> OPEN SIGN-UP FORM CLICK (f___signup_process.js)');
		
			Alloy.Globals.preventDoubleClick(this);
		
			Alloy.Globals.app.goTo("index_signup_1",{});
	
		});

	}
	
};

/****************************** EXPORT FOR APPCELERATOR ******************************/

var exportFunctions 														= {
	
	SignUp_Function: function(JSON_returned,local_params){
		SignUp_Function(JSON_returned,local_params);
	},
	
	Ready: function(_case,_item){
		Ready(_case,_item);
	}
	
};

module.exports 																= exportFunctions;