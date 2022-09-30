/*********************************** OPEN ****************************************/

Alloy.Globals.navigationWindow              						= $.window;
Alloy.Globals.toCloseWindows['intro_slide_1']				= $.window;

Alloy.Globals.SignIn.Ready('next_slide_home',$.nextButton);

Alloy.Globals.SignIn.Ready('next_slide_1',$.one);
Alloy.Globals.SignIn.Ready('next_slide_2',$.two);
Alloy.Globals.SignIn.Ready('next_slide_3',$.three);

////////////// BANNER SCREEN ADAPTATION (because its not a blur image)

var banner_image_ratio 							= 885 / 1587; /////// 0,5576
var device_images_ratio 							= Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.platformHeight;
var perfect_width										= Ti.Platform.displayCaps.platformWidth;
var perfect_height									= Ti.Platform.displayCaps.platformWidth / banner_image_ratio;
if(perfect_height < Ti.Platform.displayCaps.platformHeight){
	perfect_height 										= Ti.Platform.displayCaps.platformHeight;
	perfect_width										= Ti.Platform.displayCaps.platformHeight * banner_image_ratio;
	$.bg.left 													= (Ti.Platform.displayCaps.platformWidth - perfect_width) / 2;
}

$.bg.width 												= perfect_width;
$.bg.height 												= perfect_height;