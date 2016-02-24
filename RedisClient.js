var redis = require('redis');

var hostname = "";
var port = 80;
var password = "";

var client = redis.createClient(port, hostname, {no_ready_check: true});

client.auth(password, function (err) {
    if (err) console.log(err);
});

client.on('connect', function() {
    console.log('Connected to Redis');
});

var LENGTH = 100;

for (var i = 0; i < LENGTH; i++) {
    console.log("setting foo " + i);
    client.set("foo " + i, "bar" + i, redis.print);
}

var func = function (i) {
    client.get("foo " + i, function (err, reply) {
        if (err) {
            console.log(err);

        }
        console.log(reply.toString());
        console.timeEnd("reading foo");

    });
};

setTimeout(function() {
    for (var i = 0; i < LENGTH; i++) {
        console.time("reading foo");
        func(i);
    }
}, 1000);



// client.set("foo", "bar", redis.print);
// client.get("foo", function (err, reply) {
//     if (err) console.log(err);
//     console.log(reply.toString());
// });
