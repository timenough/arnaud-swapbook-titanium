/*********************************** OPEN ****************************************/

Alloy.Globals.navigationWindow 				= $.window;
Alloy.Globals.toCloseWindows['on_profile_page']= $.window;
	
	////////////
	//////////// SEARCH ENGINE MODIFIED FOR PATHWAYS
	////////////
	
	Alloy.Globals.deep_referenced_items_for_a_later_control['modal_search_on_profile_page']				= $.modal_search;
	Alloy.Globals.deep_referenced_items_for_a_later_control['modal_searchfield_on_profile_page']		= $.the_search_field;
	Alloy.Globals.deep_referenced_items_for_a_later_control['topbar_on_profile_page']							= $.searchbarhelp;
	Alloy.Globals.deep_referenced_items_for_a_later_control['bar_line1_on_profile_page']						= $.searchBarHelpLine1;
	Alloy.Globals.deep_referenced_items_for_a_later_control['bar_line2_on_profile_page']						= $.searchBarHelpLine2;
	
	var the_search_tableView 						= Ti.UI.createTableView(Alloy.Globals.loadReloadSearchPathways_tableView);
	
	Alloy.Globals.loadReloadSearchBooks_display_tableView 																		= the_search_tableView;
	Alloy.Globals.loadReloadSearchBooks_display_tableView.custom_handler 											= function(e){
		
		Alloy.Globals.loadReloadSearchBooks_use_custom_results_array 														= false;
		delete Alloy.Globals.loadReloadSearchBooks_API_endpoint_params.local_search;
		
		Alloy.Globals.preventDoubleClick(this);
		
		var retrieveDATAS 								= this.hiddenArray[e.index];
		
		//////////////////////// LOCAL DATAS PARSING
		
		if(this.inherited_object.id === 'userParcoursRetenu'){
			
			this.inherited_object.value 				= retrieveDATAS.book_title;
			this.inherited_object.cvalue 			= retrieveDATAS.book_key;
			Alloy.Globals.deep_referenced_items_for_a_later_control['modal_searchfield_on_profile_page'].setValue('');
			Alloy.Globals.deep_referenced_items_for_a_later_control['modal_searchfield_on_profile_page'].blur();
			$.modal_search_close.fireEvent('click');
			return;
			
		}
		
		//////////////////////// REMOTE DATAS PARSING
		
		var the_c_value 										= retrieveDATAS.book_id;
		var the_value 										= retrieveDATAS.book_title;
		
		//////////////////////// REMOTE DATAS CONSEQUENCES > ON ITEM
		
		Alloy.Globals.deep_referenced_items_for_a_later_control['path_'+this.inherited_object.kparent+'_popinField_'+this.inherited_object.jparent].value= the_value;
		Alloy.Globals.deep_referenced_items_for_a_later_control['path_'+this.inherited_object.kparent+'_popinField_'+this.inherited_object.jparent].cvalue= the_c_value;
		
		//////////////////////// REMOTE DATAS CONSEQUENCES > ON ITEM SUB-SELECTS
		
		if( this.inherited_object.jparent == 'fieldFour' ){
			Alloy.Globals.pathway_CURRENT_ID_UNIVERSITE= the_c_value;
			Alloy.Globals.deep_referenced_items_for_a_later_control['path_'+this.inherited_object.kparent+'_popinField_fieldFive'].value= '';
			Alloy.Globals.deep_referenced_items_for_a_later_control['path_'+this.inherited_object.kparent+'_popinField_fieldFive'].cvalue= -1;
			Alloy.Globals.deep_referenced_items_for_a_later_control['path_'+this.inherited_object.kparent+'_popinField_fieldFive'].touchEnabled= true;
			Alloy.Globals.deep_referenced_items_for_a_later_control['path_'+this.inherited_object.kparent+'_popinField_fieldFive'].selectBigLineTwo= 'proposé à '+the_value+' :';
			Alloy.Globals.deep_referenced_items_for_a_later_control['path_'+this.inherited_object.kparent+'_popinField_fieldSix'].value= '';
			Alloy.Globals.deep_referenced_items_for_a_later_control['path_'+this.inherited_object.kparent+'_popinField_fieldSix'].cvalue= -1;
			Alloy.Globals.deep_referenced_items_for_a_later_control['path_'+this.inherited_object.kparent+'_popinField_fieldSix'].touchEnabled= false;
			Alloy.Globals.deep_referenced_items_for_a_later_control['path_'+this.inherited_object.kparent+'_popinField_fieldEleven'].value= '';
			Alloy.Globals.deep_referenced_items_for_a_later_control['path_'+this.inherited_object.kparent+'_popinField_fieldEleven'].cvalue= -1;
			Alloy.Globals.deep_referenced_items_for_a_later_control['path_'+this.inherited_object.kparent+'_popinField_fieldEleven'].touchEnabled= false;
		}
		else if( this.inherited_object.jparent == 'fieldFive' ){
			Alloy.Globals.pathway_CURRENT_ID_DIPLOME= the_c_value;
			Alloy.Globals.deep_referenced_items_for_a_later_control['path_'+this.inherited_object.kparent+'_popinField_fieldSix'].value= '';
			Alloy.Globals.deep_referenced_items_for_a_later_control['path_'+this.inherited_object.kparent+'_popinField_fieldSix'].cvalue= -1;
			Alloy.Globals.deep_referenced_items_for_a_later_control['path_'+this.inherited_object.kparent+'_popinField_fieldSix'].touchEnabled= true;
			Alloy.Globals.deep_referenced_items_for_a_later_control['path_'+this.inherited_object.kparent+'_popinField_fieldSix'].selectBigLineTwo= 'pour le diplôme '+the_value+' :';
			Alloy.Globals.deep_referenced_items_for_a_later_control['path_'+this.inherited_object.kparent+'_popinField_fieldEleven'].value= '';
			Alloy.Globals.deep_referenced_items_for_a_later_control['path_'+this.inherited_object.kparent+'_popinField_fieldEleven'].cvalue= -1;
			Alloy.Globals.deep_referenced_items_for_a_later_control['path_'+this.inherited_object.kparent+'_popinField_fieldEleven'].touchEnabled= false;
		}
		else if( this.inherited_object.jparent == 'fieldSix' ){
			Alloy.Globals.pathway_CURRENT_ID_FORMATION= the_c_value;
			Alloy.Globals.deep_referenced_items_for_a_later_control['path_'+this.inherited_object.kparent+'_popinField_fieldEleven'].value= '';
			Alloy.Globals.deep_referenced_items_for_a_later_control['path_'+this.inherited_object.kparent+'_popinField_fieldEleven'].cvalue= -1;
			Alloy.Globals.deep_referenced_items_for_a_later_control['path_'+this.inherited_object.kparent+'_popinField_fieldEleven'].touchEnabled= true;
			Alloy.Globals.deep_referenced_items_for_a_later_control['path_'+this.inherited_object.kparent+'_popinField_fieldEleven'].selectBigLineTwo= 'pour le parcours '+the_value+' :';
		}
		else if( this.inherited_object.jparent == 'fieldEleven' ){
			Alloy.Globals.pathway_CURRENT_ID_PARCOURS= the_c_value;
		}
		
		/////////////////////// SEARCH ENGINE HIDING
		
		Alloy.Globals.deep_referenced_items_for_a_later_control['modal_searchfield_on_profile_page'].setValue('');
		Alloy.Globals.deep_referenced_items_for_a_later_control['modal_searchfield_on_profile_page'].blur();
		$.modal_search_close.fireEvent('click');
		
	};
	
/*********************************** CLOSE ****************************************/

$.window.addEventListener("close",function(e) {
	
	delete Alloy.Globals.toCloseWindows['on_profile_page'];
	
});

/*********************************** FOCUS ****************************************/

$.window.addEventListener("focus",function(e) {
	
	Alloy.Globals.toCloseWindows['on_onesale_page']= $.window;

	Alloy.Globals.Dialog 									= $.navBar.getView('AlertDialog');
		
	Alloy.Globals.LEFTbottom_badge			= $.tabBar.getView('button1badge');
	Alloy.Globals.RIGHTbottom_badge			= $.tabBar.getView('button3badge');
	    
				
	/********************* TABLE VIEW SEARCH INIT *********************/
	
	$.window.add(the_search_tableView);

	Alloy.Globals.loadReloadSearchBooks_engine(
		null,
		$.modal_search_close,
		Alloy.Globals.deep_referenced_items_for_a_later_control['modal_search_on_profile_page'],
		Alloy.Globals.deep_referenced_items_for_a_later_control['modal_searchfield_on_profile_page'],
		the_search_tableView,
		"list_cell_pathway",
		false,
		false,
		Alloy.createCollection('Pathways')
	);
	
});

var args 															= arguments[0] || {};
var passedData 											= args.passedData; //////////passedData.id_user = 2;passedData.edition = true;Alloy.Globals.THE_USER.id_user = 2;

var MODIFICATION_CASE 							= (typeof passedData != 'undefined' && passedData.edition) ? true : false;
var FRIENDSHIP_CASE 								= false;
var FRIENDS_CASE 										= false;
var MENTORING_CASE 								= false;
var SAME_USER_CASE 								= false;
var THE_VIEWED_USER 								= {};

//////////// PATHWAYS

var pathways 												= {};
var pathways_items_DATA 							= [];
var pathways_first_select							= {};
var pathways_first_select_types					= {};
var pathways_months									= {};
var pathways_array_loop_PRO 					= ['One','Seven','Eight','Nine','Ten','Two','Three'];
var pathways_array_loop_SCO 					= ['One','Four','Five','Six','Eleven','Two','Three'];
var pathways_default_form_type 				= 'pro';
var basePathwaysDecalage 						= 90;

Alloy.Globals.user_profile_new_items_counter= 0;

//////////// TAGS

var available_tag_fields 								= {};
var baseTagsNumber									= 3;
var baseTagsDecalage 								= 60;
var containerA_children 								= $.Container_A.children.slice(0);
available_tag_fields['tag1'] 							= containerA_children[0];
var containerB_children 								= $.Container_B.children.slice(0);
available_tag_fields['tag2'] 							= containerB_children[0];

//////////// SEARCH FILTERS

Alloy.Globals.pathway_CURRENT_ID_UNIVERSITE		= '';
Alloy.Globals.pathway_CURRENT_ID_DIPLOME			= '';
Alloy.Globals.pathway_CURRENT_ID_FORMATION		= '';
Alloy.Globals.pathway_CURRENT_ID_PARCOURS 		= '';

Alloy.Globals.Logs.llog(passedData);

/*********************************** NAVIGATION BAR MANIPULATION *****************************************/

$.navBar.getView('navBarText').text			= 'PROFIL UTILISATEUR';
$.tabBar.getView('button2').bcase 			= 'on_profile_page';

/*********************************** HEIGHT ADJUSTMENTS ****************************************/

$.banner_img.top 											= (320 - Ti.Platform.displayCaps.platformWidth) / 2;
var tableViewHeight										= Ti.Platform.displayCaps.platformHeight - 60;
$.the_scroll_view.height 								= tableViewHeight+2;
$.the_scroll_view.dheight 							= tableViewHeight+2;

if(OS_ANDROID){
	Alloy.Globals.tableViewHeight				= Alloy.Globals.SCREEN_HEIGHT - 120;
	$.the_scroll_view.height 							= tableViewHeight;
	$.the_scroll_view.dheight 						= tableViewHeight;
}

/*********************************** LOAD THE USER ****************************************/

