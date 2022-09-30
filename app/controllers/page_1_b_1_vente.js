/*********************************** OPEN ****************************************/

Alloy.Globals.navigationWindow 				= $.window;
Alloy.Globals.toCloseWindows['on_onesale_page']= $.window;
	
var the_search_tableView 							= Ti.UI.createTableView(Alloy.Globals.loadReloadSearchBooks_engine_tableView);

/*********************************** FOCUS ****************************************/

$.window.addEventListener("focus",function(e) {
	
	Alloy.Globals.toCloseWindows['on_onesale_page']= $.window;

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
	
});

var args 															= arguments[0] || {};
var passedData 											= args.passedData; //////////passedData.tab3 = 11;
var MODIFICATION_CASE 							= (typeof passedData != 'undefined' && passedData.tab3) ? true : false;
var book_state_values 									= {'neuf':0, 'tres_bon':1, 'fatigue':2, 'abime':3};
var book_state_values_reverse 					= ['neuf','tres_bon','fatigue','abime'];
var available_tag_fields 								= {};
var baseTagsNumber									= 3;

Alloy.Globals.Logs.llog(passedData);

/*********************************** NAVIGATION BAR MANIPULATION *****************************************/

$.navBar.getView('navBarText').text			= 'SWAPBOOK';
$.navBar.getView('menubutton').visible 	= false;
$.navBar.getView('backbutton').visible 		= false;
$.navBar.getView('backbutton').bcase 		= null;

$.navBar.getView('buybutton').bcase 		= 'goto_buy_page';
$.navBar.getView('sellbutton').bcase 		= null;

$.tabBar.getView('button2').bcase 			= 'on_onesale_page';

/*********************************** HEIGHT ADJUSTMENTS ****************************************/

$.the_scroll_view.height 								=  ( Ti.Platform.displayCaps.platformHeight - 82 ) - 58;

if(OS_ANDROID){
	Alloy.Globals.tableViewHeight				= ( Alloy.Globals.SCREEN_HEIGHT - 188 ) - 101;
	$.the_scroll_view.height 							= Alloy.Globals.tableViewHeight - 138;
}

/*********************************** SALE INIT ****************************************/

var Virtual_Sale_Object 								= {
	step:															0,
	/* user_stored_books */
	ISBN: 															'',
	book_id:														0,
	book_title: 													'',
	INITIAL_book_title: 									'',
	book_edition: 												'',
	INITIAL_book_edition: 								'',
	/* user_stored_books_authors */
	author_name: 											'',
	author_id: 													0,
	INITIAL_author_name:								'',
	/* user_stored_books_editors */
	editor_name: 												'',
	editor_id: 													0,
	INITIAL_editor_name: 								'',
	/* user_stored_sales */
	id_sale: 														MODIFICATION_CASE ? passedData.tab3 : null,
	sale_user_selling_id: 								Alloy.Globals.THE_USER.id_user,
	sale_status: 												'available',
	sale_location_x: 											Alloy.Globals.DeviceCoords.latitude,
	sale_location_y: 											Alloy.Globals.DeviceCoords.longitude,
	sale_price_total: 										0,
	sale_price_amazon: 									0,
	sale_seller_price: 										0,
	sale_price_share_shipping: 						0,
	sale_state: 													'neuf',
	sale_description: 										'',
	sale_advice: 												'',
	sale_tags: 													[],
	need_a_photo: 											true
};

/*********************************** TABBAR BUTTON CLICK ****************************************/

