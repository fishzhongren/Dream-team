$(
        function () {
                var re = $('.top').outerHeight(true);
                var re1 = $(window).outerHeight(true);
                console.log(re1);
                var re2 = re1 - re;
                $('.mainbody,.mian-left-ul').css('height', re2 + 'px');
                $('.mainbody-right,.topright').css('height', re2 - 20);
                var search = $('.search');
                $('.search').on('click',function(){
                        $.ajax({
                                url:'admin/search',
                                type:'post',
                                dataType:'json',
                                data:{username:search.val()},
                                success:function(data){
                                    console.log(data);
                                    //登录成功跳转到管理页面
                                    if(data.r == 'success'){
                                        window.location.href = '/persontel';
                                    }else if(data.r == 'username_not_exist'){  //账号不存在
                                        username.focus().next('span').html('账号不存在');
                                    }else{
                                        alert('未知错误，请刷新后重试');
                                        window.location.reload();
                                    }
                                }
                            }); 
                })

        }
)