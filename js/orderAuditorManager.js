/**
 * Created by E-P on 2016/12/15.
 */
$(function () {
    (function () {
        var page1 = $(".paging-box");
        pagingInit(page1,40,37);
    })()

    //注意 这个弹出框假如说要隐藏掉了
    //就要把  body 去掉 float-box类
    $('.change-order-btn').click(function () {
        var alertNode = $('.alert-back');
        alertNode.removeClass('hidden');
        $('body').addClass('float-box');
    })

    
    //监听修改订单的时候 订单金额的变化
    // $('.alert-back .input5,.alert-back .selected-number-input').prototype(function () {
    //     alert(11111);
    // })

    $('.alert-back .input5,.alert-back .selected-number-input')
    .bind('input prototypeChange',function () {
        figurePrice();
    })
    $('.change-order-number').bind('click',function () {
        figurePrice();
    })
    
    $(document).on('click','.selected-all-box.check-box-rect',function () {
        //全选了
        var node = $('.auditor-none-manager-table .content-table-ele .selected-order .check-box-rect');
        if($(this).hasClass('active')){
            node.addClass('active');
        }else{
            node.removeClass('active');
        }
    })
    $(document).on('click','.auditor-none-manager-table .content-table-ele .selected-order .check-box-rect',
    function () {
        if(!$(this).hasClass('active')){
            $('.selected-all-box.check-box-rect').removeClass('active');
        }
    })
    $('.change-order-tab-box .tab-ele').click(function () {
        if($(this).hasClass('active')){
            return;
        }
        var idValue = $(this).attr('id');
        $(this).addClass('active');
        $(this).siblings('.tab-ele.active').removeClass('active');
        if(idValue == 'price-tab'){
            $('#price-box').removeClass('hidden');
            $('#send-box').addClass('hidden');
        }else{
            $('#price-box').addClass('hidden');
            $('#send-box').removeClass('hidden');
        }
    })

    $(document).on('click',".drop-box",function () {
        //点击事件
        if(!$(this).hasClass("selected")){
            showDropDown($(this));
        }
        return false;
    })





    
})
//计算订单价格
function figurePrice() {
    var table = $('.change-order-table');
    var allPrice = 0;
    $('.change-order-table .order-product .order-a-product').each(function () {
        var unitPrice = Number($(this).find('.change-order-unit-price').val());
        var number = Number($(this).find('.change-order-number .selected-number-input').val())
        number = Math.floor(number);
        allPrice += unitPrice*number;
    })
    var freight = Number(table.find('.change-order-freight').val());
    var adjust = Number(table.find('.change-order-adjust').val());
    allPrice += freight+adjust;
    table.find('.order-money .order-money-span').text(allPrice);
}





