/*********************************** OPEN ****************************************/

Alloy.Globals.navigationWindow 			= $.window;
Alloy.Globals.toCloseWindows['on_onesale_page']= $.window;
	
var the_search_tableView 						= Ti.UI.createTableView(Alloy.Globals.loadReloadSearchBooks_engine_tableView);

/*********************************** FOCUS ****************************************/

$.window.addEventListener("focus",function(e) {
	
	Alloy.Globals.toCloseWindows['on_onesale_page']= $.window;
	
	Alloy.Globals.Dialog 								= $.navBar.getView('AlertDialog');
		
	Alloy.Globals.LEFTbottom_badge		= $.tabBar.getView('button1badge');
	Alloy.Globals.RIGHTbottom_badge		= $.tabBar.getView('button3badge');
	    
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

var args 														= arguments[0] || {};
var passedData 										= args.passedData;
var _JSON_returned 									= {};
var Virtual_Cart_Object 							= {};
var Virtual_Cart_Total								= 0;
var Virtual_Cart_Total_HT							= 0;
var Virtual_Cart_Total_PORT					= 0;
var Virtual_Cart_Total_SENT					= 0;
var Virtual_Cart_Total_HT_SENT				= 0;
var Virtual_Cart_Total_PORT_SENT			= 0;

Alloy.Globals.Logs.llog(passedData);
		
/*********************************** NAVIGATION BAR MANIPULATION *****************************************/

$.navBar.getView('navBarText').text		= 'SWAPBOOK';
$.navBar.getView('menubutton').visible = false;
$.navBar.getView('backbutton').visible	= true;
$.navBar.getView('backbutton').bcase	= 'on_onesale_page';

$.navBar.getView('buybutton').bcase 	= null;
$.navBar.getView('sellbutton').bcase 	= 'goto_sell_page';

$.tabBar.getView('button2').bcase 		= 'on_onesale_page_1';

/*********************************** SLIDER MENU + SEARCH EVENTS ****************************************/

Alloy.Globals.menuOpened 						= false;
Alloy.Globals.searchOpened 					= false;

/*********************************** HEIGHT ADJUSTMENTS ****************************************/

Alloy.Globals.tableViewHeight				= ( Ti.Platform.displayCaps.platformHeight - 82 ) - 60;
$.the_scroll_view.height 							= Alloy.Globals.tableViewHeight+2;

if(OS_ANDROID){
	
	Alloy.Globals.tableViewHeight			= ( Alloy.Globals.SCREEN_HEIGHT - 188 ) - 60;
	$.the_scroll_view.height 						= Alloy.Globals.tableViewHeight - 138;
	
}

/*********************************** MAIN MANIPULATION  *****************************************/

function populateSalePage(JSON_returned,local_params){

	_JSON_returned 									= JSON_returned;
	
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
		
		////////Alloy.Globals.Logs.llog('---------------- SALE INFOS RETRIEVED ----------------');
		////////Alloy.Globals.Logs.llog(JSON_returned['output-array']);

		/**********************/
		/* PRE-MANIPULATIONS */
		/**********************/
		
		if( typeof JSON_returned['output-array']['seller_photo_json'] == 'undefined') {
			Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['on_onesale_page']);
		}
		
		var ALL_IS_OK 									= (JSON_returned['output-array']['sale_status'] == 'available' || JSON_returned['output-array']['sale_status'] == 'paused') ? true : false;
		if( 
			ALL_IS_OK &&
			JSON_returned['output-array']['sale_user_id'] == Alloy.Globals.THE_USER.id_user
		){		
			
			$.ValiderPanier.backgroundColor= "silver";
			
			$.editSale.visible 							= true;
			$.editSale.addEventListener("click", function(e){
				
				Alloy.Globals.preventDoubleClick(this);
				
				Alloy.Globals.app.goTo(
					'page_1_b_1_vente',
					{
						tab3: 									passedData.sale_id
					}
				);
				
			});
			
			ALL_IS_OK 										= -1;
			
		}
		else{
			
			$.editSale.visible 							= false;
			
		}
		
		/*************************/
		/* DO THE MANIPULATIONS */
		/*************************/
		
		////// THE SELLER
		
		var universite;
		var universite_from;
		var seller_rankings							= JSON_returned['output-array']['user_rankings'];
		var seller_photo 								= JSON.parse(JSON_returned['output-array']['seller_photo_json']);
		var Virtual_Cart_Total_						= Alloy.Globals.tools.number_format(parseFloat(JSON_returned['output-array']['sale_price']),2,'.',' ');
		Virtual_Cart_Total								= Virtual_Cart_Total_SENT =  ALL_IS_OK == true ? parseFloat(JSON_returned['output-array']['sale_price']) : 0;
		Virtual_Cart_Total_HT						= Virtual_Cart_Total_HT_SENT = ALL_IS_OK == true ? parseFloat(JSON_returned['output-array']['sale_price_HT']) : 0;
		Virtual_Cart_Total_PORT					= Virtual_Cart_Total_PORT_SENT = ALL_IS_OK == true ? parseFloat(JSON_returned['output-array']['sale_price_port']) : 0;
		var seller_price_								= Virtual_Cart_Total_ + '€';
		var seller_price 									= Virtual_Cart_Total + '€';
		
		if(JSON_returned['output-array']['user_diplome']  == null)JSON_returned['output-array']['user_diplome']= '';
		if(JSON_returned['output-array']['user_universite'] == null)universite= '';
		else universite									= ': '+JSON_returned['output-array']['user_universite'];
		if(JSON_returned['output-array']['user_universite_to'] == null)JSON_returned['output-array']['user_universite_to']= '';
		if(JSON_returned['output-array']['user_universite_from'] == null)universite_from= '';
		else universite_from							= JSON_returned['output-array']['user_universite_from']+'-';
		var sellerParcours 							= universite_from+JSON_returned['output-array']['user_universite_to']+' '+universite;

		var userTAGS 									= JSON_returned['output-array']['user_tags'].split(',');
		var children 										= $.userTags.children.slice(0);
		for (var i = 0; i < children.length; ++i){$.userTags.remove(children[i]);}

		if(userTAGS.length>0)for(i = 0; i < userTAGS.length; i++){
			if(userTAGS[i] == '')continue;
			var each_tag 									= Ti.UI.createLabel({
				text: userTAGS[i]+'          ',
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
					false,
					this.text.trim()
				);
				
			}); 
			$.addClass(each_tag,'labl user_tag');
			$.userTags.add(each_tag);
		}

		$.sellerPhoto.image							= seller_photo.current;
		$.rank1.image 									= seller_rankings == '0.5' ? '/images/starHalf.png' : ( parseFloat(seller_rankings) < 1 ? '/images/starEmpty.png' : '/images/starFull.png' );
		$.rank2.image 									= seller_rankings == '1.5' ? '/images/starHalf.png' : ( parseFloat(seller_rankings) < 2 ? '/images/starEmpty.png' : '/images/starFull.png' );
		$.rank3.image 									= seller_rankings == '2.5' ? '/images/starHalf.png' : ( parseFloat(seller_rankings) < 3 ? '/images/starEmpty.png' : '/images/starFull.png' );
		$.rank4.image 									= seller_rankings == '3.5' ? '/images/starHalf.png' : ( parseFloat(seller_rankings) < 4 ? '/images/starEmpty.png' : '/images/starFull.png' );
		$.rank5.image 									= seller_rankings == '4.5' ? '/images/starHalf.png' : ( parseFloat(seller_rankings) < 5 ? '/images/starEmpty.png' : '/images/starFull.png' );
		$.sellerName.text								= JSON_returned['output-array']['sale_user'];
		$.sellerDiplome.text 							= JSON_returned['output-array']['user_diplome'];
		$.sellerDesc 										= JSON_returned['output-array']['user_bio'];
		$.sellerUniv.text								= sellerParcours;
		
		////// THE BOOK
		
		var bookTitle										= JSON_returned['output-array']['book_title'];
		if(bookTitle.length <= 28)$.addClass($.bookTitle,'book_title_bigger');
		
		var book_photo 									= JSON.parse(JSON_returned['output-array']['sale_photo_json']);
		var bookAuthor 									= JSON_returned['output-array']['book_author_name'];
		var bookEdition									= JSON_returned['output-array']['book_editor_name']+JSON_returned['output-array']['book_edition'];
		var bookState 									= JSON_returned['output-array']['sale_state_l'];
		var bookAdvice									= JSON_returned['output-array']['sale_best_advice'];

		var bookTAGS 									= JSON_returned['output-array']['sale_tags'].split(',');
		var children 										= $.bookTags.children.slice(0);
		for (var i = 0; i < children.length; ++i){$.bookTags.remove(children[i]);}
		
		if(bookTAGS.length>0)for(i = 0; i < bookTAGS.length; i++){
			if(bookTAGS[i] == '')continue;
			var each_tag 									= Ti.UI.createLabel({
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
		
		$.bookPhoto.image							= book_photo.current;
		$.bookTitle.text									= bookTitle;
		$.bookAuthor.text								= JSON_returned['output-array']['book_author_name'];
		$.bookEdition.text								= JSON_returned['output-array']['book_editor_name']+JSON_returned['output-array']['book_edition'];
		$.bookPrice.text								= seller_price_;
		$.TotalPanier.text								= ': '+Alloy.Globals.tools.number_format(Virtual_Cart_Total,2,'.',' ')+'€';
		if($.TotalPanier.text == ': 0€' || $.TotalPanier.text == ': 0.00€')$.ValiderPanier.backgroundColor= "silver";
		$.bookState.text								= JSON_returned['output-array']['sale_state_l'];
		$.bookAdvicevalue.text					= JSON_returned['output-array']['sale_best_advice'];
							
		////// THE SELLER OTHER BOOKS
		
		var total_other_books_added 			= [];
		var children 										= $.otherBooks.children.slice(0);
		for (var i = 0; i < children.length; ++i){$.otherBooks.remove(children[i]);}
			
		for(e = 0; e < JSON_returned['output-array2'].length; e++){

			var OneOtherBookDATAS 			= JSON_returned['output-array2'][e];
			var OneOtherBook_photo 			= JSON.parse(OneOtherBookDATAS['sale_photo_json']);
			
			var oneOtherBook 							= Ti.UI.createView({});
			$.addClass(oneOtherBook,'oneOtherBook');
				
				var list_img_obook_container 	= Ti.UI.createView({});
				$.addClass(list_img_obook_container,'list_img_obook_container');
	
					var book_img 						= Ti.UI.createImageView({
						image: OneOtherBook_photo.current
					});
					$.addClass(book_img,'book_img');
					
				list_img_obook_container.add(book_img);
				
				oneOtherBook.add(list_img_obook_container);
				
				var other_book_price				= Ti.UI.createLabel({
					text: Alloy.Globals.tools.number_format(parseFloat(parseFloat(OneOtherBookDATAS['sale_price']).toFixed(2)),2,'.',' ') + '€'
				});
				$.addClass(other_book_price,'other_book_price');
				$.addClass(other_book_price,'labl');
				oneOtherBook.add(other_book_price);
				
				var other_book_state				= Ti.UI.createLabel({
					text: OneOtherBookDATAS['sale_state_s']
				});
				$.addClass(other_book_state,'other_book_state');
				$.addClass(other_book_state,'labl');
				
				oneOtherBook.add(other_book_state);
					
				var buyOtherBookButton 			= Ti.UI.createView({
					status : 'off',
					selector: e,
				});
				$.addClass(buyOtherBookButton,'buy_other_button');
	
					var buy_other_button_img 	= Ti.UI.createImageView({
						image: "/images/cart.png",
						id: 'the_cart', 
						visible: true
					});
					$.addClass(buy_other_button_img,'buy_other_button_img');
		
					var buy_other_button_img_label= Ti.UI.createLabel({
						text: "RETIRER",
						id: 'the_text', 
						visible: false
					});
					$.addClass(buy_other_button_img_label,'buy_other_button_img_label');
				
				if(ALL_IS_OK == -1){
					buyOtherBookButton.backgroundColor = "silver";
					buy_other_button_img.backgroundColor = "silver";
					buy_other_button_img_label.backgroundColor = "silver";
				}
				
				buyOtherBookButton.add(buy_other_button_img);
				buyOtherBookButton.add(buy_other_button_img_label);
				buyOtherBookButton.addEventListener("click", function(e) {
					
					if(e.source.backgroundColor == "silver")return;
						
					if (this.status == 'off'){

						$.addClass(this,'button-OFF');
						this.children[0].visible		= false;
						this.children[1].visible		= true;
						this.status 							= 'on';
						
						Add_BEFORE(JSON_returned['output-array2'][this.selector]);
						
						//////////// GOOGLE ANALYTICS
						
						Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
							category: 													"User buying process",
							label: 															"Add another book to the basket",
							action: 														"pre-purchase item addition",
							value: 															1
						});
						
					}
					else{

						$.removeClass(this,'button-OFF');
						this.children[0].visible		= true;
						this.children[1].visible		= false;
						this.status 							= 'off';
						
						Remove_BEFORE(JSON_returned['output-array2'][this.selector]['sale_id']);
						
						//////////// GOOGLE ANALYTICS
						
						Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
							category: 													"User buying process",
							label: 															"Remove another book to the basket",
							action: 														"pre-purchase item removal",
							value: 															1
						});
						
					}
					
				}); 
				
				oneOtherBook.add(buyOtherBookButton);
				
			$.otherBooks.add(oneOtherBook);
			
			total_other_books_added.push(OneOtherBookDATAS);
			
		}
		
		if(total_other_books_added < 1){
			
			$.sellerOtherBooks.height 			= 0;
			$.sellerOtherBooks.visible 			= false;
			
		}
		else{
			
			$.othersByTitle.text 						= "D'autres livres vendus par "+JSON_returned['output-array']['sale_user']+" :";
			
		}
		
		/********************************/
		/* UPDATE VIRTUAL CART OBJECT */
		/*******************************/
		
		if(ALL_IS_OK == true)Virtual_Cart_Object[ JSON_returned['output-array']['sale_id'] ]= {
			libelle: 											'Achat du livre : '+JSON_returned['output-array']['book_title']+', de '+JSON_returned['output-array']['book_author_name']+', '+JSON_returned['output-array']['book_editor_name']+JSON_returned['output-array']['book_edition'],
			seller_id: 										JSON_returned['output-array']['sale_user_id'],
			seller_username: 							JSON_returned['output-array']['sale_user']+ ' '+JSON_returned['output-array']['sale_user_nom'],
			prixHT:											JSON_returned['output-array']['sale_price_HT'],
			prixTTC:											JSON_returned['output-array']['sale_price'],
			prixPORT:										JSON_returned['output-array']['sale_price_port'],
			bookPhoto: 									book_photo.current,
			bookTitle: 										bookTitle,
			bookAuthor: 									JSON_returned['output-array']['book_author_name'],
			bookEdition: 									JSON_returned['output-array']['book_editor_name']+JSON_returned['output-array']['book_edition'],
			bookPrice: 										seller_price,
			bookState: 										JSON_returned['output-array']['sale_state_l']
		};
		
		/*
				JSON_returned['output-array']['sale_id'] = 5,
				JSON_returned['output-array']['sale_price'] = 45,
				JSON_returned['output-array']['sale_price_HT'] = "45",
				JSON_returned['output-array']['sale_price_port'] = 12,
				JSON_returned['output-array']['sale_photo_json'] = "{\"current\":\"https:\/\/images-na.ssl-images-amazon.com\/images\/I\/61JBSvW%2BP8L.jpg\"}",
				JSON_returned['output-array']['sale_tags'] = "Livres,Histoire,Politique",
				JSON_returned['output-array']['sale_best_advice'] = "Livre pour les enfants",
				JSON_returned['output-array']['sale_user_id'] = 1,
				JSON_returned['output-array']['sale_user'] = "Arnaud",
				JSON_returned['output-array']['sale_user_nom'] = "LAGARDERE",
				JSON_returned['output-array']['seller_photo_json'] = "{\"current\":\"https:\/\/s3-eu-west-1.amazonaws.com\/hunbee.com\/user-profiles-pictures\/user-3-current@2x.jpg\"}",
				JSON_returned['output-array']['user_rankings'] = 2.5",
				JSON_returned['output-array']['user_universite'] = "Dauphine",
				JSON_returned['output-array']['user_universite_from'] = 2011,
				JSON_returned['output-array']['user_universite_to'] = 2018,
				JSON_returned['output-array']['user_diplome'] = "Master 1 Innovation",
				JSON_returned['output-array']['sale_state_l'] = "Comme neuf",
				JSON_returned['output-array']['sale_state_s'] = "Neuf",
				JSON_returned['output-array']['user_tags'] = "SOci\u00e9t\u00e9,Neuf,Fanatisme,Droit des soci\u00e9t\u00e9s",
				JSON_returned['output-array']['user_bio'] = "Boss of Da Relative Company SAS",
				JSON_returned['output-array']['book_title'] = "The Alchemist",
				JSON_returned['output-array']['book_author_name'] = "Stendhal",
				JSON_returned['output-array']['book_edition'] ="6\u00e8me \u00e9dition - 2012"
		*/
	
		/* DISPLAY CONTENT */
		$.the_scroll_view.visible 					= true;
		
	}

};

