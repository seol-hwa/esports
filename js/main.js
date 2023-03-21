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
    var skipMenu = $('.skip-menu').find('a');
    skipMenu.on('click', function () {
        var add = $(this.hash).offset().top;

        $('body,html').stop().animate({ scrollTop: add }, 500);
        console.log(add);
    })
}
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
function visual() {
    var con = $('.visual-container');
    var imgList = $('.img-list');
    var dot = $('.dot-list').children();
    var imgNum = imgList.children().size();
    var imgWidth = con.innerWidth();
    var dotNum = 0;
    var timer;
    var delay = 5000;
    var dura = 300;
    var clone = imgList.children().last().clone();
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
        nextBtn(dotNum)
        autoStop();
        autoPlay();
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
        }
        nextVs(dotNum, dura);
        nextBtn(dotNum);
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
    var newDate = new Date();
    var today = ('0' + newDate.getDate()).slice(-2);
    var prev = $('.tbody-prev');
    var next = $('.tbody-next');
    var dist = 100;
    var dura = 300;
    var timer;


    $('.schedule-game').css({ 'display': 'none' })
    $('.d' + today + '').css({ 'display': 'flex' })
    $('.schedule-table').datepicker({
        monthNames: ['.01', '.02', '.03', '.04', '.05', '.06', '.07', '.08', '.09', '.10', '.11', '.12'],
        prevText: '<i class="bx bx-chevron-left"></i>',
        nextText: '<i class="bx bx-chevron-right"></i>',
        dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
        dayNamesMin: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],



        onSelect: function (dateString) {
            var arr = dateString.split("/");
            var dayNum = arr[1];
            $('.schedule-game').css({ display: 'none' });
            $('.schedule-game.d' + dayNum + '').css({ display: 'flex' });
        }

    })

    var dateTd = $('.ui-datepicker-today').outerWidth(true) + 20;

    if (window.matchMedia('(max-width:768px)').matches == true) {
        startP();
    }


    //resize
    $(window).on('resize', function () {
        clearTimeout(timer);
        timer = setTimeout(resizeEvent, 300)
    })

    function resizeEvent() {
        if (window.matchMedia('(max-width:768px)').matches == true) {
            startP();
        } else {
            $('tbody').css({ left: 0 });

        }
    }

    function startP() {
        var winW = $(window).innerWidth();
        var weekItem = $('tbody').find('.ui-datepicker-today').parent().index() * 7;
        var dateItem = $('tbody').find('.ui-datepicker-today').index() - 1;

        $('tbody').css({ left: -(dateTd * (weekItem + dateItem)) + winW / 2 });
    }


    next.on('click', function () {
        var tBodyP = $('tbody').position().left;
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
        var tBodyP = $('tbody').position().left;
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
    var btn = $('.league-box').find('a');
    var list = $('.team-box > li');
    var teamI = 0;
    var dura = 300;

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
    var delay = 10;
    var moveX = 1;
    var timer;
    var list = $('.stadium-list');
    var itemWidth = list.children().outerWidth(true);

    $('.stadium-wrap').css({ height: list.find('a').innerHeight() });

    $('.stadium-wrap').on('mouseenter', stopFlow);
    $('.stadium-wrap').on('mouseleave', autoFlow);

    autoFlow();
    function autoFlow() {
        timer = setInterval(onFlow, delay);
    }
    function onFlow() {
        var listLeft = list.position().left;
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