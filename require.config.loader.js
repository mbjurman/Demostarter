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

requirejs(["data-require"],
    function (dataRequire) {
        var $document = $(document);
        
        $document.ready(function () {
            dataRequire.init($document);
        });
    }
);