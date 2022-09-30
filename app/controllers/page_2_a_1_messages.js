/*********************************** OPEN ****************************************/

Alloy.Globals.navigationWindow 				= $.window;
if( typeof Alloy.Globals.toCloseWindows['conversationspage'] == 'undefined' ){
	Alloy.Globals.toCloseWindows['conversationspage']= $.window;
}

Alloy.Globals.Dialog 										= $.navBar.getView('AlertDialog');
		
Alloy.Globals.LEFTbottom_badge				= $.tabBar.getView('button1badge');
Alloy.Globals.RIGHTbottom_badge				= $.tabBar.getView('button3badge');

var args 															= arguments[0] || {};
var user_photo 												= JSON.parse(Alloy.Globals.THE_USER.user_photos_url_json);
var passedData 											= args.passedData;
var some_errors 											= false;
var tableView_by_page 								= 1000;

Alloy.Globals.Logs.llog(passedData);

Alloy.Globals.Messages_tableView_MODE						= 'MESSAGES';
Alloy.Globals.gotoMessage_available_outside					= $.gotoMessages;
Alloy.Globals.gotoNotifications_available_outside			= $.gotoNotifications;

/*********************************** NAVIGATION BAR MANIPULATION *****************************************/

$.navBar.getView('navBarText').text			= 'SWAPBOOK';

$.tabBar.getView('button2').bcase 			= 'on_messages_page';

/*********************************** HEIGHT ADJUSTMENTS ****************************************/

Alloy.Globals.tableViewHeight					= ( Ti.Platform.displayCaps.platformHeight - 82 ) - 98;
$.the_table_view.height 								= Alloy.Globals.tableViewHeight;

$.the_table_view.is_visible 							= false;
$.the_table_view.remember_height 			= $.the_table_view.height;
$.the_table_view.addEventListener("scrollend", checkTableViewHeight);

function checkTableViewHeight(){

	Alloy.Globals.the_user_is_on_one_conversation= false;

	/////////////// RE-AFFECT AND UPDATE THE BOTTOM BAR (+BADGE)
	Alloy.Globals.LEFTbottom_badge	= $.tabBar.getView('button1badge');
	Alloy.Globals.RIGHTbottom_badge	= $.tabBar.getView('button3badge');
	
	Alloy.Globals.badgeForConversationsOrNotifications();

	if($.the_table_view.height != $.the_table_view.remember_height){
		
		Alloy.Globals.Logs.llog('---------------- LA TABLEVIEW A CHANGE DE HAUTEUR!!! ----------------');
		Alloy.Globals.Logs.llog($.the_table_view.height);
		Alloy.Globals.Logs.llog($.the_table_view.remember_height);

		$.the_table_view.height 						= $.the_table_view.remember_height;
	
	}

};

/*********************************** ORIENTATION ADJUSTMENTS ****************************************/

Alloy.Globals.navigationWindow.addEventListener('open',function(){
	
	Ti.Gesture.fireEvent('orientationchange');
	
});

function SwitchTwoTabs(e){

	var landscape 											= ( typeof e.source != 'undefined'  && !e.source.isLandscape() ) ? false : true;
	var local_landscape 									= Alloy.Globals.the_u_is_on_tablet.isTablet() ? true : landscape;
	var tableViewHeight									= ( Ti.Platform.displayCaps.platformHeight - 82 ) - 98;
	$.the_table_view.height 							= tableViewHeight;
	if(OS_ANDROID){

	}

	$.the_table_view.remember_height 		= $.the_table_view.height;
		
	checkTableViewHeight();
	
};

Ti.Gesture.addEventListener('orientationchange',SwitchTwoTabs);

/*********************************** TABLE VIEW CLICK ****************************************/

var rows_datas 												= [];

