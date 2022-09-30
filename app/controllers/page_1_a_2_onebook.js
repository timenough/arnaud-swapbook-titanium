/*********************************** OPEN ****************************************/

var UNIQUE_PAGE_NAME_TO_CLOSE 		= 'on_onebook_page_'+Math.round(new Date().getTime()/1000);
var the_search_tableView 							= Ti.UI.createTableView(Alloy.Globals.loadReloadSearchBooks_engine_tableView);

Alloy.Globals.navigationWindow 				= $.window;
Alloy.Globals.toCloseWindows[UNIQUE_PAGE_NAME_TO_CLOSE]= $.window;

/*********************************** FOCUS ****************************************/

$.window.addEventListener("focus",function(e) {
	
	//////Alloy.Globals.toCloseWindows[UNIQUE_PAGE_NAME_TO_CLOSE]= $.window;

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
var passedData 											= args.passedData;
var tableView_by_page 								= 100;

Alloy.Globals.Logs.llog(passedData);
		
/*********************************** NAVIGATION BAR MANIPULATION *****************************************/

$.navBar.getView('navBarText').text			= 'SWAPBOOK';
$.navBar.getView('menubutton').visible 	= false;
$.navBar.getView('backbutton').visible 		= true;
$.navBar.getView('backbutton').bcase 		= UNIQUE_PAGE_NAME_TO_CLOSE;

$.navBar.getView('buybutton').bcase 		= null;
$.navBar.getView('sellbutton').bcase 		= 'goto_sell_page';

$.tabBar.getView('button2').bcase 			= 'on_onebook_page';

/*********************************** HEIGHT ADJUSTMENTS ****************************************/

var tableViewHeight										= ( Ti.Platform.displayCaps.platformHeight - 82 ) - 58;
$.the_table_view.height 								= tableViewHeight;

if(OS_ANDROID){
	$.the_table_view.height 							= Alloy.Globals.tableViewHeight - 138;
}

/*********************************** MAIN MANIPULATION  *****************************************/

function populateBookHeader(JSON_returned,local_params){
		
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
		
		Alloy.Globals.Logs.llog('---------------- BOOK INFOS RETRIEVED ----------------');
		Alloy.Globals.Logs.llog(JSON_returned['output-array']);
		
		/***** ALERT ON THE BOOK + 0 SELLER *****/
		
		if(JSON_returned['output-array']['id_alert'] != null){
			
			$.addAlert.text 									= $.addAlert.textswitchA;
			$.addAlert.status 								= 'on';
			$.addClass($.addAlert,'button-OFF');
			
		}
		
		/*************************/
		/* DO THE MANIPULATIONS */
		/*************************/
		
		if(JSON_returned['output-array']['book_price_min'] == null)JSON_returned['output-array']['book_price_min']= 0;
		if(JSON_returned['output-array']['book_price_max'] == null)JSON_returned['output-array']['book_price_max']= 0;
		var book_photo 										= JSON.parse(JSON_returned['output-array']['sale_photo_json']);
		var book_prices 									= (JSON_returned['output-array']['book_price_min'] == JSON_returned['output-array']['book_price_max']) ? parseInt(JSON_returned['output-array']['book_price_min']) +'€' : parseInt(JSON_returned['output-array']['book_price_min']) + '-' + parseInt(JSON_returned['output-array']['book_price_max']) + '€';
		var bookTitle											= JSON_returned['output-array']['book_title'];
		var bookSellersText 								= (JSON_returned['output-array']['total_sellers'] > 1) ? JSON_returned['output-array']['total_sellers'] +' swappeurs vendent ce livre' :  JSON_returned['output-array']['total_sellers'] + ' swappeur vend ce livre';
		bookSellersText 									= (JSON_returned['output-array']['total_sellers'] == 0) ? 'Personne ne vend ce livre' : bookSellersText;
	
		$.bookTitle.text 									= bookTitle;
		if(bookTitle.length <= 28)$.addClass($.bookTitle,'book_title_bigger');
		
		$.bookPrices.text 									= book_prices;
		$.bookSellers.text 								= bookSellersText;
		$.bookPhoto.image 								= book_photo.current;
		$.bookAuthor.text 									= JSON_returned['output-array']['author_name'];
		$.bookEdition.text 								= JSON_returned['output-array']['editor_name']+JSON_returned['output-array']['book_edition'];
		$.bookDescription.text 						= 'Détails : '+JSON_returned['output-array']['sale_description'];
		$.amazonPrice.text 								= parseInt(JSON_returned['output-array']['price_amazon']) < 1 ? 'plus cher sur' : '  '+Alloy.Globals.tools.number_format(parseFloat(parseFloat(JSON_returned['output-array']['price_amazon']).toFixed(2)),2,'.',' ')+'€ sur';
		//$.fnacPrice.text 									= parseFloat(parseFloat(JSON_returned['output-array']['price_fnac']).toFixed(2))+'€ sur';
		
		if(JSON_returned['output-array']['sale_bde_advice'] != null){
			$.bookAdvicevalue.text 					=  JSON_returned['output-array']['sale_bde_advice'];
			$.bookAdvice.text 							=  $.bookAdvice.textA;
		}
		else{
			$.bookAdvicevalue.text 					=  JSON_returned['output-array']['sale_best_advice'];
			$.bookAdvice.text 							=  $.bookAdvice.textB;
			$.adviceR.width 								= 82;
		}
		
		var bookTAGS 										= JSON_returned['output-array']['sale_tags'].split(',');
		var children 											= $.bookTags.children.slice(0);
		for (var i = 0; i < children.length; ++i){$.bookTags.remove(children[i]);}
		
		if(bookTAGS.length>0)for(i = 0; i < bookTAGS.length; i++){
			if(bookTAGS[i] == '')continue;
			var each_tag 										= Ti.UI.createLabel({
				text: bookTAGS[i]+'          ',
			});
			each_tag.addEventListener("click", function(e) {
	
				Alloy.Globals.preventDoubleClick(this);
							
				Alloy.Globals.loadReloadSearchBooks_engine(
					$.navBar.getView('searchbutton'),
					$.modal_search_close,
					$.modal_search,
					$.the_search_field,
					the_search_tableView,
					"list_cell_book_search",
					this.text.trim(),
					false
				);
				
			}); 
			$.addClass(each_tag,'labl book_tag');
			$.bookTags.add(each_tag);
		}
		
		if(JSON_returned['output-array']['sale_description'].length < 200)$.bookDescriptionMore.visible= false;
		
		/*
				JSON_returned['output-array']['book_title'] = "Principes de Finance moderne",
				JSON_returned['output-array']['author_name'] = "Moli\u00e8re",
				JSON_returned['output-array']['book_edition'] = "6\u00e8me \u00e9dition - 2012",
				JSON_returned['output-array']['sale_photo_json'] = "{\"current\":\"https:\/\/images-na.ssl-images-amazon.com\/images\/I\/51zq0L-9VpL.jpg\"}",
				JSON_returned['output-array']['sale_description'] = "La description de arnaud",
				JSON_returned['output-array']['sale_tags'] = "Finance,Livres,Resturant,Politique",
				JSON_returned['output-array']['book_price_min'] = "11",
				JSON_returned['output-array']['book_price_max'] = "131",
				JSON_returned['output-array']['total_sellers'] = 12,
				JSON_returned['output-array']['sale_best_advice'] = "Livre tr\u00e8s utile",
				JSON_returned['output-array']['sale_bde_advice'] = "Un super bouqquin, vraiment \u00e0 lire",
				JSON_returned['output-array']['price_amazon'] = 18,
				JSON_returned['output-array']['price_fnac'] = 15
		*/
		
	}

};

/*********************************** MAIN DATA LOAD  *****************************************/

var request_input										= [];

Alloy.Globals.loadReloadBook 					= function(){

	/* HIDE CONTENT WAITING ALL LOADS */
	$.viewOneBook.visible							= false;
	
	request_input											= [];
	request_input['NO_LIMIT']					= true;
	request_input['async_execution']		= populateBookHeader;
	request_input['async_params']			= [];
	
	/* ********* AJAX API QUERY ********* */
	Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		Alloy.Globals.endPoints.oneBookInfosGet,
		{
			id_book:											passedData.id,
			the_user: 										Alloy.Globals.THE_USER.id_user,
		},
		request_input,
		false,
		false
	);
	
};

