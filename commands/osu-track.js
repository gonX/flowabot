const osu = require('../osu.js');
const helper = require('../helper.js');

module.exports = {
    command: 'osu-track',
    description: "Start tracking the specified user's osu! top plays in the current channel.",
    argsRequired: 1,
    permsRequired: ['MANAGE_MESSAGES'],
    usage: '<username> [top play limit (1-100, default 50)]',
    example: {
        run: "osu-track nathan_on_osu 50",
        result: "Start tracking nathan on osu's top 50 top plays."
    },
    configRequired: ['credentials.osu_api_key'],
    call: obj => {
        return new Promise((resolve, reject) => {
            let { argv, msg } = obj;

            let osu_name = helper.getUsername([argv[1]], msg);
            let top = 50;

            if(argv.length > 2){
                let _top = parseInt(argv[2]);
                if(_top >= 1 && _top <= 100){
                    top = _top;
                }else{
                    return false;
                    reject(helper.commandUsage('osu-track'));
                }
            }

            osu.track_user(msg.channel.id, osu_name, top, (err, message) => {
                if(err)
                    reject(err);
                else
                    resolve(message);
            });
        });
    }
};
