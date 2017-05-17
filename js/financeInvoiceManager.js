/**
 * Created by E-P on 2017/1/9.
 */
$(function () {
    (function () {
        var page1 = $(".paging-box");
        pagingInit(page1,40,40);
    })()
    //这个是 点击那个开票按钮  需要 在这里做点操作
    $('.invoice-manager-table .operation .billing-btn').click(function () {
        $('body').addClass('float-box');
        $('.alert-back').removeClass('hidden');
    })
    $('.invoice-record-manager-table .operation button.voucher-btn').click(function () {
        var node = $(this).siblings('.tool-box');
        if(node.hasClass('hidden')){
            node.removeClass('hidden')
        }else{
            node.addClass('hidden');
        }
    })

    $('.invoice-record-manager-table .operation .tool-box .tool-content-delete').click(function () {
        var node = $(this).parents('.tool-box');
        node.addClass('hidden');
    })

    $('.alert-selected-bar .alert-selected-ele').click(function () {
        if($(this).hasClass('selected')){
            return;
        }
        $('.selected-content.selected').removeClass('selected');
        $('.alert-selected-ele.selected').removeClass('selected');
        $(this).addClass('selected');
        var idValue = $(this).attr('val');
        if(idValue == 1 ){
            $('#selected-content-one').addClass('selected');
        }else{
            $('#selected-content-two').addClass('selected');
        }
    })


})