Alloy.Globals.loadRefreshUSER 					= function(){
	
	if(THE_VIEWED_USER.user_pathways_TO_DELETE)THE_VIEWED_USER.user_pathways_TO_DELETE= [];
	if(THE_VIEWED_USER.user_pathways_CHANGES)THE_VIEWED_USER.user_pathways_CHANGES= {};
	
	/* ******************************************** */
	/* ********* AJAX API QUERY (FAST WAY) ******** */
	/* ******************************************** */
	Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		Alloy.Globals.endPoints.getUserAccount,
		{
			id_user: 											passedData.id_user,
			id_user_viewer: 								Alloy.Globals.THE_USER.id_user,
		},
		{
			async_params: 				{},
			async_execution: 			function(JSON_returned,async_params_back){	
						
				if(typeof JSON_returned['error'] !== 'undefined'){
					
					Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);
					
					setTimeout(function(){
						Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['on_profile_page']);
					},2000);
					
				}
				else{
					
					///////////////Alloy.Globals.Logs.llog('---------------- USER RETRIEVED ----------------');
					///////////////Alloy.Globals.Logs.llog(JSON_returned);
					
					if(typeof(JSON_returned['output-array']) == 'undefined')return;
					
					/////////////
					///////////// MERGE IN EXISTING USER OBJECT
					/////////////
					
					for (var attribute in JSON_returned['output-array']) { 
						THE_VIEWED_USER[attribute] 				= JSON_returned['output-array'][attribute]; 
					}
					
					/////////////
					///////////// IF USER ACCOUNT SUSPENDED / BLACKLISTED
					/////////////
					
					if( THE_VIEWED_USER.user_status === 'suspended' || THE_VIEWED_USER.user_status === 'blacklisted')
						Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['on_profile_page']);
					
					/////////////
					///////////// DEFINITION DE LA RELATION user / viewer
					/////////////
					
					SAME_USER_CASE 										= THE_VIEWED_USER.id_user === Alloy.Globals.THE_USER.id_user ? true : false;
					FRIENDSHIP_CASE 										= THE_VIEWED_USER.user_status_friends != null && THE_VIEWED_USER.user_status_friends.friendship_status && THE_VIEWED_USER.user_status_friends.friendship_status === 'living' ? true : false;
					MENTORING_CASE 										= THE_VIEWED_USER.user_status_mentoring != null && THE_VIEWED_USER.user_status_mentoring.mentoring_status && THE_VIEWED_USER.user_status_mentoring.mentoring_status === 'living' ? true : false;
					FRIENDS_CASE 												= FRIENDSHIP_CASE == true || MENTORING_CASE == true ? true : false;
					
					/////////////
					///////////// DEFINITION DE LA BANNIERE
					/////////////
					
					var user_theme_class 									= THE_VIEWED_USER.user_civilite == 'M' ? 'garcon' : 'fille';
					var user_theme_color									= THE_VIEWED_USER.user_civilite == 'M' ? Alloy.Globals.BLUE_COLOR : '#e893b6';
					var user_picture 											= THE_VIEWED_USER.user_photos_url_json.indexOf('{') > -1 ?JSON.parse(THE_VIEWED_USER.user_photos_url_json) : {current: Alloy.Globals.endPoints.defaultUserImage};
					
					$.banner_uname.text 									= THE_VIEWED_USER.user_prenom;
					$.banner_img_user.image 							= user_picture.current;
					$.banner_img.image 									= user_picture.current;
					
					$.banner_ucurrent.text 									= THE_VIEWED_USER.son_univ_nom;
					$.banner_upath.text 										= THE_VIEWED_USER.son_univ_cursus+' '+THE_VIEWED_USER.son_univ_cursus_suite;
						
					$.addClass($.banner_overlay,user_theme_class);
					
					/////////////
					/////////////  REMPLISSAGE DES CHAMPS
					/////////////
					
					var mutual_friends										= (parseInt(THE_VIEWED_USER.user_mutual_friends) == 0) ? 'Aucun ami en commun' : THE_VIEWED_USER.user_mutual_friends+' amis en commun';
					mutual_friends 												= (parseInt(THE_VIEWED_USER.user_mutual_friends) == 1) ? '1 ami en commun' : mutual_friends;
					$.TotalMutalFriends.text 								= SAME_USER_CASE ? 'La mise à jour se fera en bas de page.' : mutual_friends;
					$.TotalMutalFriends.width 							= SAME_USER_CASE ? '100%' : Ti.UI.SIZE;
					$.TotalMutalFriendsCont.width 					= SAME_USER_CASE ? '100%' : 198;
					$.TotalMutalFriendsPicto.width 					= SAME_USER_CASE ? 0 : 26;
		
					$.userPseudo.value 										= THE_VIEWED_USER.user_pseudo;
					$.userPseudo.cvalue 									= THE_VIEWED_USER.user_pseudo;
					$.userEmail.value 											= THE_VIEWED_USER.user_email;
					$.userEmail.cvalue 										= THE_VIEWED_USER.user_email;
					$.userPass.value 											= THE_VIEWED_USER.user_password;
					$.userPass.cvalue 										= THE_VIEWED_USER.user_password;
					$.userPhone.value 										= THE_VIEWED_USER.user_tel_portable;
					$.userPhone.cvalue 										= THE_VIEWED_USER.user_tel_portable;
					$.userNom.value 											= THE_VIEWED_USER.user_nom;
					$.userNom.cvalue 											= THE_VIEWED_USER.user_nom;
					$.userPrenom.value 										= THE_VIEWED_USER.user_prenom;
					$.userPrenom.cvalue 									= THE_VIEWED_USER.user_prenom;
					$.userAdresse.value 										= THE_VIEWED_USER.adresses.length == 1 ? THE_VIEWED_USER.adresses[0].address_field5: '';
					$.userAdresse.cvalue 									= THE_VIEWED_USER.adresses.length == 1 ? THE_VIEWED_USER.adresses[0].address_field5: '';
					$.userCP.value												= THE_VIEWED_USER.adresses.length == 1 ? THE_VIEWED_USER.adresses[0].address_field2 : '';
					$.userCP.cvalue												= THE_VIEWED_USER.adresses.length == 1 ? THE_VIEWED_USER.adresses[0].address_field2 : '';
					$.userVille.value 											= THE_VIEWED_USER.adresses.length == 1 ? THE_VIEWED_USER.adresses[0].address_field3 : '';
					$.userVille.cvalue 											= THE_VIEWED_USER.adresses.length == 1 ? THE_VIEWED_USER.adresses[0].address_field3 : '';
					$.userPays.value 											= THE_VIEWED_USER.user_pays_residence;
					$.userPays.cvalue 										= THE_VIEWED_USER.user_pays_residence;
					$.userID.value 												= THE_VIEWED_USER.user_num_national;
					$.userID.cvalue 												= THE_VIEWED_USER.user_num_national;
							
					$.userCivilite.cvalue 										= THE_VIEWED_USER.user_civilite;
					$.userCivilite.value 										= THE_VIEWED_USER.user_civilite_select_corresp[THE_VIEWED_USER.user_civilite];
					$.userCivilite.selectSHORTKeys 					= THE_VIEWED_USER.user_civilite_select_values;
					$.userCivilite.selectSHORTVals					= THE_VIEWED_USER.user_civilite_select_keys;
					$.userCivilite.onSelect 									= "Alloy.Globals.user_profile_retrieve_local_select_values";
					
					$.userDateNaissance.touchEnabled 			= true;
					$.userDateNaissance.selectCase 				= 'edition';
					$.userDateNaissance.value 							= THE_VIEWED_USER.user_date_naissance_shown;
					$.userDateNaissance.cvalue						= THE_VIEWED_USER.user_date_naissance;
					$.userDateNaissance.onSelect 					= "Alloy.Globals.user_profile_retrieve_local_select_values";
					
					var user_other_infos 										= JSON.parse(THE_VIEWED_USER.user_text_json);
					$.userConseil.value 										= user_other_infos.bio ? user_other_infos.bio : '';
					$.userConseil.cvalue 									= user_other_infos.bio ? user_other_infos.bio : '';
					
					/////////////
					/////////////  LES PATHWAYS (PARCOURS)
					/////////////
					
					var children 													= $.parcoursEdition.children.slice(0);
					$.parcoursContainer.dheight  						= 20;
					for (var i = 0; i < children.length; ++i){$.parcoursEdition.remove(children[i]);}
					for (p=0;p<THE_VIEWED_USER.user_pathways.length;p++){
						add_a_sub_Form(THE_VIEWED_USER.user_pathways[p],false);
					}
					
					if(THE_VIEWED_USER.user_pathways.length < 1)$.parcoursLabl.text= 'Parcours non renseigné';
					else $.parcoursLabl.text 								= SAME_USER_CASE ? 'Votre parcours (CV)' : THE_VIEWED_USER.user_prenom+' : son parcours complet';
					
					/////////////
					/////////////  LES TAGS
					/////////////
					
					var tags  														= THE_VIEWED_USER.user_tags == '' ? [] : THE_VIEWED_USER.user_tags.split(',');  
					var children_tags 											= $.DivTagsContainer.children.slice(0);
					for (var i=0;i<children_tags.length;++i){$.DivTagsContainer.remove(children[i]);}
					$.DivTagsContainer.dheight 						= 0;
					$.DivTagsContainer.height 							= 0;
					
					if(tags.length > 0 || MODIFICATION_CASE){
						
						for (var t=1; t <= tags.length; t++){
							var tag_next 											= typeof tags[t] != 'undefined' ? tags[t] : null;
							if ( t >= 2 && t % 2 == 0 && tag_next != null){
								$.addTags.speed 								= true;
								$.addTags.fireEvent('click');
								continue;
							}
						}
						setTimeout(function(){
							for (var t=1; t <= tags.length; t++){
								var tag_current 									= tags[t-1];
								var tag_current_selector 					= 'tag'+t;
								if(available_tag_fields[tag_current_selector])available_tag_fields[tag_current_selector].setValue(tag_current);
								if(!MODIFICATION_CASE && available_tag_fields[tag_current_selector])available_tag_fields[tag_current_selector].editable= false;
							}
						},500);
						
					}
					else{
						
						$.NoInterests.text 										= 'Aucun centre d\'intérêt pour le moment.';
						$.tagsInitial.height 									= 30;
						
					}
					
					/////////////
					///////////// LES LIVRES EN VENTE
					/////////////
								
					var children 													= $.otherBooks.children.slice(0);
					for (var i = 0; i < children.length; ++i){$.otherBooks.remove(children[i]);}
						
					setTimeout(function(){
						
						if(THE_VIEWED_USER.user_sales.length > 0)for(e = 0; e < THE_VIEWED_USER.user_sales.length; e++){
				
							var OneOtherBookDATAS 					= THE_VIEWED_USER.user_sales[e];
							var OneOtherBook_photo 					= JSON.parse(OneOtherBookDATAS['sale_photo_json']);
							
							var oneOtherBook 									= Ti.UI.createView({
								sale_id: 												OneOtherBookDATAS['sale_id'],
								touchEnabled: 									true
							});
							$.addClass(oneOtherBook,'oneOtherBook');
							if( e == 0 )$.addClass(oneOtherBook,'oneOtherBook-first');
								
								var list_img_obook_container 			= Ti.UI.createView({});
								$.addClass(list_img_obook_container,'list_img_obook_container');
					
									var book_img 								= Ti.UI.createImageView({
										image: 										OneOtherBook_photo.current,
										touchEnabled: 							false,
									});
									$.addClass(book_img,'book_img');
									
								list_img_obook_container.add(book_img);
								
								oneOtherBook.add(list_img_obook_container);
								
								var other_book_price						= Ti.UI.createLabel({
									text: 												Alloy.Globals.tools.number_format(parseFloat(parseFloat(OneOtherBookDATAS['sale_price']).toFixed(2)),2,'.',' ') + '€',
									touchEnabled: 								false
								});
								$.addClass(other_book_price,'other_book_price');
								oneOtherBook.add(other_book_price);
								
								var other_book_state						= Ti.UI.createLabel({
									text: 												OneOtherBookDATAS['sale_state_s'],
									touchEnabled: 								false
								});
								$.addClass(other_book_state,'other_book_state');
								
								oneOtherBook.add(other_book_state);
									
								var buyOtherBookButton 					= Ti.UI.createView({status: 'off'});
								$.addClass(buyOtherBookButton,'buy_other_button');
					
									var buy_other_button_img 			= Ti.UI.createImageView({
										image: 										"/images/cart.png",
										touchEnabled: 							false,
										id: 												'the_cart'
									});
									$.addClass(buy_other_button_img,'buy_other_button_img');
			
									var buy_other_button_img_label = Ti.UI.createLabel({
										text: 											"MODIFIER",
										touchEnabled: 							false
									});
									$.addClass(buy_other_button_img_label,'buy_other_button_img_label');
						
								if(MODIFICATION_CASE){
									buyOtherBookButton.add(buy_other_button_img_label);
								}
								else{
									buyOtherBookButton.add(buy_other_button_img);
								}
								
								oneOtherBook.add(buyOtherBookButton);
								
								oneOtherBook.addEventListener("click", function(e) {
									
									Alloy.Globals.preventDoubleClick(this);
									
									if(MODIFICATION_CASE){
										
										Alloy.Globals.app.goTo("page_1_b_1_vente",{
											tab3: this.sale_id
										});
						
										setTimeout(function(){
											Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['on_profile_page']);
										},500);
										
									}
									else{
										
										Alloy.Globals.app.goTo("page_1_a_3_onesale",{
											the_seller: THE_VIEWED_USER.id_user,
											sale_id: this.sale_id
										});
										
									}
									
								}); 
								
							$.otherBooks.add(oneOtherBook);
							
						}
						else{ 
							$.NoBook.text 										= 'Aucun livre en vente.';
							$.otherBooks.height 							= 0;
						}
						
					},600);
					
					/////////////
					/////////////  AFFICHAGE OU MASQUAGES SELON LE CONTEXTE
					/////////////
					
					/******** 1 = Le bouton en haut à droite ********/
				
					$.banner_go_to_button_picto.user_id 			= THE_VIEWED_USER.id_user;
					$.banner_go_to_button_picto.base_user_id= Alloy.Globals.THE_USER.id_user;
					$.banner_go_to_button_picto.image  			= "/images/"+(FRIENDS_CASE ? 'profileTalk_' : 'profileAdduser_')+user_theme_class+".png";
					$.banner_go_to_button_picto.clicCase  		= FRIENDS_CASE ? 'gotoChat' : 'addUser';
					$.banner_go_to_button_picto.visible  			= SAME_USER_CASE ? false : true;
					
					/******** 2 = Le bouton Modifier mon profil si il est affiché ********/
					
					if(!MODIFICATION_CASE && SAME_USER_CASE){
						$.TotalMutalFriends.color  						= 'gray';
						$.TotalMutalFriends.text  						= 'Modifier mon profil utilisateur';
						$.TotalMutalFriends.addEventListener("click", function(e) {
		   					Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['on_profile_page']);
		   					delete Alloy.Globals.toCloseWindows['on_profile_page'];
		   					setTimeout(function(){
								Alloy.Globals.app.goToFAST("page_3_a_1_user_profile",{
									id_user: Alloy.Globals.THE_USER.id_user, 
									edition: true
								});
		   					},250);
		   				});
					}
					
					/******** 3 = Les bouton Accepter/Refuser demande d'ami ********/

					if(
						THE_VIEWED_USER.user_status_friends != null && 
						THE_VIEWED_USER.user_status_friends.friendship_status && 
						THE_VIEWED_USER.user_status_friends.friendship_between_id_user == Alloy.Globals.THE_USER.id_user &&
						THE_VIEWED_USER.user_status_friends.friendship_and_id_user == THE_VIEWED_USER.id_user &&
						THE_VIEWED_USER.user_status_friends.friendship_status === 'not_accepted'
					){
						
						$.RequestOrNot.text 								= THE_VIEWED_USER.user_prenom+' n\'a pas encore répondu à ta demande d\'ami';
						
						$.friendStatusRow2.height						= 0;
						$.friendStatusRow2.visible						= false;
						
						$.only_in_display_fields.height 				= $.only_in_display_fields.dheight-50;
						$.the_scroll_view_container.height 		= $.the_scroll_view_container.dheight-50;
						$.the_scroll_view_container.dheight 		= $.the_scroll_view_container.height;
						$.only_in_display_fields_separator.visible= 0;
						
					}
					else if(
						THE_VIEWED_USER.user_status_friends != null && 
						THE_VIEWED_USER.user_status_friends.friendship_status && 
						////////THE_VIEWED_USER.user_status_friends.friendship_between_id_user == THE_VIEWED_USER.id_user &&
						THE_VIEWED_USER.user_status_friends.friendship_and_id_user == Alloy.Globals.THE_USER.id_user &&
						THE_VIEWED_USER.user_status_friends.friendship_status === 'not_accepted'
					){
						
						$.friendStatusRow2.visible						= true;
						
						$.RequestOrNot.text 								= THE_VIEWED_USER.user_status_friends.user_prenom+' a demandé à faire partie de ton réseau :';
						
						$.banner_go_to_button_picto.visible 		= false;
						$.AcceptRequest.user_name 					= THE_VIEWED_USER.user_status_friends.user_name;
						$.AcceptRequest.relation_id 					= THE_VIEWED_USER.user_status_friends.id_friendship;
						$.AcceptRequest.relation_case 				= 'friendship';
						$.AcceptRequest.request_id_u 				= THE_VIEWED_USER.user_status_friends.friendship_between_id_user;
						$.DeclineRequest.user_name 					= THE_VIEWED_USER.user_status_friends.user_name;
						$.DeclineRequest.relation_id 					= THE_VIEWED_USER.user_status_friends.id_friendship;
						$.DeclineRequest.relation_case 				= 'friendship';
						$.DeclineRequest.request_id_u 				= THE_VIEWED_USER.user_status_friends.friendship_between_id_user;
						
					}
					else{
						
						/******** 4 = Les bouton Accepter/Refuser de parrainage ********/
					
						if(
							THE_VIEWED_USER.user_status_mentoring != null && 
							THE_VIEWED_USER.user_status_mentoring.mentoring_status && 
							THE_VIEWED_USER.user_status_mentoring.mentoring_between_id_user == Alloy.Globals.THE_USER.id_user &&
							THE_VIEWED_USER.user_status_mentoring.mentoring_for_id_user == THE_VIEWED_USER.id_user &&
							THE_VIEWED_USER.user_status_mentoring.friendship_status === 'not_accepted'
						){
							
							$.RequestOrNot.text 							= THE_VIEWED_USER.user_prenom+' n\'a pas encore répondu à ta demande de parrainage';
							
							$.friendStatusRow2.height					= 0;
							$.friendStatusRow2.visible					= false;
							
							$.only_in_display_fields.height 			= $.only_in_display_fields.dheight-50;
							$.the_scroll_view_container.height 	= $.the_scroll_view_container.dheight-50;
							$.the_scroll_view_container.dheight 	= $.the_scroll_view_container.height;
							$.only_in_display_fields_separator.visible= 0;
							
						}
						else if(
							THE_VIEWED_USER.user_status_mentoring != null && 
							THE_VIEWED_USER.user_status_mentoring.mentoring_status && 
							////////THE_VIEWED_USER.user_status_mentoring.mentoring_between_id_user == THE_VIEWED_USER.id_user &&
							THE_VIEWED_USER.user_status_mentoring.mentoring_for_id_user == Alloy.Globals.THE_USER.id_user &&
							THE_VIEWED_USER.user_status_mentoring.mentoring_status === 'not_accepted'
						){
							
							$.friendStatusRow2.visible					= true;
							
							var ponctuation 										= THE_VIEWED_USER.user_civilite == 'M' ? 'ton filleul': 'ta filleule';
							$.RequestOrNot.text 							= THE_VIEWED_USER.user_status_mentoring.user_prenom+' a demandé à être '+ponctuation+' :';
							
							$.AcceptRequest.user_name 				= THE_VIEWED_USER.user_status_mentoring.user_name;
							$.AcceptRequest.relation_id 				= THE_VIEWED_USER.user_status_mentoring.id_mentoring;
							$.AcceptRequest.relation_case 			= 'mentoring';
							$.AcceptRequest.request_id_u 			= THE_VIEWED_USER.user_status_mentoring.mentoring_between_id_user;
							$.DeclineRequest.user_name 				= THE_VIEWED_USER.user_status_mentoring.user_name;
							$.DeclineRequest.relation_id 				= THE_VIEWED_USER.user_status_mentoring.id_mentoring;
							$.DeclineRequest.relation_case 			= 'mentoring';
							$.DeclineRequest.request_id_u 			= THE_VIEWED_USER.user_status_mentoring.mentoring_between_id_user;
							
						}
						else{
						
							$.friendStatusRow1.height					= 0;
							$.friendStatusRow1.visible					= false;
							$.friendStatusRow2.height					= 0;
							$.friendStatusRow2.visible					= false;
							
							$.only_in_display_fields.height 			= $.only_in_display_fields.dheight-92;
							$.the_scroll_view_container.height 	= $.the_scroll_view_container.dheight-92;
							$.the_scroll_view_container.dheight 	= $.the_scroll_view_container.height;
							$.only_in_display_fields_separator.visible= 0;
							
						}
						
					}
					
					/******** 5 = Tous les champs avant "Présentation, conseil étudiantTHE_VIEWED_USER" ********/
					
					if(MODIFICATION_CASE){
						
						$.banner_img_user_overlay.visible 			= true;
						$.only_in_edition_fields.visible 				= true;
					
					}
					else{
						
						////////// HEIGHTS 
						
						$.banner_img_user_overlay.visible 			= false;
						$.addTags.visible 									= false;
						
						$.only_in_edition_fields.visible 				= false;
						$.NewPathRow.visible 								= false;
						$.choosenPath.visible 								= false;
						$.choosenPathseparator.visible 				= false;
						$.Sell.visible 												= false;
						$.Update.visible 										= false;
						
						$.only_in_edition_fields.height 				= 0;
						$.NewPathRow.height 								= 0;
						$.choosenPath.height 								= 0;
						$.choosenPathseparator.height 				= 0;
						$.Sell.height 												= 0;
						$.Update.height 										= 0;
						
						$.conseilEtudiant.top 								= 12;
						$.NewPathRow.top 									= 0;
						$.choosenPath.top 									= 0;
						$.choosenPathseparator.top 					= 0;
						
						////////// FINAL HEIGHT ADJUSTMENT
						
						$.the_scroll_view_container.height 		= $.the_scroll_view_container.dheight - (
							($.only_in_edition_fields.height + $.only_in_edition_fields.top)
							+($.NewPathRow.height + $.NewPathRow.top)
							+($.choosenPath.height + $.choosenPath.top)
							+($.Sell.height + $.Sell.top)
							+($.Update.height + $.Update.top)
						);
						
						////////// BEHAVIOURS 
					
						$.addClass($.conseilField,'view-field-done');
						$.conseilField.touchEnabled 					= false;
						$.conseilField.editable 								= false;
						
					}
					
					/******** 6 = Couleurs et Backgrounds selon thême ********/
					
					$.window.backgroundColor 						= user_theme_color;
					$.the_scroll_view.backgroundColor 			= user_theme_color;
					$.banner_go_back_button.backgroundColor= user_theme_color;
					
				}
				
			}
			
		},
		false,
		true 
	);
	
};

