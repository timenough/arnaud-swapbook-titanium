var args 															= arguments[0] || {};

Alloy.Globals.Dialog 										= $.AlertDialog;

//////////////////// STYLE : AUTO

if (args.customparameter == 'hideBar'){
	
	$.topbar.visible 										= false;
	$.topbar.height 										= 0;
	
}

//////////////////// MANUEL

$.menubutton.addEventListener('touchstart', function(e) {

	if(Alloy.Globals.menuOpened == false){
		
		Alloy.Globals.openMenu();
		Alloy.Globals.menuOpened 					= true;
		
	}
	else{
		
		Alloy.Globals.closeMenu();
		Alloy.Globals.menuOpened 					= false;
		
	}
	
});

$.backbutton.addEventListener('touchstart', function(e) {
		
	if( typeof Alloy.Globals.toCloseWindows[$.backbutton.bcase] == 'undefined')return;
	
	if( $.backbutton.dcase ){
		Alloy.Globals.toCloseWindows['on_onesale_page_recap'].the_back_and_save_button_EXECUTED_instructions= 'OUI++';
	};
	
	Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows[$.backbutton.bcase]);

});
