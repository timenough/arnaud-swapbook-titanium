Alloy.Globals.POSSIBLE_USER 														= Ti.App.Properties.getString('user_object');
Alloy.Globals.THE_FUTURE_USER 													= {};
Alloy.Globals.THE_USER 																	= {};
Alloy.Globals.app_and_user_ready 													= false;
Alloy.Globals.no_dialogs_conflicts													= {};

Alloy.Globals.ENDPOINTS_INDEX													= Alloy.CFG.the_base_endpoint;
Alloy.Globals.THE_START_PAGE														= Alloy.CFG.the_start_controller; 		//////// 'page_1_a_1_home';
Alloy.Globals.BLUE_COLOR 																= Alloy.CFG.the_main_app_color1;
Alloy.Globals.BLUE_COLOR_v2 														= Alloy.CFG.the_main_app_color2; 		/////// PLUS CLAIRE
Alloy.Globals.BLUE_COLOR_v3 														= Alloy.CFG.the_main_app_color3; 		/////// PLUS FONCÉE
	
/* *************************************************************************** */
/* ******************* 1 = LOAD CUSTOM made JAVASCRIPT HELPERS ************* */
/* *************************************************************************** */

Alloy.Globals.Logs 																			= require('a___logger_and_alerter');
Alloy.Globals.Requests 																	= require('b___ajax_requests_maker_and_APIs_endPoints');
Alloy.Globals.tools 																			= require('c___tools');
Alloy.Globals.SignedIn 																		= require('d___ready_and_signed_in_process');
Alloy.Globals.SignIn 																			= require('e___signin_process');
Alloy.Globals.SignUp 																		= require('f___signup_process');
Alloy.Globals.SignOut 																		= require('g___signout_process');
Alloy.Globals.Start 																			= require('h___prestart_and_start');

/* ************************************************************************************** */
/* ******************* 2 = LOAD CUSTOM AppCelerator MODULES **************************** */
/* ************************************************************************************** */

Alloy.Globals.CloudPush 																	= OS_ANDROID ? require('ti.cloudpush') : require('ti.cloud');
Alloy.Globals.SocialSharing 															= Alloy.createWidget('com.alcoapps.socialshare');
Alloy.Globals.Loading 																		= Alloy.createWidget("nl.fokkezb.loading");

Alloy.Globals.Perms 																			= require('permissions');
Alloy.Globals.Fb 																				= require('facebook');
Alloy.Globals.the_u_is_on_tablet														= require('tablet');

Alloy.Globals.GoogleAnalytics 														= require('analytics.google');
Alloy.Globals.GoogleAnalytics.trackUncaughtExceptions 			= false;
Alloy.Globals.GoogleAnalytics.optOut 											= false;
Alloy.Globals.GoogleAnalytics.dryRun 											= false;
Alloy.Globals.GoogleAnalytics.dispatchInterval 							= 10;
Alloy.Globals.GoogleAnalyticsTracker	 										= Alloy.Globals.GoogleAnalytics.getTracker(Alloy.CFG.google_analytics_tracking_id);

/* ***************************************************************************** */
/* ******************* 3 = GET API ENDPOINTS  > AJAX API QUERY (FAST WAY) ******* */
/* **************************************************************************** */

