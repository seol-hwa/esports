$(document).ready(function () {

    skip();
    lang();
    mobMenu();
    nav();
    visual();
    calendar();
    team();
    stadium();
    footer();
    quick();
})

function skip() {
    const skipMenu = $('.skip-menu').find('a');
    skipMenu.on('click', function () {
        var add = $(this.hash).offset().top-200;

        $('body,html').stop().animate({ scrollTop: add }, 500);
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

    sub.css({width: hbCon.innerWidth(), paddingLeft: hbCon.children('.inner').offset().left });

    //resize
    $(window).on('resize', function () {
        sub.css({ top: hbCon.outerHeight()-1, width: hbCon.innerWidth(), paddingLeft: hbCon.children('.inner').offset().left });
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
function visual() {
    const con = $('.visual-container');
    const imgList = $('.img-list');
    const dot = $('.dot-list').children();
    const imgNum = imgList.children().size();
    let imgWidth = con.innerWidth();
    let dotNum = 0;
    let timer;
    const delay = 5000;
    const dura = 300;
    const clone = imgList.children().last().clone();
    imgList.prepend(clone);

    imgList.children().css({ width: con.innerWidth() });
    nextVs(dotNum, 0);
    nextBtn(dotNum);

    //resize
    $(window).on('resize', function () {
        imgWidth = con.innerWidth();
        imgList.children().css({ width: imgWidth });
        imgList.css({ marginLeft: -imgWidth * (dotNum + 1) });
    })


    dot.on('click', onSlide);
    con.on('mouseenter', autoStop);
    con.on('mouseleave', autoPlay);

    function onSlide() {
        dotNum = dot.index($(this));
        nextVs(dotNum, dura);
        nextBtn(dotNum);
    }

    autoPlay();

    function autoPlay() {
        timer = setInterval(autoSlide, delay);
    }

    function autoSlide() {
        dotNum++;
        if (dotNum >= imgNum) {
            nextVs(-1, 0);
            dotNum = 0;
            nextVs(dotNum, dura);
            nextBtn(dotNum);
        } else {
            nextVs(dotNum, dura);
            nextBtn(dotNum);
        }

    }

    function nextVs(dotNum, dura) {
        imgList.stop().animate({ marginLeft: -imgWidth * (dotNum + 1) }, dura);
    }

    function nextBtn(dotNum) {
        dot.removeClass('on');
        dot.eq(dotNum).addClass('on');
    }

    function autoStop() {
        clearInterval(timer);
    }
}
function calendar() {
    const newDate = new Date();
    const today = ('0' + newDate.getDate()).slice(-2);
    const prev = $('.tbody-prev');
    const next = $('.tbody-next');
    const dist = 100;
    const dura = 300;


    $('.schedule-game').css({ 'display': 'none' })
    $('.d' + today + '').css({ 'display': 'flex' })
    $('.schedule-table').datepicker({
        monthNames: ['.01', '.02', '.03', '.04', '.05', '.06', '.07', '.08', '.09', '.10', '.11', '.12'],
        prevText: '<i class="bx bx-chevron-left"></i>',
        nextText: '<i class="bx bx-chevron-right"></i>',
        dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
        dayNamesMin: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],



        onSelect: function (dateString) {
            const arr = dateString.split("/");
            const dayNum = arr[1];
            $('.schedule-game').css({ display: 'none' });
            $('.schedule-game.d' + dayNum + '').css({ display: 'flex' });
        }

    })

    const dateTd = $('.ui-state-active').parent().outerWidth(true) + 20;

    resizeEvent();


    //resize
    $(window).on('resize', function () {
        resizeEvent();
    })

    function resizeEvent() {
        if (window.matchMedia('(max-width:768px)').matches == true) {
            startP();
        } else {
            $('tbody').css({ left: 0 });

        }
    }

    function startP() {
        let winW = $(window).innerWidth();
        const weekItem = $('tbody').find('.ui-state-active').parents('tr').index() * 7;
        const dateItem = $('tbody').find('.ui-state-active').parent().index() - 1;

        $('tbody').css({ left: -(dateTd * (weekItem + dateItem)) + winW / 2 });
    }


    next.on('click', function () {
        let tBodyP = $('tbody').position().left;
        if ($(window).innerWidth() > 655) {
            if (tBodyP <= -1400) {
                moveRight(tBodyP, 0, 0);
            } else {
                moveRight(tBodyP, dist, dura);
            }
            console.log(tBodyP);
        } else if ($(window).innerWidth() <= 655 && $(window).innerWidth() >= 410) {
            if (tBodyP <= -1600) {
                moveRight(tBodyP, 0, 0);
            } else {
                moveRight(tBodyP, dist, dura);
            }
        } else if ($(window).innerWidth() < 410) {
            if (tBodyP <= -1800) {
                moveRight(tBodyP, 0, 0);
            } else {
                moveRight(tBodyP, dist, dura);
            }
        }
    })
    prev.on('click', function () {
        let tBodyP = $('tbody').position().left;
        if (tBodyP >= 0) {
            moveLeft(tBodyP, 0, 0);
        } else {
            moveLeft(tBodyP, dist, dura);
        }
    })
    function moveRight(pos, distance, time) {
        $('tbody').stop().animate({ left: pos - distance }, time, function () {
            $(this).css({ left: pos - distance });
        });
    }
    function moveLeft(pos, distance, time) {
        $('tbody').stop().animate({ left: pos + distance }, time, function () {
            $(this).css({ left: pos + distance });
        });
    }
}
function team() {
    const btn = $('.league-box').find('a');
    const list = $('.team-box > li');
    let teamI = 0;
    const dura = 300;

    list.css({ display: 'none', opacity: 0 });
    list.eq(teamI).css({ display: 'block' }).animate({ opacity: 1 }, dura);

    btn.on('click', function () {
        teamI = btn.parent().index($(this).parent());

        btn.removeClass('on');
        $(this).addClass('on');
        list.css({ display: 'none', opacity: 0 });
        list.eq(teamI).css({ display: 'block' }).animate({ opacity: 1 }, dura);

        return false
    })
}
function stadium() {

    //resize
    $(window).on('resize', function () {
        $('.stadium-wrap').css({ height: list.find('a').innerHeight() });
    })
    const delay = 10;
    const moveX = 1;
    let timer;
    const list = $('.stadium-list');
    const itemWidth = list.children().outerWidth(true);

    $('.stadium-wrap').css({ height: list.find('a').innerHeight() });

    $('.stadium-wrap').on('mouseenter', stopFlow);
    $('.stadium-wrap').on('mouseleave', autoFlow);

    autoFlow();
    function autoFlow() {
        timer = setInterval(onFlow, delay);
    }
    function onFlow() {
        let listLeft = list.position().left;
        list.css({ left: listLeft - moveX });
        if (listLeft <= -itemWidth) {
            list.children().first().appendTo(list);
            list.css({ left: 0 });
        }
    }
    function stopFlow() {
        clearInterval(timer);
    }
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