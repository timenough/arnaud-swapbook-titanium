var args 															= arguments[0] || {};

Alloy.Globals.Dialog 										= $.AlertDialog;

//////////////////// BUTTONS CLICKS : MANUEL

$.backbutton.addEventListener('touchstart', function(e) {
	
	/////////// CLOSING NO MATTER THE CASE IS (talking with Team)
	
	if(this.hide_lateral_bottom_buttons){
		
		if( typeof Alloy.Globals.toCloseWindows[$.backbutton.bcase] == 'undefined')return;
		Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows[$.backbutton.bcase]);
		return;
		
	}
	
	/////////// CLOSING A SECOND WINDOW JOB
	
	if(
		typeof Alloy.Globals.toCloseWindows['on_onesale_page_recap'] != 'undefined' &&
		this.bcase == 'on_oneconversation_page' &&
		this.after_sale == true
	){
		
		Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['on_onesale_page_recap']);
		
	}

	/////////// RELOAD THE MESSAGES LIST (gotoMessage tab button)
	if(
		typeof Alloy.Globals.gotoMessage_available_outside != 'undefined' &&
		typeof Alloy.Globals.gotoNotifications_available_outside != 'undefined' &&
		Alloy.Globals.Messages_tableView_MODE == 'MESSAGES'
	){

		Alloy.Globals.gotoMessage_available_outside.fireEvent('click');
		
	}
	/////////// RELOAD THE NOTIFICATIONS LIST (gotoMessage tab button)
	else if(
		typeof Alloy.Globals.gotoMessage_available_outside != 'undefined' &&
		typeof Alloy.Globals.gotoNotifications_available_outside != 'undefined' &&
		Alloy.Globals.Messages_tableView_MODE == 'NOTIFICATIONS'
	){

		Alloy.Globals.gotoNotifications_available_outside.fireEvent('click');
		
	}
	
	/////////// CLOSING WINDOW JOB (+ LANDSCAPE CASE)

	if(
		(
			Alloy.Globals.the_u_is_on_landscape &&
			!Alloy.Globals.the_u_is_on_tablet.isTablet()
		) ||
		!Alloy.Globals.the_u_is_on_landscape
	){
		
		if( typeof Alloy.Globals.toCloseWindows[$.backbutton.bcase] == 'undefined')return;
		Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows[$.backbutton.bcase]);
		
	}
	else{

		return;
		
	}
	

});