if(typeof Alloy.Globals.endPoints == 'undefined')Alloy.Globals.Requests.RequestsMaker(
	OS_ANDROID ? 'POST' : 'GET',
	OS_ANDROID ? true : false,
	Alloy.Globals.ENDPOINTS_INDEX,
	{},
	{
		async_params: 							{},
		async_execution: 						function(JSON_returned,async_params_back){		
				
			if(
				typeof JSON_returned !== 'object' ||
				typeof JSON_returned['output-array'] === 'undefined'
			){
				
				Alloy.Globals.Logs.llog('');
				Alloy.Globals.Logs.llog('');
				Alloy.Globals.Logs.llog('');
				Alloy.Globals.Logs.llog('********************** STOP : UNABLE TO GET API ENDPOINTS **********************');
				Alloy.Globals.Logs.llog('');
				Alloy.Globals.Logs.llog('');
				Alloy.Globals.Logs.llog('');
				
				return;
				
			}
			else{
					
				Alloy.Globals.endPoints 													= JSON_returned['output-array'];
				
				Alloy.Globals.Logs.llog('');
				Alloy.Globals.Logs.llog('');
				Alloy.Globals.Logs.llog('');
				Alloy.Globals.Logs.llog('********************** API ENDPOINTS **********************');
				Alloy.Globals.Logs.llog('');
				Alloy.Globals.Logs.llog(Alloy.Globals.endPoints);
				Alloy.Globals.Logs.llog('');
				Alloy.Globals.Logs.llog('');
				Alloy.Globals.Logs.llog('');
				
/* ********************************************************************************************************************************************************************************************************************** */
/* ********************************************************************************************************************************************************************************************************************** */
/* ************************************************************************************** THE APPLICATION STARTS NOW *************************************************************************************************** */
/* ********************************************************************************************************************************************************************************************************************** */
/* ********************************************************************************************************************************************************************************************************************** */
/* ********************************************************************************************************************************************************************************************************************** */

/*

	| TOPO |
	
		1. > Titanium lance par défaut le controlleur "/controllers/index.js" en 1er : 
		
			1a. > va instancier le bouton de LOG-IN via "/lib/e___signin_process.js"
			1b. > va instancier le bouton de SIGN-UP via "/lib/f___signup_process.js"
			1c. > va checker si il y a une session UTILISATEUR côté appli. et côté backend via le bouton de SIGN-UP via "/lib/d___signed_in_process.js"
			
		2. > Le helper "/lib/d___signed_in_process.js" est utilisé : 
		
			2a. > si OUI il y a une session, le helper "/lib/h___prestart_and_start.js" est utilisé pour soit :
				2a1. > GOTO "/controllers/index_intro_1.js" si l'utilisateur n'a jamais vu l'introduction de l'application. 
					2a1a. > L'introduction de l'application est pilotée (clics) par le helper "/lib/e___signin_process.js"
				2a2. > GOTO "/controllers/page_1_a_1_home.js" la homepage
				
			2b > si NON on reste sur "/controllers/index.js" et ses 2 boutons

	| FIN DU TOPO |
	
	| SPLASH SCREEN HELPER |
	
	http://ticons.fokkezb.nl/#result
				
 */

/* ***************************************************************************** */
/* ******************* 4 = DECLARE ALL IMPORTANT GLOBALS ********************** */
/* ***************************************************************************** */

Alloy.Globals.DeviceToken 																= '';
Alloy.Globals.DeviceCoords 															= {};
Alloy.Globals.Device 																		= {
	version: 											Ti.Platform.version,
	versionMajor: 								parseInt(Ti.Platform.version.split(".")[0], 10),
	versionMinor: 								parseInt(Ti.Platform.version.split(".")[1], 10),
	width: 											(Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight) ? Ti.Platform.displayCaps.platformHeight : Ti.Platform.displayCaps.platformWidth,
	height: 											(Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight) ? Ti.Platform.displayCaps.platformWidth : Ti.Platform.displayCaps.platformHeight,
	dpi: 													Ti.Platform.displayCaps.dpi,
	orientation: 									Ti.Gesture.orientation == Ti.UI.LANDSCAPE_LEFT || Ti.Gesture.orientation == Ti.UI.LANDSCAPE_RIGHT ? "landscape" : "portrait"
};

Alloy.Globals.DA_TIME_COUNTER													= Math.floor(Date.now() / 1000);

Alloy.Globals.WindowsThatCouldBeOpenedManyTimes 			= {'page_1_a_1_onebook':10};
Alloy.Globals.Windows_ALREADY_Opened									= {};
Alloy.Globals.Windows_ALREADY_Opened_counter						= {};
Alloy.Globals.toCloseWindows 														= {};
Alloy.Globals.no_web_view_commands_conflicts							= {};
Alloy.Globals.deep_referenced_items_for_a_later_control	 		= {};

Alloy.Globals.SCREEN_WIDTH 														= (Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight) ? Ti.Platform.displayCaps.platformHeight : Ti.Platform.displayCaps.platformWidth;
Alloy.Globals.SCREEN_HEIGHT 														= (Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight) ? Ti.Platform.displayCaps.platformWidth : Ti.Platform.displayCaps.platformHeight;
Alloy.Globals.iPhoneShortWidth														= (OS_IOS && Ti.Platform.displayCaps.platformWidth < 341);
Alloy.Globals.backdropImageLeft 													= -Ti.UI.FILL * 0.15;
Alloy.Globals.backdropImageWidth												= Ti.UI.FILL;
Alloy.Globals.backdropImageHeight												= Ti.UI.FILL;

Alloy.Globals.startWebView_event  												= null;
Alloy.Globals.notifications_accept													= false;
Alloy.Globals.notifications_process_BINDED									= false;
Alloy.Globals.notifications_processing											= false;
Alloy.Globals.user_messenger_last_words										= {};

Alloy.Globals.underground_TIMERS_are_in_pause 						= false;
Alloy.Globals.cumul_badge_left_messages 									= 0;
Alloy.Globals.cumul_badge_left_notifications 								= 0;
Alloy.Globals.cumul_badge_right_users 										= 0;
Alloy.Globals.cumul_badge_right_friends 										= 0;
Alloy.Globals.MEMORIZED_tableView_cells									= {};
Alloy.Globals.MEMORIZED_tableView_cells['messages']			= '';
Alloy.Globals.MEMORIZED_tableView_cells['notifications']			= '';
Alloy.Globals.MEMORIZED_tableView_cells['users']					= '';
Alloy.Globals.MEMORIZED_tableView_cells['friends']					= '';

Alloy.Globals.tableView_datas_messages 									= [];
Alloy.Globals.tableView_datas_messages_cells 							= [];
Alloy.Globals.tableView_datas_notifications									= [];
Alloy.Globals.tableView_datas_notifications_cells						= [];
Alloy.Globals.tableView_datas_users												= [];
Alloy.Globals.tableView_datas_users_cells									= [];
Alloy.Globals.tableView_datas_friends											= [];
Alloy.Globals.tableView_datas_friends_cells									= [];

Alloy.Globals.the_user_is_on_the_app 											= true;
Alloy.Globals.the_user_is_on_one_conversation 							= false;
Alloy.Globals.the_u_is_on_landscape												= false;

/* **************************************************************************** */
/* ******************* 5 = GLOBAL APP NAVIGATION FUNCTION ******************** */
/* *************************************************************************** */

Alloy.Globals.app 																				= function() {
	
	return{

		openController: 																			function(data){
		   		
		   	var c 																						= this;
		   	var data 																					= data;
		   	var dataValue 																		= data.source.value; 
		   	
			/////////////////////////////////////////////////////////////
			//////////// GOOGLE ANALYTICS //////////// (https://github.com/Sitata/titanium-google-analytics/blob/master/example/app.js)
			/////////////////////////////////////////////////////////////
			
			Alloy.Globals.GoogleAnalyticsTracker.trackScreen({
				screenName: 																		"On Page Controller : "+c.controller
			});
			
			var time_of_opening_closing 												= Math.floor(Date.now() / 1000); 	
			var time_elapsed 																	= time_of_opening_closing - Alloy.Globals.DA_TIME_COUNTER;
			var last_controller 																	= Alloy.Globals.THE_START_PAGE;
			for (var last_controller_proof in Alloy.Globals.Windows_ALREADY_Opened){last_controller = last_controller_proof;}
			
			Alloy.Globals.GoogleAnalyticsTracker.trackTiming({
				category: 					"Time on pages",
				time: 							time_elapsed,
				name: 							"Spent time",
				label: 							"On the Controller : "+last_controller
			});

			Alloy.Globals.DA_TIME_COUNTER										= Math.floor(Date.now() / 1000);
			
		   	///////////
		   	/////////// CHECK IF THE PAGE IS NOT ALREADY OPENED
		   	///////////
		   	
		   	if( !Alloy.Globals.WindowsThatCouldBeOpenedManyTimes[c.controller] ){
		   		
		   		if( !Alloy.Globals.Windows_ALREADY_Opened[c.controller] ){
		   			
		   			Alloy.Globals.Windows_ALREADY_Opened[c.controller]= c.controller;

					setTimeout(function(){
						delete Alloy.Globals.Windows_ALREADY_Opened[c.controller];
					},3000);
		   			
		   		}
		   		else{
		   			
					Alloy.Globals.Logs.llog('@@@@@ LOCK OPEN : the page '+c.controller+' is already opened @@@@@');
		   			return;
		   			
		   		}
		   		
		   	}
		   	else{
		   		
		   		if(!Alloy.Globals.Windows_ALREADY_Opened_counter[c.controller])Alloy.Globals.Windows_ALREADY_Opened_counter[controller]= 0;
		   		
		   		Alloy.Globals.Windows_ALREADY_Opened_counter[c.controller]++;
		   		
		   		if(Alloy.Globals.Windows_ALREADY_Opened_counter[c.controller] >= Alloy.Globals.WindowsThatCouldBeOpenedManyTimes[c.controller]){
		   			
					Alloy.Globals.Logs.llog('@@@@@ LOCK OPEN LIMIT : the page '+c.controller+' could not be opened more than '+Alloy.Globals.WindowsThatCouldBeOpenedManyTimes[c.controller]+' times @@@@@');
		   			return;
		   			
		   		}
		   		
		   	}

		   	if(
		   		typeof Alloy.Globals.toCloseWindows['conversationspage'] != 'undefined' &&
		   		c.controller == 'page_2_a_1_messages_LANDSCAPE'
		   	){
		   		
		   		if(typeof Alloy.Globals.toCloseWindows['networkpage'] != 'undefined'){
		   			Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['networkpage']);
		   			delete Alloy.Globals.toCloseWindows['networkpage'];
		   		}
		   		return;
				
			}
		   	else if(
		   		typeof Alloy.Globals.toCloseWindows['networkpage'] != 'undefined' &&
		   		c.controller == 'page_2_b_1_network'
		   	){
		   		
		   		if(typeof Alloy.Globals.toCloseWindows['conversationspage'] != 'undefined'){
		   			Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['conversationspage']);
		   			delete Alloy.Globals.toCloseWindows['conversationspage'];
		   		}
		   		return;
				
			}
		   	
			c.setTouchEnabled(false);
			c.setOpacity(0.5);
			
			setTimeout(function(){
				
				c.setOpacity(1);
				
				var controllers 																	= Alloy.createController(c.controller, {passedData: dataValue}).getView();
			    Alloy.Globals.navigationDefault.openWindow(controllers);
				
			},100);
			
		    setTimeout(function(){
		    	
		    	c.setTouchEnabled(true);
		    	
		    },1000);
		   	
		},

		goTo: 																							function(controller,data){
		   	
		   	Alloy.Globals.CurrentWindow 												= controller;
		   	
			/////////////////////////////////////////////////////////////
			//////////// GOOGLE ANALYTICS //////////// (https://github.com/Sitata/titanium-google-analytics/blob/master/example/app.js)
			/////////////////////////////////////////////////////////////
			
			Alloy.Globals.GoogleAnalyticsTracker.trackScreen({
				screenName: 																		"On Page Controller : "+controller
			});
			
			var time_of_opening_closing 												= Math.floor(Date.now() / 1000); 	
			var time_elapsed 																	= time_of_opening_closing - Alloy.Globals.DA_TIME_COUNTER;
			var last_controller 																	= Alloy.Globals.THE_START_PAGE;
			for (var last_controller_proof in Alloy.Globals.Windows_ALREADY_Opened){last_controller = last_controller_proof;}
			
			Alloy.Globals.GoogleAnalyticsTracker.trackTiming({
				category: 					"Time on pages",
				time: 							time_elapsed,
				name: 							"Spent time",
				label: 							"On the Controller : "+last_controller
			});

			Alloy.Globals.DA_TIME_COUNTER										= Math.floor(Date.now() / 1000);
		   	
		   	///////////
		   	/////////// CHECK IF THE PAGE IS NOT ALREADY OPENED
		   	///////////
		   	
		   	if( !Alloy.Globals.WindowsThatCouldBeOpenedManyTimes[controller] ){
		   		
		   		if( !Alloy.Globals.Windows_ALREADY_Opened[controller] ){
		   			
		   			Alloy.Globals.Windows_ALREADY_Opened[controller]= true;

					setTimeout(function(){
						delete Alloy.Globals.Windows_ALREADY_Opened[controller];
					},3000);
		   			
		   		}
		   		else{
		   			
					Alloy.Globals.Logs.llog('@@@@@ LOCK OPEN : the page '+controller+' is already opened @@@@@');
		   			return;
		   			
		   		}
		   		
		   	}
		   	else{
		   		
		   		if(!Alloy.Globals.Windows_ALREADY_Opened_counter[controller])Alloy.Globals.Windows_ALREADY_Opened_counter[controller]= 0;
		   		
		   		Alloy.Globals.Windows_ALREADY_Opened_counter[controller]++;
		   		
		   		if(Alloy.Globals.Windows_ALREADY_Opened_counter[controller] >= Alloy.Globals.WindowsThatCouldBeOpenedManyTimes[controller]){
		   			
					Alloy.Globals.Logs.llog('@@@@@ LOCK OPEN LIMIT : the page '+controller+' could not be opened more than '+Alloy.Globals.WindowsThatCouldBeOpenedManyTimes[controller]+' times @@@@@');
		   			return;
		   			
		   		}
		   		
		   	}
		   	
		   	///////////
		   	/////////// ALL IS OK : OPEN
		   	///////////
		   	
			setTimeout(function(){
				
				if( 
					typeof data != 'undefined' &&
					typeof data.createWindow != 'undefined'
				){
					
					var controllers 																= Alloy.createController(controller, {passedData: data}).getView();
					var controller_window 													= Ti.UI.createWindow({
						width:											'100%',
						backgroundColor: 						'#ffffff',
						navBarHidden: 							true
					});
					controller_window.add(controllers);
					
					Alloy.Globals.navigationWindow 								= controller_window;
					Alloy.Globals.toCloseWindows[data.createWindow]= controller_window;

			    	Alloy.Globals.navigationDefault.openWindow(controller_window);
					
				}
				else{
					
					var controllers 																= Alloy.createController(controller, {passedData: data}).getView();
					if(!controllers)return;
					
			    	Alloy.Globals.navigationDefault.openWindow(controllers);
			    	
				}
				
				
			},100);
		   	
		},
		
		goToFAST:																					function(controller,data){
		   	
		   	Alloy.Globals.CurrentWindow 												= controller;
		   	
			/////////////////////////////////////////////////////////////
			//////////// GOOGLE ANALYTICS //////////// (https://github.com/Sitata/titanium-google-analytics/blob/master/example/app.js)
			/////////////////////////////////////////////////////////////
			
			Alloy.Globals.GoogleAnalyticsTracker.trackScreen({
				screenName: 																		"On Page Controller : "+controller
			});
			
			var time_of_opening_closing 												= Math.floor(Date.now() / 1000); 	
			var time_elapsed 																	= time_of_opening_closing - Alloy.Globals.DA_TIME_COUNTER;
			var last_controller 																	= Alloy.Globals.THE_START_PAGE;
			for (var last_controller_proof in Alloy.Globals.Windows_ALREADY_Opened){last_controller = last_controller_proof;}
			
			Alloy.Globals.GoogleAnalyticsTracker.trackTiming({
				category: 					"Time on pages",
				time: 							time_elapsed,
				name: 							"Spent time",
				label: 							"On the Controller : "+last_controller
			});

			Alloy.Globals.DA_TIME_COUNTER										= Math.floor(Date.now() / 1000);
		   	
		   	///////////
		   	/////////// CHECK IF THE PAGE IS NOT ALREADY OPENED
		   	///////////
		   	
		   	if( !Alloy.Globals.WindowsThatCouldBeOpenedManyTimes[controller] ){
		   		
		   		if( !Alloy.Globals.Windows_ALREADY_Opened[controller] ){
		   			
		   			Alloy.Globals.Windows_ALREADY_Opened[controller]= true;
					
					setTimeout(function(){
						delete Alloy.Globals.Windows_ALREADY_Opened[controller];
					},3000);
		   			
		   		}
		   		else{
		   			
					Alloy.Globals.Logs.llog('@@@@@ LOCK OPEN : the page '+controller+' is already opened @@@@@');
		   			return;
		   			
		   		}
		   		
		   	}
		   	else{
		   		
		   		if(!Alloy.Globals.Windows_ALREADY_Opened_counter[controller])Alloy.Globals.Windows_ALREADY_Opened_counter[controller]= 0;
		   		
		   		Alloy.Globals.Windows_ALREADY_Opened_counter[controller]++;
		   		
		   		if(Alloy.Globals.Windows_ALREADY_Opened_counter[controller] >= Alloy.Globals.WindowsThatCouldBeOpenedManyTimes[controller]){
		   			
					Alloy.Globals.Logs.llog('@@@@@ LOCK OPEN LIMIT : the page '+controller+' could not be opened more than '+Alloy.Globals.WindowsThatCouldBeOpenedManyTimes[controller]+' times @@@@@');
		   			return;
		   			
		   		}
		   		
		   	}
		   	
		   	///////////
		   	/////////// ALL IS OK : OPEN
		   	///////////

			Alloy.Globals.lateral_page_old												= null;
			if(typeof Alloy.Globals.toCloseWindows['lateral_page'] != 'undefined'){
				Alloy.Globals.lateral_page_old											= Alloy.Globals.toCloseWindows['lateral_page'];
			}
			
			setTimeout(function(){
	
				if( 
					typeof data != 'undefined' &&
					typeof data.createWindow != 'undefined'
				){
					
					var controllers 																= Alloy.createController(controller, {passedData: data}).getView();
					var controller_window 													= Ti.UI.createWindow({
						width:											'100%',
						backgroundColor: 						'#ffffff',
						navBarHidden: 							true
					});
					controller_window.add(controllers);
			    	Alloy.Globals.navigationDefault.openWindow(controller_window);
					
				}
				else{
					
					var controllers 																= Alloy.createController(controller, {passedData: data}).getView();
					if(!controllers)return;
					
			    	Alloy.Globals.navigationDefault.openWindow(controllers,{swipeBack: true});
			    	
				}
				
			},110);
			
			setTimeout(function(){
				
				if(Alloy.Globals.lateral_page_old != null)Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.lateral_page_old);
				
			},200);
		   	
		},
		
		closeWindow: 																			function (header, win){
			
			var slideIn  																			= Ti.UI.createAnimation({top:-60});
			header.animate(slideIn);
			
			setTimeout(function(){
				
				Alloy.Globals.navigationDefault.closeWindow(win);
				
			},200);
			
		},
		
		setOpacity: 																				function(elemento){
		   	
			elemento.setOpacity(0.5);
			
			setTimeout(function(){
				
				elemento.setOpacity(1);
				
			},200);
		   	
		}
		
	};
	
}();

/* *************************************************************************** */
/* ******************* 6 = THE LATERAL MENU ***********************************/
/* *************************************************************************** */

Alloy.Globals.menuOpened 																= false;
Alloy.Globals.searchOpened 															= false;

Alloy.Globals.openMenu 																	= function(){
	
   Alloy.Globals.sideMenu.getView('menuMask').visible 				= true;
   Alloy.Globals.sideMenu.getView('menuMask').animate({
        opacity: 1,
        duration: 150,
        curve: Ti.UI.ANIMATION_CURVE_LINEAR
    });
	
   Alloy.Globals.sideMenu.getView('menuOuter').animate({
        left: 0,
        duration: 300,
        curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
    });

};

Alloy.Globals.closeMenu																	= function(delay){
		
   Alloy.Globals.sideMenu.getView('menuOuter').animate({
        left: -280,
        duration: 350,
        curve: Ti.UI.ANIMATION_CURVE_LINEAR
    });
    
   Alloy.Globals.sideMenu.getView('menuMask').animate({
        opacity: 0,
        duration: 350,
        curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
    });
	
    setTimeout(function(){
				
			Alloy.Globals.sideMenu.getView('menuMask').visible	= false;
			
	},500);
	
};

/* *****************************************************************************/
/* ******************* 7 = HELPERS AND USEFUL FUNCTIONS ********************* */
/* *****************************************************************************/

Alloy.Globals.preventDoubleClick													= function(button){
	
	Alloy.Globals.Logs.llog('@@@@@ LOCK BUTTON @@@@@');
	
	if(button && typeof button.enabled != 'undefined')button.setEnabled(false);
	
    setTimeout(function(){
				
		if(button && typeof button.enabled != 'undefined')button.setEnabled(true);
			
	},2900);

};

Alloy.Globals.affect_referenced_item 												= function(name,attribute,new_value){
	
	Alloy.Globals.deep_referenced_items_for_a_later_control[name][attribute]= new_value;
	 
};

Alloy.Globals.underlineItem																= function(item){

	var terms_text 																				= item.text;
	var attributedText 																		= Ti.UI.createAttributedString({
		text : terms_text,
		attributes : [{
			type : Ti.UI.ATTRIBUTE_UNDERLINES_STYLE,
			range : [0, terms_text.length],
			value : Ti.UI.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
		}]
	});
	
	item.setAttributedString(attributedText);

};

Alloy.Globals.underlineItemRemove												= function(item){

	var terms_text 																				= item.text;
	var attributedText 																		= Ti.UI.createAttributedString({
		text : terms_text,
		attributes : []
	});
	
	item.setAttributedString(attributedText);

};

Alloy.Globals.attach_a_DatePicker													= function(window,window_name,item,bartitle,delete_global_object){

	//////////////
	////////////// INIT
	//////////////
	
	if(!Alloy.Globals.DatePickers){
		Alloy.Globals.DatePickers 														= {};
	}
	
	if(typeof delete_global_object != 'undefined'){
		delete Alloy.Globals.DatePickers[window_name+'_contains_'+item.id];
		delete Alloy.Globals.DatePickers[window_name];
		delete Alloy.Globals.DatePickers[item.id];
	}
	
	if(!Alloy.Globals.DatePickers[window_name]){
		Alloy.Globals.DatePickers[window_name] 							= window;
	}
	
	if(!Alloy.Globals.DatePickers[item.id]){
		Alloy.Globals.DatePickers[item.id] 											= {
			le_trigger:																				item,
			la_valeur:																				''
		};
		Alloy.Globals.DatePickers[item.id]['le_trigger'].touchEnabled= true;
		Alloy.Globals.DatePickers[item.id]['le_trigger'].editable 		= false;
	}
	else{
		var item_before 																		= JSON.stringify(Alloy.Globals.DatePickers[item.id]['le_trigger']);
		var item_after 																			= JSON.stringify(item); //////// if(item_after === item_before)
		delete Alloy.Globals.DatePickers[item.id]['le_trigger'];
		Alloy.Globals.DatePickers[item.id]['le_trigger'] 					= item;
		Alloy.Globals.DatePickers[item.id]['le_trigger'].touchEnabled= true;
		Alloy.Globals.DatePickers[item.id]['le_trigger'].editable 		= false;
	}
	
	Alloy.Globals.DatePickers[item.id]['la_valeur'] 							= item.cvalue ? (item.cvalue.length == 10 ? item.cvalue : (item.cvalue == -1 ? new Date().getTime() : new Date(item.cvalue*1000))): null;
	
	//////////////
	////////////// PICKER CREATION (OR NOT)
	//////////////
	
	if(!Alloy.Globals.DatePickers[item.id]['le_picker_c']){
		
		var datePicker_viewheight 	 													= 260;
		var datePicker_toolbar_height 	 											= 46;
		
		//////////////
		////////////// TIME
		//////////////

		var date 																						= new Date();
		var date_default 																		= Alloy.Globals.DatePickers[item.id]['la_valeur'] != null ? new Date(Alloy.Globals.DatePickers[item.id]['la_valeur']) : new Date;
		var date_max 																			= new Date((new Date()).valueOf() - (1000*60*60*24*365*18));
		if(Alloy.Globals.DatePickers[item.id]['le_trigger'].selectType == 'DATE')date_max= new Date();
		var datePickerMinYear 															= (date.getFullYear()) - 120;
		var datePickerMaxYear 															= date_max.getFullYear();
		var datePickerTargetField														= null;
		
		//////////////
		////////////// DOM CREATION
		//////////////
		
		var datePicker_view 																	= Ti.UI.createView({
			bottom:														(datePicker_viewheight*-1),
			height:														datePicker_viewheight,
			backgroundColor:										'white',
			width:															'100%',
			zIndex:														4000,
		});
		
		var datePicker_toolbar	 															= Ti.UI.createView({
			top: 																0,
			height: 														datePicker_toolbar_height,
			width:															'100%',
			backgroundColor: 										Alloy.Globals.BLUE_COLOR
		});
		
		var datePicker_toolbar_title_class_Object 								= {
			color:															'#ffffff',
			text: 															bartitle,
			textAlign: 													Ti.UI.TEXT_ALIGNMENT_CENTER,
			verticalAlign: 												Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
			top: 																0,
			width: 														'100%',
			height: 														'100%',
			font: {
					fontSize: 											28,
					fontFamily: 										'Wask_New_Bold'
			},
		};
		if(OS_IOS)datePicker_toolbar_title_class_Object.font 			= {fontSize: 24, fontFamily: 'WaskNew-Bold'};
		
		var datePicker_toolbar_title														= Ti.UI.createLabel(datePicker_toolbar_title_class_Object);
		var datePicker_toolbar_button_class_Object 						= {
			color:															'#ffffff',
			top: 																7,
			width: 														62,
			height: 														32,
			borderWidth: 											0,
			borderRadius: 											0,
			viewShadowRadius: 									0,
			touchEnabled: 											true,
			backgroundColor: 										Alloy.Globals.BLUE_COLOR_v3,
			textAlign: 													Ti.UI.TEXT_ALIGNMENT_CENTER,
			verticalAlign: 												Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
			font:{
				fontSize: 												15,
				fontFamily: 											'Wask_New_Bold'
			},
		};
		if(OS_IOS)datePicker_toolbar_button_class_Object.font 		= {fontSize: 19, fontFamily: 'WaskNew-Bold'};
		
		var datePicker_toolbar_button_left											= Ti.UI.createLabel(datePicker_toolbar_button_class_Object);
		datePicker_toolbar_button_left.left 											= 7;
		datePicker_toolbar_button_left.text 										= 'Annuler';
		
		var datePicker_toolbar_button_right										= Ti.UI.createLabel(datePicker_toolbar_button_class_Object);
		datePicker_toolbar_button_right.right 									= 7;
		datePicker_toolbar_button_right.text 										= 'OK';
		datePicker_toolbar_button_right.backgroundColor 				= '#ffffff';
		datePicker_toolbar_button_right.color 									= Alloy.Globals.BLUE_COLOR;
		
		var datePicker 																			= Ti.UI.createPicker({
			locale: 														'fr-FR',
			width:															'100%',
			top: 																datePicker_toolbar_height,
			height: 														datePicker_viewheight-datePicker_toolbar_height,
			type: 															Ti.UI.PICKER_TYPE_DATE,
			dateTimeColor:											Alloy.Globals.BLUE_COLOR,
			minDate: 													new Date(datePickerMinYear,0,1),
			maxDate:													new Date(datePickerMaxYear,date_max.getMonth(),date_max.getDate()),
			value: 															new Date(date_default.getFullYear(),date_default.getMonth(),date_default.getDate())
		});
		
		datePicker_toolbar.add(datePicker_toolbar_button_left);
		datePicker_toolbar.add(datePicker_toolbar_title);
		datePicker_toolbar.add(datePicker_toolbar_button_right);
		datePicker_view.add(datePicker_toolbar);
		datePicker_view.add(datePicker);
		
		Alloy.Globals.DatePickers[item.id]['le_picker'] 						= datePicker;
		Alloy.Globals.DatePickers[item.id]['le_picker_c'] 					= datePicker_view;
		Alloy.Globals.DatePickers[item.id]['le_picker_bouton_cancel']= datePicker_toolbar_button_left;
		Alloy.Globals.DatePickers[item.id]['le_picker_bouton_done']= datePicker_toolbar_button_right;
		
	}
	
	var datePicker_slide_in 																= {bottom:0,curve:Ti.UI.ANIMATION_CURVE_EASE_OUT,duration:450};
	var datePicker_out 																		= {bottom:(datePicker_viewheight*-1),curve:Ti.UI.ANIMATION_CURVE_LINEAR,duration:350};
	
	//////////////
	////////////// EVENTS
	//////////////
	
	if(!Alloy.Globals.DatePickers[item.id]['le_picker_fonction_cancel']){
		
		Alloy.Globals.DatePickers[item.id]['le_picker_fonction_cancel']= function(e){
			
			////////Alloy.Globals.Logs.llog('>>> CANCEL POUR : '+item.id);
			
			if(!Alloy.Globals.DatePickers[item.id]['le_picker_c'].down)Alloy.Globals.DatePickers[item.id]['le_picker_c'].animate(datePicker_out);
			Alloy.Globals.DatePickers[item.id]['le_picker_c'].down 	= true;
					
		};
		
		Alloy.Globals.DatePickers[item.id]['le_picker_bouton_cancel'].addEventListener('click',Alloy.Globals.DatePickers[item.id]['le_picker_fonction_cancel']);
		
	}
	
	if(!Alloy.Globals.DatePickers[item.id]['le_picker_fonction_change']){
		
		Alloy.Globals.DatePickers[item.id]['le_picker_fonction_change']= function(e){
			
			////////Alloy.Globals.Logs.llog('>>> CHANGE VALUE POUR : '+item.id);
			
			Alloy.Globals.DatePickers[item.id]['la_valeur']					= e.value;
			
		};
		
		Alloy.Globals.DatePickers[item.id]['le_picker'].addEventListener('change',Alloy.Globals.DatePickers[item.id]['le_picker_fonction_change']);
		
	}
	
	if(!Alloy.Globals.DatePickers[item.id]['le_picker_fonction_done']){
		
		Alloy.Globals.DatePickers[item.id]['le_picker_fonction_done']= function(e){
				
			Alloy.Globals.preventDoubleClick(this);
			
			////////Alloy.Globals.Logs.llog('>>> CLICK DATES POUR : '+item.id);
			
			if( 
				Alloy.Globals.DatePickers[item.id]['la_valeur'] == '' ||
				Alloy.Globals.DatePickers[item.id]['la_valeur'] == null
			){
		
				Alloy.Globals.Logs.aalert('Merci de bien sélectionner une date.','','','OK',null,null,null,null,true);
				return;
		
			}
			else{
				
				////////Alloy.Globals.Logs.llog('>>> DONE POUR : '+item.id);
				
				var selected_date 																= new Date(Alloy.Globals.DatePickers[item.id]['la_valeur']);
				var selected_date_month 												= selected_date.getMonth()+1;
				var selected_date_day 														= selected_date.getDate();
				
				var reformat_date1 															= ( selected_date_day < 10 ? '0'+selected_date_day : selected_date_day )+'/'+( selected_date_month < 10 ? '0'+selected_date_month : selected_date_month )+'/'+selected_date.getFullYear();
				var reformat_date2 															= selected_date.getFullYear()+'-'+( selected_date_month < 10 ? '0'+selected_date_month : selected_date_month )+'-'+( selected_date_day < 10 ? '0'+selected_date_day : selected_date_day );
				
				Alloy.Globals.DatePickers[item.id]['le_trigger'].setValue(reformat_date1);
				Alloy.Globals.DatePickers[item.id]['le_trigger'].cvalue	= reformat_date2;
				
				///////// TRIGGER CALLBACK
				
				if(Alloy.Globals.DatePickers[item.id]['le_trigger'].onSelect)
					eval(''+Alloy.Globals.DatePickers[item.id]['le_trigger'].onSelect+'(Alloy.Globals.DatePickers[item.id][\'le_trigger\'],reformat_date2);');
				
				if(!Alloy.Globals.DatePickers[item.id]['le_picker_c'].down)Alloy.Globals.DatePickers[item.id]['le_picker_c'].animate(datePicker_out);
				Alloy.Globals.DatePickers[item.id]['le_picker_c'].down= true;
				
			}
			
		};

		Alloy.Globals.DatePickers[item.id]['le_picker_bouton_done'].addEventListener('click',Alloy.Globals.DatePickers[item.id]['le_picker_fonction_done']);
					
	}
	
	if(!Alloy.Globals.DatePickers[window_name+'_contains_'+item.id])Alloy.Globals.DatePickers[window_name].add(Alloy.Globals.DatePickers[item.id]['le_picker_c']);
	Alloy.Globals.DatePickers[window_name+'_contains_'+item.id]= true;
	
	//////////////
	////////////// EVENTS HANDLING
	//////////////

	if(!Alloy.Globals.DatePickers[item.id]['le_container_fonction_click']){
		
		Alloy.Globals.DatePickers[item.id]['le_container_fonction_click']= function(e){
			
			////////Alloy.Globals.Logs.llog('>>> CONTAINER CLICK POUR : '+item.id);
			////////Alloy.Globals.Logs.llog(e.source.id);
				
			if(e.source.id === item.id){
				
				////////
				Alloy.Globals.Logs.llog('>>> SHOW() POUR : '+item.id);
				
				item.cvalue 																		= Alloy.Globals.DatePickers[item.id]['le_trigger'].cvalue;
				var date_of_the_field 														= item.cvalue ? (item.cvalue.length == 10 ? item.cvalue : (item.cvalue == -1 ? new Date().getTime() : new Date(item.cvalue*1000))): null;
				var date_default 																= date_of_the_field != null ? new Date(date_of_the_field) : new Date; /////Alloy.Globals.Logs.llog(item.cvalue);Alloy.Globals.Logs.llog(date_default);
				
				Alloy.Globals.DatePickers[item.id]['le_picker'].setValue(new Date(date_default.getFullYear(),date_default.getMonth(),date_default.getDate()));
		
				Alloy.Globals.DatePickers[item.id]['le_picker_c'].down= false;
				Alloy.Globals.DatePickers[item.id]['le_picker_c'].animate(datePicker_slide_in);
				
			}
			else{
				
				////////Alloy.Globals.Logs.llog('>>> HIDE() POUR : '+item.id);
				
				if(!Alloy.Globals.DatePickers[item.id]['le_picker_c'].down)Alloy.Globals.DatePickers[item.id]['le_picker_c'].animate(datePicker_out);
				Alloy.Globals.DatePickers[item.id]['le_picker_c'].down= true;
				
			}
			
		};
		
		Alloy.Globals.DatePickers[window_name].addEventListener('click',Alloy.Globals.DatePickers[item.id]['le_container_fonction_click']);

	}
	
};

Alloy.Globals.showSelect_BIG_or_SHORT										= function(e){

	var source_item 																			= e.source;
	var type 																							= source_item.selectType;

	if(type == 'NONE')return;
	
	Alloy.Globals.preventDoubleClick(this);
	
	var title1 																						= source_item.selectBigLineOne;
	var title2 																						= source_item.selectBigLineTwo;
	var select_short_options_keys 													= source_item.selectSHORTKeys ? source_item.selectSHORTKeys.split(',') : [];
	var select_short_options_values													= source_item.selectSHORTVals ? source_item.selectSHORTVals.split(',') : [];
	var select_short_cancel 																= select_short_options_keys.length-1;
	var select_short_callback																= source_item.onSelect;
	
	if(type == 'BIG'){
		
		/////////
		///////// DELEGATE DATA TO EACH TABLEVIEW ROWS ON CLICK
		/////////
		
		Alloy.Globals.loadReloadSearchBooks_display_tableView.inherited_object 														= source_item;
		
		/////////
		///////// DISPLAY SEARCH BAR
		/////////
		
		Alloy.Globals.deep_referenced_items_for_a_later_control['topbar_on_profile_page'].visible 							= true;
		Alloy.Globals.deep_referenced_items_for_a_later_control['bar_line1_on_profile_page'].text							= title1;
		Alloy.Globals.deep_referenced_items_for_a_later_control['bar_line2_on_profile_page'].text							= title2;
		Alloy.Globals.deep_referenced_items_for_a_later_control['modal_search_on_profile_page'].zIndex 				= 1009;
		Alloy.Globals.deep_referenced_items_for_a_later_control['modal_search_on_profile_page'].top 					= 80;
		
		///////// 
		///////// ALTER SEARCH QUERY (SEARCH CASE)
		/////////
		
		if(source_item.id != 'userParcoursRetenu'){
			
			Alloy.Globals.loadReloadSearchBooks_display_tableView.rowDefaultImage												= Alloy.Globals.endPoints.defaultUniversiteImage;
			Alloy.Globals.deep_referenced_items_for_a_later_control['modal_searchfield_on_profile_page'].hintText= 'Recherches un établissement...';
	
			if( source_item.jparent == 'fieldFive' && parseInt(Alloy.Globals.pathway_CURRENT_ID_UNIVERSITE) > 0 ){
				Alloy.Globals.deep_referenced_items_for_a_later_control['modal_searchfield_on_profile_page'].hintText= 'Recherches un diplôme...';
				Alloy.Globals.loadReloadSearchBooks_API_endpoint_params.id_universite 												= Alloy.Globals.pathway_CURRENT_ID_UNIVERSITE;
				Alloy.Globals.loadReloadSearchBooks_display_tableView.rowDefaultImage											= Alloy.Globals.endPoints.defaultDiplomeImage;
				delete Alloy.Globals.loadReloadSearchBooks_API_endpoint_params.id_diplome;
				delete Alloy.Globals.loadReloadSearchBooks_API_endpoint_params.id_formation;
			}
			else if( source_item.jparent == 'fieldSix' && parseInt(Alloy.Globals.pathway_CURRENT_ID_DIPLOME) > 0 ){
				Alloy.Globals.deep_referenced_items_for_a_later_control['modal_searchfield_on_profile_page'].hintText= 'Recherches une formation...';
				Alloy.Globals.loadReloadSearchBooks_API_endpoint_params.id_diplome 												= Alloy.Globals.pathway_CURRENT_ID_DIPLOME;
				Alloy.Globals.loadReloadSearchBooks_display_tableView.rowDefaultImage											= Alloy.Globals.endPoints.defaultFormationImage;
				delete Alloy.Globals.loadReloadSearchBooks_API_endpoint_params.id_formation;
			}
			else if( source_item.jparent == 'fieldEleven' && parseInt(Alloy.Globals.pathway_CURRENT_ID_FORMATION) > 0 ){
				Alloy.Globals.deep_referenced_items_for_a_later_control['modal_searchfield_on_profile_page'].hintText= 'Recherches un parcours...';
				Alloy.Globals.loadReloadSearchBooks_API_endpoint_params.id_formation 												= Alloy.Globals.pathway_CURRENT_ID_FORMATION;
				Alloy.Globals.loadReloadSearchBooks_display_tableView.rowDefaultImage											= Alloy.Globals.endPoints.defaultParcoursImage;
			}
			else{
				delete Alloy.Globals.loadReloadSearchBooks_API_endpoint_params.id_universite;
				delete Alloy.Globals.loadReloadSearchBooks_API_endpoint_params.id_diplome;
				delete Alloy.Globals.loadReloadSearchBooks_API_endpoint_params.id_formation;
			}
			
			Alloy.Globals.loadReloadSearchBooks_API_endpoint_params.search 															= source_item.value.trim();
			Alloy.Globals.loadReloadSearchBooks_use_custom_results_array 																	= false;
			Alloy.Globals.deep_referenced_items_for_a_later_control['modal_searchfield_on_profile_page'].prevent = true;
			Alloy.Globals.deep_referenced_items_for_a_later_control['modal_searchfield_on_profile_page'].setValue(source_item.value);
			
			delete Alloy.Globals.loadReloadSearchBooks_API_endpoint_params.local_search;
		
		}
		
		///////// 
		///////// DEFINE LOCAL RESULTS (FAVORITE PATHWAY CASE)
		/////////
		
		else{
			
			Alloy.Globals.deep_referenced_items_for_a_later_control['modal_searchfield_on_profile_page'].hintText= 'Recherches un parcours...';
			Alloy.Globals.loadReloadSearchBooks_use_custom_results_array 																	= Alloy.Globals.loadReloadSearchBooks_possible_custom_results_array;
			Alloy.Globals.loadReloadSearchBooks_API_endpoint_params.local_search 													= 'yes';
			
		}
		
		/////////
		///////// INIT THE ALTERED SEARCH
		/////////
		
		Alloy.Globals.loadReloadSearchBooks_igniter();
		
		Alloy.Globals.deep_referenced_items_for_a_later_control['modal_searchfield_on_profile_page'].focus();

	}
	else if(type == 'SHORT'){
	
		if(Dialog_for_SHORT_select != null)delete Dialog_for_SHORT_select;
		
		var localOptions 																		= {
			title: 																						title1,
			cancel: 																					select_short_cancel,
			options: 																					select_short_options_keys,
			selectedIndex: 																		source_item.cvalue,
			persistent: 																				false
		};
		
		var Dialog_for_SHORT_select 													= Ti.UI.createOptionDialog(localOptions);
		
		Dialog_for_SHORT_select.addEventListener('click',function(ev){
			
			delete Dialog_for_SHORT_select;
			
			var selectedDialogIndex 														= ev.index;
		
			/************** The USER CANCEL ***********/
			
			if(selectedDialogIndex == select_short_cancel){
				
				Alloy.Globals.Logs.llog('USER CANCEL');
		
				delete Dialog_for_SHORT_select;
				var Dialog_for_SHORT_select 											= null;
				
			}
			
			/************** The USER CHOICE ***********/
			
			else{

				source_item.value 																= select_short_options_keys[selectedDialogIndex];
				source_item.cvalue 															= select_short_options_values[selectedDialogIndex];

				/////////
				///////// CHOICE CALLBACK
				/////////
				
				eval(''+select_short_callback+'(source_item,selectedDialogIndex);');
				
			}
			
		}); 
	
		Dialog_for_SHORT_select.show();
		
	}
	
};

Alloy.Globals.choiceSelect_BIG_or_SHORT									= function(item,choice){
	
	Alloy.Globals.Logs.llog('------ USER FINAL CHOICE (choiceSelect_BIG_or_SHORT) ------');

	/////////// 
	/////////// CASE 1 = PATHWAY TYPE SELECT (SWITCH)
	/////////// 
	
	if(item.id.indexOf('_type') > -1){
		
		Alloy.Globals.Logs.llog('------ CASE 1 = PATHWAY TYPE SELECT ------');
		
		var start_point_for_children_deletion 										= item.selectCase == 'edition' ? 2 : 1;
		var children 																				= Alloy.Globals.Dialog.getView('theMessagesAlternative').children.slice(0);
		
		for (var i = start_point_for_children_deletion; i < children.length+1; ++i){
			Alloy.Globals.Dialog.getView('theMessagesAlternative').remove(children[i]);
		}
		
		Alloy.Globals.attach_and_open_a_sub_Form({source:{Ref:item.kparent,NewType:item.cvalue}},Alloy.Globals.Dialog.getView('theMessagesAlternative'));
		
	}
	
	/////////// 
	/////////// CASE X
	///////////
	
	else{
		
		Alloy.Globals.Logs.llog(JSON.stringify(item));
	
	}

};

Alloy.Globals._add_Friend_PROCESSfunction_1							= function(object_received){
	
	Alloy.Globals.Logs.llog('--------> AJOUT AMIS étape 1');
	Alloy.Globals.Logs.llog(object_received);
	
	request_input																					= [];
	request_input['async_execution']												= Alloy.Globals._add_Friend_PROCESSfunction_2;
	request_input['async_params']													= {
		e:																									object_received.cell
	};
	request_input['params']																= {
		from_uid: 																					object_received.base_user_id,
		to_uid: 																						object_received.id_user,
		from_uid_push_text:																	object_received.base_user_push_message,
		from_uid_push_img: 																	object_received.base_user_push_image,
		from_uid_name:																			object_received.base_user_nom_prenom
	};
	
	////////Alloy.Globals.Logs.llog(request_input['params']);
	
	/* ********* AJAX API QUERY ********* */
	Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		Alloy.Globals.endPoints.friendshipCreate,
		request_input['params'],
		request_input,
		false,
		false
	);
	
};

