var logger = function (name, level) {

    var map = {
        'DEBUG' : 0,
        'INFO' : 1,
        'WARN' : 2,
        'ERROR' : 3,
        'FATAL' : 4,
    };

    var logLevel = level;

    return {

        setLevel: function (level) {
            if (map[level] != undefined) {
                logLevel = level;
            }
        },

        dump: function (msg, level = 'DEBUG') {
            var timeStr = new Date().toISOString();
            //var msg = '[' + level + '][' + timeStr + ']['+ name + '] ' + msg.toString();
            return msg;
        },

        debug: function (str) {
            if (map['DEBUG'] >= map[logLevel]) {
                console.log(this.dump(str, 'DEBUG'));
            }
        },

        info: function (str) {
            if (map['INFO'] >= map[logLevel]) {
                console.info(this.dump(str, 'INFO'));
            }
        },
        warn: function (str) {
            if (map['WARN'] >= map[logLevel]) {
                console.warn(this.dump(str, 'WARN'));
            }
        },
        error: function (str) {
            if (map['ERROR'] >= map[logLevel]) {
                console.error(this.dump(str, 'ERROR'));
            }
        },
        fatal: function(str){
            if (map['FATAL'] >= map[logLevel]) {
                console.error(this.dump(str, 'FATAL'));
            }
        }
    }
};

var instance = [];

module.exports = {

    getLogger: function (name, level='DEBUG') {
        if (instance[name]) return instance[name];
        instance[name] = new logger(name, level);
        return instance[name];
    }

};