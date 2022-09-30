/*********************************** OPEN ****************************************/

Alloy.Globals.navigationWindow 				= $.window;
Alloy.Globals.toCloseWindows['on_onebook_acheter_neuf_page']= $.window;
	
var the_search_tableView 							= Ti.UI.createTableView(Alloy.Globals.loadReloadSearchBooks_engine_tableView);

/*********************************** FOCUS ****************************************/

$.window.addEventListener("focus",function(e) {
	
	Alloy.Globals.toCloseWindows['on_onebook_acheter_neuf_page']= $.window;

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
		
/*********************************** NAVIGATION BAR MANIPULATION *****************************************/

$.navBar.getView('navBarText').text			= 'SWAPBOOK';
$.navBar.getView('menubutton').visible 	= false;
$.navBar.getView('backbutton').visible 		= true;
$.navBar.getView('backbutton').bcase 		= 'on_onebook_acheter_neuf_page';

$.navBar.getView('buybutton').bcase 		= null;
$.navBar.getView('sellbutton').bcase 		= 'goto_sell_page';

$.tabBar.getView('button2').bcase 			= 'on_onebook_achat_neuf_page';

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

/*********************************** RESET FORM ****************************************/

Alloy.Globals.resetAchatNeufForm 				= function(){
	    		
	$.bPrenom.setValue('');
	$.bNom.setValue('');
	$.bAddr1.setValue('');
	$.bAddr2.setValue('');
	$.bVille.setValue('');
	$.bPays.setValue('');
	$.bCp.setValue('');
	$.bTel.setValue('');
	$.bCheck.backgroundColor 					= 'transparent';
	$.bCheck.checked									= 'no';
	
};

/*********************************** SAUVEGARDER PROCHAINE FOIS CLICK ****************************************/

$.SaveDatas.addEventListener("click", function(e) {
	
	Alloy.Globals.preventDoubleClick(this);

	if ($.bCheck.checked == 'no'){
		
		$.bCheck.backgroundColor 				= '#616161';
		$.bCheck.checked								= 'yes';
		
	}
	else{
		
		$.bCheck.backgroundColor 				= 'transparent';
		$.bCheck.checked								= 'no';
		
	}
	
}); 

/*********************************** VALIDER CLICK ****************************************/

$.ValidAlert.addEventListener("click", function(e) {
	
	Alloy.Globals.preventDoubleClick(this);

	var request_input									= [];
	request_input['async_execution']		= AchatNeufSave;
	request_input['async_params']			= [];
	
	/* ********* CONTROLS ********** */
	//$.bCheck.checked
	
	/* ********* AJAX API QUERY ********* */
	Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		Alloy.Globals.endPoints.TEMP,
		{
			id_book:											passedData.id,
			the_user: 										Alloy.Globals.THE_USER.id_user,
		},
		request_input,
		false,
		false
	);
	
	
}); 

function AchatNeufSave(JSON_returned,local_params){
	
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
		
		///////Alloy.Globals.Logs.llog('---------------- ACHAT NEUF SAVED ----------------');
		///////Alloy.Globals.Logs.llog(JSON_returned['output-array']);
		
		$.navBar.getView('backbutton').fireEvent('click');
		
	}
	
};