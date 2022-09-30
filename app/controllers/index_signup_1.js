/*********************************** OPEN ****************************************/

Alloy.Globals.navigationWindow             	= $.window;
Alloy.Globals.toCloseWindows['signup_step_1']= $.window;

/*********************************** FOCUS ****************************************/

$.window.addEventListener("focus",function(e) {
	
	Alloy.Globals.toCloseWindows['signup_step_1']= $.window;

	Alloy.Globals.Dialog 									= $.AlertDialog;
	
});

/******************************/
/******** SIGNUP FIELDS *******/
/*****************************/

Alloy.Globals.userPseudoField 					= $.userPseudo;
Alloy.Globals.prenomField 							= $.bFirstname;
Alloy.Globals.emailField 								= $.bEmail;
Alloy.Globals.passField 								= $.bPassword;
Alloy.Globals.userCiviliteField 					= $.userCivilite;

/********************************/
/******** FIELDS HINTTEXT *******/
/*******************************/

$.userPseudo.hintText 									= 'Ton pseudo Swapbook';
$.bEmail.hintText 											= 'Ton adresse email';
$.bPassword.hintText 									= 'Mot de passe';
$.bFirstname.hintText 									= 'Ton ou tes prénom(s)';
$.userCivilite.hintText 									= 'Civilité';

Alloy.Globals.underlineItem($.siginBackButton);

/***************************************/
/******** SIGNUP EVENTS BINDING *******/
/**************************************/

function hide_photo_underlay_because_of_keyboard_opening_scroll_left(e){
	
	$.photoBg.backgroundColor 					= "transparent";
	
};

$.userPseudo.addEventListener("focus",hide_photo_underlay_because_of_keyboard_opening_scroll_left);
$.bEmail.addEventListener("focus",hide_photo_underlay_because_of_keyboard_opening_scroll_left);
$.bPassword.addEventListener("focus",hide_photo_underlay_because_of_keyboard_opening_scroll_left);
$.bFirstname.addEventListener("focus",hide_photo_underlay_because_of_keyboard_opening_scroll_left);

$.siginBackButton.addEventListener("click", function(e) {
	
	Alloy.Globals.Logs.llog('-----> CLOSE SIGN-UP FORM CLICK & GO LOGIN PAGE (index_signup_1.js)');

	Alloy.Globals.preventDoubleClick(this);
		
	if( typeof Alloy.Globals.toCloseWindows['signup_step_1'] != 'undefined')Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['signup_step_1']);
	
});

$.banner_img_user_overlay.addEventListener("click", function(e) {

	Alloy.Globals.preventDoubleClick(this);
	
	////////////////
	//////////////// CHOOSE THE PHOTO SOURCE
	////////////////
							
	if(Dialog_for_uploads != null)delete Dialog_for_uploads;
	
	var localOptions 										= Alloy.Globals.app_image__pre_dialog_options;
	localOptions.title 										= 'Photo de profil Swapbook : définition';
	
	var CDN_file_directory 								= 'user-profiles-pictures/signin_up_new_users';
	var Dialog_for_uploads								= Ti.UI.createOptionDialog(localOptions);
	
	Dialog_for_uploads.addEventListener('click',function(ev){
		
		////////Dialog_for_uploads.hide();
		delete Dialog_for_uploads;
	
		Alloy.Globals.handler_for_camera_or_gallery_dialog(
			ev,
			640,
			'jpg',
			true,
			CDN_file_directory,
			Alloy.Globals.endPoints.userUpload,
			function(JSON_returned,local_params){
			
				if(typeof JSON_returned['error'] !== 'undefined'){
					Alloy.Globals.Logs.aalert(JSON_returned['error-message'],'','','Corriger',null,null,null,null,true);
				}
				else{
					
					//////////// GOOGLE ANALYTICS 
					
					Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
						category: 							"User account management",
						label: 									"Update New User Profile Photo",
						action: 								"new user profile picture",
						value: 									1
					});
					
					///////////Alloy.Globals.Logs.llog('---------------- IMAGE UPLOADED (for sale) ----------------');
					///////////Alloy.Globals.Logs.llog(JSON_returned);
					
					$.banner_img_user.image 	= JSON_returned['output-array']['picture_on_amazon_cdn'];
					
					Alloy.Globals.THE_FUTURE_USER.user_photos_url_json= JSON_returned['output-array']['upload-json-back'];
					Alloy.Globals.THE_FUTURE_USER.user_photos_set= true;
					
				}
				
			},
			{
	    		id_user: 										1,
	    		free_user: 									true
			},
			function(){
				
				delete Dialog_for_uploads;
				var Dialog_for_uploads				= null;
			
			}
		);
		
	}); 

	Dialog_for_uploads.show();
	
});
					