Alloy.Globals.Selling_step1GO 					= function(e,f){

	Alloy.Globals.Logs.llog('>>>> GOTO STEP 1 CLICK <<<<');
	
	///////////// 
	///////////// PRE-PROCESS
	///////////// 
	
	if(typeof f == 'undefined'){
		
		if(e && e.source)Alloy.Globals.preventDoubleClick(e.source);
		
	}
	else{
		
		var JSON_returned 								= e;
		
		if(
			typeof JSON_returned['error'] !== 'undefined'  ||
			(
				typeof JSON_returned['error'] == 'undefined' &&
				typeof JSON_returned['output-array'] !== 'undefined' &&
				typeof JSON_returned['output-array']['SwapBookPriceOffer'] == 'undefined'
			)
		){
			
			Alloy.Globals.Logs.aalert('Vente Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);
			
			$.bookImg.image 								= Alloy.Globals.endPoints.defaultBookImage;
			$.bookImg.cvalue 								= Alloy.Globals.endPoints.defaultBookImage;
			
			Virtual_Sale_Object.step 					= 1;
			Virtual_Sale_Object.need_a_photo 	= false;
			Virtual_Sale_Object.ISBN					= '0000000000';
			
		}
		else{
			
			///////////////Alloy.Globals.Logs.llog('---------------- ISBN DATAS RETRIEVED ----------------');
			///////////////
			Alloy.Globals.Logs.llog(JSON_returned);
			
			Virtual_Sale_Object.step 					= 1;
			
			if( parseFloat(JSON_returned['output-array']['SwapBookPriceOffer']) < 2.50 )JSON_returned['output-array']['SwapBookPriceOffer']= '2.50';
			if( parseFloat(JSON_returned['output-array']['SwapBookPriceOffer']) > 99999.00 )JSON_returned['output-array']['SwapBookPriceOffer']= '99999.00';

			Virtual_Sale_Object.ISBN 										= JSON_returned['output-array']['SwapBookISBN'];
			Virtual_Sale_Object.book_title 								= JSON_returned['output-array']['ItemAttributes']['Title'];
			Virtual_Sale_Object.INITIAL_book_title 				= JSON_returned['output-array']['ItemAttributes']['Title'];
			Virtual_Sale_Object.book_edition 						= JSON_returned['output-array']['SwapBookEdition'];
			Virtual_Sale_Object.INITIAL_book_edition			= JSON_returned['output-array']['SwapBookEdition'];
			Virtual_Sale_Object.author_name 						= JSON_returned['output-array']['ItemAttributes']['Author'];
			Virtual_Sale_Object.INITIAL_author_name			= JSON_returned['output-array']['ItemAttributes']['Author'];
			Virtual_Sale_Object.editor_name 						= JSON_returned['output-array']['ItemAttributes']['Publisher'];
			Virtual_Sale_Object.INITIAL_editor_name			= JSON_returned['output-array']['ItemAttributes']['Publisher'];
			Virtual_Sale_Object.sale_photo_json 					= JSON_returned['output-array']['MediumImage']['URL'];
			Virtual_Sale_Object.sale_price_total 					= JSON_returned['output-array']['SwapBookPriceOffer'];
			Virtual_Sale_Object.sale_price_amazon 				= JSON_returned['output-array']['SwapBookPriceComparison_amazon'];
			Virtual_Sale_Object.need_a_photo 						= false;
	
			$.Price.text 										= JSON_returned['output-array']['SwapBookPriceOffer']+'€';
			$.amazonPrice.text  							= JSON_returned['output-array']['SwapBookPriceComparison_amazon']+'€';
			$.bookImg.image 								= JSON_returned['output-array']['LargeImage']['URL'];
			$.bookImg.cvalue 								= JSON_returned['output-array']['MediumImage']['URL'];
			
			if(typeof JSON_returned['output-array']['SwapBookDescription'] != 'undefined'){
				Virtual_Sale_Object.sale_description 				= JSON_returned['output-array']['SwapBookDescription'];
				$.bookDesc.setValue(JSON_returned['output-array']['SwapBookDescription']);	
			}
			
			if(typeof JSON_returned['output-array']['SwapBookAuthors'] != 'undefined'){
				Virtual_Sale_Object.author_name 					= JSON_returned['output-array']['SwapBookAuthors'];
				$.bookAuthor.setValue(JSON_returned['output-array']['SwapBookAuthors']);	
			}
			else{
				$.bookAuthor.setValue(JSON_returned['output-array']['ItemAttributes']['Author']);	
			}
			
			$.bookTitle.setValue(JSON_returned['output-array']['ItemAttributes']['Title']);			
			$.bookEditor.setValue(JSON_returned['output-array']['ItemAttributes']['Publisher']);		
			$.bookEdition.setValue(JSON_returned['output-array']['SwapBookEdition']);		
			$.bookPrice.setValue(JSON_returned['output-array']['SwapBookPriceOffer']);
			
			$.step1ValidPicto.image 					= '/images/validate.png';
			$.step2ValidPicto.image 					= '/images/validate.png';
			$.step3ValidPicto.image 					= '/images/validate.png';
			
			/* IF AMAZON GAVE US : 0.00€ */
			if(JSON_returned['output-array']['SwapBookPriceOffer'] === '0.00'){
				$.gotoStep1.jump_to_step3= true;
			}
			else{
				delete $.gotoStep1.jump_to_step3;
			}
		    
		}
		
	}
	
	///////////// 
	///////////// DOM MANIPULATIONS
	///////////// 
	
	$.tabBarTop.height 									= 56;
	$.tabBarTop.visible 									= true;

	$.navBar.getView('backbutton').backCase= 0;
	$.navBar.getView('backbutton').visible= true;
		
	$.addClass($.step1Bar,'current-step');
	$.removeClass($.step2Bar,'current-step');
	$.removeClass($.step3Bar,'current-step');
		
	Alloy.Globals.underlineItem($.step1Title);
	Alloy.Globals.underlineItemRemove($.step2Title);
	Alloy.Globals.underlineItemRemove($.step3Title);
	
	$.step1ValidPicto.visible 						= false;
	$.step2ValidPicto.visible 						= false;
	$.step3ValidPicto.visible 						= false;
	
	$.step0Div.height 									= 0;
	$.step0Div.visible 									= false;
	$.step1Div.height 									= $.step1Div.dheight;
	$.step1Div.visible 									= true;
	$.step2Div.height 									= 0;
	$.step2Div.visible 									= false;
	$.step3Div.height 									= 0;
	$.step3Div.visible 									= false;
	
};		

$.gotoStep1TAB.addEventListener("click", Alloy.Globals.Selling_step1GO);

Alloy.Globals.Selling_step2GO 					= function(e){

	Alloy.Globals.Logs.llog('>>>> GOTO STEP 2 CLICK <<<<');
	
	if(e && e.source)Alloy.Globals.preventDoubleClick(e.source);
	
	///////////// 
	///////////// STEP VALIDATION
	///////////// 
	
	if( 
		e && 
		e.source &&
		!e.source.bypass &&
		Virtual_Sale_Object.step < 2
	){
		
		Alloy.Globals.Logs.aalert('Erreur de parcours','Tu ne peux pas encore aller à cette étape sans valider celle en cours.','','OK',null,null,null,null);
		return;
		
	}
	
	if(!$.gotoStep1.decision){
		
		Alloy.Globals.Logs.aalert('Erreur de parcours','Merci d\'indiquer l\'état actuel du livre.','','OK',null,null,null,null);
		return;
		
	}
	
	Virtual_Sale_Object.step 							= 2;
	
	///////////
	/////////// BYPASS IF NO ISBN
	///////////
	
	if(
		Virtual_Sale_Object.ISBN == '0000000000' ||
		$.gotoStep1.jump_to_step3
	){
		
		$.navBar.getView('backbutton').visible= false;
		
		$.gotoStep2.fireEvent('click');
		
		return;	
		
	}
	
	///////////// 
	///////////// DOM MANIPULATIONS
	///////////// 
	
	$.tabBarTop.height 									= 56;
	$.tabBarTop.visible 									= true;

	$.navBar.getView('backbutton').backCase= 1;
	$.navBar.getView('backbutton').visible= true;
		
	$.addClass($.step1Bar,'current-step');
	$.addClass($.step2Bar,'current-step');
	$.removeClass($.step3Bar,'current-step');
		
	Alloy.Globals.underlineItemRemove($.step1Title);
	Alloy.Globals.underlineItem($.step2Title);
	Alloy.Globals.underlineItemRemove($.step3Title);
	
	$.step1ValidPicto.visible 						= true;
	$.step2ValidPicto.visible 						= false;
	$.step3ValidPicto.visible 						= false;
	
	$.step0Div.height 									= 0;
	$.step0Div.visible 									= false;
	$.step1Div.height 									= 0;
	$.step1Div.visible 									= false;
	$.step2Div.height 									= $.step2Div.dheight;
	$.step2Div.visible 									= true;
	$.step3Div.height 									= 0;
	$.step3Div.visible 									= false;
	
};		

$.gotoStep2TAB.addEventListener("click", Alloy.Globals.Selling_step2GO);
$.gotoStep1.addEventListener("click", Alloy.Globals.Selling_step2GO);

Alloy.Globals.Selling_step3GO 					= function(e){
		
	Alloy.Globals.Logs.llog('>>>> GOTO STEP 3 CLICK <<<<');
		
	if(e && e.source)Alloy.Globals.preventDoubleClick(e.source);
	
	///////////// 
	///////////// STEP VALIDATION
	///////////// 
	
	if( 
		e && 
		e.source &&
		!e.source.bypass &&
		Virtual_Sale_Object.step < 3
	){
		
		Alloy.Globals.Logs.aalert('Erreur de parcours','Tu ne peux pas encore aller à cette étape sans valider celle en cours.','','OK',null,null,null,null);
		return;
		
	}
	
	Virtual_Sale_Object.step 							= 3;

	if(this.acceptOffer){
	
		$.bookPrice.editable 							= false;
		
		$.addClass($.priceField,'view-field-done');
		
	}
	else{
	
		$.bookPrice.editable 							= true;
		
		$.removeClass($.priceField,'view-field-done');
		
	}
	
	///////////// 
	///////////// DOM MANIPULATIONS
	/////////////
	
	$.tabBarTop.height 									= (MODIFICATION_CASE) ? 0 : 56;
	$.tabBarTop.visible 									= (MODIFICATION_CASE) ? false : true;

	$.navBar.getView('backbutton').backCase= 2;
	$.navBar.getView('backbutton').visible	= (MODIFICATION_CASE) ? false : true;
		
	$.addClass($.step1Bar,'current-step');
	$.addClass($.step2Bar,'current-step');
	$.addClass($.step3Bar,'current-step');
		
	Alloy.Globals.underlineItemRemove($.step1Title);
	Alloy.Globals.underlineItemRemove($.step2Title);
	Alloy.Globals.underlineItem($.step3Title);
	
	$.step1ValidPicto.visible 						= true;
	$.step2ValidPicto.visible 						= true;
	$.step3ValidPicto.visible 						= false;
	
	$.step0Div.height 									= 0;
	$.step0Div.visible 									= false;
	$.step1Div.height 									= 0;
	$.step1Div.visible 									= false;
	$.step2Div.height 									= 0;
	$.step2Div.visible 									= false;
	$.step3Div.height 									= (MODIFICATION_CASE) ? $.step3Div.dheight + 76 : $.step3Div.dheight;
	$.step3Div.visible 									= true;
	
	if(MODIFICATION_CASE){
		$.the_scroll_view.top 							= 0;
		$.the_scroll_view.height 						= $.the_scroll_view.height + 68;
		$.step3Div.top 										-= 68;
	}
	
};

$.gotoStep3TAB.addEventListener("click", Alloy.Globals.Selling_step3GO);
$.gotoStep2.addEventListener("click", Alloy.Globals.Selling_step3GO);
$.gotoStep2b.addEventListener("click", Alloy.Globals.Selling_step3GO);

/*********************************** MANUAL DEFINITIONS ****************************************/

Alloy.Globals.underlineItem($.gotoStep2);
						
var containerA_children 								= $.Container_A.children.slice(0);
available_tag_fields['tag1'] 							= containerA_children[0];
var containerB_children 								= $.Container_B.children.slice(0);
available_tag_fields['tag2'] 							= containerB_children[0];

/*********************************** MANUAL CLICKS ****************************************/

$.navBar.getView('backbutton').addEventListener("click", function(e) {
	
	Alloy.Globals.Logs.llog('>>>> BACK TO STEP CLICK '+this.backCase+' <<<<');
	
	Alloy.Globals.preventDoubleClick(this);

	///////////// 
	///////////// DOM MANIPULATIONS
	///////////// 
		
	if( this.backCase == 0){
		
		this.visible 										= false;

		$.tabBarTop.height 							= 0;
		$.tabBarTop.visible 							= false;
		
		$.removeClass($.step1Bar,'current-step');
		$.removeClass($.step2Bar,'current-step');
		$.removeClass($.step3Bar,'current-step');
		
		Alloy.Globals.underlineItemRemove($.step1Title);
		Alloy.Globals.underlineItemRemove($.step2Title);
		Alloy.Globals.underlineItemRemove($.step3Title);
		
		$.step1ValidPicto.visible 				= false;
		$.step2ValidPicto.visible 				= false;
		$.step3ValidPicto.visible 				= false;
		
		$.step0Div.height 							= $.step0Div.dheight;
		$.step0Div.visible 							= true;
		$.step1Div.height 							= 0;
		$.step1Div.visible 							= false;
		$.step2Div.height 							= 0;
		$.step2Div.visible 							= false;
		$.step3Div.height 							= 0;
		$.step3Div.visible 							= false;
		
		delete $.gotoStep1.jump_to_step3;
		
	}
	else{
		
		var func 												= new Function('Alloy.Globals.Selling_step'+this.backCase+'GO()');
		func();
		
	}
	
});

$.ScanBook.addEventListener("click", function(e) {
	
	Alloy.Globals.preventDoubleClick(this);

	////////////////
	//////////////// PREPARE THE BARCODE SCANNER
	////////////////	
	
	var local_on_error_function 					= function(e){
	
		Alloy.Globals.Logs.aalert('Erreur de scan','Swapbook n\'a pas été en mesure de décoder le code ISBN grâce au contenu soumis.','','OK',null,null,null,null);

		Alloy.Globals.app_image_scanner.removeEventListener('error',local_on_error_function);
		
		return;
	
	};
	Alloy.Globals.app_image_scanner.addEventListener('error',local_on_error_function);
	
	var local_on_success_function 			= function(e){
			
		//////////// GOOGLE ANALYTICS
		
		Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
			category: 										"User selling process",
			label: 												"Use scan ISBN code with camera feature",
			action: 											"use book code scanner",
			value: 												1
		});
		
		Alloy.Globals.app_image_scanner.cancel();
		
		$.ISBN.backgroundColor 					= Alloy.Globals.BLUE_COLOR_v3;
		$.ISBN.color 										= 'white';
		$.ISBN.setValue(e.result);
		
		Alloy.Globals.app_image_scanner.removeEventListener('success',local_on_success_function);
		
		return;
	
	};
	Alloy.Globals.app_image_scanner.addEventListener('success',local_on_success_function);

	////////////////
	//////////////// CHOOSE THE PHOTO SOURCE
	////////////////	
	
	/*
	if(Dialog_for_photo_scan != null)delete Dialog_for_photo_scan;
	
	var localOptions 									= Alloy.Globals.app_image__pre_dialog_options;
	localOptions.title 									= 'Capture du code ISBN du livre :';
	
	var Dialog_for_photo_scan 					= Ti.UI.createOptionDialog(localOptions);
	
	Dialog_for_photo_scan.addEventListener('click',function(ev){
		
		////////Dialog_for_photo_scan.hide();
		delete Dialog_for_photo_scan;
		
		var selectedDialogIndex 					= ev.index;
	
		/* ************* 1 = The USER has choosen the CAMERA *********** /
		
		if(selectedDialogIndex == 0){*/
			
			Alloy.Globals.app_image_scanner.capture({
		        overlay: 										Alloy.Globals.overlay_for_camera('barcode','Centres le code barre du livre :',false),
		        animate: 										true,
		        showCancel: 								true,
		        showRectangle: 						true,
		        keepOpen: 									false,
		        acceptedFormats: 					[
		            Alloy.Globals.app_image_scanner.FORMAT_EAN_8,
		            Alloy.Globals.app_image_scanner.FORMAT_EAN_13
		        ]
			});
			
		/*}
		
		/************** 2 = The USER has choosen the PHOTO GALLERY *********** /
		
		else if(selectedDialogIndex == 1){
			
			Ti.Media.openPhotoGallery({
				
				allowImageEditing: 					false,
				success: 									function(gallery_event) {
	
					Alloy.Globals.app_image_scanner.parse({
		                image: 								gallery_event.media
		            });
					
				 },
				cancel:										function() {
					
					_dialog_CancelFunction();
					
				},
				error: 											function(error) {
					
					Alloy.Globals.Logs.aalert('Erreur Swapbook','Impossible d\'accéder à ta bibliothèque photo. Code Erreur : '+error.code,'','OK',null,null,null,null);
	
				}
				
			});
			
		}
		
		/* ************* 3 = The USER CANCEL *********** /
		
		else if(selectedDialogIndex == 2){
			
			delete Dialog_for_photo_scan;
			var Dialog_for_photo_scan 			= null;
			
		}
		
	}); 

	Dialog_for_photo_scan.show();
	*/
	
});

