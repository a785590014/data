$(function(){
    $(':checkbox:first').on('click',function(){
        if($(':checkbox:first').is(':checked')){
            $(":checkbox:gt(0)").attr('checked',true)
        }else{
            $(":checkbox").attr('checked',false)
        }
    })

    $("body").on('click', ':checkbox:gt(0)' ,function(){
        if($(":checkbox:gt(0)").filter(":not(:checked)").length == 0){
            $(":checkbox:first").attr("checked",true);
        }else{
            $(":checkbox:first").attr("checked",false);
        }
    });

    function html(json){
        var html_ =
        '<tr title=" '+ json.id +' ">'
            + '<td><input type="checkbox" name="" title="'+ json.id +'"><input class="test" type="text" value="'+ json.id +'"  disabled></td>'
            + '<td><input type="text" value="'+ json.type + '" disabled></td>'
            + '<td><input type="text" value="'+ json.title + '" disabled></td>'
            + '<td><input type="text" value="'+ json.class_ + '" disabled></td>'
            + '<td><input type="text" value="'+ json.state + '" disabled></td>'
            + '<td><input type="text" value="'+ json.time + '" disabled></td>'
            + '<td><input type="text" value="'+ json.name + '" disabled></td>'
            + '<td><input type="text" value="'+ json.scholl + '" disabled></td>'
            + '<td><input type="button" name="" value="删除数据" class="del" title=" '+ json.id +' "></td>'
         +'</tr>'
        return html_;
    }

    function page(data){
        $('tbody').html('')
        $.each(data,function(key,val){
            $('tbody').append(html(val));
        })
    }

    page(data)

    function dele(id,ind){
        for(var i = 0; i < data.length; i++){
            if(id == data[i].id){
                data.splice(i,1);
                $('tbody tr').eq(ind).remove();
            }
        }
    }

    $('body').on('click', '.del' , function(){
        var index = $(this).index();
        var id = parseInt($(this).attr('title'));
        if(confirm('确认删除?')){
            dele(id,index);
        }
    })

    var id_ = null;

    $.each(data, function(key,val){
        if(id_ < val.id){
            id_ = val.id;
        }
    })


    function appendData(data,class_){
        data.unshift({
            id: id_,
            type: $(class_.type).val(),
            title: $(class_.title).val(),
            class_: $(class_.class_).val(),
            state: $(class_.state).val(),
            time: $(class_.time).val(),
            name: $(class_.name).val(),
            scholl: $(class_.scholl).val(),
        })

        $('.input input[type="text"]').val('');

        page(data);
    }

    $('.append').on('click',function(){
        var ani =  $('.win').stop(true).animate({'top': 0});
        var ani1 = $('.win').delay(2000).animate({'top': -30});
        if($('.type').val() == ''){
            ani.html('分类不为空');
            ani1
        }else if($('.title').val() == ''){
            ani.html('标题不为空');
            ani1
        }else if($('.class_').val() == ''){
            ani.html('班级不为空');
            ani1
        }else if($('.state').val() == ''){
            ani.html('状态不为空');
            ani1
        }else if($('.time').val() == ''){
            ani.html('时间不为空');
            ani1
        }else if($('.class_').val() == ''){
            ani.html('创建者不为空');
            ani1
        }else if($('.scholl').val() == ''){
            ani.html('分校区不为空');
            ani1
        }else{
            ani.css('background','#00d000').html('提交成功');
            ani1
            id_ += 1
            appendData(data,{id: id_,type: '.type',title:'.title',class_:'.class_',state:'.state',time:'.time',name:'.name',scholl:'.scholl'})
        }
    })

    $('.list').on('click',function(){
        if($(this).hasClass('h')){
            var emp = null;
            for(var i = 0; i < data.length;i++){
                for(var j = i + 1; j < data.length; j++){
                    if(data[i].id > data[j].id){
                        emp = data[i];
                        data[i] = data[j];
                        data[j] = emp;
                    }
                }
            }
            a = 1;
            $(this).removeClass('h');
        }else{
            for(var i = 0; i < data.length;i++){
                for(var j = i + 1; j < data.length; j++){
                    if(data[i].id < data[j].id){
                        emp = data[i];
                        data[i] = data[j];
                        data[j] = emp;
                    }
                }
            }
            a = 0;
            $(this).addClass('h');
        }
        initPage(data);
    })

    $(window).keydown(function(e){
        var key = e.keyCode;
        switch(key){
            case 38:
                var index = $('tbody tr.bg').index();
                if(index > 0){
                    index --;
                    $("tbody tr").eq(index).addClass("bg").siblings("tr").removeClass("bg");
                }
            break;
            case 40:
                index = $("tr.bg").index();
                    if(index < $('tbody tr').length - 1){
                        index ++;
                    }
                $("tbody tr").eq(index).addClass("bg").siblings("tr").removeClass("bg");
            break;
            case 46:
                var id = parseInt($("tbody tr.bg").attr("title"));
                var index = $('tbody tr.bg').index();
                if (confirm("确认删除?")) {
                    dele(id,index);
                }
            break;
            case 13:
                var index = $('tbody tr.bg').index();
                var ch = $(':checkbox:gt(0)').eq(index)
                if(ch.attr('checked')){
                    ch.prop('checked',false);
                }else{
                     ch.prop('checked',true);
                }
            break;
        }
    })

    $("body").on('mouseover',"tbody tr",function(){
        $(this).addClass("bg").siblings("tr").removeClass("bg");
    })

    $("body").on("mousedown", "td :text", function(){
        $(this).attr("disabled",false).parent().css('background','red');
    })

    $("body").on("blur", "td :text", function(){
        $(this).attr("disabled", true).parent().css('background','none');
    })

    $('.dele').on('click',function(){
        if (confirm("确认删除?")) {
            if($(':checkbox:first').is(':checked')){
                $('tbody').html('');
                data = [];
            }else{
                $(":checkbox:gt(0)").each(function(){
                    if ($(this).attr("checked")){
                        for(var i = 0; i < data.length; i++){
                            if(data[i].id == $(this).attr('title')){
                                data.splice(i, 1);
                            }
                        }
                        $(this).parent().parent().remove()
                    }
                })
            }
        }
    })
})