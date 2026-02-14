document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DATENBANK (Mit Image-Mapping für den Reveal-Effekt) ---
    // Wir nutzen hier einfach zufällige Bilder aus deinem Ordner für die Hover-Effekte
    const serviceData = {
        "audio_music": {
            title: "AUDIO PRODUKTION",
            image: "1.jpeg", 
            intro: "Audio ist kein Schritt. Es ist ein Prozess.",
            desc: "Von der ersten Aufnahme bis zum finalen Mix geht es um Kontrolle, Präzision und ein sauberes Gefühl für Klang, Raum und Dynamik. Wir arbeiten seit Jahren mit Artists und Unternehmen im Studio und Live.",
            list: ["Recording", "Mixing", "Mastering", "Sounddesign", "Live-Audio", "Set-Ton"]
        },
        "video_music": {
            title: "VIDEO & CONTENT",
            image: "4.jpeg",
            intro: "Visuals entscheiden über Wahrnehmung.",
            desc: "Wir entwickeln Video- und Bildcontent, der klar kommuniziert. Von Musikvideos über Social Media Content bis hin zu hochwertigen Imagefilmen.",
            list: ["Musikvideos", "Visuals", "Imagefilme", "Social Content", "Podcasts", "Kampagnen"]
        },
        "event_planning": {
            title: "EVENTS & LIVE",
            image: "7.jpeg",
            intro: "Events brauchen mehr als Technik.",
            desc: "WESTROOMZ liefert Struktur, Know-how und eine saubere Umsetzung. Wir begleiten Veranstaltungen modular oder ganzheitlich.",
            list: ["Konzeption", "Live Mixing", "Lichtdesign", "Regie", "Booking", "Ablauf"]
        },
        "marketing_general": {
            title: "STRATEGIE",
            image: "5.jpeg",
            intro: "Sichtbarkeit ist kein Zufall.",
            desc: "Wir entwickeln ganzheitliche Strategien, die deine Brand positionieren. Datengetrieben und kreativ.",
            list: ["Strategy", "Ads", "Branding", "Content", "Analyse", "Growth"]
        }
    };

    // --- 2. SETUP SERVICE DETAIL PAGE ---
    if(document.getElementById('detailContainer')) {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        
        if(id && serviceData[id]) {
            const data = serviceData[id];
            
            // Set Background
            document.getElementById('detailBg').src = data.image;
            
            // Set Text
            const titleEl = document.getElementById('detailTitle');
            titleEl.innerText = data.title;
            titleEl.setAttribute('data-value', data.title); // Für Hacker Effekt
            
            document.getElementById('detailIntro').innerText = data.intro;
            document.getElementById('detailDesc').innerText = data.desc;
            
            // Build List with Hover Effects
            const listContainer = document.getElementById('detailList');
            const revealImg = document.getElementById('hoverRevealImg');
            
            // Pool an Bildern für den Effekt (aus deinem Upload)
            const imagePool = ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg", "7.jpeg", "8.jpeg"];

            data.list.forEach((item, index) => {
                const li = document.createElement('li');
                li.className = 'interactive-item interactive';
                li.innerText = item;
                
                // Mouse Enter: Bild anzeigen und ändern
                li.addEventListener('mouseenter', () => {
                    // Wähle ein Bild basierend auf dem Index (Modul-Operator damit es rotiert)
                    const imgIndex = index % imagePool.length;
                    revealImg.src = imagePool[imgIndex];
                    revealImg.classList.add('active');
                });
                
                // Mouse Leave: Bild verstecken
                li.addEventListener('mouseleave', () => {
                    revealImg.classList.remove('active');
                });

                listContainer.appendChild(li);
            });

            // Contact Button Link
            document.getElementById('detailContactBtn').onclick = () => window.location.href = 'index.html#contact';

            // TRIGGER HACKER EFFECT NACH KURZER VERZÖGERUNG
            setTimeout(() => { hackerEffect(titleEl); }, 500);

        }
    }

    // --- 3. SPOTLIGHT & TILT EFFECT (MOUSE TRACKING) ---
    const detailContainer = document.querySelector('.detail-container');
    const tiltCard = document.querySelector('.tilt-card');
    
    if(detailContainer) {
        detailContainer.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            
            // Update CSS Variables for Spotlight Mask
            detailContainer.style.setProperty('--mouse-x', x + 'px');
            detailContainer.style.setProperty('--mouse-y', y + 'px');

            // 3D Tilt Logic for Text Box
            if(tiltCard) {
                const rect = tiltCard.getBoundingClientRect();
                const cardX = rect.left + rect.width / 2;
                const cardY = rect.top + rect.height / 2;
                
                // Berechne Winkel (-15 bis 15 Grad)
                const angleX = (y - cardY) / 20; 
                const angleY = (cardX - x) / 20;

                tiltCard.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            }
        });
    }

    // --- 4. HACKER TEXT EFFECT FUNCTION (ReactBits Style) ---
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    function hackerEffect(element) {
        let iteration = 0;
        const originalText = element.dataset.value; 
        let interval = setInterval(() => {
            element.innerText = originalText
                .split("")
                .map((letter, index) => {
                    if(index < iteration) return originalText[index];
                    return letters[Math.floor(Math.random() * 26)];
                })
                .join("");
            
            if(iteration >= originalText.length) clearInterval(interval);
            iteration += 1 / 3; // Geschwindigkeit
        }, 30);
    }

    // --- 5. STANDARD STUFF (Lenis, Menu, Transitions) ---
    
    // Page Transition
    const curtain = document.querySelector('.page-transition-curtain');
    if(curtain) gsap.to(curtain, { scaleY: 0, transformOrigin: "top", duration: 0.6, ease: "power4.inOut", delay: 0.2 });

    // Lenis Scroll
    if(typeof Lenis !== 'undefined') {
        const lenis = new Lenis({ duration: 1.2, smooth: true });
        function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
        requestAnimationFrame(raf);
    }

    // Menu Toggle
    window.toggleMenu = function() {
        const menu = document.querySelector('.side-menu');
        const overlay = document.querySelector('.menu-overlay');
        const btn = document.querySelector('.menu-toggle-btn');
        if(menu) {
            menu.classList.toggle('active'); overlay.classList.toggle('active'); btn.classList.toggle('open');
        }
    }

    // Cursor Logic
    if (window.matchMedia("(min-width: 769px)").matches) {
        const cursor = document.querySelector('.cursor');
        const ring = document.querySelector('.cursor-ring');
        if(cursor) {
            cursor.style.display = 'block'; ring.style.display = 'block';
            document.addEventListener('mousemove', (e) => {
                gsap.to(cursor, {x: e.clientX, y: e.clientY, duration: 0.1});
                gsap.to(ring, {x: e.clientX, y: e.clientY, duration: 0.3});
            });
            document.querySelectorAll('.interactive').forEach(el => {
                el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
                el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
            });
        }
    }

    // Link Clicking Transition
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('mailto')) {
                e.preventDefault();
                gsap.fromTo(curtain, { scaleY: 0, transformOrigin: "bottom" }, { scaleY: 1, duration: 0.6, ease: "power4.inOut", onComplete: () => { window.location.href = href; } });
            }
        });
    });
});