if(rows_datas.length == 0)$.the_table_view.addEventListener("click", function(e) {
	
	$.the_table_view.is_visible 						= false;
			
	/*************** MESSAGES CASE ***************/
	
	if( Alloy.Globals.Messages_tableView_MODE == 'MESSAGES' ){
		
		$.the_table_view.touchEnabled 			= false;
		
		/*************** DATAS ***************/
		
		var rows_datas										= Alloy.Globals.tableView_datas_messages;
		
		////////Alloy.Globals.Logs.llog('---------------- TABLE VIEW DATAS (messages) ----------------');
		////////Alloy.Globals.Logs.llog(rows_datas);
		
		var conv 													= rows_datas[e.index];
		
		if(conv && conv != null && conv.length === 0){
			$.gotoMessages.fireEvent('click');
			return;
		}
		
		/*************** BADGE ***************/
		
		if( typeof conv != 'undefined' && conv.conv_is_unread == true ){
			
			Alloy.Globals.cumul_badge_left_messages--;
			
			if(OS_IOS)Ti.App.iOS.scheduleLocalNotification({
				date: 												new Date(new Date().getTime()),
				badge: 											-1
			});
			
		}
			
		Alloy.Globals.badgeForConversationsOrNotifications();
	
		/*************** DISPLAYING ***************/
	
		var rowContainer 									= e.row.children[0];
		var separator 										= rowContainer.children[8];
		var photoContainer 								= rowContainer.children[0];
	
		rowContainer.backgroundColor 			= '#fff';
		separator.backgroundColor 					= '#d2d2d2';
		photoContainer.borderColor 				= '#949494';
		photoContainer.borderWidth 				= 1;
					
		/*************** CLICK ***************/
		
		if(typeof conv== 'undefined'){
			$.gotoMessages.fireEvent('click');
			return;
		}
		
		//////////// GOOGLE ANALYTICS 
		
		Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
			category: 												"App. social behaviours",
			label: 														"Go to Chat and Talk",
			action: 													"want to talk with someone",
			value: 														1
		});
		
		Alloy.Globals.the_user_is_on_one_conversation= conv.id_conv;
	
		if(typeof Alloy.Globals.intervalForMessengerOnlineStatus != 'undefined')clearInterval(Alloy.Globals.intervalForMessengerOnlineStatus);
		delete Alloy.Globals.intervalForMessengerOnlineStatus;
	
		if ( Alloy.Globals.the_u_is_on_landscape == false ){
			
			Alloy.Globals.app.goTo("page_2_a_2_oneconversation",{
				id: 						conv.id_conv,
				titre: 					conv.conversation_title,
				type: 					conv.type,
				theme: 				conv.conversation_theme,
				image: 				conv.conversation_image,
				after_sale: 			false,
				createWindow: 	'on_oneconversation_page'
			});
			
		}
		else{
			
			var children 										= Alloy.Globals.tabbed_two.children.slice(0);
			
			for (var i= 0;i<children.length;++i){
				Alloy.Globals.tabbed_two.remove(children[i]);
			}
		
			var page_2_a_2_oneconversation  	= Alloy.createController('page_2_a_2_oneconversation',
				{
					passedData:{
						id: 						conv.id_conv,
						titre: 					conv.conversation_title,
						type: 					conv.type,
						theme: 				conv.conversation_theme,
						image: 				conv.conversation_image,
						after_sale: 			false
					}
				}
			);
			
			Alloy.Globals.tabbed_two.add(page_2_a_2_oneconversation.getView());
			
		}
			
	}
	
	/*************** NOTIFICATIONS CASE ***************/
	
	else{

		/*************** DATAS ***************/
		
		var rows_datas										= Alloy.Globals.tableView_datas_notifications;
		
		////////Alloy.Globals.Logs.llog('---------------- TABLE VIEW DATAS (notifications) ----------------');
		////////Alloy.Globals.Logs.llog(rows_datas);
		
		var rows_datas_cells							= Alloy.Globals.tableView_datas_notifications_cells;
		var noti 													= rows_datas[e.index];
		
		if(noti && noti != null && noti.length === 0){
			$.gotoNotifications.fireEvent('click');
			return;
		}
		
		var noti_json 											= JSON.parse(noti.notif_free_json);
		var noti_cell 											= rows_datas_cells[e.index];
		
    	var rowContainer 									= e.row.children[0];
		var NotiTxt 											= rowContainer.children[1];
		var NotiTimeago									= rowContainer.children[2];
		var DeleteBtn 										= rowContainer.children[3];
		var AcceptBtn 										= rowContainer.children[4];
		var separator 										= rowContainer.children[5];
		var photoContainer 								= rowContainer.children[0];
		
		/*************** CLICKS ***************/
		
		///////////////////////
		/////////////////////// NOTIF DELETION
		///////////////////////

		if(typeof noti == 'undefined'){
			$.gotoNotifications.fireEvent('click');
			return;
		}
		
        if (e.source.id == "Supprimer") {
        	
			
			/* ******************************************** */
			/* ********* AJAX API QUERY (FAST WAY) ******** */
			/* ******************************************* */
			Alloy.Globals.Requests.RequestsMaker(
				'POST',
				true,
				Alloy.Globals.endPoints.notificationDelete,
				{
					id_notif: 										noti.notif_id,
		    		id_user: 										Alloy.Globals.THE_USER.id_user,
				},
				{
					async_params: 				{},
					async_execution: 			function(JSON_returned,async_params_back){
		    	
		    			Alloy.Globals.Logs.llog('---------------- RETOUR notificationDelete() ----------------');
		    			Alloy.Globals.Logs.llog(JSON_returned);	
						
						if(typeof JSON_returned['error'] !== 'undefined'){
							
							/*Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);*/
							
						}
						else{
							
           					$.the_table_view.deleteRow(e.index);
							
					    	/*************** BADGE ***************/
			
							if( typeof noti != 'undefined' && noti.noti_is_unseen == true ){
								
								Alloy.Globals.cumul_badge_left_notifications--;
								
								if(OS_IOS)Ti.App.iOS.scheduleLocalNotification({
									date: 							new Date(new Date().getTime()),
									badge: 						-1
								});
								
							}
								
							Alloy.Globals.badgeForConversationsOrNotifications();
							
						}
						
					}
				},
				false,
				true 
			);
            
        }

		///////////////////////
		/////////////////////// NOTIF SEEN + CLICK
		///////////////////////
		
        else{
        	
        	/////////////////////// + NOTIF GO TO USER PROFILE
		
	        if (e.source.id == "notiPhoto"){
	        	
	        	if (e.source.gotoProfile && e.source.gotoProfile ==  true)Alloy.Globals.app.goTo("page_3_a_1_user_profile", {id_user: noti_json.user_id});
	        	
	        }
        	
        	/////////////////////// + NOTIF ANSWER NEGATIVE
		
	    	else if (e.source.id == "Decline") {
		    	
		    	var newNotifText 							= (typeof noti_json.user_name != 'undefined') ? ( noti.notif_type == 'by_swapbook_mentoring' ? 'Tu as décliné la demande de '+noti_json.user_name+' à être ton(ta) filleul(e).' : 'Tu as décliné la demande de '+noti_json.user_name+' à faire partie de ton réseau.' ) : '';
		    	var newNotifBackText 					= '';
			
				/* ******************************************** */
				/* ********* AJAX API QUERY (FAST WAY) ******** */
				/* ******************************************* */
				Alloy.Globals.Requests.RequestsMaker(
					'POST',
					true,
					Alloy.Globals.endPoints[noti_json.endpoint],
					{
						proposal_id: 							noti_json.id,
						proposal_id_user: 					noti_json.user_id,
			    		decision_id_user: 					Alloy.Globals.THE_USER.id_user,
			    		decision_push_back: 			newNotifBackText,
			    		decision_push_img: 				user_photo.current,
			    		decision: 								'no',
			    		update_notification_id: 			noti.notif_id,
			    		update_notification_text: 		newNotifText
					},
					{
						async_params: 				{},
						NO_LIMIT: 						true,
						async_execution: 			function(JSON_returned,async_params_back){	
		    	
			    			Alloy.Globals.Logs.llog('---------------- RETOUR '+noti_json.endpoint+'() ----------------');
			    			Alloy.Globals.Logs.llog(JSON_returned);
							
							if(typeof JSON_returned['error'] !== 'undefined'){
								
								/*Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);*/
								
							}
							else{
								
						    	DeleteBtn.visible 			= false;
						    	AcceptBtn.visible 			= false;
		    					if( newNotifText != '' )NotiTxt.text= newNotifText;
		    					NotiTimeago.text 			= 'Il y a 10 secondes';
								
								/*Alloy.Globals.Logs.aalert(
									'AMITIÉE DECLINÉE',
									( noti.notif_type == 'by_swapbook_mentoring' ? noti_json.user_name+' ne sera pas ton filleul(e).' : noti_json.user_name+' ne fera pas partie de ton réseau.' ),
									( noti.notif_type == 'by_swapbook_mentoring' ? '' : 'Elle ne pourra pas te contacter via le Chat utilisateur de Swapbook' ),
									'OK',
									null,
									null,
									null,
									null,
									false
								);*/
								
							}
							
						}
					},
					false,
					true 
				);
	            
	        }
			
			/////////////////////// + NOTIF ANSWER POSITIVE
			
	        else if (e.source.id == "Accept") {
		    	
		    	var newNotifText 							= (typeof noti_json.user_name != 'undefined') ? ( noti.notif_type == 'by_swapbook_mentoring' ? noti_json.user_name+' est désormais ton filleul' : noti_json.user_name+' fait désormais partie de ton réseau' ) : '';
				var parrain_marraine1 					= Alloy.Globals.THE_USER.user_civilite == 'M' ? 'le parrain' : 'la marraine' ;
				var parrain_marraine2 					= Alloy.Globals.THE_USER.user_civilite == 'M' ? 'parrain' : 'marraine' ;
				var parrain_marraine3 					= Alloy.Globals.THE_USER.user_civilite == 'M' ? 'ton' : 'ta' ;
		    	var newNotifBackText 					= noti.notif_type == 'by_swapbook_mentoring' ? Alloy.Globals.THE_USER.user_prenom+' '+Alloy.Globals.THE_USER.user_nom+' est désormais '+parrain_marraine3+' '+parrain_marraine2 : Alloy.Globals.THE_USER.user_prenom+' '+Alloy.Globals.THE_USER.user_nom+' fait désormais partie de ton réseau';
			
				/* ******************************************** */
				/* ********* AJAX API QUERY (FAST WAY) ******** */
				/* ******************************************* */
				Alloy.Globals.Requests.RequestsMaker(
					'POST',
					true,
					Alloy.Globals.endPoints[noti_json.endpoint],
					{
						proposal_id: 							noti_json.id,
						proposal_id_user: 					noti_json.user_id,
			    		decision_id_user: 					Alloy.Globals.THE_USER.id_user,
			    		decision_push_back: 			newNotifBackText,
			    		decision_push_img: 				user_photo.current,
			    		decision: 								'yes',
			    		update_notification_id: 			noti.notif_id,
			    		update_notification_text: 		newNotifText
					},
					{
						async_params: 				{},
						NO_LIMIT: 						true,
						async_execution: 			function(JSON_returned,async_params_back){	
		    	
			    			Alloy.Globals.Logs.llog('---------------- RETOUR '+noti_json.endpoint+'() ----------------');
			    			Alloy.Globals.Logs.llog(JSON_returned);
								
							if(typeof JSON_returned['error'] !== 'undefined'){
								
								/*Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);*/
								
							}
							else{
								
						    	DeleteBtn.visible 			= false;
						    	AcceptBtn.visible 			= false;
		    					if( newNotifText != '' )NotiTxt.text= newNotifText;
		    					NotiTimeago.text 			= 'Il y a 10 secondes';
								
								/*Alloy.Globals.Logs.aalert(
									'AMITIÉE CONFIRMÉE',
									 ( noti.notif_type == 'by_swapbook_mentoring' ? 'Tu es désormais '+parrain_marraine1+' de '+noti_json.user_name : noti_json.user_name+' fait désormais partie de ton réseau et inversement !' ),
									 ( noti.notif_type == 'by_swapbook_mentoring' ? '' : 'Tu peux dès à présent communiquer ensemble via le Chat utilisateur de Swapbook' ),
									'OK',
									null,
									null,
									null,
									null,
									false
								);*/
								
							}
							
						}
					},
					false,
					true 
				);
	            
	        }
	        
			/////////////////////// NOTIFICATION SEEN IN ALL CASES
			
			/* ******************************************** */
			/* ********* AJAX API QUERY (FAST WAY) ******** */
			/* ******************************************* */
			Alloy.Globals.Requests.RequestsMaker(
				'POST',
				true,
				Alloy.Globals.endPoints.notificationSeen,
				{
					id_notif: 										noti.notif_id,
		    		id_user: 										Alloy.Globals.THE_USER.id_user,
				},
				{
					async_params: 				{},
					NO_LIMIT: 						true,
					async_execution: 			function(JSON_returned,async_params_back){	
		    	
		    			Alloy.Globals.Logs.llog('---------------- RETOUR notificationSeen() ----------------');
		    			Alloy.Globals.Logs.llog(JSON_returned);
						
						if(typeof JSON_returned['error'] !== 'undefined'){
							
							/*Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);*/
							
						}
						else{
							
					    	/*************** BADGE ***************/
			
							if( typeof noti != 'undefined' && noti.noti_is_unseen == true ){
								
								Alloy.Globals.cumul_badge_left_notifications--;
								
								if(OS_IOS)Ti.App.iOS.scheduleLocalNotification({
									date: 							new Date(new Date().getTime()),
									badge: 						-1
								});
								
							}
								
							Alloy.Globals.badgeForConversationsOrNotifications();
						
							/*************** DISPLAYING ***************/
						
							rowContainer.backgroundColor 		= '#fff';
							separator.backgroundColor 				= '#d2d2d2';
							photoContainer.borderColor 			= '#949494';
							photoContainer.borderWidth 			= 1;
						
							/*************** CUSTOM FUNCTION ***************/
							
							if(noti.notif_click_function != '')setTimeout(function(){
								
								var func 							= new Function(''+noti.notif_click_function+'');
								//func();
								
							},500);
							
						}
						
					}
				},
				false,
				true 
			);
	    	
	    }
	    
	}

	setTimeout(function() {
    	$.the_table_view.touchEnabled 			= true;
    }, 1000);
 	
});

