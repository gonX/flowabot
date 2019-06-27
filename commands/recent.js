const osu = require('../osu.js');
const helper = require('../helper.js');

module.exports = {
    command: ['recent', 'rs', 'recentpass', 'rp'],
    description: "Show recent score or pass.",
    startsWith: true,
    usage: '[username]',
    example: [
        {
            run: "recent nathan_on_osu",
            example: "Returns nathan on osu's most recent score."
        },
        {
            run: "recent3 respektive",
            example: "Returns respektive's most recent score."
        },
        {
            run: "recentpass",
            example: "Returns your most recent pass."
        }
    ],
    configRequired: ['credentials.osu_api_key'],
    call: obj => {
        return new Promise((resolve, reject) => {
            let { argv, msg, user_ign, last_beatmap } = obj;

            let recent_user = helper.getUsername(argv, msg, user_ign);

            let pass = ['recentpass', 'rp'].includes(argv[0].toLowerCase());

            let index = 1;
            let match = argv[0].match(/\d+/);
            let _index = match > 0 ? match[0] : 1;

            if(_index >= 1 && _index <= 100)
                index = _index;

            if(!recent_user){
                if(user_ign[msg.author.id] == undefined)
                    reject(helper.ignSetHelp());
                else
                    reject(helper.commandUsage('recent'));
            }else{
                osu.get_recent({user: recent_user, pass: pass, index: index}, (err, recent, ur_promise) => {
                    if(err){
                        helper.error(err);
                        reject(err);
                    }else{
                        let embed = osu.format_embed(recent);
                        helper.updateLastBeatmap(recent, msg.channel.id, last_beatmap);

                        if(ur_promise){
                            resolve({embed: embed, ur_promise: new Promise((resolve, reject) => {
                                ur_promise.then(recent => {
                                    embed = osu.format_embed(recent);
                                    resolve({embed: embed});
                                });
                            })});
                        }else{
                            resolve({embed: embed});
                        }
                    }
                });
            }
        });
    }
};