/*********************************** TABLE VIEW RELOAD ****************************************/

Alloy.Globals.loadReloadSellers 					= function(){
	    		
	tableView_datas 										= [];
	page2Scrolls 												= 1;
	page2ScrollsDONE 									= false;
	page2Collection.fetch({
	    urlparams: {
	        show_me_the_page: page2Scrolls,
	        by_page: tableView_by_page,
			id_book: passedData.id,
	        the_user: Alloy.Globals.THE_USER.id_user
	    },
		localOnly: false,
	    parentNode: function (loaded_data, options) {
		    
		    if(!loaded_data)return;
		    if(typeof loaded_data == 'undefined')return;
		    if(loaded_data == '' || loaded_data == null)return;
	
	    	//////Alloy.Globals.Logs.llog('---------------- INIT + JSON DISTANT ----------------');
		    ///////Alloy.Globals.Logs.llog(loaded_data['output-array']);
		    
	    	populateSellers(loaded_data['output-array']);
		    
		}
	});
	
	$.the_table_view.touchEnabled 				= false;
	
	setTimeout(function() {
		$.the_table_view.scrollToTop(0);
    	$.the_table_view.touchEnabled 			= true;
    }, 500);

};

/*********************************** TABLE VIEW POPULATE ****************************************/

function populateSellers(sellers) {
	
	tableView_data 											= [];
	var tableView_rows 									= [];
	
	Alloy.Globals.Logs.llog(JSON.stringify(sellers));
        	
	for (var i=0; i<sellers.length; i++) {
    	
		var item_seller										= sellers[i];
    	tableView_datas.push(item_seller);
    	
	}
    
    /************ SI AUCUN VENDEUR ***********/
	   
	if( tableView_datas.length < 1 ){
    	
    	$.the_main.height 								= 470;
    	$.the_main.baseheight 						= 470;
    	
		$.separator1_next1.visible 					= false;
		$.separator1_next2.visible 					= false;
		///////$.separator1_next3.visible 		= false;
		$.separator1_next1.height 					= 0;
		$.separator1_next2.height 					= 0;
		///////$.separator1_next3.height 		= 0;
   
		$.addClass($.separator2_title, 'row_4');
		$.removeClass($.separator2_title, 'row_6');
		
		$.sellers.text 											= 'AUCUN VENDEUR POUR LE MOMENT';
	   
		$.separator2_next1.visible 					= true;
		$.separator2_next2.visible 					= true;
		////////$.separator2_next3.visible 					= true;
    	
	}
	   
   /*************** SI VENDEURS **************/
    
	if( tableView_datas.length > 0 )for (var i=0; i<tableView_datas.length; i++) {
		
		var seller 												= tableView_datas[i];
		
		var universite;
		var universite_from;
		if(seller.user_diplome == null)seller.user_diplome= '';
		if(seller.user_universite == null)universite= '';
		else universite										= ': '+seller.user_universite;
		if(seller.user_universite_to == null)seller.user_universite_to= '';
		if(seller.user_universite_from == null)universite_from= '';
		else universite_from								= seller.user_universite_from+'-';

		var seller_photo 									= JSON.parse(seller.seller_photo_json);
		var seller_price 										= Alloy.Globals.tools.number_format(parseFloat(parseFloat(seller.sale_price_total).toFixed(2)),2,'.',' ') + '€';
		var sellerParcours1 								= universite_from+seller.user_universite_to+' '+universite;
		var sellerParcours2 								= seller.user_diplome;
		
		/*
		 	seller.sale_id = 78,
		 	seller.sale_price_total = "12.00",
		 	seller.sale_state = "neuf",
		 	seller.sale_user_id = 38,
		 	seller.sale_user = "Castillo",
		 	seller.seller_photo_json = "{\"current\":\"https:\/\/images-na.ssl-images-amazon.com\/images\/I\/51zq0L-9VpL.jpg\"}",
		 	seller.user_rankings = "2.5",
		 	seller.user_universite = "Dauphine",
		 	seller.user_universite_from = 2011,
		 	seller.user_universite_to = 2018,
		 	seller.user_diplome = "Licence en droit"
		 */
		
		var cell 													= Alloy.createController("parts/list_cell_seller");
		cell.updateViews({
			"#sellerName": {
				text: seller.sale_user
			},
			"#sellerUniv": {
				text: sellerParcours1
			},
			"#sellerDiplome": {
				text: sellerParcours2
			},
			"#bookPrice": {
				text: seller_price
			},
			"#bookPrices": {
				text: seller_price
			},
			"#bookState": {
				text: seller.sale_state_s
			},
			"#sellerPhoto": {
				image: seller_photo.current		/////////// LOAD IMAGE >>>>  256 x 256 pixels
			}
		});
		
			////////////////// RATINGS
			
			cell.getView('rank1').image 			= seller.user_rankings == '0.5' ? '/images/starHalf.png' : ( parseFloat(seller.user_rankings) < 1 ? '/images/starEmpty.png' : '/images/starFull.png' );
			cell.getView('rank2').image 			= seller.user_rankings == '1.5' ? '/images/starHalf.png' : ( parseFloat(seller.user_rankings) < 2 ? '/images/starEmpty.png' : '/images/starFull.png' );
			cell.getView('rank3').image 			= seller.user_rankings == '2.5' ? '/images/starHalf.png' : ( parseFloat(seller.user_rankings) < 3 ? '/images/starEmpty.png' : '/images/starFull.png' );
			cell.getView('rank4').image 			= seller.user_rankings == '3.5' ? '/images/starHalf.png' : ( parseFloat(seller.user_rankings) < 4 ? '/images/starEmpty.png' : '/images/starFull.png' );
			cell.getView('rank5').image 			= seller.user_rankings == '4.5' ? '/images/starHalf.png' : ( parseFloat(seller.user_rankings) < 5 ? '/images/starEmpty.png' : '/images/starFull.png' );
		
		tableView_rows.push(cell.getView());
		tableView_data.push(cell);
		
	}
	
	$.the_table_view.setData(						tableView_rows);
		
	/********************/
	/* DISPLAY CONTENT */
	/********************/
	Alloy.Globals.Loading.hide();
	$.viewOneBook.visible								= true;
	
}