/*********************************** TABLE VIEW SWIPE ****************************************/

if(rows_datas.length == 0)$.the_table_view.addEventListener("swipe", function(e){
	
	/*************** NOTIFICATIONS CASE ***************/
	
	if( Alloy.Globals.Messages_tableView_MODE == 'NOTIFICATIONS' ){

		/*************** DATAS ***************/
		
		var rows_datas										= Alloy.Globals.tableView_datas_notifications;
		var rows_datas_cells							= Alloy.Globals.tableView_datas_notifications_cells;
		var noti 													= rows_datas[e.index];
		var noti_cell 											= rows_datas_cells[e.index];
		
		if (e.direction == "left") {
			
			noti_cell.showDeleteOption();
             
            /*for(var j = 0; j < $.the_table_view.data[0].rows.length; j++) {
                if (e.index != j) {
                    $.the_table_view.data[0].rows[j].hideDeleteOption();
                }
            }*/
            
        }
        else if (e.direction == "right") {
        	
			noti_cell.hideDeleteOption();
            
        }
        
	}
		
});
	
/***************************** PULL TO REFRESH  *****************************/

function localRefresher(e) {
	
	rows_datas 												= [];

	if( Alloy.Globals.Messages_tableView_MODE == 'MESSAGES' ){
		
		page2MessagesCollection.fetch({
	        urlparams : {
	            show_me_the_page: 					1,
	            by_page: 										tableView_by_page,
		        the_user: 										Alloy.Globals.THE_USER.id_user,
	        },
	        add: 													false,
	        silent: 													true,
	        returnExactServerResponse: 			true,
			localOnly: 											false,
		    parentNode: 										function (loaded_data, options) {
		    
			    if(!loaded_data)return;
			    if(typeof loaded_data == 'undefined')return;
			    if(loaded_data == '' || loaded_data == null)return;
	            
		    	///////Alloy.Globals.Logs.llog('---------------- SCROLL + JSON DISTANT (Messages) ----------------');
		    	
				e.hide();
				
				Alloy.Globals.PREpopulateConversations(loaded_data['output-array'],true,$.main,$.the_table_view,$.empty,$.gotoMessages);
				Alloy.Globals.populateConversationsOrNotifications(loaded_data['output-array'],'MESSAGES',true,$.main,$.the_table_view);
				
	        },
	        success: 											e.hide(),
	        error: 													e.hide
		});
		
	}
	else if( Alloy.Globals.Messages_tableView_MODE == 'NOTIFICATIONS' ){
		
		page2NotificationsCollection.fetch({
	        urlparams : {
	            show_me_the_page: 					1,
	            by_page: 										tableView_by_page,
		        the_user: 										Alloy.Globals.THE_USER.id_user,
	        },
	        add: 													false,
	        silent : 												true,
	        returnExactServerResponse: 			true,
			localOnly: 											false,
		    parentNode: 										function (loaded_data, options) {
			    
			    if(!loaded_data)return;
			    if(typeof loaded_data == 'undefined')return;
			    if(loaded_data == '' || loaded_data == null)return;
		    	
		    	////////Alloy.Globals.Logs.llog('---------------- SCROLL + JSON DISTANT (Notifications) ----------------');
		    	
				e.hide();
				
				Alloy.Globals.PREpopulateNotifications(loaded_data['output-array'],true,$.main,$.the_table_view,$.empty,$.gotoNotifications);
				Alloy.Globals.populateConversationsOrNotifications(loaded_data['output-array'],'NOTIFICATIONS',true,$.main,$.the_table_view);
				
	        },
	        success: 											e.hide(),
	        error: 													e.hide
		});
		
	}
			
};

