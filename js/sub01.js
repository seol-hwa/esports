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
    var kor = $('.lang_ko');
    var eng = $('.lang-box_en');
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
    var menuCon = $('.all-menu-wrap');
    var open = $('.all-menu-btn');
    var close = $('.all-menu-close');
    var isOpen = false;
    var menu = $('.mo-menu-list > li > a');
    var subMenu = $('.mo-submenu-list');
    var dura = 300;

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
    var main = $('.gnb-list > li > a');
    var sub = $('.submenu-list');
    var hbCon = $('.h-bottom-container');
    var dura = 200;

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
    var firstTitle = $('.large-scale').children();
    var secondTitle = $('.middle-scale').children();
    var thirdTitle = $('.small-scale').find('a');
    var setNum = 0;
    var gameBox = $('.game-box');
    var yearList = $('.year-list');
    var yearWidth = yearList.children().innerWidth();
    var yearSize = yearList.children().size();
    var nextYear = $('.next');
    var prevYear = $('.prev');
    var yearNum = 0;

    firstTitle.eq(setNum).addClass('on');
    secondTitle.eq(setNum).addClass('on');
    thirdTitle.eq(setNum).addClass('on');
    yearList.css({ Width: yearWidth * yearSize });

    firstTitle.on('click', function () {
        firstTitle.removeClass('on');
        $(this).addClass('on');
    })

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
        yearNum++;
        yearList.stop().animate({ left: -yearWidth * yearNum }, 0);
        if (yearList.position().left <= -1350) {
            yearNum = yearSize-1;
            yearList.stop().animate({ left: -yearWidth * yearNum }, 0);
        }
    })
    prevYear.on('click',function(){
        yearNum--;
        yearList.stop().animate({ left: -yearWidth * yearNum }, 0);
        if (yearList.position().left >= 0) {
            yearNum = 0;
            yearList.stop().animate({ left: -yearWidth * yearNum }, 0);
        }
    })
}
function footer() {
    var infoBtn = $('.f-info-btn').children();
    var time = 500;

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
    var qMenu = $('aside');
    var top = $('.top-btn');
    var dura = 200;

    qMenu.hide();

    $(document).on('scroll', function () {
        var scrollH = $(window).scrollTop();
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