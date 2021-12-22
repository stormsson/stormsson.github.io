
$(document).ready(function() {
    // ScrollAppear
    if (typeof $.fn.scrollAppear === 'function') {
        $('.scrollappear').scrollAppear();
    }

    // Zooming
    new Zooming({ customSize: '100%', scaleBase: 0.9, scaleExtra: 0 }).listen('.zooming');

    // Share buttons
    $('.article-share a').on('click', function() {
        window.open($(this).attr('href'), 'Share', 'width=200,height=200,noopener');
        return false;
    });


    // sticky header
    // When the user scrolls the page, execute myFunction
    window.onscroll = function() { setStickyHeader() };
    // Get the header
    var header = document.getElementsByClassName("header-nav")[0];

    // Get the offset position of the navbar
    var sticky = header.offsetTop;

    // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function setStickyHeader() {
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }
});
