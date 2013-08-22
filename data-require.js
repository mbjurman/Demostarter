define(
    [
        "jquery"
    ],
    
    function ($) {

        "use strict";

        var dataRequireModules = [];

        if (!Array.indexOf) {
            Array.prototype.indexOf = function (obj, start) {
                for (var i = (start || 0); i < this.length; i++) {
                    if (this[i] === obj) {
                        return i;
                    }
                }
                return -1;
            };
        }

        function hasDataRequireAttribute($elm) {
            var dataAttr = $elm.attr("data-require");
            return typeof dataAttr !== 'undefined' && dataAttr !== false;
        }
        
        function initRequiredModules(el) {

            var $el = $(el),
                modulesToRequire = $el.attr("data-require"),
                modules = modulesToRequire.split(' ');

            require(modules, function () {
                var i;

                for (i = 0; i < arguments.length; i++) {
                    dataRequireModules.push(arguments[i].init.apply(el));
                }
            });
        }

        function getElementsWithDataRequireAttribute($data) {
            var elements = [];

            $data.each(function () {
                if (hasDataRequireAttribute($(this))) {
                    elements.push(this);
                }
            });

            $data.find('[data-require]').each(function () {
                elements.push(this);
            });

            return elements;
        }

        function initDataRequire($data) {
            var elements = getElementsWithDataRequireAttribute($data);

            var i;
            for (i = 0; i < elements.length; i++) {
                initRequiredModules(elements[i], function (e) {
                    elements.splice(elements.indexOf(e), 1);
                });
            }
        }

        function init($data) {
            initDataRequire($data);
        }

        function dispose() {
            var length = dataRequireModules.length;
            
            while (length--) {

                if (dataRequireModules[length] !== undefined && dataRequireModules[length] !== null && typeof dataRequireModules[length].dispose === "function") {
                    dataRequireModules[length].dispose();
                }
                
                dataRequireModules.splice(length, 1);
            }
        }

        return {
            init: init,
            dispose: dispose
        };
    }
);