Alloy.Globals._add_Godfather_PROCESSfunction_1						= function(object_received){
	
	Alloy.Globals.Logs.llog('--------> AJOUT PARRAIN étape 1');
	Alloy.Globals.Logs.llog(object_received);
	
	request_input																					= [];
	request_input['async_execution']												= Alloy.Globals._add_Godfather_PROCESSfunction_2;
	request_input['async_params']													= {
		e:																									object_received.cell
	};
	request_input['params']																= {
		from_uid: 																					object_received.base_user_id,
		to_uid: 																						object_received.id_user,
		from_uid_push_text:																	object_received.base_user_push_message,
		from_uid_push_img: 																	object_received.base_user_push_image,
		from_uid_name:																			object_received.base_user_nom_prenom
	};
	
	/* ********* AJAX API QUERY ********* */
	Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		Alloy.Globals.endPoints.mentoringCreate,
		request_input['params'],
		request_input,
		false,
		false
	);
	
};

Alloy.Globals._add_Friend_PROCESSfunction_2							= function(JSON_returned,local_params){
	
	Alloy.Globals.Logs.llog('--------> AJOUT AMIS étape 2');

	if(
		typeof JSON_returned['error'] !== 'undefined'
	){
		
		Alloy.Globals.Logs.llog(JSON_returned);
	
		/*********/
		/* ALERT */
		/*********/
		Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','Retenter',null,null,null,null);
		
	}
	else{
		
		//////////// GOOGLE ANALYTICS 
		
		Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
			category: 																				"App. social behaviours",
			label: 																						"Request a friendship",
			action: 																					"want to invite someone in personal network",
			value: 																						1
		});
		
		Alloy.Globals.Logs.llog('---------------- FRIEND REQUEST SENT ----------------');
		Alloy.Globals.Logs.llog(JSON_returned);
		
		if(local_params.e.source.just_affect_visibility){
			local_params.e.source.visible 												= false;
		}
		else{
			local_params.e.source.backgroundColor 							= 'silver';
			local_params.e.source.user_id 											= 'done';
		}
		
		Alloy.Globals.Logs.aalert_close();
		
	}

};

Alloy.Globals._add_Godfather_PROCESSfunction_2						= function(JSON_returned,local_params){
	
	Alloy.Globals.Logs.llog('--------> AJOUT PARRAIN étape 2');

	if(
		typeof JSON_returned['error'] !== 'undefined'
	){
		
		Alloy.Globals.Logs.llog(JSON_returned);
	
		/*********/
		/* ALERT */
		/*********/
		Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','Retenter',null,null,null,null);
		
	}
	else{
		
		//////////// GOOGLE ANALYTICS 
		
		Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
			category: 																				"App. social behaviours",
			label: 																						"Request a mentoring relationship",
			action: 																					"want someone be his godfather",
			value: 																						1
		});
		
		Alloy.Globals.Logs.llog('---------------- GODFATHER REQUEST SENT ----------------');
		Alloy.Globals.Logs.llog(JSON_returned);
		
		if(local_params.e.source.just_affect_visibility){
			local_params.e.source.visible 												= false;
		}
		else{
			local_params.e.source.backgroundColor 							= 'silver';
			local_params.e.source.user_id 											= 'done';
		}
		
		Alloy.Globals.Logs.aalert_close();
		
	}

};

Alloy.Globals.openConversationBetween 										= function(user1_id,user2_id){
	
	if(!Alloy.Globals.endPoints.conversationTest)return;
	
	/* ******************************************** */
	/* ********* AJAX API QUERY (FAST WAY) ******** */
	/* ******************************************* */
	Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		Alloy.Globals.endPoints.conversationTest,
		{
    		id_user: 										 	user1_id,
    		id_user_talking_with: 					user2_id
		},
		{
			NO_LIMIT: 						true,
			async_params: 				{},
			async_execution: 			function(JSON_returned,async_params_back){			
				if(typeof JSON_returned['error'] !== 'undefined'){
					
					Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);
					
				}
				else{
					
					///////////////Alloy.Globals.Logs.llog('---------------- CONVERSATION RETRIEVED ----------------');
					///////////////Alloy.Globals.Logs.llog(JSON_returned);
					
					if(typeof(JSON_returned['output-array']) == 'undefined')return;
							
					if(typeof Alloy.Globals.toCloseWindows['lateral_page'] != 'undefined'){
						Alloy.Globals.lateral_page_old											= Alloy.Globals.toCloseWindows['lateral_page'];
					}
					
					var conv_theme 			= JSON_returned['output-array']['user_civilite'] == 'M' ? 'garcon' : 'fille';
					var conv_image 			= JSON.parse(JSON_returned['output-array']['user_photos_url_json']);
					
					if(conv_image.current)Alloy.Globals.app.goTo("page_2_a_2_oneconversation",{
						id: 						JSON_returned['output-array']['id_conversation'],
						titre: 					JSON_returned['output-array']['user_prenom']+' '+JSON_returned['output-array']['user_nom'],
						type: 					'duo',
						theme: 				conv_theme,
						image: 				conv_image.current,
						after_sale: 			false,
						createWindow: 	'quick_chat_page',
						hide_lateral_bottom_buttons: true
					});
				    
				}
			}
		},
		false,
		true 
	);
	
};

Alloy.Globals.askCreditsTransfer 													= function(user_id,sale_id){
	
	if(!Alloy.Globals.endPoints.userSaleUpdate)return;

	/* ******************************************** */
	/* ********* AJAX API QUERY (FAST WAY) ******** */
	/* ******************************************* */
	Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		Alloy.Globals.endPoints.userSaleUpdate,
		{
    		id_user: 										 	user_id,
    		id_sale: 											sale_id,
    		field_name: 									'sale_status',
    		field_value: 									'banktrans_requested'
		},
		{
			NO_LIMIT: 						true,
			async_params: 				{},
			async_execution: 			function(JSON_returned,async_params_back){			
				if(typeof JSON_returned['error'] !== 'undefined'){
					
					Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);
					
				}
				else{
					
					//////////// GOOGLE ANALYTICS
					
					Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
						category: 																	"User account management",
						label: 																			"Ask a bank transfer of earnings",
						action: 																		"request his money",
						value: 																			1
					});
					
					///////////////Alloy.Globals.Logs.llog('---------------- TRANSACTION UPDATED ----------------');
					///////////////Alloy.Globals.Logs.llog(JSON_returned);
					
					Alloy.Globals.Logs.aalert(
						'DEMANDE ENVOYÉE',
						'Un adminsitrateur de Swapbook créditera ton compte du montant qui t\'est dû, après vérification, sous 48 heures max.',
						null,
						'OK',
						Alloy.Globals.loadRefreshMyTransactions(),
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
	
};

/* *************************************************************************** */
/* ********************* 8 = PHOTO SCANNING ********************************* */
/* ************************************************************************** */

Alloy.Globals.app_card_scanner 														= require('com.likelysoft.cardio');
Alloy.Globals.app_image_scanner 													= require('ti.barcode');
Alloy.Globals.app_image_scanner.allowRotation 							= true;
Alloy.Globals.app_image_scanner.useLED										= false;

/* *************************************************************************** */
/* ******************* 9 = MEDIAS AND IMAGES ********************************* */
/**************************************************************************** */

var photoDir 																						= Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'SwapBook');
if(!photoDir.exists())photoDir.createDirectory();

Alloy.Globals.app_image_factory 													= require('ti.imagefactory');

Alloy.Globals.app_image__pre_dialog_options 								= {
	cancel: 2,
	options:[
		'Appareil photo',
		'Bibliothèque Photo',
		'Annuler',
	],
	selectedIndex: 2,
	destructive: 2,
	persistent: false
};

Alloy.Globals.device_cameras 														= Ti.Media.availableCameras;

Alloy.Globals.handler_for_camera_or_gallery_dialog						= function(_dialog_SelectedMode,_dialog_CropDimension,_dialog_ImageExtension,_dialog_Force_Square,_dialog_ImageCDNPath,_dialog_Endpoint,_dialog_AfterFunction,_dialog_AfterFunctionParams,_dialog_CancelFunction) {

	var selectedDialogIndex 																= _dialog_SelectedMode.index;
	
	/************** 1 = The USER has choosen the CAMERA ***********/
	
	if(selectedDialogIndex == 0){

		if( OS_IOS && !Ti.Media.isCameraSupported ){
			Alloy.Globals.Logs.aalert('Erreur','Ton smartphone (device) n\'a aucun appareil photo disponible.','','OK',null,null,null,null);
			return;
		}
		
		if( OS_IOS && !Ti.Media.hasCameraPermissions() ){
			Alloy.Globals.Logs.aalert('Erreur','Swapbook n\'est pas/plus autorisé à accéder à ton appareil photo.','Merci de revérifier tes réglages.','OK',null,null,null,null);
			setTimeout(function(){
				Ti.Media.requestCameraPermissions(function(e){});
			},2000);
			return;
		}
				
		Ti.Media.showCamera({
		
			allowEditing: 																			false,
			saveToPhotoGallery: 															true, 
			animated: 																				true, 
			autorotate: 																				true, 
			showControls:  																		false,
			overlay: 																					Alloy.Globals.overlay_for_camera('native','Prends la meilleure photo...',_dialog_Force_Square),
			mediaTypes: 																			[Ti.Media.MEDIA_TYPE_PHOTO, Ti.Media.MEDIA_TYPE_LIVEPHOTO/*,Ti.Media.MEDIA_TYPE_VIDEO*/],
			success:																					function(camera_event) {

				Alloy.Globals.app_send_photo_to_API_server(
					camera_event,
					_dialog_CropDimension,
					_dialog_ImageExtension,
					_dialog_Force_Square,
					_dialog_ImageCDNPath,
					_dialog_Endpoint,
					_dialog_AfterFunction,
					_dialog_AfterFunctionParams
				);
				
			},
			cancel:																					function() {
				
				_dialog_CancelFunction();
				
			},
			error: 																						function(error){
				
				if (error.code == Ti.Media.NO_CAMERA) {
					
					Alloy.Globals.Logs.aalert('Erreur Swapbook','Ton smartphone ne dispose pas d\'un appareil photo','','OK',null,null,null,null);
					
				} 
				else{
					
					Alloy.Globals.Logs.aalert('Erreur Swapbook','Impossible d\'accéder à ton appareil photo. Code Erreur : '+error.code,'','OK',null,null,null,null);
	
				}
				
			}
			
		}); /* ANDROID : https://github.com/appcelerator/titanium_mobile/pull/8868 */
		
	}
	
	/************** 2 = The USER has choosen the PHOTO GALLERY ***********/
	
	else if(selectedDialogIndex == 1){
		
		if( OS_IOS && !Ti.Media.hasPhotoGalleryPermissions() ){
			Alloy.Globals.Logs.aalert('Erreur','Swapbook n\'est pas/plus autorisé à accéder à ta bibliothèque.','Merci de revérifier tes réglages.','OK',null,null,null,null);
			setTimeout(function(){
				Ti.Media.requestPhotoGalleryPermissions(function(e){});
			},2000);
			return;
		}
		
		Ti.Media.openPhotoGallery({
			
			allowImageEditing: 																_dialog_Force_Square,
			success: 																				function(gallery_event) {

				Alloy.Globals.app_send_photo_to_API_server(
					gallery_event,
					_dialog_CropDimension,
					_dialog_ImageExtension,
					_dialog_Force_Square,
					_dialog_ImageCDNPath,
					_dialog_Endpoint,
					_dialog_AfterFunction,
					_dialog_AfterFunctionParams
				);
				
			 },
			cancel:																					function() {
				
				_dialog_CancelFunction();
				
			},
			error: 																						function(error) {
				
				Alloy.Globals.Logs.aalert('Erreur Swapbook','Impossible d\'accéder à ta bibliothèque photo. Code Erreur : '+error.code,'','OK',null,null,null,null);

			}
			
		});
		
	}
	
	/************** 3 = The USER CANCEL ***********/
	
	else if(selectedDialogIndex == 2){
		
		_dialog_CancelFunction();
		
	}
	
};

Alloy.Globals.app_send_photo_to_API_server								= function(Titanium_event,resizeSize,extension,square,cdnName,endpoint,endpoint_callback_function,endpoint_params_object){

	if(Titanium_event.mediaType != Ti.Media.MEDIA_TYPE_PHOTO) {
		
		Alloy.Globals.Logs.aalert(
			'Erreur Swapbook',
			'Tu ne peux envoyer que des photos et des images pour le moment.',
			'',
			'Corriger',
			Alloy.Globals.Logs.aalert_close,
			null,
			null,
			null,
			false
		);
		
		return false;
		
	}
				
	var image 																						= Titanium_event.media;
	
	if(Ti.Filesystem.isExternalStoragePresent()){
		
		var image_shorted_stored_file												= Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory,'SwapBook/SwapBook_user_upload.'+extension);
		
	}
	else{
		
		var image_shorted_stored_file												= Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'SwapBook/SwapBook_user_upload.'+extension);
		
	}
	
	/* 
	DOC 1 = https://github.com/appcelerator-modules/ti.imagefactory/blob/stable/ios/example/app.js
	DOC 2 = https://gist.github.com/ksouthworth/a8e008b83cf089e57249
	*/
	
	if(square == 'scale_and_crop'){
		
		var dimensions 																			= resizeSize.split('x');
		var wondered_Width 																= parseInt(dimensions[0]);
		var wondered_Height 																= parseInt(dimensions[1]);
		
		/******************************************************/
		/********** DRUPAL SCALE AND CROP PROCESS **********/
		/*****************************************************/
		
		var scale_and_crop_newWidth 												= saved_width = image.width < image.height ? wondered_Width : image.width * wondered_Height / image.height;
		var scale_and_crop_newHeight												= saved_height = image.width < image.height ? image.height * wondered_Width / image.width : wondered_Height;
		Alloy.Globals.Logs.llog('Adapted dimensions = '+scale_and_crop_newWidth+'x'+scale_and_crop_newHeight);
		
			if( scale_and_crop_newWidth < wondered_Width && scale_and_crop_newHeight == wondered_Height ){
				scale_and_crop_newWidth 												= wondered_Width;
				scale_and_crop_newHeight 												= wondered_Width * (wondered_Height / saved_width);
			}
			if( scale_and_crop_newHeight < wondered_Height && scale_and_crop_newWidth == wondered_Width ){
				scale_and_crop_newHeight 												= wondered_Height;
				scale_and_crop_newWidth 												= wondered_Height * (saved_width / saved_height);
			}
			
		Alloy.Globals.Logs.llog('Adapted dimensions AGAIN = '+scale_and_crop_newWidth+'x'+scale_and_crop_newHeight);
		var crop_position_x																	= scale_and_crop_newWidth > wondered_Width ? (scale_and_crop_newWidth - wondered_Width) / 2 :  ((wondered_Width - scale_and_crop_newWidth) / 2) * -1;
		var crop_position_y																	= scale_and_crop_newHeight > wondered_Height ? (scale_and_crop_newHeight - wondered_Height) / 2 :  ((wondered_Height - scale_and_crop_newHeight) / 2) * -1;
		Alloy.Globals.Logs.llog('Crop X = '+crop_position_x);
		Alloy.Globals.Logs.llog('Crop Y = '+crop_position_y);
		
		image_shorted_stored_file.write(
			Alloy.Globals.app_image_factory.compress(
				Alloy.Globals.app_image_factory.imageAsCropped(
					Alloy.Globals.app_image_factory.imageAsResized(
						image,
						{
		                    width: 				scale_and_crop_newWidth,
		                    height: 				scale_and_crop_newHeight,
							quality: 				Alloy.Globals.app_image_factory.QUALITY_HIGH,
		        			hires: 					false
		    			}
		    		),
					{
	                    width: 					wondered_Width,
	                    height: 					wondered_Height,
	                    x: 							crop_position_x,
	                    y: 							crop_position_y
					 }
				),
	    		0.8
	    	)
	    );
		
	}
	else if(square == true){
		
		var newWidth 																			= resizeSize;
	
		image_shorted_stored_file.write(
			Alloy.Globals.app_image_factory.compress(
				Alloy.Globals.app_image_factory.imageAsThumbnail(
					image,
					{
	                    size: 						newWidth,
                		borderSize: 			0,
                    	cornerRadius: 		0,
						quality: 					Alloy.Globals.app_image_factory.QUALITY_HIGH
	    			}
	    		),
	    		0.8
	    	)
	    );
	    
	}
	else{
		
		var newWidth 																			= resizeSize;
		var aspectRatio 																		= image.height / image.width;
		var newHeight 																			= newWidth*aspectRatio;
		
		image_shorted_stored_file.write(
			Alloy.Globals.app_image_factory.compress(
				Alloy.Globals.app_image_factory.imageAsResized(
					image,
					{
	                    width: 					newWidth,
	                    height: 					newHeight,
						quality: 					Alloy.Globals.app_image_factory.QUALITY_HIGH,
	        			hires: 						false
	    			}
	    		),
	    		0.8
	    	)
	    );
		
	}

	Alloy.Globals.Logs.llog('---------------- UPLOAD IMAGE INFOS ----------------');
	Alloy.Globals.Logs.llog('---------------- origin width = '+Titanium_event.media.width);
	Alloy.Globals.Logs.llog('---------------- NEW origin width = '+newWidth);
	Alloy.Globals.Logs.llog('---------------- origin height = '+Titanium_event.media.height);
	Alloy.Globals.Logs.llog('---------------- NEW origin height = '+newHeight);
	Alloy.Globals.Logs.llog('---------------- fichier local pour CHECK = '+image_shorted_stored_file.nativePath);

	/* ********* AJAX API QUERY PREPARATION ********* */
	var request_input																			= [];
	request_input['NO_LIMIT']															= true;
	request_input['async_execution']												= endpoint_callback_function;
	request_input['async_params']													= [];
	
	endpoint_params_object.picture 												= image_shorted_stored_file;
	endpoint_params_object.origin_width										= newWidth;//Titanium_event.media.width;
	endpoint_params_object.origin_height										= newHeight;//Titanium_event.media.height;
	endpoint_params_object.picture_cdn_name								= cdnName;
	
	/* ********* AJAX API QUERY EXECUTION ********* */
	Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		endpoint,
		endpoint_params_object,
		request_input,
		true, /* MEDIA AJAX UPLOAD */
		false
	);
				
};

