document.addEventListener('DOMContentLoaded', () => {

    // --- DATABASE: SERVICE CONTENT ---
    // This data populates the service-detail.html page based on the ID in the URL.
    const serviceData = {
        
        // --- AUDIO PAGE (Linked from "Details" on Index) ---
        "audio_music": {
            title: "AUDIO PRODUKTION",
            image: "1.jpeg", // Ensure this image exists
            intro: "Audio ist für uns kein einzelner Arbeitsschritt, sondern ein durchgängiger Prozess.",
            desc: "Von der ersten Aufnahme bis zum finalen Mix geht es um Kontrolle, Präzision und ein sauberes Gefühl für Klang, Raum und Dynamik. Wir arbeiten seit Jahren mit Artists, Unternehmen und Veranstaltern in unterschiedlichsten Produktionssituationen: im Studio, auf Sets, bei Live-Events und in komplexen Kampagnen. Diese Erfahrung prägt unsere Arbeitsweise. Wir hören genau hin, treffen bewusste Entscheidungen und setzen Technik gezielt ein – nicht, um sie zu zeigen, sondern um Ergebnisse zu liefern, die funktionieren. Ob Recording, Mixing, Mastering, Sounddesign oder Live-Audio: Unser Anspruch ist immer derselbe – klanglich sauber, technisch belastbar und musikalisch sinnvoll.",
            list: ["Recording", "Mixing", "Mastering", "Sounddesign", "Live-Audio", "Set-Ton"]
        },

        // --- VIDEO PAGE (Linked from "Details" on Index) ---
        "video_music": {
            title: "VIDEO & CONTENT",
            image: "4.jpeg", // Ensure this image exists
            intro: "Visuelle Inhalte entscheiden darüber, wie Projekte wahrgenommen werden.",
            desc: "Wir entwickeln Video- und Bildcontent, der klar kommuniziert, professionell umgesetzt ist und zur jeweiligen Marke, Musik oder Idee passt. WESTROOMZ begleitet Artists, Brands und Creator von der Konzeption bis zur finalen Ausspielung – für einzelne Produktionen oder zusammenhängende Kampagnen. Von Musikvideos über Social Media Content bis hin zu hochwertigen Imagefilmen.",
            list: ["Musikvideos & Performance", "Artist Visuals", "Werbe- & Imagefilme", "Social-Media-Content", "Video Podcasts", "Produktbilder", "Cover Art", "Kampagnen-Content"]
        },

        // --- EVENTS PAGE (Linked from "Details" on Index) ---
        "event_planning": {
            title: "EVENTS & LIVE",
            image: "7.jpeg", // Ensure this image exists
            intro: "Events erfordern mehr als Technik. Wir liefern Struktur.",
            desc: "WESTROOMZ ist an Veranstaltungen in unterschiedlichen Rollen beteiligt – von technischer Umsetzung bis zur vollständigen Produktionsbegleitung. Wir liefern Struktur, Know-how und eine saubere Umsetzung - von der Planung bis zum laufenden Betrieb vor Ort. Wir begleiten Veranstaltungen modular oder ganzheitlich und übernehmen Verantwortung dort, wo sie gebraucht wird.",
            list: ["Eventplanung & Konzepte", "Live Mixing", "Audio- & Videoproduktion", "Event-Fotografie", "DJ-Services", "Ablauf & Koordination"]
        },

        // --- LEGACY/UNUSED KEYS (Kept just in case you link them later) ---
        "audio_commercial": { title: "COMMERCIAL", image: "2.jpeg", intro: "...", desc: "...", list: [] },
        "audio_podcast": { title: "PODCASTS", image: "3.jpeg", intro: "...", desc: "...", list: [] }
    };

    // --- DYNAMIC PAGE LOADER ---
    // Checks if we are on service-detail.html and loads the correct text
    if(window.location.pathname.includes('service-detail.html')) {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        
        if(id && serviceData[id]) {
            const data = serviceData[id];
            
            // Set Title
            const titleEl = document.getElementById('detailTitle');
            if(titleEl) titleEl.innerText = data.title;
            
            // Set Background Image
            const bgEl = document.getElementById('detailBg');
            if(bgEl) bgEl.src = data.image; 
            
            // Set Red Intro Text
            const introEl = document.getElementById('detailIntro');
            if(introEl) introEl.innerText = data.intro;
            
            // Set Description Paragraph
            const descEl = document.getElementById('detailDesc');
            if(descEl) descEl.innerText = data.desc;
            
            // Build the List
            const listContainer = document.getElementById('detailList');
            if(listContainer) {
                listContainer.innerHTML = ''; 
                data.list.forEach((item, index) => {
                    const li = document.createElement('li');
                    // Formats number as 01, 02, etc.
                    li.innerHTML = `${item} <span>0${index + 1}</span>`;
                    listContainer.appendChild(li);
                });
            }
            
            // Wire up the Contact Button
            const contactBtn = document.getElementById('detailContactBtn');
            if(contactBtn) {
                contactBtn.onclick = () => {
                    window.location.href = `index.html#contact`; 
                };
            }
        } else {
            console.log("Service ID not found or missing");
        }
    }

    // --- 0. PAGE TRANSITION ---
    const curtain = document.querySelector('.page-transition-curtain');
    if(curtain) {
        gsap.to(curtain, { scaleY: 0, transformOrigin: "top", duration: 0.6, ease: "power4.inOut", delay: 0.2 });
    }

    // --- 1. CUSTOM CURSOR ---
    if (window.matchMedia("(min-width: 769px)").matches) {
        const cursor = document.querySelector('.cursor');
        const ring = document.querySelector('.cursor-ring');
        if(cursor && ring) {
            cursor.style.display = 'block'; ring.style.display = 'block';
            let mouseX = 0, mouseY = 0, isMoving = false;
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX; mouseY = e.clientY;
                if (!isMoving) {
                    isMoving = true;
                    requestAnimationFrame(() => {
                        cursor.style.left = mouseX + 'px'; cursor.style.top = mouseY + 'px';
                        ring.style.left = mouseX + 'px'; ring.style.top = mouseY + 'px';
                        isMoving = false;
                    });
                }
            });
            document.querySelectorAll('.interactive').forEach(el => {
                el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
                el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
            });
        }
    }

    // --- 2. SMOOTH SCROLL (LENIS) ---
    if(typeof Lenis !== 'undefined') {
        const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true, smoothTouch: false });
        function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
        requestAnimationFrame(raf);
        if(typeof ScrollTrigger !== 'undefined') {
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => { lenis.raf(time * 1000); });
            gsap.ticker.lagSmoothing(0);
        }
        window.lenis = lenis;
    }

    // --- 3. MENU TOGGLE ---
    window.toggleMenu = function() {
        const menu = document.querySelector('.side-menu');
        const overlay = document.querySelector('.menu-overlay');
        const btn = document.querySelector('.menu-toggle-btn');
        if(menu && overlay && btn) {
            menu.classList.toggle('active'); overlay.classList.toggle('active'); btn.classList.toggle('open');
            if(menu.classList.contains('active')){
                gsap.fromTo('.menu-link', {x: -30, opacity: 0}, {x: 0, opacity: 1, stagger: 0.1, delay: 0.2});
            }
        }
    }

    // --- 4. VIDEO HANDLING (For Index) ---
    const videos = document.querySelectorAll('video');
    const heroText = document.querySelector(".hero-sub");
    if(videos.length > 0 && heroText) {
        gsap.set(heroText, { opacity: 0, y: 20 });
        videos.forEach(video => {
            video.muted = true; video.play().catch(() => {});
            video.addEventListener('timeupdate', () => {
                if (video.currentTime >= 4.5 && gsap.getProperty(heroText, "opacity") === 0) {
                    gsap.to(heroText, { opacity: 1, y: 0, duration: 0.5 });
                } else if (video.currentTime < 0.5) {
                    gsap.set(heroText, { opacity: 0, y: 20 });
                }
            });
        });
    }

    // --- 5. GALLERY SLIDER (For Index) ---
    const slider = document.querySelector('.gallery-container');
    if(slider) {
        let isDown = false, startX, scrollLeft;
        function autoScroll() {
            if(!isDown && slider) {
                slider.scrollLeft += 0.5;
                if(slider.scrollLeft >= (slider.scrollWidth - slider.clientWidth)) slider.scrollLeft = 0;
            }
            requestAnimationFrame(autoScroll);
        }
        autoScroll();
        slider.addEventListener('mousedown', (e) => { isDown = true; slider.classList.add('active'); startX = e.pageX - slider.offsetLeft; scrollLeft = slider.scrollLeft; });
        slider.addEventListener('mouseleave', () => { isDown = false; slider.classList.remove('active'); });
        slider.addEventListener('mouseup', () => { isDown = false; slider.classList.remove('active'); });
        slider.addEventListener('mousemove', (e) => { if (!isDown) return; e.preventDefault(); const x = e.pageX - slider.offsetLeft; const walk = (x - startX) * 2; slider.scrollLeft = scrollLeft - walk; });
    }

    // --- 6. MODAL (For Gallery) ---
    const modal = document.getElementById('galleryModal');
    if(modal) {
        const modalTitle = document.getElementById('modalTitle');
        const modalGrid = document.getElementById('modalGrid');
        window.openModal = function(category) {
            modalTitle.innerText = category; modalGrid.innerHTML = ''; 
            for(let i=0; i<6; i++){ 
                const div = document.createElement('div'); div.className = 'modal-img'; 
                const img = document.createElement('img'); 
                const rand = Math.floor(Math.random() * 8) + 1; 
                img.src = rand + '.jpeg'; 
                div.appendChild(img); modalGrid.appendChild(div); 
            }
            modal.classList.add('active'); if(window.lenis) window.lenis.stop();
        }
        window.closeModal = function() { modal.classList.remove('active'); if(window.lenis) window.lenis.start(); }
    }

    // --- 7. TABS (For Services Section on Index) ---
    if(document.querySelector('.tabs-nav')) {
        window.openTab = function(tabName) {
            document.querySelectorAll('.service-container').forEach(c => c.classList.remove('active'));
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.getElementById(tabName).classList.add('active');
            const btns = document.querySelectorAll('.tab-btn');
            btns.forEach(b => { if(b.textContent.toLowerCase().includes(tabName)) b.classList.add('active'); });
            
            // Animation for tab content
            const content = document.querySelector(`#${tabName} .vision-text`);
            if(content) {
                gsap.fromTo(content, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
            }
            ScrollTrigger.refresh();
        }
        ScrollTrigger.create({ trigger: "#services", start: "top 75%", onEnter: () => window.openTab('audio') });
    }

    // --- 8. SCROLL ANIMATIONS ---
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, { scrollTrigger: { trigger: title, start: "top 90%", toggleActions: "play reverse play reverse" }, y: 50, opacity: 0, duration: 1 });
    });
    if(document.querySelector(".big-lead")) {
        gsap.from(".big-lead", { scrollTrigger: { trigger: ".big-lead", start: "top 80%", toggleActions: "play reverse play reverse" }, y: 50, opacity: 0, scale: 0.9, duration: 1.2, ease: "power3.out" });
        gsap.to(".vision-text p", { scrollTrigger: { trigger: ".vision-text", start: "top 80%", toggleActions: "play reverse play reverse" }, y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.out" });
    }
    
    // --- 9. CONTACT FORM ---
    const form = document.querySelector('.contact-form');
    if(form) {
        gsap.from(".contact-info", { scrollTrigger: { trigger: ".contact-grid", start: "top 90%", toggleActions: "play reverse play reverse" }, x: -30, opacity: 0, duration: 1 });
        gsap.from(".contact-form", { scrollTrigger: { trigger: ".contact-grid", start: "top 90%", toggleActions: "play reverse play reverse" }, x: 30, opacity: 0, duration: 1, delay: 0.2 });
        form.addEventListener('submit', (e) => { 
            e.preventDefault(); 
            const dept = document.getElementById('department').value; 
            const name = document.getElementById('name').value; 
            const project = document.getElementById('subject').value; 
            const message = document.getElementById('message').value; 
            const subjectLine = `WESTROOMZ ANFRAGE: ${dept} - ${project}`; 
            const body = `Name: ${name}%0D%0AAbteilung: ${dept}%0D%0AProjekt: ${project}%0D%0A%0D%0ANachricht:%0D%0A${message}`; 
            window.location.href = `mailto:INFO@WESTROOMZ.DE?subject=${subjectLine}&body=${body}`; 
        });
    }

    // --- 10. TRANSITION EXIT (Link Clicking) ---
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            // Allow JS calls, anchors, mailto to work normally
            if (href && !href.startsWith('#') && !href.startsWith('mailto') && !href.includes('javascript')) {
                e.preventDefault();
                if(curtain) {
                    gsap.fromTo(curtain, { scaleY: 0, transformOrigin: "bottom" }, { scaleY: 1, duration: 0.6, ease: "power4.inOut", onComplete: () => { window.location.href = href; } });
                } else {
                    window.location.href = href;
                }
            }
        });
    });
});