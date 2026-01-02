document.addEventListener('DOMContentLoaded', () => {
    
    // --- DATABASE: SERVICE CONTENT ---
    const serviceData = {
        "audio_music": {
            title: "MUSIK & RECORDING",
            image: "1.jpeg", 
            intro: "Wir bieten Künstlern die perfekte Umgebung für ihre Vision. Von der ersten Demo bis zum Radio-Ready Master.",
            desc: "Unser Studio ist optimiert für Vocal-Recordings und Band-Produktionen. Wir arbeiten mit High-End Equipment und einer akustisch eingemessenen Regie, um sicherzustellen, dass jede Nuance deiner Performance eingefangen wird. Egal ob Newcomer oder etablierter Artist – wir finden den Sound, der zu dir passt.",
            list: ["Vocal Recording", "Instrumental Recording", "Mixing (Stereo & Atmos)", "Mastering", "Vocal Tuning & Editing", "Beatproduction", "Songwriting Support"]
        },
        "audio_commercial": {
            title: "WERBUNG & SOUNDDESIGN",
            image: "2.jpeg",
            intro: "Klang, der Marken identifizierbar macht. Audio-Branding und Commercials auf höchstem Niveau.",
            desc: "In der Werbung zählt jede Sekunde. Wir kreieren Soundwelten, die Emotionen wecken und im Kopf bleiben. Vom Voice-Over Recording mit professionellen Sprechern bis hin zum individuellen Sounddesign für Imagefilme – wir liefern den perfekten Ton für dein Bild.",
            list: ["TV & Radio Spots", "Voice Over Recording", "Sounddesign", "Audio Branding", "Podcast Intro/Outro", "Set-Ton (O-Ton)", "Mixing für Broadcast (R128)"]
        },
        "audio_podcast": {
            title: "PODCAST PRODUKTION",
            image: "3.jpeg",
            intro: "Deine Stimme, deine Story. Wir kümmern uns um die Technik, du dich um den Inhalt.",
            desc: "Podcasts sind das Medium der Stunde. Wir bieten Full-Service Pakete: Von der Aufnahme in unserem gemütlichen Studio (oder mobil bei dir) über den Schnitt und das Entfernen von Störgeräuschen bis hin zum Upload auf alle gängigen Plattformen.",
            list: ["Podcast Recording (Audio & Video)", "Remote Recording", "Schnitt & Editing", "Restaurierung & Rauschminderung", "Jingles & Soundbeds", "Distribution & Hosting Setup"]
        },
        "video_music": {
            title: "MUSIKVIDEOS",
            image: "4.jpeg",
            intro: "Visuals, die deine Musik verstärken. Von Low-Budget Performance bis High-End Storytelling.",
            desc: "Ein Song ist erst mit dem richtigen Video komplett. Wir entwickeln Konzepte, die visuell beeindrucken und zum Vibe des Tracks passen. Unser Team übernimmt Planung, Dreh, Schnitt und Color Grading aus einer Hand.",
            list: ["Konzeption & Storyboard", "Performance Videos", "Storytelling Musikvideos", "4K Produktion", "Color Grading", "VFX & Effekte", "Social Media Teaser"]
        },
        "video_ads": {
            title: "WERBEFILME & IMAGE",
            image: "5.jpeg",
            intro: "Zeig dein Unternehmen von der besten Seite. Hochwertige Imagefilme und Produktvideos.",
            desc: "Bewegtbild ist der stärkste Verkaufstreiber. Wir produzieren Imagefilme, die deine Firmenphilosophie transportieren, und Produktvideos, die Features verständlich erklären. Clean, modern und zielgruppenorientiert.",
            list: ["Imagefilme", "Produktvideos", "Recruiting Videos", "Interviews", "Social Ads (9:16)", "Drohnenaufnahmen"]
        },
        "video_content": {
            title: "SOCIAL CONTENT",
            image: "6.jpeg",
            intro: "Content, der performed. Schnell, authentisch und perfekt für TikTok, Reels und Shorts.",
            desc: "Social Media braucht Frequenz. Wir produzieren Content-Reihen, Snippets und Behind-the-Scenes Material, das deine Community bindet. Wir kennen die Trends und wissen, wie man Aufmerksamkeit in den ersten 3 Sekunden gewinnt.",
            list: ["Reels & TikTok Produktion", "Event Begleitung", "Behind The Scenes", "Video Podcasts", "Studio Shootings", "Content Strategie"]
        },
        "event_planning": {
            title: "EVENT PLANUNG",
            image: "7.jpeg",
            intro: "Events, die man nicht vergisst. Strukturierte Planung für reibungslose Abläufe.",
            desc: "Ein gutes Event beginnt im Kopf. Wir übernehmen die technische und organisatorische Planung deiner Veranstaltung. Egal ob Corporate Event, Club-Show oder Festival – wir erstellen Ablaufpläne, buchen Crews und koordinieren die Gewerke.",
            list: ["Konzeption", "Technische Planung", "Location Scouting", "Künstler Booking", "Ablaufregie", "Budgetierung"]
        },
        "event_production": {
            title: "EVENT PRODUKTION",
            image: "8.jpeg",
            intro: "Licht, Ton, Action. Wir sorgen für die perfekte technische Umsetzung vor Ort.",
            desc: "Wenn es live geht, muss alles sitzen. Wir stellen erfahrenes Personal für Ton, Licht und Video. Unsere Techniker sorgen dafür, dass der Sound drückt, das Licht stimmt und die Atmosphäre perfekt ist.",
            list: ["Live Mischen (FOH/Monitor)", "Lichtdesign & Operating", "Bühnenbau", "Videowalls & Projektion", "Livestreaming", "Technische Leitung"]
        },
        "event_content": {
            title: "EVENT CONTENT",
            image: "1.jpeg",
            intro: "Halte den Moment fest. Hochwertige Aftermovies und Live-Content.",
            desc: "Das Event ist vorbei, aber der Hype bleibt. Wir begleiten deine Veranstaltung mit Kameras und liefern noch am selben Abend erste Snippets für Social Media. Im Anschluss produzieren wir emotionale Aftermovies, die Lust auf das nächste Mal machen.",
            list: ["Aftermovies", "Fotografie", "Live Social Media Coverage", "Interview Ecken", "Recap Videos"]
        }
    };

    // --- DYNAMIC PAGE LOADER ---
    // Check if we are on the service-detail.html page
    if(window.location.pathname.includes('service-detail.html')) {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        
        if(id && serviceData[id]) {
            const data = serviceData[id];
            
            // Populate Content
            const titleEl = document.getElementById('detailTitle');
            if(titleEl) titleEl.innerText = data.title;
            
            const bgEl = document.getElementById('detailBg');
            if(bgEl) bgEl.src = data.image; 
            
            const introEl = document.getElementById('detailIntro');
            if(introEl) introEl.innerText = data.intro;
            
            const descEl = document.getElementById('detailDesc');
            if(descEl) descEl.innerText = data.desc;
            
            const listContainer = document.getElementById('detailList');
            if(listContainer) {
                listContainer.innerHTML = ''; // Clear existing
                data.list.forEach((item, index) => {
                    const li = document.createElement('li');
                    li.innerHTML = `${item} <span>0${index + 1}</span>`;
                    listContainer.appendChild(li);
                });
            }
            
            const contactBtn = document.getElementById('detailContactBtn');
            if(contactBtn) {
                contactBtn.onclick = () => {
                    window.location.href = `index.html#contact`; 
                };
            }
        } else {
            // Fallback if ID is wrong
            // window.location.href = 'index.html'; // Optional: Redirect home
        }
    }

    // --- 0. PAGE TRANSITION (FASTER CURTAIN) ---
    const curtain = document.querySelector('.page-transition-curtain');
    if(curtain) {
        gsap.to(curtain, { scaleY: 0, transformOrigin: "top", duration: 0.6, ease: "power4.inOut", delay: 0.2 });
    }

    // 1. FORCE CURSOR
    if (window.matchMedia("(min-width: 769px)").matches) {
        const cursor = document.querySelector('.cursor');
        const ring = document.querySelector('.cursor-ring');
        if(cursor && ring) {
            cursor.style.display = 'block'; ring.style.display = 'block';
            let mouseX = 0, mouseY = 0, isMoving = false;
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX; mouseY = e.clientY;
                if (!isMoving) { isMoving = true; requestAnimationFrame(() => { cursor.style.left = mouseX + 'px'; cursor.style.top = mouseY + 'px'; ring.style.left = mouseX + 'px'; ring.style.top = mouseY + 'px'; isMoving = false; }); }
            });
            document.querySelectorAll('.interactive').forEach(el => { el.addEventListener('mouseenter', () => document.body.classList.add('hovering')); el.addEventListener('mouseleave', () => document.body.classList.remove('hovering')); });
        }
    }

    // 2. SMOOTH SCROLL
    if(typeof Lenis !== 'undefined') {
        const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true, smoothTouch: false });
        function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
        requestAnimationFrame(raf);
        if(typeof ScrollTrigger !== 'undefined') { lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add((time) => { lenis.raf(time * 1000); }); gsap.ticker.lagSmoothing(0); }
        window.lenis = lenis;
    }

    // 3. MENU
    window.toggleMenu = function() {
        const menu = document.querySelector('.side-menu');
        const overlay = document.querySelector('.menu-overlay');
        const btn = document.querySelector('.menu-toggle-btn');
        if(menu && overlay && btn) { menu.classList.toggle('active'); overlay.classList.toggle('active'); btn.classList.toggle('open'); if(menu.classList.contains('active')){ gsap.fromTo('.menu-link', {x: -30, opacity: 0}, {x: 0, opacity: 1, stagger: 0.1, delay: 0.2}); } }
    }

    // 4. VIDEO
    const videos = document.querySelectorAll('video');
    const heroText = document.querySelector(".hero-sub");
    if(videos.length > 0 && heroText) {
        gsap.set(heroText, { opacity: 0, y: 20 });
        videos.forEach(video => {
            video.muted = true; video.play().catch(() => {});
            video.addEventListener('timeupdate', () => { if (video.currentTime >= 4.5 && gsap.getProperty(heroText, "opacity") === 0) { gsap.to(heroText, { opacity: 1, y: 0, duration: 0.5 }); } else if (video.currentTime < 0.5) { gsap.set(heroText, { opacity: 0, y: 20 }); } });
        });
    }

    // 5. GALLERY
    const slider = document.querySelector('.gallery-container');
    if(slider) {
        let isDown = false, startX, scrollLeft;
        function autoScroll() { if(!isDown && slider) { slider.scrollLeft += 0.5; if(slider.scrollLeft >= (slider.scrollWidth - slider.clientWidth)) slider.scrollLeft = 0; } requestAnimationFrame(autoScroll); }
        autoScroll();
        slider.addEventListener('mousedown', (e) => { isDown = true; slider.classList.add('active'); startX = e.pageX - slider.offsetLeft; scrollLeft = slider.scrollLeft; });
        slider.addEventListener('mouseleave', () => { isDown = false; slider.classList.remove('active'); });
        slider.addEventListener('mouseup', () => { isDown = false; slider.classList.remove('active'); });
        slider.addEventListener('mousemove', (e) => { if (!isDown) return; e.preventDefault(); const x = e.pageX - slider.offsetLeft; const walk = (x - startX) * 2; slider.scrollLeft = scrollLeft - walk; });
    }

    // 6. MODAL
    const modal = document.getElementById('galleryModal');
    if(modal) {
        const modalTitle = document.getElementById('modalTitle');
        const modalGrid = document.getElementById('modalGrid');
        window.openModal = function(category) {
            modalTitle.innerText = category; modalGrid.innerHTML = ''; 
            for(let i=0; i<6; i++){ const div = document.createElement('div'); div.className = 'modal-img'; const img = document.createElement('img'); const rand = Math.floor(Math.random() * 8) + 1; img.src = rand + '.jpeg'; div.appendChild(img); modalGrid.appendChild(div); }
            modal.classList.add('active'); if(window.lenis) window.lenis.stop();
        }
        window.closeModal = function() { modal.classList.remove('active'); if(window.lenis) window.lenis.start(); }
    }

    // 7. TABS
    if(document.querySelector('.tabs-nav')) {
        window.openTab = function(tabName) {
            document.querySelectorAll('.service-container').forEach(c => c.classList.remove('active'));
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.getElementById(tabName).classList.add('active');
            const btns = document.querySelectorAll('.tab-btn');
            btns.forEach(b => { if(b.textContent.toLowerCase().includes(tabName)) b.classList.add('active'); });
            const cards = document.querySelectorAll(`#${tabName} .service-card`);
            gsap.fromTo(cards, { y: 30, opacity: 0, autoAlpha: 0, filter: "blur(10px)" }, { y: 0, opacity: 1, autoAlpha: 1, filter: "blur(0px)", duration: 0.6, stagger: 0.1, ease: "power3.out", overwrite: true });
            ScrollTrigger.refresh();
        }
        window.prefill = function(service) { const input = document.getElementById('subject'); if(input) input.value = service; }
        ScrollTrigger.create({ trigger: "#services", start: "top 75%", onEnter: () => window.openTab('audio') });
    }

    // 8. SCROLL ANIMATIONS
    gsap.utils.toArray('.section-title').forEach(title => { gsap.from(title, { scrollTrigger: { trigger: title, start: "top 90%", toggleActions: "play reverse play reverse" }, y: 50, opacity: 0, duration: 1 }); });
    if(document.querySelector(".big-lead")) { gsap.from(".big-lead", { scrollTrigger: { trigger: ".big-lead", start: "top 80%", toggleActions: "play reverse play reverse" }, y: 50, opacity: 0, scale: 0.9, duration: 1.2, ease: "power3.out" }); gsap.to(".vision-text p", { scrollTrigger: { trigger: ".vision-text", start: "top 80%", toggleActions: "play reverse play reverse" }, y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.out" }); }
    if(document.querySelector(".network-text")) { gsap.to(".network-text > *", { scrollTrigger: { trigger: ".network-section", start: "top 70%", toggleActions: "play reverse play reverse" }, y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power2.out" }); gsap.to(".network-logo-container", { scrollTrigger: { trigger: ".network-logo-container", start: "top 85%", toggleActions: "play reverse play reverse" }, y: 0, opacity: 1, duration: 1.2, delay: 0.3, ease: "power3.out" }); }
    
    // CONTACT FORM
    const form = document.querySelector('.contact-form');
    if(form) {
        gsap.from(".contact-info", { scrollTrigger: { trigger: ".contact-grid", start: "top 90%", toggleActions: "play reverse play reverse" }, x: -30, opacity: 0, duration: 1 });
        gsap.from(".contact-form", { scrollTrigger: { trigger: ".contact-grid", start: "top 90%", toggleActions: "play reverse play reverse" }, x: 30, opacity: 0, duration: 1, delay: 0.2 });
        form.addEventListener('submit', (e) => { e.preventDefault(); const dept = document.getElementById('department').value; const name = document.getElementById('name').value; const project = document.getElementById('subject').value; const message = document.getElementById('message').value; const subjectLine = `WESTROOMZ ANFRAGE: ${dept} - ${project}`; const body = `Name: ${name}%0D%0AAbteilung: ${dept}%0D%0AProjekt: ${project}%0D%0A%0D%0ANachricht:%0D%0A${message}`; window.location.href = `mailto:INFO@WESTROOMZ.DE?subject=${subjectLine}&body=${body}`; });
    }

    // 9. TRANSITION EXIT
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('mailto') && !href.includes('javascript')) {
                e.preventDefault();
                if(curtain) { gsap.fromTo(curtain, { scaleY: 0, transformOrigin: "bottom" }, { scaleY: 1, duration: 0.6, ease: "power4.inOut", onComplete: () => { window.location.href = href; } }); } else { window.location.href = href; }
            }
        });
    });
});