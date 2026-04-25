$(document).ready(function(){

     // Interacción de select a tabs
    $('.tabs-select').on('change', function(e) {
        var id = $(this).val();
        $('a[data-bs-target="' + id + '"]').tab('show');
    });

    //Links desde el select
    /* document.getElementById("tabs-select-link").addEventListener("change", function () {
    if (this.value) {
      window.location.href = this.value;
    }

  }); */

    const tabsSelectLink = document.getElementById("tabs-select-link");

    if (tabsSelectLink) {
        tabsSelectLink.addEventListener("change", function () {
            if (this.value) {
                window.location.href = this.value;
            }
        });
    }

    // Botón fijo después de la tarjeta de precio
    const btn = document.getElementById('btn-fixed');
    const trigger = document.getElementById('price-card');

    if (btn && trigger) {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // cuando el elemento ya quedó 300px arriba del viewport
                if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                    btn.classList.add('visible');
                } else {
                    btn.classList.remove('visible');
                }
            },
            {
            threshold: 0
            }
        );

        observer.observe(trigger);
    }

    //Acordeones
    document.querySelectorAll(".accordion-item").forEach(unit => {

    const titleUnit = unit.querySelector(".accordion-button");

    // Contadores de las clases
    const completedEl = unit.querySelector(".completed-class");
    const totalEl = unit.querySelector(".total-class");

    // Checkbox de clases
    const checks = unit.querySelectorAll(".lesson-check");

    function formatNumber(num) {
        return num < 10 ? `0${num}` : num;
    }

    // Total de capítulos
    if (totalEl) {
        /* totalEl.textContent = checks.length; */
        totalEl.textContent = formatNumber(checks.length);
    }

    

    function updateProgress() {
        const completed = [...checks].filter(check => check.checked).length;

        if (completedEl) {
        /* completedEl.textContent = completed; */
        completedEl.textContent = formatNumber(completed);
        }

        // Unidad completada (todos los capítulos)
        if (completed === checks.length && checks.length > 0) {
        titleUnit.classList.add("unit-completed");
        } else {
        titleUnit.classList.remove("unit-completed");
        }
    }

    // Escuchar clicks en los checks
    checks.forEach(check => {
        check.addEventListener("change", updateProgress);
    });

    // Inicializar al cargar
    updateProgress();
    });

    //cortar el contenedor de descripción
    document.querySelectorAll('.btn-see-more').forEach(btnWrapper => {
        const link = btnWrapper.querySelector('.ver-mas');

        // 👇 subir al contenedor correcto
        const wrap = btnWrapper.closest('.description-wrap');

        if (!wrap) return;

        // 🔍 mostrar botón solo si hay overflow
        if (wrap.scrollHeight <= wrap.clientHeight + 1) {
            btnWrapper.style.display = 'none';
            return;
        }

        link.addEventListener('click', e => {
            e.preventDefault();

            wrap.classList.toggle('expandido');
            link.classList.toggle('activo');

            const span = link.querySelector('span');
            span.textContent = wrap.classList.contains('expandido')
            ? 'Ver menos'
            : 'Ver más';
        });
    });

});