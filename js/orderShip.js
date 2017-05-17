/**
 * Created by E-P on 2017/1/16.
 */
$(function () {
    //点击是否自提逻辑
   $(document).on('click','.ship-selected-box .radio-box',function () {
       // if($(this).hasClass())
        var idValue = $(this).attr('id');
        var sinceNode = $('#since-box');
        var noneSinceNode = $('#none-since-box');
        //点击的是自提且显示的是非自提的
        if(idValue=='since-selected'&&sinceNode.hasClass('hidden')){
           sinceNode.removeClass('hidden');
           noneSinceNode.addClass('hidden');
        }
       if(idValue=='none-since-selected'&&noneSinceNode.hasClass('hidden')){
           noneSinceNode.removeClass('hidden');
           sinceNode.addClass('hidden');
       }
   })

})