Alloy.Globals.attach_a_DatePicker($.window,'user_page',$.userDateNaissance,'Date de naissance',true);

/*********************************** MANUAL CLICKS ****************************************/

$.banner_go_back_button_picto.addEventListener("touchstart", function(e) {
	
	Alloy.Globals.preventDoubleClick(this);

	Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['on_profile_page']);
	
});	

$.banner_go_to_button_picto.addEventListener("touchstart", function(e) {
	
	Alloy.Globals.preventDoubleClick(this);
	
	////////////////
	//////////////// CHAT WITH THE USER
	////////////////
	
	if(e.source.clicCase === 'gotoChat'){
			
		Alloy.Globals.openConversationBetween(
			e.source.base_user_id,
			e.source.user_id
		);	
		
		if(MODIFICATION_CASE)setTimeout(function(){
			Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['on_profile_page']);
		},500);
		
	}
	
	////////////////
	//////////////// ADD THE USER AS FRIEND
	////////////////
	
	else if(e.source.clicCase === 'addUser'){
		
		var currentUserName 												= Alloy.Globals.THE_USER.user_prenom+' '+Alloy.Globals.THE_USER.user_nom;
		var currentUserImg 													= JSON.parse(Alloy.Globals.THE_USER.user_photos_url_json);
		var currentUserPonctuation1 									= Alloy.Globals.THE_USER.user_civilite == 'M' ? 'le' : 'la';
		var currentUserPonctuation2 									= Alloy.Globals.THE_USER.user_civilite == 'M' ? '' : 'e';
		var currentUserPonctuation3 									= Alloy.Globals.THE_USER.user_civilite == 'M' ? 'ton' : 'ta';
	
		e.source.just_affect_visibility 									= true;
		
		Alloy.Globals.Logs.aalert(
			'DÉVELOPPES TON RÉSEAU',
			'Tu t\'apprêtes à ajouter '+e.source.user_prenom+' à ton réseau.',
			'Es-tu sûr'+currentUserPonctuation2+' de vouloir continuer ?',
			'ANNULER',
			null,
			'CONFIRMER',
			Alloy.Globals._add_Friend_PROCESSfunction_1,
			{
				cell:																		e,
	    		id_user: 																e.source.user_id,
	    		base_user_id: 													e.source.base_user_id,
	    		base_user_push_message: 								currentUserName+' souhaite faire partie de ton réseau',
				base_user_push_image:									currentUserImg.current,
				base_user_nom_prenom:									currentUserName
			},
			false
		);
		
	}
	
});	

$.banner_img_user_overlay.addEventListener("click", function(e) {

	Alloy.Globals.preventDoubleClick(this);
	
	////////////////
	//////////////// CHOOSE THE PHOTO SOURCE
	////////////////
							
	if(Dialog_for_uploads != null)delete Dialog_for_uploads;
	
	var localOptions 															= Alloy.Globals.app_image__pre_dialog_options;
	localOptions.title 															= MODIFICATION_CASE ? 'Photo de profil : changement' :'Photo de profil : ajout';
	
	var CDN_file_directory 													= 'user-profiles-pictures/id_user_'+Alloy.Globals.THE_USER.id_user;
	var Dialog_for_uploads													= Ti.UI.createOptionDialog(localOptions);
	
	Dialog_for_uploads.addEventListener('click',function(ev){
		
		////////Dialog_for_uploads.hide();
		delete Dialog_for_uploads;
	
		Alloy.Globals.handler_for_camera_or_gallery_dialog(
			ev,
			640,
			'jpg',
			true,
			CDN_file_directory,
			Alloy.Globals.endPoints.userUpload,
			function(JSON_returned,local_params){
			
				if(typeof JSON_returned['error'] !== 'undefined'){
					Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);
				}
				else{
					
					//////////// GOOGLE ANALYTICS 
					
					Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
						category: 													"User account management",
						label: 															"Update Profile Photo",
						action: 														"want to change his profile picture",
						value: 															1
					});
					
					///////////Alloy.Globals.Logs.llog('---------------- IMAGE UPLOADED (for sale) ----------------');
					///////////Alloy.Globals.Logs.llog(JSON_returned);
					
					$.banner_img_user.image 							= JSON_returned['output-array']['picture_on_amazon_cdn'];
					$.banner_img.image 									= JSON_returned['output-array']['picture_on_amazon_cdn'];
					
					THE_VIEWED_USER.user_photos_url_json= JSON_returned['output-array']['upload-json-back'];
					
				}
				
			},
			{
	    		id_user: 																Alloy.Globals.THE_USER.id_user
			},
			function(){
				
				delete Dialog_for_uploads;
				var Dialog_for_uploads										= null;
			
			}
		);
		
	}); 

	Dialog_for_uploads.show();
	
});

$.AcceptRequest.addEventListener("click", function(e) {
	
	Alloy.Globals.preventDoubleClick(this);
	
	var parrain_marraine1 													= Alloy.Globals.THE_USER.user_civilite == 'M' ? 'le parrain' : 'la marraine' ;
	var parrain_marraine2 													= Alloy.Globals.THE_USER.user_civilite == 'M' ? 'parrain' : 'marraine' ;
	var parrain_marraine3 													= Alloy.Globals.THE_USER.user_civilite == 'M' ? 'ton' : 'ta' ;
	var user_photo 																= JSON.parse(Alloy.Globals.THE_USER.user_photos_url_json);
	var newNotifBackText 													= e.source.relation_case == 'mentoring' ? Alloy.Globals.THE_USER.user_prenom+' '+Alloy.Globals.THE_USER.user_nom+' est désormais '+parrain_marraine3+' '+parrain_marraine2 : Alloy.Globals.THE_USER.user_prenom+' '+Alloy.Globals.THE_USER.user_nom+' fait désormais partie de ton réseau';
	var local_endpoint 														= e.source.relation_case == 'mentoring' ? Alloy.Globals.endPoints.mentoringAnswer : Alloy.Globals.endPoints.friendshipAnswer;

	/* ******************************************** */
	/* ********* AJAX API QUERY (FAST WAY) ******** */
	/* ******************************************* */
	Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		local_endpoint,
		{
			proposal_id: 							e.source.relation_id,
			proposal_id_user: 					e.source.request_id_u,
    		decision_id_user: 					Alloy.Globals.THE_USER.id_user,
    		decision_push_back: 			newNotifBackText,
    		decision_push_img: 				user_photo.current,
    		decision: 								'yes'
		},
		{
			async_params: 				{},
			NO_LIMIT: 						true,
			async_execution: 			function(JSON_returned,async_params_back){	
	
    			Alloy.Globals.Logs.llog('---------------- RETOUR friendshipAnswer() ----------------');
    			Alloy.Globals.Logs.llog(JSON_returned);
					
				if(typeof JSON_returned['error'] !== 'undefined'){
					
					Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);
					
				}
				else{
					
					//////////// GOOGLE ANALYTICS 
					
					Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
						category: 													"App. social behaviours",
						label: 															e.source.relation_case == 'mentoring' ? "Accept a mentoring request" : "Accept a friendship request",
						action: 														e.source.relation_case == 'mentoring' ? "said OK to a mentoring request" :  "said OK to be in personal network",
						value: 															1
					});
						
					$.friendStatusRow2.height							= 0;
					$.friendStatusRow2.visible							= false;
					
					$.only_in_display_fields.height 					= $.only_in_display_fields.dheight-96;
					$.the_scroll_view_container.height 			= $.the_scroll_view_container.dheight-96;
					$.only_in_display_fields_separator.visible	= 0;
					
				}
				
			}
		},
		false,
		true 
	);
	
});