Alloy.Globals.overlay_for_camera													= function(instance_type,title,square_mode){
	
	if(instance_type == 'native')Ti.Media.setCameraFlashMode(Ti.Media.CAMERA_FLASH_OFF);
	if(instance_type == 'barcode')Alloy.Globals.app_image_scanner.displayedMessage= title;
	
	var Swapbook_camera_super_overlay 										= Ti.UI.createView({
		backgroundColor: "transparent",
	    top: 0,
	    bottom: 0,
		right: 0, 
		left: 0,
	});
	
	////////////////////
	//////////////////// TOP BAR
	////////////////////

	var top_bar 																					= Ti.UI.createView({
	    top: 0,
	    left: 0,
		width: '100%',
		backgroundColor: "#A64486c5",
		height: 80,
		zIndex:2,
	});
		
		var top_bar_left_label_class_Object 										= {
			text: 'SWAPBOOK',
			color: '#ffffff',
			left: 20,
			height: '100%',
			font: {
				fontSize: 28,
				fontFamily: 'Wask_New_Bold'
			},
		};
		if(OS_IOS)top_bar_left_label_class_Object.font 					= {fontSize: 32, fontFamily: 'WaskNew-Bold'};
		if(instance_type == 'barcode')top_bar_left_label_class_Object.top= 10;
		
		var top_bar_left_label																= Ti.UI.createLabel(top_bar_left_label_class_Object);
		
		var top_bar_center_label_container 										= Ti.UI.createView({
			right: 56,
			height: 34,
			width: '200dp',
			borderColor:'#ffffff',
			borderWidth: 2,
			borderRadius: 5,
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
			viewShadowRadius: 5
		});
			
			var top_bar_center_label_class_Object								= {
				text: title,
				color:'#ffffff',
				height: '100%',
				font: {
					fontSize: 14,
					fontFamily: 'Wask_New_Bold'
				},
			};
			if(OS_IOS)top_bar_center_label_class_Object.font 			= {fontSize: 18, fontFamily: 'WaskNew-Bold'};
			var top_bar_center_label														= Ti.UI.createLabel(top_bar_center_label_class_Object);
		
		var top_bar_right_button_class_Object									= {
			right:16,
			width: 22,
			height: 22,
			backgroundColor: 'transparent',
			touchEnabled:true,
			selectedColor: 'transparent',
			tintColor: 'transparent',
			backgroundImage: '/images/cameraClose.png',
			image: '/images/cameraClose.png',
		};/*if(instance_type == 'barcode'){
			top_bar_right_button_class_Object.width 							= 30;
			top_bar_right_button_class_Object.height 						= 30;
			top_bar_right_button_class_Object.left 								= 280;
			top_bar_right_button_class_Object.zIndex 						= 1000;
			top_bar_right_button_class_Object.bottom 						= 17;
		}*/
		
		var top_bar_right_button 															= Ti.UI.createButton(top_bar_right_button_class_Object);

		var top_bar_bottom_line 															= Ti.UI.createView({
			height: 1,
			bottom: 0,
			width:'100%',
			backgroundColor: '#40ffffff'
		});
	
	////////////////////
	//////////////////// OTHER BUTTONS
	////////////////////
	
	var photo_button 																			= Ti.UI.createButton({
		bottom: 40,
		width: 82,
		height: 82,
		touchEnabled:true,
		selectedColor: 'transparent',
		tintColor: 'transparent',
		backgroundImage: '/images/cameraButtonOff.png',
		image: '/images/cameraButtonOff.png',
		zIndex:2,
	});
	
	var flash_button_class_Object 													= {
		left:16,
		bottom:16,
		width: 40,
		height: 40,
		backgroundColor: 'transparent',
		touchEnabled:true,
		selectedColor: 'transparent',
		tintColor: 'transparent',
		backgroundImage: '/images/cameraFlashOff.png',
		image: '/images/cameraFlashOff.png',
		zIndex:2,
		clicked: false,
	};/*if(instance_type == 'barcode'){
		flash_button_class_Object.zIndex 											= 1000;
		flash_button_class_Object.left 												= 220;
		flash_button_class_Object.bottom 											= 12;
	}*/
	
	var flash_button 																			= Ti.UI.createButton(flash_button_class_Object);
	
	var switch_button_class_Object													= {
		right:16,
		bottom:16,
		width: 40,
		height: 40,
		backgroundColor: 'transparent',
		touchEnabled:true,
		selectedColor: 'transparent',
		tintColor: 'transparent',
		backgroundImage: '/images/cameraSwitchOn.png',
		image: '/images/cameraSwitchOn.png',
		zIndex:2,
	};/*if(instance_type == 'barcode'){
		switch_button_class_Object.zIndex 										= 1000;
		switch_button_class_Object.left 												= 160;
		switch_button_class_Object.bottom 										= 12;
	}*/
	
	var switch_button 																		= Ti.UI.createButton(switch_button_class_Object);

	////////////////////
	//////////////////// EVENTS LISTENERS
	////////////////////

	var top_bar_right_button_CLICK													= function(clic_event){

		Alloy.Globals.preventDoubleClick(this);
		
		///////////////// BARCODE CASE
		
		if(instance_type == 'barcode'){
			Alloy.Globals.app_image_scanner.cancel();
		}
		
		///////////////// NATIVE CASE
		
		else{
			Ti.Media.hideCamera();
		}
		
		top_bar_right_button.removeEventListener('click',top_bar_right_button_CLICK);
		flash_button.removeEventListener('click',flash_button_CLICK);
		switch_button.removeEventListener('click',switch_button_CLICK);
		
		if(instance_type == 'native'){
			photo_button.removeEventListener('touchstart',photo_button_START_CLICK);
			photo_button.removeEventListener('doubletap',photo_button_START_CLICK);
			photo_button.removeEventListener('touchend',photo_button_END_CLICK);
			Ti.Gesture.removeEventListener('orientationchange',buttons_landscape);
		}
		
		delete top_bar_right_button_CLICK;
		delete flash_button_CLICK;
		delete photo_button_START_CLICK;
		delete photo_button_END_CLICK;
		delete switch_button_CLICK;
		delete buttons_landscape;
		
	};
	if(instance_type == 'native')top_bar_right_button.addEventListener('click',top_bar_right_button_CLICK);

	var flash_button_CLICK																= function(clic_event){
		
		///////////////// BARCODE CASE
		
		if(instance_type == 'barcode'){
			Alloy.Globals.app_image_scanner.useLED 						= !Alloy.Globals.app_image_scanner.useLED;
			if(Alloy.Globals.app_image_scanner.useLED){
				this.backgroundImage 														= '/images/cameraFlashOff.png';
				this.image 																			= '/images/cameraFlashOff.png';
			}
			else{
				this.backgroundImage 														= '/images/cameraFlashOn.png';
				this.image 																			= '/images/cameraFlashOn.png';
			}
		}
		
		///////////////// NATIVE CASE
		
		else{
			if(!this.clicked){
				Ti.Media.setCameraFlashMode(Ti.Media.CAMERA_FLASH_ON);
				this.backgroundImage 														= '/images/cameraFlashOn.png';
				this.image 																			= '/images/cameraFlashOn.png';
				this.clicked 																		= true;
			}
			else{
				Ti.Media.setCameraFlashMode(Ti.Media.CAMERA_FLASH_OFF);
				this.backgroundImage 														= '/images/cameraFlashOff.png';
				this.image 																			= '/images/cameraFlashOff.png';
				this.clicked 																		= false;
			}
		}
		
	};
	if(instance_type == 'native')flash_button.addEventListener('click',flash_button_CLICK);

	var photo_button_START_CLICK													= function(clic_event){
		
		this.backgroundImage 																= '/images/cameraButtonOn.png';
		this.image 																					= '/images/cameraButtonOn.png';
		
	};
	if(instance_type == 'native')photo_button.addEventListener('touchstart',photo_button_START_CLICK);
	if(instance_type == 'native')photo_button.addEventListener('doubletap',photo_button_START_CLICK);

	var photo_button_END_CLICK														= function(clic_event){

		Alloy.Globals.preventDoubleClick(this);
		
		this.backgroundImage 																= '/images/cameraButtonOff.png';
		this.image 																					= '/images/cameraButtonOff.png';
		
		if(flash_button.clicked==false || Ti.Media.cameraFlashMode == Ti.Media.CAMERA_FLASH_OFF){
			Ti.Media.setCameraFlashMode(Ti.Media.CAMERA_FLASH_OFF);
		}
		
		Ti.Media.takePicture();
		
		photo_button.removeEventListener('touchend',photo_button_END_CLICK);
		
	};
	if(instance_type == 'native')photo_button.addEventListener('touchend',photo_button_END_CLICK);

	var switch_button_CLICK																= function(clic_event){

		Alloy.Globals.preventDoubleClick(this);
		
		///////////////// BARCODE CASE
		
		if(instance_type == 'barcode'){
			Alloy.Globals.app_image_scanner.useFrontCamera 			= !Alloy.Globals.app_image_scanner.useFrontCamera;
			if(Alloy.Globals.app_image_scanner.useFrontCamera){
				this.backgroundImage 														= '/images/cameraSwitchOn.png';
				this.image 																			= '/images/cameraSwitchOn.png';
			}
			else{
				this.backgroundImage 														= '/images/cameraSwitchOff.png';
				this.image 																			= '/images/cameraSwitchOff.png';
			}
		}
		
		///////////////// NATIVE CASE
		
		else{
			if (Ti.Media.camera == Ti.Media.CAMERA_FRONT) {
        		Ti.Media.switchCamera(Ti.Media.CAMERA_REAR);
				this.backgroundImage 														= '/images/cameraSwitchOn.png';
				this.image 																			= '/images/cameraSwitchOn.png';
			} 
 			else{
				Ti.Media.switchCamera(Ti.Media.CAMERA_FRONT);
				this.backgroundImage 														= '/images/cameraSwitchOff.png';
				this.image 																			= '/images/cameraSwitchOff.png';
			}
		}
		
	};
	if(instance_type == 'native' && Alloy.Globals.device_cameras.length > 1)switch_button.addEventListener('click',switch_button_CLICK);
	
	////////////////////
	//////////////////// SQUARE MODE
	////////////////////
	
	if(instance_type == 'native' && square_mode === true){
	
		var base_decalage																	= 16;
		var base_zIndex																		= -1;
		var base_overlay_color																= "#A64486c5";
		var base_width 																			= Ti.Platform.displayCaps.platformWidth - (base_decalage * 2);
		var base_width_consequence 													= (Ti.Platform.displayCaps.platformHeight - base_width) / 2;
		
		var square_part3 																		= Ti.UI.createView({
		    top: base_width_consequence,
		    left: base_decalage,
			backgroundColor: "transparent",
			borderColor: "#ffffff",
			borderWidth: 5,
			height: base_width,
			width: base_width,
			zIndex:2,
			orientationModes: [
				Ti.UI.PORTRAIT
			]
		});
		
		Swapbook_camera_super_overlay.add(square_part3);
		
		/*
		var square_part1 																		= Ti.UI.createView({
		    top: 0,
		    left: 0,
			backgroundColor: base_overlay_color,
			height: 80,
			width: Ti.UI.FILL,
			zIndex:base_zIndex,
			orientationModes: [
				Ti.UI.PORTRAIT
			]
		});
		
		var square_part2 																		= Ti.UI.createView({
		    top: base_width_consequence,
		    left: 0,
			backgroundColor: base_overlay_color,
			height: base_width,
			width: base_decalage,
			zIndex:base_zIndex,
			orientationModes: [
				Ti.UI.PORTRAIT
			]
		});
		
		var square_part4 																		= Ti.UI.createView({
		    top: base_width_consequence,
		    right: 0,
			backgroundColor: base_overlay_color,
			height: base_width,
			width: base_decalage,
			zIndex:base_zIndex,
			orientationModes: [
				Ti.UI.PORTRAIT
			]
		});
			
		var square_part5 																		= Ti.UI.createView({
		    bottom: 0,
		    left: 0,
			backgroundColor: base_overlay_color,
			height: base_width_consequence,
			width: Ti.UI.FILL,
			zIndex:base_zIndex,
			orientationModes: [
				Ti.UI.PORTRAIT
			]
		});
		
		Swapbook_camera_super_overlay.add(square_part1);
		Swapbook_camera_super_overlay.add(square_part2);
		Swapbook_camera_super_overlay.add(square_part4);
		Swapbook_camera_super_overlay.add(square_part5);
		*/
		
	}
	
	////////////////////
	//////////////////// LANDSCAPE MODE
	////////////////////
	
	var buttons_landscape																	= function(orientation_event){
		
		var landscape 																			= ( typeof orientation_event.source != 'undefined'  && !orientation_event.source.isLandscape() ) ? false : true;
		var t 																							=  Ti.UI.create2DMatrix();
		var spin 																						= Ti.UI.createAnimation();
		var spin_move 																			= landscape ? (orientation_event.orientation == Ti.UI.LANDSCAPE_LEFT ? -90 : 90) : (orientation_event.orientation == Ti.UI.UPSIDE_PORTRAIT ? 180 : 0);
		t 																									= t.rotate(spin_move);
		spin.duration 																				= 250;
		spin.transform 																			= t;
		
		switch_button.animate(spin);
		flash_button.animate(spin);
		
	};
	if(instance_type == 'native')Ti.Gesture.addEventListener('orientationchange',buttons_landscape);
	
	////////////////////
	//////////////////// FINAL INSERTIONS
	////////////////////
	
	top_bar_center_label_container.add(																											top_bar_center_label);
	if(instance_type == 'native' && Ti.Platform.displayCaps.platformWidth > 400)top_bar.add(			top_bar_center_label_container);
		top_bar.add(																																				top_bar_left_label);
		if(instance_type == 'native')top_bar.add(																								top_bar_right_button);
		top_bar.add(																																				top_bar_bottom_line);
			Swapbook_camera_super_overlay.add(																								top_bar);
			if(instance_type == 'native')Swapbook_camera_super_overlay.add(												flash_button);
			if(instance_type == 'native')Swapbook_camera_super_overlay.add(												photo_button);
			if(instance_type == 'native' && Alloy.Globals.device_cameras.length > 1)Swapbook_camera_super_overlay.add(switch_button);
	
	return Swapbook_camera_super_overlay;
	
};

/*********************************************************************** */
/* ******************* 10 = APP IN BACKGROUND OR NOT ****************** */
/********************************************************************** */

Ti.App.addEventListener('paused',function(e){
	
	Alloy.Globals.the_user_is_on_the_app 										= false;
		
	/*
	var notification =    Ti.App.iOS.scheduleLocalNotification({
	  alertBody:"Kitchen Sink was put in background",
	  alertAction:"Re-Launch!",
	  userInfo:{"hello":"world"},
	  sound:"pop.caf",
	  date:new Date(new Date().getTime()) // 9 seconds after backgrounding
	});
	*/

});

Ti.App.addEventListener('paused',function(e){
	
	Alloy.Globals.the_user_is_on_the_app 										= false;

});

Ti.App.addEventListener('resume',function(e){

	Alloy.Globals.Requests.isOnlineTEST();
	
	Alloy.Globals.the_user_is_on_the_app 										= false;

});

Ti.App.addEventListener('resumed',function(e){
	
	Alloy.Globals.Requests.isOnlineTEST();
	
	Alloy.Globals.the_user_is_on_the_app 										= 'back';
	
	setTimeout(function(){	
		Alloy.Globals.the_user_is_on_the_app 									= true;
	},4000);

});

/********************************************************************* */
/* ******************* 11 = APP IN LANDSCAPE OR NOT ****************** */
/******************************************************************** */

Ti.Gesture.addEventListener('orientationchange',function(e) {

	if( e.source.isLandscape() ){
		
		Alloy.Globals.the_u_is_on_landscape										= true;

	}
	else{
		
		
		if ( Alloy.Globals.the_u_is_on_tablet.isTablet() ){
			
			Alloy.Globals.the_u_is_on_landscape									= true;
			
		}
		else{
			
			Alloy.Globals.the_u_is_on_landscape									= false;
			
		}
		
	}
	
});

Ti.Gesture.fireEvent('orientationchange');

/***************************************************************** */
/* ******************* 12 = USER BACKEND CHECK ****************** */
/***************************************************************** */

Alloy.Globals.app_BACKEND_start_process									= function(){
	
	if(!Alloy.Globals.endPoints.onAppStartChecks)return;
	
	if(!Ti.App.Properties.hasProperty('backend_seen_alerts')){
		Ti.App.Properties.setObject('backend_seen_alerts',{});
	}
	
	var user_seen_alerts 																	= Ti.App.Properties.getObject('backend_seen_alerts');
	
	/* ******************************************** */
	/* ********* AJAX API QUERY (FAST WAY) ******** */
	/* ******************************************* */
	Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		Alloy.Globals.endPoints.onAppStartChecks,
		{
    		id_user: 							Alloy.Globals.THE_USER.id_user
		},
		{
			NO_LIMIT: 						true,
			async_params: 				{},
			async_execution: 			function(JSON_returned,async_params_back){			
				if(typeof JSON_returned['error'] !== 'undefined'){
					
					Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);
					
				}
				else{
					
					///////////////Alloy.Globals.Logs.llog('---------------- BACKEND CHECK DONE ----------------');
					///////////////Alloy.Globals.Logs.llog(JSON_returned);
					
					var Consigne_from_API 													= JSON_returned['output-array'];
					
					if(!Consigne_from_API['consigne-code'])return;
					
					if(!user_seen_alerts[Consigne_from_API['consigne-code']]){
						
						///////////////
						/////////////// SIMPLE ALERT FROM API
						///////////////
						
						if( Consigne_from_API['consigne-type'] == 'alert') {
							
							/////////////// SAVE THE USER HAVE SEEN THE MESSAGE
	
							user_seen_alerts[Consigne_from_API['consigne-code']]= new Date();
							
						}
						
						///////////////
						/////////////// DIALOG FROM API
						///////////////
						
						else if( Consigne_from_API['consigne-type'] == 'dialog' ){
							
							//////////// DELAY FROM API
							
							setTimeout(function(){
								
								////////////
								//////////// RATE THE APP
								////////////
									
								if( Consigne_from_API['consigne-name'] == 'rate-the-app' ){
									
									var alertDialog 													= Ti.UI.createAlertDialog({
										cancel: 					2,
										title: 						Consigne_from_API['consigne-alert-title'],
										message: 				Consigne_from_API['consigne-message1'],
										buttonNames: 		[
											Consigne_from_API['consigne-alert-option1'],
											Consigne_from_API['consigne-alert-option2'],
											Consigne_from_API['consigne-alert-option3']
										]
									});
									
									alertDialog.addEventListener('click',function(evt){

										switch (evt.index){
											case 0:
											
												///////////////
												/////////////// SAY YES : GO TO NOTATION PAGE
												///////////////
												
												var URL_according_to_API 					= Consigne_from_API['consigne-alert-gotoURL-YES'] != '' ? Consigne_from_API['consigne-alert-gotoURL-YES'] : false;
												
												if(OS_ANDROID){
													
													Ti.Platform.openURL(!URL_according_to_API ? Alloy.CFG.the_googleplay_store_page : URL_according_to_API);
													
												}
												else{
													
													Ti.Platform.openURL(!URL_according_to_API ? Alloy.CFG.the_itunes_store_page : URL_according_to_API);
													
												}
															
												/////////////// SAVE THE USER HAVE SEEN THE MESSAGE
						
												user_seen_alerts[Consigne_from_API['consigne-code']]= new Date();
												Ti.App.Properties.setObject('backend_seen_alerts',user_seen_alerts);
												
												break;
											case 2:
															
												///////////////
												/////////////// SAY NO : SAVE THE USER HAVE SEEN THE MESSAGE
												///////////////
						
												user_seen_alerts[Consigne_from_API['consigne-code']]= new Date();
												Ti.App.Properties.setObject('backend_seen_alerts',user_seen_alerts);
								
												break;
											case 1:
												break;
										}
										
									});
	
									alertDialog.show();
									return;
									
								}
								
								////////////
								//////////// APP NEWS
								////////////
									
								else if( Consigne_from_API['consigne-name'] == 'app-news' ){
								}
								else if( Consigne_from_API['consigne-name'] == 'download-something' ){
								}
								else if( Consigne_from_API['consigne-name'] == 'important-update' ){
								}
								else if( Consigne_from_API['consigne-name'] == 'promotional-message' ){
								}
								else if( Consigne_from_API['consigne-name'] == 'promotional-banner' ){
								}
								else if( Consigne_from_API['consigne-name'] == 'promotional-sound' ){
								}
                			
                			},parseInt(Consigne_from_API['consigne-alert-delay'])*1000);
                			
						}
						
						///////////////
						/////////////// END OF PARSING
						///////////////
						
					}
				
				}
			}
		},
		false,
		true 
	);
	
};

/*************************************************************** */
/* ******************* 13 = USER NOTIFICATIONS ****************** */
/*************************************************************** */

Alloy.Globals.app_NOTIFICATIONS_start_process 						= function(){
	
	/////////
	///////// http://docs.appcelerator.com/platform/latest/#!/guide/Subscribing_to_push_notifications
	/////////
	
	if(OS_ANDROID){
		
		Alloy.Globals.CloudPush.retrieveDeviceToken({
		    success: 																				Alloy.Globals.app_NOTIFICATIONS_deviceTokenSuccess,
		    error: 																						Alloy.Globals.app_NOTIFICATIONS_deviceTokenError
		});
		
		Alloy.Globals.CloudPush.addEventListener(
			'callback',
			Alloy.Globals.app_NOTIFICATIONS_deviceReceivePush
		);
		
	}
	else if(OS_IOS){
		
		if(
			Ti.Platform.name == "iPhone OS" && 
			parseInt(Ti.Platform.version.split(".")[0]) >= 8
		){
		 
		    Ti.App.iOS.addEventListener(
		    	'usernotificationsettings', 
		    	function app_NOTIFICATIONS_registerForPush(){
		 
					Ti.App.iOS.removeEventListener('usernotificationsettings',app_NOTIFICATIONS_registerForPush); 
		 
					Ti.Network.registerForPushNotifications({
			            success: 																	Alloy.Globals.app_NOTIFICATIONS_deviceTokenSuccess,
			            error: 																			Alloy.Globals.app_NOTIFICATIONS_deviceTokenError,
			            callback: 																	Alloy.Globals.app_NOTIFICATIONS_deviceReceivePush
			        });

				}
			);
		    
		    Ti.App.iOS.registerUserNotificationSettings(
		    	{
				    types: 																				[
			            Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT,
			            Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND,
			            Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE
			        ]
				}
			);
		    
		}
		else{
			
			Ti.Network.registerForPushNotifications(
				{
			        types: 																				[
			            Ti.Network.NOTIFICATION_TYPE_BADGE,
			            Ti.Network.NOTIFICATION_TYPE_ALERT,
			            Ti.Network.NOTIFICATION_TYPE_SOUND
			        ],
			        success: 																		Alloy.Globals.app_NOTIFICATIONS_deviceTokenSuccess,
			        error: 																				Alloy.Globals.app_NOTIFICATIONS_deviceTokenError,
			        callback: 																		Alloy.Globals.app_NOTIFICATIONS_deviceReceivePush
			    }
			);
		    
		}

	}
	
};

Alloy.Globals.app_NOTIFICATIONS_deviceReceivePush 				= function(e) {

	var alertString;

	if(OS_ANDROID){
    	
    	/*
    	alertString 																					= JSON.parse(e.payload).android.alert;
  		Alloy.Globals.Logs.llog(e);
  				
    	var SwapBook_notification 														= Ti.Android.createNotification({
		    contentTitle:  																			'Notification 2',
		    contentText: 																			'Just another notification',
		    contentIntent: 																		Ti.Android.createPendingIntent({intent: Ti.Android.createIntent({})}),
		    icon: 																						Ti.App.Android.R.drawable.warn,
		    number: 																					5,
		    when: 																						new Date().getTime(),
		});
		*/

	}
	else if(OS_IOS){
		
		if( typeof e.data == 'undefined')return;
		
		alertString 																					= e.data.aps.alert;

		var SwapBook_notification  														= Ti.App.iOS.scheduleLocalNotification({
		    alertAction: 																			"Lancer SwapBook",
		    alertBody: 																				e.data.aps.alert['body'],
		    badge: 																					+e.data.aps.badge,
		    date: 																						new Date(new Date().getTime()),
		    userInfo: 																					e.data.aps
		});
 
	}
    
};

Alloy.Globals.deviceReceivePushLocalNotificationsBar_open= function(data) {

		Alloy.Globals.Dialog.getView('alertNotificationBar').animate({
	        top: 0,
	        duration: 300,
	        curve: Ti.UI.ANIMATION_CURVE_LINEAR
	   });
		
		setTimeout(function(){
			
			Alloy.Globals.deviceReceivePushLocalNotificationsBar_close({type:'click',direction:'top'});
			
		},9000);
	   
};

