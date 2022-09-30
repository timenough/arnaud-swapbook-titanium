/*********************************** OPEN ****************************************/

Alloy.Globals.navigationWindow 				= $.window;
Alloy.Globals.toCloseWindows['on_onesale_page_recap']= $.window;
	
var the_search_tableView 							= Ti.UI.createTableView(Alloy.Globals.loadReloadSearchBooks_engine_tableView);
var args 															= arguments[0] || {};
var passedData 											= args.passedData;

/*********************************** FOCUS ****************************************/

$.window.addEventListener("focus",function(e) {

	Alloy.Globals.toCloseWindows['on_onesale_page_recap']= $.window;
	
	Alloy.Globals.Dialog 									= $.navBar.getView('AlertDialog');
		
	Alloy.Globals.LEFTbottom_badge			= $.tabBar.getView('button1badge');
	Alloy.Globals.RIGHTbottom_badge			= $.tabBar.getView('button3badge');
	    
	/********************* TABLE VIEW SEARCH INIT *********************/
	
	$.window.add(the_search_tableView);

	Alloy.Globals.loadReloadSearchBooks_engine(
		$.navBar.getView('searchbutton'),
		$.modal_search_close,
		$.modal_search,
		$.the_search_field,
		the_search_tableView,
		"list_cell_book_search",
		false,
		false
	);
	
	if($.window.the_back_and_save_button_EXECUTED_instructions){
		delete $.window.the_back_and_save_button_EXECUTED_instructions;
		setTimeout(function(){
			Alloy.Globals.loadReloadRecapUSER(true);
		},4000);
	}
	
});

var card_or_account										= 'card';
var loop_length												=	0;
var sales_ids													= [];
var choosen_payment_method_id				= 0;
var some_errors 											= false;
var stripeCreditCardNumber						= '';
		
/*********************************** NAVIGATION BAR MANIPULATION *****************************************/

$.navBar.getView('navBarText').text			= 'SWAPBOOK';
$.navBar.getView('menubutton').visible 	= false;
$.navBar.getView('backbutton').visible 		= true;
$.navBar.getView('backbutton').bcase 		= 'on_onesale_page_recap';

$.navBar.getView('buybutton').bcase 		= null;
$.navBar.getView('sellbutton').bcase 		= 'goto_sell_page';

$.tabBar.getView('button2').bcase 			= 'on_onesale_page_2';

/*********************************** SLIDER MENU + SEARCH EVENTS ****************************************/

Alloy.Globals.menuOpened 							= false;
Alloy.Globals.searchOpened 						= false;

/*********************************** HEIGHT ADJUSTMENTS ****************************************/

Alloy.Globals.tableViewHeight					= ( Ti.Platform.displayCaps.platformHeight - 82 ) - 60;
$.the_scroll_view.height 								= Alloy.Globals.tableViewHeight+2;

if(OS_ANDROID){
	
	Alloy.Globals.tableViewHeight				= ( Alloy.Globals.SCREEN_HEIGHT - 188 ) - 60;
	$.the_scroll_view.height 							= Alloy.Globals.tableViewHeight - 138;
	
}

/*********************************** MAIN MANIPULATION  *****************************************/