$.step0Div.addEventListener("click", function(e) {
	
	Alloy.Globals.preventDoubleClick(this);
	
	if(e.source.id != 'ISBN')$.ISBN.blur();
	
});		

$.gotoStep0.addEventListener("click", function(e) {
	
	Alloy.Globals.Logs.llog('>>>> ISBN VALIDATE CLICK <<<<');
	
	Alloy.Globals.preventDoubleClick(this);
	
	var in1 													= $.ISBN.getValue();
	if(in1 == '')in1 										= '0000000000';
	var request_input									= {};
	request_input['async_params']			= {};
	request_input['async_execution']		= Alloy.Globals.Selling_step1GO;
	
	if( in1.length < 6 || !Alloy.Globals.tools.is_Valid_Number(in1) ){Alloy.Globals.Logs.aalert('Problème !','Merci de saisir un Numéro ISBN valide, sans tirets et espaces.','','Corriger',null,null,null,null);return;}
	
	Virtual_Sale_Object.ISBN 						= in1;
			
	/* ********* AJAX API QUERY ********* */
	Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		Alloy.Globals.endPoints.oneBookISBNCheck,
		{
    		the_user: 										Alloy.Globals.THE_USER.id_user,
    		isbn: 												in1
		},
		request_input,
		false,
		false
	);
	
});	