Alloy.Globals.deviceReceivePushLocalNotificationsBar_close= function(data) {
	
	Alloy.Globals.Dialog.getView('alertNotificationBar').animate({
        top: -90,
        duration: 300,
        curve: Ti.UI.ANIMATION_CURVE_LINEAR
   });
		
	setTimeout(function(){
		
		Alloy.Globals.Dialog.getView('alertNotificationBar').visible= false;
		
	},600);
        
};

Alloy.Globals.app_NOTIFICATIONS_deviceTokenSuccess 			= function(e) {
	
	if(!Alloy.Globals.endPoints.registerDevice)return;
	
	Alloy.Globals.DeviceToken 															= e.deviceToken;
	
	var d_family 																					= OS_IOS ? 'ios' : 'android';
	var d_agent																					= Ti.Platform.name + '_' + Ti.Platform.model+ '_' + Ti.Platform.version+ '_' + Ti.Platform.ostype+ '_' +Ti.Platform.processorCount+'proc__screen='+Ti.Platform.displayCaps.platformWidth+'x'+Ti.Platform.displayCaps.platformHeight+'_name='+Ti.Platform.username.replace(' ','');

	request_input																					= [];
	request_input['async_execution']												= Alloy.Globals.app_NOTIFICATIONS_deviceTokenSuccess_after;
	request_input['async_params']													= [];
	
	/* ********* AJAX API QUERY ********* */
	
	Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		Alloy.Globals.endPoints.registerDevice,
		{
			id_user: 																					Alloy.Globals.THE_USER.id_user,
			device_fam: 																			d_family,
			device_agent: 																		d_agent,
			device_token: 																		Alloy.Globals.DeviceToken
		},
		request_input,
		false,
		true
	);
	
	/* ********* APPCELERATOR CLOUD QUERY ********* *
	
	Alloy.Globals.CloudPush.PushNotifications.subscribeToken(
		{
	        device_token: 																		Alloy.Globals.DeviceToken,
	        channel: 																					'all_app_notifications',
	        type: 																						Ti.Platform.name == 'android' ? 'android' : 'ios'
	    }, 
	    function (e){
	    	
	        if (e.success){
				
				Alloy.Globals.Logs.llog('------------ NOTIFICRETURNKEY_NEXT% OK ! (Appcelerator) ------------');
				
	        }
	        else{
	        	
				Alloy.Globals.Logs.llog('------------ NOTIFICATIONS REGISTER not OK ! (Appcelerator) ------------');
				Alloy.Globals.Logs.llog(((e.error && e.message) || JSON.stringify(e)));
				
	        }
        
		}
	);
	*/
    
};

Alloy.Globals.app_NOTIFICATIONS_deviceTokenSuccess_after 	= function(JSON_returned,local_params){

	if(typeof JSON_returned['error'] !== 'undefined'){
		
		/////////Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);
		
	}
	else{
		
		/////////Alloy.Globals.Logs.llog('------------ NOTIFICATIONS REGISTER 100% OK ! (SwapBook) ------------');
		
	}

};

Alloy.Globals.app_NOTIFICATIONS_deviceTokenError 				= function(e) {
	
	/////Alloy.Globals.Logs.llog('------------ NOTIFICATIONS REGISTER not OK ! (SwapBook) ------------');
	/////Alloy.Globals.Logs.aalert('Erreur Swapbook','Impossible de sauvegarder les informations de ton smartphone afin de recevoir nos notifications.','(code '+e.error+')','OK',null,null,null,null);
    
};

/*************************************************************** */
/* ******************* 14 = USER GEOLOCATION ****************** */
/************************************************************** */

Alloy.Globals.app_GEOLOCATION_start_process 							= function(){
	
	/////////
	///////// https://wiki.appcelerator.org/display/guides2/Tracking+Position+and+Heading
	/////////
	
	if (Ti.Geolocation.locationServicesEnabled){
		
		if(OS_IOS){
			
		    Ti.Geolocation.accuracy 														= Ti.Geolocation.ACCURACY_BEST;
		    Ti.Geolocation.distanceFilter 												= 10;
		    Ti.Geolocation.preferredProvider 										= Ti.Geolocation.PROVIDER_GPS;
		 
		    Ti.Geolocation.addEventListener('location',function(e){
		    	
				if(e.error){
		            /////Alloy.Globals.Logs.llog('Error: ' + e.error);
		        } 
		        else{
		            //////Alloy.Globals.Logs.llog(e.coords);
		   		}
		   		
		    });
		    
		    Alloy.Globals.app_GEOLOCATION_update_IOS_DevicePos();
		    
		}
		else if(OS_ANDROID){
			
			var providerGps 																	= Ti.Geolocation.Android.createLocationProvider({
			    name: 																					Ti.Geolocation.PROVIDER_GPS,
			    minUpdateDistance: 														0.0,
			    minUpdateTime: 																0
			});
			
			Ti.Geolocation.Android.addLocationProvider(providerGps);
			
			Ti.Geolocation.Android.manualMode 									= true;
			
			Ti.Geolocation.addEventListener('location',function(e){
				
			    if (!e.success || e.error) {
		            /////Alloy.Globals.Logs.llog('error:' + JSON.stringify(e.error));
			    }
			    else{
		            /////Alloy.Globals.Logs.llog('coords: ' + JSON.stringify(e.coords));
			    }
			    
			});

		}
		
	}
	else{
		
		Alloy.Globals.Logs.llog('------------ MERCI D\'ACTIVER LES FONCTIONALITES DE GEOLOCALISATION ------------');
	    
	}
        
};

Alloy.Globals.app_GEOLOCATION_update_IOS_DevicePos			= function(){

	Alloy.Globals.Perms.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE, function(e) {

    	if (!e.success){

			if (e.error) {
  				Alloy.Globals.Logs.llog(e.error);
			}
			return;
			
		}

		Ti.Geolocation.getCurrentPosition(function(e) {

			if (!e.success || e.error) {
				
        		Alloy.Globals.Logs.llog('Impossible de trouver ta position');
  				Alloy.Globals.Logs.llog(JSON.stringify(e.error));
  				
 			}
 			
      		Alloy.Globals.DeviceCoords													= e.coords;
			/////////Alloy.Globals.Logs.llog(JSON.stringify(e.coords));
      		
		});

  });
  
};

/**************************************************************** */
/* ******************* 15 = SEARCH ENGINE TOOL ****************** */
/**************************************************************** */

Alloy.Globals.loadReloadSearchBooks_API_endpoint					=  Alloy.Globals.endPoints.homepageBooksGet ? Alloy.Globals.endPoints.homepageBooksGet : Alloy.Globals.ENDPOINTS_INDEX;
Alloy.Globals.loadReloadSearchBooks_display_rows 					= "list_cell_book";
Alloy.Globals.DOING_search_request 											= false;
Alloy.Globals.loadReloadSearchBooks_fetch_Collection 				= null;
Alloy.Globals.loadReloadSearchBooks_display_tableView 			= null;
Alloy.Globals.loadReloadSearchBooks_DATAS_tableView			= [];
Alloy.Globals.loadReloadSearchBooks_display_scrollPos 			= 1;
Alloy.Globals.loadReloadSearchBooks_display_scrollLimit 			= 10;
Alloy.Globals.loadReloadSearchBooks_display_DONE					= false;
Alloy.Globals.loadReloadSearchBooks_use_custom_results_array= false;
Alloy.Globals.loadReloadSearchBooks_API_endpoint_params		= {
    the_user_x: 									Alloy.Globals.DeviceCoords.latitude,
	the_user_y: 									Alloy.Globals.DeviceCoords.longitude
};

Alloy.Globals.loadReloadSearchBooks_engine_tableView			= {
	top: 																									126,
	height:						 																	((Alloy.Globals.tableViewHeight - 90) - 126),
	left: 																									Alloy.Globals.backdropImageLeft,
	width:																								'100%',
	zIndex: 																							9999999,
	backgroundColor: 																			Alloy.Globals.BLUE_COLOR_v2,
	pullBackgroundColor:																	Alloy.Globals.BLUE_COLOR_v2,
	showVerticalScrollIndicator: 														false,
	separatorColor:																				'#ffffff',
	separatorHeight:																			'1dp',
	visible: 																							false
};

Alloy.Globals.loadReloadSearchPathways_tableView					= {
	top: 																									126,
	height:						 																	((Alloy.Globals.tableViewHeight - 90) - 126),
	left: 																									Alloy.Globals.backdropImageLeft,
	width: 																							Alloy.Globals.backdropImageWidth,
	preventDefaultImage: 																	true,
	backgroundColor: 																			'#BF'+Alloy.Globals.BLUE_COLOR.replace('#',''),
    rowBackgroundColor: 																	'#BF'+Alloy.Globals.BLUE_COLOR.replace('#',''),
	zIndex: 																							1008,
	showVerticalScrollIndicator: 														false,
	separatorColor:																				'#ffffff',
	separatorHeight:																			'1dp',
	visible: 																							false
};

if(OS_IOS){
	
	Alloy.Globals.loadReloadSearchBooks_engine_tableView.tableSeparatorInsets	= {left:0,right:0,top:0,bottom:0};
	Alloy.Globals.loadReloadSearchBooks_engine_tableView.separatorStyle				= Ti.UI.TABLE_VIEW_SEPARATOR_STYLE_SINGLE_LINE;
	Alloy.Globals.loadReloadSearchBooks_engine_tableView.selectionStyle 				= Ti.UI.iOS.TableViewCellSelectionStyle.NONE;
	Alloy.Globals.loadReloadSearchBooks_engine_tableView.separatorHeight			= '2dp';
	
}

Alloy.Globals.loadReloadSearchBooks_igniter 								= function(){

	if(Alloy.Globals.DOING_search_request)return;
	Alloy.Globals.DOING_search_request 										= true;
	
	if(Alloy.Globals.loadReloadSearchBooks_display_tableView == null)return;
	
	Alloy.Globals.loadReloadSearchBooks_display_tableView.visible= true;
	
	/***************** TABLEVIEW RàZ *****************/
	
	Alloy.Globals.loadReloadSearchBooks_display_scrollPos 		= 1;
	Alloy.Globals.loadReloadSearchBooks_display_DONE				= false;
	Alloy.Globals.loadReloadSearchBooks_DATAS_tableView		= [];
	Alloy.Globals.loadReloadSearchBooks_display_tableView.hiddenArray= [];
	
   	Alloy.Globals.loadReloadSearchBooks_API_endpoint_params.the_user= Alloy.Globals.THE_USER.id_user;
	Alloy.Globals.loadReloadSearchBooks_API_endpoint_params.show_me_the_page= Alloy.Globals.loadReloadSearchBooks_display_scrollPos;
	Alloy.Globals.loadReloadSearchBooks_API_endpoint_params.by_page= Alloy.Globals.loadReloadSearchBooks_display_scrollLimit;
		
	Alloy.Globals.loadReloadSearchBooks_display_tableView.setData([]);
	
	/***************** TABLEVIEW ROWS CLICK *****************/
	
	if(!Alloy.Globals.loadReloadSearchBooks_display_tableView.clicsDONE){
		
		if(!Alloy.Globals.loadReloadSearchBooks_display_tableView.custom_handler){
			
			Alloy.Globals.loadReloadSearchBooks_display_tableView.addEventListener("click", function(e) {
			
				Alloy.Globals.preventDoubleClick(this);
				
				//////////// GOOGLE ANALYTICS 
				
				Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
					category: 																		"App. navigation process",
					label: 																				"Click on something listed",
					action: 																			"click on a search/list result",
					value: 																				1
				});
				
				var retrieveDATAS 															= this.hiddenArray[e.index];
				
				Alloy.Globals.app.goTo(
					"page_1_a_2_onebook",
					{
						id: 																				retrieveDATAS.book_id
					}
				);
			 	
			});
			
		}
		else{
			
			Alloy.Globals.loadReloadSearchBooks_display_tableView.addEventListener("click",Alloy.Globals.loadReloadSearchBooks_display_tableView.custom_handler);
			
		}
		
	}
	
	Alloy.Globals.loadReloadSearchBooks_display_tableView.clicsDONE= true;
	
	/***************** DATAS LOAD *****************/
	    		
	Alloy.Globals.loadReloadSearchBooks_fetch_Collection.fetch({
		localOnly: 										false,
	    urlparams: 										Alloy.Globals.loadReloadSearchBooks_API_endpoint_params,
	    parentNode: 									function (loaded_data, options) {
		    
		    if(!loaded_data)return;
		    if(typeof loaded_data == 'undefined')return;
		    if(loaded_data == '' || loaded_data == null)return;
	
	    	/////////Alloy.Globals.Logs.llog('---------------- INIT + JSON DISTANT ----------------');
	    	/////////Alloy.Globals.Logs.llog(loaded_data['output-array']);
		    
	    	Alloy.Globals.loadReloadSearchBooksPopulate(loaded_data['output-array']);
    
	    	var page_before						= parseInt(loaded_data['output-page-before']);
	    	var page_last 							= parseInt(loaded_data['output-page-last']);
	    	
	    	if( page_before == page_last-1 || (page_before == 1 && page_before == page_last) ){
	    		
	        	Alloy.Globals.loadReloadSearchBooks_display_DONE= true;
	        	
        	}
		    
		}
	});
	
	Alloy.Globals.loadReloadSearchBooks_display_tableView.touchEnabled= false;
	
	setTimeout(function() {
		Alloy.Globals.loadReloadSearchBooks_display_tableView.scrollToTop(0);
    	Alloy.Globals.loadReloadSearchBooks_display_tableView.touchEnabled= true;
    }, 500);

};

Alloy.Globals.loadReloadSearchBooks_loader 								= function(e){
	
	Alloy.Globals.loadReloadSearchBooks_API_endpoint_params.show_me_the_page= Alloy.Globals.loadReloadSearchBooks_display_scrollPos;
	Alloy.Globals.loadReloadSearchBooks_API_endpoint_params.by_page= Alloy.Globals.loadReloadSearchBooks_display_scrollLimit;

	Alloy.Globals.loadReloadSearchBooks_fetch_Collection.fetch({
        add: 												true,
        silent: 												true,
        returnExactServerResponse:		true,
		localOnly: 										false,
        urlparams: 										Alloy.Globals.loadReloadSearchBooks_API_endpoint_params,
	    parentNode: 									function (loaded_data, options) {
		    
		    if(!loaded_data)return;
		    if(typeof loaded_data == 'undefined')return;
		    if(loaded_data == '' || loaded_data == null)return;
            
	    	/////////Alloy.Globals.Logs.llog('---------------- SCROLL + JSON DISTANT ----------------');
	    	/////////Alloy.Globals.Logs.llog(loaded_data['output-array']);
	    	
	    	var page_before						= parseInt(loaded_data['output-page-before']);
	    	var page_last 							= parseInt(loaded_data['output-page-last']);
    
	    	if( page_before == page_last-1 || (page_before == 1 && page_before == page_last) ){
	    		
        		e.done();
        		
        		if(!Alloy.Globals.loadReloadSearchBooks_display_DONE){
	    		
	    			Alloy.Globals.loadReloadSearchBooksPopulate(loaded_data['output-array']);
	        		Alloy.Globals.loadReloadSearchBooks_display_DONE= true;
	        		
				}
        		
			}
	    	else{
	    		
	    		Alloy.Globals.loadReloadSearchBooksPopulate(loaded_data['output-array']);
        		e.success();
        		
			}

		}
    });

};

Alloy.Globals.loadReloadSearchBooks_engine								= function(the_search_button,the_search_close_button,the_search_field_container,the_search_field,the_table_view,the_results_theme,tag1,tag2,changeCollection){
	
	delete Alloy.Globals.loadReloadSearchBooks_display_tableView;
	
	Alloy.Globals.loadReloadSearchBooks_display_tableView 		= the_table_view;
	Alloy.Globals.loadReloadSearchBooks_display_rows 				= the_results_theme;
	
	if(typeof changeCollection != 'undefined'){
		Alloy.Globals.loadReloadSearchBooks_fetch_Collection 		= changeCollection;
	}
	else{
		Alloy.Globals.loadReloadSearchBooks_fetch_Collection		= Alloy.createCollection('BookSales');
	}
	
	var final_top_position_searchBar 												= 80;
	var final_top_position_tableView 												= 126;
	var HP_case 																					= Alloy.Globals.loadReloadSearchBooks_display_tableView.hp || Alloy.Globals.CurrentWindow == Alloy.Globals.THE_START_PAGE;
	
	var hideSearchBar                                                           				= Ti.UI.createAnimation({
        curve: 																							Ti.UI.ANIMATION_CURVE_LINEAR,
        duration: 																					150,
		zIndex:																						1,
		top:																								0
	});

	var hideSearchBarTableview                                						= Ti.UI.createAnimation({
        curve: 																							Ti.UI.ANIMATION_CURVE_LINEAR,
        duration: 																					250,
		top:																								'100%'
	});
    
    /***** CLICK ON MAGNIFIER (search START) *****/
   
	if(the_search_button)the_search_button.addEventListener("click", function(e) {
	
		Alloy.Globals.preventDoubleClick(this);
		
		Alloy.Globals.loadReloadSearchBooks_display_tableView 	= the_table_view;
	
		HP_case 																						= Alloy.Globals.loadReloadSearchBooks_display_tableView.hp || Alloy.Globals.CurrentWindow == Alloy.Globals.THE_START_PAGE;
		
		if(HP_case){
			Alloy.Globals.loadReloadSearchBooks_display_tableView.hp= true;
		}
		
		delete Alloy.Globals.loadReloadSearchBooks_API_endpoint_params.local_search;
		
		the_search_field_container.zIndex 											= 21;
		the_search_field_container.top 												= final_top_position_searchBar;
		
		//////////// GOOGLE ANALYTICS 
		
		Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
			category: 																				"App. navigation process",
			label: 																						"Launch the search engine",
			action: 																					"search something",
			value: 																						1
		});
	 	
	});
    
    /***** CLICK ON CROSS (search END) *****/
   
   var the_search_close_button_close 												= function(e) {
	
		Alloy.Globals.preventDoubleClick(this);
		
		HP_case 																						= Alloy.Globals.loadReloadSearchBooks_display_tableView.hp || Alloy.Globals.CurrentWindow == Alloy.Globals.THE_START_PAGE;
		
		if(the_search_field.getValue().length == 0){
			
			the_search_field_container.animate(hideSearchBar);
			
			if(!HP_case){
				Alloy.Globals.loadReloadSearchBooks_display_tableView.animate(hideSearchBarTableview);
	 			the_search_field.blur();
			}
			else{
				Alloy.Globals.loadReloadSearchBooks_display_tableView.top= 80;
			}
	
			delete Alloy.Globals.loadReloadSearchBooks_API_endpoint_params.search;
			delete Alloy.Globals.loadReloadSearchBooks_API_endpoint_params.tag_book;
			delete Alloy.Globals.loadReloadSearchBooks_API_endpoint_params.local_search;
			delete the_search_close_button;

			////////// RESET IF HOMEPAGE TB
			
			if(HP_case)
				Alloy.Globals.loadReloadSearchBooks_igniter();
			
			Alloy.Globals.loadReloadSearchBooks_use_custom_results_array= false;
				
			//////////// GOOGLE ANALYTICS 
			
			Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
				category: 																			"App. navigation process",
				label: 																					"Close the search engine",
				action: 																				"stop to search something",
				value: 																					1
			});
			
			if( typeof Alloy.Globals.toCloseWindows['on_profile_page'] != 'undefined' ){ /* SEARCH SOMETHING ELSE THAN BOOKS */
				if(HP_case)return;
				if(!Alloy.Globals.deep_referenced_items_for_a_later_control['topbar_on_profile_page'])return;
				Alloy.Globals.loadReloadSearchBooks_display_tableView.animate(hideSearchBarTableview);
				Alloy.Globals.deep_referenced_items_for_a_later_control['topbar_on_profile_page'].visible= false;
				the_search_field_container.top 										= -81;
			}
				
	 	}
	 	else{

	 		the_search_field.prevent 														= true;
	 		the_search_field.setValue('');
	 		
	 	}
		
	};

	if(!the_search_close_button.already_binded)the_search_close_button.addEventListener("click", the_search_close_button_close);
	
	the_search_close_button.already_binded 									= true;
    
    /***** SEARCH AFTER EACH TEXTFIELD UPDATE *****/
	
	var the_search_field_on_change 												= function(e) {
		
		var the_search_terms 																= e.source.getValue();
		
		HP_case 																						= Alloy.Globals.loadReloadSearchBooks_display_tableView.hp || Alloy.Globals.CurrentWindow == Alloy.Globals.THE_START_PAGE;
		
		if(e.source.prevent){
			delete this.prevent;
			return;
		}
		
		if(the_search_terms.length < 3){
			
			if(!HP_case){
				Alloy.Globals.loadReloadSearchBooks_display_tableView.top= '100%';
			}
			
			if( typeof Alloy.Globals.toCloseWindows['on_profile_page'] != 'undefined' ){ /* SEARCH SOMETHING ELSE THAN BOOKS */
				if(HP_case)return;
				if(!Alloy.Globals.deep_referenced_items_for_a_later_control['topbar_on_profile_page'])return;
				Alloy.Globals.loadReloadSearchBooks_display_tableView.top= final_top_position_tableView;
				Alloy.Globals.loadReloadSearchBooks_display_tableView.visible= true;
				delete Alloy.Globals.loadReloadSearchBooks_API_endpoint_params.search;
				Alloy.Globals.loadReloadSearchBooks_igniter();
			}
	
		}
		else{
			
			if(!HP_case){
				Alloy.Globals.loadReloadSearchBooks_display_tableView.top= final_top_position_tableView;
				Alloy.Globals.loadReloadSearchBooks_display_tableView.visible= true;
			}
			
			Alloy.Globals.loadReloadSearchBooks_API_endpoint_params.search= the_search_terms.trim();
			
			Alloy.Globals.loadReloadSearchBooks_igniter();
			
		}
		
	};

	if(!the_search_field.already_binded)the_search_field.addEventListener("change", the_search_field_on_change);
	the_search_field.already_binded 												= true;
	
    /***** CASE OF SEARCH-TAGS (AUTO) *****/
   
	if(tag1 != false || tag2 != false){
		
		if(!HP_case){
			Alloy.Globals.loadReloadSearchBooks_display_tableView.top= final_top_position_tableView;
			Alloy.Globals.loadReloadSearchBooks_display_tableView.visible= true;
		}
		
		the_search_field_container.zIndex 											= 21;
		the_search_field_container.top 												= final_top_position_searchBar;
		
		the_search_field.prevent 															= true;
		the_search_field.editable 														= false;
		
		if(tag1 != false){
			Alloy.Globals.loadReloadSearchBooks_API_endpoint_params.tag_book= tag1;
			the_search_field.setValue(tag1);
		}	
		if(tag2 != false){
			Alloy.Globals.loadReloadSearchBooks_API_endpoint_params.tag_book= tag2;
			the_search_field.setValue(tag2);
		}
		
		Alloy.Globals.loadReloadSearchBooks_igniter();
			
		setTimeout(function(){
			the_search_field.editable 													= true;
		},2000);
		
	}

};

