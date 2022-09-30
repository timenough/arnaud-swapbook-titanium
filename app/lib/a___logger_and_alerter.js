/*****************************/
/* LOGGER */
/*****************************/

var logging 																					= Alloy.CFG.log_debug;

function llog(the_thing){

	if(logging)Ti.API.info(the_thing);

};

/*****************************/
/* ALERTER */
/*****************************/

function aalert(
	the_title,
	the_message1,
	the_message2,
	button_default_text,
	button_default_click_function,
	button_2_text,
	button_2_click_function,
	params,
	modal
){
	
	///////////////
	/////////////// DEFAULTS
	///////////////
	
	if(typeof Alloy.Globals.Dialog != 'undefined'){
		
		Alloy.Globals.Dialog.getView('alertMessage1').top 			= 18;
		Alloy.Globals.Dialog.getView('alertMessage1').height 	= Ti.UI.SIZE;
		Alloy.Globals.Dialog.getView('alertMessage2').top 			= 12;
		Alloy.Globals.Dialog.getView('alertMessage2').height 	= Ti.UI.SIZE;
		Alloy.Globals.Dialog.getView('theMessagesAlternative').height= 0;
		Alloy.Globals.Dialog.getView('theMessagesAlternative').visible= false;
		Alloy.Globals.Dialog.getView('theMessagesAlternative2').height= 0;
		Alloy.Globals.Dialog.getView('theMessagesAlternative2').visible= false;
	
		//////////// GOOGLE ANALYTICS (Track Errors)
		
		if(typeof the_title == 'string' && the_title.indexOf('Err') > -1){
				
			Alloy.Globals.GoogleAnalyticsTracker.trackException({
				description: 																	the_message1,
				fatal: 																				false
			});
			
		}
		
	}
	
	/* ********************************************************************************************************************************************************************************************************************** */
	
	///////////////
	/////////////// PROCESS SAVE IN GLOBALS
	///////////////
	
	var proper_alert_name 																= 'alert_'+hash_string(the_title+the_message1+the_message2+button_default_text+button_2_text);
	
	if( modal == 'page_1_a_4_onesale_recap' ){
		
		proper_alert_name 																= '_NEW_POPIN_SUITE_';	
		
		if(Alloy.Globals.no_dialogs_conflicts[proper_alert_name]){
			
			delete Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_bg'];
			delete Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_button_1'];
			delete Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_button_2'];
			delete Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_button_2_IS_BINDED'];
			delete Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_button_1_IS_BINDED'];
			delete Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_bg_IS_BINDED'];
			delete Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['input'];
		
		}
		
	}
	
	/* ********************************************************************************************************************************************************************************************************************** */
	
	///////////////
	/////////////// FIRST DEFINITIONS
	///////////////
	
	if(typeof Alloy.Globals.no_dialogs_conflicts[proper_alert_name] == 'undefined')
		Alloy.Globals.no_dialogs_conflicts[proper_alert_name]={};
		
	/* SPECIAL modal === 'FORM' CASE : THE BUTTON 2 IS NOT UNBINDED HERE BUT ELSEWHERE SO... */
	
	if(params && params.dontRemoveEventListenerBtn2){
		for (var other_proper_alert_name in Alloy.Globals.no_dialogs_conflicts) { 
			if(Alloy.Globals.no_dialogs_conflicts[other_proper_alert_name]['handler_for_button_2'] && typeof Alloy.Globals.Dialog != 'undefined'){
				Alloy.Globals.Dialog.getView('alertDuoButton2').removeEventListener('click',Alloy.Globals.no_dialogs_conflicts[other_proper_alert_name]['handler_for_button_2']);
				delete Alloy.Globals.no_dialogs_conflicts[other_proper_alert_name]['handler_for_button_2'];
				delete Alloy.Globals.no_dialogs_conflicts[other_proper_alert_name]['handler_for_button_2_IS_BINDED'];
				delete Alloy.Globals.no_dialogs_conflicts[other_proper_alert_name]['input'];
			}
		}
	}
	
	if(typeof Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['input'] == 'undefined')
		Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['input']= {
			'the_title': 							the_title,
			'the_message1': 				the_message1,
			'the_message2': 				the_message2, 
			'button_default_text': 		button_default_text,
			'button_2_text': 					button_2_text,
			'modal': 								modal,
			'button_default_click_function':button_default_click_function,
			'button_2_click_function':button_2_click_function,
		};
			
	if(typeof Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['input']['params'] == 'undefined')
		Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['input']['params']= params;
		
	/* ********************************************************************************************************************************************************************************************************************** */

	///////////////
	/////////////// SPECIAL MODES
	///////////////
	
	/****************/
	/* MODAL MODE */
	/***************/
	
	if(modal === true){
		alert(the_title);
		return;
	}
	
	/* ********************************************************************************************************************************************************************************************************************** */

	/**************/
	/* BLUE MODE */
	/*************/
	
	if(modal === 'BLUE'){
		
		Alloy.Globals.offLinePopin.alreadyUsed 							= true;
		
		if( params != false && typeof Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_offline_screen_off'] == 'undefined')Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_offline_screen_off']= function(data) {
			
			if(Alloy.Globals.offLinePopin_img)Alloy.Globals.offLinePopin_img.image = "/images/Default.png";
			if(Alloy.Globals.offLinePopin_img)Alloy.Globals.offLinePopin_img.width= '140dp';
			if(Alloy.Globals.offLinePopin_img)Alloy.Globals.offLinePopin_img.height= '140dp';
			
			if(Alloy.Globals.offLinePopin_labl)Alloy.Globals.offLinePopin_labl.text= "Tu n'es plus connecté(e) à internet !";
			if(Alloy.Globals.offLinePopin_labl)Alloy.Globals.offLinePopin_labl.color= Alloy.Globals.BLUE_COLOR;	
			if(Alloy.Globals.offLinePopin_labl2)Alloy.Globals.offLinePopin_labl2.text= "";
			if(Alloy.Globals.offLinePopin_labl2)Alloy.Globals.offLinePopin_labl2.color= Alloy.Globals.BLUE_COLOR;	
			
			Alloy.Globals.offLinePopin.visible 									= false;
			Alloy.Globals.offLinePopin.zIndex									= -1;
			Alloy.Globals.offLinePopin.backgroundColor					= "#ffffff";
			
			Alloy.Globals.offLinePopin.alreadyUsed 						= false;
			delete Alloy.Globals.offLinePopin.alreadyUsed;
			
			Alloy.Globals.offLinePopin.removeEventListener("click", Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_offline_screen_off']);
			delete Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_offline_screen_off_IS_BINDED'];
			
		};
		
		if( params != false && typeof Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_offline_screen_off_IS_BINDED'] == 'undefined'){
			Alloy.Globals.offLinePopin.addEventListener("click",Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_offline_screen_off']);
			Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_offline_screen_off_IS_BINDED']= true;
		}
		
		if(Alloy.Globals.offLinePopin_img)Alloy.Globals.offLinePopin_img.image= "/images/good.png";
		if(Alloy.Globals.offLinePopin_img)Alloy.Globals.offLinePopin_img.width= '90dp';
		if(Alloy.Globals.offLinePopin_img)Alloy.Globals.offLinePopin_img.height= '90dp';
		
		if(Alloy.Globals.offLinePopin_labl)Alloy.Globals.offLinePopin_labl.text= the_title;
		if(Alloy.Globals.offLinePopin_labl)Alloy.Globals.offLinePopin_labl.color= '#fff';	
		if(Alloy.Globals.offLinePopin_labl2)Alloy.Globals.offLinePopin_labl2.text= the_message1;
		if(Alloy.Globals.offLinePopin_labl2)Alloy.Globals.offLinePopin_labl2.color= '#fff';	

		Alloy.Globals.offLinePopin.visible 										= true;
		Alloy.Globals.offLinePopin.zIndex										= 10000;
		Alloy.Globals.offLinePopin.backgroundColor						= (button_2_text != null) ? button_2_text : Alloy.Globals.BLUE_COLOR;
		
		return;
		
	}
	
	/* ********************************************************************************************************************************************************************************************************************** */

	/**************/
	/* FORM MODE */
	/**************/
	
	else if(modal === 'FORM' && typeof Alloy.Globals.Dialog != 'undefined'){
		
		Alloy.Globals.Dialog.getView('alertOuter').height 				= params.items_required_height+112;
		
		Alloy.Globals.Dialog.getView('theMessages').height 			= params.items_required_height;
		
		Alloy.Globals.Dialog.getView('theMessagesAlternative').height= Ti.UI.SIZE;
		Alloy.Globals.Dialog.getView('theMessagesAlternative').visible= true;
		
		Alloy.Globals.Dialog.getView('alertMessage1').top 				= 0;
		Alloy.Globals.Dialog.getView('alertMessage1').height 		= 0;
		Alloy.Globals.Dialog.getView('alertMessage2').top 				= 0;
		Alloy.Globals.Dialog.getView('alertMessage2').height 		= 0;
		
		var children 																				= Alloy.Globals.Dialog.getView('theMessagesAlternative').children.slice(0);
		
		for (var i=0;i<children.length;++i){
			Alloy.Globals.Dialog.getView('theMessagesAlternative').remove(children[i]);
		}
	
		for(i=0;i<params.items_to_add.length;i++){
			Alloy.Globals.Dialog.getView('theMessagesAlternative').add(params.items_to_add[i]);
		}
		
	}
	
	/* ********************************************************************************************************************************************************************************************************************** */

	/*******************/
	/* NOTATION MODE */
	/******************/
	
	else if(modal === 'STARS' && typeof Alloy.Globals.Dialog != 'undefined'){
			
		Alloy.Globals.Dialog.getView('alertOuter').height					= 232;
		Alloy.Globals.Dialog.getView('theMessages').height			= 120;
				
		Alloy.Globals.Dialog.getView('alertMessage2').top 				= 0;
		Alloy.Globals.Dialog.getView('alertMessage2').height 		= 0;
		
		Alloy.Globals.Dialog.getView('theMessagesAlternative2').height= Ti.UI.SIZE;
		Alloy.Globals.Dialog.getView('theMessagesAlternative2').visible= true;
		
		Alloy.Globals.rating_stars 														= [];
		
		for(i=1;i<6;i++){
			
			var notation_star 																	= Ti.UI.createImageView({
				image: '/images/starEmpty.png',
				touchEnabled: true,
				left: i == 0 ? 0 : 8,
				width: 30,
				height: 30,
				cvalue: i,
			});
			
			Alloy.Globals.rating_stars.push(notation_star);
													
			notation_star.addEventListener('click',function(e){
				for(im=0;im<5;im++){
					Alloy.Globals.rating_stars[im].image= im < this.cvalue ? '/images/starFull.png' : '/images/starEmpty.png';
				}
				if(!this.clicked){
					params.item_to_add.cvalue 										= this.cvalue;
					this.clicked 																	= true;
				}
				else{
					params.item_to_add.cvalue 										= this.cvalue;
					this.clicked  																	= false;
				}
			});
			
			params.item_to_add.add(notation_star);
			
		}
		
		var children 																				= Alloy.Globals.Dialog.getView('theMessagesAlternative2').children.slice(0);
		
		for (var i=0;i<children.length;++i){
			Alloy.Globals.Dialog.getView('theMessagesAlternative2').remove(children[i]);
		}
		
		Alloy.Globals.Dialog.getView('theMessagesAlternative2').add(params.item_to_add);
		
	}
	
	/* ********************************************************************************************************************************************************************************************************************** */
	
	/**********************************************/
	/* -------- NORMAL MODE -------- MODAL SIZE UP */
	/*********************************************/
	
	else{
		
		if( params != null && typeof params.sizeUp1 != 'undefined' && typeof Alloy.Globals.Dialog != 'undefined'){
			Alloy.Globals.Dialog.getView('alertOuter').height 			= 272;
			Alloy.Globals.Dialog.getView('theMessages').height 		= 160;
		}
		else{
			if(typeof Alloy.Globals.Dialog != 'undefined' && typeof Alloy.Globals.Dialog != 'undefined'){
				Alloy.Globals.Dialog.getView('alertOuter').height			= 212;
				Alloy.Globals.Dialog.getView('theMessages').height	= 100;
			}
		}
		
	}

	/* ********************************************************************************************************************************************************************************************************************** */
	
	/*************/
	/* HANDLERS */
	/************/

	if(
		modal != 'FORM' &&
		modal != 'STARS' &&
		typeof Alloy.Globals.Dialog != 'undefined' &&
		typeof Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_bg'] == 'undefined'
	){
	
		Alloy.Globals.Logs.llog("");
		Alloy.Globals.Logs.llog('-----> BINDING "handler_for_bg" FOR ALERT ID : "'+proper_alert_name+'" (a___logger_and_alerter.js)');
		Alloy.Globals.Logs.llog("");
		
		Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_bg']= function(data) {
			
			/* LOCAL FUNCTION */
			
			aalert_close();
			
			/* LOCAL UNBINDING STUFF */
			
			if(Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_bg']){
				Alloy.Globals.Dialog.getView('alertMask').removeEventListener("click",Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_bg']);
			}
		
			delete Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_bg'];
			delete Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_button_1'];
			delete Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_button_2'];
			delete Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_button_2_IS_BINDED'];
			delete Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_button_1_IS_BINDED'];
			delete Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_bg_IS_BINDED'];
			delete Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['input'];
			
		};
		
	}
	
	if(
		typeof Alloy.Globals.Dialog != 'undefined' &&
		typeof Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_button_1'] == 'undefined'
	){
		
		Alloy.Globals.Logs.llog("");
		Alloy.Globals.Logs.llog('-----> BINDING "handler_for_button_1" FOR ALERT ID : "'+proper_alert_name+'" (a___logger_and_alerter.js)');
		Alloy.Globals.Logs.llog("");
		
		Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_button_1']= function(data) {
			
			if( 
				Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['input'] &&
				Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['input']['button_default_click_function'] != null
			){
				
				/* INPUT INHERITED FUNCTION */
				
				Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['input']['button_default_click_function'](Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['input']['params']);
				
			}
			else{
				
				/* LOCAL FUNCTION */
				
				aalert_close();
				
			}
			
			/* LOCAL UNBINDING STUFF */
			
			if(Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_button_1']){
				Alloy.Globals.Dialog.getView('alertSoloButton').removeEventListener("click", Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_button_1']);
				Alloy.Globals.Dialog.getView('alertDuoButton1').removeEventListener("click", Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_button_1']);
			}
			
			delete Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_button_1'];
			delete Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_button_1_IS_BINDED'];
			delete Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_bg'];
			delete Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_bg_IS_BINDED'];
			delete Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['input'];
			
			if(modal === 'FORM'){
				Alloy.Globals.pathway_CURRENT_ID_UNIVERSITE			= '';
				Alloy.Globals.pathway_CURRENT_ID_DIPLOME				= '';
				Alloy.Globals.pathway_CURRENT_ID_FORMATION			= '';
				Alloy.Globals.pathway_CURRENT_ID_PARCOURS 			= '';
			}
			
		};
		
	}
		
	if(
		typeof Alloy.Globals.Dialog != 'undefined' &&
		typeof Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_button_2'] == 'undefined'
	){
		
		Alloy.Globals.Logs.llog("");
		Alloy.Globals.Logs.llog('-----> BINDING "handler_for_button_2" FOR ALERT ID : "'+proper_alert_name+'" (a___logger_and_alerter.js)');
		Alloy.Globals.Logs.llog("");
		
		
		Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_button_2']= function(data) {
			
			if( 
				Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['input'] &&
				Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['input']['button_2_click_function'] != null
			){
				
				/* INPUT INHERITED FUNCTION */
				
				Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['input']['button_2_click_function'](Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['input']['params']);
				
				/* LOCAL UNBINDING STUFF */
				
				if(
					!Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['input']['params']['dontRemoveEventListenerBtn2'] &&
					Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_button_2']
				){
					Alloy.Globals.Dialog.getView('alertDuoButton2').removeEventListener("click", Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_button_2']);
					delete Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_button_2_IS_BINDED'];
					delete Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_button_2'];
				}
				
			}
			
		};
		
		if(Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['input']['params']){
			
			Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['input']['params']['handler_to_remove']= Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_button_2'];
			Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['input']['params']['handler_item']= Alloy.Globals.Dialog.getView('alertDuoButton2');
			Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['input']['params']['binded_value']= Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_button_2_IS_BINDED'];
			
		}
		
	}
	
	/***********/
	/* DISPLAY */
	/**********/
	
	if(typeof Alloy.Globals.Dialog != 'undefined'){
		
		/* TITLE */
		
		Alloy.Globals.Dialog.getView('alertTitle').text 					= the_title;
		
		/* CLICK ON THE LAYOUT */
		
		if(
			modal != 'FORM' && 
			modal != 'STARS' && 
			typeof Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_bg_IS_BINDED'] == 'undefined'
		){
			if( modal != 'page_1_a_4_onesale_recap' ){
				Alloy.Globals.Dialog.getView('alertMask').addEventListener("click",Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_bg']);
			}
			Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_bg_IS_BINDED']= true;
		}
	
		/* PREPARE THE ALERT MESSAGE */
		
		Alloy.Globals.Dialog.getView('alertMessage1').text 		= the_message1;
		Alloy.Globals.Dialog.getView('alertMessage2').text 		= the_message2;
		
		/* PREPARE THE SECOND BUTTON */
		
		if( button_2_text != null && button_2_text != '' ){
			
			Alloy.Globals.Dialog.getView('one_button').height 		= 0;
			Alloy.Globals.Dialog.getView('one_button').visible 		= false;
			
			Alloy.Globals.Dialog.getView('two_buttons').height		= 40;
			Alloy.Globals.Dialog.getView('two_buttons').visible		= true;
			
			Alloy.Globals.Dialog.getView('alertDuoButton1').text 	= button_default_text;
			
			/* BIND CLICK */
			
			if(typeof Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_button_1_IS_BINDED'] == 'undefined'){
				Alloy.Globals.Dialog.getView('alertDuoButton1').addEventListener("click", Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_button_1']);
				Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_button_1_IS_BINDED']= true;
			}
			
			Alloy.Globals.Dialog.getView('alertDuoButton2').text 	= button_2_text;
			
			/* BIND CLICK */
			
			if(typeof Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_button_2_IS_BINDED'] == 'undefined'){
				Alloy.Globals.Dialog.getView('alertDuoButton2').addEventListener("click", Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_button_2']);
				Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_button_2_IS_BINDED']= true;
			}
			
		}
		else{
			
			Alloy.Globals.Dialog.getView('alertMask').visible 			= false;
			
			/* PREPARE THE DEFAULT BUTTON */
			
			Alloy.Globals.Dialog.getView('alertSoloButton').text 		= button_default_text;
			
			/* BIND CLICK */
			
			if(typeof Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_button_1_IS_BINDED'] == 'undefined'){
				Alloy.Globals.Dialog.getView('alertSoloButton').addEventListener("click", Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_button_1']);
				Alloy.Globals.no_dialogs_conflicts[proper_alert_name]['handler_for_button_1_IS_BINDED']= true;
			}
	
			Alloy.Globals.Dialog.getView('one_button').height 		= Ti.UI.FILL;
			Alloy.Globals.Dialog.getView('one_button').visible 		= true;
			
			Alloy.Globals.Dialog.getView('two_buttons').height		= 0;
			Alloy.Globals.Dialog.getView('two_buttons').visible		= false;
			
		}
		
		/* SHOW IT */
		Alloy.Globals.Dialog.getView('alertMask').visible 			= true;
		Alloy.Globals.Dialog.getView('alertMask').width 				= Ti.Platform.displayCaps.platformWidth;
		Alloy.Globals.Dialog.getView('alertMask').height 			= Ti.Platform.displayCaps.platformHeight;
		Alloy.Globals.Dialog.getView('alertMask').top 					= 0;
		Alloy.Globals.Dialog.getView('alertMask').left 					= 0;
		
	}
	
	/* AUTO CLOSE : AFTER 20 SECONDS */
	///////if( typeof Alloy.Globals.closeAlertPopup !== "undefined" )clearTimeout(Alloy.Globals.closeAlertPopup);
	///////Alloy.Globals.closeAlertPopup 										= setTimeout(function(){
	///////	aalert_close();
	///////},20000);

};

function aalert_close(eventual_params){

	Alloy.Globals.Dialog.getView('alertMask').visible 				= false;
	
};

function hash_string(str){
	
    var hash 																					= 0;
    
    for (i = 0; i < str.length; i++) {
    	
        char 																						= str.charCodeAt(i);
        hash 																						= char + (hash << 6) + (hash << 16) - hash;
        
    }
    
    return hash;
    
};

/****************************** EXPORT FOR APPCELERATOR ******************************/

var exportFunctions 																		= {
	
	llog: function(the_thing){
		llog(the_thing);
	},
	
	aalert: function(
		the_title,
		the_message1,
		the_message2,
		button_default_text,
		button_default_click_function,
		button_2_text,
		button_2_click_function,
		params,
		modal
	){
		aalert(
			the_title,
			the_message1,
			the_message2,
			button_default_text,
			button_default_click_function,
			button_2_text,
			button_2_click_function,
			params,
			modal
		);
	},
	
	aalert_close: function(eventual_params) {
		aalert_close(eventual_params);
	}
	
};

module.exports 																				= exportFunctions;