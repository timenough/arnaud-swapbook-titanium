var args = arguments[0] || {};

/*********************************** ORIENTATION ADJUSTMENTS ****************************************/
		
function SwitchTwoTabs(e){

	var landscape 																										= ( typeof e.source != 'undefined'  && !e.source.isLandscape() ) ? false : true;
	local_landscape 																									= Alloy.Globals.the_u_is_on_tablet.isTablet() ? true : landscape;
	
	if(
		!local_landscape
	){
		
		if(!Alloy.Globals.the_u_is_on_tablet.isTablet()){
			
			$.isParrainRelation.visible 																			= $.isParrainRelation.visible == true ? true : false;
			$.goToConv.visible 																						= true;
			
		}
		
	}
	else{
		
		if(!Alloy.Globals.the_u_is_on_tablet.isTablet()){
			$.isParrainRelation.visible 																			= false;
			$.goToConv.visible 																						= false;
		}
		
	}
	
};

Ti.Gesture.addEventListener('orientationchange',SwitchTwoTabs);
Ti.Gesture.fireEvent('orientationchange');