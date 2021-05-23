$(function() {
    "use strict";
    
    // 2. Tabs handlers
    $('.tab').on('click', function () {
        $('.tab, .panel').removeClass('active');
        $(this).add('#' + $(this).attr('id').replace(/\s*tab\s*/, 'panel')).addClass('active');
    });
    // sale tabs
    $('.tab-sale').on('click', function () {
        $('.tab-sale, .panel-sale').removeClass('active');
        $(this).add('#' + $(this).attr('id').replace(/\s*tab\s*/, 'panel')).addClass('active');
    });
    // faq tabs
    $('.tab-faq').on('click', function () {
        $('.tab-faq, .panel-faq').removeClass('active');
        $(this).add('#' + $(this).attr('id').replace(/\s*tab\s*/, 'panel')).addClass('active');
    });

    // 3. Timer function
    function getTimeRemaining(endtime) {
        var t, seconds, minutes, hours, days;
        t = Date.parse(endtime) - Date.parse(new Date());
        seconds = Math.floor((t / 1000) % 60);
        minutes = Math.floor((t / 1000 / 60) % 60);
        hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    var iconContainer = document.getElementById('icon-container');
    iconContainer.addEventListener("click", scrollDown);
    function scrollDown() {
        $('#bottom-panel').addClass("hidden");
    }

    // 4. Menu
    jQuery(document).ready(function($) {
        var $window = $(window),
            $target = $("#main"),
            $h = $target.offset().top;
            $window.on('scroll', function() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop == 0) {
                $('#menu').removeClass("fixed-menu");
            }
            if (scrollTop > $h) {
                $('#bottom-panel').addClass("hidden");
            } else {
                $('#bottom-panel').removeClass("hidden");
            }
        });

    });

    var $window = $(window),
        lastScrollTop = 0;

    function onScroll (e) {
        var top = $window.scrollTop();
        if (lastScrollTop > top) {
            $('#menu').addClass("fixed-menu");
        } else if (lastScrollTop < top) {
            $('#menu').removeClass("fixed-menu");
        }
        lastScrollTop = top;
    }

    $window.on('scroll', onScroll);
    // end menu

    


    // 6. Menu mobile
    var toggled_bis = 0;
    $(".menu-toogle-open").on('click', function(e){
        $(".menu-toogle-open").toggleClass("toggled");
        $(".mobile-menu-container").toggleClass("hidden");
        if (toggled_bis === 0) {
            $('.menu-toogle-open .burgx3').stop().transition({
                rotate: "45"
            });
            $('.menu-toogle-open .burgx2').stop().transition({
                opacity: "0"
            }, "fast");
            $('.menu-toogle-open .burgx').stop().transition({
                rotate: "-45"
            });
            toggled_bis++;
        } else {
            $('.menu-toogle-open .burgx3').stop().transition({
                rotate: "+=135"
            });
            $('.menu-toogle-open .burgx2').transition({
                opacity: "1"
            }, "fast");
            $('.menu-toogle-open .burgx').stop().transition({
                rotate: "-=135"
            });
            toggled_bis--;
        }
    });

    // only for demo links
    $('.empty-links').on('click', function (e) {
        e.preventDefault();
    });

    // 7. Form handler
    $("#feedback").on('click', function() {
        $("#cForm").css("display", "block");
        var postname, textform, textarea;
        postname = $("#inputName").val();
        textform = $("#inputEmail").val();
        textarea = $("#textArea").val();
        $.ajax({
            type: "POST",
            url: "php/mail.php", //Attach send.php
            data: {
                "email": textform,
                "name": postname,
                "textarea": textarea
            },
            cache: false,
            success: function(response) {
                /* == Success text ==*/
                var messageResp, resultStat, oll;
                messageResp = "<p>Hello!<strong>";
                resultStat = "</strong> Your message was sent!</p>";
                oll = (messageResp + resultStat);
                if (response == 1) {
                    $("#inputEmail").css("border-bottom",
                        "1px solid #6e6868");
                    $("#loadBar").html(oll).fadeIn(4000); //Appearance of the error text
                    $("#inputEmail").val("");
                    $("#inputName").val("");
                    $("#textArea").val("");
                } else {
                    $("#loadBar").html(response).fadeIn(5000); //Appearance success text
                    $("#loadBar").html(response).fadeOut(5000);
                    $("#inputEmail").css("border-bottom",
                        "1px solid #f7153d");
                }
            }
        });
        return false;
    });

    var container = document.getElementById('main-container');
    container.style.display = 'block';
});


