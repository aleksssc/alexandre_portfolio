document.addEventListener("DOMContentLoaded", async () => {

    const wrapper = document.querySelector(".projectSwiper .swiper-wrapper");

    try {

        const response = await fetch("assets/data/projects.json");

        if (!response.ok) {
            throw new Error("Failed to load projects.json");
        }

        const projects = await response.json();

        wrapper.innerHTML = "";

        projects.forEach(project => {

            const slide = document.createElement("div");

            slide.classList.add("swiper-slide");

            const tags = project.tags
                .map(tag => `<span>${tag}</span>`)
                .join("");

            slide.innerHTML = `
                <div class="project-card">

                    <div class="project-image">
                        <img
                            src="${project.image}"
                            alt="${project.name}"
                            loading="lazy"
                        >
                    </div>

                    <div class="project-content">

                        <h3>${project.name}</h3>

                        <p>
                            ${project.description}
                        </p>

                        <div class="project-tags">
                            ${tags}
                        </div>

                        <a
                            href="${project.github}"
                            class="project-button"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Explore
                        </a>

                    </div>

                </div>
            `;

            wrapper.appendChild(slide);

        });


        // Inicializar Swiper APENAS depois dos projetos existirem
        new Swiper(".projectSwiper", {

            effect: "coverflow",

            centeredSlides: true,

            initialSlide: 1,

            slidesPerView: 3,

            breakpoints: {

                0: {
                    slidesPerView: 1.3,
                    spaceBetween: 0
                },

                576: {
                    slidesPerView: 1.5
                },

                768: {
                    slidesPerView: 2
                },

                992: {
                    slidesPerView: 3
                }

            },

            loop: false,

            grabCursor: true,

            watchSlidesProgress: true,

            coverflowEffect: {

                rotate: window.innerWidth < 768 ? 0 : 18,

                depth: window.innerWidth < 768 ? 0 : 250,

                scale: window.innerWidth < 768 ? 0.85 : 0.82,

                slideShadows: false

            },

            pagination: {

                el: ".swiper-pagination",

                clickable: true

            },

            navigation: {

                nextEl: ".swiper-button-next",

                prevEl: ".swiper-button-prev"

            }

        });


    } catch (error) {

        console.error("Error loading projects:", error);

    }

});