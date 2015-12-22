/*
    Oğuzhan SARI
    21.12.2015 14:14:00
    www.oguzhansari.com
    miniConfirm - jQuery ile gelişitirilmiş CSS3 ile güçlendirilmiş basit onay uygulaması
*/
function OS_miniconfirm(a, b, c) {
    $('.miniconfirm').remove();
    var t = $(a);
    var ID = codeGenerator(20);
    var c = c == undefined ? "" : c;
    var html = '<div class="miniconfirm ' + c + '" id="' + ID + '" style="top: ' + t.position().top + 'px; left: ' + t.position().left + 'px"><div class="mc_content"><h6 class="ms_h6"><span>Emin misiniz?</span></h6><div class="mc_buttons"><a href="#" class="mc_no"><i class="psicons-close"></i></a><a href="#" class="mc_yes"><i class="psicons-check"></i></a></div></div></div>';
    $("body").append(html);
    var mc = $('#' + ID)
    mc.css({ "display": "inline-block", "left": miniconfirmCalc(mc, t, 'left', c), "top": miniconfirmCalc(mc, t, 'top', c), "right": miniconfirmCalc(mc, t, 'right', c), "bottom": miniconfirmCalc(mc, t, 'bottom', c) });
    $(window).resize(function () {
        mc.css({ "left": miniconfirmCalc(mc, t, 'left', c), "top": miniconfirmCalc(mc, t, 'top', c), "right": miniconfirmCalc(mc, t, 'right', c), "bottom": miniconfirmCalc(mc, t, 'bottom', c) });
    });
    $('.mc_no', mc).click(function () {
        miniconfirmClose(mc);
    });
    $('.mc_yes', mc).click(function () {
        FuncStarter = new Function(b);
        FuncStarter.call(this);
        miniconfirmClose(mc);
    });

    $(document).click(function (e) {
        var ctn_t = t;
        var ctn = $("*", mc);
        var ctn_ta = $("*", t);
        if (!ctn.is(e.target) & !ctn_t.is(e.target) & !ctn_ta.is(e.target)) {
            miniconfirmClose(mc);
        }
    });
}
function miniconfirmClose(mc) {
    mc.remove();
}
function miniconfirmCalc(mc, t, coor, c) {
    var bHeight = mc.height();
    var bWidth = mc.width();
    var tWidth = t.width();
    var tHeight = t.height();
    var left = t.position().left - (bWidth / 2) + (tWidth / 2);
    var top = t.position().top - bHeight - (tHeight / 2);
    var wWidth = $(document).width();
    var right = "initial";
    var bottom = "initial";
    if (c == "rightcenter") {
        left = t.position().left + tWidth;
        top = t.position().top - ((bHeight / 2) - (tHeight / 2));
    } else if (c == "leftcenter") {
        left = "initial";
        top = t.position().top - ((bHeight / 2) - (tHeight / 2));
        right = wWidth - t.position().left;
    } else if (c == "bottomcenter") {
        top = t.position().top + ((bHeight / 2) - (tHeight / 2));
    }
    var ret = "";
    if (coor == "left") {
        ret = left;
    } else if (coor == "top") {
        ret = top;
    } else if (coor == "right") {
        ret = right;
    } else if (coor == "bottom") {
        ret = bottom;
    }
    return ret;
}
