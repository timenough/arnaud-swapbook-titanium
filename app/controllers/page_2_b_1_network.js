/*********************************** OPEN ****************************************/

Alloy.Globals.navigationWindow 				= $.window;
Alloy.Globals.toCloseWindows['networkpage']= $.window;

var remember_Dialog 									= $.navBar.getView('AlertDialog');
Alloy.Globals.Dialog 										= remember_Dialog;

/*********************************** FOCUS ****************************************/

$.window.addEventListener("focus",function(e) {
	
	Alloy.Globals.toCloseWindows['networkpage']= $.window;

	Alloy.Globals.Dialog 									= remember_Dialog;
		
	Alloy.Globals.LEFTbottom_badge			= $.tabBar.getView('button1badge');
	Alloy.Globals.RIGHTbottom_badge			= $.tabBar.getView('button3badge');
	
	if( Alloy.Globals.Network_tableView_MODE == 'RESEAU'){
		
		$.the_list_view_1.visible 						= false;
		$.the_list_view_1.height 						= 0;
		$.the_list_view_2.visible 						= true;
		$.find.height 											= 0;
		
	}
	
});

var args 															= arguments[0] || {};
var passedData 											= args.passedData;
var some_errors 											= false;
var listView_by_page 									= 4;
var user_questionnaire_2 								= Ti.App.Properties.getString('user_and_questionnaire_2');
var user_questionnaire_3 								= Ti.App.Properties.getString('user_and_questionnaire_3');

Alloy.Globals.Logs.llog(passedData);

Alloy.Globals.Network_tableView_MODE							= 'DECOUVERTE';
Alloy.Globals.gotoDecouverte_available_outside				= $.gotoDecouverte;
Alloy.Globals.gotoReseau_available_outside						= $.gotoReseau;

/*********************************** NAVIGATION BAR MANIPULATION *****************************************/

$.navBar.getView('navBarText').text			= 'SWAPBOOK';

$.tabBar.getView('button2').bcase 			= 'on_network_page';

/*********************************** HEIGHT ADJUSTMENTS ****************************************/

Alloy.Globals.tableViewHeight					= ( Ti.Platform.displayCaps.platformHeight - 82 ) - 168;
Alloy.Globals.tableViewHeight2					= ( Ti.Platform.displayCaps.platformHeight - 82 ) - 96;
$.the_list_view_1.height 								= Alloy.Globals.tableViewHeight;
$.the_list_view_2.height 								= Alloy.Globals.tableViewHeight2;
if(OS_ANDROID){

}
$.the_list_view_1.is_visible 							= false;
$.the_list_view_2.is_visible 							= false;
$.the_list_view_1.remember_height 			= $.the_list_view_1.height;
$.the_list_view_2.remember_height 			= $.the_list_view_2.height;

/*********************************** LIST VIEWS INIT ****************************************/

var tableView_data 										= [];
var page2UsersScrolls 								= 1;
var page2UsersScrollsDONE 						= false;
var page2UsersCollection 							= $.usersRefreshable;
var page2FriendsCollection 						= $.friendsRefreshable;

$.infinitingWIDGET.init($.the_list_view_1);

Alloy.Globals.loadReloadUsers(false,true,$.main,$.the_list_view_1,Alloy.Globals.tableView_datas_friends,page2UsersCollection,listView_by_page,Alloy.Globals.THE_USER.id_user,$.empty,$.gotoDecouverte,page2UsersScrolls,page2UsersScrollsDONE);
Alloy.Globals.loadReloadFriendships(false,true,$.main,$.the_list_view_2,Alloy.Globals.tableView_datas_friends,page2FriendsCollection,listView_by_page,Alloy.Globals.THE_USER.id_user,$.empty,$.gotoReseau);
	
/*********************************** INFINITE SCROLL ****************************************/

function localInfiniter(e) {
	
	page2UsersScrolls++;
	
	page2UsersCollection.fetch({
        urlparams: {
            show_me_the_page: 						page2UsersScrolls,
            by_page: 											listView_by_page,
	        the_user: 											Alloy.Globals.THE_USER.id_user,
        },
        add: 														true,
        silent: 														true,
        returnExactServerResponse: 				true,
		localOnly: 												false,
	    parentNode: 											function (loaded_data, options) {
		    
		    if(!loaded_data)return;
		    if(typeof loaded_data == 'undefined')return;
		    if(loaded_data == '' || loaded_data == null)return;
            
	    	/////Alloy.Globals.Logs.llog('---------------- SCROLL + JSON DISTANT (Users) ----------------');
	    	/////Alloy.Globals.Logs.llog(loaded_data['output-array']);
	    	
	    	var page_before								= parseInt(loaded_data['output-page-before']);
	    	var page_last 									= parseInt(loaded_data['output-page-last']);
    	
	    	if( page_before == page_last-1 || (page_before == 1 && page_before == page_last) ){
	    		
        		e.done();
        		
        		if(!page2UsersScrollsDONE){
	    		
					Alloy.Globals.PREpopulateUsers(loaded_data['output-array'],true,$.main,$.the_list_view_1,$.empty,$.gotoDecouverte);
					Alloy.Globals.populateUsersOrFriends(loaded_data['output-array'],'DECOUVERTE',true,$.main,$.the_list_view_1,page2UsersScrolls);
	        		page2UsersScrollsDONE			= true;
	        		
				}
        		
			}
	    	else{
	    		
				Alloy.Globals.PREpopulateUsers(loaded_data['output-array'],true,$.main,$.the_list_view_1,$.empty,$.gotoDecouverte);
				Alloy.Globals.populateUsersOrFriends(loaded_data['output-array'],'DECOUVERTE',true,$.main,$.the_list_view_1,page2UsersScrolls);
        		e.success();
        		
			}

		}
    });
    
};

