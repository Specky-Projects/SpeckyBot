module.exports = {
    name: "cloneroles",
    description: "Clones the roles from one user to another one!",
    usage: `<userMention> <userMention>`,
    category: "admin",
    aliases: ["cr"],
    userPerms: 268435456n,
    botPerms: 268435456n
}

module.exports.run = async (bot, msg) => {
    const { args } = msg;
    if(!args[1]){
        msg.channel.send("You have to mention 2 users to clone roles (1st => 2nd)");
        return;
    }

    let q = 0;
    const usrs = [];

    await msg.mentions.users.forEach(user => {
        usrs[q] = user;
        q++
    })

    usrs.reverse()

    let memb1;
    let memb2;

    await msg.guild.members.fetch(usrs[0]).then(usr => memb1 = usr).catch(()=>{})
    await msg.guild.members.fetch(usrs[1]).then(usr => memb2 = usr).catch(()=>{})

    // msg.channel.send(`Missing permissions or user doesn't exist`);

    await memb1.roles.cache.forEach(async role => {
        if(!memb2.roles.cache.hasOwnProperty(role)){
            await memb2.roles.add(role.id).catch(()=>{})
        }
    })

    await memb2.roles.cache.forEach(async role => {
        if(memb1.roles.cache.hasOwnProperty(role)){
            await memb2.roles.remove(role.id).catch(()=>{})
        }
    })
}
