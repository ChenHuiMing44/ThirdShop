/**
 * Created by E-P on 2016/12/16.
 */

$(function () {
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

    //点击 X的 事件





})