$.neuf.addEventListener("click", function(e) {
	
	Alloy.Globals.preventDoubleClick(this);
	
	this.backgroundColor 							= Alloy.Globals.BLUE_COLOR;
	$.tres_bon.backgroundColor 				= '#ee5c5f';
	$.fatigue.backgroundColor 					= '#ee5c5f';
	$.abime.backgroundColor 					= '#ee5c5f';
	
	$.gotoStep1.decision 							= 'neuf';
	
	$.bookState.value 									= this.title;
	$.bookState.cvalue 								= $.gotoStep1.decision;
	
});	

$.tres_bon.addEventListener("click", function(e) {
	
	Alloy.Globals.preventDoubleClick(this);
	
	this.backgroundColor 							= Alloy.Globals.BLUE_COLOR;
	$.neuf.backgroundColor 						= '#ee5c5f';
	$.fatigue.backgroundColor 					= '#ee5c5f';
	$.abime.backgroundColor 					= '#ee5c5f';
	
	$.gotoStep1.decision 							= 'tres_bon';
	
	$.bookState.value 									= this.title;
	$.bookState.cvalue 								= $.gotoStep1.decision;
	
});	

$.fatigue.addEventListener("click", function(e) {
	
	Alloy.Globals.preventDoubleClick(this);
	
	this.backgroundColor 							= Alloy.Globals.BLUE_COLOR;
	$.tres_bon.backgroundColor 				= '#ee5c5f';
	$.neuf.backgroundColor 						= '#ee5c5f';
	$.abime.backgroundColor 					= '#ee5c5f';
	
	$.gotoStep1.decision 							= 'fatigue';
	
	$.bookState.value 									= this.title;
	$.bookState.cvalue 								= $.gotoStep1.decision;
	
});	

