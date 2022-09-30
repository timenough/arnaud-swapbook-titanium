function SignIn_Function(JSON_returned,local_params){

	if(
		typeof JSON_returned['error'] !== 'undefined'
	){
		
		Alloy.Globals.Logs.llog("");
		Alloy.Globals.Logs.llog('-----> SIGN-IN ERROR (e___signin_process.js)');
		Alloy.Globals.Logs.llog(JSON_returned);
		Alloy.Globals.Logs.llog("");
		
		////////////
		//////////// ALERT
		////////////
		
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
		
		//////////// 
		//////////// DON'T START APP 
		////////////
		
	}
	else{
		
		Alloy.Globals.Logs.llog("");
		Alloy.Globals.Logs.llog('-----> USER IS NOW LOGGED (e___signin_process.js)');
		Alloy.Globals.Logs.llog(JSON_returned['output-array']);
		Alloy.Globals.Logs.llog("");
		
		////////////
		//////////// SAVE in Local Storage the USER ID
		////////////
		
		Ti.App.Properties.setString('user_object',JSON.stringify(JSON_returned['output-array']));

		////////////
		//////////// SHARE TO ALL (GLOBAL)
		////////////
		
		Alloy.Globals.POSSIBLE_USER													= JSON_returned['output-array'];
		
		////////////
		//////////// GOOGLE ANALYTICS
		////////////
		
		Alloy.Globals.GoogleAnalyticsTracker.setUser({
			userId: 																						""+Alloy.Globals.POSSIBLE_USER.id_user+"",
			action: 																						"User Signin",
			category: 																					"Users trackings",
		});

		////////////
		//////////// START THE APP
		////////////
		
		Alloy.Globals.Logs.llog('-----> CALL THE StartApp() FUNCTION (e___signin_process.js)');
		
		Alloy.Globals.Start.StartApp();
		
	}

};

/************************************* WHEN CALL THE FUNCTION BEYOND IS THE QUESTION ? **************************************/

