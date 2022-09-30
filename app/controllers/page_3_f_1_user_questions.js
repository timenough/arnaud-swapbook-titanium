/*********************************** OPEN ****************************************/

Alloy.Globals.navigationWindow 			= $.window;
Alloy.Globals.toCloseWindows['question_page']= $.window;

/*********************************** FOCUS ****************************************/

$.window.addEventListener("focus",function(e) {
	
	Alloy.Globals.toCloseWindows['question_page']= $.window;

	Alloy.Globals.Dialog 									= $.navBar.getView('AlertDialog');

	Alloy.Globals.LEFTbottom_badge			= $.tabBar.getView('button1badge');
	Alloy.Globals.RIGHTbottom_badge			= $.tabBar.getView('button3badge');
	
});

var args 														= arguments[0] || {};
var passedData 										= args.passedData;
		
/*********************************** NAVIGATION BAR MANIPULATION *****************************************/

$.navBar.getView('navBarText').text		= passedData.questions_title;
$.navBar.getView('closebutton').visible	= true;
$.navBar.getView('closebutton').bcase	= 'question_page';

$.tabBar.getView('button2').bcase 		= 'on_user_network_page';

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
	    		header: 										passedData.questions_header,
	    		qfamily: 										passedData.question_family,
	    		endpoint:									Alloy.Globals.endPoints.questionsGet,
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
$.the_scroll_view.setUrl(Alloy.Globals.endPoints.questionsPage);
$.the_scroll_view.addEventListener('load',startWebView);
	
/******************************** LISTEN WEBVIEW BACKCALLS ***********************************/

var startListeningWebViewCalls 			= function(e) {
	
	//////////////////

	if( e.return_commande == 'the_form_is_not_ok' ){

		alert('Tous les champs de ce questionnaire doivent être remplis correctement');
		
		$.the_scroll_view.disableBounce		= true;

	}
	
	////////////////// 
	
	else if( e.return_commande == 'the_form_is_ok' ){
	    
	    var user_values_as_string 				= JSON.stringify(e.values_array);
		var the_user_of_the_conv 				= Alloy.Globals.POSSIBLE_USER.id_user ? Alloy.Globals.POSSIBLE_USER.id_user : Alloy.Globals.THE_USER.id_user;
		
		/* ******************************************** */
		/* ********* AJAX API QUERY (FAST WAY) ******** */
		/* ******************************************** */
		Alloy.Globals.Requests.RequestsMaker(
			'POST',
			true,
			Alloy.Globals.endPoints.questionsSet,
			{
	    		id_user: 										the_user_of_the_conv,
	    		answers: 									user_values_as_string
			},
			{
				async_params: 				{},
				async_execution: 			function(JSON_returned,async_params_back){			
					if(typeof JSON_returned['error'] !== 'undefined'){
						
						Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);
						
					}
					else{
						
						//////////// GOOGLE ANALYTICS 
						
						Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
							category: 												"App. social behaviours",
							label: 														"Answser to an internal survey after sign up",
							action: 													"accept survey 1 participation",
							value: 														1
						});
						
						///////////////
						Alloy.Globals.Logs.llog('---------------- USER QUESTIONS ANSWERED ----------------');
						///////////////
						Alloy.Globals.Logs.llog(JSON_returned);
						
						if(typeof(JSON_returned['success-message']) == 'undefined')return;
						
						Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['question_page']);
					    
					}
				}
			},
			false,
			false 
		);
		
		$.the_scroll_view.disableBounce		= false;
		
	}

	return 'ok';
	
};