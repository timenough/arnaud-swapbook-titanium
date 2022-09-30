exports.title = "Confirm";

exports.message = "Are you sure?";

exports.buttonNames = [ "No", "Yes" ];

exports.confirm = function(args) {
    args = args || {};
    if (args.buttonNames) {
        args.no = args.no || args.buttonNames[0];
        args.yes = args.yes || args.buttonNames[1];
    }
    var alertDialog = Ti.UI.createAlertDialog({
        title: args.title || exports.title,
        message: args.message || exports.message,
        buttonNames: [ args.no || exports.buttonNames[0], args.yes || exports.buttonNames[1] ],
        cancel: 0
    });
    alertDialog.addEventListener("click", function(evt) {
        evt.index && args.callback && args.callback(args.evt || {});
        args = null;
    });
    alertDialog.show();
};