/**
 * Created by E-P on 2016/12/2.
 */
$(function () {
    $(document).on('click',".check-box-round,.check-box-rect",function(){
        //监听鼠标进入事件  如果 是未选中  换图片
        if($(this).hasClass("active")){
            //如果是选中状态
            $(this).removeClass('active');
        }else{
            $(this).addClass('active');
        }
    })

    $(document).on('click','.radio-round-box .radio-box',function () {
        if($(this).hasClass('active')){
            return;
        }
        $(this).siblings('.radio-box.active').removeClass('active');
        $(this).addClass('active');
    })


    $('.choice-province .choice-province-top').click(function () {
        var parentNode = $(this).parents('.choice-province');
        if(parentNode.hasClass('active')){
            //如果是展开状态 就是直接收上
            hideChoiceProvince(parentNode);
        }else{
            showChoiceProvince(parentNode);
        }
    })
    //监听下拉框的点击事件，然后把事件个给断掉
    $('.choice-province').click(function () {
        //前面要加什么事件 就可以加在这里
        return false;
    })
    //点击屏幕收回下拉控件
    $(document).click(function () {
        //监听body点击 然后收回一些 控件
        //这些控件的阻止冒泡都写在 这个函数的点击 事件中
        hideChoiceProvince($('.choice-province'));
        hideDropDown($(".drop-down-box"));
    })

    $('.drop-down-box').click(function () {
        // hideChoiceProvince($('.choice-province'));//收上所有的选择地址框
        // hideDropDown()
        var selfNode = $(this);
        $('.drop-down-box').each(function () {
            //如果是本身就不收回
            if(!selfNode.is($(this))){
                hideDropDown($(this));
            }
        })

        return false;
    })
    //点击展开下拉框
    $(".drop-down-box").click(function(){
        if(!$(this).hasClass("selected")){
            showDropDown($(this));
        }
        return false;
    })


    //点击切换省份、城市、县区、街道（乡）  这个地方应该不需要后台的传值
    $(".choice-province-content-top .province-top-ele").click(function () {
        if($(this).hasClass('active')){
            //如果是选中状态的话  return
            return;
        }
        // $(this).removeClass()
        var sibNode = $(this).siblings('.province-top-ele.active');
        sibNode.removeClass('active');
        $(this).addClass('active');
        //这个是将其下的address-content隐藏
        var parentNode = $(this).parents('.choice-province');
        var addressNode = parentNode.find('.address-content');
        addressNode.addClass('hidden');
        if($(this).hasClass('province')){
            parentNode.find('.address-content.province-content').removeClass('hidden');
        }else if($(this).hasClass('city')){
            parentNode.find('.address-content.city-content').removeClass('hidden');
        }else if($(this).hasClass('county')){
            parentNode.find('.address-content.county-content').removeClass('hidden');
        }else if($(this).hasClass('street')){
            parentNode.find('.address-content.street-content').removeClass('hidden')
        }
    })
    //点击选择具体的地址事件，这个肯定需要后台传值
    $('.address-content span').click(function () {
        if(!$(this).hasClass('active')){
            //如果当前元素开始没有是选中状态的话，可能需要把其他
            //选中状态的span选中状态给去掉
            var sibNode = $(this).siblings('span.active');
            sibNode.removeClass('active');
        }
        var text = $(this).text();
        $(this).addClass('active');
        var parentNode = $(this).parents('.address-content');
        var parNode = parentNode.parents('.choice-province');
        var contentSpanNode = parNode.find('.choice-province-top>span');
        if(parentNode.hasClass('province-content')){
            contentSpanNode.text(text);
            //这个地方后台传 市的 值
            parNode.find('.choice-province-content-top .province-top-ele.active').removeClass('active');
            parNode.find('.choice-province-content-top .city').addClass('active');
            parNode.find('.address-content').addClass('hidden');
            parNode.find('.address-content.city-content').removeClass('hidden');
        }else if(parentNode.hasClass('city-content')){
            var strArr = contentSpanNode.text().split('|');
            var str = strArr[0]+'|'+text;
            contentSpanNode.text(str);
            parNode.find('.choice-province-content-top .province-top-ele.active').removeClass('active');
            parNode.find('.choice-province-content-top .county').addClass('active');
            parNode.find('.address-content').addClass('hidden');
            parNode.find('.address-content.county-content').removeClass('hidden');
        }else if(parentNode.hasClass('county-content')){
            var strArr = contentSpanNode.text().split('|');
            var str = strArr[0]+'|'+ strArr[1] + '|' + text;
            contentSpanNode.text(str);
            parNode.find('.choice-province-content-top .province-top-ele.active').removeClass('active');
            parNode.find('.choice-province-content-top .street').addClass('active');
            parNode.find('.address-content').addClass('hidden');
            parNode.find('.address-content.street-content').removeClass('hidden');
        }else if(parentNode.hasClass('street-content')){
            var strArr = contentSpanNode.text().split('|');
            var str = strArr[0]+'|'+strArr[1]+'|'+strArr[2]+'|'+text;
            contentSpanNode.text(str);
            hideChoiceProvince(parNode);
        }
    })

    //点击上传图片和删除图片
    $('.upload-btn').click(function () {
        $('.last-input').click();
    })
    $(document).on('click','.upload-delete',function(){
        var parentNode = $(this).parents('.upload-ele');
        parentNode.animate({
            height:'0px',
            width:"0px"
        }, 300,function(){
            if(parentNode.hasClass('upload-img')){
                var index = $('.upload-img').index(parentNode);
                $('.input-file-box input').each(function (key,value) {
                    if($(this).hasClass('last-input')){
                        return;
                    }else if(key==index){
                        $(this).remove();
                    }else{
                        if(key<index){
                            $(this).attr('name','uploadImg'+Number(key));
                        }else if(key>index){
                            $(this).attr('name','uploadImg'+Number(key-1));
                        }
                    }
                })
            }
            parentNode.remove();
        })
    })

    $('.selected-number-box .selected-number-dec').click(function () {
        var inputNode = $(this).siblings('.selected-number-input');

        var number = Math.floor(Number(inputNode.val()));
        var parentNode = $(this).parents('.selected-number-box');
        var val = parentNode.attr('min');
        var minValue =  Number(val);
        var min =1;
        if(!(typeof val == 'undefined')){
            min = Math.ceil(minValue);
        }
        if(number<=min){
            inputNode.val(min);
            return;
        }
        var str = (number-1).toString();
        inputNode.val(str);
    })
    $('.selected-number-box .selected-number-add').click(function () {
        var inputNode = $(this).siblings('.selected-number-input');
        var number = Math.floor(Number(inputNode.val()));
        var parentNode = $(this).parents('.selected-number-box');
        var val = parentNode.attr('max');
        var maxValue =  Math.floor(Number(val));
        if(typeof val != 'undefined' && maxValue>=number){
            inputNode.val(maxValue);
            return;
        }


        var str = (number+1).toString();
        inputNode.val(str);
    })

    $('.content-table-ele .remark .remark-content .remark-content-delete').click(function () {
        var parentNode = $(this).parents('.remark-box');
        parentNode.addClass('hidden');
    })
    $('.content-table-ele .remark>span').click(function () {
        var contentNode = $(this).siblings('.remark-box');
        if(contentNode.hasClass('hidden')){
            contentNode.removeClass('hidden');
        }else{
            contentNode.addClass('hidden');
        }
    })

    //选择下拉框的选项
    $('.drop-down-box .drop-down-ul li').click(function () {
        if($(this).hasClass('selected')){
            return;
        }
        var node = $(this).parents('.drop-down-box');
        var str = $(this).text();
        $(this).siblings('li').removeClass('selected');
        $(this).addClass('selected');
        node.children('a').text(str);
        hideDropDown(node);
        return false;
    })

    //点击弹出框的 x 或者取消按钮
    $('.alert-back .alert-top-title .delete,.alert-back #change-order-cancel')
        .click(function () {
            $(this).parents('.alert-back').addClass('hidden');
            $('body').removeClass('float-box');

        })
/*
    //点击了 paging-ele
    $(document).on('click','.paging-box.click .paging-ele',function () {
        var node = $(this).parents('.paging-box');
        pageSkip(node,$(this).attr('value'));
    })
    //点击上一页按钮
    $(document).on('click','.paging-box.click .paging-pro-btn',function () {
        var node = $(this).parents('.paging-box');
        var pre = Number(node.attr('number'))-1;
        if(pre<1){
            return;
        }
        pageSkip(node,pre);
    })
    //点击下一页按钮
    $(document).on('click','.paging-box.click .paging-next-btn',function () {
        var node = $(this).parents('.paging-box');
        var next = Number(node.attr('number'))+1;
        var size = Number(node.attr('size'));
        if(next>size){
            return;
        }
        pageSkip(node,next);
    })
    //点击确定跳转按钮
    $(document).on('click','.paging-box.click .page-skip button',function () {
        var skipNode = $(this).parents('.page-skip');
        var node = $(this).parents('.paging-box');
        var number = Number(skipNode.children('input').val());

        var func = function () {
            var s= 1;
            console.log(s);
        }
        pageSkip(node,number,func);
    })
*/

})


