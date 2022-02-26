module.exports = {
    name: "createinvite",
    description: "Creates an invite to a server and deletes it when you join.",
    usage: `<guildID>`,
    category: "owner",
    aliases: ["ci"]
}

module.exports.run = async (bot, msg) => {
    function send(invite, generated){
        const string = `Here's server link ;) (${generated ? 'new' : 'old'} invite)`;
        return msg.author.send(`${string}\n${invite}`)
        .catch(() => msg.channel.send(`${string}\n${invite}`));
    }

    const guildID = msg.args[0];
    if(!guildID) return bot.cmdError("No GuildID provided");

    const guild = bot.guilds.cache.get(guildID);
    if(!guild) return bot.cmdError(`${guildID} is not a valid guild`);
    if(!guild.me.permissions.has(1n)) return bot.cmdError("Bot doesn't have the permissions on that guild");

    const invites = await guild.fetchInvites().catch(()=>{});
    if(invites && invites.size) return send(invites.random(), false);

    const channel = guild.channels.cache.filter(c => c.type == "text").random();
    const invite = await channel.createInvite({maxUses: 1, maxAge: 150, unique: true});
    return send(invite, true);
}
