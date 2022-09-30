var args 															= arguments[0] || {};
var currentUserName 									= Alloy.Globals.THE_USER.user_prenom+' '+Alloy.Globals.THE_USER.user_nom;
var currentUserImg 										= JSON.parse(Alloy.Globals.THE_USER.user_photos_url_json);
var currentUserPonctuation1 						= Alloy.Globals.THE_USER.user_civilite == 'M' ? 'le' : 'la';
var currentUserPonctuation2 						= Alloy.Globals.THE_USER.user_civilite == 'M' ? '' : 'e';
var currentUserPonctuation3 						= Alloy.Globals.THE_USER.user_civilite == 'M' ? 'ton' : 'ta';

function seeProfile(e){
	
	Alloy.Globals.preventDoubleClick(this);

	////////Alloy.Globals.Logs.llog(e);
	////////Ti.API.info(JSON.stringify(e.source));
	
	Alloy.Globals.app.goTo("page_3_a_1_user_profile", {id_user: e.source.user_id});
	
};

function addFriend(e){
	
	Alloy.Globals.preventDoubleClick(this);

	////////Alloy.Globals.Logs.llog(e);
	////////Ti.API.info(JSON.stringify(e.source));
	
	if(e.source.user_id == 'done')return;

	///////// POP-IN
	
	Alloy.Globals.Logs.aalert(
		'DÉVELOPPES TON RÉSEAU',
		'Tu t\'apprêtes à ajouter '+e.source.user_prenom+' à ton réseau.',
		'Es-tu sûr'+currentUserPonctuation2+' de vouloir continuer ?',
		'ANNULER',
		null,
		'CONFIRMER',
		Alloy.Globals._add_Friend_PROCESSfunction_1,
		{
			cell:												e,
    		id_user: 										e.source.user_id,
    		base_user_id: 							e.source.base_user_id,
    		base_user_push_message: 		currentUserName+' souhaite faire partie de ton réseau',
			base_user_push_image:			currentUserImg.current,
			base_user_nom_prenom:			currentUserName
		},
		false
	);
	
};

function addGodfather(e){
	
	Alloy.Globals.preventDoubleClick(this);

	////////Alloy.Globals.Logs.llog(e);
	////////Ti.API.info(JSON.stringify(e.source));
	
	if(e.source.user_id == 'done')return;

	///////// POP-IN
	
	Alloy.Globals.Logs.aalert(
		'CONFIRMATION',
		'Es-tu sûr'+currentUserPonctuation2+' de vouloir être '+currentUserPonctuation1+' filleul'+currentUserPonctuation2+' de '+e.source.user_prenom+' ?',
		'',
		'NON',
		null,
		'OUI',
		Alloy.Globals._add_Godfather_PROCESSfunction_1,
		{
			cell:												e,
    		id_user: 										e.source.user_id,
    		base_user_id: 							e.source.base_user_id,
    		base_user_push_message: 		currentUserName+' souhaite être '+currentUserPonctuation3+' filleul'+currentUserPonctuation2,
			base_user_push_image:			currentUserImg.current,
			base_user_nom_prenom:			currentUserName
		},
		false
	);
	
};