/*********************************** PULL TO REFRESH ****************************************/

function localRefresher(e) {
	
	rows_datas 												= [];

	page2FriendsCollection.fetch({
        urlparams : {
            show_me_the_page: 						1,
            by_page: 											listView_by_page,
	        the_user: 											Alloy.Globals.THE_USER.id_user,
        },
        add: 														false,
        silent : 													true,
        returnExactServerResponse: 				true,
		localOnly: 												false,
	    parentNode: 											function (loaded_data, options) {
		    
		    if(!loaded_data)return;
		    if(typeof loaded_data == 'undefined')return;
		    if(loaded_data == '' || loaded_data == null)return;
	    	
	    	////////Alloy.Globals.Logs.llog('---------------- SCROLL + JSON DISTANT (Friends) ----------------');
	    	
			e.hide();
			
			Alloy.Globals.PREpopulateFriendships(loaded_data['output-array'],true,$.main,$.the_list_view_2,$.empty,$.gotoReseau);
			Alloy.Globals.populateUsersOrFriends(loaded_data['output-array'],'RESEAU',true,$.main,$.the_list_view_2,null);
			
        },
        success: 												e.hide(),
        error: 														e.hide
	});
			
};

/*********************************** TABBAR BUTTON CLICK ****************************************/

$.gotoDecouverte.addEventListener("click", function(e) {
		
	Alloy.Globals.Dialog 									= remember_Dialog;

	Alloy.Globals.Logs.llog('>>>> gotoDecouverte CLICK <<<<');
	
	Alloy.Globals.preventDoubleClick(this);
	
	//////////// GOOGLE ANALYTICS 
	
	Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
		category: 												"App. social behaviours",
		label: 														"See other users of the network",
		action: 													"want to see unknown users",
		value: 														1
	});
	
	$.the_list_view_1.visible 							= true;
	$.the_list_view_1.force_regenerate 		= Alloy.Globals.Network_tableView_MODE == 'DECOUVERTE' ? false : true;
	page2UsersScrolls 									= Alloy.Globals.Network_tableView_MODE == 'DECOUVERTE' ? page2UsersScrolls : 1;
	page2UsersScrollsDONE 						= Alloy.Globals.Network_tableView_MODE == 'DECOUVERTE' ? page2UsersScrollsDONE : false;
	$.the_list_view_2.visible 							= false;
	$.find.height 												= 70;

	
	Alloy.Globals.Network_tableView_MODE= 'DECOUVERTE';
	
	Alloy.Globals.loadReloadUsers(false,true,$.main,$.the_list_view_1,Alloy.Globals.tableView_datas_users,page2UsersCollection,listView_by_page,Alloy.Globals.THE_USER.id_user,$.empty,$.gotoDecouverte,page2UsersScrolls,page2UsersScrollsDONE);
	
	$.addClass($.gotoDecouverte,'selected');
	$.removeClass($.gotoReseau,'selected');

});		

if(typeof passedData != 'undefined' && passedData.tab2){
	
	setTimeout(function(){
		$.gotoReseau.fireEvent('click');
	},1000);
	
}

$.gotoReseau.addEventListener("click", function(e) {
		
	Alloy.Globals.Dialog 									= remember_Dialog;
	
	Alloy.Globals.Logs.llog('>>>> gotoReseau CLICK <<<<');
		
	Alloy.Globals.preventDoubleClick(this);
	
	//////////// GOOGLE ANALYTICS 
	
	Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
		category: 												"App. social behaviours",
		label: 														"See user friends in the network",
		action: 													"want to see network friends",
		value: 														1
	});
	
	$.the_list_view_1.visible 							= false;
	$.the_list_view_1.force_regenerate 		= true;
	$.the_list_view_1.height 							= 0;
	$.the_list_view_2.visible 							= true;
	$.find.height 												= 0;

	Alloy.Globals.Network_tableView_MODE= 'RESEAU';
	
	Alloy.Globals.loadReloadFriendships(false,true,$.main,$.the_list_view_2,Alloy.Globals.tableView_datas_friends,page2FriendsCollection,listView_by_page,Alloy.Globals.THE_USER.id_user,$.empty,$.gotoReseau);

	$.addClass($.gotoReseau,'selected');
	$.removeClass($.gotoDecouverte,'selected');
	
});

