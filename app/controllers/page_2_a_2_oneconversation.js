/*********************************** FOCUS ****************************************/

Alloy.Globals.navigationWindow.addEventListener("focus",function(e) {
	
	Alloy.Globals.Dialog 									= $.navBar.getView('AlertDialog');
		
	Alloy.Globals.LEFTbottom_badge			= $.tabBar.getView('button1badge');
	Alloy.Globals.RIGHTbottom_badge			= $.tabBar.getView('button3badge');
	
});

/////////////// RE-AFFECT AND UPDATE THE TOP BAR (+BADGE)
Alloy.Globals.LEFTbottom_badge_on_conversation_page= $.navBar.getView('backbuttonTotal');

/////////////// RE-AFFECT AND UPDATE THE BOTTOM BAR (+BADGE)
Alloy.Globals.badgeForConversationsOrNotifications();

var args 															= arguments[0] || {};
var passedData 											= typeof args.passedData == 'string' ? JSON.parse(args.passedData) : args.passedData;
var page_code_name 									= passedData.hide_lateral_bottom_buttons ? 'quick_chat_page' : 'on_oneconversation_page';
var the_user_of_the_conv 							= Alloy.Globals.THE_USER.id_user;
var remove_question 									= null;
var Dialog_for_photos_for_group 				= null;
var Dialog_for_photos_for_messages 		= null;

var the_good_bottom_margin_should_be_minimal= base_for_keyboard = 58;
var the_good_bottom_margin_for_webview= 94 - the_good_bottom_margin_should_be_minimal;
var the_good_bottom_margin_should_be 	= null;

Alloy.Globals.Logs.llog(passedData);

/*********************************** NAVIGATION BAR MANIPULATION *****************************************/

$.navBar.getView('navBarText').text			= passedData.titre;
$.navBar.getView('navBarImage').image	= passedData.image;

$.navBar.getView('backbutton').bcase 		= page_code_name;
$.navBar.getView('backbutton').after_sale	= passedData.after_sale;

$.tabBar.getView('button2').bcase 			= page_code_name;

//////////// TALKING WITH TEAM TEAM CASE

if(passedData.hide_lateral_bottom_buttons){
	
	$.tabBar.getView('button1').visible 		= false;
	$.tabBar.getView('button1badge').left	= '-50%';
	$.tabBar.getView('button3').visible 		= false;
	$.tabBar.getView('button3badge').right= '-50%';
	
	$.navBar.getView('backbutton').hide_lateral_bottom_buttons=true;

}

/*********************************** HEIGHT ADJUSTMENTS ****************************************/

Alloy.Globals.tableViewHeight					= ( Ti.Platform.displayCaps.platformHeight - 110 ) - the_good_bottom_margin_should_be_minimal;
$.the_scroll_view.height 								= Alloy.Globals.tableViewHeight;
if(OS_ANDROID){

}

/*********************************** ORIENTATION ADJUSTMENTS ****************************************/

function SwitchTwoTabs(e){

	var landscape 											= ( typeof e.source != 'undefined'  && !e.source.isLandscape() ) ? false : true;
	var local_landscape 									= Alloy.Globals.the_u_is_on_tablet.isTablet() ? true : landscape;
	var tableViewHeight									= ( Ti.Platform.displayCaps.platformHeight - 110 ) - the_good_bottom_margin_should_be_minimal;

	if(
		!local_landscape
	){
		
		$.the_scroll_view.height 						= Alloy.Globals.the_u_is_on_tablet.isTablet() ? tableViewHeight-110 : tableViewHeight;

		$.code.top 												= 110;
		
		$.navBar.getView('backbutton').visible= true;
		$.tabBar.getView('bottomBar').visible= true;
		
		$.adjust_keyboard.bottom 					= the_good_bottom_margin_should_be_minimal;
		$.adjust_keyboard_behind.bottom 		= the_good_bottom_margin_should_be_minimal;
		base_for_keyboard 								= the_good_bottom_margin_should_be_minimal;
		
		if(Alloy.Globals.the_u_is_on_tablet.isTablet())$.navBar.getView('backbuttonTotal').visible= false;
		
	}
	else{
		
		$.the_scroll_view.height 						= (typeof passedData.createWindow != 'undefined') ? tableViewHeight : ( Alloy.Globals.the_u_is_on_tablet.isTablet() ? tableViewHeight+58 : tableViewHeight+90 );
		$.the_scroll_view.top 							= 110;
		
		$.code.top 												= 110;
		
		$.navBar.getView('backbutton').visible= (typeof passedData.createWindow != 'undefined') ? true : false;
		$.navBar.getView('backbuttonTotal').visible= (typeof passedData.createWindow != 'undefined') ? true : false;
		$.tabBar.getView('bottomBar').visible= (typeof passedData.createWindow != 'undefined') ? true : false;
		
		$.adjust_keyboard.bottom 					= (typeof passedData.createWindow != 'undefined') ? the_good_bottom_margin_should_be_minimal : 0;
		$.adjust_keyboard_behind.bottom 		= (typeof passedData.createWindow != 'undefined') ? the_good_bottom_margin_should_be_minimal : 0;
		base_for_keyboard 								= (typeof passedData.createWindow != 'undefined') ? the_good_bottom_margin_should_be_minimal : 0;
		
		$.navBar.getView('topbar').top 			= 0;
			
		if (
			!Alloy.Globals.the_u_is_on_tablet.isTablet() && 
			typeof passedData.createWindow == 'undefined' 
		){
			
			$.the_scroll_view.top 						= 0;
			$.the_scroll_view.height 					= (tableViewHeight+the_good_bottom_margin_should_be_minimal)+110;
			
			$.code.top 											= 0;
			
			$.code.visible 									= false;
			$.navBar.getView('topbar').top 		= -110;
			
		}
		
	}
	
	///////////////////////
	/////////////////////// BUG DU CLAVIER DOWN (20/03/2017)
	///////////////////////
			
	if( Ti.App.keyboardVisible ){
		
		if(the_good_bottom_margin_should_be != null){
			
			var adjust 											= the_good_bottom_margin_should_be-2;
			$.adjust_keyboard.bottom 				= adjust;
			$.adjust_keyboard_behind.bottom= adjust;
			
		}
	
	}
	
};

Ti.Gesture.addEventListener('orientationchange',SwitchTwoTabs);
Ti.Gesture.fireEvent('orientationchange');

/*********************************** MAIN MANIPULATION  *****************************************/

/////////////////// RIGHT MODAL POPUP

$.addClass($.modal_banner_overlay,passedData.theme);
$.modal_banner_img.image							= passedData.image;
$.modal_banner_img_user.image				= passedData.image;

if(passedData.type == 'duo'){
	
	$.modal_banner_uname.text					= 'Discussion avec '+passedData.titre;
	
	$.modal_participants_list.height 			= 142;

	$.goToUserProfile.visible							= true;
	$.addGroupPhoto.visible							= false;
	$.renameGroup.text									= 'Ajouter des amis :';
	$.renameGroup.mode								= 'display';

}
else{
	
	$.modal_banner_uname.text					= passedData.titre;
	$.user_rename.value 								= passedData.titre;
	
	$.modal_participants_list.height 			= 142+33;

	$.goToUserProfile.visible							= false;
	$.addGroupPhoto.visible							= true;
	$.renameGroup.text									= 'Renommer la discussion';
	$.renameGroup.mode								= 'rename';

	$.navBar.getView('online').visible			= false;
	$.navBar.getView('offline').visible			= false;
	
}

/////////////////// FRIENDS TO ADD SCROLLVIEW (MODAL MENU) + SALE RELATED TO THE CONVERSATION

