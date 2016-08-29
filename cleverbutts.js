/* Modules */
var fs = require( "fs" )
var Discord = require( "discord.js" );
var Cleverbot = require( "cleverbot-node" );
var cfg = require("./cfg.json")

/* Variables */
var bots = [];
var butts = [];

var aa = 0;

/* Cleverbot */
var i = 0
var callback = function callback( resp ) {
	setTimeout( function( str1, str2 ) {
        bots[ i ].startTyping( "219190092802162688" );
        butts[ i ].write( resp['message'], callback );
		bots[ i = ( ( i + 1 ) % aa ) ].sendMessage( "219190092802162688", resp['message' ] );
    }, 2500 );
	bots[ i ].stopTyping( "219190092802162688" );
};

Cleverbot.prepare( function() {
	callback( { message:cfg.startMsg } )
} );

/* Cleverbutts */
for ( var i in cfg.bots ) {
	var t = cfg.bots[ i ];
	
	bots.push( new Discord.Client() );
	butts.push( new Cleverbot );
	
	bots[ i ].on( "ready", function() {
		aa++
		console.log("[info] Bot " + i + " logged in as " + bots[i].user.name + "#" + bots[i].user.discriminator + " (" + bots[i].user.id + ")")
	} );
	
	bots[ i ].loginWithToken( cfg.bots[ i ] );
}