Alloy.Globals.loadReloadSearchBooksPopulate 							= function(books) {
	
	if(!Alloy.Globals.endPoints.defaultBookImage)return;
	if(Alloy.Globals.loadReloadSearchBooks_display_DONE)return;
	
	var local_array_case 																		= Alloy.Globals.loadReloadSearchBooks_use_custom_results_array;
	
	if(local_array_case != false){
		
		/****** LOCAL RESULTS + FILTERING (Global input Change event)  *******/

		books 																							= Alloy.Globals.loadReloadSearchBooks_use_custom_results_array.filter(
			function(defined_items){
				var live_user_input 															= Alloy.Globals.deep_referenced_items_for_a_later_control['modal_searchfield_on_profile_page'].getValue();
			    return(
			    	(defined_items.pathway_title != null && defined_items.pathway_title.indexOf(live_user_input) > -1) ||
			    	(defined_items.pathway_precision != null && defined_items.pathway_precision.indexOf(live_user_input) > -1) ||
			    	(defined_items.pathway_place != null && defined_items.pathway_place.indexOf(live_user_input) > -1) ||
			    	(defined_items.pathway_description != null && defined_items.pathway_description.indexOf(live_user_input) > -1) ||
			    	(defined_items.universite_name != null && defined_items.universite_name.indexOf(live_user_input) > -1) ||
			    	(defined_items.diplome_name != null && defined_items.diplome_name.indexOf(live_user_input) > -1) ||
			    	(defined_items.formation_name != null && defined_items.formation_name.indexOf(live_user_input) > -1) ||
			    	(defined_items.parcours_name != null && defined_items.parcours_name.indexOf(live_user_input) > -1)
			    );
			}
		);
		
	}
	
	/////////Alloy.Globals.Logs.llog(JSON.stringify(books));
	
	var local_tableView_rows 															= [];

	if(typeof books != 'undefined' && books && books.length > 0)for (var i=0; i<books.length; i++) {
    	
		var item_book 																			= books[i];
    	Alloy.Globals.loadReloadSearchBooks_DATAS_tableView.push(item_book);
    	
	}
	
	Alloy.Globals.loadReloadSearchBooks_display_tableView.hiddenArray= Alloy.Globals.loadReloadSearchBooks_DATAS_tableView;
        	
	for (var i=0; i<Alloy.Globals.loadReloadSearchBooks_DATAS_tableView.length; i++) {
		
		var book 																					= Alloy.Globals.loadReloadSearchBooks_DATAS_tableView[i];
		var row_default_image 															= Alloy.Globals.loadReloadSearchBooks_display_tableView.rowDefaultImage ? Alloy.Globals.loadReloadSearchBooks_display_tableView.rowDefaultImage : Alloy.Globals.endPoints.defaultBookImage;
		var book_photo 																			= (book.sale_photo_json != null && book.sale_photo_json.indexOf('{') > -1) ? JSON.parse(book.sale_photo_json) : {current:row_default_image} ;
		
		if(book.book_title == null)continue;
		
		///////////
		/////////// EVER DEFINED DATA SOURCE
		///////////
		
		if(
			local_array_case != false ||
			Alloy.Globals.loadReloadSearchBooks_display_rows == 'list_cell_pathway'
		){
			
			var cell_filling_object															= {
				"#bookTitle": {
					text: 							book.book_title
				},
				"#bookPhotoContainer": {
					visible: 					 	!local_array_case ? true : false,
					width: 						!local_array_case ? 60 : 0
				},
				"#bookPhoto": {
					image: 						!local_array_case ? book_photo.current : '/images/blank.png'
				},
			};
			
		}
		
		///////////
		/////////// API DATA SOURCE
		///////////
		
		else{
			
			if(book.sale_photo_json == null)book.total_sellers 			= 0;
			if(book.book_price_min == null)book.book_price_min		= 0;
			if(book.book_price_max == null)book.book_price_max		= 0;
			if(book.book_reco == null)book.book_reco							= 0;
			
			var book_prices 																	= (book.book_price_min == book.book_price_max) ? parseInt(book.book_price_min) +'€' : parseInt(book.book_price_min) + '-' + parseInt(book.book_price_max) + '€';
			var bookDesc																			= book.sale_description == null ? '' : ((book.sale_description.length > 76) ? book.sale_description.substr(0, 76).trim()+'...' : book.sale_description);
			var bookSellersText 																= (book.total_sellers > 1) ? book.total_sellers+' swappeurs vendent ce livre' :  book.total_sellers + ' swappeur vend ce livre';
			bookSellersText 																	= (book.total_sellers == 0) ? 'Personne ne vend ce livre' : bookSellersText;
			var bookRotationText 															= Ti.UI.create2DMatrix({rotate: -18});
			
			//////////////////
			////////////////// CELL PRE-FILLING
			//////////////////
			
			var cell_filling_object															= {
				"#bookTitle": {
					text: 							book.book_title,
					verticalAlign: 				(book.book_title.length <= 28) ? Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER : Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
				},
				"#bookAuthor": {
					text: 							book.author_name
				},
				"#bookEdition": {
					text: 							book.editor_name+book.book_edition
				},
				"#bookDescription": {
					text: 							bookDesc
				},
				"#bookPrices": {
					text: 							book_prices
				},
				"#bookSellers": {
					text: 							bookSellersText
				},
				"#bookPhoto": {
					image: 						book_photo.current 		/////////// 350 x 500 pixels
				},
				"#bookIsReco": {
					visible: 						(parseInt(book.book_reco) > 0) ? true : false
				}
			};
		
		}
		
		//////////////////
		////////////////// CELL CREATION
		//////////////////
		
		var cell 																						= Alloy.createController("parts/"+Alloy.Globals.loadReloadSearchBooks_display_rows);
		cell.updateViews(cell_filling_object);
			
				////////////////// RECO LABEL
				if(OS_IOS){
					cell.getView('bookIsReco').setAnchorPoint({x:1,y:1});
				}
				else if(OS_ANDROID){
					bookRotationText.anchorPoint										= { x:1,y:1};
				}
				cell.getView('bookIsReco').transform								= bookRotationText;
			
		//////////////////
		////////////////// CELL EFFECTIVE INSERTION
		//////////////////
		
		local_tableView_rows.push(cell.getView());
		
	}
	
	Alloy.Globals.loadReloadSearchBooks_display_tableView.setData(local_tableView_rows);
	
	Alloy.Globals.loadReloadSearchBooks_display_scrollPos 		+= 1;

	Alloy.Globals.DOING_search_request 										= false;
	
	Alloy.Globals.Loading.hide();
	
};

/************************************************************************************* */
/* ******************* 16 = MESSAGES AND NOTIFICATIONS CONTROLLER ****************** */
/************************************************************************************* */

Alloy.Globals.loadReloadConversations 		= function(silent_mode,inside_controller,container,tableView,datas,datas_collection,query_param1,query_param2,empty_item,tab){

	Alloy.Globals.Requests.isOnlineTEST();
	
	if( typeof Alloy.Globals.loadReloadConversations_TIMER !== "undefined" ){
		
		/////////Alloy.Globals.Logs.llog('------- CLEAR TIMEOUT de loadReloadConversations(); --------');
		clearTimeout(Alloy.Globals.loadReloadConversations_TIMER);
		
	}
	    	
	/***************/
	/* TIMER MODE */
	/**************/
	if(
		silent_mode == true
	){
			
		Alloy.Globals.loadReloadConversations_TIMER= setTimeout(function(){
			
			var local_slient_mode 						= Alloy.Globals.Messages_tableView_MODE == 'MESSAGES' ? true : false;
			if(inside_controller != false && inside_controller != true)local_slient_mode= true;
			
			////////Alloy.Globals.Logs.llog('-------TIMEOUT = on reload après 3 secondes : loadReloadConversations(); + local_side_mode = '+local_slient_mode+' --------');
			
			Alloy.Globals.loadReloadConversations(local_slient_mode,inside_controller,container,tableView,datas,datas_collection,query_param1,query_param2,empty_item,tab);
			
		},3000);
		
		if(!Alloy.Globals.underground_TIMERS_are_in_pause)Alloy.Globals.IntervalConversationsANDNotifications_1(inside_controller,container,tableView,datas,datas_collection,query_param1,query_param2,empty_item,tab);
		
		/*
			1 > Alloy.Globals.IntervalConversationsANDNotifications_1()
				2 > Alloy.Globals.IntervalConversationsANDNotifications_2()
					3 > Alloy.Globals.PREpopulateConversations()
					4 > Alloy.Globals.populateConversationsOrNotifications()
		*/
		
		return;
		
	}
	    	
	/****************/
	/* FETCH DATAS */
	/***************/
	datas 															= [];
	datas_collection.fetch({
	    urlparams: {
	        show_me_the_page: 		1,
	        by_page: 							query_param1,
	        the_user: 							query_param2
	    },
		localOnly: false,
	    parentNode: function (loaded_data, options) {
		    
		    if(!loaded_data)return;
		    if(typeof loaded_data == 'undefined')return;
		    if(loaded_data == '' || loaded_data == null)return;
	
	    	Alloy.Globals.Logs.llog('---------------- INIT + JSON DISTANT (loadReloadConversations) ----------------');
		    /////////Alloy.Globals.Logs.llog(loaded_data['output-array']);
		    
		    Alloy.Globals.PREpopulateConversations(loaded_data['output-array'],inside_controller,container,tableView,empty_item,tab);
			Alloy.Globals.populateConversationsOrNotifications(loaded_data['output-array'],'MESSAGES',inside_controller,container,tableView);
		    
		}
	});
	
	/****************************/
	/* RESET TABLEVIEW DISPLAY */
	/***************************/
	if(
		silent_mode == false &&
		inside_controller === true
	){
		
		tableView.touchEnabled						= false;
		setTimeout(function() {
			tableView.scrollToTop(0);
	    	tableView.touchEnabled					= true;
	    }, 500);
	    
	}

};

Alloy.Globals.loadReloadNotifications 		= function(silent_mode,inside_controller,container,tableView,datas,datas_collection,query_param1,query_param2,empty_item,tab){

	Alloy.Globals.Requests.isOnlineTEST();
	
	if( typeof Alloy.Globals.loadReloadNotifications_TIMER !== "undefined" ){
		
		////////Alloy.Globals.Logs.llog('------- CLEAR TIMEOUT de loadReloadNotifications(); --------');
		clearTimeout(Alloy.Globals.loadReloadNotifications_TIMER);
		
	}
	    	
	/***************/
	/* TIMER MODE */
	/**************/
	if(
		silent_mode == true
	){
			
		Alloy.Globals.loadReloadNotifications_TIMER= setTimeout(function(){
			
			var local_slient_mode 						= Alloy.Globals.Messages_tableView_MODE == 'NOTIFICATIONS' ? true : false;
			if(inside_controller != false && inside_controller != true)local_slient_mode= true;
			
			////////Alloy.Globals.Logs.llog('-------TIMEOUT = on reload après 4,5 secondes : loadReloadNotifications(); + local_side_mode = '+local_slient_mode+' --------');
			
			Alloy.Globals.loadReloadNotifications(local_slient_mode,inside_controller,container,tableView,datas,datas_collection,query_param1,query_param2,empty_item,tab);
			
		},4500);
		
		if(!Alloy.Globals.underground_TIMERS_are_in_pause)Alloy.Globals.IntervalConversationsANDNotifications_1(inside_controller,container,tableView,datas,datas_collection,query_param1,query_param2,empty_item,tab);
		
		/*
			1 > Alloy.Globals.IntervalConversationsANDNotifications_1()
				2 > Alloy.Globals.IntervalConversationsANDNotifications_2()
					3 > Alloy.Globals.PREpopulateNotifications()
					4 > Alloy.Globals.populateConversationsOrNotifications()
		*/
		
		return;
		
	}
	    		
	/****************/
	/* FETCH DATAS */
	/***************/
	datas 															= [];
	datas_collection.fetch({
	    urlparams: {
	        show_me_the_page: 		1,
	        by_page: 							query_param1,
	        the_user: 							query_param2
	    },
		localOnly: false,
	    parentNode: function (loaded_data, options) {
		    
		    if(!loaded_data)return;
		    if(typeof loaded_data == 'undefined')return;
		    if(loaded_data == '' || loaded_data == null)return;
	
	    	Alloy.Globals.Logs.llog('---------------- INIT + JSON DISTANT (loadReloadNotifications) ----------------');
		    /////////Alloy.Globals.Logs.llog(loaded_data['output-array']);
		    
			Alloy.Globals.PREpopulateNotifications(loaded_data['output-array'],inside_controller,container,tableView,empty_item,tab);
			Alloy.Globals.populateConversationsOrNotifications(loaded_data['output-array'],'NOTIFICATIONS',inside_controller,container,tableView);
		    
		}
	});
	
	/****************************/
	/* RESET TABLEVIEW DISPLAY */
	/***************************/
	if(
		silent_mode == false &&
		inside_controller === true
	){
		
		tableView.touchEnabled 						= false;
		setTimeout(function() {
			tableView.scrollToTop(0);
	    	tableView.touchEnabled 					= true;
	    }, 500);
	    
	}

};

Alloy.Globals.IntervalConversationsANDNotifications_1= function(inside_controller,container,tableView,datas,datas_collection,query_param1,query_param2,empty_item,tab){

	if(!Alloy.Globals.endPoints.conversationsGet)return;
	if(!Alloy.Globals.endPoints.notificationsGet)return;
	
	var endPoint 												= ( Alloy.Globals.Messages_tableView_MODE == 'MESSAGES' ) ? Alloy.Globals.endPoints.conversationsGet : Alloy.Globals.endPoints.notificationsGet;	
	if(inside_controller != false && inside_controller != true){
		endPoint 												= ( inside_controller == 'MESSAGES' ) ? Alloy.Globals.endPoints.conversationsGet : Alloy.Globals.endPoints.notificationsGet ;	
	}

	request_input												= [];
	request_input['NO_LIMIT']						= true;
	request_input['async_execution']			= Alloy.Globals.IntervalConversationsANDNotifications_2;
	request_input['async_params']				= {
		mode: 									(inside_controller != false && inside_controller != true) ? inside_controller : Alloy.Globals.Messages_tableView_MODE,
		inside_controller: 				inside_controller,
		container: 							container,
		tableView: 							tableView,
		datas: 									datas,
		datas_collection: 				datas_collection,
		query_param1: 					query_param1,
		query_param2: 					query_param2,
		empty_item: 						empty_item,
		tab: 										tab
	};
	
	/* ********* AJAX API QUERY ********* */
	Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		endPoint,
		{
	        show_me_the_page: 	1,
	        by_page: 						query_param1,
	        the_user: 						query_param2
		},
		request_input,
		false,
		true
	);
	
};

Alloy.Globals.IntervalConversationsANDNotifications_2= function(JSON_returned,local_params){

	if(
		typeof JSON_returned['error'] !== 'undefined'
	){
		
		Alloy.Globals.Logs.llog('Erreur Swapbook '+JSON_returned['error-message']);
		
		if(JSON_returned['error-message'].indexOf('session') > -1){
			clearTimeout(Alloy.Globals.loadReloadConversations_TIMER);
			clearTimeout(Alloy.Globals.loadReloadNotifications_TIMER);
		}
		
	}
	else{
		
	   	/////////Alloy.Globals.Logs.llog('---------------- MODE SILENT > '+local_params.mode +' ---------------');
	   	/////////Alloy.Globals.Logs.llog(JSON_returned['output-array']);
	
		local_params.tableView.is_visible 		= true;
	    	
		if(local_params.mode == 'MESSAGES'){
		
		    Alloy.Globals.PREpopulateConversations(JSON_returned['output-array'],local_params.inside_controller,local_params.container,local_params.tableView,local_params.empty_item,local_params.tab);
			Alloy.Globals.populateConversationsOrNotifications(JSON_returned['output-array'],'MESSAGES',local_params.inside_controller,local_params.container,local_params.tableView);
			
		}
		else{
	
			Alloy.Globals.PREpopulateNotifications(JSON_returned['output-array'],local_params.inside_controller,local_params.container,local_params.tableView,local_params.empty_item,local_params.tab);
			Alloy.Globals.populateConversationsOrNotifications(JSON_returned['output-array'],'NOTIFICATIONS',local_params.inside_controller,local_params.container,local_params.tableView);
		    
		}
		
	}
	
};

Alloy.Globals.PREpopulateConversations	= function(conversations,inside_controller,container,tableView,empty_item,tab) {
	
	/////////Alloy.Globals.Logs.llog(' >>> APPEL DE PREpopulateConversations() <<< ');
	
	var total_not_read_conversations 			= 0;
	
	Alloy.Globals.tableView_datas_messages= [];
	
	if(
		inside_controller == true &&
		conversations.length < 1 &&
		Alloy.Globals.Messages_tableView_MODE == 'MESSAGES' 
	){
	
			tableView.height 								= 0;
			tableView.visible 								= false;
			empty_item.height 							= '70%';
			empty_item.text 								= 'Aucune conversation';
			empty_item.visible 							= true;
		
	}
	else if(
		inside_controller == true &&
		conversations.length >= 1 &&
		Alloy.Globals.Messages_tableView_MODE == 'MESSAGES' 
	){
		
		empty_item.visible 								= false;
		empty_item.height 								= 0;
		tableView.visible 									= true;
		
	}
			
	for (var i=0; i<conversations.length; i++) {
		
		var conversation 									= conversations[i];
		var conversation_user1 						= parseInt(conversation.id_user_1);
		var conversation_user2 						= parseInt(conversation.id_user_2);
		var conversation_userX 						= parseInt(conversation.le_dernier_message_par_user_id);
		
		/*///////////////// DUO CONVERSATION */

		if( conversation.type == 'duo' ){
		
			if( 
				conversation_user1 == Alloy.Globals.THE_USER.id_user &&
				parseInt(conversation.user_1_last_read) < parseInt(conversation.user_2_last_message) &&
				parseInt(conversation.user_2_last_message) != 0
			){
				total_not_read_conversations++;
			}
			else if( 
				conversation_user2 == Alloy.Globals.THE_USER.id_user &&
				parseInt(conversation.user_2_last_read) < parseInt(conversation.user_1_last_message) &&
				parseInt(conversation.user_1_last_message) != 0
			){
				total_not_read_conversations++;
			}
			
		}
		
		/*///////////////// GROUP CONVERSATION */
		
		else{

			if( 
				conversation_user1 == Alloy.Globals.THE_USER.id_user &&
				parseInt(conversation.user_1_last_read) < parseInt(conversation.user_2_last_message) &&
				parseInt(conversation.user_2_last_message) != 0
			){
				total_not_read_conversations++;
			}
			else if( 
				conversation_user2 == Alloy.Globals.THE_USER.id_user &&
				parseInt(conversation.user_2_last_read) < parseInt(conversation.user_1_last_message) &&
				parseInt(conversation.user_1_last_message) != 0
			){
				total_not_read_conversations++;
			}
			else if( 
				conversation_user1 != Alloy.Globals.THE_USER.id_user &&
				conversation_user2 != Alloy.Globals.THE_USER.id_user &&
				conversation_userX != Alloy.Globals.THE_USER.id_user &&
				parseInt(conversation.le_dernier_message_date_current_user) > 0 &&
				parseInt(conversation.le_dernier_message_date) > parseInt(conversation.le_dernier_message_date_current_user)
			){
				total_not_read_conversations++;
			}
			
		}
			
	}
	
	//////Alloy.Globals.Logs.llog(' >>> TOTAL NON LUS <<< ');
	//////Alloy.Globals.Logs.llog(total_not_read_conversations);
	//////Alloy.Globals.Logs.llog(Alloy.Globals.cumul_badge_left_messages);
	Alloy.Globals.cumul_badge_left_messages= total_not_read_conversations;

	/*********************** DISPLAY CONTEXT ***********************/

	if(inside_controller == true && tab && tab.fortab == 'MESSAGES'){
		
		if(total_not_read_conversations > 0){
			
			tab.title												= 'MESSAGES ('+total_not_read_conversations+')';
			tab.cumul											= total_not_read_conversations;
			
		}
		else{
			
			tab.title												= 'MESSAGES';
			tab.cumul											= 0;
			
		}
		
	}
	
	/*********************** UPDATE BOTTOM BAR LEFT BADGE ***********************/
	
	Alloy.Globals.badgeForConversationsOrNotifications();

};

Alloy.Globals.PREpopulateNotifications		= function(notifications,inside_controller,container,tableView,empty_item,tab) {
	
	/////////Alloy.Globals.Logs.llog(' >>> APPEL DE PREpopulateNotifications() <<< ');

	var total_not_read_notifications 				= 0;
	
	Alloy.Globals.tableView_datas_notifications= [];
	
	if(
		inside_controller == true &&
		notifications.length < 1 &&
		Alloy.Globals.Messages_tableView_MODE == 'NOTIFICATIONS' 
	){
	
			tableView.height 								= 0;
			tableView.visible 								= false;
			empty_item.height 							= '70%';
			empty_item.text 								= 'Aucune notification';
			empty_item.visible 							= true;
		
	}
	else if(
		inside_controller == true &&
		notifications.length >= 1 &&
		Alloy.Globals.Messages_tableView_MODE == 'NOTIFICATIONS' 
	){
		
		empty_item.visible 								= false;
		empty_item.height 								= 0;
		tableView.visible 									= true;
		
	}

	for (var i=0; i<notifications.length; i++) {
		
		var notification 										= notifications[i];
		
		if(notification.notif_seen_date == "0000-00-00 00:00:00")
			total_not_read_notifications++;
			
	}
	
	//////Alloy.Globals.Logs.llog(' >>> TOTAL NON LUS <<< ');
	//////Alloy.Globals.Logs.llog(total_not_read_notifications);
	//////Alloy.Globals.Logs.llog(Alloy.Globals.cumul_badge_left_messages);
	Alloy.Globals.cumul_badge_left_notifications= total_not_read_notifications;
	
	/*********************** DISPLAY CONTEXT ***********************/
	
	 if(inside_controller == true && tab && tab.fortab == 'NOTIFICATIONS'){
			
		if(total_not_read_notifications > 0){
			
			tab.title												= 'NOTIFICATIONS ('+total_not_read_notifications+')';
			tab.cumul											= total_not_read_notifications;
			
		}
		else{
			
			tab.title												= 'NOTIFICATIONS';
			tab.cumul											= 0;
			
		}
		
	}
	
	/*********************** UPDATE BOTTOM BAR LEFT BADGE ***********************/
	
	Alloy.Globals.badgeForConversationsOrNotifications();

};

