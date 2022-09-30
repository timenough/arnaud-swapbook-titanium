/*********************************** OPEN ****************************************/

Alloy.Globals.navigationWindow              	= $.window;
Alloy.Globals.toCloseWindows['homepage']= $.window;

/*********************************** FOCUS ****************************************/

$.window.addEventListener("focus",function(e) {
	
	Alloy.Globals.toCloseWindows['homepage']= $.window;
	
    Alloy.Globals.Dialog                          		= $.navBar.getView('AlertDialog');
    
    Alloy.Globals.sideMenu                          	= $.SlideMenu;
		
	Alloy.Globals.LEFTbottom_badge			= $.tabBar.getView('button1badge');
	Alloy.Globals.RIGHTbottom_badge			= $.tabBar.getView('button3badge');
	    
	/********************* TABLE VIEW SEARCH INIT *********************/
	
	Alloy.Globals.loadReloadSearchBooks_display_tableView= $.the_table_view;
	Alloy.Globals.loadReloadSearchBooks_display_rows= "list_cell_book";
	Alloy.Globals.loadReloadSearchBooks_fetch_Collection= $.salesRefreshable;
	
	Alloy.Globals.loadReloadSearchBooks_display_tableView.hp= true;

	Alloy.Globals.loadReloadSearchBooks_engine(
		$.navBar.getView('searchbutton'),
		$.modal_search_close,
		$.modal_search,
		$.the_search_field,
		$.the_table_view,
		"list_cell_book",
		false,
		false
	);
	
});

var args                                                 			= arguments[0] || {};
var passedData                                   			= args.passedData;
var tableView_by_page                         		= 10;

Alloy.Globals.Logs.llog(passedData);

/*********************************** NAVIGATION BAR MANIPULATION *****************************************/

$.navBar.getView('navBarText').text  			= 'SWAPBOOK';
$.navBar.getView('menubutton').visible  	= true;
$.navBar.getView('backbutton').visible   	= false;
$.navBar.getView('backbutton').bcase  		= null;

$.navBar.getView('buybutton').bcase    		= null;
$.navBar.getView('sellbutton').bcase    		= 'goto_sell_page';

$.tabBar.getView('button2').bcase     		= 'on_home_page';

/*********************************** SLIDE MENU EVENTS ****************************************/

Alloy.Globals.sideMenu                          		= $.SlideMenu;
    
$.main.addEventListener("swipe", function(_event) {
    
    if(_event.direction == "right") {
        
        Alloy.Globals.openMenu();
        Alloy.Globals.menuOpened            		= true;
        
    } 
    else if(_event.direction == "left") {
        
        Alloy.Globals.closeMenu();
        Alloy.Globals.menuOpened       			= false;
        
    }
    
});

/*********************************** SLIDE MENU CUSTOMIZATION ****************************************/

var user_theme_class 									= Alloy.Globals.THE_USER.user_civilite == 'M' ? 'garcon' : 'fille';
var user_picture1 											= Alloy.Globals.THE_USER.user_photos_url_json.indexOf('{') > -1 ?JSON.parse(Alloy.Globals.THE_USER.user_photos_url_json) : {current: Alloy.Globals.endPoints.defaultUserImage};
var user_picture2 											= Alloy.Globals.THE_USER.user_photos_url_json.indexOf('{') > -1 ?JSON.parse(Alloy.Globals.THE_USER.user_photos_url_json) : {current: '/images/blank.png'};

$.SlideMenu.getView('banner_overlay_'+user_theme_class).visible= true;
$.SlideMenu.getView('banner_uname').text= Alloy.Globals.THE_USER.user_prenom;
$.SlideMenu.getView('banner_img_user').image= user_picture2.current;
$.SlideMenu.getView('banner_img').image= user_picture1.current;

/*********************************** BANNER MANIPULATION *****************************************/

if( typeof Alloy.Globals.THE_USER.son_univ_logo != "undefined" && Alloy.Globals.THE_USER.son_univ_logo != "" ){
	
	var banner_image_ratio 							= 768 / 233; 														
	var new_banner_height 							= Ti.Platform.displayCaps.platformWidth / banner_image_ratio;
	
    $.banner_img.image                      			=  Alloy.Globals.THE_USER.son_univ_logo; // LA BANNER UPLOADEE EN ADMIN DOIT FAIRE 768x233 //
    
	if(!Alloy.Globals.iPhoneShortWidth){																					
		$.banner_img.width 								= Ti.Platform.displayCaps.platformWidth;
		$.banner_img.height 							= new_banner_height;
	}
	
}
else{
	
	var banner_image_ratio 							= 554 / 174; 														
	var new_banner_height 							= Ti.Platform.displayCaps.platformWidth / banner_image_ratio;
    
	if(!Alloy.Globals.iPhoneShortWidth){																					
		$.banner_img.width 								= Ti.Platform.displayCaps.platformWidth;
		$.banner_img.height 							= new_banner_height;
	}
	
}

if( typeof Alloy.Globals.THE_USER.son_univ_nom != "undefined" && Alloy.Globals.THE_USER.son_univ_nom != "" )
    $.banner_title.text                                     =  Alloy.Globals.THE_USER.son_univ_nom;
    
if( typeof Alloy.Globals.THE_USER.son_univ_cursus != "undefined" && Alloy.Globals.THE_USER.son_univ_cursus != "" )
    $.banner_subtitle.text                              =  Alloy.Globals.THE_USER.son_univ_cursus;

/*********************************** HEIGHT ADJUSTMENTS ****************************************/

Alloy.Globals.tableViewHeight                   = ( Ti.Platform.displayCaps.platformHeight - 82 ) - 60;
$.the_table_view.height                    			= Alloy.Globals.tableViewHeight+2;
$.the_table_view.hp                                 		= true;

if(OS_ANDROID){
    
    Alloy.Globals.tableViewHeight               = ( Alloy.Globals.SCREEN_HEIGHT - 188 ) - 60;
    $.the_table_view.height                             = Alloy.Globals.tableViewHeight - 138;
    
}

/*********************************** TABLE VIEW INIT ****************************************/

Alloy.Globals.loadReloadSearchBooks_API_endpoint                    	= Alloy.Globals.endPoints.homepageBooksGet;
Alloy.Globals.loadReloadSearchBooks_display_rows                    	= "list_cell_book";
Alloy.Globals.loadReloadSearchBooks_fetch_Collection       			= $.salesRefreshable;
Alloy.Globals.loadReloadSearchBooks_display_tableView           	= $.the_table_view;
Alloy.Globals.loadReloadSearchBooks_display_scrollLimit             = 10;

$.infinitingWIDGET.init(Alloy.Globals.loadReloadSearchBooks_display_tableView);

Alloy.Globals.loadReloadSearchBooks_igniter();