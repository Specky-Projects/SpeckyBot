module.exports = {
    name: "owl",
    description: "Gives you a owl!",
    category: `sfw`,
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('owl', msg);
}
