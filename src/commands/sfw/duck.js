module.exports = {
    name: "duck",
    description: "Gives you a duck!",
    category: `sfw`,
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('duck', msg);
}
