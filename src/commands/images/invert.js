module.exports = {
    name: "invert",
    description: "Invert the color of the image!",
    category: `images`,
    aliases: []
}

module.exports.run = async (bot, msg) => {
    return require('.\\functions\\methods')(bot, msg,'invert',false,false,"png");
}
