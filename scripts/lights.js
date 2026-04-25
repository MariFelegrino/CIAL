$(document).ready(function () {

    const $owl = $('.owl-highlights');

    // Si no existe Owl, salimos sin hacer nada
    if (!$owl.length || typeof $.fn.owlCarousel !== 'function') {
        return;
    }

    // ============================================
    // Carousel Highlights
    // ============================================

    $owl.owlCarousel({
        items:2,
        loop:true,
        center: true,
        margin:10,
        nav:true,
        dots:false,
        navText: ["<img src='/assets/icons/icon-carot-left-blue.svg'>","<img src='/assets/icons/icon-carot-right-blue.svg'>"],
        responsive:{
            0:{
                items:1
            },
            600:{
                items:4,
            },
            990:{
                items:5,
            },
            1200:{
                items:5,
            }
        }
    })

    /* ============================================
       FUNCIÓN: sincroniza contenido desde el center
    ============================================ */
    function syncFromCenter() {
        const $centerItem = $owl.find('.owl-item.center');
        const $btn = $centerItem.find('a.lights-btn');

        if (!$btn.length) return;

        updateLightsContent($btn.data('btn'));
    }

    /* ============================================
       FUNCIÓN: mostrar contenido
    ============================================ */
    /* function updateLightsContent(btnValue) {
        $('.lights-content')
            .removeClass('visible')
            .filter(`[data-content="${btnValue}"]`)
            .addClass('visible');
    } */

    function updateLightsContent(btnValue) {
    const $target = $('.lights-content')
        .removeClass('visible animate')
        .filter(`[data-content="${btnValue}"]`);

    // Paso 1: hacer visible
    $target.addClass('visible');

    // Paso 2: forzar repaint y luego animar
    requestAnimationFrame(() => {
        $target.addClass('animate');
    });
}

    // Ejecutar al cargar
    setTimeout(syncFromCenter, 0);

    // Cada cambio de Owl
    $owl.on('translated.owl.carousel', syncFromCenter);

    // Click en lights-btn
    $(document).on('click', 'a.lights-btn', function (e) {
        e.preventDefault();

        const btnValue = $(this).data('btn');
        updateLightsContent(btnValue);

        const $owlItem = $(this).closest('.owl-item');
        if (!$owlItem.length) return;

        const owl = $owl.data('owl.carousel');
        if (!owl) return;

        const realIndex = owl.relative($owlItem.index());

        $owl.trigger('to.owl.carousel', [realIndex, 400, true]);
    });

});