$.abime.addEventListener("click", function(e) {
	
	Alloy.Globals.preventDoubleClick(this);
	
	this.backgroundColor 							= Alloy.Globals.BLUE_COLOR;
	$.tres_bon.backgroundColor 				= '#ee5c5f';
	$.fatigue.backgroundColor 					= '#ee5c5f';
	$.neuf.backgroundColor 						= '#ee5c5f';
	
	$.gotoStep1.decision 							= 'abime';
	
	$.bookState.value 									= this.title;
	$.bookState.cvalue 								= $.gotoStep1.decision;
	
});	

$.bookPrice.addEventListener("blur", function(e) {
	
	var current_value 									= this.getValue();
	var new_value 										= Alloy.Globals.tools.number_format(current_value.replace(",", "."),2,'.','');
	
	this.setValue(new_value);
	
});	

$.bookPricePort.addEventListener("blur", function(e) {
	
	var current_value 									= this.getValue();
	if(current_value == '')return;
	var new_value 										= Alloy.Globals.tools.number_format(current_value.replace(",", "."),2,'.','');
	this.setValue(new_value);
	
});	

$.addTags.addEventListener("click", function(e) {
	
	if(!$.addTags.speed)Alloy.Globals.preventDoubleClick(this);
	if($.addTags.speed)delete $.addTags.speed;

	$.step3Div.height 									= $.step3Div.height+56; // 40 +16
	$.step3DivTagsContainer.height 			= $.step3DivTagsContainer.height+56; // 40 +16
	
	var tagRow 												= Ti.UI.createView({});
	$.addClass(tagRow,'view-field-c-simple');
	$.addClass(tagRow,'view-field-tags');
	
		var tagUnderRow 									= Ti.UI.createView({layout:'horizontal'});
		
			var tagField1Container						= Ti.UI.createView({});
			$.addClass(tagField1Container,'view-field');
			$.addClass(tagField1Container,'view-field-tag');
			$.addClass(tagField1Container,'view-field-tag-first');
			
				var tagField1name						= 'tag'+baseTagsNumber;
				var tagField1									= Ti.UI.createTextField({maxLength:100,id:tagField1name});
				$.addClass(tagField1,'field');
				$.addClass(tagField1,'field-tag');
				
				available_tag_fields[tagField1name]= tagField1;
				
			tagField1Container.add(tagField1);
			baseTagsNumber++;
		
			var tagField2Container						= Ti.UI.createView({});
			$.addClass(tagField2Container,'view-field');
			$.addClass(tagField2Container,'view-field-tag');
			
				var tagField2name						= 'tag'+baseTagsNumber;
				var tagField2									= Ti.UI.createTextField({maxLength:100,id:tagField2name});
				$.addClass(tagField2,'field');
				$.addClass(tagField2,'field-tag');
				
				available_tag_fields[tagField2name]= tagField2;
				
			tagField2Container.add(tagField2);
			baseTagsNumber++;
		
			var removeRow 									= Ti.UI.createImageView({image:"/images/moinsBlue.png"});
			$.addClass(removeRow,'plus');
			
			removeRow.addEventListener("click", function(e) {
				
				Alloy.Globals.preventDoubleClick(this);
			
				delete available_tag_fields[tagField1name];
				delete available_tag_fields[tagField2name];
				
				$.step3DivTagsContainer.remove(tagRow);
				
				$.step3Div.height 						= $.step3Div.height-56; // 40 +16
				$.step3DivTagsContainer.height= $.step3DivTagsContainer.height-56; // 40 +16
			
			});

		tagUnderRow.add(tagField1Container);
		tagUnderRow.add(tagField2Container);
		tagUnderRow.add(removeRow);
		
	tagRow.add(tagUnderRow);
	
	$.step3DivTagsContainer.add(tagRow);
	
});	

$.changePhotoLbl.addEventListener("click", function(e) {
	
	Alloy.Globals.preventDoubleClick(this);

	$.changePhoto.fireEvent('click');

});

$.changePhoto.addEventListener("click", function(e) {

	Alloy.Globals.preventDoubleClick(this);
	
	////////////////
	//////////////// CHOOSE THE PHOTO SOURCE
	////////////////
							
	if(Dialog_for_uploads != null)delete Dialog_for_uploads;
	
	var localOptions 										= Alloy.Globals.app_image__pre_dialog_options;
	localOptions.title 										= MODIFICATION_CASE ? 'Première de couverture : changement' :'Première de couverture : ajout';
	
	var CDN_file_directory 								= MODIFICATION_CASE ? 'user-sales-pictures/by_id_user_'+Alloy.Globals.THE_USER.id_user+'/sale_id_'+passedData.tab3 : 'user-sales-pictures/by_id_user_'+Alloy.Globals.THE_USER.id_user+'/new_sales';
	var Dialog_for_uploads								= Ti.UI.createOptionDialog(localOptions);
	
	Dialog_for_uploads.addEventListener('click',function(ev){
		
		////////Dialog_for_uploads.hide();
		delete Dialog_for_uploads;
	
		Alloy.Globals.handler_for_camera_or_gallery_dialog(
			ev,
			'349x500', //////// 640
			'jpg',
			'scale_and_crop', ///////// true
			CDN_file_directory,
			Alloy.Globals.endPoints.userUpload,
			function(JSON_returned,local_params){
			
				if(typeof JSON_returned['error'] !== 'undefined'){
					Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);
				}
				else{
					///////////Alloy.Globals.Logs.llog('---------------- IMAGE UPLOADED (for sale) ----------------');
					///////////Alloy.Globals.Logs.llog(JSON_returned);
					Alloy.Globals.Logs.llog(JSON_returned['output-array']['picture_on_amazon_cdn']);
					if(typeof(JSON_returned['output-array']) == 'undefined')return;
					$.bookImg.image 						= JSON_returned['output-array']['picture_on_amazon_cdn'];
					$.bookImg.cvalue 						= JSON_returned['output-array']['picture_on_amazon_cdn'];

					Virtual_Sale_Object.sale_photo_json= JSON_returned['output-array']['picture_on_amazon_cdn'];
					Virtual_Sale_Object.need_a_photo= false;
				}
				
			},
			{
	    		id_user: 											Alloy.Globals.THE_USER.id_user
			},
			function(){
				
				delete Dialog_for_uploads;
				var Dialog_for_uploads					= null;
			
			}
		);
		
	}); 

	Dialog_for_uploads.show();
	
});

