var args 															= arguments[0] || {};

Alloy.Globals.Dialog 										= $.AlertDialog;

//////////////////// BUTTONS STYLE : AUTO

if (args.customparameter == 'achat'){
	
	$.addClass($.buybutton, 'active-button');
	$.removeClass($.sellbutton, 'active-button');
	
}
else if (args.customparameter == 'vente'){
	
	$.addClass($.sellbutton, 'active-button');
	$.removeClass($.buybutton, 'active-button');
	
}

//////////////////// BUTTONS CLICKS : MANUEL

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

$.backbutton.addEventListener('click', function(e) {
	
	if(this.removeInitialClick)return;
	
	if( typeof Alloy.Globals.toCloseWindows[$.backbutton.bcase] == 'undefined')return;
	
	Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows[$.backbutton.bcase]);

});

$.buybutton.addEventListener('click', function(e) {
	
		if( $.buybutton.bcase == 'goto_buy_page' ){
		
			$.backbutton.removeInitialClick		= false;
	
			Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['on_onesale_page']);
		
		}
		else{
		
			return;
		
		}

});

$.sellbutton.addEventListener('click', function(e) {

		if( $.sellbutton.bcase == 'goto_sell_page' ){
		
			if(args.customparameter == 'vente')return;
			
			Alloy.Globals.app.goTo('page_1_b_1_vente', {});
		
		}
		else{
		
			return;
		
		}

});