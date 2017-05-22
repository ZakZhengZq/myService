/**
 * Created by dell on 2017/5/22.
 */
$(".sidebar").mouseenter(function() {
    $(this).addClass("sidebar-hover");
}).mouseleave(function() {
    $(this).removeClass("sidebar-hover");
});
$(".func-item").mouseenter(function() {
    $(this).children("div").css({
        //"left": left,
        "opacity": "0",
        "display": "block"
    }).clearQueue().show().stop().animate({
        //"left": left - 15,
        "opacity": "1"
    }, "fast");
}).mouseleave(function() {
    $(this).children("div").stop().delay().animate({
        //"left": left,
        "opacity": "0"
    }, "fast", function() {
        $(this).hide()
    });
});