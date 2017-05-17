/**
 * Created by E-P on 2016/12/6.
 */

$(function () {

    //点击编辑
    $('.shop-edit-btn').click(function () {
        $('.shop-info-content').addClass('hidden');
        $('.shop-info-edit').removeClass('hidden');
    })
    //点击保存  需要在此提交之类
    $('.shop-manage-save').click(function () {
        $('.shop-info-edit').addClass('hidden');
        $('.shop-info-content').removeClass('hidden');
    })

    $('input[value="shop-logo"]').on('change',function () {
        imgChange($(this));
    })
    $('input[value="shop-back-img"]').change(function () {
        imgChange($(this));
    })
    $('input[value="shop-content-img"]').change(function () {
        imgChange($(this));
    })
    $('.upload-logo').click(function () {
        $('input[value="shop-logo"]').click();
    })

    $('.upload-shopback').click(function () {
        $('input[value="shop-back-img"]').trigger("click");
    })

    $('.upload-shopimg').click(function () {
        $('input[value="shop-content-img"]').trigger("click");
    })

})
function imgChange(node) {
//                alert(1111);
    var file = node;
    var fileObj = file[0];
    var windowURL = window.URL || window.webkitURL;
    var dataURL;
    var logoImg;
    if(file.attr('value')=='shop-logo'){

        logoImg = $('.shop-logo-edit');
    }else if(file.attr('value')=='shop-back-img'){
        logoImg = $('.shop-back-img-edit');
    }else{
        logoImg = $('.shop-content-img-edit');
    }

    if(fileObj && fileObj.files && fileObj.files[0]){
        dataURL = windowURL.createObjectURL(fileObj.files[0]);
        logoImg.attr('src',dataURL);
    }else {
//                    dataURL = file.val();
//                    var imgObj = document.getElementsBy
//                    // 两个坑:
//                    // 1、在设置filter属性时，元素必须已经存在在DOM树中，动态创建的Node，也需要在设置属性前加入到DOM中，先设置属性在加入，无效；
//                    // 2、src属性需要像下面的方式添加，上面的两种方式添加，无效；
//                    imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
//                    imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;
    }
}