/*********************************** TABLE VIEW CLICK ****************************************/

$.the_table_view.addEventListener("click", function(e) {
	
	$.the_table_view.touchEnabled 				= false;
	
	var sale 														= tableView_datas[e.index];
	
	//////////// GOOGLE ANALYTICS
	
	Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
		category: 													"User buying process",
		label: 															"Select the prefered seller",
		action: 														"seller selection",
		value: 															1
	});
	
	////////// GO TO SELLER SALE
	
	Alloy.Globals.app.goTo("page_1_a_3_onesale", {
		sale_id: sale.sale_id,
		the_seller: sale.sale_user_id,
	});
	
	setTimeout(function() {
    	$.the_table_view.touchEnabled 			= true;
    }, 1000);
 	
});

/*********************************** TABLE VIEW INIT ****************************************/

var tableView_data 										= [];
var tableView_datas 									= [];
var page2Scrolls 											= 1;
var page2ScrollsDONE 								= false;
var page2Collection 										= $.sellersRefreshable;

Alloy.Globals.loadReloadSellers();
Alloy.Globals.loadReloadBook();

/***************************** SCROLL TO REFRESH ******************************/

function localRefresher(e) {

	////////// MAIN DATA LOAD
	
	Alloy.Globals.loadReloadBook();
	
	////////// TABLE VIEW LOAD
	
	tableView_datas 										= [];
	page2Scrolls 												= 1;
	page2ScrollsDONE 									= false;
	page2Collection.fetch({
        urlparams: {
            show_me_the_page: page2Scrolls,
            by_page: tableView_by_page,
			id_book: passedData.id,
	        the_user: Alloy.Globals.THE_USER.id_user
        },
        add: false,
        silent: true,
        returnExactServerResponse: true,
		localOnly: false,
	    parentNode: function (loaded_data, options) {
		    
		    if(!loaded_data)return;
		    if(typeof loaded_data == 'undefined')return;
		    if(loaded_data == '' || loaded_data == null)return;
            
	    	//////Alloy.Globals.Logs.llog('---------------- REFRESH + JSON DISTANT ----------------');
		    //////Alloy.Globals.Logs.llog(loaded_data['output-array']);
		    
    		populateSellers(loaded_data['output-array']);
    		
    		if( e === false)return;
    		e.hide();
            
        }
	});
			
};