function populateFriendsToAdd_AndCheckSaleRelated(JSON_returned,local_params){

	if(typeof JSON_returned['error'] !== 'undefined'){
		
		Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);
		
	}
	else{
		
		//////Alloy.Globals.Logs.llog('---------------- CONVERSATION MEMBERS + FRIENDS TO ADD RETRIEVED ----------------');
		//////Alloy.Globals.Logs.llog(JSON_returned['output-array']);
		//////Alloy.Globals.Logs.llog('---------------- LE MODE : '+local_params.mode);
		
		the_user_of_the_conv 							= ( typeof JSON_returned['output-array']['the_user_of_the_conv'] != 'undefined' ) ? JSON_returned['output-array']['the_user_of_the_conv'] : the_user_of_the_conv;
		
		/*************************/
		/* DO THE MANIPULATIONS */
		/*************************/
		
		var sub_mode_1 									= sub_mode_2 = (local_params.mode == 'display') ? '_ADD_' : '_UPDATE_';
		var children1 										= $.modal_participants_list.children.slice(0);
		var children1_loop 								= JSON_returned['output-array']['dans_conversation'];
		var children2 										= $.modal_possible_list.children.slice(0);
		var children2_loop 								= JSON_returned['output-array']['amis_ajoutables'];
		var sale_related 									= JSON_returned['output-sale'];

		//////////
		////////// PRELOOP IN ORDER TO REMOVE ITEMS OR JUST KEEP IT
		//////////
		
		if( local_params.mode == 'display' || Object.keys(children1_loop).length != children1.length ){
			for (var i = 0; i < children1.length; ++i){
				$.modal_participants_list.remove(children1[i]);
			}
			sub_mode_1 										= '_ADD_';
		}

		//////////
		////////// LOOP ON EACH CONVERSATION MEMBERS
		//////////
		
		for (var property in children1_loop) {
			
			if (children1_loop.hasOwnProperty(property)) {
		
				var participant 								= children1_loop[property];
				
				_sub_function_ADD_UPDATE_DELETE(
					sub_mode_1,
					$.modal_participants_list,
					'participants',
					participant
				);
				
			}
			
		}

		//////////
		////////// PRELOOP IN ORDER TO REMOVE ITEMS OR JUST KEEP IT
		//////////
		
		if( local_params.mode == 'display' || Object.keys(children2_loop).length != children2.length ){
			for (var i = 0; i < children2.length; ++i){
				$.modal_possible_list.remove(children2[i]);
			}
			sub_mode_2 											= '_ADD_';
		}
			
		//////////
		////////// LOOP ON EACH FRIENDS TO ADD
		//////////
		
		for (var property in children2_loop) {
			
			if (children2_loop.hasOwnProperty(property)) {
		
				var ami 												= children2_loop[property];
				
				_sub_function_ADD_UPDATE_DELETE(
					sub_mode_2,
					$.modal_possible_list,
					'amis',
					ami
				);
				
			}
			
		}

		//////////
		////////// DISPLAY THE "SEND CODE BAR" or NOT
		//////////
		
		if(
			sale_related &&
			typeof sale_related.id_sale != 'undefined' 
		){
			
			//////////// BUYER CASE : SEND CODE
			
			if( 
				sale_related.sale_user_buying_id == Alloy.Globals.THE_USER.id_user &&
				sale_related.sale_status == 'paid_code_waiting'
			){
				
				$.code.visible 									= true;
				$.SendCode.visible 							= true;
				$.SendCode.sale_id 							= sale_related.id_sale;
				$.SendCode.seller_user_id 				= sale_related.sale_user_selling_id;
				$.code_labl.text 								= 'ENVOIE TON CODE DE TRANSACTION';
			
			}
			
			//////////// BUYER CASE : RATE THE SALE
			
			else if( 
				sale_related.sale_user_buying_id == Alloy.Globals.THE_USER.id_user &&
				sale_related.sale_status == 'paid_code_sent'
			){
							
				var the_user_have_ever_rated_the_sale= Ti.App.Properties.getObject('rated_sales');
				if(the_user_have_ever_rated_the_sale == null)the_user_have_ever_rated_the_sale= {};
				
				if(!the_user_have_ever_rated_the_sale[sale_related.id_sale]){
					
					setTimeout(function(){
						
						Alloy.Globals.Logs.aalert(
							'Note ton achat',
							'Quelle note donnerais-tu à '+sale_related.user_prenom,
							'',
							'CONFIRMER',
							function(p){

								/* ******************************************** */
								/* ********* AJAX API QUERY (FAST WAY) ******** */
								/* ******************************************* */
								Alloy.Globals.Requests.RequestsMaker(
									'POST',
									true,
									Alloy.Globals.endPoints.userSaleNotation,
									{
							    		id_user: 										 	p.id_user,
							    		id_sale: 											p.id_sale,
							    		note: 												p.item_to_add.cvalue
									},
									{
										async_params: 				{},
										async_execution: 			function(JSON_returned,async_params_back){			
											if(typeof JSON_returned['error'] !== 'undefined'){
												Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);
											}
											else{
												///////////////Alloy.Globals.Logs.llog('---------------- SALE RATED ----------------');
												///////////////Alloy.Globals.Logs.llog(JSON_returned);
												p.rated_memory_check[p.id_sale]= 'DONE';
												Ti.App.Properties.setString('rated_sales',p.rated_memory_check);
												Alloy.Globals.Logs.aalert_close();
											}
										}
									},
									false,
									true 
								);
								
							},
							null,
							null,
							{
					    		id_user: 								Alloy.Globals.THE_USER.id_user,
					    		id_sale: 								sale_related.id_sale,
								item_to_add: 						Ti.UI.createView({top: 10,width: 192, layout: 'horizontal'}),
								rated_memory_check: 		the_user_have_ever_rated_the_sale
							},
							'STARS'
						);
						
					},3000);
					
				}
					
			}
			
			//////////// SELLER CASE
			
			else if(
				sale_related.sale_user_selling_id == Alloy.Globals.THE_USER.id_user &&
				sale_related.sale_status == 'paid_code_waiting'
			){
				
				$.code.visible 									= true;
				$.SendCode.visible 							= false;
				$.code_labl.text 								= 'EN ATTENTE DE TON CODE DE TRANSACTION... ';
				
			}
			
			else if(
				sale_related.sale_user_selling_id == Alloy.Globals.THE_USER.id_user &&
				sale_related.sale_status == 'paid_code_sent'
			){
				
				$.code.visible 									= true;
				$.SendCode.visible 							= false;
				$.code_labl.text 								= 'TON CODE : '+sale_related.sale_code;
				
			}
			
		}
		
	}
		
	/********************/
	/* DISPLAY CONTENT */
	/********************/
	$.the_scroll_view.visible						= true;

};

/*********************************** MAIN DATA LOAD  *****************************************/

var request_input										= [];

Alloy.Globals.loadFriendsToAddToTheConversation= function(en_mode){
	
	var params_to_api_with_filter 				= {
			id_conv:											passedData.id,
			id_user: 											Alloy.Globals.THE_USER.id_user,
			filter:												$.user_search_input.value
	};
	
	request_input											= [];
	request_input['async_execution']		= populateFriendsToAdd_AndCheckSaleRelated;
	request_input['async_params']			= {mode: en_mode};
	
	/* ********* AJAX API QUERY ********* */
	Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		Alloy.Globals.endPoints.conversationGetUsers,
		params_to_api_with_filter,
		request_input,
		false,
		true
	);

};

Alloy.Globals.loadReloadConversation 	= function(){
	
	Alloy.Globals.loadFriendsToAddToTheConversation('display');
	
	/////////////////////// ENVOI AU WEBSOCKET LIVE : INIT

	setTimeout(function(){
			
	    Ti.App.fireEvent(
	    	'app:fromTitanium',
	    	{
	    		commande: 								'init_load_messages_and_start_the_websocket',
	    		id_conversation: 						passedData.id,
	    		id_sender: 									Alloy.Globals.THE_USER.id_user,
	    		ws_endpoint: 								Alloy.Globals.endPoints.conversationsServer,
	    		endpoint:									Alloy.Globals.endPoints.conversationGetAndRead,
	    		limit: 											'0,200'
	    	}
	    );
	    
	},750);
	
};

var startWebView 									= function(e){
	
	//////////////////// LOAD THE CONVERSATION AND GET USERS STATUS

	Alloy.Globals.loadReloadConversation();

	Ti.App.addEventListener('app:fromWebView', startListeningWebViewCalls);

	Alloy.Globals.the_user_is_on_one_conversation= passedData.id;
	
};

/******************************** SET WEBVIEW URL + WEBSOCKET LIVE : INIT ********************************/

Ti.App.removeEventListener('app:fromWebView', startListeningWebViewCalls);
		
