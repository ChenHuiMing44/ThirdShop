/**
 * Created by E-P on 2016/12/30.
 */

$(function () {
    (function () {
        var page1 = $(".paging-box");
        pagingInit(page1,40,40);
    })()

    $('button.change-quota').click(function () {
        var alertNode = $('.alert-back');
        alertNode.removeClass('hidden');
        $('body').addClass('float-box');
    })

    //点击弹出框的取消按钮
    $('.alert-back .alert-cancel-btn').click(function () {
        $(this).parents('.alert-back').addClass('hidden');
        $('body').removeClass('float-box');
    })

})

