# Change Log
<pre>
v5.2.0 Updated Facebook API to 4.11.0 in iOS and Android
       Support `loginBehavior` on iOS and Android [MOD-2242]
       Support new parameters in `logCustomEvent` on iOS and Android [MOD-2248]
       Support `logPurchase` on iOS and Android [MOD-2244]

v5.1.0 Updated Facebook API to 4.10.0 in iOS  [MOD-2180]
       Support for the Facebook Messenger API. [MOD-2180]
       Support for the Invite Dialog [MOD-2200]

v5.0.0 Updated Facebook API to 4.7.0 in iOS, that supports iOS9 [TIMOB-19383]
	   Updated Facebook API to 4.7.0 in Android [TIMOB-19577]

v4.0.5 fixed presentSendRequestDialog with to and title params [MOD-2126]

v4.0.4 fixed photo posting for requestWithGraphPath [TIMOB-18916]

v4.0.3 changed minsdk to 4.0.0 [mod-2119]

v4.0.2 Updated Facebook SDK from 3.21.1 to 3.23.1
       Exposed data returned on presentSendRequestDialog
       Bumped iOS module version to be same as android
	   Fixed `requestNewReadPermissions` and the `LikeButton` in Android [MOD-2105]

v4.0.1 Changing sessionDefaultAudence to audience in Android [MOD-2107]        

v4.0.0 Combined and updated the Facebook module from https://github.com/mokesmokes/titanium-android-facebook/ and https://github.com/mokesmokes/titanium-ios-facebook

v3.0.3 Adding publishInstall method. [TIMODOPEN-246]
       Built with SDK 3.4.0 to fix a bug on Android L. [TIMOB-17478]

v3.0.2 Force the authorize method to run on the main thread. [TIMOB-15770]

v3.0.1 Fixed a bug in Facebook Android SDK 3.0 that when the user cancels the login
       by pressing the "X" button, the onCancel callback is not invoked. [TIMOB-13738]

v3.0.0 Initial relocation of Facebook module into separate module