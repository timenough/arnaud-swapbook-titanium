/*********************************** OPEN ****************************************/

Alloy.Globals.navigationWindow 			= $.window;
Alloy.Globals.toCloseWindows['terms_page']= $.window;

/*********************************** FOCUS ****************************************/

$.window.addEventListener("focus",function(e) {
	
	Alloy.Globals.toCloseWindows['terms_page']= $.window;

	Alloy.Globals.Dialog 								= $.navBar.getView('AlertDialog');
		
	Alloy.Globals.LEFTbottom_badge			= $.tabBar.getView('button1badge');
	Alloy.Globals.RIGHTbottom_badge			= $.tabBar.getView('button3badge');
	
});

var args 														= arguments[0] || {};
var passedData 										= args.passedData;
		
/*********************************** NAVIGATION BAR MANIPULATION *****************************************/

$.navBar.getView('navBarText').text		= 'CGU / CGV';
$.navBar.getView('menubutton').visible	= false;
$.navBar.getView('backbutton').visible 	= true;
$.navBar.getView('backbutton').bcase 	= 'terms_page';

$.tabBar.getView('button2').bcase 		= 'on_lateral_menu_page';

/*********************************** HEIGHT ADJUSTMENTS ****************************************/

Alloy.Globals.tableViewHeight				= ( Ti.Platform.displayCaps.platformHeight - 82 ) - 60;
$.the_scroll_view.height 							= Alloy.Globals.tableViewHeight+2;

if(OS_ANDROID){
	
	Alloy.Globals.tableViewHeight			= ( Alloy.Globals.SCREEN_HEIGHT - 188 ) - 60;
	$.the_scroll_view.height 						= Alloy.Globals.tableViewHeight - 138;
	
}

/******************************** SET WEBVIEW URL + WEBSOCKET LIVE : INIT ********************************/

Alloy.Globals.loadReloadWebView 			= function(){
	
	/////////////////////// ENVOI AU WEBSOCKET LIVE : INIT

	setTimeout(function(){
			
	    Ti.App.fireEvent(
	    	'app:fromTitanium',
	    	{
	    		commande: 								'init_load',
	    		endpoint:									Alloy.Globals.endPoints.termsGet,
	    		limit: 											'0,200'
	    	}
	    );
	    
	},450);
	
};

var startWebView 									= function(e){
	
	//////////////////// LOAD THE CONVERSATION AND GET USERS STATUS

	Alloy.Globals.loadReloadWebView();

	Ti.App.addEventListener('app:fromWebView', startListeningWebViewCalls);

};

Ti.App.removeEventListener('app:fromWebView', startListeningWebViewCalls);

$.the_scroll_view.visible 							= true;
$.the_scroll_view.setUrl(Alloy.Globals.endPoints.termsPage);
$.the_scroll_view.addEventListener('load',startWebView);
	
/******************************** LISTEN WEBVIEW BACKCALLS ***********************************/

var startListeningWebViewCalls 			= function(e) {
	
	//////////////////
	
	if( e.return_commande == 'commandeX' ){

		$.the_scroll_view.disableBounce		= true;

	}
	
	////////////////// 
	
	else if( e.return_commande == 'commandeY' ){
	    
		$.the_scroll_view.disableBounce		= false;

	}

	return 'ok';
	
};