module.exports = {
    name: "yuri",
    description: "Gives you yuris!",
    category: `nsfw`,
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')(["yuri","eroYuri"],msg);
}