$.DeclineRequest.addEventListener("click", function(e) {
	
	Alloy.Globals.preventDoubleClick(this);

	var newNotifBackText 													= '';
	var user_photo 																= JSON.parse(Alloy.Globals.THE_USER.user_photos_url_json);
	var local_endpoint 														= e.source.relation_case == 'mentoring' ? Alloy.Globals.endPoints.mentoringAnswer : Alloy.Globals.endPoints.friendshipAnswer;

	/* ******************************************** */
	/* ********* AJAX API QUERY (FAST WAY) ******** */
	/* ******************************************* */
	Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		local_endpoint,
		{
			proposal_id: 							e.source.relation_id,
			proposal_id_user: 					e.source.request_id_u,
    		decision_id_user: 					Alloy.Globals.THE_USER.id_user,
    		decision_push_back: 			newNotifBackText,
    		decision_push_img: 				user_photo.current,
    		decision: 								'no'
		},
		{
			async_params: 				{},
			NO_LIMIT: 						true,
			async_execution: 			function(JSON_returned,async_params_back){	
	
    			Alloy.Globals.Logs.llog('---------------- RETOUR friendshipAnswer() ----------------');
    			Alloy.Globals.Logs.llog(JSON_returned);
					
				if(typeof JSON_returned['error'] !== 'undefined'){
					
					Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);
					
				}
				else{
					
					//////////// GOOGLE ANALYTICS 
					
					Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
						category: 													"App. social behaviours",
						label: 															e.source.relation_case == 'mentoring' ? "Decline a mentoring request" : "Decline a friendship request",
						action: 														e.source.relation_case == 'mentoring' ? "said NO to a mentoring request" :"said NO to be in personal network",
						value: 															1
					});
						
					$.friendStatusRow2.height							= 0;
					$.friendStatusRow2.visible							= false;
					
					$.only_in_display_fields.height 					= $.only_in_display_fields.dheight-96;
					$.the_scroll_view_container.height 			= $.the_scroll_view_container.dheight-96;
					$.only_in_display_fields_separator.visible	= 0;
					
				}
				
			}
		},
		false,
		true 
	);
	
});

$.addTags.addEventListener("click", function(e) {
	
	if(!$.addTags.speed)Alloy.Globals.preventDoubleClick(this);
	if($.addTags.speed)delete $.addTags.speed;

	$.DivTagsContainer.height 						= $.DivTagsContainer.height+baseTagsDecalage;
	$.DivTagsContainer.dheight 					= $.DivTagsContainer.height;
	
	$.the_scroll_view_container.height 		= $.the_scroll_view_container.height+baseTagsDecalage;
	
	var tagRow 												= Ti.UI.createView({});
	$.addClass(tagRow,'view-field-c-simple');
	tagRow.height 											= 40;
	
		var tagUnderRow 									= Ti.UI.createView({layout:'horizontal'});
		
			var tagField1Container						= Ti.UI.createView({});
			$.addClass(tagField1Container,'view-field');
			$.addClass(tagField1Container,'view-field-tag');
			$.addClass(tagField1Container,'view-field-tag-first');
			
				var tagField1name						= 'tag'+baseTagsNumber;
				var tagField1									= Ti.UI.createTextField({maxLength:100,id:tagField1name});
				$.addClass(tagField1,'field');
				$.addClass(tagField1,'field-tag');
				
				available_tag_fields[tagField1name]= tagField1;
				
			tagField1Container.add(tagField1);
			baseTagsNumber++;
		
			var tagField2Container						= Ti.UI.createView({});
			$.addClass(tagField2Container,'view-field');
			$.addClass(tagField2Container,'view-field-tag');
			
				var tagField2name						= 'tag'+baseTagsNumber;
				var tagField2									= Ti.UI.createTextField({maxLength:100,id:tagField2name});
				$.addClass(tagField2,'field');
				$.addClass(tagField2,'field-tag');
				
				available_tag_fields[tagField2name]= tagField2;
				
			tagField2Container.add(tagField2);
			baseTagsNumber++;

			var removeRow 									= Ti.UI.createImageView({image:"/images/moinsBlue.png",visible:MODIFICATION_CASE});
			$.addClass(removeRow,'plus');
			
			removeRow.addEventListener("click", function(e) {
				
				Alloy.Globals.preventDoubleClick(this);
			
				delete available_tag_fields[tagField1name];
				delete available_tag_fields[tagField2name];
				
				$.DivTagsContainer.remove(tagRow);
				
				$.DivTagsContainer.height= $.DivTagsContainer.dheight-baseTagsDecalage;
				$.DivTagsContainer.dheight 		= $.DivTagsContainer.height;
	
				$.the_scroll_view_container.height= $.the_scroll_view_container.dheight-baseTagsDecalage;
			
			});

		tagUnderRow.add(tagField1Container);
		tagUnderRow.add(tagField2Container);
		tagUnderRow.add(removeRow);
		
	tagRow.add(tagUnderRow);
	
	$.DivTagsContainer.add(tagRow);
	
});	

$.Sell.addEventListener("click", function(e) {
	
	Alloy.Globals.preventDoubleClick(this);
	
	Alloy.Globals.app.goTo('page_1_b_1_vente', {});
						
	if(MODIFICATION_CASE)setTimeout(function(){
		Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['on_profile_page']);
	},500);
	
});	

$.Update.addEventListener("click", function(e) {
	
	Alloy.Globals.Logs.llog('>>>> UPDATE CLICK <<<<');
	
	Alloy.Globals.preventDoubleClick(this);
	
	///////////// 
	///////////// CHECK IF THE user_mail IS OK (BECAUSE NO CHECK INSIDE save() ENDPOINT)
	///////////// 
	
	var the_pseudo 											= $.userPseudo.getValue();
	var the_mail 												= $.userEmail.getValue();
	var the_mail_before 									= $.userEmail.cvalue;
	
	if( the_pseudo.length < 3 ){Alloy.Globals.Logs.aalert('Problème !','Merci d\'indiquer ton nom d\'utilisateur Swapbook','(3 caractères minimum)','Corriger',null,null,null,null);return;}
	if( !Alloy.Globals.tools.contains_special_characters(the_pseudo) ){Alloy.Globals.Logs.aalert('Problème !','Ton nom d\'utilisateur Swapbook ne dois contenir aucun caractère spécial ou espaces.','Néanmoins les underscores, tirets et points sont acceptés.','Corriger',null,null,null,{sizeUp1:true});return;}
	if( !Alloy.Globals.tools.is_Valid_EmailAddress(the_mail) ){Alloy.Globals.Logs.aalert('Problème !','Merci d\'indiquer une adresse email de connexion valide.','','Corriger',null,null,null,null);return;}
	
	Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		Alloy.Globals.endPoints.testUserAccount,
		{
    		pseudo_or_mail: 								the_mail,
    		email: 													true,
		},
		{
			NO_LIMIT: 						true,
			async_params: 				{},
			async_execution: 			function(JSON_returned,async_params_back){	
						
				if( the_mail_before != the_mail && typeof JSON_returned['error'] !== 'undefined'){
					
					Alloy.Globals.Logs.aalert('Problème !',JSON_returned['error-message'],'','OK',null,null,null,null);
					
					//////////
					////////// PROBLEM : USER EMAIL ALREADY TAKEN !
					//////////
					
					$.userEmail.setValue('');
					$.userEmail.blur();
					return;
					
				}

				///////////// 
				///////////// FORM VALIDATION
				///////////// 
				
				var now_moment 													= new Date();
				var now_moment_month 										= now_moment.getMonth()+1;
				var now_moment_for_db 										= now_moment.getFullYear()+'-'+(now_moment_month<10?'0'+now_moment_month:now_moment_month)+'-'+now_moment.getDate()+' '+now_moment.getHours()+':'+now_moment.getMinutes()+':'+now_moment.getSeconds();
				var CHANGE_PASSWORD_CASE 						= $.userPass.getValue() != $.userPass.cvalue ? true : false;
				var keep_old_user_other_infos 							= JSON.parse(THE_VIEWED_USER.user_text_json);
				
				if( $.userPass.getValue().length < 3 ){Alloy.Globals.Logs.aalert('Problème !','Merci d\'indiquer ton mot de passe de connexion.','(3 caractères minimum)','Corriger',null,null,null,null);return;}
				if( $.userNom.getValue().length < 2 ){Alloy.Globals.Logs.aalert('Problème !','Merci d\'indiquer ton ou tes noms de famille.','(2 caractères minimum)','Corriger',null,null,null,null);return;}
				if( $.userPrenom.getValue().length < 2 ){Alloy.Globals.Logs.aalert('Problème !','Merci d\'indiquer ton ou tes prénoms.','(2 caractères minimum)','Corriger',null,null,null,null);return;}
				if( !Alloy.Globals.tools.is_Valid_PhoneNumber($.userPhone.getValue()) ){Alloy.Globals.Logs.aalert('Problème !','Merci d\'indiquer un N° de téléphone valide.','','Corriger',null,null,null,null);return;}
				if( $.userDateNaissance.getValue().length < 10 ){Alloy.Globals.Logs.aalert('Problème !','Merci de nous communiquer ta date de naissance.','(au format DD/MM/AAAA)','Corriger',null,null,null,null);return;}
				if( $.userCivilite.getValue() == '' ){Alloy.Globals.Logs.aalert('Problème !','Merci de nous communiquer ta civilité.','','Corriger',null,null,null,null);return;}
				
				///////////// 
				///////////// FORM HIDDEN OBJECT COMPLETION (looking like database "user" table row object creation)
				///////////// 
				
				THE_VIEWED_USER.id_user 								= Alloy.Globals.THE_USER.id_user;
				THE_VIEWED_USER.date_maj 							= now_moment_for_db;
				THE_VIEWED_USER.device_token 						= Alloy.Globals.DeviceToken;
				THE_VIEWED_USER.date_derniere_activite 		= now_moment_for_db;
				THE_VIEWED_USER.user_type 							= $.userCivilite.cvalue == 'Soc' ? 'pro' : ( $.userCivilite.cvalue == 'BDE' ? 'asso' : 'part');
				THE_VIEWED_USER.user_language 					= Ti.Locale.getCurrentLanguage();
				THE_VIEWED_USER.user_email							= $.userEmail.getValue();
				THE_VIEWED_USER.user_pseudo 						= the_pseudo;
				THE_VIEWED_USER.user_password 					= $.userPass.getValue();
				THE_VIEWED_USER.user_civilite 						= $.userCivilite.cvalue;
				THE_VIEWED_USER.user_nom 							= $.userNom.getValue();
				THE_VIEWED_USER.user_prenom 						= $.userPrenom.getValue();
				THE_VIEWED_USER.user_date_naissance 		= $.userDateNaissance.cvalue;
				THE_VIEWED_USER.user_pays_residence 		= $.userPays.getValue();
				THE_VIEWED_USER.user_tel_portable 				= $.userPhone.getValue();
				THE_VIEWED_USER.user_num_national 			= $.userID.getValue();
				THE_VIEWED_USER.new_address 						= JSON.stringify({
					id_address:														(THE_VIEWED_USER.adresses.length == 1 ? THE_VIEWED_USER.adresses[0].id_address : ''),
					date_maj:															now_moment_for_db,
					id_user:																Alloy.Globals.THE_USER.id_user,
					address_field2:													$.userCP.getValue(),
					address_field3:													$.userVille.getValue(),
					address_field4:													$.userPays.getValue(),
					address_field5:													$.userAdresse.getValue(),
					address_field7:													$.userPrenom.getValue()+' '+$.userNom.getValue()
				});
				THE_VIEWED_USER.pathwayToMark 				= $.userParcoursRetenu.cvalue;
										
				////////////////	
				//////////////// TAGS + BIO (json stored in database)	
				////////////////
				
				var tags_length_check 										= [];
				var new_emphasis_tags 										= [];
				for (var property in available_tag_fields) {
					if (available_tag_fields.hasOwnProperty(property)) {
						var tag_textfield 											= available_tag_fields[property];
						var tag_textfield_value 								= tag_textfield.getValue().replace(",", "");
						tag_textfield_value 										= tag_textfield_value.replace(".", "");
						tag_textfield_value 										= tag_textfield_value.replace(",", " ");
						tags_length_check.push(tag_textfield_value);
						if( tag_textfield_value != '' && tag_textfield_value.length > 2 )new_emphasis_tags.push(tag_textfield_value);
					}
				}
				for(t=0; t<tags_length_check.length;t++){
					if( tags_length_check[t] != '' && tags_length_check[t].length < 3 ){
						if(tags_length_check.length>2)Alloy.Globals.Logs.aalert('Problème !','Chaque centre d\'intérêt renseigné doit faire 3 caractères de long minimum.','','Corriger',null,null,null,null);
						return;
					}
				}
				
				THE_VIEWED_USER.user_text_json					= JSON.stringify({
					bio:																		$.userConseil.getValue(),
					emphasis_tags_ids: 											new_emphasis_tags.join(','),
					internal_remarks: 												keep_old_user_other_infos.internal_remarks
				});
				
				///////////// 
				///////////// UPDATE CURRENT USER GLOBALS
				///////////// 
				
				Alloy.Globals.THE_USER.user_nom 					= THE_VIEWED_USER.user_nom;
				Alloy.Globals.THE_USER.user_prenom 				= THE_VIEWED_USER.user_prenom;
				Alloy.Globals.THE_USER.user_civilite 				= THE_VIEWED_USER.user_civilite;
				Alloy.Globals.THE_USER.user_photos_url_json 	= THE_VIEWED_USER.user_photos_url_json;
				
				///////////// 
				///////////// DATAS CLEANING (REMOVE SOME DATA)
				///////////// 
				
				delete THE_VIEWED_USER.new_adress;
				delete THE_VIEWED_USER.payments;
				delete THE_VIEWED_USER.son_univ_logo;
				delete THE_VIEWED_USER.son_univ_nom;
				delete THE_VIEWED_USER.son_univ_cursus;
				delete THE_VIEWED_USER.son_univ_cursus_suite;
				delete THE_VIEWED_USER.user_civilite_select_corresp;
				delete THE_VIEWED_USER.user_civilite_select_values;
				delete THE_VIEWED_USER.user_civilite_select_keys;
				delete THE_VIEWED_USER.user_date_naissance_shown;
				delete THE_VIEWED_USER.user_tags;
				delete THE_VIEWED_USER.user_pathways;
				delete THE_VIEWED_USER.user_status_friends;
				delete THE_VIEWED_USER.user_status_mentoring;
				delete THE_VIEWED_USER.user_sales;
				delete THE_VIEWED_USER.user_pathways_NEWONES;
				
				///////////// 
				///////////// FORM SUBMISSION
				///////////// 
				
				var deconnecte_e 													= $.userCivilite.cvalue == 'M' ? '' : 'e';
				var final_confirmation											= 'Ton profil utilisateur a bien été mis à jour !';
				var final_confirmation_line2									= CHANGE_PASSWORD_CASE ? 'Sachant que tu as modifié ton mot de passe, tu vas être déconnecté'+deconnecte_e+' afin de le confirmer.' : 'Les changements sont immédiats pour les autres swappeurs.';
				
				/* ******************************************** */
				/* ********* AJAX API QUERY (FAST WAY) ******** */
				/* ******************************************* */
				Alloy.Globals.Requests.RequestsMaker(
					'POST',
					true,
					Alloy.Globals.endPoints.updateUserAccount,
					{
				        the_user: 													Alloy.Globals.THE_USER.id_user,
				        the_user_object:										JSON.stringify(THE_VIEWED_USER)
					},
					{
						async_params: 				{},
						async_execution: 			function(JSON_returned,async_params_back){		
								
							if(typeof JSON_returned['error'] !== 'undefined'){
								
								Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);
								
							}
							else{
								
								///////////////Alloy.Globals.Logs.llog('---------------- USER UPDATED ----------------');
								///////////////Alloy.Globals.Logs.llog(JSON_returned);
								
								//////////// GOOGLE ANALYTICS
								
								Alloy.Globals.GoogleAnalyticsTracker.trackEvent({
									category: 										"User account management",
									label: 												"Save profile infos",
									action: 											"save user profile",
									value: 												1
								});
								
								/////////////// BLUE POPUP
								
								Alloy.Globals.Logs.aalert(final_confirmation,final_confirmation_line2,'','',null,null,null,( CHANGE_PASSWORD_CASE ? false : null),'BLUE');
								
								/////////////// CLOSING OR NOT (CHANGE PASSWORD)
								
								if( CHANGE_PASSWORD_CASE ){
									
									setTimeout(function(){
												
										/* ******************************************** */
										/* ********* AJAX API QUERY (FAST WAY) ******** */
										/* ******************************************** */
										Alloy.Globals.Requests.RequestsMaker(
											'POST',
											true,
											Alloy.Globals.endPoints.userLogout,
											{
										        id_user: 								Alloy.Globals.THE_USER.id_user
											},
											{
												async_params: 					{},
												async_execution: 				function(JSON_returned,async_params_back){			
													
													if(typeof JSON_returned['error'] !== 'undefined'){
														
														Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);
														
													}
													else{
														
														///////////////Alloy.Globals.Logs.llog('---------------- USER LOGGED OUT ----------------');
														///////////////Alloy.Globals.Logs.llog(JSON_returned);
														
														Alloy.Globals.SignOut.Ready('signout_click',{});
												
														////////////
														//////////// CLOSE ALL
														////////////
															
														setTimeout(function(){
															
															Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['on_profile_page']);
															
															setTimeout(function(){
																Alloy.Globals.navigationDefault.closeWindow(Alloy.Globals.toCloseWindows['homepage']);
															},1000);
														
														},3000);
														
													}
													
												}
												
											},
											false,
											false 
										);
										
									},750);
									
								}
							    
							}
						}
					},
					false,
					true 
				);
				
				///////////
				/////////// END OF FORM VALIDATION + SUBMISSION
				///////////
				
			}
		},
		false,
		true 
	);
	
	///////////// 
	///////////// END OF CHECK IF THE user_mail IS OK
	///////////// 
	
});	

