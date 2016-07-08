
$(document).ready(function () {
    $(".project img").fadeTo("slow", 1.0); // This sets the opacity of the thumbs to fade down to 30% when the page loads
    $(".project img").hover(function () {
        $(this).fadeTo("fast", 0.3); // This should set the opacity to 100% on hover
    }, function () {
        $(this).fadeTo("fast", 1.0); // This should set the opacity back to 30% on mouseout
    });
});
