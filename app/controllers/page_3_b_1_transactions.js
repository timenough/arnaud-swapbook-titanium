/*********************************** OPEN ****************************************/

Alloy.Globals.navigationWindow 				= $.window;
Alloy.Globals.toCloseWindows['transactions_page']= $.window;

/*********************************** FOCUS ****************************************/

$.window.addEventListener("focus",function(e) {
	
	Alloy.Globals.toCloseWindows['transactions_page']= $.window;

	Alloy.Globals.Dialog 									= $.navBar.getView('AlertDialog');
		
	Alloy.Globals.LEFTbottom_badge			= $.tabBar.getView('button1badge');
	Alloy.Globals.RIGHTbottom_badge			= $.tabBar.getView('button3badge');
	
});

Alloy.Globals.Transactions_tableView_MODE= 'SALES';

var args 															= arguments[0] || {};
var passedData 											= args.passedData;
var tableView_by_page 								= 500;
var request_input											= [];
		
/*********************************** NAVIGATION BAR MANIPULATION *****************************************/

$.navBar.getView('navBarText').text			= 'MES TRANSACTIONS';
$.navBar.getView('menubutton').visible 	= false;
$.navBar.getView('backbutton').visible 		= true;
$.navBar.getView('backbutton').bcase 		= 'transactions_page';

$.tabBar.getView('button2').bcase 			= 'transactions_page';

/*********************************** HEIGHT ADJUSTMENTS ****************************************/

Alloy.Globals.tableViewHeight					= ( Ti.Platform.displayCaps.platformHeight - 82 ) - 101;
$.the_scroll_view.height 								= Alloy.Globals.tableViewHeight+2;

if(OS_ANDROID){
	
	Alloy.Globals.tableViewHeight				= ( Alloy.Globals.SCREEN_HEIGHT - 188 ) - 101;
	$.the_scroll_view.height 							= Alloy.Globals.tableViewHeight - 138;
	
}

/*********************************** TABLE VIEW INIT ****************************************/

var tableView_data 										= [];
var tableView_datas 									= [];
var pageMyTransacsScrolls 						= 1;
var pageMyTransacsCollection 					= $.transactionsRefreshable;

/*********************************** TABLE VIEW PRE-POPULATE > SCROLL TO REFRESH ***********************************/

function prePopulateTransactionsRefresher(e) {

	$.the_table_view.scrollToTop(0);
	
	////////// TABLE VIEW LOAD
	
	tableView_datas 										= [];
	pageMyTransacsScrolls 							= 1;
	pageMyTransacsCollection.fetch({
        urlparams: {
            show_me_the_page: 						pageMyTransacsScrolls,
            by_page: 											tableView_by_page,
	        the_user: 											Alloy.Globals.THE_USER.id_user
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
		    
    		populateTransactions(loaded_data);
    		
    		if( e === false)return;
    		e.hide();
            
        }
	});
			
};

/*********************************** TABLE VIEW PREPOPULATE ****************************************/

function prePopulateTransactions(JSON_returned,local_params){

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
		
		Alloy.Globals.Logs.llog('---------------- TRANSACTIONS DATAS RETRIEVED ----------------');
		
		populateTransactions(JSON_returned);
		
	}

};

/*********************************** TABLE VIEW POPULATE ****************************************/

