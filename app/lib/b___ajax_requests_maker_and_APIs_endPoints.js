Alloy.Globals.DOING_request 													= false;
Alloy.Globals.AJAX_attempts													= 10;

/*****************************/
/* REQUESTS MAKER */
/*****************************/

function RequestMaker(
	form_method,
	form_async,
	form_endpoint,
	form_data,
	input_object,
	someFiles,
	silentMode
){

	'use strict';
	var AJAX_call																				= null;
	var AJAX_timeout 																		= 14000;

	if(Alloy.Globals.DOING_request && typeof input_object['NO_LIMIT'] == 'undefined')return;
	if(typeof input_object['MORE_TIME'] != 'undefined')AJAX_timeout= input_object['MORE_TIME'];
	
	Alloy.Globals.DOING_request 													= (typeof input_object['NO_LIMIT'] != 'undefined') ? false : true;
	
	if(!silentMode)RequestsLoader('show');

	/**************************************************/
	/************* ONLINE or OFFLINE *******************/
	/*************************************************/
	
	isOnlineTEST();

	/*************************************************/
	/******************** START **********************/
	/*************************************************/

	AJAX_call 																					= Ti.Network.createHTTPClient({
		timeout: 																					AJAX_timeout
	});
	
	AJAX_call.setTimeout(AJAX_timeout);
	AJAX_call.open(form_method,form_endpoint,form_async);

	/****************************************************/
	/******************** SUCCESS **********************/
	/****************************************************/
	
	AJAX_call.onload 																		= function(e) {
		
		Alloy.Globals.DOING_request 												= false;
			
		var _JSON 																				= String(AJAX_call.responseText);
		
		////////Alloy.Globals.Logs.llog('');
		////////Alloy.Globals.Logs.llog('-----> RETOUR AJAX BRUT (onload)');
		////////Alloy.Globals.Logs.llog(_JSON);
		////////Alloy.Globals.Logs.llog('');
		
		var _JSON_answer_precaution 											= (typeof _JSON != 'undefined') ? _JSON.charAt(0) : '';
		
		if(_JSON_answer_precaution != '{'){
			
			Alloy.Globals.Logs.llog('');
			Alloy.Globals.Logs.llog('-----> NO JSON SO > ERROR TRIGGERED (onload)');
			Alloy.Globals.Logs.llog('');
			
			AJAX_call.onerror({code:403,error:'JSON Error'});
			
			return;
			
		}
		
		var _JSON_answer 																= JSON.parse(_JSON);
			
		/************* ASYNCHRONOUS *************/

		if(
			form_async &&
			input_object != null
		){
			
			RequestsLoader('hide');

			var answer																			= typeof _JSON_answer['responseJSON'] !== 'undefined' ? _JSON_answer['responseJSON'] : _JSON_answer;
			
			if(typeof input_object['async_params'] != 'undefined'){
				
				input_object['async_execution'](answer,input_object['async_params']);
				
			}
			
			/****************************************************************/
			/* SPEC. ANDROID GET ENDPOINTS ASYNCHRONOUS AND NOT SYNCHRONOUS */
			/****************************************************************/
			
			if( 
				OS_ANDROID &&
				form_endpoint.indexOf('endpoints') > -1
			){
				
				Alloy.Globals.endPoints 												= typeof answer['output-array'] != 'undefined' ? answer['output-array'] : [];
				
			}
			
		}
	
		/************* SYNCHRONOUS *************/
	
		else{
	
			RequestsLoader('hide');
			
			var answer																			= typeof _JSON_answer['responseJSON'] !== 'undefined' ? _JSON_answer['responseJSON'] : _JSON_answer;
			
			if(typeof input_object['async_params'] != 'undefined'){
				
				input_object['async_execution'](answer,input_object['async_params']);
				
			}
	
		}
			
		Alloy.Globals.AJAX_attempts 												= 10;
		
	};

	/*************************************************/
	/******************** ERROR **********************/
	/*************************************************/

	AJAX_call.onerror 																		= function(e) {
		
		Alloy.Globals.DOING_request 												= false;
		Alloy.Globals.AJAX_attempts--;
		
		var _JSON 																				= String(AJAX_call.responseText);
		var _JSON_parsed 																= _JSON.indexOf('{"') > -1 ? JSON.parse(_JSON) : {};
		
		Alloy.Globals.Logs.llog('-----> RETOUR AJAX BRUT (ERREUR) POUR : '+form_endpoint+' = '+_JSON);
		
		/**********************************/
		/* TIMEOUT or LOST : NEW ATTEMPT */
		/*********************************/
		
		if( _JSON.indexOf('TIMEOUT') > -1 ){
			
			Alloy.Globals.Logs.llog(' ----------------  (ERREUR) TIMEOUT : ABORT QUERY ---------------- ');
			
			if(!silentMode)Alloy.Globals.Logs.aalert(
				'Erreur Swapbook',
				'La requête vers les serveurs de Swapbook a rencontré un Timeout.',
				'',
				'OK',
				null,
				null,
				null,
				false
			);
			
			AJAX_call.abort();
			
		}
		else if(_JSON.indexOf('SSL error') > -1 || _JSON.indexOf('timed out') > -1){
		
			RequestMaker(
				form_method,
				form_async,
				form_endpoint.replace('https:','http:'),
				form_data,
				input_object,
				someFiles,
				silentMode
			);

		}
		else if(_JSON.indexOf('lost') > -1){
			
			if(!silentMode)RequestsLoader('show');
			
			do{
				
				Alloy.Globals.Logs.llog(' ----------------  (ERREUR) RE_TENTATIVE : '+Alloy.Globals.AJAX_attempts+' ---------------- ');
				
				Alloy.Globals.AJAX_attempts--;
				
				RequestMaker(
					form_method,
					form_async,
					form_endpoint,
					form_data,
					input_object,
					someFiles,
					silentMode
				);
				
			}
			while (Alloy.Globals.AJAX_attempts > 0);

		}
		
		/*****************************/
		/* HIDE LOADING */
		/*****************************/
		
		RequestsLoader('hide');
	
		/*****************************/
		/* ALERT */
		/*****************************/
		if(e.code == 413){
			
			if(!silentMode)Alloy.Globals.Logs.aalert(
				'Erreur Swapbook',
				'Le fichier que tu as tenté d\'envoyer pèse plus lourd que le poids limite accepté par notre serveur',
				'',
				'Fermer',
				Alloy.Globals.Logs.aalert_close,
				null,
				null,
				null,
				false
			);
			
		}
		else{
			
			if(_JSON_parsed['error-message']){
				
				if(typeof input_object['async_params'] != 'undefined'){
					
					input_object['async_execution'](_JSON_parsed,input_object['async_params']);
					
				}
				else{
					
					Alloy.Globals.Logs.aalert(
						'Erreur Swapbook',
						_JSON_parsed['error-message'],
						'',
						'OK',
						null,
						null,
						null,
						false
					);
					
				}
					
			}
			else{
				
				if(!silentMode)Alloy.Globals.Logs.llog(
					'Erreur Swapbook',
					'Impossible de traiter le retour de données des serveurs de Swapbook suite à cette action',
					'',
					'Fermer',
					null,
					null,
					null,
					false
				);
				
			}
		
		}

	};
	
	/*****************************************************/
	/******************** PROGRESS **********************/
	/*****************************************************/
	
	AJAX_call.onsendstream															= function(e) {
		
		//Alloy.Globals.Loading.setProg(Math.round(e.progress)+'%');
		//if(Math.round(e.progress) > 80)Alloy.Globals.Loading.hide();

    };
		
	/***********************************************/
	/****************** HEADERS *******************/
	/**********************************************/
	
	if(someFiles == false)AJAX_call.setRequestHeader('Content-Type','application/json');
	AJAX_call.setRequestHeader('Accept','application/json');
	  
	/*************************************************/
	/****************** EXECUTION *******************/
	/************************************************/

	if(form_method == 'POST') {
		
		var AJAX_datas																		= someFiles == true ? form_data : JSON.stringify(form_data);
		AJAX_call.send(AJAX_datas);
		
	}
	else{
		
		AJAX_call.send(null);
		
	}
	
	if( 
		form_async == false && 
		typeof AJAX_call.responseText != 'undefined' &&
		AJAX_call.responseText != '' 
	) {
		
		try{
			
			var _JSON_answer_sync 													= JSON.parse(AJAX_call.responseText);
			
	        if( typeof _JSON_answer_sync.error !== 'undefined') {
				
				AJAX_call.onerror({code:403,error:'HTTP Error'});
				
			}
			else {
				
				AJAX_call.onload();
				
			}
		
		}
		catch(e){
        
        	AJAX_call.onerror({code:403,error:'HTTP Error'});

		}
    
	}
	
};

