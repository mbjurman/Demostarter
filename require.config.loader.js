/*global requirejs: false */

requirejs(["require.config", "require.startpoint"],
    function (config, startpoint) {
        startpoint.init();
    }
);