Alloy.Globals.loadRefreshBook 					= function(){

	localRefresher(false);
	
};

/*********************************** AFFICHER "PLUS" CLICK ****************************************/

$.bookDescriptionMore.addEventListener("click", function(e) {
	
	Alloy.Globals.preventDoubleClick(this);

	var decalage  											= 84;
	
   //////////////////// GO DOWN
   
	if (this.status == 'off'){
	
		$.the_main.height 								= $.the_main.baseheight;
		$.bookDescriptionParent.animate({height:70});
		$.bookDescription.animate({height:56});
		
		$.bookDescriptionMore.text 				= $.bookDescriptionMore.atext;
		
		$.removeClass($.bookDescriptionMore,'book_show_more_done');
    	
		this.status 												= 'on';
    	
	}
	
	////////////////// GO UP
	
	else{
		
		$.the_main.animate({height:$.the_main.baseheight+decalage});
		$.bookDescriptionParent.animate({height:70+decalage});
		$.bookDescription.animate({height:56+decalage});
		
		$.bookDescriptionMore.text 				= $.bookDescriptionMore.rtext;
		
		$.addClass($.bookDescriptionMore,'book_show_more_done');

		this.status 												= 'off';
		
	}
 	
}); 

/*********************************** CREER ALERTE CLICK ****************************************/

