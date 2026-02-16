document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SOUND SYSTEM (STRIKT & TROCKEN) ---
    const clickSound = new Audio('click.mp3');
    clickSound.volume = 0.4; 
    clickSound.load();

    // iOS Audio-Unlocker
    let audioUnlocked = false;
    function unlockAudio() {
        if (!audioUnlocked) {
            clickSound.play().then(() => {
                clickSound.pause();
                clickSound.currentTime = 0;
            }).catch((e) => {});
            audioUnlocked = true;
            document.removeEventListener('touchstart', unlockAudio);
            document.removeEventListener('click', unlockAudio);
        }
    }
    document.addEventListener('touchstart', unlockAudio, {passive: true});
    document.addEventListener('click', unlockAudio, {passive: true});

    // Feedback Funktion
    function playClick() {
        if (navigator.vibrate) navigator.vibrate(15);
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});
    }

    // --- 2. DATABASE: SERVICE CONTENT ---
    const serviceData = {
        "audio_music": {
            title: "AUDIO PRODUKTION",
            image: "1.jpeg",
            intro: "Audio ist für uns kein einzelner Arbeitsschritt, sondern ein durchgängiger Prozess.",
            desc: "Von der ersten Aufnahme bis zum finalen Mix geht es um Kontrolle, Präzision und ein sauberes Gefühl für Klang, Raum und Dynamik. Wir arbeiten seit Jahren mit Artists, Unternehmen und Veranstaltern in unterschiedlichsten Produktionssituationen. Unser Anspruch ist immer derselbe – klanglich sauber, technisch belastbar und musikalisch sinnvoll.",
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
            desc: "Wir entwickeln Video- und Bildcontent, der klar kommuniziert, professionell umgesetzt ist und zur jeweiligen Marke, Musik oder Idee passt. WESTROOMZ begleitet Artists, Brands und Creator von der Konzeption bis zur finalen Ausspielung.",
            // HIER NEU: Bilder zu den Services hinzugefügt für den Hover-Effekt
            list: [
                { name: "Musikvideos", image: "1.jpeg" }, // Bilddateien ggf. anpassen
                { name: "Artist Visuals", image: "2.jpeg" },
                { name: "Imagefilme", image: "3.jpeg" },
                { name: "Social Content", image: "4.jpeg" },
                { name: "Video Podcasts", image: "5.jpeg" },
                { name: "Produktbilder", image: "6.jpeg" },
                { name: "Cover Art", image: "7.jpeg" },
                { name: "Kampagnen", image: "8.jpeg" }
            ]
        },
        "event_planning": {
            title: "EVENTS & LIVE",
            image: "7.jpeg",
            intro: "Events erfordern mehr als Technik. Wir liefern Struktur.",
            desc: "WESTROOMZ ist an Veranstaltungen in unterschiedlichen Rollen beteiligt – von technischer Umsetzung bis zur vollständigen Produktionsbegleitung.",
            list: ["Eventplanung & Konzepte", "Live Mixing", "Audio- & Videoproduktion", "Event-Fotografie", "DJ-Services", "Ablauf & Koordination"]
        },
        "marketing_general": {
            title: "MARKETING & STRATEGIE",
            image: "5.jpeg",
            intro: "Sichtbarkeit ist kein Zufall, sondern das Ergebnis präziser Planung.",
            desc: "Marketing bei WESTROOMZ bedeutet nicht nur, Werbung zu schalten. Wir entwickeln ganzheitliche Strategien, die deine Brand positionieren.",
            list: ["Social Media Strategy", "Performance Marketing", "Branding & CI", "Kampagnen-Management", "Content Distribution", "Zielgruppen-Analyse"]
        },
        "audio_commercial": { title: "COMMERCIAL", image: "2.jpeg", intro: "...", desc: "...", list: [] },
        "audio_podcast": { title: "PODCASTS", image: "3.jpeg", intro: "...", desc: "...", list: [] }
    };

    // --- 3. DYNAMIC PAGE LOADER ---
    if(window.location.pathname.includes('service-detail.html')) {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
       
        if(id && serviceData[id]) {
            const data = serviceData[id];
           
            // Set Base Texts
            const titleEl = document.getElementById('detailTitle');
            if(titleEl) titleEl.innerText = data.title;
            const bgEl = document.getElementById('detailBg');
            if(bgEl) bgEl.src = data.image; 
            const introEl = document.getElementById('detailIntro');
            if(introEl) introEl.innerText = data.intro;
            const descEl = document.getElementById('detailDesc');
            if(descEl) descEl.innerText = data.desc;
           
            const contactBtn = document.getElementById('detailContactBtn');
            if(contactBtn) contactBtn.onclick = () => window.location.href = `index.html#contact`; 

            const listContainer = document.getElementById('detailList');
            const wrapper = document.querySelector('.detail-list-wrapper');

            // --- A: AUDIO KNOB LOGIC (BLEIBT UNVERÄNDERT) ---
            if(id === 'audio_music' && listContainer) {
             
                wrapper.classList.add('knob-active');
                listContainer.innerHTML = '';
             
                // UI
                const interfaceDiv = document.createElement('div');
                interfaceDiv.className = 'knob-interface';
                const knob = document.createElement('div');
                knob.className = 'knob-control';
                knob.innerHTML = '<img src="knob.png" class="knob-img" alt="Control Knob" draggable="false" ondragstart="return false;">';
                interfaceDiv.appendChild(knob);

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

                // Setup Logic (Copy of original knob logic)
                const items = data.list;
                const totalArc = 260; 
                const startAngle = -130; 
                const step = totalArc / (items.length - 1); 
                const labelElements = [];
             
                let currentIndex = 0; 
                let isDragging = false;
                let lastMouseAngle = 0;
                let dragAccumulator = 0; 

                // Create Labels
                items.forEach((item, index) => {
                    const label = document.createElement('div');
                    label.className = 'knob-label';
                    if(index === 0) label.classList.add('active');
                    label.innerText = item.name;
                   
                    const degree = startAngle + (index * step);
                    const rad = (degree - 90) * (Math.PI / 180);
                    const x = 50 + (Math.cos(rad) * 42); 
                    const y = 50 + (Math.sin(rad) * 42);
                    label.style.left = `${x}%`;
                    label.style.top = `${y}%`;
                   
                    label.onclick = (e) => { 
                        e.stopPropagation(); 
                        snapKnobTo(index, true); 
                    };
                    interfaceDiv.appendChild(label);
                    labelElements.push({ el: label, angle: degree });
                });

                gsap.set(knob, { rotation: startAngle });

                function snapKnobTo(index, playSound = false) {
                    if (index < 0) index = 0;
                    if (index >= items.length) index = items.length - 1;
                   
                    if(playSound && currentIndex !== index) playClick(); 

                    currentIndex = index;
                   
                    labelElements.forEach(l => l.el.classList.remove('active'));
                    labelElements[index].el.classList.add('active');
                   
                    gsap.to(knob, { 
                        rotation: labelElements[index].angle, 
                        duration: 0.35, 
                        ease: "back.out(2.5)", 
                        overwrite: true 
                    });

                    gsap.to([displayTitle, displayDesc], { 
                        opacity: 0, y: 5, duration: 0.1, 
                        onComplete: () => {
                            displayTitle.innerText = items[index].name;
                            displayDesc.innerText = items[index].text; 
                            gsap.to([displayTitle, displayDesc], { opacity: 1, y: 0, duration: 0.2 });
                        }
                    });
                }

                function getMouseAngle(e) {
                    const rect = interfaceDiv.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
                    const rad = Math.atan2(clientY - centerY, clientX - centerX);
                    return (rad * (180 / Math.PI)) + 90;
                }

                function onDown(e) {
                    isDragging = true;
                    lastMouseAngle = getMouseAngle(e);
                    dragAccumulator = 0; 
                    gsap.to(knob, { scale: 0.96, duration: 0.1 });
                }

                function onMove(e) {
                    if(!isDragging) return;
                    e.preventDefault();
                   
                    const currentMouseAngle = getMouseAngle(e);
                    let delta = currentMouseAngle - lastMouseAngle;
                    if (delta > 180) delta -= 360;
                    if (delta < -180) delta += 360;
                   
                    dragAccumulator += delta;
                    lastMouseAngle = currentMouseAngle;

                    const stepThreshold = 25; 

                    if (dragAccumulator > stepThreshold) {
                        if (currentIndex < items.length - 1) {
                            snapKnobTo(currentIndex + 1, true);
                            dragAccumulator = 0; 
                        }
                    } 
                    else if (dragAccumulator < -stepThreshold) {
                        if (currentIndex > 0) {
                            snapKnobTo(currentIndex - 1, true);
                            dragAccumulator = 0; 
                        }
                    }
                   
                    const baseAngle = labelElements[currentIndex].angle;
                    const tension = dragAccumulator * 0.4; 
                    gsap.set(knob, { rotation: baseAngle + tension });
                }

                function onEnd(e) {
                    if(!isDragging) return;
                    isDragging = false;
                    gsap.to(knob, { scale: 1, duration: 0.15 });
                    snapKnobTo(currentIndex, false); 
                }

                knob.addEventListener('mousedown', onDown);
                window.addEventListener('mousemove', onMove);
                window.addEventListener('mouseup', onEnd);
                knob.addEventListener('touchstart', onDown, {passive: false});
                window.addEventListener('touchmove', onMove, {passive: false});
                window.addEventListener('touchend', onEnd);

            } 
            // --- B: VIDEO CINEMATIC LOGIC (NEU!!!) ---
            else if (id === 'video_music' && listContainer) {
                
                // Wrapper Klasse hinzufügen für CSS
                wrapper.classList.add('cinematic-active');
                listContainer.innerHTML = '';
                listContainer.className = 'cinematic-list';

                // 1. Background Layer (Wechselt Bilder)
                const bgLayer = document.createElement('div');
                bgLayer.className = 'cinematic-bg-layer';
                const bgImage = document.createElement('img');
                bgImage.src = data.list[0].image || data.image; // Startbild
                bgLayer.appendChild(bgImage);
                wrapper.appendChild(bgLayer); // Hinter den Text legen

                // 2. Liste aufbauen
                data.list.forEach((item, index) => {
                    const li = document.createElement('li');
                    li.className = 'cinematic-item';
                    
                    // Struktur: 01 // TEXT
                    li.innerHTML = `<span class="cin-num">0${index + 1}</span> <span class="cin-text">${item.name}</span>`;
                    
                    // Hover Events
                    li.addEventListener('mouseenter', () => {
                        // Sound
                        playClick();
                        
                        // Bildwechsel (weicher Fade via CSS)
                        const newSrc = item.image;
                        // Kurzer Fade-Out Trick könnte man machen, aber wir tauschen hart und lassen CSS faden
                        gsap.to(bgImage, { opacity: 0, duration: 0.1, onComplete: () => {
                            bgImage.src = newSrc;
                            gsap.to(bgImage, { opacity: 0.4, duration: 0.4 }); // Opacity 0.4 damit Text lesbar bleibt
                        }});

                        // Active State Text
                        document.querySelectorAll('.cinematic-item').forEach(el => el.classList.remove('active'));
                        li.classList.add('active');
                    });

                    listContainer.appendChild(li);
                });

                // Set initial active
                listContainer.children[0].classList.add('active');
            }
            // --- C: STANDARD LISTE (EVENTS & MARKETING) ---
            else if (listContainer) {
                wrapper.classList.remove('knob-active');
                wrapper.classList.remove('cinematic-active');
                listContainer.innerHTML = ''; 
                listContainer.className = 'detail-list';
                data.list.forEach((item, index) => {
                    const li = document.createElement('li');
                    const text = typeof item === 'string' ? item : item.name;
                    li.innerHTML = `${text} <span>0${index + 1}</span>`;
                    listContainer.appendChild(li);
                });
            }
        }
    }

    // --- REST OF ORIGINAL JS (Transition, Cursor, Lenis...) ---
    const curtain = document.querySelector('.page-transition-curtain');
    if(curtain) {
        gsap.to(curtain, { scaleY: 0, transformOrigin: "top", duration: 0.6, ease: "power4.inOut", delay: 0.2 });
    }

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

    if(document.querySelector('.tabs-nav')) {
        window.openTab = function(tabName) {
            document.querySelectorAll('.service-container').forEach(c => c.classList.remove('active'));
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.getElementById(tabName).classList.add('active');
            const btns = document.querySelectorAll('.tab-btn');
            btns.forEach(b => { if(b.textContent.toLowerCase().includes(tabName)) b.classList.add('active'); });
            
            const content = document.querySelector(`#${tabName} .vision-text`);
            if(content) {
                gsap.fromTo(content, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
            }
            ScrollTrigger.refresh();
        }
        ScrollTrigger.create({ trigger: "#services", start: "top 75%", onEnter: () => window.openTab('audio') });
    }

    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, { scrollTrigger: { trigger: title, start: "top 90%", toggleActions: "play reverse play reverse" }, y: 50, opacity: 0, duration: 1 });
    });
    if(document.querySelector(".big-lead")) {
        gsap.from(".big-lead", { scrollTrigger: { trigger: ".big-lead", start: "top 80%", toggleActions: "play reverse play reverse" }, y: 50, opacity: 0, scale: 0.9, duration: 1.2, ease: "power3.out" });
        gsap.to(".vision-text p", { scrollTrigger: { trigger: ".vision-text", start: "top 80%", toggleActions: "play reverse play reverse" }, y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.out" });
    }
    
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
