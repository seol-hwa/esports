$(document).ready(function () {
    skip();
    lang();
    mobMenu();
    nav();
    main();
    footer();
    quick();
})
function skip() {
    const skipMenu = $('.skip-menu').find('a');
    skipMenu.on('click', function () {
        var add = $(this.hash).offset().top -200;

        $('body,html').stop().animate({ scrollTop: add }, 500);
        console.log(add);
    })
}
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

    //resize
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

    sub.css({ width: hbCon.innerWidth(), paddingLeft: hbCon.children('.inner').offset().left });
    

    //resize
    $(window).on('resize', function () {
        sub.css({ top: hbCon.outerHeight() - 1, width: hbCon.innerWidth(), paddingLeft: hbCon.children('.inner').offset().left });
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
    const monthList = $('.month-mo-list');
    const prevMonth = $('.month-prev');
    const nextMonth = $('.month-next');
    const dura = 300;
    let toYear = new Date().getFullYear();
    const monthPc = $('.month-pc').find('a');
    const monthMo = monthList.find('a');
    const todayMonth = new Date().getMonth();
    const pcMonthList = $('.month-pc').children();
    const moMonthList = $('.month-mo-list').children();
    const resultWrap = $('.result-wrap');
    const monthName = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

    secondTitle.eq(setNum).addClass('on');
    thirdTitle.eq(setNum).addClass('on');
    $('.this-year').text(toYear);
    pcMonthList.eq(todayMonth).addClass('on');
    moMonthList.eq(todayMonth).addClass('on');
    $('.kart-result-wrap').show();
    $('.kart' + monthName[todayMonth] + '').show();

    secondTitle.on('click', function () {
        setNum = $(this).index();
        secondTitle.removeClass('on');
        $(this).addClass('on');
        monthPc.parent().removeClass('on');
        monthMo.parent().removeClass('on');
        pcMonthList.eq(todayMonth).addClass('on');
        moMonthList.eq(todayMonth).addClass('on');

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

        resultWrap.hide();
        $('.mon').hide();
        if ($(this).text() == 'KARTRIDER' || $(this).text() == 'ALL') {
            $('.kart-result-wrap').show()
            $('.kart' + monthName[todayMonth] + '').show();
        } else if ($(this).text() == 'LOL') {
            $('.lck-result-wrap').show();
            $('.lck' + monthName[todayMonth] + '').show();
        } else if ($(this).text() == 'OVERWATCH') {
            $('.league-result-wrap').show();
            $('.league' + monthName[todayMonth] + '').show();
        } else if ($(this).text() == 'PUBG') {
            $('.pgc-result-wrap').show();
            $('.pgc' + monthName[todayMonth] + '').show();
        } else if ($(this).text() == 'STARCRAFT') {
            $('.gsl-result-wrap').show();
            $('.gsl' + monthName[todayMonth] + '').show();
        } else if ($(this).text() == 'VALORANT') {
            $('.vck-result-wrap').show();
            $('.vck' + monthName[todayMonth] + '').show();
        }
    })

    thirdTitle.on('click', function () {
        thirdTitle.removeClass('on');
        $(this).addClass('on');
        resultWrap.hide();
        $('.mon').hide();
        pcMonthList.removeClass('on');
        moMonthList.removeClass('on');
        pcMonthList.eq(todayMonth).addClass('on');
        moMonthList.eq(todayMonth).addClass('on');

        if ($(this).hasClass('KRLP') == true) {
            $('.kart-result-wrap').show();
            $('.kart' + monthName[todayMonth] + '').show();
        } else if ($(this).hasClass('lck') == true) {
            $('.lck-result-wrap').show();
            $('.lck' + monthName[todayMonth] + '').show();
        } else if ($(this).hasClass('lckcl') == true) {
            $('.lckcl-result-wrap').show();
            $('.lckcl' + monthName[todayMonth] + '').show();
        } else if ($(this).hasClass('msi') == true) {
            $('.msi-result-wrap').show();
            $('.msi' + monthName[todayMonth] + '').show();
        } else if ($(this).hasClass('worlds') == true) {
            $('.worlds-result-wrap').show();
            $('.worlds' + monthName[todayMonth] + '').show();
        } else if ($(this).hasClass('owol') == true) {
            $('.league-result-wrap').show();
            $('.league' + monthName[todayMonth] + '').show();
        } else if ($(this).hasClass('owct') == true) {
            $('.ockl-result-wrap').show();
            $('.ockl' + monthName[todayMonth] + '').show();
        } else if ($(this).hasClass('pgc') == true) {
            $('.pgc-result-wrap').show();
            $('.pgc' + monthName[todayMonth] + '').show();
        } else if ($(this).hasClass('pgi') == true) {
            $('.pgi-result-wrap').show();
            $('.pgi' + monthName[todayMonth] + '').show();
        } else if ($(this).hasClass('pkc') == true) {
            $('.pkc-result-wrap').show();
            $('.pkc' + monthName[todayMonth] + '').show();
        } else if ($(this).hasClass('gsl') == true) {
            $('.gsl-result-wrap').show();
            $('.gsl' + monthName[todayMonth] + '').show();
        } else if ($(this).hasClass('vck') == true) {
            $('.vck-result-wrap').show();
            $('.vck' + monthName[todayMonth] + '').show();
        }
    })

    nextMonth.on('click', function () {
        const monthLeft = monthList.position().left;
        if ($(window).innerWidth() <= 555) {
            if (monthLeft <= -650) {
                monthList.stop().animate({ left: monthLeft - 0 }, dura);
            } else {
                monthList.stop().animate({ left: monthLeft - 100 }, dura);
            }
        } else {
            if (monthLeft <= -350) {
                monthList.stop().animate({ left: monthLeft - 0 }, dura);
            } else {
                monthList.stop().animate({ left: monthLeft - 100 }, dura);
            }
        }
    })
    prevMonth.on('click', function () {
        const monthLeft = monthList.position().left;
        if (monthLeft >= 50) {
            monthList.stop().animate({ left: monthLeft + 0 }, dura);
        } else {
            monthList.stop().animate({ left: monthLeft + 100 }, dura);
        }
    })
    monthPc.on('click', function () {
        const monthNum = $(this).parent().index();
        monthPc.parent().removeClass('on');
        $(this).parent().addClass('on');

        $('.mon').hide();
        if ($('.KRLP').hasClass('on')) {
            $('.kart' + monthName[monthNum] + '').show();
        } else if ($('.lck').hasClass('on')) {
            $('.lck' + monthName[monthNum] + '').show();
        } else if ($('.lckcl').hasClass('on')) {
            $('.lckcl' + monthName[monthNum] + '').show();
        } else if ($('.msi').hasClass('on')) {
            $('.msi' + monthName[monthNum] + '').show();
        } else if ($('.worlds').hasClass('on')) {
            $('.worlds' + monthName[monthNum] + '').show();
        } else if ($('.owol').hasClass('on')) {
            $('.league' + monthName[monthNum] + '').show();
        } else if ($('.owct').hasClass('on')) {
            $('.ockl' + monthName[monthNum] + '').show();
        } else if ($('.pgc').hasClass('on')) {
            $('.pgc' + monthName[monthNum] + '').show();
        } else if ($('.pgi').hasClass('on')) {
            $('.pgi' + monthName[monthNum] + '').show();
        } else if ($('.pkc').hasClass('on')) {
            $('.pkc' + monthName[monthNum] + '').show();
        } else if ($('.gsl').hasClass('on')) {
            $('.gsl' + monthName[monthNum] + '').show();
        } else if ($('.vck').hasClass('on')) {
            $('.vck' + monthName[monthNum] + '').show();
        }
        return false
    })
    monthMo.on('click', function () {
        const monthNum = $(this).parent().index();
        monthMo.parent().removeClass('on');
        $(this).parent().addClass('on');

        $('.mon').hide();
        if ($('.KRLP').hasClass('on')) {
            $('.kart' + monthName[monthNum] + '').show();
        } else if ($('.lck').hasClass('on')) {
            $('.lck' + monthName[monthNum] + '').show();
        } else if ($('.lckcl').hasClass('on')) {
            $('.lckcl' + monthName[monthNum] + '').show();
        } else if ($('.msi').hasClass('on')) {
            $('.msi' + monthName[monthNum] + '').show();
        } else if ($('.worlds').hasClass('on')) {
            $('.worlds' + monthName[monthNum] + '').show();
        } else if ($('.owol').hasClass('on')) {
            $('.league' + monthName[monthNum] + '').show();
        } else if ($('.owct').hasClass('on')) {
            $('.ockl' + monthName[monthNum] + '').show();
        } else if ($('.pgc').hasClass('on')) {
            $('.pgc' + monthName[monthNum] + '').show();
        } else if ($('.pgi').hasClass('on')) {
            $('.pgi' + monthName[monthNum] + '').show();
        } else if ($('.pkc').hasClass('on')) {
            $('.pkc' + monthName[monthNum] + '').show();
        } else if ($('.gsl').hasClass('on')) {
            $('.gsl' + monthName[monthNum] + '').show();
        } else if ($('.vck').hasClass('on')) {
            $('.vck' + monthName[monthNum] + '').show();
        }
        return false
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