$.bookStateOptions.setCancel(4);
$.bookStateOptions.addEventListener('click',function(e){
	
	if(e.index < 4){
		
		$.bookState.cvalue 								= book_state_values_reverse[e.index];
		$.bookState.setValue(e.source.options[e.index]);
					
	}
	
});

$.Pause.addEventListener("click", function(e) {
	
	Alloy.Globals.Logs.llog('>>>> PAUSE/REACTIVATE CLICK <<<<');
	
	Alloy.Globals.preventDoubleClick(this);
	
	if($.Pause.prevent)return;
	
	///////// POP-IN : PAUSE THE SALE

	if($.Pause.todo == 'pause'){
	
		Alloy.Globals.Logs.aalert(
			'Suspendre la vente ?',
			'Le livre ne sera plus listé sur Swapbook.',
			'Es-tu sûr(e) de vouloir continuer ?',
			'NON',
			null,
			'OUI',
			function(object_received){
				
				Alloy.Globals.Requests.RequestsMaker(
					'POST',
					true,
					Alloy.Globals.endPoints.userSaleUpdate,
					{
			    		id_sale: 															object_received.sale_id,
			    		id_book: 															object_received.book_id,
			    		id_user: 															object_received.the_user,
			    		field_name: 													'sale_status',
			    		field_value: 													'paused'
					},	
					{
						async_params: 				{},
						async_execution: 			function(JSON_returned,async_params_back){			
							if(typeof JSON_returned['error'] !== 'undefined'){
								
								Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);
								
							}
							else{
								
								///////////////Alloy.Globals.Logs.llog('---------------- SALE PAUSED ----------------');
								///////////////Alloy.Globals.Logs.llog(JSON_returned);
								
								//////////// GOOGLE ANALYTICS
								
								Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
									category: 													"User selling process",
									label: 															"Pause an article sale",
									action: 														"pause sale",
									value: 															1
								});
								
								//////////// FOLLOWING
										
								Alloy.Globals.Logs.aalert('La vente a bien été suspendue.','','','',null,null,null,null,'BLUE'/* BLUE POPUP */);
					
								$.Pause.title 											= 'RÉACTIVER';
								$.Pause.todo 											= 'reactivate';
								$.addClass($.Pause,'Bbutton');
							    
							}
						}
					},
					false,
					true 
				);
				
			},
			{
	    		sale_id: 																	passedData.tab3,
	    		book_id: 																	this.todo_book_id,
	    		the_user: 																Alloy.Globals.THE_USER.id_user,
			},
			false
		);

	}
	
	///////// POP-IN : ACTIVATE THE SALE
	
	else{
	
		Alloy.Globals.Logs.aalert(
			'Réactiver la vente ?',
			'Le livre sera de nouveau disponible.',
			'Es-tu sûr(e) de vouloir le faire ?',
			'NON',
			null,
			'OUI',
			function(object_received){
				
				Alloy.Globals.Requests.RequestsMaker(
					'POST',
					true,
					Alloy.Globals.endPoints.userSaleUpdate,
					{
			    		id_sale: 															object_received.sale_id,
			    		id_book: 															object_received.book_id,
			    		id_user: 															object_received.the_user,
			    		field_name: 													'sale_status',
			    		field_value: 													'available'
					},
					{
						async_params: 				{},
						async_execution: 			function(JSON_returned,async_params_back){			
							if(typeof JSON_returned['error'] !== 'undefined'){
								
								Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);
								
							}
							else{
								
								///////////////Alloy.Globals.Logs.llog('---------------- SALE REACTIVATED ----------------');
								///////////////Alloy.Globals.Logs.llog(JSON_returned);
								
								//////////// GOOGLE ANALYTICS
								
								Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
									category: 													"User selling process",
									label: 															"Re-publish an article sale",
									action: 														"reapublish sale",
									value: 															1
								});
								
								//////////// FOLLOWING
										
								Alloy.Globals.Logs.aalert('La vente a bien été réactivée.','','','',null,null,null,null,'BLUE'/* BLUE POPUP */);
					
								$.Pause.prevent 									= true;
								$.Pause.visible 										= false;
								//////$.Pause.title 											= 'SUSPENDRE';
								//////$.Pause.todo 											= 'pause';
								//////$.removeClass($.Pause,'Bbutton');
							    
							}
						}
					},
					false,
					true 
				);
				
			},
			{
	    		sale_id: 																	passedData.tab3,
	    		book_id: 																	this.todo_book_id,
	    		the_user: 																Alloy.Globals.THE_USER.id_user,
			},
			false
		);
		
	}
	
});	