function populateTransactions(books) {
	
	$.gotoSalesLabel.text 								= books['sales']['output-total-price']+'€';
	$.gotoBuysLabel.text 								= books['buys']['output-total-price']+'€';
	$.gotoCreditsLabel.text 							= books['credits']['output-total-price']+'€';
	
	//////////////
	////////////// CREDITS CASE
	//////////////
	
	if(Alloy.Globals.Transactions_tableView_MODE== 'CREDITS'){
		
		$.the_table_view.setData( [] );
		
		Alloy.Globals.Loading.hide();
		$.the_scroll_view.visible 						= true;

		if(books['credits']['output-total-price'] == 0){
			
			$.how_much_user_have.text 			= '0€ de crédits Swapbook'; 
			
			$.credits_row_1.visible 					= false;
			$.credits_row_2.visible 					= false;
			$.credits_row_3.visible 					= false;
			$.credits_row_4.visible 					= false;
			
		}
		else{
			
			$.how_much_user_have.text 			= 'Tu disposes de '+books['credits']['output-total-price']+'€ de crédit.'; 
			
			$.credits_row_1.visible 					= true;
			$.credits_row_2.visible 					= true;
			$.credits_row_3.visible 					= true;
			$.credits_row_4.visible 					= true;
			
		}
		
		return;
		
	}
	
	//////////////
	////////////// SALES + BUYS CASE
	//////////////
	
	books 															= Alloy.Globals.Transactions_tableView_MODE== 'SALES' ? books['sales']['output-array'] : books['buys']['output-array'];
	
	/************ PREPARE POPULATION ************/

	tableView_data 											= [];
	var tableView_rows 									= [];
		
	for (var i=0; i<books.length; i++) {
    	
		var item_book 										= books[i];
    	tableView_datas.push(item_book);
    	
	}
	
	/************ POPULATION ************/
        	
	for (var i=0; i<tableView_datas.length; i++) {
		
		var book 												= tableView_datas[i];
		
		if(book.book_price_min == null)book.book_price_min= 0;
		if(book.book_price_max == null)book.book_price_max= 0;
		var book_photo 										= JSON.parse(book.sale_photo_json);
	
		var cell 													= Alloy.createController("parts/list_cell_mytransactions_book");
		cell.updateViews({
			"#bookTitle": {
				text: book.book_title,
			},
			"#bookAuthor": {
				text: book.book_author_name
			},
			"#bookEdition": {
				text: book.book_editor_name+book.book_edition
			},
			"#bookPrice": {
				text: book.book_price
			},
			"#saleStatut": {
				text: book.book_statut
			},
			"#codeStatut": {
				text: '   '+book.book_sale_code+'   ',
				visible: book.book_sale_code == false ? false : true,
				particularClick: true,
				params1: ( book.book_sale_code == 'Envoi ton code de transaction' ? 'chat' : ( book.book_sale_code == 'Demander les crédits' ? 'credits' : 'none' ) ),
				params2: Alloy.Globals.THE_USER.id_user,
				params3: book.id_sale,
				params4: book.id_seller,
			},
			"#bookPhoto": {
				image: book_photo.current		/////////// LOAD IMAGE >>>>  330 x 500 pixels
			}
		});
			
		/******* CELLS INSERTION *******/
		
		tableView_rows.push(cell.getView());
		tableView_data.push(cell);
		
	}
	
	$.the_table_view.setData(						tableView_rows);

	pageMyTransacsScrolls 							+= 1;
		
	/********************/
	/* DISPLAY CONTENT */
	/********************/
	Alloy.Globals.Loading.hide();
	$.the_scroll_view.visible 							= true;
	
};

/*********************************** TABLE VIEW CLICK ****************************************/

$.the_table_view.addEventListener("click", function(e) {
	
	if(e.source.particularClick)return;
	
	Alloy.Globals.preventDoubleClick(this);
	
	$.the_table_view.touchEnabled 				= false;
	
	var transac 												= tableView_datas[e.index];
	
	Alloy.Globals.app.goTo("page_1_a_3_onesale", {
		sale_id: 													transac.id_sale,
		the_seller: 												transac.id_seller,
	});
	
	setTimeout(function() {
    	$.the_table_view.touchEnabled 			= true;
    }, 1000);
 	
});

/*********************************** TABLE VIEW LOADS ****************************************/

Alloy.Globals.loadReloadTransactions	= function(){

	/* HIDE CONTENT WAITING ALL LOADS */
	$.the_scroll_view.visible						= false;
	    		
	tableView_datas 									= [];
	pageMyTransacsScrolls 						= 1;
	pageMyTransacsCollection.fetch({
	    urlparams: {
            show_me_the_page: 					pageMyTransacsScrolls,
            by_page: 										tableView_by_page,
	        the_user: 										Alloy.Globals.THE_USER.id_user
	    },
		localOnly: false,
	    parentNode: function (loaded_data, options) {
		    
		    if(!loaded_data)return;
		    if(typeof loaded_data == 'undefined')return;
		    if(loaded_data == '' || loaded_data == null)return;
	
	    	////////Alloy.Globals.Logs.llog('---------------- INIT + JSON DISTANT ----------------');
		    
	    	populateTransactions(loaded_data);
		    
		}
	});
	
	$.the_table_view.touchEnabled 			= false;
	
	setTimeout(function() {
		$.the_table_view.scrollToTop(0);
    	$.the_table_view.touchEnabled 		= true;
    }, 500);
    
};

Alloy.Globals.loadReloadTransactions();

Alloy.Globals.loadRefreshMyTransactions= function(){

	prePopulateTransactionsRefresher(false);
	
};

/*********************************** TABBAR BUTTON CLICK ****************************************/

$.gotoSales.addEventListener("click", function(e) {

	Alloy.Globals.Logs.llog('>>>> VENTES CLICK <<<<');
	
	Alloy.Globals.preventDoubleClick(this);
	
	$.addClass($.gotoSales,'selected');
	$.removeClass($.gotoBuys,'selected');
	$.removeClass($.gotoCredits,'selected');
	
	$.addClass($.gotoSalesLabel,'labl-btn-selected');
	$.removeClass($.gotoBuysLabel,'labl-btn-selected');
	$.removeClass($.gotoCreditsLabel,'labl-btn-selected');
	
	$.gotoSalesPicto.image 						= '/images/longarrowUp.png';
	$.gotoBuysPicto.image 						= '/images/longarrowDownBlue.png';
	$.gotoCreditsPicto.image 					= '/images/creditsBlue.png';
	
	$.the_table_view_title.text 					= 'MES VENTES';
	
	$.creditRow.visible								= false;
	$.creditRow.height								= 0;
	$.the_table_view_header.height 		= 80;

	Alloy.Globals.Transactions_tableView_MODE= 'SALES';
	
	Alloy.Globals.loadReloadTransactions();
	
	//////////// GOOGLE ANALYTICS
	
	Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
		category: 													"User account management",
		label: 															"List user sales",
		action: 														"see user sales",
		value: 															1
	});
	
});		

