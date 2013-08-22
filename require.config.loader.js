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

requirejs(["require.init"],
    function (requireInit) {
        var $document = $(document);
        
        $document.ready(function () {
            requireInit.init($document);
        });
    }
);