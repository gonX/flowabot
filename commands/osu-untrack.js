const osu = require('../osu.js');
const helper = require('../helper.js');

module.exports = {
    command: 'osu-untrack',
    description: "Stop tracking the specified user's osu! top plays in the current channel.",
    argsRequired: 1,
    permsRequired: ['MANAGE_MESSAGES'],
    usage: '<username> [top play limit (1-100, default 50)]',
    example: {
        run: "osu-untrack nathan_on_osu",
        result: "Stop tracking nathan on osu's top plays."
    },
    configRequired: ['credentials.osu_api_key'],
    call: obj => {
        return new Promise((resolve, reject) => {
            let { argv, msg } = obj;

            let osu_name = helper.getUsername([argv[1]], msg);

            osu.untrack_user(msg.channel.id, osu_name, (err, message) => {
                if(err)
                    reject(err);
                else
                    resolve(message);
            });
        });
    }
};