/*********************************** DETECT user_pseudo CHANGE ****************************************/

$.userPseudo.addEventListener("change", function(e) {
	
	var value_live 											= this.getValue();
	var value_before 										= this.cvalue;
	
	if( value_live.length < 3 ){Alloy.Globals.Logs.aalert('Problème !','Merci d\'indiquer ton nom d\'utilisateur Swapbook','(3 caractères minimum)','Corriger',null,null,null,null);return;}
	if( !Alloy.Globals.tools.contains_special_characters(value_live) ){Alloy.Globals.Logs.aalert('Problème !','Ton nom d\'utilisateur Swapbook ne dois contenir aucun caractère spécial ou espaces.','Néanmoins les underscores, tirets et points sont acceptés.','Corriger',null,null,null,{sizeUp1:true});return;}
	
	/* ******************************************** */
	/* ********* AJAX API QUERY (FAST WAY) ******** */
	/* ******************************************* */
	if( value_live.length >= 5 && value_live != value_before )Alloy.Globals.Requests.RequestsMaker(
		'POST',
		true,
		Alloy.Globals.endPoints.testUserAccount,
		{
    		pseudo_or_mail: 								value_live.trim(),
		},
		{
			NO_LIMIT: 						true,
			async_params: 				{},
			async_execution: 			function(JSON_returned,async_params_back){
				if(typeof JSON_returned['error'] !== 'undefined'){
					
					//////////
					////////// PROBLEM : USER PSEUDO ALREADY TAKEN !
					//////////
					
					$.userPseudo.setValue(value_live.replace(' ',''));
					$.userPseudo.blur();
					
					Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);
					
				}
			}
		},
		false,
		true 
	);
	
});	

/********************************************************************************************************************************************/
/*********************************** PATHWAYS SUB-FORMS ON PAGE LOAD (WARNING COMPLEX PROCESS) ****************************************/
/********************************************************************************************************************************************/

/* ************************************************************************************************************* */
/* ********* AJAX API QUERY (FAST WAY)  ===== RECUPERATION DES TYPES DE PARCOURS EN BASE DE DONNEES ******** */
/* ************************************************************************************************************* */

