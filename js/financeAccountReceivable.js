/**
 * Created by E-P on 2017/1/5.
 */

$(function () {
    $('.account-table-ele .account-detail-btn').click(function () {
        //某个月的账单查看详情
        var eleNode = $(this).parents('.account-table-ele');
        var bottomNode = eleNode.children('.ele-bottom');
        if($(this).hasClass('active')){
            // bottomNode.addClass('hidden');
            $(this).removeClass('active').text('展开详情');
            bottomNode.slideToggle();
        }else {
            // bottomNode.removeClass('hidden');
            $(this).addClass('active').text('收起');
            bottomNode.slideToggle();
        }
    })

    $('#account-receiv-btn').click(function () {
        $('.alert-back').removeClass('hidden');
        $('body').addClass('float-box');
    })


})


