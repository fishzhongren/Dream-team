$(
    function () {
            var re = $('.top').outerHeight(true);
            var re1 = $(window).outerHeight(true);
            console.log(re1);
            var re2 = re1 - re;
            $('.mainbody,.mian-left-ul').css('height', re2 + 'px');
            $('.mainbody-right,.topright').css('height', re2 - 20);
           

    }
)