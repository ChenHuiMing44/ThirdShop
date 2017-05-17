/**
 * Created by E-P on 2016/12/7.
 */


$(function () {
    //这个分页是js做的最好先ajax把两个参数获取到，然后直接运行函数 pagingInit
    (function () {
        var page1 = $(".paging-box");
        pagingInit(page1,40,40);
    })()

    $(".drop-down-box2").click(function(){
        if($(this).hasClass("selected")){

        }else{
            showDropDown($(this));
        }
        return false;
    })





})