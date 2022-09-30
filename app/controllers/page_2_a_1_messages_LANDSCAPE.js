/*********************************** OPEN ****************************************/

Alloy.Globals.navigationWindow 																			= $.window;
Alloy.Globals.toCloseWindows['conversationspage'] 											= $.window;

Alloy.Globals.tabbed_two 																						= $.two;

var args 																														= arguments[0] || {};
var passedData 																										= args.passedData;

$.TheLeft.passedData 																								= passedData;

if(passedData && passedData.tab2){
	
	$.TheLeft.getView('gotoNotifications').fireEvent('click');

}

/*********************************** ORIENTATION ADJUSTMENTS ****************************************/

Alloy.Globals.navigationWindow.addEventListener('open',function(){

	if(!Alloy.Globals.the_u_is_on_tablet.isTablet()){
		
		$.one.width 																										= '100%';
		$.two.width 																										= 0;
		$.sepa.visible 																									= false;
		
	}
	
	Ti.Gesture.fireEvent('orientationchange');
	
});
		
function SwitchTwoTabs(e){

	var landscape 																										= ( typeof e.source != 'undefined'  && !e.source.isLandscape() ) ? false : true;
	local_landscape 																									= Alloy.Globals.the_u_is_on_tablet.isTablet() ? true : landscape;
	
	if(
		!local_landscape
	){
		
		if(!Alloy.Globals.the_u_is_on_tablet.isTablet()){
			
			$.one.width 																									= '100%';
			$.two.width 																									= 0;
			$.sepa.visible 																								= false;
			
		}
		
	}
	else{
		
		$.one.width 																										= '36%';
		$.two.width 																										= '64%';
		$.sepa.visible 																									= true;
		
	}
	
};

Ti.Gesture.addEventListener('orientationchange',SwitchTwoTabs);