Alloy.Globals.Requests.RequestsMaker(
	'GET',
	true,
	Alloy.Globals.endPoints.possiblePathwaysGet,
	{},
	{
		NO_LIMIT: 						true,
		async_params: 				{},
		async_execution: 			function(JSON_returned,async_params_back){	
					
			if(typeof JSON_returned['error'] !== 'undefined'){
				
				///////Alloy.Globals.Logs.aalert('Erreur Swapbook',JSON_returned['error-message'],'','OK',null,null,null,null);
				
			}
			else{
				
				///////////////Alloy.Globals.Logs.llog('---------------- PATHWAYS TYPE RETRIEVED ----------------');
				///////////////Alloy.Globals.Logs.llog(JSON_returned);
				
				if(typeof(JSON_returned['output-array']) == 'undefined')return;
				
				if(JSON_returned['output-array']['months_for_display'])pathways_months= JSON_returned['output-array']['months_for_display'];
				
				for(k=0;k<JSON_returned['output-array']['keys-array'].length;k++){
					if(k == 0)pathways_default_form_type=JSON_returned['output-array']['types'][0];
					pathways_first_select[JSON_returned['output-array']['values-array'][k]]= JSON_returned['output-array']['keys-array'][k];
					pathways_first_select_types[JSON_returned['output-array']['values-array'][k]]= JSON_returned['output-array']['types'][k];
				}
				
				$.NewPath.NewType 					= JSON_returned['output-array']['values-array'][0];
					
				pathways.newval 							= {
					fieldTitle: 									'Nouvel élément',
					fieldType: 									JSON_returned['output-array']['types'][0],
					fieldOne: 									{
						id: 											"pathway_new_type", 
						value: 										JSON_returned['output-array']['keys-array'][0], 
						cvalue: 									JSON_returned['output-array']['values-array'][0], 
						editable:									false,
						kparent: 									"newval", 
						jparent: 									"fieldOne", 
						selectCase: 							"creation", 
						selectType: 							"SHORT", 
						hintText: 								"Type de parcours", 
						selectBigLineOne: 					"Type de parcours", 
						selectBigLineTwo: 				"", 
						selectBIGParentItem: 			"", 
						selectBIGChildItem: 				"", 
						selectSHORTKeys: 				JSON_returned['output-array']['keys'], 
						selectSHORTVals: 				JSON_returned['output-array']['values'], 
						onClick: 									"Alloy.Globals.showSelect_BIG_or_SHORT",
						onSelect: 								"Alloy.Globals.choiceSelect_BIG_or_SHORT",
						destinationKey: 						"pathway_type",
						destinationKeyForDisplay: 	"form_type"
					}
				};
				
				pathways.newval.fieldTwo 			= (JSON.parse(JSON.stringify(pathways.newval.fieldOne))); /** Javascript Object Clone **/
				pathways.newval.fieldTwo.id 											= "pathway_new_debut";
				pathways.newval.fieldTwo.jparent 								= "fieldTwo";
				pathways.newval.fieldTwo.value 									= "";
				pathways.newval.fieldTwo.cvalue 									= -1;
				pathways.newval.fieldTwo.hintText 								= "Début";
				pathways.newval.fieldTwo.selectBigLineOne				= "Début du parcours";
				pathways.newval.fieldTwo.selectType 							= "DATE";
				pathways.newval.fieldTwo.destinationKey 					= "pathway_date_from";
				pathways.newval.fieldTwo.destinationKeyForDisplay 	= "pathway_date_from_field";
				
				pathways.newval.fieldThree 		= (JSON.parse(JSON.stringify(pathways.newval.fieldOne)));
				pathways.newval.fieldThree.id 										= "pathway_new_fin";
				pathways.newval.fieldThree.jparent 								= "fieldThree";
				pathways.newval.fieldThree.value 									= "";
				pathways.newval.fieldThree.cvalue 								= -1;
				pathways.newval.fieldThree.hintText 							= "Fin";
				pathways.newval.fieldThree.selectBigLineOne 			= "Fin du parcours";
				pathways.newval.fieldThree.selectType						= "DATE";
				pathways.newval.fieldThree.destinationKey 				= "pathway_date_to";
				pathways.newval.fieldThree.destinationKeyForDisplay 	= "pathway_date_to_field";
				
				pathways.newval.fieldFour 			= (JSON.parse(JSON.stringify(pathways.newval.fieldOne)));
				pathways.newval.fieldFour.id											= "pathway_new_etablissement";
				pathways.newval.fieldFour.jparent 								= "fieldFour";
				pathways.newval.fieldFour.value									= "";
				pathways.newval.fieldFour.cvalue 									= -1;
				pathways.newval.fieldFour.hintText								= "Université, École";
				pathways.newval.fieldFour.selectBigLineOne				= "Cherches et sélectionnes ton établissement";
				pathways.newval.fieldFour.selectBigLineTwo				= "parmi tous ceux recensés par Swapbook :";
				pathways.newval.fieldFour.selectType							= "BIG";
				pathways.newval.fieldFour.selectBIGParentItem 			= "fieldFour";
				pathways.newval.fieldFour.selectBIGChildItem 			= "fieldFive";
				pathways.newval.fieldFour.destinationKey 					= "pathway_id_universite";
				pathways.newval.fieldFour.destinationKeyForDisplay 	= "universite_name";
				
				pathways.newval.fieldFive 			= (JSON.parse(JSON.stringify(pathways.newval.fieldOne)));
				pathways.newval.fieldFive.id											= "pathway_new_diplome";
				pathways.newval.fieldFive.jparent 									= "fieldFive";
				pathways.newval.fieldFive.value										= "";
				pathways.newval.fieldFive.cvalue 									= -1;
				pathways.newval.fieldFive.hintText								= "Diplôme";
				pathways.newval.fieldFive.selectBigLineOne				= "Cherches et sélectionnes un diplôme";
				pathways.newval.fieldFive.selectBigLineTwo				= "proposé dans cet établissement :";
				pathways.newval.fieldFive.selectType							= "BIG";
				pathways.newval.fieldFive.selectBIGParentItem 			= "fieldFour";
				pathways.newval.fieldFive.selectBIGChildItem 			= "fieldSix";
				pathways.newval.fieldFive.destinationKey 					= "pathway_id_diplome";
				pathways.newval.fieldFive.destinationKeyForDisplay 	= "diplome_name";
				
				pathways.newval.fieldSix 			= (JSON.parse(JSON.stringify(pathways.newval.fieldOne)));
				pathways.newval.fieldSix.id											= "pathway_new_formation";
				pathways.newval.fieldSix.jparent 									= "fieldSix";
				pathways.newval.fieldSix.value										= "";
				pathways.newval.fieldSix.cvalue 									= -1;
				pathways.newval.fieldSix.hintText									= "Formation";
				pathways.newval.fieldSix.selectBigLineOne					= "Cherches et sélectionnes la formation";
				pathways.newval.fieldSix.selectBigLineTwo					= "du diplôme en question :";
				pathways.newval.fieldSix.selectType							= "BIG";
				pathways.newval.fieldSix.selectBIGParentItem 			= "fieldSix";
				pathways.newval.fieldSix.selectBIGChildItem 				= "fieldEleven";
				pathways.newval.fieldSix.destinationKey 						= "pathway_id_formation";
				pathways.newval.fieldSix.destinationKeyForDisplay 	= "formation_name";
				
				pathways.newval.fieldEleven 		= (JSON.parse(JSON.stringify(pathways.newval.fieldOne)));
				pathways.newval.fieldEleven.id										= "pathway_new_parcours";
				pathways.newval.fieldEleven.jparent 							= "fieldEleven";
				pathways.newval.fieldEleven.value								= "";
				pathways.newval.fieldEleven.cvalue 								= -1;
				pathways.newval.fieldEleven.hintText							= "Parcours";
				pathways.newval.fieldEleven.selectBigLineOne			= "Cherches et sélectionnes un parcours";
				pathways.newval.fieldEleven.selectBigLineTwo			= "proposé dans le cadre de cette formation:";
				pathways.newval.fieldEleven.selectType						= "BIG";
				pathways.newval.fieldEleven.selectBIGParentItem 		= "fieldEleven";
				pathways.newval.fieldEleven.selectBIGChildItem		= "fieldSeven";
				pathways.newval.fieldEleven.destinationKey 				= "pathway_id_parcours";
				pathways.newval.fieldEleven.destinationKeyForDisplay= "parcours_name";
				
				pathways.newval.fieldSeven 		= (JSON.parse(JSON.stringify(pathways.newval.fieldOne)));
				pathways.newval.fieldSeven.id										= "pathway_new_titre";
				pathways.newval.fieldSeven.jparent 								= "fieldSeven";
				pathways.newval.fieldSeven.value									= "";
				pathways.newval.fieldSeven.cvalue 								= -1;
				pathways.newval.fieldSeven.hintText 							= "Titre";
				pathways.newval.fieldSeven.editable 							= true;
				pathways.newval.fieldSeven.selectBigLineOne 			= "";
				pathways.newval.fieldSeven.selectType						= "NONE";
				pathways.newval.fieldSeven.selectBIGParentItem 		= "fieldEleven";
				pathways.newval.fieldSeven.maxlength						= 100;
				pathways.newval.fieldSeven.destinationKey 				= "pathway_title";
				pathways.newval.fieldSeven.destinationKeyForDisplay= "pathway_title";
				
				pathways.newval.fieldEight 		= (JSON.parse(JSON.stringify(pathways.newval.fieldOne)));
				pathways.newval.fieldEight.id										= "pathway_new_entreprise";
				pathways.newval.fieldEight.jparent 								= "fieldEight";
				pathways.newval.fieldEight.value									= "";
				pathways.newval.fieldEight.cvalue 								= -1;
				pathways.newval.fieldEight.hintText 							= "Nom de l'entreprise'";
				pathways.newval.fieldEight.editable 							= true;
				pathways.newval.fieldEight.selectBigLineOne 				= "";
				pathways.newval.fieldEight.selectType						= "NONE";
				pathways.newval.fieldEight.maxlength							= 100;
				pathways.newval.fieldEight.destinationKey 					= "pathway_precision";
				pathways.newval.fieldEight.destinationKeyForDisplay= "pathway_precision";
				
				pathways.newval.fieldNine 			= (JSON.parse(JSON.stringify(pathways.newval.fieldOne)));
				pathways.newval.fieldNine.id											= "pathway_new_lieu";
				pathways.newval.fieldNine.jparent 								= "fieldNine";
				pathways.newval.fieldNine.value									= "";
				pathways.newval.fieldNine.cvalue 									= -1;
				pathways.newval.fieldNine.hintText 								= "Lieu du parcours";
				pathways.newval.fieldNine.editable 								= true;
				pathways.newval.fieldNine.selectBigLineOne 				= "";
				pathways.newval.fieldNine.selectType							= "NONE";
				pathways.newval.fieldNine.maxlength							= 100;
				pathways.newval.fieldNine.destinationKey 					= "pathway_place";
				pathways.newval.fieldNine.destinationKeyForDisplay	= "pathway_place";
				
				pathways.newval.fieldTen 			= (JSON.parse(JSON.stringify(pathways.newval.fieldOne)));
				pathways.newval.fieldTen.id											= "pathway_new_description";
				pathways.newval.fieldTen.jparent 									= "fieldTen";
				pathways.newval.fieldTen.value										= "";
				pathways.newval.fieldTen.cvalue 									= -1;
				pathways.newval.fieldTen.hintText 								= "Description du parcours";
				pathways.newval.fieldTen.editable 								= true;
				pathways.newval.fieldTen.selectBigLineOne 				= "";
				pathways.newval.fieldTen.selectType							= "NONE";
				pathways.newval.fieldTen.maxlength							= 220;
				pathways.newval.fieldTen.destinationKey 					= "pathway_description";
				pathways.newval.fieldTen.destinationKeyForDisplay 	= "pathway_description";
				
				Alloy.Globals.loadRefreshUSER();
				
			}
			
		}
		
	},
	false,
	true 
);

var base_database_ready_object 				= {
	id_pathway: null,		
	id_user: Alloy.Globals.THE_USER.id_user,
	pathway_type: -1,
	id_type: -1,
	pathway_date_from: '0000-00-00',
	pathway_date_from_field: '00/00/0000',
	pathway_date_from_shown: '?? ????',
	pathway_date_to: '0000-00-00',
	pathway_date_to_field: '00/00/0000',
	pathway_date_to_shown: '?? ????',
	pathway_title: '',
	pathway_precision: '',
	pathway_place: '',
	pathway_description: '',
	pathway_id_universite: -1,
	pathway_id_diplome: -1,
	pathway_id_formation: -1,
	pathway_id_parcours: -1,
	form_type: pathways_default_form_type /******* CETTE CLÉ IMPORTANTE SERT À AFFICHER AU DISPLAY LE PICTO valise OU chapeau > " if(obj.form_type === 'sco'){ " ******/
};

var new_view_field_class_object 				= {
	top: 16,
	width:'90%',
	height:40,
	layout: 'absolute',
	borderColor:'#73ababab',
	borderWidth:1,
	borderRadius:6,
	backgroundColor:'#ffffff',
    backgroundSelectedColor:'#ffffff',
    backgroundFocusedColor:'#ffffff',
	verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
};

var new_two_dates_fields_class_object 	= {
	top:0,
	width:'90%',
	height:56,
	layout:'horizontal'
};

var new_text_field_class_object 					= new_text_field_DATE_class_object = {
	color:'#000',
	width:'100%',
	left:12,
	height:'100%',
	borderRadius:6,
	touchEnabled: true,
	backgroundColor:'transparent',
    backgroundSelectedColor:'transparent',
    backgroundFocusedColor:'transparent',
	keyboardType:Ti.UI.KEYBOARD_TYPE_DEFAULT,
	returnKeyType:Ti.UI.RETURNKEY_DEFAULT,
	borderStyle:Ti.UI.INPUT_BORDERSTYLE_NONE,
	zIndex: 3,
	font:{
		fontSize:18,
		fontFamily:"Wask_New"
	},
};
if(OS_IOS){
	new_text_field_class_object.font  			= {
		fontSize:22,
		fontFamily:"WaskNew"
	};
}

var new_arrow_class_object 						= {
	top:9,
	right: 0,
	width: 22,
	height: 22,
	zIndex: 10,
	image: "/images/formTextfield_Arrow.png",
	touchEnabled:false
};

var new_arrow_date_class_object 				= {
	top:7,
	right: 7,
	width: 24,
	height: 24,
	zIndex: 10,
	image: "/images/calendar.png",
	touchEnabled:false
};

