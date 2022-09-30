/********* APP & USER ARE READY (important for the next) *********/

Alloy.Globals.app_and_user_ready 									= true;
Alloy.Globals.userField 													= $.bUsername;
Alloy.Globals.passField 													= $.bPassword;
Alloy.Globals.signin_button 												= $.signinButton;
Alloy.Globals.signup_button 											= $.signupButton;
Alloy.Globals.password_lost 											= $.PassLoss;
Alloy.Globals.navigationDefault 										= $.navigationDefault;
	
Alloy.Globals.navigationDefault.open();

/******** ON OPEN & FOCUS *******/

$.window.addEventListener("focus",function(e) {

	Alloy.Globals.Logs.llog('');
	Alloy.Globals.Logs.llog('-----> FOCUS ON ROOT PAGE (index.js)');
	Alloy.Globals.Logs.llog('');

	Alloy.Globals.userField 												= $.bUsername;
	Alloy.Globals.passField 												= $.bPassword;
			
    Alloy.Globals.Dialog                          							= $.AlertDialog;
	
});

/******** STYLIZE LOGIN FORM *******/

var emailHintText1 															= $.bUsername.xtitle;
var attributedEmailHintText1 											= Ti.UI.createAttributedString({
	text : emailHintText1,
	attributes : [{
		type : Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
		range : [0, emailHintText1.length],
		value : '#ffffff',
	}]
});

var emailHintText2 															= $.bPassword.xtitle;
var attributedEmailHintText2 											= Ti.UI.createAttributedString({
	text : emailHintText2,
	attributes : [{
		type : Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
		range : [0, emailHintText2.length],
		value : '#ffffff',
	}]
});

$.bUsername.setAttributedHintText(attributedEmailHintText1);
$.bPassword.setAttributedHintText(attributedEmailHintText2);

var terms_text 																	= $.PassLoss.titleA;
Alloy.Globals.password_lost_underlined						= Ti.UI.createAttributedString({
	text : terms_text,
	attributes : [{
		type : Ti.UI.ATTRIBUTE_UNDERLINES_STYLE,
		range : [0, terms_text.length],
		value : Ti.UI.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
	}]
});

$.PassLoss.setAttributedString(Alloy.Globals.password_lost_underlined);

/******** BIND LOGIN FORM CLICKS *******/

Alloy.Globals.SignIn.Ready('signin_click',$.signinButton);
Alloy.Globals.SignUp.Ready('signup_open',$.signupButton);
Alloy.Globals.SignIn.Ready('password_lost',$.PassLoss);

/******** USER LOGGED IN CHECK *******/

Alloy.Globals.SignedIn.Ready(null,null);