(function($,root) {
    function control(len,index){
        this.index = index
        this.len = len
    }

    control.prototype = {
        left(){
            return this.getIndex(-1)
        },
        right(){
            return this.getIndex(1)
        },
        getIndex(val){
            var index = this.index
            var len = this.len
            var currentIndex = (index + len + val)%len
            this.index = currentIndex
            return currentIndex
        }
    }

    root.control = control
    
})(window.Zepto,window.player || (window.player = {}))