if( passedData.id === -1){
	
	$.start_screen.visible 							= true;
	$.start_screen.height 							= '180dp';
	
	$.the_scroll_view.visible 						= false;
	
	$.navBar.getView('topbar').visible 		= false;
		
	$.adjust_keyboard.visible 					= false;
	$.adjust_keyboard_behind.visible 		= false;
	
	$.the_scroll_view.setHtml('');

}
else{
		
	$.start_screen.visible 							= false;
	$.start_screen.height 							= 0;
	
	$.the_scroll_view.visible 						= true;
	
	$.adjust_keyboard.visible 					= true;
	$.adjust_keyboard_behind.visible 		= true;
	
	$.the_scroll_view.setUrl(Alloy.Globals.endPoints.conversationLive);
	$.the_scroll_view.addEventListener('load',startWebView);
	
}

/******************************** SET BACK FROM MEMORY LAST WRITTEN WORDS ********************************/

Alloy.Globals.navigationWindow.addEventListener("focus",function(e) {

	Alloy.Globals.the_user_is_on_one_conversation= passedData.id;

	var last_words 									= Ti.App.Properties.getObject('user_messenger_last_words');
	
	if( typeof Alloy.Globals.user_messenger_last_words['conversion_'+passedData.id] != 'undefined' ){
		
		$.user_input.setValue(Alloy.Globals.user_messenger_last_words['conversion_'+passedData.id]);
		
		if($.user_input.value.length > 3){
			
			$.user_ok.image						= '/images/sendBlue.png';
			$.user_ok.disabled					= false;
			
		}
		
	}

});

Alloy.Globals.the_user_is_on_one_conversation= passedData.id;
	
Alloy.Globals.navigationWindow.addEventListener("close",function(e) {

	Alloy.Globals.the_user_is_on_one_conversation= false;

});

Alloy.Globals.navigationWindow.addEventListener("blur",function(e) {

	Alloy.Globals.the_user_is_on_one_conversation= false;

});

/******************************** LISTEN WEBVIEW BACKCALLS ***********************************/

var startListeningWebViewCalls 		= function(e) {
	
	////////////////// ZOOM ON IMAGE
	
	if( e.return_commande == 'zoom_on_one_image' ){

		$.the_scroll_view.animate({
	        top: 0,
	        height: Ti.Platform.displayCaps.platformHeight,
	        zIndex: 40000,
	        duration: 300,
	        curve: Ti.UI.ANIMATION_CURVE_LINEAR
	   });
	    
		$.the_scroll_view.disableBounce= true;

	}
	
	////////////////// DEZOOM ON IMAGE
	
	else if( e.return_commande == 'dezoom_on_one_image' ){

		$.the_scroll_view.animate({
	        top: 110,
	        height: Alloy.Globals.tableViewHeight+2,
	        zIndex: 0,
	        duration: 250,
	        curve: Ti.UI.ANIMATION_CURVE_LINEAR
	    });
	    
		$.the_scroll_view.disableBounce= false;

	}
	
	////////////////// SHARE OR SAVE AN IMAGE
	
	else if( e.return_commande == 'share_the_image' ){
		
		Alloy.Globals.SocialSharing.share({
		    status: 									'Chat utilisateur Swapbook :',
		    image: 									e.return_file_uri, // e.return_file_title
		    androidDialogTitle: 				'Swapbook Messenger'
		});

	}
	
	////////////////// ADD MORE PEOPLE TO CONVERSATION
	
	else if( e.return_commande == 'open_add_participants_modal' ){
		
		openRightLateralMenu();
    
	}
	
	////////////////// QUIT THE CONVERSATION FOR THE CURRENT USER
	
	else if( e.return_commande == 'quit_the_conversation' ){
		
		_sub_function_ASK_before_REMOVE_user_from_conversation(
			{
				u_id: 										Alloy.Globals.THE_USER.id_user,
				u_name: 									Alloy.Globals.THE_USER.user_prenom+' '+Alloy.Globals.THE_USER.user_nom,
				u_image: 								'{"current":"/images/blank.png"}',
				u_mutual_friends: 					0,
				u_statut: 									null
			}
		);

	}
	
	////////////////// NEW GROUP PHOTO BY ANOTHER USER DETECTED
	
	else if( e.return_commande == 'new_group_photo' ){
		
		passedData.type 							= 'group';	
		
		///// UPDATE IMAGES
		
		$.modal_banner_img.image			= e.new_group_image;
		$.modal_banner_img_user.image= e.new_group_image;
		$.navBar.getView('navBarImage').image= e.new_group_image;

		///// DISPLAY CONSEQUENCES

		$.goToUserProfile.visible				= false;
		$.addGroupPhoto.visible				= true;
		$.renameGroup.text						= 'Renommer la discussion';
		$.renameGroup.mode					= 'rename';
		$.navBar.getView('online').visible= false;
		$.navBar.getView('offline').visible= false;
		
	}
	
	////////////////// NEW GROUP MEMBER ADD BY ANOTHER USER DETECTED
	
	else if( e.return_commande == 'new_group_member' ){
		
		passedData.type 							= 'group';
		
		///// DISPLAY CONSEQUENCES
		
		$.modal_banner_uname.text		= e.new_group_name;
		$.user_rename.value 					= e.new_group_name;
		$.navBar.getView('navBarText').text= e.new_group_name;
		
		$.modal_banner_img.image			= e.new_group_image;
		$.modal_banner_img_user.image= e.new_group_image;
		$.navBar.getView('navBarImage').image= e.new_group_image;

		$.modal_participants_list.height= 142+33;
	
		$.goToUserProfile.visible				= false;
		$.addGroupPhoto.visible				= true;
		$.renameGroup.text						= 'Renommer la discussion';
		$.renameGroup.mode					= 'rename';
	
		$.navBar.getView('online').visible= false;
		$.navBar.getView('offline').visible= false;
		
		///// UPDATE MODAL POPUP LISTS
		
		Alloy.Globals.gotoMessage_available_outside.fireEvent('click');
		
		Alloy.Globals.loadFriendsToAddToTheConversation('update');
		
	}
	
	////////////////// GROUP MEMBER DELETED BY ANOTHER USER DETECTED
	
	else if( e.return_commande == 'group_member_deleted' ){
		
		_sub_function_ADD_UPDATE_DELETE(
			'_DELETE_',
			$.modal_participants_list,
			'participants',
			{
				u_id:										 e.row_to_remove,
				u_name: 									null,
				u_image: 								'{"current":"/images/blank.png"}',
				u_mutual_friends: 					0,
				u_statut: 									null
			}
		);

	}
	
	////////////////// NEW GROUP NAME BY ANOTHER USER DETECTED (OR TRANSFORMATION IN A GROUP)
	
	else if( e.return_commande == 'new_group_name' ){
	
		passedData.type 							= 'group';
		
		///// DISPLAY CONSEQUENCES (UPDATE TEXT)
		
		$.modal_banner_uname.text		= e.new_group_name;
		$.user_rename.value 					= e.new_group_name;
		$.navBar.getView('navBarText').text= e.new_group_name;

		$.modal_participants_list.height 			= 142+33;
	
		$.goToUserProfile.visible							= false;
		$.addGroupPhoto.visible							= true;
		$.renameGroup.text									= 'Renommer la discussion';
		$.renameGroup.mode								= 'rename';
	
		$.navBar.getView('online').visible			= false;
		$.navBar.getView('offline').visible			= false;
		
		///// UPDATE MODAL POPUP LISTS
		
		Alloy.Globals.gotoMessage_available_outside.fireEvent('click');
		
		Alloy.Globals.loadFriendsToAddToTheConversation('update');
	
	}
	
	////////////////// THE OTHER USER IS WRITING
	
	else if( e.return_commande == 'the_other_user_is_writing' ){
		
		if( passedData.type == 'group' )return;
		
		$.navBar.getView('offline').text 			= 'écrit...';
		$.navBar.getView('offline').locked_by_is_writing= true;
		$.navBar.getView('offline').visible 		= true;
		
	}
	
	////////////////// THE OTHER USER IS WRITING
	
	else if( e.return_commande == 'the_other_user_is_not_writing' ){
		
		if( passedData.type == 'group' )return;
		
		$.navBar.getView('offline').text 			= $.navBar.getView('offline').old_text;
		$.navBar.getView('offline').locked_by_is_writing= false;
		$.navBar.getView('offline').visible 		= false;
		
	}

	return 'ok';
	
};

/******************************** NAVIGATION BAR IMAGE CLICK ****************************************/

