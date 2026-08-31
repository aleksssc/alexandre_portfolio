document.addEventListener("DOMContentLoaded", async () => {

    try {

        const response = await fetch("assets/data/projects.json");

        if (!response.ok) {
            throw new Error("Failed to load projects.");
        }

        const projects = await response.json();


        /* ==========================================
                    FEATURED PROJECTS
        ========================================== */

        const featuredProjects = projects.filter(
            project => project.featured
        );

        renderFeaturedProjects(featuredProjects);

        initSwiper();


        /* ==========================================
                    ALL PROJECTS
        ========================================== */

        renderProjectsGrid(projects);

        initProjectFilters(projects);


    } catch (error) {

        console.error("Error loading projects:", error);

    }

});



/* ==========================================
        FEATURED PROJECTS CAROUSEL
========================================== */

function renderFeaturedProjects(projects) {

    const wrapper = document.querySelector(
        ".projectSwiper .swiper-wrapper"
    );

    wrapper.innerHTML = "";


    projects.forEach(project => {

        const slide = document.createElement("div");

        slide.classList.add("swiper-slide");


        const tags = project.tags
            .map(tag => `<span>${tag}</span>`)
            .join("");


        let button = "";


        /* DEVELOPMENT */

        if (project.status === "development") {

            button = `
                <span class="project-button development">
                    <i class="fa-solid fa-code"></i>
                    Development
                </span>
            `;

        }


        /* LIVE WEBSITE */

        else if (project.demo) {

            button = `
                <a
                    href="${project.demo}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="project-button"
                >
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    Live Website
                </a>
            `;

        }


        /* EXPLORE */

        else if (project.github) {

            button = `
                <a
                    href="${project.github}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="project-button"
                >
                    <i class="fa-brands fa-github"></i>
                    Explore
                </a>
            `;

        }


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

                    <h3>
                        ${project.name}
                    </h3>

                    <p>
                        ${project.description}
                    </p>

                    <div class="project-tags">
                        ${tags}
                    </div>

                    ${button}

                </div>

            </div>

        `;


        wrapper.appendChild(slide);

    });

}



/* ==========================================
                SWIPER
========================================== */

function initSwiper() {

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

}



/* ==========================================
                PROJECT GRID
========================================== */

function renderProjectsGrid(projects) {

    const grid = document.getElementById("projects-grid");

    grid.innerHTML = "";


    projects.forEach(project => {

        const card = document.createElement("article");

        card.classList.add("project-grid-card");

        card.dataset.category = project.category;


        const tags = project.tags
            .map(tag => `<span>${tag}</span>`)
            .join("");


        let projectActions = "";


        /* DEVELOPMENT */

        if (project.status === "development") {

            projectActions = `
                <span class="grid-project-button development">
                    <i class="fa-solid fa-code"></i>
                    Development
                </span>
            `;

        }


        /* COMPLETED */

        else {

            const demoButton = project.demo
                ? `
                    <a
                        href="${project.demo}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="grid-project-button"
                    >
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        Live
                    </a>
                `
                : "";


            let projectButton = "";


            if (project.github) {

                const isGithub =
                    project.github.includes("github.com");


                projectButton = `
                    <a
                        href="${project.github}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="grid-project-button secondary"
                    >
                        <i class="${
                            isGithub
                                ? "fa-brands fa-github"
                                : "fa-solid fa-arrow-up-right-from-square"
                        }"></i>

                        ${isGithub ? "GitHub" : "Website"}
                    </a>
                `;

            }


            projectActions = `
                ${demoButton}
                ${projectButton}
            `;

        }


        card.innerHTML = `

            <div class="grid-project-image">

                <img
                    src="${project.image}"
                    alt="${project.name}"
                    loading="lazy"
                >

                <span class="project-category">
                    ${project.category}
                </span>

            </div>


            <div class="grid-project-content">

                <h3>
                    ${project.name}
                </h3>

                <p>
                    ${project.description}
                </p>


                <div class="grid-project-tags">
                    ${tags}
                </div>


                <div class="grid-project-actions">

                    ${projectActions}

                </div>

            </div>

        `;


        grid.appendChild(card);

    });

}



/* ==========================================
                FILTERS
========================================== */

function initProjectFilters(projects) {

    const buttons = document.querySelectorAll(
        ".project-filter"
    );


    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");


            const filter = button.dataset.filter;


            if (filter === "all") {

                renderProjectsGrid(projects);

                return;

            }


            const filteredProjects = projects.filter(
                project => project.category === filter
            );


            renderProjectsGrid(filteredProjects);

        });

    });

}