//展开 choice-province
function showChoiceProvince(node) {
    if(node.hasClass('active')){
        //这个是展开状态
        return;
    }
    var choiceContent = node.find('.choice-province-content');
    choiceContent.removeClass('hidden');
    node.addClass('active');
}
//收上 choice-province
function hideChoiceProvince(node) {
    //如果是收上状态，return
    if(!node.hasClass('active')){
        return;
    }
    var choiceContent = node.find('.choice-province-content');
    choiceContent.addClass('hidden');
    node.removeClass('active');
}

//上传图片框的三个函数
function change(node) {
    uploadAddImg(node);
}

function  uploadAddImg(files) {
    files.removeClass('last-input');
    var name = files.attr('name');
    var index = $('.input-file-box input').index(files);

    files.attr('name',name+index);
    $('.input-file-box').append(
        $('<input/>').attr('type','file').attr('name','uploadImg')
            .attr('accept','image/jpeg,image/gif,image/png')
            .addClass('hidden').addClass('last-input').attr('onchange','change($(this))')
    )
    var length = files.length;
    if(length<1){return;}
    var fileObj = files[length-1];
    var dataURL;
    var windowURL = window.URL || window.webkitURL;
    var uploadEle = $('<div></div>').addClass('upload-ele').addClass('upload-img');
    var imgNode = $('<img/>');
    var uploadBack = $('<div></div>').addClass('upload-delete-back');
    var uploadDelete = $('<div></div>').addClass('upload-delete').attr('title','删除图片');
    uploadBack.append(uploadDelete);
    uploadEle.append(imgNode).append(uploadBack);
    if(fileObj && fileObj.files && fileObj.files[0]){
        dataURL = windowURL.createObjectURL(fileObj.files[0]);
        imgNode.attr('src',dataURL);
    }
    uploadEle.insertBefore($('.upload-btn'));
}
function deleteImg(index,files) {
    files.splice(index,1);
}

