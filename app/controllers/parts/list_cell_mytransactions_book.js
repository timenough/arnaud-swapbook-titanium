var args = arguments[0] || {};

function CodeClick(e) {
	
	Alloy.Globals.Logs.llog(e.source);
	
	if(e.source.params1 && e.source.params1 == 'chat'){
		
		Alloy.Globals.preventDoubleClick(this);
		Alloy.Globals.openConversationBetween(e.source.params2,e.source.params4);
		
	}
	else if(e.source.params1 && e.source.params1 == 'credits'){
		
		Alloy.Globals.preventDoubleClick(this);
		Alloy.Globals.askCreditsTransfer(e.source.params2,e.source.params3);
		
	}
	else{
		
		return;
		
	}
	
};