Alloy.Globals.populateRecapBOOKS 			= function(){
	
	loop_length												= 0;
	$.booksRecap.height 								= 0;
	var children 												= $.booksRecap.children.slice(0);
	for (var i = 0; i < children.length; ++i){$.booksRecap.remove(children[i]);}

	////////// LOOP ON EACH INHERITED BOOKS
	
	var loop														=	passedData.cart_object;
	for (var property in loop) {
		
		if (loop.hasOwnProperty(property)) {
	
			var OneOtherBookDATAS 				= loop[property];

			var oneOtherBook 								= Ti.UI.createView({});
			$.addClass(oneOtherBook,'rows');
				
				////// IMG
				
				var list_img_obook_container 		= Ti.UI.createView({});
				$.addClass(list_img_obook_container,'the_main_col');
				$.addClass(list_img_obook_container,'the_main_col_common_vertical_1');
				$.addClass(list_img_obook_container,'list_img_book_container');
	
					var book_img 							= Ti.UI.createImageView({
						image: OneOtherBookDATAS['bookPhoto']
					});
					$.addClass(book_img,'book_img');
					
				list_img_obook_container.add(book_img);
				
				////// TITLE + AUTHOR + EDITION + PRICE + STATE
				
				var list_txt_book_container			= Ti.UI.createView({});
				$.addClass(list_txt_book_container,'the_main_col');
				$.addClass(list_txt_book_container,'the_main_col_common_vertical_1');
				$.addClass(list_txt_book_container,'list_txt_book_container');
				
					////// TITLE
					
					var book_title								= Ti.UI.createLabel({
						text: OneOtherBookDATAS['bookTitle']
					});
					$.addClass(book_title,'book_title');
					$.addClass(book_title,'labl');
					book_title.verticalAlign 			= (OneOtherBookDATAS['bookTitle'].length <= 28) ? Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER : Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP;
				
					list_txt_book_container.add(book_title);
				
					////// AUTHOR + EDITION
				
					var book_author_and_edition 	= Ti.UI.createView({});
					$.addClass(book_author_and_edition,'book_author_and_edition');
					
						var book_author						= Ti.UI.createLabel({
							text: OneOtherBookDATAS['bookAuthor']+'  |'
						});
						$.addClass(book_author,'book_author');
						$.addClass(book_author,'labl');
					
						var book_edition					= Ti.UI.createLabel({
							text: ' '+OneOtherBookDATAS['bookEdition']
						});
						$.addClass(book_edition,'book_edition');
						$.addClass(book_edition,'labl');
					
						book_author_and_edition.add(book_author);
						book_author_and_edition.add(book_edition);
				
					list_txt_book_container.add(book_author_and_edition);
				
					////// PRICE + STATE
				
					var book_price_and_state			= Ti.UI.createView({});
					$.addClass(book_price_and_state,'book_price_and_state');
					
						var book_price						= Ti.UI.createLabel({
							text: Alloy.Globals.tools.number_format(parseFloat(parseFloat(OneOtherBookDATAS['prixTTC']).toFixed(2)),2,'.',' ')+'€'
						});
						$.addClass(book_price,'book_price');
						$.addClass(book_price,'labl');
					
						var book_state						= Ti.UI.createLabel({
							text: ' - '+OneOtherBookDATAS['bookState']
						});
						$.addClass(book_state,'book_state');
						$.addClass(book_state,'labl');
					
						book_price_and_state.add(book_price);
						book_price_and_state.add(book_state);
				
					list_txt_book_container.add(book_price_and_state);
				
					////// SEPARATOR
					
					var sepa 										= Ti.UI.createView({});
					$.addClass(sepa,'book_separator');
					
					list_txt_book_container.add(sepa);
				
			////// ALL
			
			oneOtherBook.add(list_img_obook_container);
			oneOtherBook.add(list_txt_book_container);
	
			$.booksRecap.add(oneOtherBook);
			
			sales_ids.push(property);
			loop_length++;
			
		}
		
	}
	
	$.booksRecap.height 								= 110 * loop_length;
	
	////// TOTALS SHOWN
	
	$.moneyToPay.to_pay_value					= passedData.cart_total_TTC;
	$.moneyToPay.text 									= 'Total TTC : '+Alloy.Globals.tools.number_format(passedData.cart_total_TTC,2,'.',' ')+'€';
	$.moneyToPayHT.text 								= 'Total HT : '+Alloy.Globals.tools.number_format(passedData.cart_total_HT,2,'.',' ')+'€';
	$.moneyToPayPORT.text 							= 'dont frais de port : '+Alloy.Globals.tools.number_format(passedData.cart_total_PORT,2,'.',' ')+'€';

};

