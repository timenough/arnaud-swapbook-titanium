/*********************************** OPEN ****************************************/

Alloy.Globals.navigationWindow 				= $.window;
Alloy.Globals.toCloseWindows['settings_page']= $.window;

/*********************************** FOCUS ****************************************/

$.window.addEventListener("focus",function(e) {
	
	Alloy.Globals.toCloseWindows['settings_page']= $.window;

	Alloy.Globals.Dialog 									= $.navBar.getView('AlertDialog');
		
	Alloy.Globals.LEFTbottom_badge			= $.tabBar.getView('button1badge');
	Alloy.Globals.RIGHTbottom_badge			= $.tabBar.getView('button3badge');
	
});

var args 															= arguments[0] || {};
var passedData 											= args.passedData;
		
/*********************************** NAVIGATION BAR MANIPULATION *****************************************/

$.navBar.getView('navBarText').text			= 'PARAMÈTRES';
$.navBar.getView('menubutton').visible 	= false;
$.navBar.getView('backbutton').visible 		= true;
$.navBar.getView('backbutton').bcase 		= 'settings_page';

$.tabBar.getView('button2').bcase 			= 'settings_page';

Alloy.Globals.underlineItem($.TermsLbl);

/*********************************** HEIGHT ADJUSTMENTS ****************************************/

Alloy.Globals.tableViewHeight					= ( Ti.Platform.displayCaps.platformHeight - 82 ) - 60;
$.the_scroll_view.height 								= Alloy.Globals.tableViewHeight+2;

if(OS_ANDROID){
	
	Alloy.Globals.tableViewHeight				= ( Alloy.Globals.SCREEN_HEIGHT - 188 ) - 60;
	$.the_scroll_view.height 							= Alloy.Globals.tableViewHeight - 138;
	
}

/*********************************** MANUAL CLICKS ****************************************/

$.LogOut.addEventListener("click", function(e) {
	
	Alloy.Globals.preventDoubleClick(this);
	
	/* ******************************************** */
	/* ********* AJAX API QUERY (FAST WAY) ******** */
	/* ******************************************** */
	Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		Alloy.Globals.endPoints.userLogout,
		{
	        id_user: 													Alloy.Globals.THE_USER.id_user
		},
		{
			async_params: 				{},
			async_execution: 			function(JSON_returned,async_params_back){			
				
				if(typeof JSON_returned['error'] !== 'undefined'){
					
					Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);
					
				}
				else{
					
					///////////////Alloy.Globals.Logs.llog('---------------- USER LOGGED OUT ----------------');
					///////////////Alloy.Globals.Logs.llog(JSON_returned);
					
					Alloy.Globals.SignOut.Ready('signout_click',{});
			
					////////////
					//////////// CLOSE ALL
					////////////
					Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['settings_page']);
					setTimeout(function(){
						Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['homepage']);
					},750);
					
				}
				
			}
			
		},
		false,
		false 
	);
	
});		

$.Terms.addEventListener("click", function(e) {
	
	Alloy.Globals.preventDoubleClick(this);

	Alloy.Globals.app.goToFAST("page_3_e_1_terms", {});
	
});		

/*********************************** MANUAL LOAD ****************************************/

function switchChange1(e){
    
    if(e.source.manualTrigger && e.source.manualTrigger != -1 && this.getValue() == true){
    	this.manualTrigger 								= false;
    	if( $.s1.getValue() == true || $.s2.getValue() == true || $.s3.getValue() == true || $.s4.getValue() == true || $.s5.getValue() == true )return;
    }
    
    if(this.getValue() == true){
    	
    	$.s1.manualTrigger 								= false;
    	$.s2.manualTrigger 								= false;
    	$.s3.manualTrigger 								= false;
    	$.s4.manualTrigger 								= false;
    	$.s5.manualTrigger 								= false;
    	$.s1.setValue(true);
    	$.s2.setValue(true);
    	$.s3.setValue(true);
    	$.s4.setValue(true);
    	$.s5.setValue(true);
    	
    	Alloy.Globals.app_NOTIFICATIONS_start_process();
    	
    }
    else{
    	
    	if(e.source.manualTrigger != -1){
    		
	    	$.s1.setValue(false);
	    	$.s2.setValue(false);
	    	$.s3.setValue(false);
	    	$.s4.setValue(false);
	    	$.s5.setValue(false);
	    	
	    }
    	
    }
    
	this.manualTrigger 									= false;
    
}