/*****************************/
/* REQUEST LOADER */
/*****************************/

function RequestsLoader(todo){

	if( todo === 'show' ){
		
		Alloy.Globals.Loading.show('Chargement en cours', false);

	}
	else{
		
		Alloy.Globals.Loading.hide();
		
	}

};

/*****************************/
/* ONLINE STATUS */
/*****************************/

var online_recheck 																		= null;
var online_rechecks 																		= 0;

function isOnline() {
	
	var onlineStatus 																		= false;
	
	if (Ti.Network.networkType === Ti.Network.NETWORK_NONE) {
		
		onlineStatus 																			= false;
		/////////Alloy.Globals.Logs.llog("Network Status: offline");
		
	}
	else{
		
		onlineStatus 																			= true;
		/////////Alloy.Globals.Logs.llog("Network Status: online");
		
	}
  
	return onlineStatus;
  
}

function loadings_are_NOT_possible(){
	
	Alloy.Globals.Logs.aalert(
		'Impossible de se connecter aux serveurs de Swapbook. Réessaie ultérieurement ou bien vérifie ta connexion internet.',
		'',
		'',
		'OK',
		null,
		null,
		null,
		null,
		true
	);
	
	setTimeout(function(){
		isOnlineTEST();
	},2500);
	
}

function isOnlineTEST() {
	
	if(Alloy.Globals.offLinePopin){
		
		if(
			isOnline() &&
			!Alloy.Globals.offLinePopin.alreadyUsed
		){
			
			Alloy.Globals.offLinePopin.visible 									= false;
			Alloy.Globals.offLinePopin.zIndex									= -1;
			
			clearInterval(online_recheck);
			online_recheck 																	= null;
			online_rechecks 																= 0;
			
		}
		else{
			
			online_rechecks++;
			
			Alloy.Globals.offLinePopin.visible 									= true;
			Alloy.Globals.offLinePopin.zIndex									= 10000;
			
			if(online_rechecks > 40){
				clearInterval(online_recheck);
				online_recheck 																= null;
				online_rechecks 															= 0;
				return;
			}
			
			if(online_recheck == null)online_recheck 						= setInterval(function(){
				isOnlineTEST();
			},1000);

		}
		
	}
	
}

/****************************** EXPORT FOR APPCELERATOR ******************************/

var exportFunctions 																		= {
	
	RequestsMaker: function(
		form_method,
		form_async,
		form_endpoint,
		form_data,
		input_object,
		someFiles,
		silentMode
	){
		RequestMaker(
			form_method,
			form_async,
			form_endpoint,
			form_data,
			input_object,
			someFiles,
			silentMode
		);
	},
	
	RequestsLoader: function(todo) {
		RequestsLoader(todo);
	},
	
	loadings_are_NOT_possible: function() {
		loadings_are_NOT_possible();
	},
	
	isOnlineTEST: function() {
		isOnlineTEST();
	}
	
};

module.exports 																				= exportFunctions;