function populateRecapUSER(JSON_returned,local_params){

	if(
		typeof JSON_returned['error'] !== 'undefined'
	){
		
		Alloy.Globals.Logs.llog(JSON_returned);
		
		/*********/
		/* ALERT */
		/*********/
		Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);
		
	}
	else{
		
		Alloy.Globals.Logs.llog('---------------- USER RECAP INFOS RETRIEVED ----------------');
		//Alloy.Globals.Logs.llog(JSON_returned['output-array']);
		
		passedData.userInfos 							= JSON_returned['output-array'];
		
		///////// ADDRESS DETAILS
		
		$.NomPrenom.text 								= typeof JSON_returned['output-array']['adresses'][0] == 'undefined' ? '' : JSON_returned['output-array']['adresses'][0]['address_field7'];
		$.Rue.text 												= typeof JSON_returned['output-array']['adresses'][0] == 'undefined' ? 'Rue à communiquer au vendeur.' : JSON_returned['output-array']['adresses'][0]['address_field5'];
		$.CP_Ville.text 										= typeof JSON_returned['output-array']['adresses'][0] == 'undefined' ? 'Code postal et ville à communiquer au vendeur.' : JSON_returned['output-array']['adresses'][0]['address_field2']+' '+JSON_returned['output-array']['adresses'][0]['address_field3'];
		$.Pays.text 											= typeof JSON_returned['output-array']['adresses'][0] == 'undefined' ? 'Pays à communiquer au vendeur.' : JSON_returned['output-array']['adresses'][0]['address_field4'];
		$.Tel.text 												= JSON_returned['output-array']['user_tel_portable'];
		
		///////// PAYMENT DETAILS (CREDIT CARD)
		
		if( 
			typeof JSON_returned['output-array']['payments'] != 'undefined' &&
			typeof JSON_returned['output-array']['payments']['card'] != 'undefined'
		){
			
			var last_card_digits 							= JSON_returned['output-array']['payments']['card']['if_card_clear'];
			$.cr_hidden.text 								= 'XXXX - XXXX - XXXX - '+last_card_digits.substr(last_card_digits.length - 4);
			
			/////// FOR STRIPE
			
			stripeCreditCardNumber					= last_card_digits;
			
		}
		else{
			
			$.useAccountImg.image 					= '/images/arrowDown.png';
			$.useAccount.status 							= 'on';
			$.useCreditCard.status 					= 'off';
			
			$.useCreditCard.height 					= 0;
			$.confirmCardRow1.top 					= 0;
			$.confirmCardRow1.height 				= 0;
			$.confirmCardRow2.top 					= 0;
			$.confirmCardRow2.height 				= 0;
			$.confirmCardRow3.top 					= 0;
			$.confirmCardRow3.height 				= 0;
			
			$.useAccount.top 								= '6dp';
			
		    $.confirmCard.top 							= '8dp';
		    $.confirmCard.height 						= 36;
			
		}
		
		///////// PAYMENT DETAILS (ACCOUNT)
		
		$.moneyAccount.payable_value 			= (typeof JSON_returned['output-array']['payments'] != 'undefined' && typeof JSON_returned['output-array']['payments']['account'] !='undefined' ) ? JSON_returned['output-array']['payments']['account']['if_count_balance'] : 0.00;
		$.moneyAccount.text 							= Alloy.Globals.tools.number_format($.moneyAccount.payable_value,2,'.',' ')+'€';
		
		$.the_scroll_view.scrollTo(0,0);
		
	}
		
	/* DISPLAY CONTENT */
	$.the_scroll_view.visible 							= true;

};

/*********************************** MAIN DATA LOAD ****************************************/

var request_input											= [];