function Ready(_case,selector){
	
	/*************************************************** ON CLICK ! ************************************************/
	
	/*****************************/
	/* Sign in BUTTON */
	/*****************************/

	if( _case == 'signin_click'){
		
		Alloy.Globals.Logs.llog('-----> BIND SIGN-IN BUTTON (e___signin_process.js)');
		
		selector.addEventListener('click',function(e){
			
			if(!Alloy.Globals.endPoints || !Alloy.Globals.endPoints.userLogin){
				
				Alloy.Globals.Requests.loadings_are_NOT_possible();
				return;
				
			}
		
			Alloy.Globals.Logs.llog('-----> SIGN-IN CLICK (e___signin_process.js)');
		
			if(!this.cancel_case){
				
				Alloy.Globals.preventDoubleClick(this);
		
				var request_input																	= [];
				request_input['async_execution']										= Alloy.Globals.SignIn.SignIn_Function;
				request_input['async_params']											= [];
		
				/* ********* CONTROLS ****** */
				
				var input1 																				= Alloy.Globals.userField.value;
				var input2 																				= Alloy.Globals.passField.value;
		
				if( input1.length < 4 ){Alloy.Globals.Logs.aalert('Merci de saisir ton nom d\'utilisateur.','','','Corriger',null,null,null,null,true);return;}
				if( input2.length < 4 ){Alloy.Globals.Logs.aalert('Merci de saisir ton mot de passe.','','','Corriger',null,null,null,null,true);return;}
				
				/* ********* QUERY ********* */
				
				Alloy.Globals.Requests.RequestsMaker(
					'POST',
					true,
					Alloy.Globals.endPoints.userLogin,
					{
						username:																		input1,
						password:																		input2
					},
					request_input,
					false,
					false
				);
				
			}
			else{
				
				Alloy.Globals.passField.animate({opacity: 1, zIndex: 2});
				Alloy.Globals.signup_button.animate({opacity: 1, zIndex: 2});
				
				Alloy.Globals.signin_button.title 										= Alloy.Globals.signin_button.titleA;
				delete Alloy.Globals.signin_button.cancel_case;
				
				Alloy.Globals.password_lost.animate({
					top:'86%',
					opacity: 0.8,
					backgroundColor: 'transparent'
				});
					
				Alloy.Globals.password_lost.clicked 							= false;
				Alloy.Globals.password_lost.setAttributedString(Alloy.Globals.password_lost_underlined);

			}
		
		});
	
	}
	
	/*****************************/
	/* Password lost */
	/*****************************/

	else if( _case == 'password_lost'){
		
		Alloy.Globals.Logs.llog('-----> BIND PASSWORD LOST BUTTON (e___signin_process.js)');
		
		selector.addEventListener('click',function(e){
			
			if(!Alloy.Globals.endPoints || !Alloy.Globals.endPoints.passwordRet){
				
				Alloy.Globals.Requests.loadings_are_NOT_possible();
				return;
				
			}
		
			Alloy.Globals.Logs.llog('-----> PASSWORD LOST CLICK (e___signin_process.js)');
		
			Alloy.Globals.preventDoubleClick(this);
			
			if(!this.clicked){
								
				Alloy.Globals.passField.animate({opacity: 0, zIndex: -1});
				Alloy.Globals.signup_button.animate({opacity: 0, zIndex: -1});

				Alloy.Globals.signin_button.title 											= Alloy.Globals.signin_button.titleB;
				Alloy.Globals.signin_button.cancel_case 							= true;
				
				this.animate({
					top:'58%',
					opacity: 1,
					backgroundColor: '#6000'
				});
				
				this.text 																					= this.titleB;
				this.clicked 																			= true;
				
			}
			else{
				
				/* ********* CONTROLS ****** */
				
				var input1 																				= Alloy.Globals.userField.value;
		
				if( input1.length < 4 ){Alloy.Globals.Logs.aalert('Merci de saisir ton nom d\'utilisateur ou email afin de récupérer ton mot de passe.','','','Corriger',null,null,null,null,true);return;}
				
				/* ********* QUERY ********* */
				
				Alloy.Globals.Requests.RequestsMaker(
					'POST',
					true,
					Alloy.Globals.endPoints.passwordRet,
					{
						username_or_pseudo:													input1
					},
					{
						async_params: 				{},
						async_execution: 			function(JSON_returned,async_params_back){		
								
							if(typeof JSON_returned['error'] !== 'undefined'){
								
								Alloy.Globals.Logs.aalert(JSON_returned['error-message'],'','','OK',null,null,null,null,true);
								
							}
							else{
								
								///////////////Alloy.Globals.Logs.llog('---------------- PASSWORD SENT BY MAIL ----------------');
								///////////////Alloy.Globals.Logs.llog(JSON_returned);
								
								Alloy.Globals.Logs.aalert("Ton mot de passe a été envoyé par message à l'adresse e-mail renseignée dans ton compte utilisateur.",'','','OK',null,null,null,null,true);
							    
								Alloy.Globals.passField.animate({opacity: 1, zIndex: 2});
								Alloy.Globals.signup_button.animate({opacity: 1, zIndex: 2});
								
								Alloy.Globals.signin_button.title 							= Alloy.Globals.signin_button.titleA;
								delete Alloy.Globals.signin_button.cancel_case;
								
								Alloy.Globals.password_lost.animate({
									top:'86%',
									opacity: 0.8,
									backgroundColor: 'transparent'
								});
									
								Alloy.Globals.password_lost.clicked 					= false;
								Alloy.Globals.password_lost.setAttributedString(Alloy.Globals.password_lost_underlined);
								
								//////////// GOOGLE ANALYTICS
								
								Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
									category: 										"User account management",
									label: 												"Ask for my password",
									action: 											"send password lost",
									value: 												1
								});
								
							}
							
						}
					},
					false,
					true
				);
				
			}
	
		});
	
	}
	
	/*****************************/
	/* Sign in open */
	/*****************************/
	
	else if( _case == 'signin_open'){
		
		Alloy.Globals.Logs.llog('-----> BIND GO BACK TO SIGN-IN BUTTON (e___signin_process.js)');
			
		selector.addEventListener('click',function(e){
		
			Alloy.Globals.Logs.llog('-----> GO BACK TO SIGN-IN PAGE CLICK (e___signin_process.js)');
		
			Alloy.Globals.preventDoubleClick(this);
	
			////////$('.the_app_OVER_container .the_app_OVER_container_foreground').removeClass('on');
			/////////$('.the_app_OVER_container .the_app_OVER_container_foreground div.topbar span.title').html('');
	
		});

	}
	
	/*****************************/
	/* Intro next slide 1 */
	/*****************************/
	
	else if( _case == 'next_slide_1'){
		
		Alloy.Globals.Logs.llog('-----> BIND GOTO SLIDE 1 BUTTON (e___signin_process.js)');
		
		selector.addEventListener('click',function(e){
		
			Alloy.Globals.Logs.llog('-----> GOTO SLIDE 1 CLICK (e___signin_process.js)');
		
			Alloy.Globals.preventDoubleClick(this);
		
			Alloy.Globals.app.goTo("index_intro_1",{});
	
		});

	}
	
	/*****************************/
	/* Intro next slide 2 */
	/*****************************/
	
	else if( _case == 'next_slide_2'){
		
		Alloy.Globals.Logs.llog('-----> BIND GOTO SLIDE 2 BUTTON (e___signin_process.js)');
		
		selector.addEventListener('click',function(e){
		
			Alloy.Globals.Logs.llog('-----> GOTO SLIDE 2 CLICK (e___signin_process.js)');
		
			Alloy.Globals.preventDoubleClick(this);
		
			Alloy.Globals.app.goTo("index_intro_2",{});
	
		});

	}
	
	/*****************************/
	/* Intro next slide 3 */
	/*****************************/
	
	else if( _case == 'next_slide_3'){
		
		Alloy.Globals.Logs.llog('-----> BIND GOTO SLIDE 3 BUTTON (e___signin_process.js)');
		
		selector.addEventListener('click',function(e){
		
			Alloy.Globals.Logs.llog('-----> GOTO SLIDE 3 CLICK (e___signin_process.js)');
		
			Alloy.Globals.preventDoubleClick(this);
		
			Alloy.Globals.app.goTo("index_intro_3",{});
	
		});

	}
	
	/*****************************/
	/* End of slides */
	/*****************************/
	
	else if( _case == 'next_slide_home'){
		
		Ti.App.Properties.setString('intro','OKOK');
		
		Alloy.Globals.Logs.llog('-----> BIND GOTO HOMEPAGE BUTTON (e___signin_process.js)');
		
		selector.addEventListener('click',function(e){
		
			Alloy.Globals.Logs.llog('-----> GOTO HOMEPAGE CLICK (e___signin_process.js)');
		
			Alloy.Globals.preventDoubleClick(this);
				
			if( typeof Alloy.Globals.toCloseWindows['intro_slide_1'] != 'undefined')Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['intro_slide_1']);
			if( typeof Alloy.Globals.toCloseWindows['intro_slide_2'] != 'undefined')Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['intro_slide_2']);
			if( typeof Alloy.Globals.toCloseWindows['intro_slide_3'] != 'undefined')Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['intro_slide_3']);
	
		});

	}
	
};

/****************************** EXPORT FOR APPCELERATOR ******************************/

var exportFunctions 																				= {
	
	SignIn_Function: function(JSON_returned,local_params){
		SignIn_Function(JSON_returned,local_params);
	},
	
	Ready: function(_case,_item){
		Ready(_case,_item);
	}
	
};

module.exports 																						= exportFunctions;