/*********************************** TABLE VIEW INIT ****************************************/

var tableView_data 										= [];
var page2MessagesCollection 					= $.conversationsRefreshable;
var page2NotificationsCollection 				= $.notificationsRefreshable;

Alloy.Globals.loadReloadConversations(false,true,$.main,$.the_table_view,Alloy.Globals.tableView_datas_messages,page2MessagesCollection,tableView_by_page,Alloy.Globals.THE_USER.id_user,$.empty,$.gotoMessages);
Alloy.Globals.loadReloadNotifications(false,true,$.main,$.the_table_view,Alloy.Globals.tableView_datas_notifications,page2NotificationsCollection,tableView_by_page,Alloy.Globals.THE_USER.id_user,$.empty,$.gotoNotifications);

/*********************************** TABBAR BUTTON CLICK ****************************************/

$.gotoMessages.addEventListener("click", function(e) {
		
	Alloy.Globals.Logs.llog('>>>> gotoMessages CLICK <<<<');
	
	Alloy.Globals.preventDoubleClick(this);
	
	//////////// GOOGLE ANALYTICS 
	
	Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
		category: 												"App. navigation process",
		label: 														"See and read user chat conversations",
		action: 													"want to see personal conversations",
		value: 														1
	});
	
	rows_datas 												= [];
	
	$.the_table_view.is_visible 						= false;
	$.the_table_view.force_regenerate 			= Alloy.Globals.Messages_tableView_MODE == 'MESSAGES' ? false : true;
	var local_slient_mode 								= Alloy.Globals.Messages_tableView_MODE == 'MESSAGES' ? false : true;
	
	Alloy.Globals.Messages_tableView_MODE= 'MESSAGES';
	
	Alloy.Globals.loadReloadConversations(local_slient_mode,true,$.main,$.the_table_view,Alloy.Globals.tableView_datas_messages,page2MessagesCollection,tableView_by_page,Alloy.Globals.THE_USER.id_user,$.empty,$.gotoMessages);
	
	$.addClass($.gotoMessages,'selected');
	$.removeClass($.gotoNotifications,'selected');

});		