$.userCivilite.onSelect 									= "Alloy.Globals.new_user_profile_local_select_values";
Alloy.Globals.new_user_profile_local_select_values= function(item,choice){};

$.step1Button.addEventListener("click", function(e) {
	
	Alloy.Globals.Logs.llog('>>>> SAVE CLICK <<<<');
	
	Alloy.Globals.preventDoubleClick(this);
	
	///////////// 
	///////////// CHECK IF THE user_mail IS OK (BECAUSE NO CHECK INSIDE save() ENDPOINT)
	///////////// 
	
	var the_pseudo 											= $.userPseudo.getValue();
	var the_mail 												= $.bEmail.getValue();
	
	if( the_pseudo.length < 3 ){Alloy.Globals.Logs.aalert('Merci d\'indiquer ton nom d\'utilisateur Swapbook','','','Corriger',null,null,null,null,true);return;}
	if( !Alloy.Globals.tools.contains_special_characters(the_pseudo) ){Alloy.Globals.Logs.aalert('Ton nom d\'utilisateur Swapbook ne dois contenir aucun caractère spécial ou espaces. Les underscores, tirets et points sont acceptés.','','','Corriger',null,null,null,null,true);return;}
	if( !Alloy.Globals.tools.is_Valid_EmailAddress(the_mail) ){Alloy.Globals.Logs.aalert('Merci d\'indiquer une adresse email de connexion valide.','','','Corriger',null,null,null,null,true);return;}
	
	Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		Alloy.Globals.endPoints.testUserAccount,
		{
    		pseudo_or_mail: 								the_mail,
    		email: 													true,
		},
		{
			NO_LIMIT: 						true,
			async_params: 				{},
			async_execution: 			function(JSON_returned,async_params_back){	
						
				if(typeof JSON_returned['error'] !== 'undefined'){
					
					Alloy.Globals.Logs.aalert(JSON_returned['error-message'],'','','Corriger',null,null,null,null,true);
					
					//////////
					////////// PROBLEM : USER EMAIL ALREADY TAKEN !
					//////////
					
					$.bEmail.setValue('');
					$.bEmail.blur();
					return;
					
				}

				///////////// 
				///////////// FORM VALIDATION
				///////////// 
				
				var now_moment 																			= new Date();
				var now_moment_month 																= now_moment.getMonth()+1;
				var now_moment_for_db 																= now_moment.getFullYear()+'-'+(now_moment_month<10?'0'+now_moment_month:now_moment_month)+'-'+now_moment.getDate()+' '+now_moment.getHours()+':'+now_moment.getMinutes()+':'+now_moment.getSeconds();
				
				if( $.bPassword.getValue().length < 3 ){Alloy.Globals.Logs.aalert('Merci d\'indiquer ton mot de passe de connexion (3 caractères minimum).','','','Corriger',null,null,null,null,true);return;}
				if( $.bFirstname.getValue().length < 2 ){Alloy.Globals.Logs.aalert('Merci d\'indiquer ton ou tes prénoms (2 caractères minimum).','','','Corriger',null,null,null,null,true);return;}
				if( $.userCivilite.cvalue == -1 ){Alloy.Globals.Logs.aalert('Merci d\'indiquer ta civilité.','','','Corriger',null,null,null,null,true);return;}
				
				///////////// 
				///////////// FORM HIDDEN OBJECT COMPLETION (looking like database "user" table row object creation)
				///////////// 
				
				Alloy.Globals.THE_FUTURE_USER.date_maj 								= now_moment_for_db;
				Alloy.Globals.THE_FUTURE_USER.date_derniere_activite 		= now_moment_for_db;
				Alloy.Globals.THE_FUTURE_USER.user_type 							= $.userCivilite.cvalue == 'Soc' ? 'pro' : ( $.userCivilite.cvalue == 'BDE' ? 'asso' : 'part');
				Alloy.Globals.THE_FUTURE_USER.user_language 					= Ti.Locale.getCurrentLanguage();
				Alloy.Globals.THE_FUTURE_USER.user_email							= the_mail;
				Alloy.Globals.THE_FUTURE_USER.user_pseudo 						= the_pseudo;
				Alloy.Globals.THE_FUTURE_USER.user_password 					= $.bPassword.getValue();
				Alloy.Globals.THE_FUTURE_USER.user_civilite 						= $.userCivilite.cvalue;
				Alloy.Globals.THE_FUTURE_USER.user_prenom 						= $.bFirstname.getValue();
				
				///////////// 
				///////////// FORM SUBMISSION
				///////////// 
				
				/* ******************************************** */
				/* ********* AJAX API QUERY (FAST WAY) ******** */
				/* ******************************************* */
				Alloy.Globals.Requests.RequestsMaker(
					'POST',
					true,
					Alloy.Globals.endPoints.createUserAccount,
					{
				        the_user_object:					JSON.stringify(Alloy.Globals.THE_FUTURE_USER)
					},
					{
						async_params: 						{},
						async_execution: 					Alloy.Globals.SignUp.SignUp_Function
					},
					false,
					true 
				);
				
				///////////
				/////////// END OF FORM VALIDATION + SUBMISSION
				///////////
				
			}
		},
		false,
		true 
	);
	
	///////////// 
	///////////// END OF CHECK IF THE user_mail IS OK
	///////////// 
	
});	

