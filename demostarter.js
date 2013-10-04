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

            me.$audio = me.$el.find(".audio-player");
            me.$timer = this.$el.find(".timer");
        }

        Demostarter.prototype.init = function() {
            var me = this;

            me.$audio.on("timeupdate", function() {
                me.updateTrackTime(this);
            });

            $(window).on("load", function() {
                me.play();
            });

            return me;
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
            var currTime = Math.floor(track.currentTime).toString(); 
            var duration = Math.floor(track.duration).toString();
            var remaining = duration-currTime;
            
            if (remaining < 12) {
                this.$timer.addClass("glow");
            } 
            else {
                this.$timer.removeClass("glow");
            }
            
            this.$timer.html(this.formatSecondsAsTime(remaining));
        }

        Demostarter.prototype.play = function() {
            var audioSource = this.context.createMediaElementSource(this.$audio.get(0));
            audioSource.connect(this.context.destination);

            var wavenode = this.wavebox.getAudioNode();
            audioSource.connect(wavenode);
            wavenode.connect(this.context.destination);
            this.wavebox.enable();
        }

        Demostarter.prototype.stop = function() {
            this.wavebox.disable();
            this.$audio.getSource().disconnect();
        }

        Demostarter.prototype.dispose = function() {
            this.$audio.off();
        };

        function init() {
            return new Demostarter(this).init();
        }

        return {
            init: init
        };
    }
);