$.navBar.getView('navBarImage').addEventListener("click", function(e) {
	
	Alloy.Globals.preventDoubleClick(this);

	openRightLateralMenu();
    
}); 

/******************************** MODAL CLOSE CLICK ****************************************/

$.modal_close.addEventListener("click", function(e) {
	
	Alloy.Globals.preventDoubleClick(this);
		
	closeRightLateralMenu();

}); 

/******************************** CHANGE GROUP PICTURE CLICK ****************************************/

$.addGroupPhoto.addEventListener("click", function(e) {
	
	Alloy.Globals.preventDoubleClick(this);
	
	//////////////// CHOOSE THE PHOTO SOURCE
	
	if(Dialog_for_photos_for_group != null)delete Dialog_for_photos_for_group;
	
	var localOptions 								= Alloy.Globals.app_image__pre_dialog_options;
	localOptions.title 								= 'Modification de la photo de la discussion :';
	
	var Dialog_for_photos_for_group= Ti.UI.createOptionDialog(localOptions);
	
	Dialog_for_photos_for_group.addEventListener('click',function(ev){
		
		///////if(Dialog_for_photos_for_group)Dialog_for_photos_for_group.hide();
		delete Dialog_for_photos_for_group;
		
		Alloy.Globals.handler_for_camera_or_gallery_dialog(
			ev,
			640,
			'jpg',
			true,
			'group-conversations-pictures/by_id_user_'+Alloy.Globals.THE_USER.id_user+'/change_for_conversation_'+passedData.id,
			Alloy.Globals.endPoints.conversationUpdatePhoto,
			afterGroupPictureChange,
			{
	    		id_conv: 									passedData.id,
	    		id_user: 									Alloy.Globals.THE_USER.id_user,
	    		user_name: 							Alloy.Globals.THE_USER.user_prenom,
			},
			afterGroupPictureCANCEL
		);
		
	}); 

	Dialog_for_photos_for_group.show();
	
});

function afterGroupPictureChange(JSON_returned,local_params){

	if(typeof JSON_returned['error'] !== 'undefined'){
		
		Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);
		
	}
	else{
		
		///////////////Alloy.Globals.Logs.llog('---------------- IMAGE UPLOADED (update group) ----------------');
		///////////////Alloy.Globals.Logs.llog(JSON_returned);
		
		if(typeof(JSON_returned['output-array']) == 'undefined')return;
		
		/////////////////////// ENVOI AU WEBSOCKET LIVE : EVENT
	
	    Ti.App.fireEvent(
	    	'app:fromTitanium',
	    	{
	    		commande: 							'tell_people_new_group_photo',
	    		id_sender : 								Alloy.Globals.THE_USER.id_user,
	    		image_to_show : 					JSON_returned['output-array']['picture_on_amazon_cdn'],
	    		message_to_show:				JSON_returned['output-array']['the_sent_message_for_websocket']
	    	}
	    );
	    
	}
	
};

function afterGroupPictureCANCEL(){
	
	delete Dialog_for_photos_for_group;
	var Dialog_for_photos_for_group 	= null;

};

/******************************** GOTO USER PROFILE CLICK ****************************************/

$.goToUserProfile.addEventListener("click", function(e) {
	
	Alloy.Globals.preventDoubleClick(this);
	
	Alloy.Globals.app.goTo("page_3_a_1_user_profile", {id_user: the_user_of_the_conv});
    
}); 

/******************************** FILTER/SEARCH FRIENDS INPUT ****************************************/

var user_search_input_last_value 		= '';

$.user_search_input.addEventListener("change", function(e) {
	
	if(this.value.length >= 3)
		Alloy.Globals.loadFriendsToAddToTheConversation('update');
		
	if(
		this.value.length < 3 &&
		this.value.length < user_search_input_last_value.length
	)Alloy.Globals.loadFriendsToAddToTheConversation('update');
    
    user_search_input_last_value	 		= this.value;
    
}); 

/******************************** RENAME GROUP CLICK ****************************************/

$.renameGroup.addEventListener("click", function(e) {
	
	/////////////////////// 1 = ON VEUT RENOMMER
	
	if(this.mode == 'rename'){
	
		Alloy.Globals.preventDoubleClick(this);

		$.user_rename.visible					= true;
		$.renameGroupSave.visible			= true;
		$.renameGroupSave.height			= 42;
		$.modal_banner_uname.visible 	= false;
		$.renameGroup.text						= 'Annuler le renommage';
		$.renameGroup.mode					= 'cancel';
		$.modal_participants_list.height= 0;
		
		$.user_rename.focus();
	
	}
	
	/////////////////////// 2 = ON VEUT ENREGISTRER LE NOUVEAU NOM
	
	else if(this.mode == 'cancel'){
	
		Alloy.Globals.preventDoubleClick(this);

		$.user_rename.visible					= false;
		$.renameGroupSave.visible			= false;
		$.renameGroupSave.height			= 0;
		$.modal_banner_uname.visible 	= true;
		$.renameGroup.text						= 'Renommer la discussion';
		$.renameGroup.mode					= 'rename';
		$.modal_participants_list.height	= 142;
		
		$.user_rename.blur();
						
	}
	
	/////////////////////// 3 = ON EST SUR UNE CONV. DUO DONC RIEN (Ajouter des amis s'affiche)
	
	else{

		return;
		
	}

});

/////////////////////// 4 = ON VEUT RENOMMER
	
$.renameGroupSave.addEventListener('click',function(){
	
	Alloy.Globals.preventDoubleClick(this);

	/* ******************************************** */
	/* ********* AJAX API QUERY (FAST WAY) ******** */
	/* ******************************************** */
	Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		Alloy.Globals.endPoints.conversationRename,
		{
			id_conv: 										passedData.id,
    		id_user: 										Alloy.Globals.THE_USER.id_user,
    		user_name: 								Alloy.Globals.THE_USER.user_prenom,
    		gname: 										$.user_rename.value
		},
		{
			async_params: 				{},
			async_execution: 			function(JSON_returned,async_params_back){			
				if(typeof JSON_returned['error'] !== 'undefined'){
					
					Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);
					
				}
				else{
					
					///////////////Alloy.Globals.Logs.llog('---------------- GROUP WELL RENAMED ----------------');
					///////////////Alloy.Globals.Logs.llog(JSON_returned);
					
					if(typeof(JSON_returned['output-array']) == 'undefined')return;
					
					/////////////////////// ENVOI AU WEBSOCKET LIVE : EVENT
					
				    Ti.App.fireEvent(
				    	'app:fromTitanium',
				    	{
				    		commande: 										'tell_people_new_group_name',
				    		id_sender : 											Alloy.Globals.THE_USER.id_user,
				    		message_to_show:							JSON_returned['output-array']['the_sent_message_for_websocket'],
				    		name_to_return:									JSON_returned['output-array']['the_new_group_name']
				    	}
				    );
				    
					$.user_rename.visible								= false;
					$.renameGroupSave.visible						= false;
					$.renameGroupSave.height						= 0;
					$.modal_banner_uname.visible 				= true;
					$.renameGroup.text									= 'Renommer la discussion';
					$.renameGroup.mode								= 'rename';
					$.modal_participants_list.height				= 142;
				    
				}
			}
		},
		false,
		true 
	);

});

/******************************** REMOVE TO CONVERSATION A USER EVENT ****************************************/