/*********************************** MAIN DATA LOAD  *****************************************/

var request_input										= [];

Alloy.Globals.loadReloadSale 					= function(){

	/* HIDE CONTENT WAITING ALL LOADS */
	$.the_scroll_view.visible						= false;
	
	request_input											= [];
	request_input['async_execution']		= populateSalePage;
	request_input['async_params']			= [];
	
	/* ********* AJAX API QUERY ********* */
	Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		Alloy.Globals.endPoints.oneBookSaleGet,
		{
			sale_id: 											passedData.sale_id,
			the_seller: 										passedData.the_seller,
			the_user: 										Alloy.Globals.THE_USER.id_user,
		},
		request_input,
		false,
		false
	);
	
};

Alloy.Globals.loadReloadSale();

/*********************************** AJOUTER/RETIRER AU PANIER CLICK ****************************************/

function Add_BEFORE(object_to_add){
	
	var book_photo 									= JSON.parse(object_to_add['sale_photo_json']);
	var bookTitle										= (object_to_add['book_title'].length > 62) ? object_to_add['book_title'].substr(0, 62).trim()+'...' : object_to_add['book_title'];
	var bookPrice 									= parseFloat(object_to_add['sale_price']).toFixed(2) + '€';
		
	Virtual_Cart_Object[ object_to_add['sale_id'] ]= {
		libelle: 											'Achat du livre : '+object_to_add['book_title']+', de '+object_to_add['book_author_name']+', '+object_to_add['book_editor_name']+object_to_add['book_edition'],
		seller_id: 										object_to_add['sale_user_id'],
		seller_username: 							object_to_add['sale_user']+ ' '+object_to_add['sale_user_nom'],
		prixHT:											object_to_add['sale_price_HT'],
		prixTTC:											object_to_add['sale_price'],
		prixPORT:										object_to_add['sale_price_port'],
		bookPhoto: 									book_photo.current,
		bookTitle: 										bookTitle,
		bookAuthor: 									object_to_add['book_author_name'],
		bookEdition: 									object_to_add['book_editor_name']+object_to_add['book_edition'],
		bookPrice: 										bookPrice,
		bookState: 										object_to_add['sale_state_l']
	};
	
	//Alloy.Globals.Logs.llog('On ajoute');
	//Alloy.Globals.Logs.llog(Virtual_Cart_Object);
	
	updateTotalShown();
	
};