Alloy.Globals.loadReloadRecapUSER 			= function(silent){

	/* HIDE CONTENT WAITING ALL LOADS */
	$.the_scroll_view.visible							= false;
	var silent_mode 										= silent === true ? true : false;
	
	request_input												= [];
	request_input['async_execution']			= populateRecapUSER;
	request_input['async_params']				= [];
	
	/* ********* AJAX API QUERY ********* */
	Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		Alloy.Globals.endPoints.getUserAccount,
		{
			id_user: 												Alloy.Globals.THE_USER.id_user,
			id_user_viewer: 									Alloy.Globals.THE_USER.id_user,
		},
		request_input,
		false,
		silent_mode
	);
	
};

$.window.addEventListener("focus", function() {

	if(!some_errors){
		
		Alloy.Globals.populateRecapBOOKS();
	
	}

});

Alloy.Globals.loadReloadRecapUSER();

/*********************************** DEVELOP CREDIT CARD CLICK ****************************************/

$.useCreditCard.addEventListener("touchstart", function(e) {
	
	Alloy.Globals.preventDoubleClick(this);
	
	if (this.status == 'off'){
		
		$.useCreditCardImg.image 					= '/images/arrowDown.png';
		$.useCreditCard.status 						= 'on';
		$.useAccount.status 								= 'off';
		
		$.confirmCard.height 							= 0;
		
	}
	else{
		
		$.useCreditCardImg.image 					= '/images/arrowRight.png';
		$.useCreditCard.status 						= 'off';
		$.useAccount.status 								= 'off';
		
		$.confirmCard.height 							= 128;
		
	}
	
});

/*********************************** USE ACCOUNT BALANCE CLICK ****************************************/

$.useAccount.addEventListener("click", function(e) {
	
	Alloy.Globals.preventDoubleClick(this);
	
	if (this.status == 'off'){
		
		$.useAccountImg.image 						= '/images/arrowDown.png';
		$.useAccount.status 								= 'on';
		$.useCreditCard.status 						= 'off';
		
		$.useCreditCard.height 						= 0;
		$.confirmCardRow1.top 						= 0;
		$.confirmCardRow1.height 					= 0;
		$.confirmCardRow2.top 						= 0;
		$.confirmCardRow2.height 					= 0;
		$.confirmCardRow3.top 						= 0;
		$.confirmCardRow3.height 					= 0;
		
		$.useAccount.top 									= '6dp';
		
	    $.confirmCard.top 								= '8dp';
	    $.confirmCard.height 							= 36;
		
	}
	else{
		
		$.useAccountImg.image 						= '/images/arrowRight.png';
		$.useAccount.status 								= 'off';
		$.useCreditCard.status 						= 'on';
		
		$.useCreditCard.height 						= 30;
		$.confirmCardRow1.top 						= '6dp';
		$.confirmCardRow1.height 					= 30;
		$.confirmCardRow2.top 						= '6dp';
		$.confirmCardRow2.height 					= 30;
		$.confirmCardRow3.top 						= '14dp';
		$.confirmCardRow3.height 					= 0.5;
		
		$.useAccount.top 									= '14dp';
		
	    $.confirmCard.top 								= 0;
	    $.confirmCard.height 							= 128;
		
	}
	
});

/*********************************** ADD PAYMENT METHOD CLICK ****************************************/

$.AddPayMethod.addEventListener("click", function(e) {
	
	Alloy.Globals.preventDoubleClick(this);
	
	Alloy.Globals.app.goTo("page_3_c_1_payments",{
		the_back_and_save_button_HAVE_instructions: passedData
	});
	
});

/*********************************** VALIDER CLICK ****************************************/

