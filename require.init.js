define(
    [
        "jquery",
        "metadata",
        "pubsub"
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
        
        function dispose(callback) {

            var length = dataRequireModules.length;
            
            while (length--) {

                if (dataRequireModules[length] !== undefined && dataRequireModules[length] !== null && typeof dataRequireModules[length].dispose === "function") {
                    dataRequireModules[length].dispose();
                }
                
                dataRequireModules.splice(length, 1);
            }

            callback();
        }

        function initRequiredModules(el, callback) {

            var $el = $(el),
                modulesToRequire = $el.attr("data-require"),
                modules = modulesToRequire.split(' ');

            require(modules, function () {
                var i;

                for (i = 0; i < arguments.length; i++) {
                    dataRequireModules.push(arguments[i].init.apply(el));
                }
                
                callback(el);
            });
        }

        function initDataClickEvent($data) {
            $data.on("click", "[data-click-event]", function (event) {
                var $me = $(this);
                var meta = $me.metadata();
                if (meta.preventDefaultAction) {
                    event.preventDefault();
                }

                $.publish($me.attr("data-click-event"), [$me.metadata()]);
            });
        }

        function initDataFocusEvent($data) {
            $data.on("submit", "[data-focus-event]", function () {

                var $me = $(this);
                $.publish($me.attr("data-focus-event"), [$me.metadata()]);
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

        function initDataRequire($data, callback) {

            var elements = getElementsWithDataRequireAttribute($data);

            if (elements.length === 0) {
                callback();
            }

            var i;
            for (i = 0; i < elements.length; i++) {
                initRequiredModules(elements[i], function (e) {
                    elements.splice(elements.indexOf(e), 1);

                    if (elements.length === 0) {
                        callback();
                    }
                });
            }
        }

        function init($data, callback) {
            initDataRequire($data, function () {
                initDataClickEvent($data);
                initDataFocusEvent($data);

                if (callback !== undefined) {
                    callback();
                }
            });
        }

        return {
            init: init,
            dispose: dispose
        };
    }
);