function _sub_function_ASK_before_REMOVE_user_from_conversation(row_user_object){
	
	if(Alloy.Globals.startWebView_event != null)return;
	Alloy.Globals.startWebView_event	= 1;
	
	var possible_question_text 				= (row_user_object.u_id == Alloy.Globals.THE_USER.id_user) ? 'Veux-tu vraiment quitter la discussion ?' : 'Veux-tu vraiment retirer '+row_user_object.u_name+' de la discussion ?';
	var message_for_other_users			= (row_user_object.u_id == Alloy.Globals.THE_USER.id_user) ? Alloy.Globals.THE_USER.user_prenom+' a quitté la discussion' : Alloy.Globals.THE_USER.user_prenom+' a retiré '+row_user_object.u_name+' de la discussion';
	var message_for_notification 			= Alloy.Globals.THE_USER.user_prenom+' '+Alloy.Globals.THE_USER.user_nom+' t\'a retiré d\'une discussion';
	
	if(remove_question)delete remove_question;
	
	var remove_question							= Ti.UI.createAlertDialog(
		{
			cancel: 										1,
			buttonNames: 							['Oui', 'Non'],
			message: 									possible_question_text,
			title: 											'Discussion Swapbook'
		}
	);

	remove_question.addEventListener('click', function(e){
		
		remove_question.hide();
		delete remove_question;

		/////////////////////// REPONSE OUI
		
		if (e.index === 0){
			
			/* ******************************************** */
			/* ********* AJAX API QUERY (FAST WAY) ******** */
			/* ******************************************** */
			Alloy.Globals.Requests.RequestsMaker(
				'POST',
				true,
				Alloy.Globals.endPoints.conversationRemovePeople,
				{
					id_conv: 										passedData.id,
		    		id_user: 										Alloy.Globals.THE_USER.id_user,
		    		id_user_to_remove: 					row_user_object.u_id,
		    		message_to_other_users: 		message_for_other_users,
		    		message_for_notification: 		message_for_notification
				},
				{
					async_params: 				{},
					async_execution: 			function(JSON_returned,async_params_back){	
						var remove_question= null;		
						if(typeof JSON_returned['error'] !== 'undefined'){
							
							Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);
							
						}
						else{
							
							///////////////Alloy.Globals.Logs.llog('---------------- USER WELL REMOVED ----------------');
							///////////////Alloy.Globals.Logs.llog(JSON_returned);
							
							if(typeof(JSON_returned['output-array']) == 'undefined')return;
							
							/////////////////////// ENVOI AU WEBSOCKET LIVE : EVENT
							
						    Ti.App.fireEvent(
						    	'app:fromTitanium',
						    	{
						    		commande: 										'tell_people_group_member_deleted',
						    		id_sender : 											Alloy.Globals.THE_USER.id_user,
						    		message_to_show:							JSON_returned['output-array']['the_sent_message_for_websocket'],
						    		user_to_remove:									JSON_returned['output-array']['the_user_id_row_to_remove']
						    	}
						    );
			
						}
					}
				},
				false,
				false 
			);

		}
			
		setTimeout(function(){
			
			Alloy.Globals.startWebView_event 						= null;
			
		},6000);
		
	});

	remove_question.show();

};

/******************************** ADD TO CONVERSATION A USER EVENT ****************************************/

function _sub_function_ADD_user_in_conversation(row_user_object){
					
	/* ******************************************** */
	/* ********* AJAX API QUERY (FAST WAY) ******** */
	/* ******************************************** */
	Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		Alloy.Globals.endPoints.conversationAddPeople,
		{
			id_conv: 										passedData.id,
    		id_user: 										Alloy.Globals.THE_USER.id_user,
    		id_user_to_add: 							row_user_object.u_id,
    		keep_name:								$.modal_banner_uname.text,
    		keep_picture:								$.navBar.getView('navBarImage').image,
    		message_to_other_users: 		Alloy.Globals.THE_USER.user_prenom+' a ajouté '+row_user_object.u_name+' dans la discussion',
		    message_for_notification: 		Alloy.Globals.THE_USER.user_prenom+' '+Alloy.Globals.THE_USER.user_nom+' t\'a ajouté dans une discussion',
		},
		{
			async_params: 				{},
			async_execution: 			function(JSON_returned,async_params_back){			
				if(typeof JSON_returned['error'] !== 'undefined'){
					
					Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);
					
				}
				else{
					
					///////////////Alloy.Globals.Logs.llog('---------------- USER WELL ADDED ----------------');
					///////////////Alloy.Globals.Logs.llog(JSON_returned);
					
					//////////// GOOGLE ANALYTICS 
					
					Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
						category: 												"App. social behaviours",
						label: 														"Invite a friend in Conversation",
						action: 													"invite a friend for talking",
						value: 														1
					});
					
					if(typeof(JSON_returned['output-array']) == 'undefined')return;
					
					/////////////////////// ENVOI AU WEBSOCKET LIVE : EVENT
					
				    Ti.App.fireEvent(
				    	'app:fromTitanium',
				    	{
				    		commande: 				'tell_people_new_group_member',
				    		id_sender : 					Alloy.Globals.THE_USER.id_user,
				    		message_to_show:	JSON_returned['output-array']['the_sent_message_for_websocket'],
				    		message_to_return:	JSON_returned['output-array']['the_new_group_name'],
	    					image_to_show:			JSON_returned['output-array']['picture_on_amazon_cdn']
				    	}
				    );
				    
				}
			}
		},
		false,
		false 
	);
	
};

/******************************** ADD / UPDATE / DELETE A USER ROW ****************************************/