Alloy.Globals.populateConversationsOrNotifications= function(conversations_or_notifications,mode,inside_controller,container,tableView){
	
	if(inside_controller === false)return;
	if(inside_controller != false && inside_controller != true)return;
	
	//////////Alloy.Globals.Logs.llog(' >>> APPEL DE populateConversationsOrNotifications() + MODE = '+mode+' <<< ');
	
	var tableView_rows 									= [];
	var tableView_to_consider 						= null;
	
	for (var i=0; i<conversations_or_notifications.length; i++) {
    	
		var item 													= conversations_or_notifications[i];
		
    	if( mode == 'MESSAGES' ){
    		
			/********** UNREAD CONVERSATION ************/
		
			var conv_is_unread							= false;
			var conversation_user1 					= parseInt(item.id_user_1);
			var conversation_user2 					= parseInt(item.id_user_2);
			var conversation_userX 					= parseInt(item.le_dernier_message_par_user_id);
		
			/*///////////////// DUO CONVERSATION */
	
			if( item.type == 'duo' ){
			
				if( 
					conversation_user1 == Alloy.Globals.THE_USER.id_user &&
					parseInt(item.user_1_last_read) < parseInt(item.user_2_last_message) &&
					parseInt(item.user_2_last_message) != 0
				){
					conv_is_unread							= true;
				}
				else if( 
					conversation_user2 == Alloy.Globals.THE_USER.id_user &&
					parseInt(item.user_2_last_read) < parseInt(item.user_1_last_message) &&
					parseInt(item.user_1_last_message) != 0
				){
					conv_is_unread							= true;
				}
				
			}
			
			/*///////////////// GROUP CONVERSATION */
			
			else{
			
				if( 
					conversation_user1 == Alloy.Globals.THE_USER.id_user &&
					parseInt(item.user_1_last_read) < parseInt(item.user_2_last_message) &&
					parseInt(item.user_2_last_message) != 0
				){
					conv_is_unread							= true;
				}
				else if( 
					conversation_user2 == Alloy.Globals.THE_USER.id_user &&
					parseInt(item.user_2_last_read) < parseInt(item.user_1_last_message) &&
					parseInt(item.user_1_last_message) != 0
				){
					conv_is_unread							= true;
				}
				else if( 
					conversation_user1 != Alloy.Globals.THE_USER.id_user &&
					conversation_user2 != Alloy.Globals.THE_USER.id_user &&
					conversation_userX != Alloy.Globals.THE_USER.id_user &&
					parseInt(item.le_dernier_message_date_current_user) > 0 &&
					parseInt(item.le_dernier_message_date) > parseInt(item.le_dernier_message_date_current_user)
				){
					conv_is_unread							= true;
				}
				
			}
			
			item.conv_is_unread 							= conv_is_unread;
		
			/********** SAVE CONVERSATION ************/
				
    		Alloy.Globals.tableView_datas_messages.push(item);
    		
    	}
    	else{
    		
			/********** UNSEEN NOTIFICATION ************/
		
			item.noti_is_unseen 							= (item.notif_seen_date == "0000-00-00 00:00:00") ? true : false;
    		
			/********** SAVE NOTIFICATION ************/
    		
    		Alloy.Globals.tableView_datas_notifications.push(item);
    		
    	}
    	
	}

	/////////////////////////////
	///////////////////////////// PRE-TESTS ON DATAS
	/////////////////////////////
	
    var datas_to_string 									= JSON.stringify(conversations_or_notifications);
	var test_rows 											= tableView.getData(); 

	/////////////////////////////
	///////////////////////////// POPULATE des Messages
	/////////////////////////////
	
	if( mode == 'MESSAGES' && Alloy.Globals.Messages_tableView_MODE == 'MESSAGES' ){
			
	    tableView_to_consider 							= Alloy.Globals.tableView_datas_messages;
		
		//////////// 
		//////////// ROWS DATAS CHANGING
		//////////// 
	
		if(
			Alloy.Globals.MEMORIZED_tableView_cells['messages'].length > 0 &&
			Alloy.Globals.MEMORIZED_tableView_cells['messages'] != datas_to_string
		)tableView.is_visible 							= false;
		
		if(tableView.force_regenerate)tableView.is_visible= false;
	
		if(tableView.is_visible == true){
			return;
		}
		
		//////////// 
		//////////// ROWS PREPARATION
		//////////// 
	
		if( Alloy.Globals.Messages_tableView_MODE == 'MESSAGES' ){

			if(
				!tableView.force_regenerate &&
				!Alloy.Globals.Windows_ALREADY_Opened['page_2_a_1_messages_LANDSCAPE'] && /* Permet de bien recharger la TableView si on reviens dessus, car cette exception bloque tout en cas de données identiques (avant/après)*/
				typeof Alloy.Globals.MEMORIZED_tableView_cells['messages'] == 'string' &&
				datas_to_string.length === Alloy.Globals.MEMORIZED_tableView_cells['messages'].length
			)return;
			
			tableView.setData( [] );
			Alloy.Globals.tableView_datas_messages_cells= [];
			
		}
	   
		delete tableView.force_regenerate;
	   
		for (var i=0; i<tableView_to_consider.length; i++) {
			
			var conversation 								= tableView_to_consider[i];
			
			var mutual_friends 							= (parseInt(conversation.nombre_total_amis_communs) == 0) ? 'Aucun ami en commun' : conversation.nombre_total_amis_communs+' amis en commun';
			mutual_friends 									= (parseInt(conversation.nombre_total_amis_communs) == 1) ?  '1 ami en commun' : mutual_friends;
			conversation.le_dernier_message 	= (conversation.le_dernier_message_type == 'image') ? 'a envoyé une photo' : conversation.le_dernier_message;
			var last_message 								= (conversation.le_dernier_message_par == 'Toi' && conversation.le_dernier_message != '') ? ( conversation.le_dernier_message == 'a envoyé une photo' ? 'Tu a envoyé une photo' : 'Toi : '+conversation.le_dernier_message ) : conversation.le_dernier_message; 
			last_message 									= (conversation.type == 'group') ? conversation.le_dernier_message_par+' : '+conversation.le_dernier_message : last_message;
			last_message 									= (conversation.le_dernier_message_type == 'event') ? conversation.le_dernier_message : last_message;
			var last_user_image 							= JSON.parse(conversation.le_dernier_message_par_user_photo); 
			var current_user_image					= JSON.parse(Alloy.Globals.THE_USER.user_photos_url_json);
			var pastille_si_lu_vu 							= "/images/validateBlue.png";
			if(conversation.le_dernier_message_read == true && conversation.le_dernier_message_par != 'Toi'){
				var pastille_si_lu_vu 						= last_user_image.current;
			}
			else if(conversation.le_dernier_message_read == true && conversation.le_dernier_message_par == 'Toi'){
				var pastille_si_lu_vu 						=  current_user_image.current;
			}
			else if(conversation.le_dernier_message_read != true && conversation.le_dernier_message_par != 'Toi'){
				var pastille_si_lu_vu 						= last_user_image.current;
			}
			
			var cell 												= Alloy.createController("parts/list_cell_conversation");
			var cell_creation 								= {
				"#convPhoto": {
					image: 										conversation.conversation_image,
					touchEnabled: 							false,
				},
				"#userName": {
					text: 											conversation.conversation_title,
					touchEnabled: 							false,
				},
				"#userFriends": {
					text: 											(conversation.type == 'group') ? 'Groupe à ' + conversation.nombre_total_participants + ' participants' : mutual_friends,
					touchEnabled: 							false,
				},
				"#userMess": {
					text: 											last_message,
					touchEnabled: 							false,
				},
				"#userMessDate": {
					text: 											conversation.le_dernier_message_date_txt,
					touchEnabled: 							false,
				},
				"#isParrainRelation": {
					visible: 										( Alloy.Globals.the_u_is_on_landscape == true ) ? false : ((conversation.is_relation_parrain == 'yes') ? true : false),
					touchEnabled: 							false,
					focusable: 									false,
					bubbleParent: 							false,
				},
				"#goToConv": {
					visible: 										( Alloy.Globals.the_u_is_on_landscape == true || Alloy.Globals.iPhoneShortWidth) ? false : true,
					touchEnabled: 							false,
					focusable: 									false,
					bubbleParent: 							false,
				},
				"#convSeen": {
					image: 										pastille_si_lu_vu
				},
			};
			
			/////////////////////
			///////////////////// ROW HIGHLIGHTING
			/////////////////////
				
			if( typeof conversation.conv_is_unread != 'undefined' && conversation.conv_is_unread == true ){
				
				cell.getView('rowContainer').backgroundColor 			= '#4d9ec0e1';
				cell.getView('separator').backgroundColor 				= '#aecfef';
				cell.getView('photoContainer').borderColor 				= '#aecfef';
				cell.getView('photoContainer').borderWidth 			= 7;
				
			}
			else{
				
				cell.getView('rowContainer').backgroundColor 			= '#fff';
				cell.getView('separator').backgroundColor 				= '#d2d2d2';
				cell.getView('photoContainer').borderColor 				= '#949494';
				cell.getView('photoContainer').borderWidth 			= 1;
						
			}
			
			/////////////////////
			///////////////////// ROW CREATION
			/////////////////////

			cell.updateViews(cell_creation);
			
			tableView_rows.push(cell.getView());
			Alloy.Globals.tableView_datas_messages_cells.push(cell);
			
		}
		
		//////////////////// 
		//////////////////// ROWS ADDITION
		//////////////////// 
		
		tableView.setData(tableView_rows);
		
		//////////////////// HEIGHT ADJUSTMENTS
		
		tableView.height 									= tableView.remember_height;
		
		//////////////////// 
		//////////////////// ROWS MEMORIZATION
		//////////////////// 
		
		Alloy.Globals.MEMORIZED_tableView_cells['messages']= datas_to_string;
		
	}
	
	/////////////////////////////
	///////////////////////////// POPULATE des Notitifications
	/////////////////////////////
	
	else if( mode == 'NOTIFICATIONS' && Alloy.Globals.Messages_tableView_MODE == 'NOTIFICATIONS' ){
		
	    tableView_to_consider 							= Alloy.Globals.tableView_datas_notifications;

		//////////// 
		//////////// ROWS DATAS CHANGING
		//////////// 
		
		if(
			Alloy.Globals.MEMORIZED_tableView_cells['notifications'].length > 0 &&
			Alloy.Globals.MEMORIZED_tableView_cells['notifications'] != datas_to_string
		)tableView.is_visible 							= false;
		
		if(tableView.force_regenerate)tableView.is_visible= false;
	
		if(tableView.is_visible == true){
			return;
		}
		
		//////////// 
		//////////// ROWS PREPARATION
		//////////// 
	
		if( Alloy.Globals.Messages_tableView_MODE == 'NOTIFICATIONS' ){
			
			if(
				!tableView.force_regenerate &&
				!Alloy.Globals.Windows_ALREADY_Opened['page_2_a_1_messages_LANDSCAPE'] && /* Permet de bien recharger la TableView si on reviens dessus, car cette exception bloque tout en cas de données identiques (avant/après)*/
				typeof Alloy.Globals.MEMORIZED_tableView_cells['notifications'] == 'string' &&
				datas_to_string.length === Alloy.Globals.MEMORIZED_tableView_cells['notifications'].length
			)return;
			
			tableView.setData( [] );
			Alloy.Globals.tableView_datas_notifications_cells= [];
			
		}
		
		delete tableView.force_regenerate;

		for (var i=0; i<tableView_to_consider.length; i++) {
			
			var notification 									= tableView_to_consider[i];
			
			var noti_propoose_yes_or_not 			= (notification.notif_type == 'by_swapbook_friendship' || notification.notif_type == 'by_swapbook_mentoring' ) ? true : false;
			var noti_text_width							= (notification.notif_type == 'by_swapbook_friendship' || notification.notif_type == 'by_swapbook_mentoring' ) ? '55%' : '70%';
			var noti_text_height							= (notification.notif_type == 'by_swapbook_friendship' || notification.notif_type == 'by_swapbook_mentoring' ) ? 60 : 50;
			var noti_image 									= notification.notif_image.indexOf('http') > -1 ? notification.notif_image : '/images/'+notification.notif_image;

			var cell 												= Alloy.createController("parts/list_cell_notification");
			var cell_creation 								= {
				"#notiPhoto": {
					image: 										noti_image,
					gotoProfile: 								noti_propoose_yes_or_not,
				},
				"#notiText": {
					text: 											notification.notif_body,
					width: 										Alloy.Globals.iPhoneShortWidth ? '40%' : noti_text_width,
					height: 										noti_text_height
				},
				"#notiDate": {
					text: 											notification.notif_il_y_a,
				},
				"#Decline": {
					visible: 										noti_propoose_yes_or_not,
					touchEnabled: 							true,
				},
				"#Accept": {
					visible: 										noti_propoose_yes_or_not,
					touchEnabled: 							true,
				},
			};
			
			/////////////////////
			///////////////////// ROW HIGHLIGHTING
			/////////////////////
				
			if( typeof notification.noti_is_unseen != 'undefined' && notification.noti_is_unseen == true ){
				
				cell.getView('rowContainer').backgroundColor 			= '#4d9ec0e1';
				cell.getView('separator').backgroundColor 				= '#94b9dc';
				cell.getView('photoContainer').borderColor 				= '#aecfef';
				cell.getView('photoContainer').borderWidth 			= 4;
				
			}
			else{
				
				cell.getView('rowContainer').backgroundColor 			= '#fff';
				cell.getView('separator').backgroundColor 				= '#d2d2d2';
				cell.getView('photoContainer').borderColor 				= '#949494';
				cell.getView('photoContainer').borderWidth 			= 1;
						
			}
			
			/////////////////////
			///////////////////// ROW CREATION
			/////////////////////

			cell.updateViews(cell_creation);
			
			tableView_rows.push(cell.getView());
			Alloy.Globals.tableView_datas_notifications_cells.push(cell);
		
		}

		//////////////////// 
		//////////////////// ROWS ADDITION
		//////////////////// 
		
		tableView.setData(tableView_rows);
		
		//////////////////// HEIGHT ADJUSTMENTS
		
		tableView.height 									= tableView.remember_height;
	
		//////////////////// 
		//////////////////// ROWS MEMORIZATION
		//////////////////// 
		
		Alloy.Globals.MEMORIZED_tableView_cells['notifications']= datas_to_string;
		
	}
	
	/////////////////////////////
	///////////////////////////// HIDE Loading
	/////////////////////////////
	
	Alloy.Globals.Loading.hide();
	
};

/******************************************************************************** */
/* ******************* 17 = USERS AND FRIENDSHIPS CONTROLLER ******************* */
/******************************************************************************** */

Alloy.Globals.loadReloadUsers 					= function(silent_mode,inside_controller,container,tableView,datas,datas_collection,query_param1,query_param2,empty_item,tab,page2UsersScrolls,pageScrollsDONE){
	    	
	if( Alloy.Globals.Network_tableView_MODE == 'RESEAU ')return;
	
	Alloy.Globals.Requests.isOnlineTEST();
	
	/****************/
	/* FETCH DATAS */
	/***************/
	pageScrolls 												= 1;
	pageScrollsDONE 										= false;
	datas_collection.fetch({
	    urlparams: {
	        show_me_the_page: 						pageScrolls,
	        by_page: 											query_param1,
	        the_user: 											query_param2
	    },
		localOnly: 												false,
	    parentNode: function (loaded_data, options) {
		    
		    if(!loaded_data)return;
		    if(typeof loaded_data == 'undefined')return;
		    if(loaded_data == '' || loaded_data == null)return;
	
	 		/////////Alloy.Globals.Logs.llog('---------------- INIT + JSON DISTANT (loadReloadUsers) ----------------');
		   	/////////Alloy.Globals.Logs.llog(loaded_data['output-array']);
		    
		    Alloy.Globals.PREpopulateUsers(loaded_data['output-array'],inside_controller,container,tableView,empty_item,tab);
			Alloy.Globals.populateUsersOrFriends(loaded_data['output-array'],'DECOUVERTE',inside_controller,container,tableView,page2UsersScrolls);
		    
		}
	});
	
	/****************************/
	/* RESET TABLEVIEW DISPLAY */
	/***************************/
	if(
		silent_mode == false &&
		inside_controller === true
	){
		
		tableView.touchEnabled						= false;
		setTimeout(function() {
			tableView.scrollToItem(0,0);
	    	tableView.touchEnabled					= true;
	    }, 500);
	    
	}

};

Alloy.Globals.loadReloadFriendships 			= function(silent_mode,inside_controller,container,tableView,datas,datas_collection,query_param1,query_param2,empty_item,tab){

	Alloy.Globals.Requests.isOnlineTEST();
	
	if( typeof Alloy.Globals.loadReloadFriendships_TIMER !== "undefined" ){
		
		////////Alloy.Globals.Logs.llog('------- CLEAR TIMEOUT de loadReloadFriendships(); --------');
		clearTimeout(Alloy.Globals.loadReloadFriendships_TIMER);
		
	}
	    	
	/***************/
	/* TIMER MODE */
	/**************/
	if(
		silent_mode == true
	){
			
		Alloy.Globals.loadReloadFriendships_TIMER= setTimeout(function(){
			
			var local_slient_mode 						= Alloy.Globals.Network_tableView_MODE == 'RESEAU' ? true : false;
			if(inside_controller != false && inside_controller != true)local_slient_mode= true;
			
			/////////Alloy.Globals.Logs.llog('-------TIMEOUT = on reload après 7 secondes : loadReloadFriendships(); + local_side_mode = '+local_slient_mode+' --------');
			
			Alloy.Globals.loadReloadFriendships(local_slient_mode,inside_controller,container,tableView,datas,datas_collection,query_param1,query_param2,empty_item,tab);
			
		},6000);
		
		if(!Alloy.Globals.underground_TIMERS_are_in_pause)Alloy.Globals.IntervalUsersANDFriends_1(inside_controller,container,tableView,datas,datas_collection,query_param1,query_param2,empty_item,tab);
		
		/*
			1 > Alloy.Globals.IntervalUsersANDFriends_1()
				2 > Alloy.Globals.IntervalUsersANDFriends_2()
					3 > Alloy.Globals.PREpopulateFriendships()
					4 > Alloy.Globals.populateUsersOrFriends()
		*/
		
		return;
		
	}
	    	
	/****************/
	/* FETCH DATAS */
	/***************/
	datas 															= [];
	datas_collection.fetch({
	    urlparams: {
	        show_me_the_page: 		1,
	        by_page: 							query_param1,
	        the_user: 							query_param2
	    },
		localOnly: false,
	    parentNode: function (loaded_data, options) {
		    
		    if(!loaded_data)return;
		    if(typeof loaded_data == 'undefined')return;
		    if(loaded_data == '' || loaded_data == null)return;
	
	    	Alloy.Globals.Logs.llog('---------------- INIT + JSON DISTANT (loadReloadFriendships) ----------------');
		    /////////Alloy.Globals.Logs.llog(loaded_data['output-array']);
		    
		    Alloy.Globals.PREpopulateFriendships(loaded_data['output-array'],inside_controller,container,tableView,empty_item,tab);
			Alloy.Globals.populateUsersOrFriends(loaded_data['output-array'],'RESEAU',inside_controller,container,tableView,null);
		    
		}
	});
	
	/****************************/
	/* RESET TABLEVIEW DISPLAY */
	/***************************/
	if(
		silent_mode == false &&
		inside_controller === true
	){
		
		tableView.touchEnabled						= false;
		setTimeout(function() {
			tableView.scrollToItem(0,0);
	    	tableView.touchEnabled					= true;
	    }, 500);
	    
	}

};

Alloy.Globals.IntervalUsersANDFriends_1	= function(inside_controller,container,tableView,datas,datas_collection,query_param1,query_param2,empty_item,tab){
	
	if(!Alloy.Globals.endPoints.usersGet)return;
	if(!Alloy.Globals.endPoints.friendsGet)return;
	
	var endPoint 												= ( Alloy.Globals.Network_tableView_MODE == 'DECOUVERTE' ) ? Alloy.Globals.endPoints.usersGet : Alloy.Globals.endPoints.friendsGet;	
	
	request_input												= [];
	request_input['NO_LIMIT']						= true;
	request_input['async_execution']			= Alloy.Globals.IntervalUsersANDFriends_2;
	request_input['async_params']				= {
		mode: 									Alloy.Globals.Network_tableView_MODE,
		inside_controller: 				inside_controller,
		container: 							container,
		tableView: 							tableView,
		datas: 									datas,
		datas_collection: 				datas_collection,
		query_param1: 					query_param1,
		query_param2: 					query_param2,
		empty_item: 						empty_item,
		tab: 										tab
	};
	
	/* ********* AJAX API QUERY ********* */
	Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		endPoint,
		{
	        show_me_the_page: 	1,
	        by_page: 						query_param1,
	        the_user: 						query_param2
		},
		request_input,
		false,
		true
	);
	
};

Alloy.Globals.IntervalUsersANDFriends_2	= function(JSON_returned,local_params){

	if(
		typeof JSON_returned['error'] !== 'undefined'
	){
		
		Alloy.Globals.Logs.llog('Erreur Swapbook '+JSON_returned['error-message']);
		
		if(JSON_returned['error-message'].indexOf('session') > -1){
			clearTimeout(Alloy.Globals.loadReloadFriendships_TIMER);
		}
		
	}
	else{
		
	   	/////////Alloy.Globals.Logs.llog('---------------- MODE SILENT > '+local_params.mode +' ---------------');
	   	/////////Alloy.Globals.Logs.llog(JSON_returned['output-array']);
	
		local_params.tableView.is_visible 		= true;
	    	
		if(local_params.mode == 'DECOUVERTE'){
		
		    Alloy.Globals.PREpopulateUsers(JSON_returned['output-array'],local_params.inside_controller,local_params.container,local_params.tableView,local_params.empty_item,local_params.tab);
			Alloy.Globals.populateUsersOrFriends(JSON_returned['output-array'],'DECOUVERTE',local_params.inside_controller,local_params.container,local_params.tableView);
			
		}
		else{
	
			Alloy.Globals.PREpopulateFriendships(JSON_returned['output-array'],local_params.inside_controller,local_params.container,local_params.tableView,local_params.empty_item,local_params.tab);
			Alloy.Globals.populateUsersOrFriends(JSON_returned['output-array'],'RESEAU',local_params.inside_controller,local_params.container,local_params.tableView,null);
		
		}
		
	}
	
};

