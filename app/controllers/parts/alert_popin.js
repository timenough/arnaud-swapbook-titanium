var args 												= arguments[0] || {};

delete Alloy.Globals.offLinePopin;
delete Alloy.Globals.offLinePopin_img;
delete Alloy.Globals.offLinePopin_labl;
delete Alloy.Globals.offLinePopin_labl2;

Alloy.Globals.offLinePopin				= $.offline_screen;
Alloy.Globals.offLinePopin_img		= $.offline_img;
Alloy.Globals.offLinePopin_labl		= $.offline_labl;
Alloy.Globals.offLinePopin_labl2		= $.offline_labl2;