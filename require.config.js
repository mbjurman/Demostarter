/*global requirejs: false */

requirejs.config({
    baseUrl: "",
    paths: {
        "pubsub": "jquery.pubsub",
        "metadata": "jquery.metadata",
    },
    shim: {
        "pubsub": {
            deps: ["jquery"]
        },
        "metadata": {
            deps: ["jquery"]
        }
    },
    waitSeconds: 60
});