if(typeof passedData != 'undefined' && passedData.tab2){

	setTimeout(function(){
		$.gotoNotifications.fireEvent('click');
	},1000);
	
}

$.gotoNotifications.addEventListener("click", function(e) {
	
	Alloy.Globals.Logs.llog('>>>> gotoNotifications CLICK <<<<');
		
	Alloy.Globals.preventDoubleClick(this);
	
	//////////// GOOGLE ANALYTICS 
	
	Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
		category: 												"App. navigation process",
		label: 														"See and read user notifications",
		action: 													"want to see personal notifications",
		value: 														1
	});

	rows_datas 												= [];
	
	$.the_table_view.is_visible 						= false;
	$.the_table_view.force_regenerate 			= Alloy.Globals.Messages_tableView_MODE == 'NOTIFICATIONS' ? false : true;
	
	var local_slient_mode 								= Alloy.Globals.Messages_tableView_MODE == 'NOTIFICATIONS' ? false : true;
	
	Alloy.Globals.Messages_tableView_MODE= 'NOTIFICATIONS';
	
	Alloy.Globals.loadReloadNotifications(local_slient_mode,true,$.main,$.the_table_view,Alloy.Globals.tableView_datas_notifications,page2NotificationsCollection,tableView_by_page,Alloy.Globals.THE_USER.id_user,$.empty,$.gotoNotifications);

	$.addClass($.gotoNotifications,'selected');
	$.removeClass($.gotoMessages,'selected');
	
});