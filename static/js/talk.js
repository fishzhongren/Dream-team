$(function(){
    console.log(456)
   
    let form = layui.form;
    
    let str = '';
    let path = [];
    let img = document.querySelector('#images');
    img.onchange = function(){
        let _this =this;
        let xhr = new XMLHttpRequest();
         xhr.open('POST', '/uploads');
         //创建一个表单数据对象
         let formdata = new FormData();  //创建一个表单数据对象 可以理解为创建一个  <form>  </form>  
         for (const top of _this.files) {
             formdata.append("photo", top);        //往表单里面追加input  name="images"  value="文件"
         }
         //不用设置请求头
         xhr.send(formdata);
         xhr.onreadystatechange = function () {
             if(xhr.readyState == 4 && xhr.status==200){
                 let data = JSON.parse(xhr.responseText);
                 console.log(data);
                 
                 for (const top of data.data) {
                     str += `<li><img src="${top}" style="height: 100px;width: 100px"></li>`;
                     path.push(top);
                 }
                 document.querySelector('.talkimg-ul').innerHTML = str;

                 document.querySelector('#imgval').value = path.join(',');
             }
         }
   
   console.log(path);
}
    $('#submit').click(function(){
        let title =$('.title').val();
    let content =$('.content').val();
    console.log(123)
        $.ajax({
                    url: '/talk',
                    type: 'POST',
                    dataType: 'JSON',
                    data: {title:title,content:content,photo:path},
                    // data:$('#submit').serialize(),
                    // data:data.field,
                    success: function (result) {
                        console.log(result);
                        // console.log()
                        if(result.r =='err'){
                            console.log('错误信息')
                        }

                        // if(result.r =='success'){
                        //     window.location.href = '/talk';
                        // }
                       
                    }
                });
                return false;



    })

    // // 添加分类
    // form.on('submit(addfrom)', function(data){
    //     console.log(123)
    //     $.ajax({
    //         url: '/talk',
    //         type: 'POST',
    //         dataType: 'JSON',
    //         data: $('#submit').serialize(),
    //         // data:data.field,
    //         success: function (result) {
    //             if(result.r =='err'){
    //                 console.log('错误信息')
    //             }
    //             if(result.r =='success'){
    //                 window.location.href = '/talk';
    //             }
               
    //         }
    //     });
    //     return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    //   });



})