var $ = window.Zepto
var root = window.player
var $scope = $(document.body)
var audio = new root.audioControl()

var index
var songList

function bindEvent() {
    $scope.on('play:change',function(event,index){
        audio.getAudio(songList[index].audio)
        if(audio.status == 'play'){
            audio.play()
            root.process.start()
        }
        root.process.renderAllTime(songList[index].duration)
        root.render(songList[index])
        root.process.update(0)
    })

    $scope.on('click','.left',function() {
        // if(index === 0){
        //     index = songList.length-1
        // }else{
        //     index--
        // }
        index = control.left()
        $scope.trigger('play:change',index)
    })
    $scope.on('click','.right',function() {
        // if(index === songList.length-1){
        //     index = 0
        // }else{
        //     index++
        // }
        index = control.right()
        $scope.trigger('play:change',index)
    })
    $scope.on('click','.cur',function(){
        if(audio.status == 'play'){
            audio.pause()
            root.process.stop()
        }else{
            audio.play()
            root.process.start()
        }
        $(this).toggleClass('pause')
    })

    $scope.on('click','.list',function(){
        var $news = $scope.find('.news')
        $news.css('display','block')
    })
    $scope.on('click','.ding>span',function(){
        var $news = $scope.find('.news')
        $news.css('display','none')
    })
}

function bindTouch(){
    var $point = $scope.find('.point')
    var offset = $scope.find('.pro-wrapper').offset()
    var left = offset.left
    var width = offset.width
    $point.on('touchstart',function(){
        root.process.stop()
    }).on('touchmove',function(e){
        var x = e.changedTouches[0].clientX
        var per = (x - left) / width
        if(per<0 || per>1){
            per=0
        }
        root.process.update(per)
    }).on('touchend',function(e){
        var x = e.changedTouches[0].clientX
        var per = (x - left) / width
        var curduration = songList[control.index].duration
        var curTime = per*curduration
        audio.playTo(curTime)
        root.process.start(per)
        $scope.find('.cur').addClass('pause')
    })
}


function getData(url){
    $.ajax({
        type:'GET',
        url:url,
        dataType: 'json',
        success:function(data){
           root.render(data[0])
           songList = data
           bindEvent()
           control = new root.control(data.length,0)
           $scope.trigger('play:change',0)
           bindTouch()
        },
        error:function(){

        }
    })
}

getData('../mock/data.json')