function switchChange2(e){
    
    if( $.s1.getValue() == true && $.s2.getValue() == true && $.s3.getValue() == true && $.s4.getValue() == true && $.s5.getValue() == true ){
    	
    	$.sAll.manualTrigger 								= true;
    	$.sAll.setValue(true);
    	
    }
    
    if( $.s1.getValue() == false || $.s2.getValue() == false || $.s3.getValue() == false || $.s4.getValue() == false || $.s5.getValue() == false ){
    ///////if( $.s1.getValue() == false && $.s2.getValue() == false && $.s3.getValue() == false && $.s4.getValue() == false && $.s5.getValue() == false ){
    	
    	$.sAll.manualTrigger 								= -1;
    	$.sAll.setValue(false);
    	
    }
    
    if(e.source.manualTrigger && this.getValue() == true){
		this.manualTrigger 									= false;
    	return;
    }
	this.manualTrigger 										= false;
	
	var the_local_setting_value 							= this.getValue() == true ? 1 : 0;
	var the_local_setting_name 							= 'accept_push_messages';
	
	if( e.source.id == 's2' ){
		the_local_setting_name 							= 'accept_push_confirm_achat';
	}
	else if( e.source.id == 's3' ){
		the_local_setting_name 							= 'accept_push_confirm_vente';
	}
	else if( e.source.id == 's4' ){
		the_local_setting_name 							= 'accept_push_bde';
	}
	else if( e.source.id == 's5' ){
		the_local_setting_name 							= 'accept_push_by_swapbook';
	}
	
	/* ******************************************** */
	/* ********* AJAX API QUERY (FAST WAY) ******** */
	/* ******************************************** */
	Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		Alloy.Globals.endPoints.userSettingsSet,
		{
	        the_user: 												Alloy.Globals.THE_USER.id_user,
	        the_setting:											the_local_setting_name,
	        the_setting_value: 								the_local_setting_value
		},
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
						label: 															"Change a setting",
						action: 														"update setting value",
						value: 															1
					});
					
				}
				
			}
			
		},
		false,
		true 
	);
    
}

/*********************************** AUTO LOAD ****************************************/

function loadSettings(){

	/* ******************************************** */
	/* ********* AJAX API QUERY (FAST WAY) ******** */
	/* ******************************************** */
	Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		Alloy.Globals.endPoints.userSettingsGet,
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
						
						var the_setting 							= JSON_returned['output-array'][i];
						var the_setting_value 				= the_setting.setting_value == 1 ? true : false;
						
						if( the_setting.setting_name == 'accept_push_messages' ){
							$.s1.setValue(the_setting_value);
    						$.s1.manualTrigger 				= the_setting_value;
						}
						else if( the_setting.setting_name == 'accept_push_confirm_achat' ){
							$.s2.setValue(the_setting_value);
    						$.s2.manualTrigger 				= the_setting_value;
						}
						else if( the_setting.setting_name == 'accept_push_confirm_vente' ){
							$.s3.setValue(the_setting_value);
    						$.s3.manualTrigger 				= the_setting_value;
						}
						else if( the_setting.setting_name == 'accept_push_bde' ){
							$.s4.setValue(the_setting_value);
    						$.s4.manualTrigger 				= the_setting_value;
						}
						else if( the_setting.setting_name == 'accept_push_by_swapbook' ){
							$.s5.setValue(the_setting_value);
    						$.s5.manualTrigger 				= the_setting_value;
						}
						
					}
		
				}
				
			}
			
		},
		false,
		true 
	);
	
};

loadSettings();