var attach_and_open_a_sub_Form 				= Alloy.Globals.attach_and_open_a_sub_Form = function(e,the_destination_view_is_known){
	
	if(!THE_VIEWED_USER.user_pathways_NEWONES)THE_VIEWED_USER.user_pathways_NEWONES= [base_database_ready_object];
	if(!THE_VIEWED_USER.user_pathways_TO_DELETE)THE_VIEWED_USER.user_pathways_TO_DELETE= [];
	if(!THE_VIEWED_USER.user_pathways_CHANGES)THE_VIEWED_USER.user_pathways_CHANGES= {};
	
	if(typeof the_destination_view_is_known == 'undefined')Alloy.Globals.preventDoubleClick(this);
	
	var user_profile_base								= e.source['Ref'];
	
	if(pathways[user_profile_base]){
		
		var conf_object 										= pathways[user_profile_base];
		var conf_type 										= e.source['NewType'] ? pathways_first_select_types[e.source['NewType']] : conf_object['fieldType'];
		if(e.source['NewType'])pathways[user_profile_base]['fieldType']= pathways_first_select_types[e.source['NewType']];
		var items_loop 										= (JSON.parse(JSON.stringify(conf_type === 'pro' ? pathways_array_loop_PRO : pathways_array_loop_SCO))); ///// Cloning of the array because of the possible shift()
		if(e.source['NewType'] && !e.source.NewButton)items_loop.shift();
		
		///////////
		/////////// ITEMS TO ADD
		///////////
		
		var alert_popin_items							= [];
		var alert_popin_hidden_items				= [];
		var alert_popin_container_height 		= 0;
		var new_dates_view_field 					= Ti.UI.createView(new_two_dates_fields_class_object);
		
		///////////
		/////////// LOOP FOR DOM CREATION
		///////////
		
		for(i=0;i<items_loop.length;i++){

			var field_data 									= conf_object['field'+items_loop[i]];
			
			new_text_field_class_object.id 		= field_data.id;
			new_text_field_class_object.value 	= field_data.value;
			new_text_field_class_object.cvalue	= field_data.cvalue;
			new_text_field_class_object.hintText= field_data.hintText;
			new_text_field_class_object.editable= field_data.editable;
			new_text_field_class_object.selectType= field_data.selectType;
			new_text_field_class_object.selectSHORTKeys= field_data.selectSHORTKeys;
			new_text_field_class_object.selectSHORTVals= field_data.selectSHORTVals;
			new_text_field_class_object.selectBigLineOne= field_data.selectBigLineOne;
			new_text_field_class_object.selectBigLineTwo= field_data.selectBigLineTwo;
			new_text_field_class_object.selectBIGParentItem= field_data.selectBIGParentItem;
			new_text_field_class_object.selectBIGChildItem= field_data.selectBIGChildItem;
			new_text_field_class_object.onClick= field_data.onClick;
			new_text_field_class_object.onSelect= field_data.onSelect;
			new_text_field_class_object.selectCase= field_data.selectCase;
			new_text_field_class_object.kparent= field_data.kparent;
			new_text_field_class_object.jparent= field_data.jparent;
			new_text_field_class_object.destinationKey= field_data.destinationKey;
			new_text_field_class_object.destinationKeyForDisplay= field_data.destinationKeyForDisplay;

			var new_view_field 							= Ti.UI.createView(new_view_field_class_object);
			var new_text_field 							= Ti.UI.createTextField(new_text_field_class_object);
			var new_arrow_for_field 					= Ti.UI.createImageView(new_arrow_class_object);
			
			//////// 2 DATES-FIELD IN ONE LINE
			
			if( items_loop[i] === 'Two' ){
				
				new_view_field.width 					= '48%';
				new_arrow_for_field 						= Ti.UI.createImageView(new_arrow_date_class_object);
			
				new_dates_view_field.add(new_view_field);
				new_view_field.add(new_arrow_for_field);
				new_view_field.add(new_text_field);
				
				alert_popin_container_height 		+= 0;
				
				///////// EVENT BINDING
				
				Alloy.Globals.attach_a_DatePicker($.window,'user_page',new_text_field,field_data.selectBigLineOne,true);
				
			}
			else if( items_loop[i] === 'Three' ){
				
				new_view_field.left 						= 10;
				new_view_field.width 					= '48%';
				new_arrow_for_field 						= Ti.UI.createImageView(new_arrow_date_class_object);
			
				new_dates_view_field.add(new_view_field);
				new_view_field.add(new_arrow_for_field);
				new_view_field.add(new_text_field);
				
				alert_popin_container_height 		+= 58;
				alert_popin_items.push(new_dates_view_field);
				
				///////// EVENT BINDING

				Alloy.Globals.attach_a_DatePicker($.window,'user_page',new_text_field,field_data.selectBigLineOne,true);
				
			}
			
			//////// ONE SELECT-FIELD PER LINE
			
			else{
				
				///////// DELETE BUTTON IF "modifcation" + "One" ITEM

				if( field_data.selectCase == 'edition' && items_loop[i] == 'One' ){
					
					var new_view_field_delete		= Ti.UI.createButton({
						title: 'Supprimer l\'élément', 
						rowSelector: new_text_field.kparent
					});
					
					$.addClass(new_view_field_delete,'Rbutton');
					$.addClass(new_view_field_delete,'RbuttonInPopin');
					
					new_view_field_delete.addEventListener("click",delete_a_sub_Form);
					
					alert_popin_items.push(new_view_field_delete);

				}
				
				///////// CLASSIC FORM ITEM CREATION
				
				new_view_field.add(new_text_field);
				
				if(field_data.editable == false)new_view_field.add(new_arrow_for_field);
				
				alert_popin_container_height 		+= 58;
				alert_popin_items.push(new_view_field);
				
				///////// EVENT BINDING
				
				eval('var evalfunc = '+new_text_field_class_object.onClick+';');
				new_text_field.addEventListener("click",evalfunc);
				
				////////// SEARCH QUERY ALTERATIONS
				
				if( items_loop[i] == 'Four' && field_data.cvalue != -1 ){
					Alloy.Globals.pathway_CURRENT_ID_UNIVERSITE						= field_data.cvalue;
					new_text_field.selectBigLineTwo 													= 'parmi tous ceux recensés par Swapbook :';
				}
				else if( items_loop[i] == 'Five' && field_data.cvalue != -1 ){
					Alloy.Globals.pathway_CURRENT_ID_DIPLOME							= field_data.cvalue;
					new_text_field.selectBigLineTwo 													= 'proposé à '+Alloy.Globals.deep_referenced_items_for_a_later_control['path_'+new_text_field_class_object.kparent+'_popinField_fieldFour'].value+' :';
				}
				else if( items_loop[i] == 'Six' && field_data.cvalue != -1 ){
					Alloy.Globals.pathway_CURRENT_ID_FORMATION						= field_data.cvalue;
					new_text_field.selectBigLineTwo 													= 'pour le diplôme '+Alloy.Globals.deep_referenced_items_for_a_later_control['path_'+new_text_field_class_object.kparent+'_popinField_fieldFive'].value+' :';
				}
				else if( items_loop[i] == 'Eleven' && field_data.cvalue != -1 ){
					Alloy.Globals.pathway_CURRENT_ID_PARCOURS						= field_data.cvalue;
					new_text_field.selectBigLineTwo 													= 'pour le parcours '+Alloy.Globals.deep_referenced_items_for_a_later_control['path_'+new_text_field_class_object.kparent+'_popinField_fieldSix'].value+' :';
				}
				
				if( 
					( items_loop[i] == 'Five' || items_loop[i] == 'Six' || items_loop[i] == 'Eleven' ) &&
					field_data.cvalue == -1
				)new_text_field.touchEnabled 																= false;
				
			}

			////////// DOM SAVE FOR JUST DISPLAY CONSEQUENCES (THE HIDDEN OBJECTIS ALWAYS THE REAL BASE)
			
			Alloy.Globals.deep_referenced_items_for_a_later_control['path_'+new_text_field.kparent+'_popinField_'+new_text_field.jparent]= new_text_field;
		
		}
		
		///////////
		/////////// ITEMS DELEGATION + POPIN OPENING or VIEW MODIFICATION
		///////////
		
		if(typeof the_destination_view_is_known != 'undefined'){
			
			for(i=0;i<alert_popin_items.length;i++){
				
				the_destination_view_is_known.add(alert_popin_items[i]);
				
			}
			
		}
		else{
			
			Alloy.Globals.Logs.aalert(
				conf_object['fieldTitle'],
				'',
				'',
				'ANNULER',
				null,
				'VALIDER',
				function(params_back_for_the_function_herself){
					
					///////////
					/////////// LOOP FOR DOM MODIFICATION
					///////////
					
					var field_mode 							= null;
					var final_data_object 				= null;
					var errors 									= 0;
					var items_loop_for_click 			= (JSON.parse(JSON.stringify(pathways[user_profile_base]['fieldType'] === 'pro' ? pathways_array_loop_PRO : pathways_array_loop_SCO))); ///// Cloning of the array because of the possible shift()
		
					for(i=0;i<items_loop_for_click.length;i++){
						
						var field_setted_data 			= Alloy.Globals.deep_referenced_items_for_a_later_control['path_'+conf_object['field'+items_loop_for_click[i]].kparent+'_popinField_'+conf_object['field'+items_loop_for_click[i]].jparent];
						field_mode 							= field_setted_data.selectCase;
						
						///////////
						/////////// MODE : CREATION
						///////////
						
						if(field_mode == 'creation'){
							
							/********** 1 = OBJET FINAL DE LA CREATION **********/
							
							if(final_data_object == null)final_data_object= THE_VIEWED_USER.user_pathways_NEWONES[Alloy.Globals.user_profile_new_items_counter];
							
							/********** 2 = CLÉS DE L'OBJET FINAL DE LA CREATION **********/
							
							var final_data_object_key1= field_setted_data.destinationKey;
							var final_data_object_key2= field_setted_data.destinationKeyForDisplay;
							
							/********** 3 = CONTROLE SUR LA NOUVELLE VALEUR **********/
							
							if(
								field_setted_data.value == '' ||
								field_setted_data.value == -1 ||
								field_setted_data.value == '00/00/0000'
							){		
								if(final_data_object_key2 != "formation_name" && final_data_object_key2 != "parcours_name" && final_data_object_key2 != "pathway_description"){
									alert('Tous les champs à l\'exception de la Formation, du Parcours et de la Description sont obligatoires.');
									return;
								}
							}
							
							/********** 4 = APPLICATION DE LA NOUVELLE VALEUR **********/
							
							final_data_object[final_data_object_key1]= field_setted_data.cvalue;
							final_data_object[final_data_object_key2]= items_loop_for_click[i] == 'One' ? pathways_first_select_types[field_setted_data.cvalue] : field_setted_data.value;
							
						}
			
						///////////
						/////////// MODE : EDITION
						///////////
						
						else{
							
							/********** 1 = OBJET FINAL DE LA MODIFICATION **********/
							
							var kparent_selector 		= user_profile_base.replace('path_','pathway_');
							if(final_data_object == null)final_data_object= THE_VIEWED_USER.user_pathways_CHANGES[kparent_selector];
							
							/********** 2 = CLÉS DE L'OBJET FINAL DE LA MODIFICATION **********/
							
							var final_data_object_key1= field_setted_data.destinationKey;
							var final_data_object_key2= field_setted_data.destinationKeyForDisplay;

							if(
								field_setted_data.value == '' ||
								field_setted_data.value == -1 ||
								field_setted_data.value == '00/00/0000'
							){
								if(final_data_object_key2 != "formation_name" && final_data_object_key2 != "parcours_name" && final_data_object_key2 != "pathway_description"){
									alert('Tous les champs à l\'exception de la Formation, du Parcours et de la Description sont obligatoire.');
									return;
								}
							}
							
							/********** 4 = APPLICATION DE LA NOUVELLE VALEUR **********/
							
							final_data_object[final_data_object_key1]= field_setted_data.cvalue;
							final_data_object[final_data_object_key2]= items_loop_for_click[i] == 'One' ? pathways_first_select_types[field_setted_data.cvalue] : field_setted_data.value;
							
						}
						
					}
		
					///////////
					/////////// DOM MODIFICATION > MODE : CREATION
					///////////
					
					if(field_mode == 'creation'){
						
						final_data_object.id_type	= final_data_object.pathway_type;
						final_data_object.form_type= pathways[user_profile_base]['fieldType'];
						
						//////////// SET THE pathways OBJECT keyname 
						
						final_data_object.id_pathway= 'null_'+Alloy.Globals.user_profile_new_items_counter;
						Alloy.Globals.user_profile_new_items_counter++;
						
						Alloy.Globals.Logs.llog('---------- DOM MODIFICATION > MODE : CREATION');
						Alloy.Globals.Logs.llog(final_data_object);
						
						add_a_sub_Form(final_data_object,true);
						
					}
					
					///////////
					/////////// DOM MODIFICATION > MODE : EDITION
					///////////
					
					else{
						
						final_data_object.id_type	= final_data_object.pathway_type;
						
						//////////// NO NEED TO SET THE pathways OBJECT keyname 
						
						Alloy.Globals.Logs.llog('---------- DOM MODIFICATION > MODE : EDITION');
						Alloy.Globals.Logs.llog(final_data_object);
						
						modify_a_sub_Form(final_data_object);
						
					}
					
					///////////
					/////////// POPIN CLOSE
					///////////
		
					params_back_for_the_function_herself['handler_item'].removeEventListener("click",params_back_for_the_function_herself['handler_to_remove']);
					delete params_back_for_the_function_herself['binded_value'];
					
					Alloy.Globals.Logs.aalert_close();
					
				},
				{
					items_to_add: 									alert_popin_items,
					items_required_height: 					alert_popin_container_height,
					dontRemoveEventListenerBtn2: 		true /* la fonction du bouton 2 se removera elle même son handler */
				},
				'FORM'
			);
			
		}
		
	}
			
};

function add_a_sub_Form(pathway_object,new_mode){

	//////////
	////////// DATE REFORMAT
	//////////
	
	if(pathway_object.pathway_date_to_shown.indexOf('??') > -1){
		var reformat_date 										= pathway_object.pathway_date_to_field.split('/');
		if(reformat_date.length === 3){
			pathway_object.pathway_date_to_shown= pathways_months[reformat_date[1]]+' '+reformat_date[2];
		}
	}
	
	if(pathway_object.pathway_date_from_shown.indexOf('??') > -1){
		var reformat_date 										= pathway_object.pathway_date_from_field.split('/');
		if(reformat_date.length === 3){
			pathway_object.pathway_date_from_shown= pathways_months[reformat_date[1]]+' '+reformat_date[2];
		}
	}
	
	//////////
	////////// DOM CREATON
	//////////
	
	var path_container 										= Ti.UI.createView({});
	$.addClass(path_container,'pathways_row');
	
		var edit_picto 											= Ti.UI.createImageView({
			image: "/images/writing.png",
			onClick: "attach_and_open_a_sub_Form",
			Ref: "path_"+pathway_object.id_pathway
		});
		$.addClass(edit_picto,'editable_pen_picto');
	
		var left_side_container 								= Ti.UI.createView({});
		$.addClass(left_side_container,'pathways_main_col');
		$.addClass(left_side_container,'pathways_main_col_common_vertical_1');
		$.addClass(left_side_container,'left_side_container');
	
			var side_picto 										= Ti.UI.createImageView({
				image: '/images/profilePath_'+pathway_object.form_type+'.png',
			});
			$.addClass(side_picto,'left_side_picto');
			
			left_side_container.add(side_picto);
	
		var pathways_center_separator 				= Ti.UI.createView({});
		$.addClass(pathways_center_separator,'pathways_center_separator');
	
		var pathways_main_col 							= Ti.UI.createView({});
		$.addClass(pathways_main_col,'pathways_main_col');
		$.addClass(pathways_main_col,'pathways_main_col_common_vertical_1');
		$.addClass(pathways_main_col,'center_container');
	
			var line1 												= Ti.UI.createLabel({
				text: ( pathway_object.form_type == 'pro') ? 
					pathway_object.pathway_title+" - "+pathway_object.pathway_precision+" - "+pathway_object.pathway_place : 
					( pathway_object.universite_name != null ? pathway_object.universite_name : '')+( pathway_object.diplome_name != null ? ' - '+pathway_object.diplome_name : '')+(pathway_object.formation_name != null ? ' - '+pathway_object.formation_name : '')
			});
			$.addClass(line1,'pathways-line1');
	
			var line2 												= Ti.UI.createView({});
			$.addClass(line2,'pathways-line2');
				
				var line2text 										= Ti.UI.createLabel({
					text: pathway_object.pathway_date_from_shown+" - "+pathway_object.pathway_date_to_shown
				});
				$.addClass(line2text,'pathways-line2-labl');
				
				line2.add(line2text);
				
			pathways_main_col.add(line1);
			pathways_main_col.add(line2);
		
		if(MODIFICATION_CASE)path_container.add(edit_picto);
		
		path_container.add(left_side_container);
		path_container.add(pathways_center_separator);
		path_container.add(pathways_main_col);
			
		////////// DOM SAVE FOR JUST DISPLAY CONSEQUENCES (THE HIDDEN OBJECT "Alloy.Globals.deep_referenced_items_for_a_later_control" IS ALWAYS THE REAL BASE)
		
		Alloy.Globals.deep_referenced_items_for_a_later_control["path_"+pathway_object.id_pathway+"_picto"]= side_picto;
		Alloy.Globals.deep_referenced_items_for_a_later_control["path_"+pathway_object.id_pathway+"_line1"]= line1;
		Alloy.Globals.deep_referenced_items_for_a_later_control["path_"+pathway_object.id_pathway+"_line2"]= line2text;
		Alloy.Globals.deep_referenced_items_for_a_later_control["path_"+pathway_object.id_pathway+"_lines_container"]= path_container;
		
		edit_picto.addEventListener("click", attach_and_open_a_sub_Form);
		
	////////// 
	////////// DOM INCREMENTATION
	////////// 
	
	$.parcoursEdition.add(path_container);
	
	$.parcoursContainer.dheight 						+= basePathwaysDecalage;
	$.parcoursContainer.height 						= $.parcoursContainer.dheight;
	
	$.the_scroll_view_container.height 			= $.the_scroll_view_container.height+basePathwaysDecalage;
	$.the_scroll_view_container.dheight 			= $.the_scroll_view_container.height;
	
	////////// 
	////////// DATA POPULATE for LIVE MODIFICATIONS
	////////// 
	
	prepopulate_sub_FORM_forms("path_"+pathway_object.id_pathway,pathway_object);
		
	////////// 
	////////// DATA POPULATE for later API SAVE
	////////// 
	
	if(!THE_VIEWED_USER.user_pathways_NEWONES)THE_VIEWED_USER.user_pathways_NEWONES= [base_database_ready_object];
	if(new_mode)THE_VIEWED_USER.user_pathways_NEWONES.push(base_database_ready_object);
	
	if(!THE_VIEWED_USER.user_pathways_TO_DELETE)THE_VIEWED_USER.user_pathways_TO_DELETE= [];
	
	if(!THE_VIEWED_USER.user_pathways_CHANGES)THE_VIEWED_USER.user_pathways_CHANGES= {};
	
	if(!THE_VIEWED_USER.user_pathways_CHANGES["pathway_"+pathway_object.id_pathway])THE_VIEWED_USER.user_pathways_CHANGES["pathway_"+pathway_object.id_pathway]= {
		id_pathway: pathway_object.id_pathway,		
		id_user: Alloy.Globals.THE_USER.id_user,
		id_type: pathway_object.pathway_type,
		pathway_type: pathway_object.pathway_type,
		pathway_date_from: pathway_object.pathway_date_from,
		pathway_date_to: pathway_object.pathway_date_to,
		pathway_title: pathway_object.pathway_title,
		pathway_precision: pathway_object.pathway_precision,
		pathway_place: pathway_object.pathway_place,
		pathway_description: pathway_object.pathway_description,
		pathway_id_universite: pathway_object.pathway_id_universite,
		pathway_id_diplome: pathway_object.pathway_id_diplome,
		pathway_id_formation: pathway_object.pathway_id_formation,
		pathway_id_parcours: pathway_object.pathway_id_parcours,
		universite_name: pathway_object.universite_name,
		diplome_name: pathway_object.diplome_name,
		formation_name: pathway_object.formation_name,
		parcours_name: pathway_object.parcours_name,
		form_type: pathway_object.form_type
	};
	
	////////////
	//////////// MARL THE FAVORITE PATHWAY
	////////////
	
	if(parseInt(pathway_object.pathway_is_shown) == 1){
		
		$.userParcoursRetenu.cvalue 					= pathway_object.id_pathway;
		$.userParcoursRetenu.value 					= pathway_object.form_type == 'pro' ? 
			pathway_object.pathway_title+" - "+pathway_object.pathway_precision+" - "+pathway_object.pathway_place : 
			( pathway_object.universite_name != null ? pathway_object.universite_name : '')+( pathway_object.diplome_name != null ? ' - '+pathway_object.diplome_name : '')+(pathway_object.formation_name != null ? ' - '+pathway_object.formation_name : '');
	}

};

