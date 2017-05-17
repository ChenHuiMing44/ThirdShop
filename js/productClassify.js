/**
 * Created by E-P on 2016/12/7.
 */

$(function () {
    $(document).on('click','.move .move-down',function () {
        var parentNode = $(this).parents('.product-classify-ele');
        var index = parentNode.index();
        var nextNode = parentNode.next();
        if(index>=$('.product-classify-ele').length-1) {
            return;
        }
        parentNode.remove();
        parentNode.insertAfter(nextNode);
    })
    $(document).on('click','.move .move-up',function () {
        var parentNode = $(this).parents('.product-classify-ele');
        var index = parentNode.index();
        if(index<=0){
            return;
        }
        var prevNode = parentNode.prev();
        parentNode.remove();
        parentNode.insertBefore(prevNode);
        // parentNode.animate({
        //     height:'0px'
        // },0,function () {
        //     $(this).remove();
        //     $(this).insertBefore(prevNode);
        //     $(this).animate({height:'56px'},0);
        // })
    })
    $(document).on('click','.operation button',function () {
        var parentNode = $(this).parents('.product-classify-ele');
        var index = parentNode.index();
        parentNode.animate({height:'0px'},400,function () {parentNode.remove();});
    })
    $('.add-classify-btn').click(function () {
        var date = new Date();
        var year = date.getFullYear();
        var month = ''+(date.getMonth()+1)>10?(date.getMonth()+1):("0"+(date.getMonth()+1));
        var day = '' + date.getDate()>10?date.getDate():'0'+date.getDate();
        var timeStr = year + '-' + month + '-' +day;
        var nodeStr = '<div class="product-classify-ele">' +
            '<div class="productClassify">'+
            '<input class="input2" type="text" value="" placeholder="输入分类..."/>'+
            '<div class="display-table-btn"></div>'+
            '</div>'+
            '<div class="move">'+
            '<div class="move-up"></div>'+
            '<div class="move-down"></div>'+
            '</div>'+
            '<div class="creat-time">'+
            timeStr +
            '</div>'  +
            '<div class="operation"><button class="none-back-btn">删除</button></div>'  +
            '<table class="product-classify-subtable">'+
            '<tr class="table-bottom-tr">'+
            '<td><button class="redback-btn1 add-subclassify-btn">+添加子分类</button></td>'+
            '</tr>'+
            '</table>'+
            '</div>'
            ;
        $(nodeStr).insertBefore($(this));
    })

    //展开收缩 子级目录
    $(document).on('click',
        '.product-classify-ele .productClassify .display-table-btn',
        function () {
        var parentNode = $(this).parents('.product-classify-ele')
        if(parentNode.hasClass('active')){
            parentNode.removeClass('active');
        }else{
            parentNode.addClass('active');
        }
    })
    //添加子级元素
    $(document).on('click',
    '.product-classify-ele .product-classify-subtable .table-bottom-tr .add-subclassify-btn',
    function () {
        var parentNode = $(this).parents('tr');
        var date = new Date();
        var year = date.getFullYear();
        var month = ''+(date.getMonth()+1)>10?(date.getMonth()+1):("0"+(date.getMonth()+1));
        var day = '' + date.getDate()>10?date.getDate():'0'+date.getDate();
        var timeStr = year + '-' + month + '-' +day;
        var nodeStr = '<tr class="sub-ele-tr">'+
                '<td>'+
                '<input class="input2" type="text" value="" placeholder="输入分类..."/>'+
                '</td>'+
                '<td>'+
                '<div class="move-up"></div><div class="move-down"></div>'+
                '</td>'+
                '<td>'+timeStr+'</td>'+
                '<td><button class="none-back-btn sub-ele-delete">删除</button></td>'+
                '</tr>';
        $(nodeStr).insertBefore(parentNode);
        // console.log(nodeStr);
    })
    //删除子级元素
    $(document).on('click',
    '.product-classify-ele .product-classify-subtable tr .sub-ele-delete',
    function () {
        var parentNode = $(this).parents('tr');
        // parentNode.animate({height:'0px'},400,function () {parentNode.remove();});
        parentNode.remove();
    })
    //子级分类上移动
    $(document).on('click',
    '.product-classify-ele .product-classify-subtable tr .move-up',function () {
        var parentNode = $(this).parents('tr');
        var prevNode = parentNode.prev('tr.sub-ele-tr');
        if(prevNode[0]){
            parentNode.remove();
            parentNode.insertBefore(prevNode);
        }
    })
    //子级分类下移动
    $(document).on('click','.product-classify-ele .product-classify-subtable tr .move-down',
    function () {
        var parentNode = $(this).parents('tr');
        var nextNode = parentNode.next('tr.sub-ele-tr');
        if(nextNode[0]){
            parentNode.remove();
            parentNode.insertAfter(nextNode);
        }
    })
})
