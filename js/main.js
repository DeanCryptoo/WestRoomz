document.addEventListener('DOMContentLoaded', () => {
    
    // --- 0. PAGE TRANSITION (ENTER) ---
    // Immediately animate the curtain UP (reveal)
    const curtain = document.querySelector('.page-transition-curtain');
    if(curtain) {
        gsap.to(curtain, {
            scaleY: 0,
            transformOrigin: "top",
            duration: 1.2,
            ease: "power4.inOut",
            delay: 0.2
        });
    }

    // --- 1. FORCE CURSOR ON DESKTOP ---
    if (window.matchMedia("(min-width: 769px)").matches) {
        const cursor = document.querySelector('.cursor');
        const ring = document.querySelector('.cursor-ring');
        
        if(cursor && ring) {
            cursor.style.display = 'block';
            ring.style.display = 'block';
            
            let mouseX = 0, mouseY = 0, isMoving = false;
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX; mouseY = e.clientY;
                if (!isMoving) { 
                    isMoving = true; 
                    requestAnimationFrame(() => {
                        cursor.style.left = mouseX + 'px';
                        cursor.style.top = mouseY + 'px';
                        ring.style.left = mouseX + 'px';
                        ring.style.top = mouseY + 'px';
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

    // --- 2. SMOOTH SCROLL ---
    if(typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
            smooth: true, smoothTouch: false 
        });
        function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
        requestAnimationFrame(raf);
        
        if(typeof ScrollTrigger !== 'undefined') {
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => { lenis.raf(time * 1000); });
            gsap.ticker.lagSmoothing(0);
        }
        window.lenis = lenis;
    }

    // --- 3. MENU LOGIC ---
    window.toggleMenu = function() {
        const menu = document.querySelector('.side-menu');
        const overlay = document.querySelector('.menu-overlay');
        const btn = document.querySelector('.menu-toggle-btn');

        if(menu && overlay && btn) {
            menu.classList.toggle('active');
            overlay.classList.toggle('active');
            btn.classList.toggle('open');
            if(menu.classList.contains('active')){
                gsap.fromTo('.menu-link', {x: -30, opacity: 0}, {x: 0, opacity: 1, stagger: 0.1, delay: 0.2});
            }
        }
    }

    // --- 4. VIDEO SYNC ---
    const videos = document.querySelectorAll('video');
    const heroText = document.querySelector(".hero-sub");
    
    if(videos.length > 0 && heroText) {
        gsap.set(heroText, { opacity: 0, y: 20 });
        videos.forEach(video => {
            video.muted = true; 
            video.play().catch(() => {});
            video.addEventListener('timeupdate', () => {
                if (video.currentTime >= 4.5 && gsap.getProperty(heroText, "opacity") === 0) {
                    gsap.to(heroText, { opacity: 1, y: 0, duration: 0.5 });
                } else if (video.currentTime < 0.5) {
                    gsap.set(heroText, { opacity: 0, y: 20 });
                }
            });
        });
    }

    // --- 5. AUTO-SCROLL GALLERY ---
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

    // --- 6. MODAL LOGIC ---
    const modal = document.getElementById('galleryModal');
    if(modal) {
        const modalTitle = document.getElementById('modalTitle');
        const modalGrid = document.getElementById('modalGrid');

        window.openModal = function(category) {
            modalTitle.innerText = category;
            modalGrid.innerHTML = ''; 
            const imgCount = 6; 
            for(let i=0; i<imgCount; i++){
                const div = document.createElement('div');
                div.className = 'modal-img';
                const img = document.createElement('img');
                const rand = Math.floor(Math.random() * 8) + 1;
                img.src = rand + '.jpeg';
                div.appendChild(img);
                modalGrid.appendChild(div);
            }
            modal.classList.add('active');
            if(window.lenis) window.lenis.stop();
        }

        window.closeModal = function() {
            modal.classList.remove('active');
            if(window.lenis) window.lenis.start();
        }
    }

    // --- 7. TABS ---
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
        window.prefill = function(service) { 
            const input = document.getElementById('subject');
            if(input) input.value = service; 
        }
        ScrollTrigger.create({ trigger: "#services", start: "top 75%", onEnter: () => window.openTab('audio') });
    }

    // --- 8. SCROLL ANIMATIONS ---
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, { 
            scrollTrigger: { trigger: title, start: "top 90%", toggleActions: "play reverse play reverse" }, 
            y: 50, opacity: 0, duration: 1 
        });
    });

    if(document.querySelector(".big-lead")) {
        gsap.from(".big-lead", { 
            scrollTrigger: { trigger: ".big-lead", start: "top 80%", toggleActions: "play reverse play reverse" }, 
            y: 50, opacity: 0, scale: 0.9, duration: 1.2, ease: "power3.out" 
        });
        gsap.to(".vision-text p", {
            scrollTrigger: { trigger: ".vision-text", start: "top 80%", toggleActions: "play reverse play reverse" },
            y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.out"
        });
    }

    if(document.querySelector(".network-text")) {
        gsap.to(".network-text > *", {
            scrollTrigger: { trigger: ".network-section", start: "top 70%", toggleActions: "play reverse play reverse" },
            y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power2.out"
        });
        gsap.to(".network-logo-container", {
            scrollTrigger: { trigger: ".network-logo-container", start: "top 85%", toggleActions: "play reverse play reverse" },
            y: 0, opacity: 1, duration: 1.2, delay: 0.3, ease: "power3.out"
        });
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

    // --- 9. PAGE TRANSITION (EXIT) ---
    // Handle clicks on internal links to animate curtain down
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only animate if link is internal and not an anchor on same page
            if (href && !href.startsWith('#') && !href.startsWith('mailto') && !href.includes('javascript')) {
                e.preventDefault();
                
                // Animate Curtain DOWN (Cover)
                if(curtain) {
                    gsap.fromTo(curtain, 
                        { scaleY: 0, transformOrigin: "bottom" },
                        { 
                            scaleY: 1, 
                            duration: 0.8, 
                            ease: "power4.inOut",
                            onComplete: () => {
                                window.location.href = href;
                            }
                        }
                    );
                } else {
                    window.location.href = href;
                }
            }
        });
    });

});