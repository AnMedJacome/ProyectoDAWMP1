function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        if (!!document.querySelector("div.fast")){
            setTimeout(function () {
                if ($('#spinner').length > 0) {
                    $('#spinner').removeClass('show');
                }
            }, 20);
        }
    };
    spinner();

    // Sidebar Toggler
    $('.sidebar-toggler-1').click(function () {
        $('.sidebar, .content').toggleClass("open");
        return false;
    });
    
})(jQuery);