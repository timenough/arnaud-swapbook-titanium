var args 															= arguments[0] || {};

Alloy.Globals.Dialog 										= $.AlertDialog;

//////////////////// MANUEL

$.closebutton.addEventListener('touchstart', function(e) {
		
	if( typeof Alloy.Globals.toCloseWindows[$.closebutton.bcase] == 'undefined')return;
	
	Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows[$.closebutton.bcase]);
	
});