function _sub_function_ADD_UPDATE_DELETE(action,row_container,row_container_type,row_user_object){

		var row_user_object_pic 				= JSON.parse(row_user_object.u_image);
		var row_user_object_online 			= (row_user_object.u_statut == '• En ligne') ? true : false;
		var row_the_other_user_online    = ( passedData.type == 'duo' && row_container_type =='participants' && parseInt(row_user_object.u_id) != Alloy.Globals.THE_USER.id_user) ? true : false;
		var row_user_object_mutual_friends= (parseInt(row_user_object.u_mutual_friends) == 0) ? 'Aucun ami en commun' : row_user_object.u_mutual_friends+' amis en commun';
		row_user_object_mutual_friends	= (parseInt(row_user_object.u_mutual_friends) == 1) ? '1 ami en commun' : row_user_object_mutual_friends;
		if( row_user_object.u_id == Alloy.Globals.THE_USER.id_user )row_user_object_mutual_friends	= 'Ton statut :';
		
		//////////////////////////////////////////////
		////////////////////////////////////////////// MODE ADD
		//////////////////////////////////////////////
		
		if (action === '_ADD_'){
			
			/////////Alloy.Globals.Logs.llog('---------------------------- DISPLAY : AJOUT');
			/////////Alloy.Globals.Logs.llog(row_user_object);
			
			/******** XML PREPARATION *******/

			var user_conv_template_container					= Ti.UI.createView({						id:				'user_'+row_user_object.u_id});
				$.addClass(user_conv_template_container,'user_conv_template_container');
			var user_conv_photo_container						= Ti.UI.createView({						touchenabled:true});
				$.addClass(user_conv_photo_container,'user_conv_photo_container');
			var user_conv_photo 										= Ti.UI.createImageView({			image: 		row_user_object_pic.current});
				$.addClass(user_conv_photo,'user_conv_photo');
			var user_conv_name 											=Ti.UI.createLabel({						text:				row_user_object.u_name});
				$.addClass(user_conv_name,'labl');
				$.addClass(user_conv_name,'user_conv_name');
			var user_conv_friends 										=Ti.UI.createLabel({						text:				row_user_object_mutual_friends});
				$.addClass(user_conv_friends,'labl');
				$.addClass(user_conv_friends,'user_conv_friends');
			var user_conv_last_status_date 						=Ti.UI.createLabel({						text:				row_user_object.u_statut});
				$.addClass(user_conv_last_status_date,'labl');
				$.addClass(user_conv_last_status_date,'user_conv_last_status_date');
				if(row_user_object_online == true)$.addClass(user_conv_last_status_date,'online');
			var user_conv_delete 										= Ti.UI.createImageView({			image: 		'/images/messengerDelete.png'});
				user_conv_delete.touchenabled 					= true;
				user_conv_delete.visible 								= (row_container_type =='participants') ? true : false;
				$.addClass(user_conv_delete,'btn');
				$.addClass(user_conv_delete,'user_conv_delete');
			var user_conv_add 											= Ti.UI.createImageView({			image: 		'/images/messengerAdd.png'});
				user_conv_add.touchenabled 						= true;
				user_conv_add.visible 									= (row_container_type =='participants') ? false : true;
				$.addClass(user_conv_add,'btn');
				$.addClass(user_conv_add,'user_conv_add');
			var user_conv_separator									= Ti.UI.createView({});
				$.addClass(user_conv_separator,'user_conv_separator');

			/******* EVENT LISTENERS *******/
			
			user_conv_photo_container.addEventListener("click", function(e) {
				Alloy.Globals.preventDoubleClick(this);
				Alloy.Globals.app.goTo("page_3_a_1_user_profile", {id_user: row_user_object.u_id});
			}); 

			user_conv_delete.addEventListener("click", function(e) {
				Alloy.Globals.preventDoubleClick(this);
				_sub_function_ASK_before_REMOVE_user_from_conversation(row_user_object);
			});
			
			user_conv_add.addEventListener("click", function(e) {
				Alloy.Globals.preventDoubleClick(this);
				_sub_function_ADD_user_in_conversation(row_user_object);
			});
			
			/******** XML REPRODUCTION *******/
			
			user_conv_photo_container.add(						user_conv_photo);
				user_conv_template_container.add(			user_conv_photo_container);
				user_conv_template_container.add(			user_conv_name);
				user_conv_template_container.add(			user_conv_friends);
				user_conv_template_container.add(			user_conv_last_status_date);
				user_conv_template_container.add(			user_conv_delete);
				user_conv_template_container.add(			user_conv_add);
				user_conv_template_container.add(			user_conv_separator);
					row_container.add(									user_conv_template_container);
			
			/////////////////////////////////////// SI UTILISATEUR AVEC QUI ON DISCUTE (DUO)
			
			if (row_the_other_user_online == true){
				
				$.navBar.getView('online').visible				= (row_user_object_online == true) ? ( passedData.type == 'group' ? false : true ) : false;
				$.navBar.getView('offline').visible				= (row_user_object_online == true) ? false : ( passedData.type == 'group' ? false : true );
				if($.navBar.getView('offline').locked_by_is_writing == false)$.navBar.getView('offline').text= row_user_object.u_statut;
				
				if(row_user_object.u_id == 1){
					$.navBar.getView('offline').visible 			= false;
				}
				
			}
				
		}

		//////////////////////////////////////////////
		////////////////////////////////////////////// MODE UPDATE
		//////////////////////////////////////////////
		
		else if (action === '_UPDATE_'){
			
			/////////Alloy.Globals.Logs.llog('---------------------------- DISPLAY : UPDATE');
			/////////Alloy.Globals.Logs.llog(row_user_object);
			
			/******** XML SELECTION (underscore.js) *******/

			var user_conv_template_container					= null;
			var set_visible_button_remove 						= (row_container_type =='participants') ? true : false;
			var set_visible_button_add 								= (row_container_type =='participants') ? false : true;
			
			if(row_container && row_container.getChildren()){
				
		        var children 													= row_container.getChildren();
		        _.some(children, function(child){
					if( child.id == 'user_'+row_user_object.u_id){
						user_conv_template_container 			= child;
						return true;
					}
		        });
		        
		    }
		    
			/******** XML COMPARISON + UPDATE *******/
    
    		if( user_conv_template_container != null ){
    			
				var user_conv_photo 									= user_conv_template_container.children[0].children[0];
				var user_conv_name 										= user_conv_template_container.children[1];
				var user_conv_friends 									= user_conv_template_container.children[2];
				var user_conv_last_status_date 					= user_conv_template_container.children[3];
				var user_conv_delete 									= user_conv_template_container.children[4];
				var user_conv_add 										= user_conv_template_container.children[5];

				if( user_conv_photo.image != row_user_object_pic.current)
					user_conv_photo.image							= row_user_object_pic.current;
				if( user_conv_name.text != row_user_object.u_name)
					user_conv_name.text									= row_user_object.u_name;
				if( user_conv_friends.text != row_user_object_mutual_friends)
					user_conv_friends.text								= row_user_object_mutual_friends;
				if( user_conv_last_status_date.text != row_user_object.u_statut){
					user_conv_last_status_date.text				= row_user_object.u_statut;
					if(row_user_object_online == true){
						$.addClass(user_conv_last_status_date,'online');
					}
					else{
						$.removeClass(user_conv_last_status_date,'online');
					}
				}
				
				if( user_conv_delete.visible != set_visible_button_remove)
					user_conv_delete.visible 							= set_visible_button_remove;
				if( user_conv_add.visible != set_visible_button_add)
					user_conv_add.visible 								= set_visible_button_add;
					
				/////////////////////////////////////// SI UTILISATEUR AVEC QUI ON DISCUTE (DUO)
				
				if (row_the_other_user_online == true){
					
					$.navBar.getView('online').visible			= (row_user_object_online == true) ? ( passedData.type == 'group' ? false : true ) : false;
					$.navBar.getView('offline').visible			= (row_user_object_online == true) ? false : ( passedData.type == 'group' ? false : true );
					if($.navBar.getView('offline').locked_by_is_writing == false)$.navBar.getView('offline').text= row_user_object.u_statut;
				
				}
				
    		}
		
		}

		////////////////////////////////////////////// 
		////////////////////////////////////////////// MODE DELETE
		//////////////////////////////////////////////
		
		else if (action === '_DELETE_'){
			
			if(row_container_type != 'participants')return;
			
			/////////Alloy.Globals.Logs.llog('---------------------------- DISPLAY : SUPPRESSION');
			/////////Alloy.Globals.Logs.llog(row_user_object);
			
			/******** XML SELECTION (underscore.js) + DELETE *******/

			if(row_container && row_container.getChildren()){
				
		        var children 								= row_container.getChildren();
		        _.some(children, function(child){
					if( child.id == 'user_'+row_user_object.u_id){
						row_container.remove(child);
						return true;
					}
		        });
		        
		    }
			
			/******** SI PLUS AUCUN PARTICIPANT RECENSé (group) OU SI USER SOLO (duo) >>> WINDOW CLOSE *******/
			
			var participants_restants 			= row_container.children.slice(0);
			
			if(
				(row_user_object.u_id == Alloy.Globals.THE_USER.id_user) ||
				(passedData.type == 'duo' && participants_restants.length < 2) ||
				(passedData.type == 'group' && participants_restants.length < 1)
			){
				
				$.the_scroll_view.remove();
								
				Alloy.Globals.gotoMessage_available_outside.fireEvent('click');
				
				Ti.App.removeEventListener('app:fromWebView',startListeningWebViewCalls);
		
				Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['on_oneconversation_page']);
				
			}
		    
		}
		
		return;

};

/******************************** SEND MESSAGE INPUT AUTO POSITIONING ***********************************/

Ti.App.addEventListener("keyboardframechanged", function(e) {
	
	if(
		the_good_bottom_margin_should_be == null &&
		e.keyboardFrame.height > 1
	){

		//////////
		Alloy.Globals.Logs.llog('------------- SAUVEGARDE DE LA HAUTEUR DU CLAVIER DU DEVICE -------------');
		//////////
		Alloy.Globals.Logs.llog(e);

		the_good_bottom_margin_should_be= e.keyboardFrame.height;
	    
	}

}); 

/******************************** SEND MESSAGE INPUT FOCUS ****************************************/
		
$.user_input.addEventListener("focus", function(e) {
	
	///////////Alloy.Globals.Logs.llog('*********** FOCUS ***********');
	///////////Alloy.Globals.Logs.llog(e);
	
	this.focused 											= true;
	
	if(this.value == 'Aa')this.value= '';
		
	if(the_good_bottom_margin_should_be != null){
		
		if(the_good_bottom_margin_should_be < 10)return;
		
		var adjust 											= the_good_bottom_margin_should_be-2;
		var adjust_webview 							= the_good_bottom_margin_should_be+the_good_bottom_margin_for_webview;
		if($.tabBar.getView('bottomBar').getVisible() == false){
			adjust_webview 							+= 58;
		}
		
	    $.adjust_keyboard.animate({
	        bottom: adjust,
	        duration: 420,
	        curve: Ti.UI.ANIMATION_CURVE_LINEAR
	    });
	    $.adjust_keyboard_behind.animate({
	        bottom: adjust,
	        duration: 420,
	        curve: Ti.UI.ANIMATION_CURVE_LINEAR
	    });
		
		//////////// GOOGLE ANALYTICS 
		
		Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
			category: 												"App. social behaviours",
			label: 														"Chat and Talk",
			action: 													"start taping a message",
			value: 														1
		});
	
		/////////////////////// ENVOI AU WEBSOCKET LIVE : AJUSTEMENT
	
	    Ti.App.fireEvent(
	    	'app:fromTitanium',
	    	{
	    		commande: 								'add_margin_at_bottom',
	    		value: 											adjust_webview
	    	}
	    );
	    
	}
		
	/////////////////////// ADJUST TEXTFIELD HEIGHT
	
	adjustMessageFieldHeight('focus');
    
}); 