$.Pay.addEventListener("click", function(e) {
	
	Alloy.Globals.preventDoubleClick(this);

	some_errors 												= true;
	var inA 														= $.cr_date1.value;
	var inB 														= $.cr_date2.value;
	var in1 														= inA+inB;
	var in2 														= $.cr_code.value;
	var in3 														= $.moneyAccount.payable_value;
	var in4 														= $.moneyToPay.to_pay_value;
	
	if( $.useAccount.status == 'on' && !Alloy.Globals.tools.is_Possible_AccountBalance_Purchase(in3,in4) ){
		
		Alloy.Globals.Logs.aalert('Problème !','Tu ne disposes pas de suffisamment de fonds sur ton compte Swapbook pour valider ce paiement.','','OK',null,null,null,null);
		return;
		
	}
	
	if( $.useAccount.status == 'on' ){
		
		card_or_account										= 'account';
		
	}
	else{
		
		card_or_account										= 'card';
	
		if( in1.length < 4 || !Alloy.Globals.tools.is_Valid_Number(in1) ){Alloy.Globals.Logs.aalert('Problème !','Merci de saisir une date d\'expiration de la carte valide, à 4 chiffres au format MMAA','','Corriger',null,null,null,null);return;}
		if( !Alloy.Globals.tools.is_Valid_CardDate(in1) ){Alloy.Globals.Logs.aalert('Problème !','Merci de saisir une date d\'expiration valide, ultérieure à la date du jour et au format MMAA','','Corriger',null,null,null,null);return;}
		if( in2.length < 3 || !Alloy.Globals.tools.is_Valid_Number(in2) ){Alloy.Globals.Logs.aalert('Problème !','Merci de saisir le code de vérification de la carte valide à 3 chiffres','','Corriger',null,null,null,null);return;}
		
	}
	
	var phrase													= loop_length == 1 ? 'Tu t\'apprêtes à acheter ce livre' : 'Tu t\'apprêtes à acheter ces '+loop_length+' livres';
	choosen_payment_method_id 				= typeof passedData.userInfos['payments'] != 'undefined '? passedData.userInfos['payments'][card_or_account]['id_method'] : -1;
	some_errors 												= false;

	///////// POP-IN
	
	Alloy.Globals.Logs.aalert(
		'CONFIRMATION',
		'Bravo, les livres rendent intelligent',
		phrase,
		'ANNULER',
		null,
		'CONFIRMER',
		Alloy.Globals.purchasePROCESSfunction_1,
		{
			id_buyer: 											Alloy.Globals.THE_USER.id_user,
			id_buyer_payment_method: 			choosen_payment_method_id,
			id_sales: 											sales_ids,
			cardExp1:											inA,
			cardExp2:											inB,
			cardCCV: 											in2,
			stripe_number: 			 						stripeCreditCardNumber
		},
		'page_1_a_4_onesale_recap'
	);
	
	//////////// GOOGLE ANALYTICS
	
	Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
		category: 													"User buying process",
		label: 															"Ready to confirm the purchase",
		action: 														"pre-payment state",
		value: 															1
	});
	
});

/*********************************** PURCHASE PROCESS ( $.Pay CLICK ) ****************************************/

Alloy.Globals.purchasePROCESSfunction_1= function(object_received){
	
	///////Alloy.Globals.Logs.llog('--------> ACHAT étape 1');
	///////Alloy.Globals.Logs.llog(object_received);

	Alloy.Globals.Logs.aalert_close();
	
	/* HIDE CONTENT WAITING ALL LOADS */
	$.window.animate({backgroundColor:'#265888'});
	$.the_scroll_view.visible							= false;
	
	request_input												= [];
	request_input['MORE_TIME']					= 30000;
	request_input['async_execution']			= Alloy.Globals.purchasePROCESSfunction_2;
	request_input['async_params']				= [];
	request_input['params']							= {
		buyer_user_id: 									object_received.id_buyer,
		method_id: 										object_received.id_buyer_payment_method,
		sales_json_id: 									JSON.stringify(object_received.id_sales),
		card_exp_month: 								object_received.cardExp1,
		card_exp_year: 									object_received.cardExp2,
		card_ccv: 											object_received.cardCCV,
		card_number:										object_received.stripe_number
	};
	
	/* ********* AJAX API QUERY ********* */
	Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		Alloy.Globals.endPoints.tryToPayForBooks,
		request_input['params'],
		request_input,
		false,
		false
	);
	
};

