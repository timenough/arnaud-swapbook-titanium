var args 																							= arguments[0] || {};

$.showDeleteOption 																	= function() {
    $.rowContainer.left 																	= -90;
    $.Supprimer.right 																		= 0;
};
		 
$.hideDeleteOption 																		= function() {
    $.rowContainer.left 																	= 0;
    $.Supprimer.right 																		= -91;
};

/*********************************** ORIENTATION ADJUSTMENTS ****************************************/
		
function SwitchTwoTabs(e){

	var landscape 																			= ( typeof e.source != 'undefined'  && !e.source.isLandscape() ) ? false : true;
	local_landscape 																		= Alloy.Globals.the_u_is_on_tablet.isTablet() ? true : landscape;
	
	if(
		!local_landscape
	){
		
		if(!Alloy.Globals.the_u_is_on_tablet.isTablet()){
			
			$.photoContainer.visible 													= true;
			$.notiText.left 																	= 98;
			$.notiText.height 																= $.notiText.height == 60 ? 60 : 50;
			$.notiText.top 																	= 12;
			
		}
		
	}
	else{
		
		if(!Alloy.Globals.the_u_is_on_tablet.isTablet()){
			$.photoContainer.visible 													= false;
			$.notiText.left 																	= 16;
			$.notiText.height 																= 70;
			$.notiText.top 																	= 8;
		}
		
	}
	
};

Ti.Gesture.addEventListener('orientationchange',SwitchTwoTabs);
Ti.Gesture.fireEvent('orientationchange');