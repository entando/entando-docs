(function ($) {
    "use strict";
    var MaxWidth = window.matchMedia("(max-width: 767.98px)");
    var slideSpeedAnim = 250;
    var mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    var slideSpeed;
    var slideSpeedInit = function () {
        if (mediaQuery.matches) {
            slideSpeed = 1;
        } else {
            slideSpeed = slideSpeedAnim;
        }
    };
    window.addEventListener("load", slideSpeedInit);
    if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", slideSpeedInit);
    } else if (mediaQuery.attachEvent) {
        mediaQuery.attachEvent("change", slideSpeedInit);
    }
    $(".jq-slide").on("show.bs.dropdown", function () {
        $(this).find(".dropdown-menu").first().stop(true, true).slideDown(slideSpeed);
    });
    $(".jq-slide").on("hide.bs.dropdown", function () {
        $(this).find(".dropdown-menu").first().stop(true, true).slideUp(slideSpeed);
    });
    $(".jqui-slide").on("show.bs.dropdown", function () {
        if (MaxWidth.matches) {
            $(this).find(".dropdown-menu").first().stop(true, true).slideDown(slideSpeed);
        } else {
            $(this).find(".dropdown-menu").first().stop(true, true).show("slide", {
                direction: "up"
            }, slideSpeed);
        }
    });
    $(".jqui-slide").on("hide.bs.dropdown", function () {
        if (MaxWidth.matches) {
            $(this).find(".dropdown-menu").first().stop(true, true).slideUp(slideSpeed);
        } else {
            $(this).find(".dropdown-menu").first().stop(true, true).hide("slide", {
                direction: "up"
            }, slideSpeed);
        }
    });
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        console.log("mobile");


    } else {
//        $('.dropdown').hover(function () {
//            $('.dropdown-toggle', this).trigger('click');
//        });


        $(".entando-footer-container-content ul.dropdown-menu").each(function () {
            $(this).removeAttr('style');
            $(this).addClass('hide-me');

        });

        $(window).scroll(function () {
            var scroll = $(window).scrollTop();

            if (scroll >= 110) {
                $(".entando-navbar").addClass("change-background");
            } else {
                $(".entando-navbar").removeClass("change-background");
            }
        });

        console.log("not mobile");
    }

}(jQuery));