/******************************** SEND MESSAGE INPUT BLUR ****************************************/

$.user_input.addEventListener("blur", function(e) {
	
	///////////Alloy.Globals.Logs.llog('*********** BLUR ***********');
	///////////Alloy.Globals.Logs.llog(e);
	
	this.focused 											= false;
	
	adjustMessageFieldHeight('blur');
	
	if(this.value.length < 3)this.value = 'Aa';

    $.adjust_keyboard.animate({
        bottom: base_for_keyboard,
        duration: 250,
        curve: Ti.UI.ANIMATION_CURVE_LINEAR
    });
    $.adjust_keyboard_behind.animate({
        bottom: base_for_keyboard,
        duration: 250,
        curve: Ti.UI.ANIMATION_CURVE_LINEAR
    });
	
	/////////////////////// ENVOI AU WEBSOCKET LIVE : STOP TYPING

    Ti.App.fireEvent(
		'app:fromTitanium',
		{
			commande: 									'tell_people_stop_typing',
    		user_id: 											Alloy.Globals.THE_USER.id_user,
			conv_id:											passedData.id
		}
    );
	
	/////////////////////// ENVOI AU WEBSOCKET LIVE : AJUSTEMENT

    Ti.App.fireEvent(
    	'app:fromTitanium',
    	{
    		commande: 									'add_margin_at_bottom',
			value: 												the_good_bottom_margin_should_be_minimal+the_good_bottom_margin_for_webview
    	}
    );
    
}); 

/******************************** SEND MESSAGE INPUT CHANGE ****************************************/

$.user_input.addEventListener("keypressed", function(e) {
	
	this.focused 											= true;
		
	if(this.value.length >= 3){
	
		$.user_ok.image								= '/images/sendBlue.png';
		$.user_ok.disabled							= false;
		
		/////////////////////// ADJUST TEXTFIELD HEIGHT
		
		adjustMessageFieldHeight(e);
		
		/////////////////////// ENVOI AU WEBSOCKET LIVE : START TYPING
	
	    Ti.App.fireEvent(
	    	'app:fromTitanium',
	    	{
	    		commande: 								'tell_people_start_typing',
				user_name: 								Alloy.Globals.THE_USER.user_prenom+' '+Alloy.Globals.THE_USER.user_nom,
	    		user_image: 								Alloy.Globals.THE_USER.user_photos_url_json,
	    		user_id: 										Alloy.Globals.THE_USER.id_user,
				conv_id:										passedData.id
	    	}
	    );
	    
		/////////////////////// SAVE DU TEXTE SAISI
		
		Alloy.Globals.user_messenger_last_words['conversion_'+passedData.id]= this.value;
		Ti.App.Properties.setObject('user_messenger_last_words',Alloy.Globals.user_messenger_last_words);
		
	}
	else{
	
		$.user_ok.image								= '/images/sendGray.png';
		$.user_ok.disabled							= true;
		
		/////////////////////// ENVOI AU WEBSOCKET LIVE : STOP TYPING
	
	    Ti.App.fireEvent(
			'app:fromTitanium',
			{
				commande: 								'tell_people_stop_typing',
	    		user_id: 										Alloy.Globals.THE_USER.id_user,
				conv_id:										passedData.id
			}
	    );
	
	}

}); 

$.user_input.addEventListener("return", adjustMessageFieldHeight); 

function adjustMessageFieldHeight(e){
	
	///////////Alloy.Globals.Logs.llog('---------------- ADJUST TEXTAREA ----------------');
	///////////Alloy.Globals.Logs.llog(e);
	
	var do_adjustment 								= false;
	var row_addition_height 						= 19;
	var depend_on_characters 					= 34;
	var max_lines 										= 3;
	var input_length 									= e == 'blur' ? 4 : $.user_input.value.length;
	var height_factor 									= Math.floor( input_length / depend_on_characters );
	
	if (
		input_length % depend_on_characters === 0 ||
		( 
			input_length > ( depend_on_characters - 4 ) &&
			input_length < depend_on_characters
		)
	){
		
		do_adjustment 									= true;
		if( height_factor > max_lines )do_adjustment= false;
		
	}
	
	if( do_adjustment == true || e == 'blur'  || e == 'focus' ){
		
		$.user_input.animate({
	        height: parseInt($.user_input.height) + ( row_addition_height * height_factor ),
	        duration: 350,
	        curve: Ti.UI.ANIMATION_CURVE_LINEAR
	    });
	    $.adjust_keyboard_field.animate({
	        height: parseInt($.adjust_keyboard_field.height) + ( row_addition_height * height_factor ),
	        duration: 350,
	        curve: Ti.UI.ANIMATION_CURVE_LINEAR
	    });
		$.adjust_keyboard.animate({
	        height: parseInt($.adjust_keyboard.height) + ( row_addition_height * height_factor ),
	        duration: 350,
	        curve: Ti.UI.ANIMATION_CURVE_LINEAR
	    });
	    $.adjust_keyboard_behind.animate({
	        height: parseInt($.adjust_keyboard_behind.height) + ( row_addition_height * height_factor ),
	        duration: 350,
	        curve: Ti.UI.ANIMATION_CURVE_LINEAR
	    });
	    
	}
		
};

/******************************** SEND PHOTO CLICK ****************************************/

$.user_photo.addEventListener("click", function(e) {
	
	Alloy.Globals.preventDoubleClick(this);
	
	/////////////////////// ENVOI AU WEBSOCKET LIVE : STOP TYPING

    Ti.App.fireEvent(
		'app:fromTitanium',
		{
			commande: 									'tell_people_stop_typing',
    		user_id: 											Alloy.Globals.THE_USER.id_user,
			conv_id:											passedData.id
		}
    );
	
	//////////// GOOGLE ANALYTICS 
	
	Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
		category: 												"App. social behaviours",
		label: 														"Chat and Talk + Photo",
		action: 													"want to send a picture",
		value: 														1
	});
	
	//////////////// CHOOSE THE PHOTO SOURCE
							
	if(Dialog_for_photos_for_messages != null)delete Dialog_for_photos_for_messages;
	
	var Dialog_for_photos_for_messages= Ti.UI.createOptionDialog(Alloy.Globals.app_image__pre_dialog_options);
	
	Dialog_for_photos_for_messages.addEventListener('click',function(ev){
		
		///////if(Dialog_for_photos_for_messages)Dialog_for_photos_for_messages.hide();
		delete Dialog_for_photos_for_messages;
	
		Alloy.Globals.handler_for_camera_or_gallery_dialog(
			ev,
			720,
			'jpg',
			false,
			'user-messenger-content/by_id_user_'+Alloy.Globals.THE_USER.id_user+'/in_conversation_'+passedData.id,
			Alloy.Globals.endPoints.conversationPop,
			afterImageMessageSent,
			{
	    		id_conv: 										passedData.id,
	    		id_user: 										Alloy.Globals.THE_USER.id_user,
	    		user_name: 								Alloy.Globals.THE_USER.user_prenom+' '+Alloy.Globals.THE_USER.user_nom
			},
			afterImageMessageCANCEL
		);
		
	}); 

	Dialog_for_photos_for_messages.show();
	
}); 

function afterImageMessageSent(JSON_returned,local_params){

	if(typeof JSON_returned['error'] !== 'undefined'){
		
		Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);
		
	}
	else{
		
		///////////Alloy.Globals.Logs.llog('---------------- IMAGE UPLOADED (for message) ----------------');
		///////////Alloy.Globals.Logs.llog(JSON_returned);
		
		if(typeof(JSON_returned['output-array']) == 'undefined')return;
		
		/////////////////////// ENVOI AU WEBSOCKET LIVE : IMAGE
	
	    Ti.App.fireEvent(
	    	'app:fromTitanium',
	    	{
	    		commande: 								'send_message_to_the_websocket',
	    		id_conversation : 						passedData.id,
	    		id_sender : 									Alloy.Globals.THE_USER.id_user,
	    		message_type:							'image',
	    		image_to_send:							JSON_returned['output-array']['picture_on_amazon_cdn'],
	    		datas_for_websocket: 				JSON_returned['output-array']
	    	}
	    );
	
		/////////////////////// ADJUST TEXTFIELD HEIGHT
	    
		$.user_ok.disabled							= false;
	    $.user_input.value 							= '';
	    $.user_input.focused 						= false;
		
		adjustMessageFieldHeight('blur');
		
		Alloy.Globals.user_messenger_last_words['conversion_'+passedData.id]= '';
		Ti.App.Properties.setObject('user_messenger_last_words',Alloy.Globals.user_messenger_last_words);
	    
	}
	
};

