const locale = document.documentElement.lang.toLowerCase().startsWith("de") ? "de" : "en";
const uiStore = window.WESTROOMZ_PORTFOLIO_UI || {};
const portfolioStore = window.WESTROOMZ_PORTFOLIO || { projects: [] };
const projects = Array.isArray(portfolioStore.projects) ? portfolioStore.projects : [];

const ui = {
    all: "All",
    showAll: "Show all",
    requestWalkthrough: "Request Walkthrough",
    viewDetails: "View Details",
    noMatchesTitle: "No projects match this filter yet.",
    noMatchesBody: "Use the data file to add more cases in this category.",
    requestPrivateWalkthrough: "Request private walkthrough",
    close: "Close",
    ...(uiStore[locale] || {})
};

const filtersRoot = document.getElementById("project-filters");
const gridRoot = document.getElementById("project-grid");
const resetButton = document.getElementById("project-reset");
const modal = document.getElementById("project-modal");
const modalImage = document.getElementById("modal-image");
const modalKicker = document.getElementById("modal-kicker");
const modalTitle = document.getElementById("modal-title");
const modalSummary = document.getElementById("modal-summary");
const modalDeliverables = document.getElementById("modal-deliverables");
const modalStack = document.getElementById("modal-stack");
const modalOutcome = document.getElementById("modal-outcome");
const modalLinks = document.getElementById("modal-links");
const modalCloseButton = document.querySelector(".modal-close");
const closeModalNodes = document.querySelectorAll("[data-close-modal]");

const state = {
    activeFilter: ui.all,
    lastFocusedElement: null
};

function localize(value) {
    if (value === null || value === undefined) {
        return value;
    }

    if (typeof value === "object" && !Array.isArray(value) && ("de" in value || "en" in value)) {
        return value[locale] ?? value.en ?? value.de ?? "";
    }

    return value;
}

function localizeArray(value) {
    const result = localize(value);
    return Array.isArray(result) ? result : [];
}

function localizeLink(link) {
    return {
        ...link,
        label: localize(link.label),
        url: localize(link.url) || link.url
    };
}

const categories = [ui.all, ...new Set(projects.map((project) => localize(project.category)))];

function renderFilters() {
    if (!filtersRoot) {
        return;
    }

    filtersRoot.innerHTML = categories
        .map((category) => {
            const activeClass = category === state.activeFilter ? "is-active" : "";
            return `
                <button
                    class="filter-chip ${activeClass}"
                    type="button"
                    data-filter="${category}"
                    aria-pressed="${category === state.activeFilter}"
                >
                    ${category}
                </button>
            `;
        })
        .join("");
}

function filteredProjects() {
    if (state.activeFilter === ui.all) {
        return projects;
    }

    return projects.filter((project) => localize(project.category) === state.activeFilter);
}

function renderProjects() {
    if (!gridRoot) {
        return;
    }

    const visibleProjects = filteredProjects();

    if (!visibleProjects.length) {
        gridRoot.innerHTML = `
            <article class="project-card featured">
                <div class="project-copy">
                    <h3>${ui.noMatchesTitle}</h3>
                    <p>${ui.noMatchesBody}</p>
                </div>
            </article>
        `;
        observeRevealNodes();
        return;
    }

    gridRoot.innerHTML = visibleProjects
        .map((project) => {
            const localizedLinks = Array.isArray(project.links) ? project.links.map(localizeLink) : [];
            const tags = localizeArray(project.stack)
                .slice(0, 4)
                .map((tag) => `<span>${tag}</span>`)
                .join("");

            const primaryLink = localizedLinks.length > 0 ? localizedLinks[0] : null;
            const primaryAction = primaryLink
                ? `
                    <a
                        class="project-action-link"
                        href="${primaryLink.url}"
                        ${primaryLink.external ? 'target="_blank" rel="noreferrer"' : ""}
                    >
                        ${primaryLink.label}
                    </a>
                `
                : `
                    <a
                        class="project-action-link"
                        href="mailto:info@westroomz.de?subject=${encodeURIComponent(`${ui.requestWalkthrough}: ${localize(project.title)}`)}"
                    >
                        ${ui.requestWalkthrough}
                    </a>
                `;

            return `
                <article class="project-card ${project.featured ? "featured" : ""}" data-slug="${project.slug}" data-reveal>
                    <div class="project-media">
                        <img src="${project.image}" alt="${localize(project.imageAlt) || localize(project.title)}">
                        <div class="project-badges">
                            <span class="project-badge">${localize(project.category)}</span>
                            <span class="project-badge">${localize(project.availability)}</span>
                        </div>
                    </div>

                    <div class="project-copy">
                        <div class="project-meta">
                            <span class="project-client">${localize(project.client)}</span>
                            <span class="meta-badge">${localize(project.category)}</span>
                        </div>

                        <h3>${localize(project.title)}</h3>
                        <p>${localize(project.summary)}</p>

                        <div class="project-tags">${tags}</div>

                        <div class="project-actions">
                            ${primaryAction}
                            <button class="project-action-button" type="button" data-open-modal="${project.slug}">
                                ${ui.viewDetails}
                            </button>
                        </div>
                    </div>
                </article>
            `;
        })
        .join("");

    observeRevealNodes();
}

