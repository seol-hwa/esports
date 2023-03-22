$(document).ready(function () {
    lang();
    mobMenu();
    nav();
    main();
    footer();
    quick();
})

function lang() {
    //header top
    const kor = $('.lang_ko');
    const eng = $('.lang-box_en');
    kor.parent().each(function (i, d) {
        $(this).data('isOpen', true);
    })

    kor.on('click', function (e) {
        e.preventDefault();
        if (kor.parent().data('isOpen') == true) {
            eng.slideDown(200);
            $(this).parent().data('isOpen', false);
        } else if (kor.parent().data('isOpen') == false) {
            eng.slideUp(200);
            $(this).parent().data('isOpen', true);
        }
    })
}
function mobMenu() {
    const menuCon = $('.all-menu-wrap');
    const open = $('.all-menu-btn');
    const close = $('.all-menu-close');
    let isOpen = false;
    const menu = $('.mo-menu-list > li > a');
    const subMenu = $('.mo-submenu-list');
    const dura = 300;

    menu.each(function () {
        $(this).data('opCheck', false);
    })

    menuCon.css({ top: $('header').outerHeight(), height: $(window).innerHeight() - $('header').outerHeight(), right: -$('header').outerWidth() });

    $(window).on('resize', function () {
        menuCon.css({ top: $('header').outerHeight(), height: $(window).innerHeight() - $('header').outerHeight() });
        if (isOpen == true) {
            menuCon.css({ right: 0 });
        } else {
            menuCon.css({ right: -$('header').outerWidth() });
        }
    })

    open.on('click', function () {
        menuCon.stop().animate({ right: 0 }, dura);
        open.css({ display: 'none' });
        close.css({ display: 'flex' });
        $('body').css({ overflow: 'hidden' })
        isOpen = true;
    })

    close.on('click', function () {
        menuCon.stop().animate({ right: -$('header').outerWidth() }, dura);
        close.css({ display: 'none' });
        open.css({ display: 'flex' });
        $('body').css({ overflow: 'visible' })
        isOpen = false;
    })

    menu.on('click', function () {
        if ($(this).data('opCheck') == false) {
            subMenu.slideUp();
            $(this).next('.mo-submenu-list').slideDown();
            menu.removeClass('on');
            $(this).addClass('on');
            menu.data('opCheck', false);
            $(this).data('opCheck', true);
        } else {
            subMenu.slideUp();
            menu.removeClass('on');
            menu.data('opCheck', false);
        }
    })
}
function nav() {
    const main = $('.gnb-list > li > a');
    const sub = $('.submenu-list');
    const hbCon = $('.h-bottom-container');
    const dura = 200;

    sub.css({ top: hbCon.outerHeight() - 1, width: hbCon.innerWidth(), paddingLeft: hbCon.children('.inner').offset().left });

    //resize
    $(window).on('resize', function () {
        sub.css({ top: $('.h-bottom-container').outerHeight() - 1, width: $('.h-bottom-container').innerWidth(), paddingLeft: $('.h-bottom-container').children('.inner').offset().left });
    })


    onOut();

    main.on('mouseenter focus', onOver);
    function onOver() {
        onOut();
        $(this).next().stop().slideDown(dura);
    }

    hbCon.on('mouseleave', onOut);
    function onOut() {
        sub.stop().slideUp(dura);
    }
}
function main() {
    const secondTitle = $('.middle-scale').children();
    const thirdTitle = $('.small-scale').find('a');
    let setNum = 0;
    const gameBox = $('.game-box');
    const nextYear = $('.next');
    const prevYear = $('.prev');
    const monthList = $('.month-mo-list');
    const prevMonth = $('.month-prev');
    const nextMonth = $('.month-next');
    const dura = 300;
    let toYear = new Date().getFullYear();
    const monthPc = $('.month-pc').find('a');
    const monthMo = monthList.find('a');

    secondTitle.eq(setNum).addClass('on');
    thirdTitle.eq(setNum).addClass('on');
    $('.this-year').text(toYear);

    secondTitle.on('click', function () {
        setNum = $(this).index();
        secondTitle.removeClass('on');
        $(this).addClass('on');

        if (setNum > 0) {
            gameBox.hide();
            $('.small-scale').children().eq(setNum - 1).show();
            thirdTitle.removeClass('on');
            $('.small-scale').children().eq(setNum - 1).children().eq(0).addClass('on');
        } else {
            gameBox.show();
            thirdTitle.removeClass('on');
            thirdTitle.eq(setNum).addClass('on');
        }
    })

    thirdTitle.on('click', function () {
        thirdTitle.removeClass('on');
        $(this).addClass('on');
    })

    nextYear.on('click', function () {
        toYear++;
        $('.this-year').text(toYear);
    })
    prevYear.on('click', function () {
        toYear--;
        $('.this-year').text(toYear);
    })

    nextMonth.on('click', function () {
        let monthLeft = monthList.position().left;
        if($(window).innerWidth() <= 555){
            if(monthLeft <= -650){
                monthList.stop().animate({ left: monthLeft - 0 }, dura);
            }else{
                monthList.stop().animate({ left: monthLeft - 100 }, dura);
            }
        }else{
            if (monthLeft <= -350) {
                monthList.stop().animate({ left: monthLeft - 0 }, dura);
            } else {
                monthList.stop().animate({ left: monthLeft - 100 }, dura);
            }
        }
    })
    prevMonth.on('click', function () {
        let monthLeft = monthList.position().left;
        if (monthLeft >= 50) {
            monthList.stop().animate({ left: monthLeft + 0 }, dura);
        } else {
            monthList.stop().animate({ left: monthLeft + 100 }, dura);
        }
    })
    monthPc.on('click', function () {
        monthPc.parent().removeClass('on');
        $(this).parent().addClass('on');
    })
    monthMo.on('click', function () {
        monthMo.parent().removeClass('on');
        $(this).parent().addClass('on');
    })
}
function footer() {
    const infoBtn = $('.f-info-btn').children();
    const time = 500;

    infoBtn.each(function () {
        $(this).data('isOn', true);
    })
    $('.f-info-mo').children('.text-box').css({ display: 'none' });

    infoBtn.on('click', function () {
        if (infoBtn.data('isOn') == true) {
            $('.f-info-mo').children('.text-box').slideDown(time);
            $('.bxs-down-arrow').css({ display: 'none' });
            $('.bxs-up-arrow').css({ display: 'block' });
            infoBtn.data('isOn', false);
        } else {
            $('.f-info-mo').children('.text-box').slideUp(time);
            $('.bxs-down-arrow').css({ display: 'block' });
            $('.bxs-up-arrow').css({ display: 'none' });
            infoBtn.data('isOn', true);
        }
        return false
    })
}
function quick() {
    const qMenu = $('aside');
    const top = $('.top-btn');
    const dura = 200;

    qMenu.hide();

    $(document).on('scroll', function () {
        let scrollH = $(window).scrollTop();
        if (scrollH >= $(window).innerHeight() / 3) {
            qMenu.show().stop().animate({ opacity: 1 }, dura);
        } else {
            qMenu.stop().animate({ opacity: 0 }, dura, function () {
                qMenu.hide();
            })
        }
    })

    top.on('click', function () {
        $('body,html').stop().animate({ scrollTop: 0 }, 500);
        return false
    })
}