// 实现渲染

(function($,root){
    var $scope = $(document.body)
    function renderInfo(info){
        var html = '<div class="songName">'+ info.song + '</div>' +
        '<div class="name">' +
            '<div>原唱：' + info.name + '</div>' +
            '<div>演唱：' + info.singer + '</div>' +
        '</div>'
        $scope.find('.info').html(html)
    }

    function renderImg(src){
        var img = new Image()
        img.src = src
        img.onload = function(){
            $scope.find('.img>img').attr('src',src)
        }
    }

    function renderIsLike(isLike){
        if(isLike){
            $scope.find('.like').addClass('liking')
        }else{
            $scope.find('.like').removeClass('liking')
        }
    }

    root.render = function(data){
        renderInfo(data)
        renderImg(data.image)
        renderIsLike(data.isLike)
    }

})(window.Zepto,window.player || (window.player = {}))