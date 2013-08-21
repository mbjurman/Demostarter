/*global define: false */

define(
    [
        "jquery",
        "require.init",
    ],
    
    function ($, requireInit) {
        function init() {
            var $document = $(document);
            
            $document.ready(function () {
                requireInit.init($document);
            });
        }
        
        return { init: init };
    }
);