Alloy.Globals.PREpopulateUsers					= function(users,inside_controller,container,tableView,empty_item,tab) {
	
	/////////Alloy.Globals.Logs.llog(' >>> APPEL DE PREpopulateUsers() <<< ');
	
	var total_not_read_users 							= 0;
	Alloy.Globals.tableView_datas_users 		= [];
	
	if(
		inside_controller === true &&
		users.length < 1 &&
		Alloy.Globals.Network_tableView_MODE == 'DECOUVERTE' 
	){

			tableView.height 								= 0;
			tableView.visible 								= false;
			empty_item.height 							= '70%';
			empty_item.text 								= 'Aucun ami à découvrir';
			empty_item.visible 							= true;
		
	}
	else if(
		inside_controller === true &&
		users.length >= 1 &&
		Alloy.Globals.Network_tableView_MODE == 'DECOUVERTE' 
	){
		
		empty_item.visible 								= false;
		empty_item.height 								= 0;
		tableView.visible 									= true;
		
	}

};

Alloy.Globals.PREpopulateFriendships		= function(friends,inside_controller,container,tableView,empty_item,tab) {
	
	/////////Alloy.Globals.Logs.llog(' >>> APPEL DE PREpopulateFriendships() <<< ');
	
	Alloy.Globals.tableView_datas_friends	= [];
	
	if(
		inside_controller === true &&
		friends.length < 1 &&
		Alloy.Globals.Network_tableView_MODE == 'RESEAU' 
	){
	
			tableView.height 								= 0;
			tableView.visible 								= false;
			empty_item.height 							= '70%';
			empty_item.text 								= 'Personne dans ton réseau';
			empty_item.visible 							= true;
		
	}
	else if(
		inside_controller === true &&
		friends.length >= 1 &&
		Alloy.Globals.Messages_tableView_MODE == 'RESEAU' 
	){
		
		empty_item.visible 								= false;
		empty_item.height 								= 0;
		tableView.visible 									= true;
		
	}

};

Alloy.Globals.populateUsersOrFriends		= function(users_or_friends,mode,inside_controller,container,tableView,page2UsersScrolls){
	
	if(inside_controller === false)return;
	if(inside_controller != false && inside_controller != true)return;
	
	/////////Alloy.Globals.Logs.llog(' >>> APPEL DE populateUsersOrFriends() <<< ');
	
	var tableView_rows 									= [];
	var tableView_to_consider 						= null;
		
	if( mode == 'DECOUVERTE' ){
		
		if(tableView.force_regenerate)Alloy.Globals.tableView_datas_users= [];
		
		for (var i=0; i<users_or_friends.length; i++) {
	    	
			var item 												= users_or_friends[i];
				
			Alloy.Globals.tableView_datas_users.push(item);
			
		}
			
	}
	else{
		
		Alloy.Globals.tableView_datas_friends = users_or_friends;
		
	}

	/////////////////////////////
	///////////////////////////// PRE-TESTS ON DATAS
	/////////////////////////////
	
    var datas_to_string 									= JSON.stringify(users_or_friends);
	var test_rows 											= tableView.getData(); 

	/////////////////////////////
	///////////////////////////// POPULATE de Découverte
	/////////////////////////////
	
	if( mode == 'DECOUVERTE' && Alloy.Globals.Network_tableView_MODE == 'DECOUVERTE' ){
			
	    tableView_to_consider 							= Alloy.Globals.tableView_datas_users;
		
		//////////// 
		//////////// ROWS DATAS CHANGING
		//////////// 
	
		if(
			Alloy.Globals.MEMORIZED_tableView_cells['users'].length > 0 &&
			Alloy.Globals.MEMORIZED_tableView_cells['users'] != datas_to_string
		)tableView.is_visible 							= false;
		
		if(tableView.force_regenerate)tableView.is_visible= false;
		if(tableView.force_regenerate)tableView.setSections( [] );
	
		if(tableView.is_visible == true){
			return;
		}
		
		if(
			!Alloy.Globals.Windows_ALREADY_Opened['page_2_b_1_network'] && /* Permet de bien recharger la TableView si on reviens dessus, car cette exception bloque tout en cas de données identiques (avant/après) */
			typeof Alloy.Globals.MEMORIZED_tableView_cells['users'] == 'string' &&
			datas_to_string.length === Alloy.Globals.MEMORIZED_tableView_cells['users'].length
		)tableView.setSections( [] );
		
		delete tableView.force_regenerate;
		
		//////////// 
		//////////// ROWS PREPARATION
		//////////// 
	    
		var section_to_add_array 						= [];
		var section_to_add_element 				= Ti.UI.createListSection({ id: 'the_list_view_section' });
		var section_to_add_element_datas 	= [];
	   
		for (var i=0; i<tableView_to_consider.length; i++) {
			
			var user_1_2 										= tableView_to_consider[i];
			var user_1 											= user_1_2['first'];
			var user_1_photo 								= JSON.parse(user_1.user_photos_url_json);
			var user_1_mutual_friends 				= (parseInt(user_1.mutual_friends) == 0) ? 'Aucun ami en commun' : user_1.mutual_friends+' amis en commun';
			user_1_mutual_friends						= (parseInt(user_1.mutual_friends) == 1) ? '1 ami en commun' : user_1_mutual_friends;
			var user_1_color_a 							= user_1.friendship_status != null ? "silver" : "#ee5c5f";
			var user_1_color_b 							= user_1.mentoring_status != null ? "silver" : Alloy.Globals.BLUE_COLOR;
				
			var section_to_add_element_datas_object = {
		    	userPhoto: 					{image: user_1_photo.current, user_id: user_1.id_user}, 
		    	userName: 					{text: user_1.user_prenom+' '+user_1.user_nom},
		    	userFriends: 				{text: user_1_mutual_friends}, 
		    	userUniv: 					{text: user_1.user_diplome}, 
		    	userDiplome: 				{text: user_1.user_universite},
				friendButton: 				{user_id: ( user_1_color_a == 'silver' ? 'done' : user_1.id_user), user_prenom: user_1.user_prenom, base_user_id: Alloy.Globals.THE_USER.id_user, backgroundColor:user_1_color_a},
				friendButtonP: 			{user_id: 'done'},
				godfatherButton: 		{user_id: ( user_1_color_b == 'silver' ? 'done' : user_1.id_user), user_prenom: user_1.user_prenom, base_user_id: Alloy.Globals.THE_USER.id_user, backgroundColor:user_2_color_b},
				godfatherButtonP: 	{user_id: 'done'}
			};
		   
			var user_2 											= typeof user_1_2['second'] != 'undefined' ? user_1_2['second'] : false;
			
			if(user_2 && user_2 != false){
				
				var user_2_photo 							= typeof user_2.user_photos_url_json != 'undefined' ? JSON.parse(user_2.user_photos_url_json) : {current:''};
				var user_2_mutual_friends 			= (parseInt(user_2.mutual_friends) == 0) ? 'Aucun ami en commun' : user_2.mutual_friends+' amis en commun';
				user_2_mutual_friends					= (parseInt(user_2.mutual_friends) == 1) ? '1 ami en commun' : user_2_mutual_friends;
				var user_2_color_a 						= user_2.friendship_status != null ? "silver" : "#ee5c5f";
				var user_2_color_b 						= user_2.mentoring_status != null ? "silver" : Alloy.Globals.BLUE_COLOR;
				
				section_to_add_element_datas_object.userPhoto2			= {image: user_2_photo.current, user_id: user_2.id_user};
				section_to_add_element_datas_object.userName2			= {text: user_2.user_prenom+' '+user_2.user_nom};
				section_to_add_element_datas_object.userFriends2		= {text: user_2_mutual_friends};
				section_to_add_element_datas_object.userUniv2				= {text: user_2.user_diplome};
				section_to_add_element_datas_object.userDiplome2		= {text: user_2.user_universite};
				section_to_add_element_datas_object.friendButton2 		= {user_id: ( user_2_color_a == 'silver' ? 'done' : user_2.id_user), user_prenom: user_2.user_prenom, base_user_id: Alloy.Globals.THE_USER.id_user, backgroundColor:user_2_color_a};
				section_to_add_element_datas_object.friendButtonP2 	= {user_id: 'done'};
				section_to_add_element_datas_object.godfatherButton2= {user_id: ( user_2_color_b == 'silver' ? 'done' : user_2.id_user), user_prenom: user_2.user_prenom, base_user_id: Alloy.Globals.THE_USER.id_user, backgroundColor:user_2_color_b};
				section_to_add_element_datas_object.godfatherButtonP2= {user_id: 'done'};
				
			}
			else{
				
				section_to_add_element_datas_object.part2						= {visible: false};
				
			}
			
			section_to_add_element_datas.push(section_to_add_element_datas_object);
				
		}

		section_to_add_element.setItems(section_to_add_element_datas);
		section_to_add_array.push(section_to_add_element);
		
		//////////////////// 
		//////////////////// ROWS ADDITION
		//////////////////// 
		
		tableView.appendSection(section_to_add_array);
		
		//////////////////// HEIGHT ADJUSTMENTS
		
		tableView.height 									= tableView.remember_height;
		
		//////////////////// 
		//////////////////// ROWS MEMORIZATION
		//////////////////// 
		
		Alloy.Globals.MEMORIZED_tableView_cells['users']= datas_to_string;
		
		/////////////////// SCROLL CUMUL
		
		page2UsersScrolls++;
		
	}
	
	/////////////////////////////
	///////////////////////////// POPULATE de Mon Réseau
	/////////////////////////////
	
	else if( mode == 'RESEAU' && Alloy.Globals.Network_tableView_MODE == 'RESEAU' ){
		
	    tableView_to_consider 							= Alloy.Globals.tableView_datas_friends;
	
		//////////// 
		//////////// ROWS DATAS CHANGING
		//////////// 
		
		if(
			Alloy.Globals.MEMORIZED_tableView_cells['friends'].length > 0 &&
			Alloy.Globals.MEMORIZED_tableView_cells['friends'] != datas_to_string
		)tableView.is_visible 							= false;
		
		if(tableView.force_regenerate)tableView.is_visible= false;
	
		if(tableView.is_visible == true){
			return;
		}
		delete tableView.force_regenerate;
		
		//////////// 
		//////////// ROWS PREPARATION
		//////////// 
		
		tableView.setSections( [] );
	   
		var section_to_add_array 						= [];
				
		for (var property in tableView_to_consider) {
			
			if (tableView_to_consider.hasOwnProperty(property)) {
				
				var section_to_add_element 		= Ti.UI.createListSection({ id: 'the_table_view_section' });
				var section_to_add_element_datas= [];
			
				var universite_group 					= tableView_to_consider[property];
				
				var section_to_add_headerView	= Ti.UI.createView({classes: ["reseau_header"],height: 34,width:'100%',backgroundColor:'#fff'});
				var section_to_add_headerView_sep1= Ti.UI.createView({classes: ["separator_bot"],top: 0,left: 0,width:'100%',height: 1.6,backgroundColor: '#a7a7a7'});
				var section_to_add_headerView_sep2= Ti.UI.createView({classes: ["separator_bot"],bottom: 0,left: 0,width:'100%',height: 1.6,backgroundColor: '#a7a7a7'});
				var section_to_add_headerView_label_tss= {text: property, classes: ["reseau_header_labl"],left: 20,height: "100%",color: '#737373',textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,font:{fontSize: 18,fontFamily:"sans-serif",fontWeight:"bold"}};
					if(OS_IOS)section_to_add_headerView_label_tss.font= {fontSize: 14,fontFamily:"sans-serif",fontWeight:"bold"};
				var section_to_add_headerView_label= Ti.UI.createLabel(section_to_add_headerView_label_tss);
				section_to_add_headerView.add(section_to_add_headerView_sep1);
				section_to_add_headerView.add(section_to_add_headerView_label);
				section_to_add_headerView.add(section_to_add_headerView_sep2);
	   			 
				for (var i=0; i<universite_group.length; i++) {
					
					var user 										= universite_group[i];
					var user_photo 							= JSON.parse(user.user_photos_url_json);
					var user_mutual_friends 			= (parseInt(user.mutual_friends) == 0) ? 'Aucun ami en commun' : user.mutual_friends+' amis en commun';
					user_mutual_friends					= (parseInt(user.mutual_friends) == 1) ? '1 ami en commun' : user_mutual_friends;
						
					var section_to_add_element_datas_object = {
				    	userPhoto: 					{image: user_photo.current, user_id: user.id_user}, 
				    	userName: 					{text: user.user_prenom+' '+user.user_nom},
				    	userFriends: 				{text: user_mutual_friends}, 
				    	userUniv: 					{text: user.user_diplome}, 
				    	userDiplome: 				{text: user.user_universite},
				    	userChat: 					{user_id: user.id_user, base_user_id: Alloy.Globals.THE_USER.id_user}
					};

					section_to_add_element_datas.push(section_to_add_element_datas_object);
						
				}
		
				section_to_add_element.setItems(section_to_add_element_datas);
				section_to_add_element.setHeaderView(section_to_add_headerView);
				section_to_add_array.push(section_to_add_element);
				
			}
			
		}
		
		//////////////////// 
		//////////////////// ROWS ADDITION
		//////////////////// 
		
		tableView.setSections(section_to_add_array);
		
		//////////////////// HEIGHT ADJUSTMENTS
		
		tableView.height 									= tableView.remember_height;
	
		//////////////////// 
		//////////////////// ROWS MEMORIZATION
		//////////////////// 
		
		Alloy.Globals.MEMORIZED_tableView_cells['friends']= datas_to_string;
		
	}
	
	/////////////////////////////
	///////////////////////////// HIDE Loading
	/////////////////////////////
	
	Alloy.Globals.Loading.hide();
	
};

/******************************************************************** */
/* ******************* 18 = APP BADGE MANAGEMENT ****************** */
/******************************************************************** */

Alloy.Globals.badgeForConversationsOrNotifications= function(){
	
	/////////Alloy.Globals.Logs.llog(' >>> APPEL DE badgeForConversationsOrNotifications() <<< ');
	
	Alloy.Globals.LEFTbottom_badge.cumul= Alloy.Globals.cumul_badge_left_messages + Alloy.Globals.cumul_badge_left_notifications;
	
	if( Alloy.Globals.LEFTbottom_badge.cumul < 1 ){
		
		Alloy.Globals.LEFTbottom_badge.visible= false;
		
	}
	else{
		
		Alloy.Globals.LEFTbottom_badge.visible= true;
		
	}

	if( Alloy.Globals.LEFTbottom_badge.cumul > 99 ){
		
		Alloy.Globals.LEFTbottom_badge.width= 30;
		
		 if( Alloy.Globals.LEFTbottom_badge.cumul > 999 ){
			
			Alloy.Globals.LEFTbottom_badge.cumul= '999+';
			Alloy.Globals.LEFTbottom_badge.width= 40; 
			
		}
		
	}

	Alloy.Globals.LEFTbottom_badge.text = Alloy.Globals.LEFTbottom_badge.cumul;
	
	if( typeof Alloy.Globals.gotoMessage_available_outside != 'undefined' )
		Alloy.Globals.gotoMessage_available_outside.title	= (Alloy.Globals.cumul_badge_left_messages > 0) ?'MESSAGES ('+Alloy.Globals.cumul_badge_left_messages+')' : 'MESSAGES';
	if( typeof Alloy.Globals.gotoNotifications_available_outside != 'undefined' )
		Alloy.Globals.gotoNotifications_available_outside.title	= (Alloy.Globals.cumul_badge_left_notifications > 0) ?'NOTIFICATIONS ('+Alloy.Globals.cumul_badge_left_notifications+')' : 'NOTIFICATIONS';
	
	var app_total 											= parseInt(Alloy.Globals.LEFTbottom_badge.cumul) + parseInt(Alloy.Globals.RIGHTbottom_badge.cumul);
	if(app_total < 0)app_total 					= 0;
	
	////////Alloy.Globals.Logs.llog(' >>> TOTAL BADGE = '+app_total+' <<< ');
	
	if(OS_IOS){
		
		Ti.UI.iOS.setAppBadge(app_total);
		
		Ti.App.iOS.scheduleLocalNotification({
		    date: 													new Date(new Date().getTime()),
		    badge: 												app_total
		});
		
	}
	else{
		
	}
	
	/////////////// INSIDE ONE CONVERSATION INDICATOR
	
	if( Alloy.Globals.cumul_badge_left_messages < 1){
		
		if( typeof Alloy.Globals.LEFTbottom_badge_on_conversation_page != 'undefined' ){
			Alloy.Globals.LEFTbottom_badge_on_conversation_page.vislbe = false;
			Alloy.Globals.LEFTbottom_badge_on_conversation_page.text= '';
		}
		
	}
	else{
		
		if( typeof Alloy.Globals.LEFTbottom_badge_on_conversation_page != 'undefined' ){
			Alloy.Globals.LEFTbottom_badge_on_conversation_page.vislbe = true;
			Alloy.Globals.LEFTbottom_badge_on_conversation_page.text= '+'+Alloy.Globals.cumul_badge_left_messages;
		}
		
	}
	
};

Alloy.Globals.badgeForUsersOrFriends		= function(){
	
	/*
	Alloy.Globals.Logs.llog(' >>> APPEL DE badgeForUsersOrFriends() <<< ');
	
	Alloy.Globals.RIGHTbottom_badge.cumul= Alloy.Globals.cumul_badge_right_users + Alloy.Globals.cumul_badge_right_friends;
	
	if( Alloy.Globals.RIGHTbottom_badge.cumul < 1 ){
		
		Alloy.Globals.RIGHTbottom_badge.visible= false;
		
	}
	else{
		
		Alloy.Globals.RIGHTbottom_badge.visible= true;
		
	}

	if( Alloy.Globals.RIGHTbottom_badge.cumul > 99 ){
		
		Alloy.Globals.RIGHTbottom_badge.width= 30;
		
		 if( Alloy.Globals.RIGHTbottom_badge.cumul > 999 ){
			
			Alloy.Globals.RIGHTbottom_badge.cumul= '999+';
			Alloy.Globals.RIGHTbottom_badge.width= 40; 
			
		}
		
	}

	Alloy.Globals.RIGHTbottom_badge.text = Alloy.Globals.RIGHTbottom_badge.cumul;
	
	if( typeof Alloy.Globals.gotoDecouverte_available_outside != 'undefined' )
		Alloy.Globals.gotoDecouverte_available_outside.title	= (Alloy.Globals.cumul_badge_right_users > 0) ?'DÉCOUVERTE ('+Alloy.Globals.cumul_badge_right_users+')' : 'DÉCOUVERTE';
	if( typeof Alloy.Globals.gotoReseau_available_outside != 'undefined' )
		Alloy.Globals.gotoReseau_available_outside.title	= (Alloy.Globals.cumul_badge_right_friends > 0) ?'MON RÉSEAU ('+Alloy.Globals.cumul_badge_right_friends+')' : 'MON RÉSEAU';
	
	var app_total 											= parseInt(Alloy.Globals.RIGHTbottom_badge.cumul) + parseInt(Alloy.Globals.LEFTbottom_badge.cumul);
	if(app_total < 0)app_total 					= 0;
	
	if(OS_IOS)Ti.App.iOS.scheduleLocalNotification({
	    date: 													new Date(new Date().getTime()),
	    badge: 												app_total
	});
	*/
	
};

/* ********************************************************************************************************************************************************************************************************************** */
/* ********************************************************************************************************************************************************************************************************************** */
/* *************************************************************************************** THE APPLICATION ENDS NOW *************************************************************************************************** */
/* ********************************************************************************************************************************************************************************************************************** */
/* ********************************************************************************************************************************************************************************************************************** */
/* ********************************************************************************************************************************************************************************************************************** */

			}
			
		}
	},
	false,
	true
);

/************************************************************************ */
/* ******************* USER NOTIFICATIONS LIVE LISTENER ****************** */
/************************************************************************ */

if(OS_IOS && !Alloy.Globals.notifications_process_BINDED)Ti.App.iOS.addEventListener('notification', function(e) {

	if(Alloy.Globals.notifications_processing)return;
	
	Alloy.Globals.notifications_processing 										= true;
	Alloy.Globals.underground_TIMERS_are_in_pause					= true;
	
     if( e.userInfo && typeof e.userInfo.alert != 'undefined' ){

    	var notificationAfterFunction 													= e.userInfo.alert['loc-args'];
    	
    	Ti.App.iOS.scheduleLocalNotification({
            date: 																						new Date(new Date().getTime()),
            badge: 																					-1
        });
        
		if( 
			Alloy.Globals.the_user_is_on_the_app == true &&
			typeof Alloy.Globals.Dialog != 'undefined'
		){
			
			//////////// LOCAL NOTIFICATION INIT()
			
			var notif_title 																			= e.userInfo.alert['title'] == "" ? 'Swapbook' : e.userInfo.alert['title'];
			var notif_image_exp																= new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi);
			var notif_image 																		= !e.userInfo.alert['loc-args'] && e.userInfo.alert['launch-image'].indexOf('http') > -1 ? [e.userInfo.alert['launch-image']] : notif_image_exp.exec(notificationAfterFunction);

			Alloy.Globals.Dialog.getView('alertNotificationBar').height= '84dp';
			Alloy.Globals.Dialog.getView('alertNotificationBar').visible= true;
			Alloy.Globals.Dialog.getView('alertNotificationPhoto').image= (notif_image && notif_image[0]) ? notif_image[0] : ( e.userInfo.alert['launch-image'].indexOf('http') > -1 ? e.userInfo.alert['launch-image'] : 'images/'+e.userInfo.alert['launch-image']);
			Alloy.Globals.Dialog.getView('alertNotificationTitle').text= notif_title;
			Alloy.Globals.Dialog.getView('alertNotificationBody').text= e.userInfo.alert['body'];
			
			//////////// LOCAL NOTIFICATION CLICK()
			
			Alloy.Globals.Dialog.getView('alertNotificationBar').addEventListener("click",function(e){

				Alloy.Globals.deviceReceivePushLocalNotificationsBar_close({type:'click',direction:'top'});
				
				setTimeout(function(){
					
					eval(''+notificationAfterFunction+'');
					return;
					
				},250);
			
			});
		
			//////////// LOCAL NOTIFICATION DISPLAY()
			
			if( Alloy.Globals.the_user_is_on_one_conversation != false ){
				
				if( notificationAfterFunction.indexOf('id:'+Alloy.Globals.the_user_is_on_one_conversation) < 0 )Alloy.Globals.deviceReceivePushLocalNotificationsBar_open();
				
			}
			else{
				
				Alloy.Globals.deviceReceivePushLocalNotificationsBar_open();
				
			}
		
		}
		else{

			/////////var func 																					= new Function(''+notificationAfterFunction+'');
			/////////func();
			
			eval(''+notificationAfterFunction+'');
			return;
			
		}
		
     }
     
     Alloy.Globals.notifications_processing 										= false;
     Alloy.Globals.underground_TIMERS_are_in_pause					= false;
     
});

Alloy.Globals.notifications_process_BINDED 								= true;