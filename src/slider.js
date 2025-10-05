class CustomSwiper extends HTMLElement {
    constructor() {
        super();
        this.wrapper = null;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        // Create structure
        const container = document.createElement('div');
        container.classList.add('swiper');

        const wrapper = document.createElement('div');
        wrapper.classList.add('swiper-wrapper');
        this.wrapper = wrapper;

        const prevBtn = document.createElement('button');
        const nextBtn = document.createElement('button');
        prevBtn.className = 'prev-slide-btn';
        prevBtn.innerHTML = '<i class="bi bi-chevron-left"></i>';

        nextBtn.className = 'next-slide-btn';
        nextBtn.innerHTML = '<i class="bi bi-chevron-right"></i>';

        container.appendChild(prevBtn);
        container.appendChild(nextBtn);


        const pagination = document.createElement('div');
        pagination.className = 'slider-pagination';
        container.appendChild(pagination);

        // Move child slides into wrapper
        Array.from(this.children).forEach(child => {
            if (child.classList.contains('swiper-slide')) {
                wrapper.appendChild(child);
            }
        });

        container.appendChild(wrapper);
        this.innerHTML = '';
        this.appendChild(container);

        // Parse options from attributes
        const autoplay = this.getAttribute('autoplay') === 'true';
        const loop = this.getAttribute('loop') === 'true';
        const speed = this.getAttribute('speed');
        const breakpoints = this.getAttribute('breakpoints');
        let parsedBreakpoints = {};

        try {
            if (breakpoints) parsedBreakpoints = JSON.parse(breakpoints);
        } catch (e) {
            console.warn('Invalid breakpoints JSON', e);
        }

        // Init Swiper
        new Swiper(container, {
            loop,
            speed: speed ? parseInt(speed, 10) : 600,
            autoplay: autoplay ? { delay: 3000, disableOnInteraction: false } : false,
            slidesPerView: 1,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            spaceBetween: 10,
            breakpoints: parsedBreakpoints,
            navigation: {
                nextEl: nextBtn,
                prevEl: prevBtn,
            },
            pagination: {
                el: pagination,
                clickable: true,
            },
        });
    }
}

customElements.define('custom-swiper', CustomSwiper);