function Remove_BEFORE(object_ID_to_remove){

	delete Virtual_Cart_Object[ object_ID_to_remove ];
	
	//Alloy.Globals.Logs.llog('On supprime Sale ID = '+object_ID_to_remove);
	//Alloy.Globals.Logs.llog(Virtual_Cart_Object);
	
	updateTotalShown();
	
};

function updateTotalShown(){

	var total_cart 									= Virtual_Cart_Total;
	var total_cart_HT 							= Virtual_Cart_Total_HT;
	var total_cart_PORT 						= Virtual_Cart_Total_PORT;
	
	for(e = 0; e < _JSON_returned['output-array2'].length; e++){
		
		var id_to_seek 							= _JSON_returned['output-array2'][e]['sale_id'];
		
		if( typeof Virtual_Cart_Object[ id_to_seek ] != 'undefined'){
			
			total_cart 								+= parseFloat(_JSON_returned['output-array2'][e]['sale_price']);
			total_cart_HT							+= parseFloat(_JSON_returned['output-array2'][e]['sale_price_HT']);
			total_cart_PORT						+= parseFloat(_JSON_returned['output-array2'][e]['sale_price_port']);
			
		}
		
	}
	
	Virtual_Cart_Total_SENT				= total_cart.toFixed(2);
	Virtual_Cart_Total_HT_SENT		= total_cart_HT.toFixed(2);
	Virtual_Cart_Total_PORT_SENT	= total_cart_PORT.toFixed(2);

	$.TotalPanier.text							= ': '+Alloy.Globals.tools.number_format(total_cart.toFixed(2),2,'.',' ')+'€';
	
	if(
		$.TotalPanier.text == ': 0.00€' ||
		$.TotalPanier.text == ': 0€' 
	){
		$.ValiderPanier.backgroundColor= "silver";
	}
	else{
		$.ValiderPanier.backgroundColor= "#33c691";
	}
	
};

/*********************************** VENDEUR PHOTO CLICK ****************************************/
	
$.sellerPhoto.addEventListener("click", function(e) {
	
	Alloy.Globals.preventDoubleClick(this);

	Alloy.Globals.app.goTo("page_3_a_1_user_profile", {id_user: passedData.the_seller});
	
});

/*********************************** VALIDER PANIER CLICK ****************************************/

$.ValiderPanier.addEventListener("click", function(e) {
	
	if(this.backgroundColor == "silver")return;
	
	Alloy.Globals.preventDoubleClick(this);
	
	//////////// GOOGLE ANALYTICS
	
	Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
		category: 													"User buying process",
		label: 															"Validate articles of the basket",
		action: 														"purchase validation",
		value: 															1
	});
	
	//////////// GO TO NEXT STEP
	
	Alloy.Globals.app.goTo("page_1_a_4_onesale_recap", {
		the_seller: passedData.the_seller,
		cart_object: Virtual_Cart_Object,
		cart_total_TTC: Virtual_Cart_Total_SENT,
		cart_total_HT: Virtual_Cart_Total_HT_SENT,
		cart_total_PORT: Virtual_Cart_Total_PORT_SENT,
	});

}); 