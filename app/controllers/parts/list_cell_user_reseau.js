var args 													= arguments[0] || {};

function seeProfile(e){
	
	Alloy.Globals.preventDoubleClick(this);

	////////Alloy.Globals.Logs.llog(e);
	////////Ti.API.info(JSON.stringify(e.source));
	
	Alloy.Globals.app.goTo("page_3_a_1_user_profile", {id_user: e.source.user_id});
	
};

function gotoChat(e){
	
	Alloy.Globals.preventDoubleClick(this);

	Alloy.Globals.Network_tableView_MODE= 'RESEAU';
	
	Alloy.Globals.openConversationBetween(
		e.source.base_user_id,
		e.source.user_id
	);
	
};