$.userPseudo.addEventListener("blur", function(e) {
	
	var value_live 										= this.getValue();
	
	if( value_live.length > 2 &&	 !Alloy.Globals.tools.contains_special_characters(value_live) ){Alloy.Globals.Logs.aalert('Ton nom d\'utilisateur Swapbook ne dois contenir aucun caractère spécial ou espaces. Néanmoins les underscores, tirets et points sont acceptés.','','','Corriger',null,null,null,null,true);return;}
	
	/* ******************************************** */
	/* ********* AJAX API QUERY (FAST WAY) ******** */
	/* ******************************************* */
	if( value_live.length > 2)Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		Alloy.Globals.endPoints.testUserAccount,
		{
    		pseudo_or_mail: 							value_live.trim(),
		},
		{
			NO_LIMIT: 						true,
			async_params: 				{},
			async_execution: 			function(JSON_returned,async_params_back){
				if(typeof JSON_returned['error'] !== 'undefined'){
					
					//////////
					////////// PROBLEM : USER PSEUDO ALREADY TAKEN !
					//////////
					
					$.userPseudo.setValue('');
					$.userPseudo.focus();
					
					Alloy.Globals.Logs.aalert(JSON_returned['error-message'],'','','OK',null,null,null,null,true);
					
				}
			}
		},
		false,
		true 
	);
	
});
					
