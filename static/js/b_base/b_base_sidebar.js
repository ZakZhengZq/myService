/**
 * Created by dell on 2017/5/22.
 */
$(document).ready(function() {
    $('#particles').particleground({
        dotColor: '#E8E8E8',
        lineColor: '#E8E8E8',
        density:10000,
        proximity:100,
    });
    var left=48;
    $(".sidebar").mouseenter(function() {
        $(this).addClass("sidebar-hover");
    }).mouseleave(function() {
        $(this).removeClass("sidebar-hover");
    });
    $(".func-item").mouseenter(function() {
        $(this).children("div").css({
            "left":left,
            "opacity": "0",
            "display": "block"
        }).clearQueue().show().stop().animate({
            "left":left-15,
            "opacity": "1"
        }, "fast");
    }).mouseleave(function() {
        $(this).children("div").stop().delay().animate({
            "left":left,
            "opacity": "0"
        }, "fast", function() {
            $(this).hide()
        });
    });

    $(".icon-yewan").click(function () {
        $("body").toggleClass("yewan");

    });

    $(".icon-baitian").click(function () {
        $("body").toggleClass("yewan");
    })

    $(".font-type-song").click(function () {
        $("*").toggleClass("song");
    })

    $(".font-type-hei").click(function () {
        $("*").toggleClass("hei");
    })
});
