/*********************************** OPEN ****************************************/

Alloy.Globals.navigationWindow 				= $.window;
Alloy.Globals.toCloseWindows['payments_page']= $.window;

/*********************************** FOCUS ****************************************/

$.window.addEventListener("focus",function(e) {
	
	Alloy.Globals.toCloseWindows['payments_page']= $.window;

	Alloy.Globals.Dialog 									= $.navBar.getView('AlertDialog');
		
	Alloy.Globals.LEFTbottom_badge			= $.tabBar.getView('button1badge');
	Alloy.Globals.RIGHTbottom_badge			= $.tabBar.getView('button3badge');
	
});

var args 															= arguments[0] || {};
var passedData 											= args.passedData;
var post_sale_recap 										= passedData.the_back_and_save_button_HAVE_instructions;
var SAVE_CASE 											= 'card';
		
/*********************************** NAVIGATION BAR MANIPULATION *****************************************/

$.navBar.getView('navBarText').text			= 'MES INFOS DE PAIEMENT';
$.navBar.getView('menubutton').visible 	= false;
$.navBar.getView('backbutton').visible 		= true;
$.navBar.getView('backbutton').bcase 		= 'payments_page';

if(post_sale_recap)$.navBar.getView('backbutton').dcase= passedData.the_back_and_save_button_HAVE_instructions;

$.tabBar.getView('button2').bcase 			= 'payments_page';

/*********************************** HEIGHT ADJUSTMENTS ****************************************/

Alloy.Globals.tableViewHeight					= ( Ti.Platform.displayCaps.platformHeight - 82 ) - 101;
$.the_scroll_view.height 								= Alloy.Globals.tableViewHeight+2;

if(OS_ANDROID){
	
	Alloy.Globals.tableViewHeight				= ( Alloy.Globals.SCREEN_HEIGHT - 188 ) - 101;
	$.the_scroll_view.height 							= Alloy.Globals.tableViewHeight - 138;
	
}

/*********************************** TABBAR BUTTON CLICK ****************************************/

$.gotoCard.addEventListener("click", function(e) {

	Alloy.Globals.Logs.llog('>>>> CARD CLICK <<<<');
	
	Alloy.Globals.preventDoubleClick(this);
	
	$.cardDiv.height 										= 340;
	$.cardDiv.visible 										= true;
	$.ibanDiv.height 										= 0;
	$.ibanDiv.visible 										= false;
	
	$.addClass($.gotoCard,'selected');
	$.removeClass($.gotoIban,'selected');
	
	SAVE_CASE 												= 'card';

});		

if(typeof passedData != 'undefined' && passedData.tab2){
	
	setTimeout(function(){
		$.gotoIban.fireEvent('click');
	},1000);
	
}

$.gotoIban.addEventListener("click", function(e) {
		
	Alloy.Globals.Logs.llog('>>>> IBAN CLICK <<<<');
		
	Alloy.Globals.preventDoubleClick(this);
	
	$.cardDiv.height 										= 0;
	$.cardDiv.visible 										= false;
	$.ibanDiv.height 										= 500;
	$.ibanDiv.visible 										= true;
	
	$.addClass($.gotoIban,'selected');
	$.removeClass($.gotoCard,'selected');
	
	SAVE_CASE 												= 'iban';
	
});


/*********************************** MANUAL CLICKS ****************************************/

$.cardDiv.addEventListener("click", function(e) {
	
	if(
		e.source.id != 'CardNumber' &&
		e.source.id != 'CardExp1' &&
		e.source.id != 'CardExp2' &&
		e.source.id != 'CardCCV'
	){
		
		$.CardNumber.blur();
		$.CardExp1.blur();
		$.CardExp2.blur();
		$.CardCCV.blur();
			
	}
	
});

$.ibanDiv.addEventListener("click", function(e) {
	
	if(
		e.source.id != 'IbanName' &&
		e.source.id != 'IbanAddr' &&
		e.source.id != 'IbanCP' &&
		e.source.id != 'IbanVille' &&
		e.source.id != 'IbanIban' &&
		e.source.id != 'IbanBic'
	){
		
		$.IbanName.blur();
		$.IbanAddr.blur();
		$.IbanCP.blur();
		$.IbanVille.blur();
		$.IbanIban.blur();
		$.IbanBic.blur();
		
	}
	
});

