$(function(){

    $(':checkbox:first').on('click',function(){
        if($(':checkbox:first').is(':checked') == true){
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


    function intHtml(json){
        var html_ =
        '<tr title=" '+ json.id +' ">' +
            '<td>'+ '<input type="checkbox" name="">' + json.id + '</td>'
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
    function initPage(data){
        $('tbody').html('')
        $.each(data,function(key,val){
            $('tbody').append(intHtml(val));
        })
    }

    initPage(data)


    function dele(id,ind){
        for(var i = 0; i < data.length; i++){
            if(id == data[i].id){
                data.splice(i,1);
                $('tbody tr').eq(ind).remove();
            }
        }
    }
    $('body').on('click', '.del' , function(){
        var ind = $(this).parent('td').parent('tr').index();
        var id = parseInt($(this).attr('title'));
        dele(id,ind);
    })

    var id_ = null;

    $.each(data, function(key,val){
        if(id_ < val.id){
            id_ = val.id;
        }
    })

    function refres(data,class_){
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

        initPage(data);
    }

    $('.append').on('click',function(){
        id_ += 1
        refres(data,{id: id_,type: '.type',title:'.title',class_:'.class_',state:'.state',time:'.time',name:'.name',scholl:'.scholl'})
    })

    function list(data,status,fun){
        if(status){
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
        }

        fun();
    }

    $('.list').on('click',function(){
        if($(this).hasClass('h')){
            list(data,true,function(){
                initPage(data);
            })
            $(this).removeClass('h');
        }else{
            list(data,false,function(){
                initPage(data);
            })
            $(this).addClass('h');
        }
    })

    $("tbody tr").eq(0).addClass("bg").siblings("tr").removeClass("bg");

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
                dele(id,index);
            break;
        }
    })
    $("body").on("click", "td", function(){
        $(this).children("input[type=text]").removeAttr("disabled");
    })

    $("body").on("blur", "td", function(){
        $(this).children("input").attr("disabled", true);
    })
})