var Cleverbot = require('cleverbot-node');
var Discordbot = require("discord.js");
var fs = require("fs")
var config = require("./config.json")
var availableAccounts = 0
var DBots = [new Discordbot.Client(),new Discordbot.Client(),new Discordbot.Client(),new Discordbot.Client(),new Discordbot.Client()]
var CBots = [new Cleverbot,new Cleverbot,new Cleverbot,new Cleverbot,new Cleverbot]
  , i = 0
  , callback = function callback(resp){
      setTimeout(function(str1, str2) {
        DBots[i].startTyping(config.botChannel);
        CBots[i].write(resp['message'],callback);
        DBots[i = ( ( i + 1 ) % availableAccounts)].sendMessage(config.botChannel, resp['message']);
      }, 2500);
      DBots[i].stopTyping(config.botChannel);
    };

Cleverbot.prepare(function(){
  callback({message:thing})
});

var things = config.startMessages

var thing = things[Math.floor(Math.random()*things.length)];

for ( var i in DBots ) {
	DBots[ i ].on( "ready", function() {
		availableAccounts++
		console.log("[info] Bot " + i + " logged in as " + DBots[i].user.name + "#" + DBots[i].user.discriminator + " (" + DBots[i].user.id + ")")
	} );
}

DBots[0].loginWithToken(config.bot1);
DBots[1].loginWithToken(config.bot2);
DBots[2].loginWithToken(config.bot3);
DBots[3].loginWithToken(config.bot4);
DBots[4].loginWithToken(config.bot5);