$.ScanCard.addEventListener("click", function(e) {
	
	Alloy.Globals.preventDoubleClick(this);
	
	Alloy.Globals.app_card_scanner.scanCard(function(data){
		
		if(data.success == 'true'){
	
			///////////////Alloy.Globals.Logs.llog('---------------- CARD SCANNED ----------------');
			///////////////Alloy.Globals.Logs.llog(data);
			
			//////////// GOOGLE ANALYTICS
			
			Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
				category: 													"User account management",
				label: 															"Use scan credit card with camera feature",
				action: 														"use credit card scanner",
				value: 															1
			});
			
			/////////// CONSEQUENCES
			
			var exp1 												= parseInt(data.expiryMonth) < 10 ? '0'+data.expiryMonth : data.expiryMonth;
			var exp2													= parseInt(data.expiryYear) < 10 ? '0'+data.expiryYear : data.expiryYear;
			
			$.CardNumber.setValue(data.cardNumber);
			$.CardExp1.setValue(exp1);
			$.CardExp2.setValue(exp2);
			$.CardCCV.setValue(data.cvv);
			
		}
		else {
	
			Alloy.Globals.Logs.aalert('Erreur de scan','Swapbook n\'a pas été en mesure de retranscrire les chiffres de carte bancaire.','','OK',null,null,null,null);

		}
		
	});
	
	return;
	
});

$.Save.addEventListener("click", function(e) {
	
	Alloy.Globals.preventDoubleClick(this);
	
	if( SAVE_CASE == 'card' ){
		
		var in0 													= $.CardNumber.getValue();
		var inA 													= $.CardExp1.getValue();
		var inB 													= $.CardExp2.getValue();
		var in1 													= inA+inB;
		var in2 													= $.CardCCV.getValue();
		
		if( in0.length < 16 || !Alloy.Globals.tools.is_Valid_Number(in0) ){Alloy.Globals.Logs.aalert('Problème !','Merci de saisir un Numéro de carte bancaire valide.','','Corriger',null,null,null,null);return;}
		if( inA.length < 2 || inB.length < 2 || !Alloy.Globals.tools.is_Valid_Number(in1) ){Alloy.Globals.Logs.aalert('Problème !','Merci de saisir une Date d\'expiration de la carte valide au format MM / AA.','','Corriger',null,null,null,null);return;}
		if( !Alloy.Globals.tools.is_Valid_CardDate(in1) ){Alloy.Globals.Logs.aalert('Problème !','Merci de saisir une Date d\'expiration valide, ultérieure à la date du jour et au format MM / AA.','','Corriger',null,null,null,null);return;}
		if( in2.length < 3 || !Alloy.Globals.tools.is_Valid_Number(in2) ){Alloy.Globals.Logs.aalert('Problème !','Merci de saisir un Code de sécurité CCV valide.','(3 chiffres)','Corriger',null,null,null,null);return;}
	
		var SAVE_CONFIRM								= 'Carte de crédit enregistrée';
		var SAVE_OBJECT 								= {
	        the_user: 												Alloy.Globals.THE_USER.id_user,
	        the_settings_and_values:						JSON.stringify({
	        	method_type: 								'card',
				if_card_clear: 									in0,
				if_card_exp: 									in1,
				if_card_ccv: 									in2
	        })
		};
		
	}
	else{
		
		var in2 													= $.IbanCP.getValue();
		var in3 													= $.IbanIban.getValue();
		var in4 													= $.IbanBic.getValue();
		
		if( in2.length < 4 || !Alloy.Globals.tools.is_Valid_Number(in2) ){Alloy.Globals.Logs.aalert('Problème !','Merci de saisir un Code Postal valide','','Corriger',null,null,null,null);return;}
		if( in3.length < 18 ){Alloy.Globals.Logs.aalert('Problème !','Merci de saisir un Numéro d\'IBAN valide','','Corriger',null,null,null,null);return;}
		if( in4.length < 8 ){Alloy.Globals.Logs.aalert('Problème !','Merci de saisir un Numéro BIC valide','','Corriger',null,null,null,null);return;}
		
		var SAVE_CONFIRM								= 'Informations bancaires enregistrées';
		var SAVE_OBJECT 								= {
	        the_user: 												Alloy.Globals.THE_USER.id_user,
	        the_settings_and_values:						JSON.stringify({
	        	method_type: 								'iban',
				if_iban_name: 								$.IbanName.getValue(),
				if_iban_address: 							$.IbanAddr.getValue(),
				if_iban_zip: 									$.IbanCP.getValue(),
				if_iban_city: 									$.IbanVille.getValue(),
				if_iban_number: 							$.IbanIban.getValue(),
				if_iban_bic: 									$.IbanBic.getValue(),
	        })
		};
		
	}
	
	/* ******************************************** */
	/* ********* AJAX API QUERY (FAST WAY) ******** */
	/* ******************************************** */
	Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		Alloy.Globals.endPoints.userPaymentsSet,
		SAVE_OBJECT,
		{
			NO_LIMIT:						1,
			async_params: 				{},
			async_execution: 			function(JSON_returned,async_params_back){		
					
				if(typeof JSON_returned['error'] !== 'undefined'){
					
					Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);
					
				}
				else{
					
					///////////////Alloy.Globals.Logs.llog('---------------- SETTING SAVED ----------------');
					///////////////Alloy.Globals.Logs.llog(JSON_returned);
					
					//////////// GOOGLE ANALYTICS
					
					Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
						category: 													"User account management",
						label: 															"Save payments infos",
						action: 														"save payment details values",
						value: 															1
					});
					
					//////////// FOLLOWING
					
					Alloy.Globals.Logs.aalert(SAVE_CONFIRM,'','','',null,null,null,( post_sale_recap ? false : null),'BLUE'/* BLUE POPUP */);
					
					if(post_sale_recap)setTimeout(function(){
						Alloy.Globals.toCloseWindows['on_onesale_page_recap'].the_back_and_save_button_EXECUTED_instructions= 'OUI';
						Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['payments_page']);
					},2100);
					
				}
				
			}
			
		},
		false,
		false 
	);
	
});		

