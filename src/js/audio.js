(function ($, root) {
    function audioControl() {
        this.audio = new Audio()
        this.status = 'pause'
    }

    audioControl.prototype = {
        play() {
            this.audio.play()
            this.status = 'play'
        },
        pause() {
            this.audio.pause()
            this.status = 'pause'
        },
        getAudio(src) {
            this.audio.src = src
            this.audio.load()
        },
        playTo(time){
            this.audio.currentTime = time
            this.play()
        }
    }

    root.audioControl = audioControl

})(window.Zepto, window.player)