Alloy.Globals.purchasePROCESSfunction_2= function(JSON_returned,local_params){
	
	///////Alloy.Globals.Logs.llog('--------> ACHAT étape 2');
	
	Alloy.Globals.Requests.RequestsLoader('show');

	if(
		typeof JSON_returned['error'] !== 'undefined'
	){
		
		Alloy.Globals.Requests.RequestsLoader('hide');
	
		/*********/
		/* ALERT */
		/*********/
		Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','Retenter',null,null,null,null);
		
		$.window.animate({backgroundColor:'#fff'});
		$.the_scroll_view.visible 						= true;
	
		setTimeout(function(){
			Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['on_onesale_page_recap']);
		},3000);
		
	}
	else{
	
		///////
		Alloy.Globals.Logs.llog('---------------- PAY FOR BOOK INFOS RETRIEVED ----------------');
		///////
		Alloy.Globals.Logs.llog(JSON_returned);
	
		/////////////////////////////////////////////////////////////
		//////////// GOOGLE ANALYTICS //////////// (https://github.com/Sitata/titanium-google-analytics/blob/master/example/app.js)
		/////////////////////////////////////////////////////////////
		
		Alloy.Globals.GoogleAnalyticsTracker.trackTransaction({
			transactionId: 									JSON_returned['output-array']['id_sale'],
			affiliation: 											"Books sales",
			revenue: 												JSON_returned['output-array']['sale_price_total'],
			tax: 														JSON_returned['output-array']['sale_price_share_company'],
			shipping: 											JSON_returned['output-array']['sale_price_share_shipping'],
			currency: 											"EUR"
		});

		/* ******* 1 = Suppression des éléments de saisie du paiement */
		
		$.Pay.visible 											= false;
		$.useCreditCard.height 						= 0;
		$.useCreditCard.visible 						= false;
		$.confirmCard.height 							= 0;
		$.confirmCard.visible 							= false;
		
		/* ******* 2 = Delete des 2 pages précédentes dans la Navigation */
		
		if(Alloy.Globals.toCloseWindows['on_onesale_page'])Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['on_onesale_page']);
		if(Alloy.Globals.toCloseWindows['on_onebook_page'])Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['on_onebook_page']);
		
		/* ******* 3 = POP-IN */
		
		Alloy.Globals.Requests.RequestsLoader('hide');
		
		Alloy.Globals.Logs.aalert(
			'ACHAT CONFIRMÉ',
			'On te met en relation avec le vendeur pour que tu puisse récupérer ton livre',
			'Attention ! Tu devras envoyer un code au vendeur en échange de son article, c\'est la condition pour q\'il soit payé',
			'J\'AI COMPRIS',
			Alloy.Globals.purchasePROCESSfunction_3,
			null,
			null,
			{
				sizeUp1: 				true, 
				conversation: 			JSON_returned['output-array']['conversation']
			},
			'page_1_a_4_onesale_recap'
		);
		
	}

};

Alloy.Globals.purchasePROCESSfunction_3= function(object_received){
	
	Alloy.Globals.Logs.aalert_close();
	
	/* DISPLAY CONTENT */
	$.window.animate({backgroundColor:'#fff'});
	$.the_scroll_view.visible 							= true;
	
	///////Alloy.Globals.Logs.llog('---------> ACHAT étape 3');
	///////Alloy.Globals.Logs.llog(object_received);
	
	if(Alloy.Globals.toCloseWindows['on_onesale_page_recap'])
		Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['on_onesale_page_recap']);

	if(Alloy.Globals.the_u_is_on_tablet.isTablet()){
		
		Alloy.Globals.app.goTo("page_2_a_1_messages_LANDSCAPE",{});
		
	}
	else{
		
		Alloy.Globals.app.goTo("page_2_a_2_oneconversation",{
			id: 					object_received.conversation.id, 
			titre: 				object_received.conversation.titre, 
			image: 			object_received.conversation.image,
			type: 				'duo',
			theme: 			'garcon',
			after_sale: 		true,
			createWindow: 	'on_oneconversation_page',
		});
		
	}
	
};