/*********************************** AUTO LOAD ****************************************/

function loadPayments(){

	/* ******************************************** */
	/* ********* AJAX API QUERY (FAST WAY) ******** */
	/* ******************************************** */
	Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		Alloy.Globals.endPoints.userPaymentsGet,
		{
	        the_user: 												Alloy.Globals.THE_USER.id_user
		},
		{
			async_params: 				{},
			async_execution: 			function(JSON_returned,async_params_back){		
					
				if(typeof JSON_returned['error'] !== 'undefined'){
					
					Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);
					
				}
				else{
					
					///////////////Alloy.Globals.Logs.llog('---------------- SETTINGS RETRIEVED ----------------');
					///////////////Alloy.Globals.Logs.llog(JSON_returned);
					
					if(typeof(JSON_returned['output-array']) == 'undefined')return;
					
					for (var i=0; i<JSON_returned['output-array'].length; i++) {
						
						var setting 									= JSON_returned['output-array'][i];
						
						if(setting.method_type == 'card'){
							
							var exp1 								= setting.if_card_exp.substr(0,2);
							var exp2 								= setting.if_card_exp.substr(2,2);
							
							$.CardNumber.setValue(setting.if_card_clear);
							$.CardExp1.setValue(exp1);
							$.CardExp2.setValue(exp2);
							$.CardCCV.setValue(setting.if_card_ccv);
							
						}
						else if(setting.method_type == 'iban'){
							
							$.IbanName.setValue(setting.if_iban_name);
							$.IbanAddr.setValue(setting.if_iban_address);
							$.IbanCP.setValue(setting.if_iban_zip);
							$.IbanVille.setValue(setting.if_iban_city);
							$.IbanIban.setValue(setting.if_iban_number);
							$.IbanBic.setValue(setting.if_iban_bic);
							
						}
						
					}
		
				}
				
			}
			
		},
		false,
		true 
	);
	
};

loadPayments();