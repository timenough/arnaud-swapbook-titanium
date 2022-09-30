var args 												= arguments[0] || {};
var t 													=  Ti.UI.create2DMatrix();
var spin 												= Titanium.UI.createAnimation();
t 															= t.rotate(180);
spin.transform 									= t;
spin.duration 										= 200;

Alloy.Globals.LEFTbottom_badge	= $.button1badge;
Alloy.Globals.RIGHTbottom_badge	= $.button3badge;

//////////////////// 
//////////////////// BUTTONS BADGES : AUTO
//////////////////// 

if( 
	Alloy.Globals.THE_USER &&
	Alloy.Globals.THE_USER.id_user &&
	args.customparameter != 'no_left_badge_update'
){

	Alloy.Globals.loadReloadConversations(true,'MESSAGES',null,{},null,Alloy.createCollection('Conversations'),10000,Alloy.Globals.THE_USER.id_user);
	Alloy.Globals.loadReloadNotifications(true,'NOTIFICATIONS',null,{},null,Alloy.createCollection('Notifications'),10000,Alloy.Globals.THE_USER.id_user);
	
}

//////////////////// 
//////////////////// BUTTONS CLICKS : AUTO
//////////////////// 

if (args.customparameter == 'button1' || args.customparameter == 'no_left_badge_update'){
	$.addClass($.button1_img, 'activeBAG');
}
else if (args.customparameter == 'button2'){
	$.addClass($.button2_img, 'activeTAG');
}
else if (args.customparameter == 'button3' || args.customparameter == 'no_right_badge_update'){
	$.addClass($.button3_img, 'activeCHAT');
}

//////////////////// 
//////////////////// BUTTONS CLICKS : MANUEL
//////////////////// 

$.button2.addEventListener("click", function(_event) {
	
	Alloy.Globals.preventDoubleClick(this);
	
	this.animate(spin);
	
	/******************* CASES ********************/
	
	if( $.button2.bcase == 'on_home_page' ){
	
		Alloy.Globals.loadReloadSearchBooks_igniter();
	
	}
	else if( $.button2.bcase == 'on_onebook_page' ){
	
		Alloy.Globals.loadRefreshBook();
	
	}
	else if( $.button2.bcase == 'transactions_page' ){
	
		Alloy.Globals.loadRefreshMyTransactions();
	
	}
	else if( $.button2.bcase == 'on_onebook_achat_neuf_page' ){
	
		Alloy.Globals.resetAchatNeufForm();
	
	}
	else if( $.button2.bcase == 'on_messages_page' ){
	
		if( typeof Alloy.Globals.toCloseWindows['conversationspage'] != 'undefined')Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['conversationspage']);
		
		delete Alloy.Globals.toCloseWindows['conversationspage'];
		
		$.removeClass($.button1_img, 'activeBAG');
	
	}
	else if( $.button2.bcase == 'on_oneconversation_page' ){
	
		Alloy.Globals.loadReloadConversation();
	
	}
	else if( $.button2.bcase == 'on_network_page' ){
	
		if( typeof Alloy.Globals.toCloseWindows['networkpage'] != 'undefined')Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['networkpage']);
		
		delete Alloy.Globals.toCloseWindows['networkpage'];
		
		$.removeClass($.button3_img, 'activeCHAT');
	
	}
	else if( $.button2.bcase == 'on_profile_page' ){
	
		Alloy.Globals.loadRefreshUSER();
	
	}
	else{
	
		CloseLateralMenuPages();
	
		return;
	
	}

});

$.button1.addEventListener("click", function(_event) {
	
	CloseLateralMenuPages();

});

$.button3.addEventListener("click", function(_event) {
	
	CloseLateralMenuPages();

});

function CloseLateralMenuPages(){
	
	if( typeof Alloy.Globals.toCloseWindows['on_onesale_page'] != 'undefined')Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['on_onesale_page']);
	
	if( typeof Alloy.Globals.toCloseWindows['payments_page'] != 'undefined')Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['payments_page']);
	if( typeof Alloy.Globals.toCloseWindows['settings_page'] != 'undefined')Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['settings_page']);
	if( typeof Alloy.Globals.toCloseWindows['terms_page'] != 'undefined')Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['terms_page']);
	
	if( typeof Alloy.Globals.toCloseWindows['question_page'] != 'undefined')Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['question_page']);
	if( typeof Alloy.Globals.toCloseWindows['quick_chat_page'] != 'undefined')Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['quick_chat_page']);

};