function modify_a_sub_Form(pathway_object){
	
	if(pathway_object.pathway_date_to_field.indexOf('/') > -1){
		var reformat_date 										= pathway_object.pathway_date_to_field.split('/');
		if(reformat_date.length === 3){
			pathway_object.pathway_date_to_shown= pathways_months[reformat_date[1]]+' '+reformat_date[2];
		}
	}
	
	if(pathway_object.pathway_date_from_field.indexOf('/') > -1){
		var reformat_date 										= pathway_object.pathway_date_from_field.split('/');
		if(reformat_date.length === 3){
			pathway_object.pathway_date_from_shown= pathways_months[reformat_date[1]]+' '+reformat_date[2];
		}
	}
	
	var line1 														= ( pathway_object.form_type == 'pro') ? 
		pathway_object.pathway_title+" - "+pathway_object.pathway_precision+" - "+pathway_object.pathway_place : 
		( pathway_object.universite_name != null ? pathway_object.universite_name : '')+( pathway_object.diplome_name != null ? ' - '+pathway_object.diplome_name : '')+(pathway_object.formation_name != null ? ' - '+pathway_object.formation_name : '');
	var line2 														= pathway_object.pathway_date_from_shown+" - "+pathway_object.pathway_date_to_shown;
	var side_picto_image 									= '/images/profilePath_'+pathway_object.form_type+'.png';
	
	//////////
	////////// DOM TEXT MODIFICATION
	//////////
	
	Alloy.Globals.deep_referenced_items_for_a_later_control["path_"+pathway_object.id_pathway+"_picto"].image= side_picto_image;
	Alloy.Globals.deep_referenced_items_for_a_later_control["path_"+pathway_object.id_pathway+"_line1"].text= line1;
	Alloy.Globals.deep_referenced_items_for_a_later_control["path_"+pathway_object.id_pathway+"_line2"].text= line2;
	
	////////// 
	////////// DATA BASE MODIFICATIONS for NEXT MODIFICATIONS
	////////// 
	
	prepopulate_sub_FORM_forms("path_"+pathway_object.id_pathway,pathway_object);

};

function delete_a_sub_Form(e){

	var kparent_selector 									= e.source.rowSelector;

	if(remove_question)delete remove_question;
	
	var remove_question										= Ti.UI.createAlertDialog(
		{
			cancel: 													1,
			buttonNames: 										['Oui', 'Non'],
			message: 												'Veux-tu vraiment supprimer cet élement de ton parcours ?',
			title: 														'Parcours Swapbook'
		}
	);
	
	remove_question.addEventListener('click',function(e){
		
		remove_question.hide();
		delete remove_question;
	
		/////////////////////// ANSWER YES
		
		if (e.index === 0){
			
			////////// 
			////////// REMOVE ITEM DATA + IN DOM
			////////// 
			
			Alloy.Globals.deep_referenced_items_for_a_later_control[kparent_selector+'_lines_container'].height= 0;
			Alloy.Globals.deep_referenced_items_for_a_later_control[kparent_selector+'_lines_container'].visible= false;
			delete Alloy.Globals.deep_referenced_items_for_a_later_control[kparent_selector+'_lines_container'];
			
			if(typeof THE_VIEWED_USER.user_pathways_CHANGES[kparent_selector.replace('path_','pathway_')] != 'undefined'){
				THE_VIEWED_USER.user_pathways_TO_DELETE.push(THE_VIEWED_USER.user_pathways_CHANGES[kparent_selector.replace('path_','pathway_')].id_pathway);
				delete THE_VIEWED_USER.user_pathways_CHANGES[kparent_selector.replace('path_','pathway_')];
			}
			
			delete pathways[kparent_selector];
	
			$.parcoursContainer.dheight 						-= basePathwaysDecalage;
			$.parcoursContainer.height 						= $.parcoursContainer.dheight;
			
			$.the_scroll_view_container.height 			= $.the_scroll_view_container.dheight-basePathwaysDecalage;
	
			Alloy.Globals.Dialog.getView('alertDuoButton1').fireEvent('click');//Alloy.Globals.Logs.aalert_close();
			
		}
		
	});
	
	remove_question.show();
						
};

function pick_the_favorite_pathway(e){
	
	/*********** FOR LATER SEARCH IN DEFINED PATHWAYS ***********/
	
	Alloy.Globals.loadReloadSearchBooks_possible_custom_results_array= [];
	
	for (var path_key in THE_VIEWED_USER.user_pathways_CHANGES){
		if(path_key.indexOf('null_') > -1)continue; 												/////// exclusion des nouveaux parcours car ils n'ont pas encore d'ID en database
		var obj 														= THE_VIEWED_USER.user_pathways_CHANGES[path_key];
		obj.book_title 											= obj.form_type == 'pro' ? 
			obj.pathway_title+" - "+obj.pathway_precision+" - "+obj.pathway_place : 
			( obj.universite_name != null ? obj.universite_name : '')+( obj.diplome_name != null ? ' - '+obj.diplome_name : '')+(obj.formation_name != null ? ' - '+obj.formation_name : '');
		obj.book_key 												= path_key;
		Alloy.Globals.loadReloadSearchBooks_possible_custom_results_array.push(obj); 
	}
	
	Alloy.Globals.showSelect_BIG_or_SHORT(e);

	
};

Alloy.Globals.user_profile_retrieve_local_select_values= function(item,choice){
	
	/////////// 
	/////////// CASE 2 = BIRTHDAY DATE
	/////////// 
	
	if(item.id == 'userDateNaissance'){
	
		Alloy.Globals.Logs.llog('------ CASE 1 (ici) = BIRTHDAY DATE ------');
		Alloy.Globals.Logs.llog(JSON.stringify(item));
		Alloy.Globals.Logs.llog(choice);
		
	}
	
	/////////// 
	/////////// CASE 3 = USER CIVILITE
	/////////// 
	
	else if(item.id == 'userCivilite'){
	
		Alloy.Globals.Logs.llog('------ CASE 2 (ici) = CIVILITE ------');
		Alloy.Globals.Logs.llog(JSON.stringify(item));
		Alloy.Globals.Logs.llog(choice);
		
	}
	
};

function prepopulate_sub_FORM_forms(keyname,obj){
	
	if(!pathways[keyname]){
		
		////////
		//////// CLONE BASE FORM OBJECT
		////////
		
		pathways[keyname] 								= (JSON.parse(JSON.stringify(pathways.newval)));
		pathways[keyname].fieldTitle 				='Modification de parcours';

	}

	pathways[keyname].fieldType 					= obj.form_type;

	////////
	//////// RE-AFFECT HIDDEN & SHOWN VALUES 
	////////
	
	pathways[keyname].fieldOne.id 					= "pathway_"+obj.id_pathway+"_type";
	pathways[keyname].fieldOne.value 			= pathways_first_select[obj.id_type];
	pathways[keyname].fieldOne.cvalue 			= obj.id_type;
	pathways[keyname].fieldOne.selectCase	= 'edition';
	pathways[keyname].fieldOne.kparent 		= keyname;

	pathways[keyname].fieldTwo.id 				= "pathway_"+obj.id_pathway+"_debut";
	pathways[keyname].fieldTwo.value 			= obj.pathway_date_from_field;
	pathways[keyname].fieldTwo.cvalue			= obj.pathway_date_from;
	pathways[keyname].fieldTwo.selectCase= 'edition';
	pathways[keyname].fieldTwo.kparent 		= keyname;

	pathways[keyname].fieldThree.id 				= "pathway_"+obj.id_pathway+"_fin";
	pathways[keyname].fieldThree.value 		= obj.pathway_date_to_field;
	pathways[keyname].fieldThree.cvalue 		= obj.pathway_date_to;
	pathways[keyname].fieldThree.selectCase= 'edition';
	pathways[keyname].fieldThree.kparent		= keyname;
	
	if(obj.form_type === 'sco'){
		
		pathways[keyname].fieldFour.id 			= "pathway_"+obj.id_pathway+"_etablissement";
		pathways[keyname].fieldFour.value 		= obj.universite_name;
		pathways[keyname].fieldFour.cvalue 	= obj.pathway_id_universite;
		pathways[keyname].fieldFour.selectCase= 'edition';
		pathways[keyname].fieldFour.kparent	= keyname;
		
		pathways[keyname].fieldFive.id 			= "pathway_"+obj.id_pathway+"_diplome";
		pathways[keyname].fieldFive.value 		= obj.diplome_name;
		pathways[keyname].fieldFive.cvalue 		= obj.pathway_id_diplome;
		pathways[keyname].fieldFive.selectCase= 'edition';
		pathways[keyname].fieldFive.kparent 	= keyname;
		
		pathways[keyname].fieldSix.id 				= "pathway_"+obj.id_pathway+"_formation";
		pathways[keyname].fieldSix.value 		= obj.formation_name;
		pathways[keyname].fieldSix.cvalue		= obj.pathway_id_formation;
		pathways[keyname].fieldSix.selectCase= 'edition';
		pathways[keyname].fieldSix.kparent 	= keyname;
		
		pathways[keyname].fieldEleven.id 		= "pathway_"+obj.id_pathway+"_parcours";
		pathways[keyname].fieldEleven.value	= obj.parcours_name;
		pathways[keyname].fieldEleven.cvalue	= obj.pathway_id_parcours;
		pathways[keyname].fieldEleven.selectCase= 'edition';
		pathways[keyname].fieldEleven.kparent= keyname;
		
	}
	else{
		
		pathways[keyname].fieldSeven.id 			= "pathway_"+obj.id_pathway+"_titre";
		pathways[keyname].fieldSeven.value 	= obj.pathway_title;
		pathways[keyname].fieldSeven.cvalue	= obj.pathway_title;
		pathways[keyname].fieldSeven.selectCase= 'edition';
		pathways[keyname].fieldSeven.kparent= keyname;
		
		pathways[keyname].fieldEight.id 			= "pathway_"+obj.id_pathway+"_entreprise";
		pathways[keyname].fieldEight.value		= obj.pathway_precision;
		pathways[keyname].fieldEight.cvalue	= obj.pathway_precision;
		pathways[keyname].fieldEight.selectCase= 'edition';
		pathways[keyname].fieldEight.kparent= keyname;
		
		pathways[keyname].fieldNine.id 			= "pathway_"+obj.id_pathway+"_lieu";
		pathways[keyname].fieldNine.value 		= obj.pathway_place;
		pathways[keyname].fieldNine.cvalue 	= obj.pathway_place;
		pathways[keyname].fieldNine.selectCase= 'edition';
		pathways[keyname].fieldNine.kparent= keyname;
		
		pathways[keyname].fieldTen.id 				= "pathway_"+obj.id_pathway+"_description";
		pathways[keyname].fieldTen.value		= obj.pathway_description;
		pathways[keyname].fieldTen.cvalue		= obj.pathway_description;
		pathways[keyname].fieldTen.selectCase= 'edition';
		pathways[keyname].fieldTen.kparent	= keyname;
			
	}

};