function afterImageMessageCANCEL(){
	
	delete Dialog_for_photos_for_messages;
	var Dialog_for_photos_for_messages= null;

};

/******************************** SEND MESSAGE CLICK ****************************************/

$.user_ok.addEventListener("click", function(e) {
	
	if($.user_ok.disabled == true)return;
	if($.user_input.value.length < 3)return;
	
	/////////Alloy.Globals.preventDoubleClick(this);
	
	$.user_ok.image									= '/images/sendGray.png';
	$.user_ok.disabled								= true;
	
	/////////////////////// ENVOI AU WEBSOCKET LIVE : STOP TYPING

    Ti.App.fireEvent(
		'app:fromTitanium',
		{
			commande: 									'tell_people_stop_typing',
    		user_id: 											Alloy.Globals.THE_USER.id_user,
			conv_id:											passedData.id
		}
    );
	
	/* ********* AJAX API QUERY PARAMS ********* */
	request_input											= [];
	request_input['async_execution']		= afterTextMessageSent;
	request_input['async_params']			= [];
	
	/* ********* AJAX API QUERY ********* */
	Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		Alloy.Globals.endPoints.conversationPop,
		{
    		id_conv: 											passedData.id,
    		id_user: 											Alloy.Globals.THE_USER.id_user,
    		user_name: 									Alloy.Globals.THE_USER.user_prenom+' '+Alloy.Globals.THE_USER.user_nom,
    		content_text:									$.user_input.value
		},
		request_input,
		false,
		true
	);
    
}); 

function afterTextMessageSent(JSON_returned,local_params){

	if(typeof JSON_returned['error'] !== 'undefined'){
		
		Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);
		
	}
	else{
		
		///////////Alloy.Globals.Logs.llog('---------------- TEXT SAVED (for message) ----------------');
		///////////Alloy.Globals.Logs.llog(JSON_returned);
		
		if(typeof(JSON_returned['output-array']) == 'undefined')return;
			
		/////////////////////// ENVOI AU WEBSOCKET LIVE : TEXTE
	
	    Ti.App.fireEvent(
	    	'app:fromTitanium',
	    	{
	    		commande: 							'send_message_to_the_websocket',
	    		id_conversation : 					passedData.id,
	    		id_sender : 								Alloy.Globals.THE_USER.id_user,
	    		message_type:						'text',
	    		message_to_send:					$.user_input.value,
	    		datas_for_websocket: 			JSON_returned['output-array']
	    	}
	    );
	
		/////////////////////// ADJUST TEXTFIELD HEIGHT
	    
		$.user_ok.disabled						= false;
	    $.user_input.value 						= '';
	    $.user_input.focused 					= false;
		
		adjustMessageFieldHeight('blur');
		
		Alloy.Globals.user_messenger_last_words['conversion_'+passedData.id]= '';
		Ti.App.Properties.setObject('user_messenger_last_words',Alloy.Globals.user_messenger_last_words);
		    
	}
	
};

/******************************** RIGHT LATERAL MENU CONTROL ****************************************/

function openRightLateralMenu(){
	
	if(
		passedData.titre == 'Équipe Swapbook' ||
		passedData.titre == 'Équipe SwapBook' ||
		passedData.titre == 'Team Swapbook'
	)return;
	
	$.modal_menuOuter_shadow.animate({
        right: 273,
        duration: 420,
        curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
    });
    
	$.modal_menuOuter.animate({
        right: 0,
        duration: 300,
        curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
    });
    
	///////////////////
	/////////////////// LOAD FRIENDS TO ADD SCROLLVIEW (MODAL MENU)
	///////////////////

	Alloy.Globals.loadFriendsToAddToTheConversation('update');
    
    if( typeof Alloy.Globals.intervalForMessengerOnlineStatus !== "undefined" )clearInterval(Alloy.Globals.intervalForMessengerOnlineStatus);
	Alloy.Globals.intervalForMessengerOnlineStatus= setInterval(function(){
		
		Alloy.Globals.loadFriendsToAddToTheConversation('update');
		
	},3500);
    
};

function closeRightLateralMenu(){
		
	$.modal_menuOuter_shadow.animate({
        right: -15,
        duration: 250,
        curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
    });
    
	$.modal_menuOuter.animate({
        right: -280,
        duration: 300,
        curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
    });
    
	///////////////////
	/////////////////// STOP LOAD FRIENDS TO ADD SCROLLVIEW (MODAL MENU)
	///////////////////

	clearInterval(Alloy.Globals.intervalForMessengerOnlineStatus);
	delete Alloy.Globals.intervalForMessengerOnlineStatus;
	
	//////////Alloy.Globals.Logs.llog('---------- FERMETURE DU MENU >> FIN DU setInterval() SUR : loadFriendsToAddToTheConversation(update) ----------');

};

/******************************** ON CONVERSATION CLOSE ****************************************/

/*
Alloy.Globals.navigationWindow.addEventListener("close", function(e) {
				
	clearInterval(Alloy.Globals.intervalForMessengerOnlineStatus);
	delete Alloy.Globals.intervalForMessengerOnlineStatus;
	
	Ti.App.removeEventListener('app:fromWebView', startListeningWebViewCalls);
	
	Alloy.Globals.Logs.llog('---------- FERMETURE DE LA CONVERSATION >> FIN DU setInterval() SUR : loadFriendsToAddToTheConversation(update) ----------');
	
}); 
*/

/*********************************** SEND SALE CODE CLICK ****************************************/

$.SendCode.addEventListener("click", function(e) {
	
	if(typeof $.SendCode.sale_id == 'undefined')return;
	if(typeof $.SendCode.seller_user_id == 'undefined')return;
	
	Alloy.Globals.preventDoubleClick(this);

	///////// POP-IN
	
	Alloy.Globals.Logs.aalert(
		'CONFIRMATION D\'ENVOI',
		'Es-tu sûr(e) d\'envoyer ton code de confirmation ?',
		'Attention : si tu n\'as pas encore reçu tes livres, cet envoi permettra ensuite au vendeur de recevoir son argent.',
		'ANNULER',
		null,
		'CONFIRMER',
		Alloy.Globals.sendcodePROCESSfunction_1,
		{
			sizeUp1: 											true, 
			id_sender: 											Alloy.Globals.THE_USER.id_user,
			id_sale: 												$.SendCode.sale_id,
			id_seller: 											$.SendCode.seller_user_id,
		},
		false
	);
	
});

Alloy.Globals.sendcodePROCESSfunction_1= function(object_received){
	
	Alloy.Globals.Logs.llog('--------> ENVOI CODE étape 1');
	Alloy.Globals.Logs.llog(object_received);

	request_input												= [];
	request_input['async_execution']			= Alloy.Globals.sendcodePROCESSfunction_2;
	request_input['async_params']				= [];
	request_input['params']							= object_received;
	
	/* ********* AJAX API QUERY ********* */
	Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		Alloy.Globals.endPoints.sendCodeAfterBooksOrdering,
		request_input['params'],
		request_input,
		false,
		false
	);
	
};

Alloy.Globals.sendcodePROCESSfunction_2= function(JSON_returned,local_params){
	
	Alloy.Globals.Logs.llog('--------> ENVOI CODE étape 2');

	if(
		typeof JSON_returned['error'] !== 'undefined'
	){
		
		Alloy.Globals.Logs.llog(JSON_returned);
	
		/*********/
		/* ALERT */
		/*********/
		Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','Retenter',null,null,null,null);
		
		Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['on_onesale_page_recap']);
		
	}
	else{
	
		/* ******* BANNER */
		
		$.code.visible 										= false;
	
		/* ******* POP-IN */
		
		Alloy.Globals.Logs.aalert(
			'CODE ENVOYÉ',
			'Le code a bien été envoyé au vendeur qui pourra ainsi demander à Swapbook son argent.',
			'',
			'Fermer',
			null,
			null,
			null,
			null,
			false
		);
		
	}
		
	/* DISPLAY CONTENT */
	$.the_scroll_view.visible 							= true;

};