$.addAlert.addEventListener("click", function(e) {
	
	Alloy.Globals.preventDoubleClick(this);
	
	if (this.status == 'off'){
		
		var request_input									= [];
		request_input['async_execution']		= AlertOnBookON;
		request_input['async_params']			= [];
		
		/* ********* AJAX API QUERY ********* */
		Alloy.Globals.Requests.RequestsMaker(
			'POST',
			true,
			Alloy.Globals.endPoints.userAlertActivate,
			{
				id_book:											passedData.id,
				the_user: 										Alloy.Globals.THE_USER.id_user,
			},
			request_input,
			false,
			true
		);
		
	}
	else{
		
		var request_input									= [];
		request_input['async_execution']		= AlertOnBookOFF;
		request_input['async_params']			= [];
		
		/* ********* AJAX API QUERY ********* */
		Alloy.Globals.Requests.RequestsMaker(
			'POST',
			true,
			Alloy.Globals.endPoints.userAlertRemove,
			{
				id_book:											passedData.id,
				the_user: 										Alloy.Globals.THE_USER.id_user,
			},
			request_input,
			false,
			true
		);
		
	}
	
}); 

function AlertOnBookON(JSON_returned,local_params){

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
		
		////////Alloy.Globals.Logs.llog('---------------- ALERT ACTIVATION OK ----------------');
		////////Alloy.Globals.Logs.llog(JSON_returned['output-added-items']);
		
		$.addAlert.text 										= $.addAlert.textswitchA;
		$.addAlert.status 									= 'on';
		$.addClass($.addAlert,'button-OFF');
		
	}
	
};

function AlertOnBookOFF(JSON_returned,local_params){

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
		
		////////Alloy.Globals.Logs.llog('---------------- ALERT ACTIVATION OFF ----------------');
		////////Alloy.Globals.Logs.llog(JSON_returned['output-deleted-items']);
		
		$.addAlert.text 										= $.addAlert.textswitchB;
		$.addAlert.status 									= 'off';
		$.removeClass($.addAlert,'button-OFF');
		
	}
	
};
	
/*********************************** ACHETER NEUF CLICK ****************************************/

$.buyNew.addEventListener("click", function(e) {
	
	Alloy.Globals.preventDoubleClick(this);
	
	Alloy.Globals.app.goTo("page_1_a_2_onebook_acheter_neuf", {id_book: passedData.id});

}); 