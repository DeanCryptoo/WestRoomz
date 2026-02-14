document.addEventListener('DOMContentLoaded', () => {

    // --- DATABASE: SERVICE CONTENT ---
    const serviceData = {
        
        "audio_music": {
            title: "AUDIO PRODUKTION",
            image: "1.jpeg",
            intro: "Audio ist für uns kein einzelner Arbeitsschritt, sondern ein durchgängiger Prozess.",
            desc: "Von der ersten Aufnahme bis zum finalen Mix geht es um Kontrolle, Präzision und ein sauberes Gefühl für Klang, Raum und Dynamik.",
            // HIER SIND DIE NEUEN TEXTE FÜR DEN REGLER:
            list: [
                { name: "Recording", text: "High-End Aufnahmen in akustisch optimierten Räumen für Vocals und Instrumente." },
                { name: "Mixing", text: "Wir bringen Balance, Tiefe und den nötigen Druck in deine Spuren." },
                { name: "Mastering", text: "Der letzte Schliff für Lautheit und Konsistenz auf allen Streaming-Plattformen." },
                { name: "Sounddesign", text: "Kreative Klanggestaltung für Filme, Games und Markenidentitäten." },
                { name: "Live-Audio", text: "Kristallklarer Sound für Events, Konzerte und Live-Übertragungen." },
                { name: "Set-Ton", text: "Professionelle Tonangel und Aufzeichnung direkt am Filmset." }
            ]
        },

        "video_music": {
            title: "VIDEO & CONTENT",
            image: "4.jpeg",
            intro: "Visuelle Inhalte entscheiden darüber, wie Projekte wahrgenommen werden.",
            desc: "Wir entwickeln Video- und Bildcontent, der klar kommuniziert, professionell umgesetzt ist und zur jeweiligen Marke passt.",
            list: [
                { name: "Musikvideos", text: "Cinematische Umsetzung deiner Songs – von der Idee bis zum Color Grading." },
                { name: "Visuals", text: "Looping Visuals und ästhetische Clips für Spotify Canvas oder Bühnen-LEDs." },
                { name: "Imagefilme", text: "Starke Bilder, die deine Marke oder dein Unternehmen authentisch präsentieren." },
                { name: "Social Media", text: "Snackable Content im 9:16 Format, optimiert für TikTok, Reels und Shorts." },
                { name: "Podcasts", text: "Video-Podcasts mit Multi-Cam Setup und professionellem Licht." },
                { name: "Fotos", text: "Hochauflösende Pressefotos, Editorials und Behind-the-Scenes Aufnahmen." },
                { name: "Cover Art", text: "Grafikdesign und Artwork für Singles, EPs und Album-Cover." },
                { name: "Kampagnen", text: "Ganzheitliche Content-Pakete für Produktlaunches oder Releases." }
            ]
        },

        "event_planning": {
            title: "EVENTS & LIVE",
            image: "7.jpeg",
            intro: "Events erfordern mehr als Technik. Wir liefern Struktur.",
            desc: "WESTROOMZ ist an Veranstaltungen in unterschiedlichen Rollen beteiligt – von technischer Umsetzung bis zur vollständigen Produktionsbegleitung.",
            list: [
                { name: "Planung", text: "Strukturierte Konzepte und Ablaufpläne für reibungslose Events." },
                { name: "Live Mixing", text: "FOH und Monitor-Mixing für Bands und Sprachbeschallung." },
                { name: "Produktion", text: "Technische Leitung und Koordination aller Gewerke vor Ort." },
                { name: "Fotografie", text: "Event-Dokumentation, die die Atmosphäre perfekt einfängt." },
                { name: "DJ-Service", text: "Professionelle DJs für Aftershows, Corporate Events und Partys." },
                { name: "Koordination", text: "Schnittstelle zwischen Veranstalter, Technik und Künstlern." }
            ]
        },

        "marketing_general": {
            title: "MARKETING & STRATEGIE",
            image: "5.jpeg",
            intro: "Sichtbarkeit ist kein Zufall, sondern das Ergebnis präziser Planung.",
            desc: "Marketing bei WESTROOMZ bedeutet nicht nur, Werbung zu schalten. Wir entwickeln ganzheitliche Strategien.",
            list: [
                { name: "Strategy", text: "Langfristige Pläne für Artist-Development und Markenaufbau." },
                { name: "Ads", text: "Zielgerichtete Werbeanzeigen auf Meta, Google und TikTok." },
                { name: "Branding", text: "Entwicklung einer visuellen Identität (CI/CD) und Logo-Design." },
                { name: "Management", text: "Beratung und Begleitung bei Releases und Karriereentscheidungen." },
                { name: "Content", text: "Strategische Planung von Content-Pieces für maximale Reichweite." },
                { name: "Analyse", text: "Auswertung von Daten und KPIs zur Optimierung der Performance." }
            ]
        }
    };

    // --- DYNAMIC PAGE LOADER & KNOB LOGIC ---
    if(window.location.pathname.includes('service-detail.html')) {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        
        if(id && serviceData[id]) {
            const data = serviceData[id];
            
            // Basic Texts
            const titleEl = document.getElementById('detailTitle');
            if(titleEl) titleEl.innerText = data.title;
            
            const bgEl = document.getElementById('detailBg');
            if(bgEl) bgEl.src = data.image; 
            
            const introEl = document.getElementById('detailIntro');
            if(introEl) introEl.innerText = data.intro;
            
            const descEl = document.getElementById('detailDesc');
            if(descEl) descEl.innerText = data.desc;
            
            const contactBtn = document.getElementById('detailContactBtn');
            if(contactBtn) {
                contactBtn.onclick = () => window.location.href = `index.html#contact`; 
            }

            // --- KNOB BUILDER LOGIC ---
            const listContainer = document.getElementById('detailList');
            if(listContainer && data.list.length > 0) {
                listContainer.innerHTML = ''; 
                
                // 1. Aufbau
                const interfaceDiv = document.createElement('div');
                interfaceDiv.className = 'knob-interface';
                
                const knob = document.createElement('div');
                knob.className = 'knob-control';
                // WICHTIG: Stelle sicher, dass knob.png existiert
                knob.innerHTML = '<img src="knob.png" class="knob-img" alt="Control Knob" draggable="false">';
                interfaceDiv.appendChild(knob);

                // Display Area
                const displayDiv = document.createElement('div');
                displayDiv.className = 'knob-display-area';
                
                const displayTitle = document.createElement('div');
                displayTitle.className = 'knob-display-title';
                displayTitle.innerText = data.list[0].name;
                
                const displayDesc = document.createElement('div');
                displayDesc.className = 'knob-display-desc';
                displayDesc.innerText = data.list[0].text; 
                
                displayDiv.appendChild(displayTitle);
                displayDiv.appendChild(displayDesc);

                listContainer.appendChild(interfaceDiv);
                listContainer.appendChild(displayDiv);

                // 2. Positionierung Labels
                const items = data.list;
                const radius = 135; 
                const totalAngle = 260; // Grad Umfang
                const startAngle = -130; // Start links unten
                const step = totalAngle / (items.length - 1);
                
                const labelElements = [];

                items.forEach((item, index) => {
                    const label = document.createElement('div');
                    label.className = 'knob-label';
                    if(index === 0) label.classList.add('active');
                    label.innerText = item.name; 
                    
                    const degree = startAngle + (index * step);
                    const rad = (degree - 90) * (Math.PI / 180);
                    
                    // Radius für Labels
                    const x = 50 + (Math.cos(rad) * 65); 
                    const y = 50 + (Math.sin(rad) * 65);
                    
                    label.style.left = `${x}%`;
                    label.style.top = `${y}%`;
                    
                    label.onclick = () => {
                        rotateKnobTo(index);
                    };

                    interfaceDiv.appendChild(label);
                    labelElements.push({ el: label, angle: degree });
                });

                // 3. Interaktion
                let currentAngle = startAngle;
                let isDragging = false;
                
                function rotateKnobTo(index) {
                    labelElements.forEach(l => l.el.classList.remove('active'));
                    labelElements[index].el.classList.add('active');
                    
                    const targetAngle = labelElements[index].angle;
                    
                    // --- MECHANISCHES EINRASTEN (Kein Wobble) ---
                    gsap.to(knob, { 
                        rotation: targetAngle, 
                        duration: 0.5, 
                        ease: "power4.out" 
                    });
                    
                    currentAngle = targetAngle;

                    // Text Animation
                    gsap.to([displayTitle, displayDesc], { 
                        opacity: 0, 
                        y: 5,
                        duration: 0.1, 
                        onComplete: () => {
                            displayTitle.innerText = items[index].name;
                            displayDesc.innerText = items[index].text; 
                            gsap.to([displayTitle, displayDesc], { opacity: 1, y: 0, duration: 0.2 });
                        }
                    });
                }

                gsap.set(knob, { rotation: startAngle });

                // --- DRAG ---
                function getAngle(e) {
                    const rect = interfaceDiv.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
                    
                    const rad = Math.atan2(clientY - centerY, clientX - centerX);
                    let deg = rad * (180 / Math.PI);
                    return deg + 90; 
                }

                function onMove(e) {
                    if(!isDragging) return;
                    e.preventDefault();
                    let deg = getAngle(e);
                    gsap.set(knob, { rotation: deg });
                }

                function onEnd(e) {
                    if(!isDragging) return;
                    isDragging = false;
                    
                    let currentRotRaw = gsap.getProperty(knob, "rotation");
                    let currentRot = currentRotRaw % 360;
                    if (currentRot > 180) currentRot -= 360;
                    if (currentRot < -180) currentRot += 360;

                    let closestIndex = 0;
                    let minDiff = 1000;

                    labelElements.forEach((item, index) => {
                        let diff = Math.abs(item.angle - currentRot);
                        if(diff < minDiff) {
                            minDiff = diff;
                            closestIndex = index;
                        }
                    });

                    rotateKnobTo(closestIndex);
                }

                knob.addEventListener('mousedown', () => isDragging = true);
                window.addEventListener('mousemove', onMove);
                window.addEventListener('mouseup', onEnd);

                knob.addEventListener('touchstart', (e) => isDragging = true, {passive: false});
                window.addEventListener('touchmove', onMove, {passive: false});
                window.addEventListener('touchend', onEnd);
            }
        } else {
            console.log("Service ID not found or missing");
        }
    }

    // --- REST OF JS (PAGE TRANSITION, ETC.) ---
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