$.Sell.addEventListener("click", function(e) {
	
	Alloy.Globals.Logs.llog('>>>> SALE CLICK <<<<');
	
	Alloy.Globals.preventDoubleClick(this);

	///////////// 
	///////////// FORM VALIDATION
	///////////// 
	
	Virtual_Sale_Object.book_title 					= $.bookTitle.getValue();
	Virtual_Sale_Object.author_name 			= $.bookAuthor.getValue();
	Virtual_Sale_Object.editor_name 			= $.bookEditor.getValue();
	Virtual_Sale_Object.sale_seller_price		= Alloy.Globals.tools.number_format($.bookPrice.getValue().replace(",", "."),2,'.','');
	Virtual_Sale_Object.sale_state 				= $.bookState.cvalue;
	Virtual_Sale_Object.sale_advice 				= $.bookAdvice.getValue();
	
	if( Virtual_Sale_Object.need_a_photo ){Alloy.Globals.Logs.aalert('Problème !','Merci d\'ajouter une photo illustrant ton livre.','','Corriger',null,null,null,null);return;}
	if( Virtual_Sale_Object.author_name.length < 5 ){Alloy.Globals.Logs.aalert('Problème !','Merci d\'indiquer le titre du livre.','(5 caractères minimum)','Corriger',null,null,null,null);return;}
	if( Virtual_Sale_Object.author_name.length < 5 ){Alloy.Globals.Logs.aalert('Problème !','Merci d\'indiquer l\'auteur du livre.','(5 caractères minimum)','Corriger',null,null,null,null);return;}
	if( Virtual_Sale_Object.editor_name.length < 5 ){Alloy.Globals.Logs.aalert('Problème !','Merci d\'indiquer la maison d\'édition du livre.','(5 caractères minimum)','Corriger',null,null,null,null);return;}
	if( isNaN($.bookPrice.getValue()) ){Alloy.Globals.Logs.aalert('Problème !','Merci d\'indiquer un Prix désiré valide.','(au format : 2.50€)','Corriger',null,null,null,null);return;}
	if( $.bookPricePort.getValue() != '' && isNaN($.bookPricePort.getValue()) ){Alloy.Globals.Logs.aalert('Problème !','Merci d\'indiquer un montant de Frais de port valide.','(au format : 2.50€)','Corriger',null,null,null,null);return;}
	if( parseFloat($.bookPrice.getValue()) < 2.5 ){Alloy.Globals.Logs.aalert('Problème !','Ton livre devra au moins se vendre à plus de 2.50€.','(au format : 2.50€)','Corriger',null,null,null,null);return;}
	if( parseFloat($.bookPrice.getValue()) > 99999 ){Alloy.Globals.Logs.aalert('Problème !','Ton livre ne pourra pas se vendre à ce prix là sur Swapbook !','','Corriger',null,null,null,null);return;}
	if( $.bookPricePort.getValue() != '' && parseFloat($.bookPricePort.getValue()) < 1 ){Alloy.Globals.Logs.aalert('Problème !','Les Frais de port doivent côuter 1€ minimum si ils sont indiqués ici.','(au format : 1.00€)','Corriger',null,null,null,null);return;}
	if( Virtual_Sale_Object.sale_advice.length < 5 ){Alloy.Globals.Logs.aalert('Problème !','Merci de nous indiquer un Avis personnel sur le livre.','(5 caractères minimum)','Corriger',null,null,null,null);return;}
	if( $.bookState.cvalue == '' ){Alloy.Globals.Logs.aalert('Problème !','Merci de préciser l\'état actuel du livre.','','Corriger',null,null,null,null);return;}
	
	Virtual_Sale_Object.book_edition 			= $.bookEdition.getValue();
	Virtual_Sale_Object.sale_price_share_shipping= Alloy.Globals.tools.number_format($.bookPricePort.getValue().replace(",", "."),2,'.','');
	Virtual_Sale_Object.sale_description 		= $.bookDesc.getValue();
	Virtual_Sale_Object.sale_photo_json 		= $.bookImg.image;
	
	var tags_length_check 							= [];
	for (var property in available_tag_fields) {
		if (available_tag_fields.hasOwnProperty(property)) {
			var tag_textfield 								= available_tag_fields[property];
			var tag_textfield_value 					= tag_textfield.getValue().replace(",", "");
			tag_textfield_value 							= tag_textfield_value.replace(".", "");
			tag_textfield_value 							= tag_textfield_value.replace(",", " ");
			tags_length_check.push(tag_textfield_value);
			if( tag_textfield_value != '' && tag_textfield_value.length > 2 )Virtual_Sale_Object.sale_tags.push(tag_textfield_value);
		}
	}
	for(t=0; t<tags_length_check.length;t++){
		if( tags_length_check[t] != '' && tags_length_check[t].length < 3 ){
			Alloy.Globals.Logs.aalert('Problème !','Chaque Tag doit faire 3 caractères de long minimum.','','Corriger',null,null,null,null);
			return;
		}
	}
	
	///////////// 
	///////////// FORM SUBMISSION
	///////////// 
	
	var final_endpoint 										= MODIFICATION_CASE ? Alloy.Globals.endPoints.userSaleUpdate : Alloy.Globals.endPoints.userSaleCreate;
	var final_confirmation								= MODIFICATION_CASE ? 'Ta vente a bien été modifiée !' : 'Ton annonce est désormais publiée !';
	var final_confirmation_line2						= MODIFICATION_CASE ? '' : 'Maintenant regardes côté achat ou bien attends qu\'un acheteur te contactes pour récupérer tes sous :)';
	
	/* ******************************************** */
	/* ********* AJAX API QUERY (FAST WAY) ******** */
	/* ******************************************* */
	Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		final_endpoint,
		{
	        id_user: 												Alloy.Globals.THE_USER.id_user,
	        the_settings_and_values:					JSON.stringify(Virtual_Sale_Object)
		},
		{
			async_params: 				{},
			async_execution: 			function(JSON_returned,async_params_back){		
					
				if(typeof JSON_returned['error'] !== 'undefined'){
					
					Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);
					
				}
				else{
					
					///////////////Alloy.Globals.Logs.llog('---------------- SALE UPDATED ----------------');
					///////////////Alloy.Globals.Logs.llog(JSON_returned);
					///////////////$.the_scroll_view.visible 													= false;
					///////////////$.navBar.getView('backbutton').visible 							= false;
					
					//////////// GOOGLE ANALYTICS
					
					Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
						category: 													"User selling process",
						label: 															!MODIFICATION_CASE ? "Sale something new" : "Update an article sale",
						action: 														!MODIFICATION_CASE ? "new sale" : "Save sale",
						value: 															1
					});
					
					//////////// FOLLOWING
					
					$.step3ValidPicto.visible 								= true;
					$.Sell.touchEnabled 											= false;
					$.Sell.visible 														= false;
					
					/////////////// BLUE POPUP
					Alloy.Globals.Logs.aalert(final_confirmation,final_confirmation_line2,'','',null,null,null,false,'BLUE');
					
					setTimeout(function(){
						
						Alloy.Globals.offLinePopin.alreadyUsed 	= false;
						
						Alloy.Globals.app.goToFAST("page_3_b_1_transactions", {tab: 1});
						
						setTimeout(function(){
							
							Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['on_onesale_page']);
							
						},1500);
						
					},2500);
				    
				}
			}
		},
		false,
		true 
	);
	
});	

/*********************************** AUTO LOAD (MODE ADJUSTMENTS) ****************************************/