if(typeof passedData != 'undefined' && passedData.tab2){
	
	setTimeout(function(){
		$.gotoBuys.fireEvent('click');
	},1000);
	
}

$.gotoBuys.addEventListener("click", function(e) {
		
	Alloy.Globals.Logs.llog('>>>> ACHATS CLICK <<<<');
		
	Alloy.Globals.preventDoubleClick(this);
	
	$.addClass($.gotoBuys,'selected');
	$.removeClass($.gotoSales,'selected');
	$.removeClass($.gotoCredits,'selected');
	
	$.addClass($.gotoBuysLabel,'labl-btn-selected');
	$.removeClass($.gotoSalesLabel,'labl-btn-selected');
	$.removeClass($.gotoCreditsLabel,'labl-btn-selected');
	
	$.gotoSalesPicto.image 						= '/images/longarrowUpBlue.png';
	$.gotoBuysPicto.image 						= '/images/longarrowDown.png';
	$.gotoCreditsPicto.image 					= '/images/creditsBlue.png';
	
	$.the_table_view_title.text 					= 'MES ACHATS';
	
	$.creditRow.visible								= false;
	$.creditRow.height								= 0;
	$.the_table_view_header.height 		= 80;

	Alloy.Globals.Transactions_tableView_MODE= 'BUYS';
	
	Alloy.Globals.loadReloadTransactions();
	
	//////////// GOOGLE ANALYTICS
	
	Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
		category: 													"User account management",
		label: 															"List user purchases",
		action: 														"see user purchases",
		value: 															1
	});

});

if(typeof passedData != 'undefined' && passedData.tab3){
	
	setTimeout(function(){
		$.gotoCredits.fireEvent('click');
	},1000);
	
}

$.gotoCredits.addEventListener("click", function(e) {
		
	Alloy.Globals.Logs.llog('>>>> CREDITS CLICK <<<<');
		
	Alloy.Globals.preventDoubleClick(this);
	
	$.addClass($.gotoCredits,'selected');
	$.removeClass($.gotoBuys,'selected');
	$.removeClass($.gotoSales,'selected');
	
	$.addClass($.gotoCreditsLabel,'labl-btn-selected');
	$.removeClass($.gotoBuysLabel,'labl-btn-selected');
	$.removeClass($.gotoSalesLabel,'labl-btn-selected');
	
	$.gotoSalesPicto.image 						= '/images/longarrowUpBlue.png';
	$.gotoBuysPicto.image 						= '/images/longarrowDownBlue.png';
	$.gotoCreditsPicto.image 					= '/images/credits.png';
	
	$.the_table_view_title.text 					= 'MES CRÉDITS';
	
	$.creditRow.visible								= true;
	$.creditRow.height								= 500;
	$.the_table_view_header.height 		= 580;

	Alloy.Globals.Transactions_tableView_MODE= 'CREDITS';
	
	Alloy.Globals.loadReloadTransactions();
	
	//////////// GOOGLE ANALYTICS
	
	Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
		category: 													"User account management",
		label: 															"List user credit",
		action: 														"see user credit",
		value: 															1
	});
	
});

/*********************************** MANUAL CLICKS ****************************************/

$.gotoHomepage.addEventListener("click", function(e) {
	
	Alloy.Globals.preventDoubleClick(this);
	
	Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['transactions_page']);
	
});		

$.askCreditsBankTransfer.addEventListener("click", function(e) {
	
	Alloy.Globals.preventDoubleClick(this);
	
	/* ******************************************** */
	/* ********* AJAX API QUERY (FAST WAY) ******** */
	/* ******************************************* */
	Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		Alloy.Globals.endPoints.userRequestCredits,
		{
    		id_user: 										  	Alloy.Globals.THE_USER.id_user
		},
		{
			async_params: 				{},
			async_execution: 			function(JSON_returned,async_params_back){			
				
				if(typeof JSON_returned['error'] !== 'undefined'){
					
					Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);
					
				}
				else{
					
					///////////////
					Alloy.Globals.Logs.llog('---------------- CREDITS BANK REQUEST SENT ----------------');
					///////////////
					Alloy.Globals.Logs.llog(JSON_returned);
					
					Alloy.Globals.Logs.aalert(
						'DEMANDE ENVOYÉE',
						'Un adminsitrateur de Swapbook versera tes crédits sur ton compte bancaire, après vérification, sous 48 heures max.',
						null,
						'OK',
						function(e){
											
							$.credits_row_3.visible 					= false;
							$.credits_row_4.visible 					= false;
							
						},
						null,
						null,
						{},
						false
					);
				    
				}
			}
		},
		false,
		true 
	);
	
});	