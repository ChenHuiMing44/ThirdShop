/**
 * Created by E-P on 2016/12/5.
 */


$(function () {
    var mySwiper = new Swiper ('.swiper-container', {
        autoplay : 5000,
        speed: 500,
        loop: true,
        onlyExternal : true,
        pagination : '.swiper-pagination',
        paginationClickable :true,
        paginationType : 'custom',
        paginationCustomRender: function (swiper, current, total) {
            var box = $("<div></div>").addClass("pagination-box2");
            for(var i=1;i <= total;i++){
                var di = $("<span></span>").addClass("pagination-ele2");
                di.attr("index",i);
                if(i == current){
                    di.addClass("active");
                }
                box.append(di);
            }
            return box;
        }
    })
    //监听 那两个 前进后退按钮的 点击事件  执行逻辑  然后 继续 开启 自动滚动
    $(".pre-btn2").click(function(){
        mySwiper.slidePrev();
        mySwiper.startAutoplay();
    })
    $(".next-btn2").click(function(){
        mySwiper.slideNext();
        mySwiper.startAutoplay();
    })
    $("body").on("click",".pagination-box2 .pagination-ele2",function(){
        if($(this).hasClass("active")){
            return;
        }
        var index = $(this).attr("index");
        mySwiper.slideTo(index, 500, false);//切换到第一个slide，速度为1秒
        mySwiper.startAutoplay();
    })

    $('.shop-operation .care-box').click(function () {
        if($(this).hasClass('active')){
            $(this).removeClass('active');
        }else{
            $(this).addClass('active');
        }
    })

    $('.top-operation-bar .top-operation-ele').click(function () {
        if($(this).hasClass('active')){
            return;
        }
        var index = $(this).attr('value');
        var parentNode = $(this).parents('.top-operation-bar');
        if(index == 1){

            $('.mall-introduce').addClass('hidden');

            $('.product-page').removeClass('hidden');
            parentNode.find('.top-operation-ele.active').removeClass('active');
            $(this).addClass('active');

        }else if(index == 2){

            $('.product-page').addClass('hidden');
            $('.mall-introduce').removeClass('hidden');
            parentNode.find('.top-operation-ele.active').removeClass('active');
            $(this).addClass('active');
        }
    })

    $('.classify2-ele-box .classify2-explain').click(function () {
        //点击展开或者缩放
        var parentNode = $(this).parents('.classify2-ele-box');
        if(parentNode.hasClass('explain')){
            //这个状态是展开状态
            parentNode.removeClass('explain');
            $(this).text('更多');
        }else{
            parentNode.addClass('explain');
            $(this).text('收起');
        }
    })
    $('.classify1-ele-box .classify1-ele').click(function () {
        //点击切换产品也上的产品分类
        var index = $(this).attr('value');
        $(this).siblings('.classify1-ele.active').removeClass('active');
        $(this).addClass('active');
        $('.classify2-ele-content .classify2-ele-box').addClass('hidden');
        var node = $('.classify2-ele-content .classify2-ele-box').eq(index);
        var contNode = node.find('.classify2-ele-group');
        if(contNode) {
            node.removeClass('hidden');
            if(contNode.height()<40){
                node.find('.classify2-explain').addClass('hidden');

            }
        }

    })

})