$.facebookButton.addEventListener("click", function(e) {

	Alloy.Globals.Logs.llog('-----> FACEBOOK SIGN-IN CLICK (f___signup_process.js)');

	Alloy.Globals.preventDoubleClick(this);

	/* ************* START FACEBOOK RETRIEVE PROCESS ************ */
	
	Alloy.Globals.Fb.initialize();
	
	Alloy.Globals.Fb.setLoginBehavior(Alloy.Globals.Fb.LOGIN_BEHAVIOR_NATIVE);
	
    Alloy.Globals.Fb.requestNewReadPermissions(
    	['public_profile','user_friends','email','user_photos','user_birthday','user_location'], 
    	function(e){
    		
		    if (e.success){
		    	
				Alloy.Globals.Logs.llog('-----> FACEBOOK PERMISSIONS OK');
		
				Alloy.Globals.Fb.requestWithGraphPath('me?fields=id,email,cover,name,first_name,last_name,picture,gender,birthday',{},'GET',function(e){
					
					if (!e.success){
						
						Alloy.Globals.Logs.aalert('La connexion n\'a pas fonctionné suite à une erreur de partage d\'informations. Merci de revoir tes paramètres au niveau de Facebook.','','','OK',null,null,null,null,true);
				
						$.facebookButton.touchEnabled 														= false;
						$.facebookButtonPicto.opacity 														= 0;
						$.facebookButton.opacity 																= 0;
						
						if (e.error){
							Alloy.Globals.Logs.llog('-----> FACEBOOK ERROR (requestWithGraphPath) : '+e.error);
						}
						else{
							Alloy.Globals.Logs.llog('-----> FACEBOOK ERROR (requestWithGraphPath) : Unsuccessfull call');
 						}
            			return;
            			
    				}
    				
        			if(JSON.parse(e.result)){
        				
						/////////// Alloy.Globals.Logs.llog('-----> FACEBOOK RETURN :');
						/////////// Alloy.Globals.Logs.llog(e);
						
        				/////////// {"gender":"male","id":"1823667367894648","picture":{"data":{"is_silhouette":false,"url":"https:\\/\\/scontent.xx.fbcdn.net\\/v\\/t1.0-1\\/p50x50\\/10457545_1535911046670283_7941017155895861351_n.jpg?oh=3ef1713e7d469c7fc9aadd7e7071c711&oe=596FEA23"}},"birthday":"10\\/08\\/1988","cover":{"id":"1446233538971368","source":"https:\\/\\/scontent.xx.fbcdn.net\\/v\\/t31.0-0\\/p180x540\\/1980518_1446233538971368_1121504522407467911_o.jpg?oh=f116a78ac63c9bdb1853dada7fdcff7f&oe=59734348","offset_y":28},"name":"Arnaud Dagardere","first_name":"Arnaud"}

	        			var facebook_result 																			= JSON.parse(e.result);
	        			
						if(facebook_result.birthday && typeof facebook_result.birthday != 'undefined')Alloy.Globals.THE_FUTURE_USER.by_facebook_birthday				= facebook_result.birthday;
						if(facebook_result.last_name && typeof facebook_result.last_name != 'undefined')Alloy.Globals.THE_FUTURE_USER.by_facebook_nom				= facebook_result.last_name;
						if(facebook_result.first_name && typeof facebook_result.first_name != 'undefined'){
							Alloy.Globals.THE_FUTURE_USER.user_prenom						= facebook_result.first_name;
							$.bFirstname.setValue(facebook_result.first_name);
						}
						
						if(facebook_result.id && typeof facebook_result.id != 'undefined'){
							Alloy.Globals.THE_FUTURE_USER.user_photos_set					= true;
							Alloy.Globals.THE_FUTURE_USER.by_facebook_id					= facebook_result.id;
							Alloy.Globals.THE_FUTURE_USER.user_photos_url_json 			= '{"current":"https://graph.facebook.com/'+facebook_result.id+'/picture?width=640&height=640"}';
							$.banner_img_user.image 															= 'https://graph.facebook.com/'+facebook_result.id+'/picture?width=640&height=640';
						}
						
						if(facebook_result.email && typeof facebook_result.email != 'undefined'){
							Alloy.Globals.THE_FUTURE_USER.user_email 							= facebook_result.email;
							$.bEmail.setValue(facebook_result.email);
						}
						
						if(facebook_result.gender && typeof facebook_result.gender != 'undefined'){
							Alloy.Globals.THE_FUTURE_USER.user_civilite							= facebook_result.gender == 'male' ? 'M' : 'Mlle';
		        			$.userCivilite.cvalue 																		= Alloy.Globals.THE_FUTURE_USER.user_civilite;
		        			$.userCivilite.setValue($.userCivilite.cvalue == 'M' ? 'Monsieur' : 'Madame');
		        		}

						$.facebookButtonPicto.opacity 														= 0.2;
						$.facebookButton.opacity 																= 0.2;
	        			
        			}
					
				});
		    	
		    }
		    else if(e.cancelled){

				Alloy.Globals.Logs.llog('-----> FACEBOOK CANCEL (requestNewPublishPermissions)');
				
		    }
		    else{
		    	
				Alloy.Globals.Logs.llog('-----> FACEBOOK ERROR (requestNewPublishPermissions) : '+e.error);
				
				Alloy.Globals.Logs.aalert('La connexion n\'a pas fonctionné suite à une erreur de permissions. Merci de revoir tes paramètres au niveau de Facebook.','','','OK',null,null,null,null,true);

				$.facebookButton.touchEnabled 															= false;
				$.facebookButtonPicto.opacity 															= 0;
				$.facebookButton.opacity 																	= 0;
						
			}
			
		}
	);
    
    /* 
 	//////////////////////
 	////////////////////// Ti.Facebook WAY : https://github.com/appcelerator-modules/ti.facebook + https://developers.facebook.com/docs/facebook-login/permissions
 	//////////////////////
     
 	//////////////////////
 	////////////////////// JAVASCRIPT WAY (ancien projet Hunbee.com)
 	//////////////////////

	var appId 														= 190774858042725;
	var appSecret												= cc1c97d79f882f835b8b85c83c5f3e3f';
	var user_friends_tokens								= '';
	var user_public_name;
	var user_friends_ids;
	var user_id;
	
	window.fbAsyncInit 										= function() {
	
		FB.init({
	    	appId      : appId,
	    	cookie     : true,
	    	xfbml      : true,  // parse social plugins on this page
	    	version    : 'v2.2' // use graph api version 2.5
		});
	
		FB.getLoginStatus(function(response){
	
		    statusChangeCallback(response);
	
		});
	
	};
	
	(function(d,s,id){
	
	    var js, fjs 										= d.getElementsByTagName(s)[0];
	    if (d.getElementById(id)) return;
	
	    js 													= d.createElement(s);
	    js.id 												= id;
	    js.src 												= "//connect.facebook.net/fr_FR/all.js#xfbml=1&version=v2.7&appId=1814520455443264";
	    fjs.parentNode.insertBefore(js, fjs);
	
	}(document,'script','facebook-jssdk'));
	
	function statusChangeCallback(response){
	
	    llog('FACEBOOK >>>>>>>>> statusChangeCallback');
	
	    if (response.status === 'connected') {
	
	    	logInAuto();
	
	    }
	    else if (response.status === 'not_authorized') {
	
			document.getElementById('status').innerHTML		= 'Please log into this app and accept it';
	
	    }
	    else{
	
			document.getElementById('status').innerHTML		= 'Please log into this app and accept it';
	
	    }
	
	}
	
	function checkLoginState() {
	
	    FB.getLoginStatus(function(response){
			statusChangeCallback(response);
	    });
	
	}
	
	function logInManual(){
	
	    FB.login(function(response) {
	
	        if (response.authResponse) {
	
				logInAuto();
	
	        }
	        else{
	        	llog('User cancelled login or did not fully authorize.');
	        }
	
		},{scope:'public_profile,email'});
	
	}
	
	function logInAuto() {
	
	    FB.api('/me?fields=id,email,cover,name,first_name,last_name,link,gender,updated_time,verified,birthday,about,bio,education,languages,quotes,religion,relationship_status,sports',function(facebook_complete_response){
	
			llog('FACEBOOK >>>>>>>>> Le USER ID');
	
			loggedIn(facebook_complete_response);
	
	    },{scope:'public_profile,email'});
	
	
	}
	
	function loggedIn(facebook_complete_response) {
	
		llog(facebook_complete_response);
	
		user_id 											= facebook_complete_response.id;
		user_public_name									= facebook_complete_response.name;
		var cookieValue 									= $.cookie('tells_to_friend_that_iam_usgin_hunbee');
		if( typeof cookieValue == 'undefined')cookieValue	= [];
	
		$('#status').html('You are now or already logged : ' + facebook_complete_response.name + '!');
		$('#btnfb').addClass('ready_to_invite').hide();
	
		//////////  UPDATE FACEBOOK ID
	
		var retrieve_USER_Object 							= localStorage.getItem('user_object');
	
		if( retrieve_USER_Object != null ){
			
			retrieve_USER_Object							= JSON.parse(retrieve_USER_Object);
	
			llog('FACEBOOK >>>>>>>>> (USER LOGGED) id_facebook MIS A JOUR');
	
			RequestsMaker(
				'POST',
				true,
				endPoints.updateUserAccount,
				{
					id_user:								retrieve_USER_Object.id_user,
					id_facebook:							user_id
				},
				null,
				false,
				true
			);
	
			/////SAVE in Local Storage 
			retrieve_USER_Object.id_facebook				= user_id;
			localStorage.setItem('user_object',JSON.stringify(retrieve_USER_Object));
	
		}
	
		/////////////// FACEBOOK METHODS ///////////////
	
		////////FB.api('/me/feed','post',{message:'I have just started to play to Hunbee https://apps.facebook.com/hunbee-app/'});
	
	    FB.api('/me/invitable_friends',function(facebook_complete_response){
	
			llog('FACEBOOK >>>>>>>>> Les AMIS du USER SANS L\'APP : invitable_friends');
			llog(facebook_complete_response);
	
			$.each(facebook_complete_response.data,function(index,value){
	
				//llog('>>> >>> AMI : '+value.name+' <<< <<< INVITATION ENVOYEE !');
				user_friends_tokens							+= typeof value.id != 'undefined' ? value.id+',' : '';
	
			});
	
	    },{scope:'user_friends'});
	
	    FB.api('/me/friends',function(facebook_complete_response){
	
			llog('FACEBOOK >>>>>>>>> Les AMIS du USER QUI ONT INSTALLE L\'APP : friends');
			llog(facebook_complete_response);
	
			$.each(facebook_complete_response.data,function(index,value){
	
				//// TELLS BUT ONCE (cookie) TO ALL MY FACEBOOK FRIENDS THAT I'M NOW ON SITE
				if( typeof cookieValue[value.id] == 'undefined'){
	
					//////// 
					//////// SET COOKIE
					//////// 
					cookieValue[value.id]					= user_public_name+' > '+new Date();
	
					//////// 
					//////// SEND NOTIFICATION (FACEBOOK)
					//////// 
					var address 							= 'https://graph.facebook.com/'+value.id+'/notifications';
					var tempdata 							= {};
					tempdata['access_token'] 				= appId+'|'+appSecret;
					tempdata['href'] 						= 'https://apps.facebook.com/hunbee-app/';
					tempdata['template'] 					= 'Your facebook friend '+user_public_name+' is now on Hunbee';
					jQuery.post(address,tempdata,function(data){
						llog('FACEBOOK >>>>>>>>> notification de premiere utilisation ENVOYEE a Facebok userID '+value.id);
					});
	
					//////// 
					//////// SEND NOTIFICATION (HUNBEE)
					//////// 
					SEND_Notification_NOW_Function(
						user_public_name,
						value.id,
						'FacebookID',
						Date.nowW(),
						'Connect with '+user_public_name,
						'Your facebook friend '+user_public_name+' is now on Hunbee',
						'facebook',
						'https://'+window.location.hostname+'/app/media/notifications-logo.png',
						'ClickOnInvitationRequestNotification();',
						'{'+
							'"to_user_id":'+retrieve_USER_Object.id_user+','+
							'"to_user_name":"'+retrieve_USER_Object.username+'",'+
						'}',
						'bell_ring'
					);
	
				}
	
			});
	
			$.cookie('tells_to_friend_that_iam_usgin_hunbee', cookieValue, { expires : 366 });
	
	    },{scope:'user_friends'});
	
	}
	*/
	
});	