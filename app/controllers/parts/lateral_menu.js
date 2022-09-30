var args 															= arguments[0] || {};

Alloy.Globals.Dialog 										= $.AlertDialog;

//////////////////// MANUEL CLICKS

$.goto_informations.addEventListener('click', function(e) {
	
	Alloy.Globals.preventDoubleClick(this);
	
    /////////Alloy.Globals.closeMenu(true);
	/////////Alloy.Globals.menuOpened 			= false;
	
	Alloy.Globals.app.goToFAST("page_3_a_1_user_profile",{
		id_user: Alloy.Globals.THE_USER.id_user, 
		edition: true
	});
	
});

$.goto_transactions.addEventListener('click', function(e) {
	
	Alloy.Globals.preventDoubleClick(this);
	
    /////////Alloy.Globals.closeMenu(true);
	/////////Alloy.Globals.menuOpened 			= false;
	
	Alloy.Globals.app.goToFAST("page_3_b_1_transactions", {tab: 1});
	
});

$.goto_payment_infos.addEventListener('click', function(e) {
	
	Alloy.Globals.preventDoubleClick(this);
	
    /////////Alloy.Globals.closeMenu(true);
	/////////Alloy.Globals.menuOpened 			= false;
	
	Alloy.Globals.app.goToFAST("page_3_c_1_payments", {tab: 1});
	
});

$.goto_params.addEventListener('click', function(e) {
	
	Alloy.Globals.preventDoubleClick(this);
	
    /////////Alloy.Globals.closeMenu(true);
	/////////Alloy.Globals.menuOpened 			= false;
	
	Alloy.Globals.app.goToFAST("page_3_d_1_settings", {tab: 1});
	
});

$.goto_contact.addEventListener('click', function(e) {
	
	Alloy.Globals.preventDoubleClick(this);
	
    /////////Alloy.Globals.closeMenu(true);
	/////////Alloy.Globals.menuOpened 			= false;

	Alloy.Globals.openConversationBetween(
		Alloy.Globals.THE_USER.id_user,
		1 /* SWAPBOOK TEAM USER ID */
	); 
	
});

$.menuClose.addEventListener('click', function(e) {
	
	Alloy.Globals.preventDoubleClick(this);
	
    Alloy.Globals.closeMenu();
	Alloy.Globals.menuOpened 					= false;
		
});

//////////////////// MANUEL SWIPE

$.menuOuter.addEventListener("swipe", function(_event) {
	
    if(_event.direction == "right") {
    	
        Alloy.Globals.openMenu();
		Alloy.Globals.menuOpened 					= true;
        
    } 
    else if(_event.direction == "left") {
    	
        Alloy.Globals.closeMenu();
		Alloy.Globals.menuOpened 					= false;
        
    }
    
});