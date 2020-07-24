// 渲染进度条
(function($,root) {
    var $scope = $(document.body)
    var curDuration
    var frameId
    var startTime
    var lastPer = 0
    // 转换时间
    function formatTime(time){
        var time = Math.round(time)
        var minute = Math.floor(time/60)
        
        var second = time-minute*60
        if(minute<10){
            minute = '0' + minute
        }
        if(second<10){
            second = '0' + second
        }
        return minute + ':' + second
    }

    function renderAllTime(duration){
        lastPer = 0
        curDuration = duration
        var allTime = formatTime(duration)
        $scope.find('.lastTime').html(allTime)
    }

    function update(percent){
        var curTime = percent * curDuration
        curTime = formatTime(curTime)
        $scope.find('.firstTime').html(curTime)
        var percentage = percent * 100 +'%'
        $scope.find('.top').css({
            'transform':'translateX('+percentage+')'
        })
    }

    function start(per){
        lastPer  = (per === undefined ? lastPer : per)

        startTime = new Date().getTime()
        function frame(){
            var curTime = new Date().getTime()
            var percent = lastPer + (curTime - startTime)/(curDuration * 1000)
            frameId = requestAnimationFrame(frame)
            update(percent)
        }
        frame()
    }

    function stop(){
        var stopTime = new Date().getTime()
        lastPer = lastPer + (stopTime - startTime)/(curDuration * 1000)
        cancelAnimationFrame(frameId)
    }

    root.process = {
        renderAllTime,
        start,
        stop,
        update
    }
    
})(window.Zepto,window.player || (window.player = {}))