if(MODIFICATION_CASE){

	/* ******************************************** */
	/* ********* AJAX API QUERY (FAST WAY) ******** */
	/* ******************************************** */
	Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		Alloy.Globals.endPoints.oneBookSaleGet,
		{
			sale_id: 											passedData.tab3,
			the_seller: 										Alloy.Globals.THE_USER.id_user,
			the_user: 										Alloy.Globals.THE_USER.id_user,
		},
		{
			NO_LIMIT: 						true,
			async_params: 				{},
			async_execution: 			function(JSON_returned,async_params_back){	
						
				if(typeof JSON_returned['error'] !== 'undefined'){
					
					Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);
					
				}
				else{
					
					///////////////Alloy.Globals.Logs.llog('---------------- SALE RETRIEVED ----------------');
					///////////////Alloy.Globals.Logs.llog(JSON_returned);
					
					if(typeof(JSON_returned['output-array']) == 'undefined')return;
					
					/* VENTE STATUT = "available" OU = "paused" SEULEMENT SINON FERMETURE */
					
					if(
						!JSON_returned['output-array']['sale_status'] ||
						(
							JSON_returned['output-array']['sale_status'] != 'available' &&
							JSON_returned['output-array']['sale_status'] != 'paused' 
						)
					){
						
						Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['on_onesale_page']);
						return;
						
					}
					
					/* REMPLISSAGE DES CHAMPS */
					
					var couverture  											= JSON.parse(JSON_returned['output-array']['sale_photo_json']);
					var edition 													= JSON_returned['output-array']['book_edition'].trim();
					edition 														= edition == '' ? edition : edition.substring(2,edition.length);
					var tags  													= JSON_returned['output-array']['sale_tags'].split(',');
							
					Virtual_Sale_Object.ISBN 							= JSON_returned['output-array']['isbn'];
					Virtual_Sale_Object.book_id 					= JSON_returned['output-array']['book_id'];
					Virtual_Sale_Object.book_title 					= JSON_returned['output-array']['book_title'];
					Virtual_Sale_Object.INITIAL_book_title 	= JSON_returned['output-array']['book_title'];
					Virtual_Sale_Object.book_edition 			= edition;
					Virtual_Sale_Object.INITIAL_book_edition= edition;
					Virtual_Sale_Object.author_name 			= JSON_returned['output-array']['book_author_name'];
					Virtual_Sale_Object.author_id					= JSON_returned['output-array']['author_id'];
					Virtual_Sale_Object.INITIAL_author_name= JSON_returned['output-array']['book_author_name'];
					Virtual_Sale_Object.editor_name 			= JSON_returned['output-array']['book_editor_name'];
					Virtual_Sale_Object.editor_id					= JSON_returned['output-array']['editor_id'];
					Virtual_Sale_Object.INITIAL_editor_name= JSON_returned['output-array']['book_editor_name'];
					Virtual_Sale_Object.sale_price_on 	= JSON_returned['output-array']['amazonprice'];
					Virtual_Sale_Object.sale_photo_json 		= couverture.current;
					Virtual_Sale_Object.need_a_photo 			= false;
			
					$.bookTitle.setValue(JSON_returned['output-array']['book_title']);		
					$.bookAuthor.setValue(JSON_returned['output-array']['book_author_name']);		
					$.bookEditor.setValue(JSON_returned['output-array']['book_editor_name']);		
					$.bookEdition.setValue(edition);		
					$.bookPrice.setValue(JSON_returned['output-array']['sale_seller_price']);
					$.bookPricePort.setValue(JSON_returned['output-array']['sale_price_port']);
					$.bookDesc.setValue(JSON_returned['output-array']['sale_desc']);		
					$.bookAdvice.setValue(JSON_returned['output-array']['sale_best_advice']);
					
					$.bookImg.image 										= couverture.current;
					$.bookImg.cvalue 										= couverture.current;
					
					$.bookState.cvalue 									= JSON_returned['output-array']['sale_state'];
					$.bookState.setValue(JSON_returned['output-array']['sale_state_l']);
					$.bookState.addEventListener("click",function(e){$.bookStateOptions.show();});
					
					$.bookStateOptions.setSelectedIndex(book_state_values[JSON_returned['output-array']['sale_state']]);
					
					for (var t=1; t <= tags.length; t++){
						var tag_next 											= typeof tags[t] != 'undefined' ? tags[t] : null;
						if ( t >= 2 && t % 2 == 0 && tag_next != null){
							$.addTags.speed 								= true;
							$.addTags.fireEvent('click');
							continue;
						}
					}
					setTimeout(function(){
						for (var t=1; t <= tags.length; t++){
							var tag_current 									= tags[t-1];
							var tag_current_selector 					= 'tag'+t;
							if(available_tag_fields[tag_current_selector])available_tag_fields[tag_current_selector].setValue(tag_current);
						}
					},1000);
					
					/* AFFICHAGE DU BOUTON PAUSE/REACTIVER */
					
					$.Pause.todo_book_id								= JSON_returned['output-array']['book_id'];
					$.couldPause.visible  								= true;
					$.couldPause.height 								= 40;
					
					if( JSON_returned['output-array']['sale_status'] == 'paused' ){
						
						$.Pause.title 											= 'RÉACTIVER';
						$.Pause.todo 											= 'reactivate';
						$.addClass($.Pause,'Bbutton');
						
					}
					else{
						
						$.Pause.title 											= 'SUSPENDRE';
						$.Pause.todo 											= 'pause';
						$.removeClass($.Pause,'Bbutton');
						
					}
					
					/* AFFICHAGE DU CONTEXTE */
					
					$.navBar.getView('backbutton').removeInitialClick= false;
					$.step3DivTitle.text									= 'MODIFICATION D\'UNE VENTE';
					$.Sell.title													= 'ENREGISTRER';
					
					/* AFFICHAGE DU TAB */

					Alloy.Globals.Selling_step3GO();

				}
				
			}
			
		},
		false,
		true 
	);
	
}
else{
	
	$.step0Div.visible 													= true;
	$.navBar.getView('backbutton').removeInitialClick= true;
	
}