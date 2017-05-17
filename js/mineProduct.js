/**
 * Created by E-P on 2016/12/7.
 */



$(function () {

    (function () {
        var page1 = $(".paging-box");
        pagingInit(page1,40,40,'http://imow.com.cn/Product/List?c=008&o=0&p=');
    })();
    $(".drop-down-box2").click(function(){
        if($(this).hasClass("selected")){

        }else{
            showDropDown($(this));
        }
        return false;
    })

    $(document).on('click','.edit-box .check-box-round.edit-selected-all',function(){
        //因为前面那效果是on 监听的，优先度比较低，故而这个地方也用on监听
        //这个监听不是为了点击的效果，点击的效果在default.js里面已经监听了
        //这个监听只是为了事件

        if($(this).hasClass('active')){
            //全选状态
            $('.edit-right-ele .choice-model-ele .check-box-round').addClass('active');

        }else{
            //全选状态消除
            $('.edit-right-ele .choice-model-ele .check-box-round').removeClass('active');
        }
    })

    $(document).on('click','.edit-right-ele .choice-model-ele .check-box-round',function () {

        if(!$(this).hasClass('active')){
            $('.edit-box .check-box-round.edit-selected-all').removeClass('active');
        }
    })

    $('.manage-table .edit-mine-product-btn').click(function () {
        $('.alert-back').removeClass('hidden');
        $('body').addClass('float-box');
    })

})