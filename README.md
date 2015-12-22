# miniConfirm
jQuery ile geliştirilmiş CSS3 ile güçledirilmiş javascript onay-verme uygulaması.

### Özellikleri
  - Örnek olarak silmek istediğiniz bir kaynak mevcut. Bunun için "Silmek istediğinize emin misiniz? [EVET] [HAYIR]" uyarısı sağlar.

### Kullanımı
Uygulamak istediğin nesnenin ' onclick="PS_miniconfirm(this, 'functionname()', 'position')" ' tagına sahip olması gerekmektedir.

  - this = o elementi ifade eder (zorunlu)
  - functionname = [EVET] 'e tıklandığında çalıştırılacak fonksiyondur.
  - position = Uyarı penceresinin posizyonunu belirler Kullanılabilir posizyon değerleri, hiç belirtilmezse "topcenter" olarak uygulanır. Sağ taraf için "rightcenter", Alt taraf için "bottomcenter", Sol taraf için "leftcenter"

#### Javascript Kaynak Kod
```sh
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
```
#### CSS Kaynak Kod
```sh
/* miniconfirm [Start] */
.miniconfirm { position: absolute; display: none; -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; }
.miniconfirm:after { display: block; content: ""; clear: both; }
.miniconfirm .mc_content { border: 1px solid #ddd; position: relative; display: block; background-color: #fff; -webkit-border-radius: 3px; box-shadow: 0 0 8px #b5b5b5; -moz-border-radius: 3px; border-radius: 3px; }
.miniconfirm .mc_content:after { display: block; content: ""; clear: both; }
.miniconfirm .mc_content:before { border-color: #ddd transparent transparent transparent; border-style: solid; border-width: 8px; width: 0; height: 0; display: block; position: absolute; bottom: -16px; left: calc(50% - 8px); content: ""; }
.miniconfirm .mc_content .ms_h6 { padding: 10px 5px; background-color: #eee; font-size: 14px; color: #666; font-weight: 600; -webkit-border-top-left-radius: 3px; -webkit-border-top-right-radius: 3px; -moz-border-radius-topleft: 3px; -moz-border-radius-topright: 3px; border-top-left-radius: 3px; border-top-right-radius: 3px; }
.miniconfirm .mc_content .mc_buttons { padding: 5px; }
.miniconfirm .mc_content .mc_buttons:after { display: block; content: ""; clear: both; }
.miniconfirm .mc_content .mc_buttons a { border: 1px solid #eee; background-color: #fff; height: 30px; line-height: 30px; text-align: center; text-decoration: none; color: #666; display: block; width: calc(50% - 2.5px); float: left; -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; box-sizing: border-box; -webkit-transition: All 500ms ease; -moz-transition: All 500ms ease; -o-transition: All 500ms ease; transition: All 500ms ease; }
.miniconfirm .mc_content .mc_buttons a i:before { font-size: 13px; }
.miniconfirm .mc_content .mc_buttons a.mc_yes { margin-left: 2.5px; }
.miniconfirm .mc_content .mc_buttons a.mc_no { margin-right: 2.5px; }
.miniconfirm .mc_content .mc_buttons a.mc_yes:hover { background-color: #33b86c; border-color: #106f39; }
.miniconfirm .mc_content .mc_buttons a.mc_no:hover { background-color: #ef5350; border-color: #8f1e1c; }
.miniconfirm .mc_content .mc_buttons a:hover i:before { color: #fff; }
.miniconfirm.rightcenter { padding-left: 12px; }
.miniconfirm.leftcenter { padding-right: 12px; }
.miniconfirm.rightcenter .mc_content:before { border-color: transparent #ddd transparent transparent; border-style: solid; border-width: 8px; width: 0; height: 0; display: block; position: absolute; left: -16px; top: calc(50% - 8px); content: ""; }
.miniconfirm.leftcenter .mc_content:before { border-color: transparent transparent transparent #ddd; border-style: solid; border-width: 8px; width: 0; height: 0; display: block; position: absolute; left: initial; right: -16px; top: calc(50% - 8px); content: ""; }
.miniconfirm.bottomcenter .mc_content:before { border-color: transparent transparent #ddd transparent; border-style: solid; border-width: 8px; width: 0; height: 0; display: block; position: absolute; bottom: initial; top: -16px; content: ""; }
/* miniconfirm [Finish] */
```

### Versiyon
1.0

### Teknik

jQuery 2.1.4 ( http://www.jquery.com )

### Kurulum

Yukarıdaki javascript ve css kaynak kodlarını sitenize çağırın. Sonrasında aşağıdaki örnek kod işinizi görecektir.

```sh
<a href="#" onclick="OS_miniconfirm(this, 'tester()', 'leftcenter')">X</a>
```

> Teşekkürler. :)

> Oğuzhan SARI

> os@oguzhansari.com

> www.oguzhansari.com
