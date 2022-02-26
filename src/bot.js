const { Client, Intents: { FLAGS } } = require('discord.js');
const { join } = require('path');

const summon = async (bot) => {
    if(process.cwd() != __dirname) process.chdir(__dirname);

    if(bot && typeof bot.destroy == 'function') await bot.destroy();

    bot = new Client({
        autoReconnect: true,
        messageCacheMaxSize: 10000,
        messageCacheLifetime: 86400,
        messageSweepInterval: 60,
        retryLimit: 5,
        allowedMentions: {
            parse: [
                'users',
            ],
        },
        intents: [
            FLAGS.GUILDS,
            FLAGS.GUILD_MESSAGES,
            FLAGS.GUILD_VOICE_STATES,
            FLAGS.GUILD_MESSAGE_TYPING,
            FLAGS.GUILD_MESSAGE_REACTIONS
        ]
    })

    return require(join(__dirname,'generalhandler'))(bot);
}

module.exports = summon;

if(module.children.length <= 1) summon();
