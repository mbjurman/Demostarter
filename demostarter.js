define(
    [
        "jquery"
    ],
    function($) {

        function Demostarter(el) {
            var me = this;
            me.$el = $(el);
        
            me.context = new webkitAudioContext();
            me.wavebox = new SpectrumBox(2048, 1000, "wavebox", me.context);
            me.wavebox.setType(SpectrumBox.Types.TIME);
            me.wavebox.getCanvasContext().fillStyle = "black";

            me.audio = $(".audio-player");
            me.audio.on("timeupdate", function() {
                me.updateTrackTime(this);
            });

            window.addEventListener('load', function() {
                me.play();
            }, false); 
        }

        Demostarter.prototype.init = function() {
            var me = this;

            return me;
        };

        Demostarter.prototype.dispose = function() {
        };

        Demostarter.prototype.formatSecondsAsTime = function(secs, format) {
            var hr  = Math.floor(secs / 3600);
            var min = Math.floor((secs - (hr * 3600))/60);
            var sec = Math.floor(secs - (hr * 3600) -  (min * 60));

            if (min < 10) { 
                min = "0" + min; 
            }
            if (sec < 10) { 
                sec  = "0" + sec;
            }

            return min + ':' + sec;
        }

        Demostarter.prototype.updateTrackTime = function(track) {
            var currTimeDiv = this.$el.find(".timer");

            var currTime = Math.floor(track.currentTime).toString(); 
            var duration = Math.floor(track.duration).toString();

            currTimeDiv.html(this.formatSecondsAsTime(duration-currTime));
        }

        Demostarter.prototype.play = function() {
            var me = this;
            var audioSource = me.context.createMediaElementSource(me.audio.get(0));
            audioSource.connect(me.context.destination);

            var wavenode = me.wavebox.getAudioNode();
            audioSource.connect(wavenode);
            wavenode.connect(me.context.destination);
            me.wavebox.enable();
        }

        Demostarter.prototype.stop = function() {
            var me = this;
            me.wavebox.disable();
            me.audio.getSource().disconnect();
        }


        function init() {
            return new Demostarter(this).init();
        }

        return {
            init: init
        };
    }
);