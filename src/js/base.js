import "../sass/base.scss";

$('.part-cover').click(function() {

    let $this = $(this);
    let triangle = $this.next().find('.top');
    let Alltriangle = $('.top');

    if( !triangle.hasClass("show") ) {
        Alltriangle.removeClass('show');
        $this.removeClass('show');
    }

    triangle.toggleClass("show");
    $this.toggleClass("show");

});