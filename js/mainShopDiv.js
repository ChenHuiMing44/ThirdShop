/**
 * Created by E-P on 2016/12/2.
 */
$(function () {
    var mySwiper = new Swiper ('.swiper-container', {
        autoplay : 10000,
        autoplayStopOnLast : false,//最后一个 自动停止
        speed: 500,
        // loop: true,
        onlyExternal : true,
        pagination : '.swiper-pagination',
        // autoplayDisableOnInteraction : false,
        paginationType : 'custom',
    })
    if(mySwiper.slides.length==1){
        mySwiper.autoplayStopOnLast = true;
        $('.recommend-bottom .btn-pro').addClass('hidden');
        $(".recommend-bottom .btn-next").addClass('hidden');
    }
    $(".btn-pro").click(function(){
        mySwiper.slidePrev();
    })
    $(".btn-next").click(function(){
        mySwiper.slideNext();
    })

})