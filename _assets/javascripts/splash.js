// this is included by site.splash_enabled = true
$(document).ready(function() {
    $('#splash').show();
    
    // set "active" class to #svg-mimmo
    $('#svg-mimmo').addClass('active');

    // set timeout of 3 seconds and alert hello
    setTimeout(function() {
        // remove "splashing" class to body
        $('body').removeClass('splashing');

        $('#splash').fadeOut(500);
    }, 3000);
    
});