/*********************************** ON PAGE LOAD ****************************************/

function localQuestionnairesCheck(){

	/* ******************************************** */
	/* ********* AJAX API QUERY (FAST WAY) ******** */
	/* ******************************************** */
	Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		Alloy.Globals.endPoints.questionsCheck,
		{
	        the_user: 											Alloy.Globals.THE_USER.id_user
		},
		{
			async_params: 				{},
			async_execution: 			function(JSON_returned,async_params_back){			
				if(typeof JSON_returned['error'] !== 'undefined'){
					
					Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);
					
				}
				else{
					
					///////////////
					Alloy.Globals.Logs.llog('---------------- QUESTIONNAIRES CHECKED ----------------');
					///////////////
					Alloy.Globals.Logs.llog(JSON_returned);
					
					if(typeof(JSON_returned['output-array']) == 'undefined')return;
					
					/*************** CAS 1 : N'A PAS ENCORE REPONDU AU QUESTIONNAIRE "DEVIENS PARRAIN" *************/
					
					if(
						JSON_returned['output-size'] == 0 ||
						typeof JSON_returned['output-array']['q2'] == 'undefined'
					){
						
						if( user_questionnaire_2 != 'no' )Alloy.Globals.Logs.aalert(
							'DÉVELOPPE TON RÉSEAU',
							'Découvres d\'autres étudiants, pose leur des questions, trouves un parrain et développes ton réseau',
							null,
							'J\'AI COMPRIS',
							function(object_received){
								
								setTimeout(function(){
									
									Alloy.Globals.Logs.aalert(
										'DEVIENS PARRAIN',
										'Deviens le parrain d\'un étudiant ou d\'une étudiante, tu seras récompensé(s)',
										null,
										'JE REFUSE',
										function(object_received){
											
											Ti.App.Properties.setString('user_and_questionnaire_2','no');
											Alloy.Globals.Logs.aalert_close();
			
										},
										'J\'ACCEPTE',
										function(object_received){
											
											//////////// GOOGLE ANALYTICS 
											
											Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
												category: 												"App. social behaviours",
												label: 														"Answser to an internal survey",
												action: 													"accept survey 2 participation",
												value: 														1
											});
											
											Ti.App.Properties.setString('user_and_questionnaire_2','yes');
											Alloy.Globals.Logs.aalert_close();
											
											Alloy.Globals.app.goToFAST("page_3_f_1_user_questions",
												{
													question_family: 			2, 
													questions_title: 				'DEVIENS PARRAIN',
													questions_header: 		'Remplis ce court questionnaire anonyme pour qu\'on puisse te matcher plus tard avec le filleul idéal'
												}
											);
			
										},
										{},
										false
									);
									
								},500);

							},
							null,
							null,
							{},
							false
						);
						
					}
					
					/*************** CAS 2 : N'A PAS ENCORE REPONDU AU QUESTIONNAIRE "TROUVES UN PARRAIN" *************/
						
					if(
						JSON_returned['output-size'] == 0 ||
						typeof JSON_returned['output-array']['q3'] == 'undefined'
					){
						
						$.FindGodFather.addEventListener("click", function(e) {
							
							Alloy.Globals.preventDoubleClick(this);
							
							if(this.backgroundColor == 'silver')return;
								
							Alloy.Globals.Dialog 						= $.navBar.getView('AlertDialog');
								
							Alloy.Globals.Logs.aalert(
								'TROUVES UN PARRAIN',
								'Trouves quelqu\'un qui pourra t\'accompagner durant ton année et qui pourra répondre à tes questions !',
								null,
								'ANNULER',
								function(object_received){
									
									Ti.App.Properties.setString('user_and_questionnaire_3','no');
									Alloy.Globals.Logs.aalert_close();
	
								},
								'CONFIRMER',
								function(object_received){
									
									//////////// GOOGLE ANALYTICS 
									
									Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
										category: 												"App. social behaviours",
										label: 														"Answser to an internal survey",
										action: 													"accept survey 3 participation",
										value: 														1
									});
									
									Ti.App.Properties.setString('user_and_questionnaire_3','yes');
									Alloy.Globals.Logs.aalert_close();
									
									Alloy.Globals.app.goToFAST("page_3_f_1_user_questions",
										{
											question_family: 			3, 
											questions_title: 				'TROUVES UN PARRAIN',
											questions_header: 		'Remplis ce court questionnaire anonyme pour qu\'on puisse te matcher avec le parrain idéal'
										}
									);
								},
								{},
								false
							);
							
						});
	
					}
					else{
						
						$.FindGodFather.backgroundColor= 'silver';
						
					}
					
				}
				
			}
			
		},
		false,
		true 
	);
	
};

localQuestionnairesCheck();