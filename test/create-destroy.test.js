var test = require('tap').test;
var format = require('util').format;
var dtest = require('./dtrace-test').dtraceTest;

test(
    'creating and destroying a provider',
    dtest(
        function() { },
        [
            'dtrace', '-Zqn',
            'nodeapp*:::{ printf("%d\\n", arg0); }',
            '-c', format('node %s/create-destroy_fire.js', __dirname)
        ],
        function(t, exit_code, traces) {
            t.notOk(exit_code, 'dtrace exited cleanly');
            t.equal(traces.length, 10);
            traces.sort(function(a, b) { return a - b });
            for (var i = 0; i < 10; i++) {
                t.equal(traces[i], [i].toString());
            }
        }
    )
);
