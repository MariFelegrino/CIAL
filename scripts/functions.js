$(document).ready(function(){
    $('.owl-featured').owlCarousel({
        loop:true,
        autoplay:true,
        nav:true,
        margin:5,
        items:1,
        stagePadding: 0,
        navText: [
            `<div class='arrow'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                </svg>
            </div>`,
            `<div class='arrow'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                </svg>
            </div>`
        ],
        dots:true
    });


    $('.owl-targets').owlCarousel({
        loop:true,
        autoplay:true,
        nav:true,
        margin:5,
        stagePadding: 0,
        navText: [
            `<div class='arrow'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                </svg>
            </div>`,
            `<div class='arrow'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                </svg>
            </div>`
        ],
        dots:true,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items:2,
                margin:16
            }
        }
    });


    $('.owl-concepts').owlCarousel({
        loop:true,
        autoplay:true,
        nav:true,
        navText: [
            `<div class='arrow'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                </svg>
            </div>`,
            `<div class='arrow'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                </svg>
            </div>`
        ],
        dots:true,
        responsive:{
            0:{
                items:1,
            },
            360:{
                items:2,
            },
            600:{
                items:3,
            },
            992:{
                items:4,
            },
            1400:{
                items:5,
            }
        }
    });

    $('.owl-testimonios').owlCarousel({
        loop:true,
        autoplay:true,
        nav:true,
        margin:16,
        navText: [
            `<div class='arrow'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                </svg>
            </div>`,
            `<div class='arrow'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                </svg>
            </div>`
        ],
        dots:true,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items:2,
            },
        }
    });

    $('.owl-thoughts').owlCarousel({
        loop:true,
        autoplay:true,
        nav:true,
        margin:16,
        navText: [
            `<div class='arrow'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                </svg>
            </div>`,
            `<div class='arrow'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                </svg>
            </div>`
        ],
        dots:true,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items:2,
            },
        }
    });

    $('.owl-values').owlCarousel({
        loop:true,
        autoplay:true,
        nav:true,
        margin:16,
        navText: [
            `<div class='arrow'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                </svg>
            </div>`,
            `<div class='arrow'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                </svg>
            </div>`
        ],
        dots:true,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items:2,
            },
            900:{
                items:3,
            },
        }
    });

    $('.owl-workshops').owlCarousel({
        loop:true,
        autoplay:true,
        nav:true,
        margin:16,
        center: true,
        navText: [
            `<div class='arrow'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                </svg>
            </div>`,
            `<div class='arrow'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                </svg>
            </div>`
        ],
        dots:true,
        responsive:{
            0:{
                items:1,
            },
            360:{
                stagePadding: 50,
                items:1
            },
            600:{
                items:2,
            },
            900:{
                items:2,
            },
        }
    });


    $('.owl-modals').owlCarousel({
        loop:true,
        autoplay:true,
        nav:true,
        margin:16,
        center: true,
        navText: [
            `<div class='arrow'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                </svg>
            </div>`,
            `<div class='arrow'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                </svg>
            </div>`
        ],
        dots:true,
        responsive:{
            0:{
                items:1,
            },
            600:{
                stagePadding: 150,
                items:1,
            },
            900:{
                stagePadding: 50,
                items:2,
            },
        }
    });
    

    // ============================================
    // INTERSECTION OBSERVER — bloques animatables
    // ============================================

    /* const animatables = document.querySelectorAll('.animatable');

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                // si quieres que solo anime una vez, elimina esta parte
                entry.target.classList.remove('active');
            }

        });
    }, {
        threshold: 0.10 //Se activa cuando se ve el 10% del bloque
    });

    animatables.forEach(el => io.observe(el)); */


    // ============================================
    // OWL CAROUSEL — animación en cada slide
    // ============================================

    // Cada vez que el slide cambia
    /* $(".animatable .owl-carousel").on("changed.owl.carousel", function(e) {
        const current = e.item.index;
        const items = $(this).find(".owl-item");
        //La animación solo será en el elemento activo en ese momento
        items.removeClass("slide-animate");
        items.eq(current).addClass("slide-animate");
    });
 */
    // Al inicializar el carrusel, para que el primer slide no se vea estatico
    /* $(".animatable .owl-carousel").on("initialized.owl.carousel", function(e) {
        const current = e.item.index;
        $(this).find(".owl-item").eq(current).addClass("slide-animate");
    }); */



    
    // *  *  *  *  *  *  *  *  *  *  * *
    //    Control Texto
    // *  *  *  *  *  *  *  *  *  *  * *
    $(".control__doots").dotdotdot({
        height: 120,
        fallbackToLetter: true,
        watch: true,
    });


    //Cerrar Modales de Boostrap
    $('.modal').on('hide.bs.modal', function() {
        var memory = $(this).html();
        $(this).html(memory);
    }); 

});