/*global $ */
(function($) {
    "use strict";

    // Loader 
    $(window).on('load', function(){
        $('body').addClass('stopScroll');

        $('.loader').fadeOut(1000, function () {
            $(this).remove();
            $('body').removeClass('stopScroll');
        });
    });

    if ($(window).width() < 1024) {
        // Toggle Menu
        $('.menuBtn').on('click', function(e){
            e.stopPropagation();
            $(this).toggleClass('toggle');
            $('.menuList').toggleClass('show');
        }); 
        
        // Toggle Language 
        $('.language').on('click', function(e){
            e.stopPropagation();
            $('.langList').toggleClass('show');
        }); 

        $(window).on('click', function(e) {
            $('.menuList').removeClass('show');
               $('.langList').removeClass('show');
               $('.menuBtn').removeClass('toggle');
        });
    }

    // Custom Select
    let Index = 0 ;
    $('select').each(function () {
        let This = $(this),
            Options = $(this).children('option').length;
            
        // Loop In All Select
        Index ++;

        // Hide Select 
        This.addClass('d-none');

        // Create Parent CustomSelect
        This.wrap('<div class="customSelect"></div>');

        // Create Selected Box
        This.after('<div class="selected"></div>');

        // Selected Preview Box
        let selected =This.next('.selected');

        // Create Dropdown
        let DropDown = $('<div />', {
            'class': 'selectList'
        }).insertAfter(selected);

        // Create Option List 
        let List = $('<ul />', {
            'class': 'list'
        }).appendTo(DropDown);

        // Close Other Lists Expect Current List 
        selected.click(function (e) {
            e.stopPropagation();
            $('.selected.active').not(this).each(function () {
                $(this).removeClass('active').next('.selectList').slideUp();
            });
            $(this).toggleClass('active').next('.selectList').slideToggle();
        });

        // close dropdown 
        $(document).click(function () {
            selected.removeClass('active');
            DropDown.hide();
        });

        // Default Select
        if($(this).is('[default]')) {

            // Display First Option In Selected Box  
            This.children('option[selected]') ? selected.text(This.children('option[selected]').text()) : selected.text(This.children('option').eq(0).text());

            // Loop on items 
            for (let i = 0; i < Options; i++) {
                $('<li />', {
                    text:This.children('option').eq(i).text(),
                    value:This.children('option').eq(i).val()
                }).appendTo(List);
            }

            // Get Selected Items 
            let item = List.children('li');

            // Item Click
            item.click(function (e) {
                e.stopPropagation();

                // Append Selected Elements
                selected.text($(this).text()).removeClass('active');

                // Toggle otionSelected Class 
                $(item).removeClass('optionSelected');
                $(this).addClass('optionSelected');

                // Pass Value To Select 
                This.val($(this).attr('value'));

                // close dropdown 
                DropDown.hide();
            });
        }
    });

    let RTL = $('body').hasClass('en') ? false : true;
    // Header OWL 
    $('.owlClients').owlCarousel({
        rtl:RTL,
        margin: 0,
        autoplay: true,
        loop: true,
        nav: false,
        dots: false,
        autoplaySpeed : 5000,
        autoplayTimeout : 5000,
        smartSpeed: 5000 ,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        navText: ["<i class='icofont-thin-right'></i>", "<i class='icofont-thin-left'></i>"],
        responsive: {
            0: {
                items: 1,
                dotsEach: 1
            },
            600: {
                items: 1,
                dotsEach: 1
            },
            1000: {
                items: 1,
                dotsEach: 1
            }
        }
    });

    $('.playVideo').on('click', function(e){
        $('#videoModal').modal();
    });

    let url = $("#video").attr('src');
    $("#videoModal").on('hide.bs.modal', function() {
        $("#video").attr('src', '');
    });
    $("#videoModal").on('show.bs.modal', function() {
        $("#video").attr('src', url);
    });



})(jQuery);