function findProject(slug) {
    return projects.find((project) => project.slug === slug);
}

function buildList(items) {
    return localizeArray(items).map((item) => `<li>${item}</li>`).join("");
}

function buildModalLinks(project) {
    const localizedLinks = Array.isArray(project.links) ? project.links.map(localizeLink) : [];

    if (localizedLinks.length > 0) {
        return localizedLinks
            .map(
                (link) => `
                    <a href="${link.url}" ${link.external ? 'target="_blank" rel="noreferrer"' : ""}>
                        ${link.label}
                    </a>
                `
            )
            .join("");
    }

    return `
        <a href="mailto:info@westroomz.de?subject=${encodeURIComponent(`${ui.requestWalkthrough}: ${localize(project.title)}`)}">
            ${ui.requestPrivateWalkthrough}
        </a>
    `;
}

function openModal(slug) {
    const project = findProject(slug);

    if (!project || !modal) {
        return;
    }

    state.lastFocusedElement = document.activeElement;
    modalImage.src = project.image;
    modalImage.alt = localize(project.imageAlt) || localize(project.title);
    modalKicker.textContent = `${localize(project.client)} / ${localize(project.category)} / ${localize(project.availability)}`;
    modalTitle.textContent = localize(project.title);
    modalSummary.textContent = localize(project.summary);
    modalDeliverables.innerHTML = buildList(project.deliverables);
    modalStack.innerHTML = buildList(project.stack);
    modalOutcome.textContent = localize(project.outcome);
    modalLinks.innerHTML = buildModalLinks(project);

    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (modalCloseButton) {
        modalCloseButton.focus();
    }
}

function closeModal() {
    if (!modal) {
        return;
    }

    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (state.lastFocusedElement instanceof HTMLElement) {
        state.lastFocusedElement.focus();
    }
}

function handleFilterClick(event) {
    const button = event.target.closest("[data-filter]");

    if (!button) {
        return;
    }

    state.activeFilter = button.dataset.filter || ui.all;
    renderFilters();
    renderProjects();
}

function observeRevealNodes() {
    if (!("IntersectionObserver" in window)) {
        document.querySelectorAll("[data-reveal]").forEach((node) => node.classList.add("is-visible"));
        return;
    }

    const nodes = document.querySelectorAll("[data-reveal]:not([data-reveal-bound])");

    nodes.forEach((node) => {
        node.setAttribute("data-reveal-bound", "true");
        revealObserver.observe(node);
    });
}

const revealObserver = "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.18
        }
    )
    : null;

if (resetButton) {
    resetButton.textContent = ui.showAll;
    resetButton.addEventListener("click", () => {
        state.activeFilter = ui.all;
        renderFilters();
        renderProjects();
    });
}

if (filtersRoot) {
    filtersRoot.addEventListener("click", handleFilterClick);
}

if (gridRoot) {
    gridRoot.addEventListener("click", (event) => {
        const trigger = event.target.closest("[data-open-modal]");

        if (!trigger) {
            return;
        }

        openModal(trigger.getAttribute("data-open-modal"));
    });
}

if (modalCloseButton) {
    modalCloseButton.textContent = ui.close;
}

closeModalNodes.forEach((node) => {
    node.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal && !modal.classList.contains("hidden")) {
        closeModal();
    }
});

renderFilters();
renderProjects();
observeRevealNodes();
