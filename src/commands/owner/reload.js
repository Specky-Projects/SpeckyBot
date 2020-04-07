module.exports = {
    name: "reload",
    description: "The bot will reload a specific handler!",
    usage: `<handler>`,
    category: `owner`,
    accessableby: "Bot Owner",
    aliases: ["rld","rl"]
}

module.exports.run = async (bot, msg) => {
    let { args } = msg;
    if(!args[0]) return msg.channel.send("You have to define an handler to reload");
    const begin = new Date();

    const cmddir = `../handlers/commands.js`;
    const eventdir = `../handlers/events.js`;
    const consdir = `../handlers/console.js`;

    try{
        switch(args[0]){
            case "all":
                bot.require(eventdir)(bot);
                bot.require(cmddir)(bot);
                bot.require(consdir)(bot); break;
            case "commands":
            case "command":
            case "cmds":
            case "cmd":
                bot.require(cmddir)(bot); break;
            case "events":
            case "event":
            case "evnts":
            case "evnt":
                bot.require(eventdir)(bot); break;
            case "console":
            case "cons":
                bot.require(consdir)(bot); break;
            default:
                return bot.cmdError("Module to reload is invalid");
        }
    }catch(e){
        console.log(`ERROR: ${e.message}`);
        return
    }
    const end = new Date();
    const diff = end - begin;
    msg.channel.send(`**${args[0]}** got reloaded! (${diff}ms)`).catch();
}