//分页的后面跳转操作控件
function initPageSkip(pageSize,pageNumber) {
    var skipDiv = $("<div></div>").addClass("page-skip");
    var span = $("<span></span>").text(pageSize);
    var input = $("<input type='number'/>").val(pageNumber);
    var button = $("<button></button>").addClass("whiteback-btn3").text("确定");
    skipDiv.append("共");
    skipDiv.append(span);
    skipDiv.append('页,跳转到');
    skipDiv.append(input);
    skipDiv.append('页');
    skipDiv.append(button);


    return skipDiv;

}

function pageSkip(node,index,func) {
    node.children('.paging-ele-box').remove();
    var size = Number(node.attr('size'));
    pagingInit(node,size,index,func);
}


function pagingInit(paging,pageSize,pageNumber,callback) {
    pageSize = Number(pageSize);
    pageNumber = Number(pageNumber);
    if (pageNumber < 1 || pageNumber > pageSize) {
        //这种情况直接 return  说明 数据出错了
        return;
    }
    if (paging.hasClass('click')) {
        window.changeSize = function(pageNumber, pageSize) {
            paging.empty();
            pagingInit(paging,pageSize,pageNumber,callback);
        }
    }


    paging.attr('size',pageSize);

    paging.attr('number',pageNumber);
    var pagingEleBox = $('<div></div>').addClass('paging-ele-box').addClass('float-left');
    if(pageSize<=9){
        //这个是 全显示的 东东
        //恩 而且不需要跳转 按钮

        var proBtn = $("<a></a>").addClass("paging-pro-btn").text("上一页");
        var nextBtn = $("<a></a>").text("下一页").addClass("paging-next-btn");
        if(paging.hasClass('click')){
            proBtn.click(function () {
                var proNumber = Number(pageNumber - 1);
                if (proNumber >= 1) {
                    pageSkip(paging, proNumber , callback);
                }
            })
            nextBtn.click(function () {
                var nextNumber = Number(pageNumber + 1);
                if (nextNumber <= pageSize) {
                    pageSkip(paging, nextNumber, callback);
                }
            })
        }
        pagingEleBox.append(proBtn);
        for(var i =1; i<=pageSize;i++){
            var eleSpan = $("<a></a>").addClass("paging-ele").attr("value",i).text(i);
            if(paging.hasClass('click')){
                eleSpan.click(function () {

                    pageSkip(paging,$(this).attr('value'),callback);
                })
            }
            if(pageNumber==i){
                eleSpan.addClass("selected");
                eleSpan.attr("href","");
            }
            pagingEleBox.append(eleSpan);
        }
        pagingEleBox.append(nextBtn);

    }else{

        var proBtn = $("<a></a>").addClass("paging-pro-btn").text("上一页");
        var nextBtn = $("<a></a>").text("下一页").addClass("paging-next-btn");
        if(paging.hasClass('click')) {
            proBtn.click(function () {
                var proNumber = Number(pageNumber - 1);
                if (proNumber >= 1) {
                    pageSkip(paging, proNumber, callback);
                }
            })
            nextBtn.click(function () {
                var nextNumber = Number(pageNumber + 1);
                if (nextNumber <= pageSize) {
                    pageSkip(paging, nextNumber, callback);
                }
            })
        }

        pagingEleBox.append(proBtn);
        if(pageNumber<8){
            for(var i=1;i<=8;i++){
                var eleSpan = $("<a></a>").addClass("paging-ele").attr("value",i).text(i);
                if(paging.hasClass('click')){
                    eleSpan.click(function () {
                        pageSkip(paging,$(this).attr('value'),callback);

                    })
                }
                if(pageNumber==i){
                    eleSpan.addClass("selected");
                    eleSpan.attr("href","");
                }
                pagingEleBox.append(eleSpan);
            }
            //最后加一个省略号
            var pointNode = $("<span></span>").addClass("paging-supen-point").text("...");
            pagingEleBox.append(pointNode);
        }else if(pageNumber>pageSize-2){
            //如果当前页很靠后  直接
            for(var i=1;i<=5;i++){
                var eleSpan = $("<a></a>").addClass("paging-ele").attr("value",i).text(i);
                if(paging.hasClass('click')){
                    eleSpan.click(function () {

                        pageSkip(paging,$(this).attr('value'),callback);
                    })
                }
                pagingEleBox.append(eleSpan);
            }
            var pointNode = $("<span></span>").addClass("paging-supen-point").text("...");
            pagingEleBox.append(pointNode);
            for(var i=pageSize-2;i<=pageSize;i++){
                var eleSpan = $("<a></a>").addClass("paging-ele").attr("value",i).text(i);
                if(paging.hasClass('click')){
                    eleSpan.click(function () {
                        pageSkip(paging,$(this).attr('value'),callback);
                    })
                }
                pagingEleBox.append(eleSpan);
                if(pageNumber==i){
                    eleSpan.addClass("selected");
                    eleSpan.attr("href","");
                }
            }
        }else{
            for(var i=1;i<=4;i++){
                var eleSpan = $("<a></a>").addClass("paging-ele").attr("value",i).text(i);
                if(paging.hasClass('click')){
                    eleSpan.click(function () {
                        pageSkip(paging,$(this).attr('value'),callback);
                    })
                }
                pagingEleBox.append(eleSpan);
            }
            var pointNode = $("<a></a>").addClass("paging-supen-point").text("...");
            pagingEleBox.append(pointNode);
            for(var i=pageNumber-1;i<=pageNumber+1;i++){
                var eleSpan = $("<a></a>").addClass("paging-ele").attr("value",i).text(i);
                if(paging.hasClass('click')){
                    eleSpan.click(function () {
                        pageSkip(paging,$(this).attr('value'),callback);
                    })
                }
                pagingEleBox.append(eleSpan);
                if(pageNumber==i){
                    eleSpan.addClass("selected");
                    eleSpan.attr("href","");
                }
            }
            var pointNode = $("<span></span>").addClass("paging-supen-point").text("...");
            pagingEleBox.append(pointNode);
        }

        pagingEleBox.append(nextBtn);

    }
    var skipNode = paging.find('.page-skip');

    if(skipNode.length>0){
        pagingEleBox.insertBefore(skipNode)
    }else{

        paging.append(pagingEleBox);
        var skipNode = initPageSkip(pageSize,pageNumber);
        if(paging.hasClass('click')){
            var btn = skipNode.find('button');
            btn.click(function() {
                //点击确定按钮
                // var input = $(this).sib('input');
                var input = $(this).siblings('input');
                var index = Number(input.val());
                pageSkip(paging, index, callback);
            })
        }
        paging.append(skipNode)
    }
    if(typeof callback == 'function')
        callback();
}

function showDropDown(dropBox){
    //这个是 展开对应的 dropBox  对应的下拉框
    //展开的 时候把气的全部收回
    dropBox.addClass("selected");
    var ulNode = dropBox.find(".drop-down-ul");
    ulNode.removeClass("hidden");
    var imgNode = dropBox.children("img");
    imgNode.attr("src","/img/47_s.png");
    dropBox.addClass("outline")
}

function hideDropDown(dropBox){
    dropBox.removeClass("selected");
    var ulNode = dropBox.find(".drop-down-ul");
    ulNode.addClass("hidden");
    var imgNode = dropBox.children("img");
    imgNode.attr("src","/img/47.png");
    dropBox.removeClass("outline")
}

function initRouteBox(data,node) {
    $.each(data,function (key,value) {
        if(key != data.length-1){
            var linkNode = $('<a></a>').text(value.name).attr('href',value.url).addClass('route-link-a');
            var holdNode = $('<span></span>').addClass('route-hold-span');
            node.append(linkNode);
            node.append(holdNode);
        }else{
            var spanNode = $('<span></span>').text(value.name).addClass('route-last-span');
            node.append(spanNode);
        }
    })
}


