/*global requirejs: false */

requirejs.config({
    baseUrl: "",
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