document.addEventListener('DOMContentLoaded', () => {
    
    // 1. FORCE CURSOR ON DESKTOP
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

    // 2. SMOOTH SCROLL (Robust check)
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
        
        // Expose lenis globally for modal
        window.lenis = lenis;
    }

    // 3. MENU LOGIC (Global Function)
    window.toggleMenu = function() {
        const menu = document.querySelector('.side-menu');
        const overlay = document.querySelector('.menu-overlay');
        const btn = document.querySelector('.menu-toggle-btn');

        if(menu && overlay && btn) {
            menu.classList.toggle('active');
            overlay.classList.toggle('active');
            btn.classList.toggle('open');
            
            // Stagger animation only if opening
            if(menu.classList.contains('active')){
                gsap.fromTo('.menu-link', {x: -30, opacity: 0}, {x: 0, opacity: 1, stagger: 0.1, delay: 0.2});
            }
        }
    }

    // 4. VIDEO SYNC (Only runs if video exists)
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

    // 5. AUTO-SCROLL GALLERY (Only runs if gallery exists)
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

    // 6. MODAL LOGIC (Only runs if modal exists)
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

    // 7. TABS (Only runs if tabs exist)
    if(document.querySelector('.tabs-nav')) {
        window.openTab = function(tabName) {
            document.querySelectorAll('.service-container').forEach(c => c.classList.remove('active'));
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.getElementById(tabName).classList.add('active');
            
            // Highlight active button
            const btns = document.querySelectorAll('.tab-btn');
            btns.forEach(b => { if(b.textContent.toLowerCase().includes(tabName)) b.classList.add('active'); });
            
            // Animate cards
            const cards = document.querySelectorAll(`#${tabName} .service-card`);
            gsap.fromTo(cards, { y: 30, opacity: 0, autoAlpha: 0, filter: "blur(10px)" }, { y: 0, opacity: 1, autoAlpha: 1, filter: "blur(0px)", duration: 0.6, stagger: 0.1, ease: "power3.out", overwrite: true });
            
            ScrollTrigger.refresh();
        }
        
        window.prefill = function(service) { 
            const input = document.getElementById('subject');
            if(input) input.value = service; 
        }
        
        // Init first tab animation on scroll
        ScrollTrigger.create({ 
            trigger: "#services", 
            start: "top 75%", 
            onEnter: () => window.openTab('audio') 
        });
    }

    // 8. SCROLL ANIMATIONS (Generic)
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, { scrollTrigger: { trigger: title, start: "top 90%", toggleActions: "play reverse play reverse" }, y: 50, opacity: 0, duration: 1 });
    });
    
    // Intro Animations (Only if they exist)
    if(document.querySelector(".intro-text")) {
        gsap.from(".intro-text", { scrollTrigger: { trigger: ".intro-text", start: "top 90%", toggleActions: "play reverse play reverse" }, x: 50, opacity: 0, duration: 1 });
    }
    if(document.querySelector(".intro-img")) {
        gsap.from(".intro-img", { scrollTrigger: { trigger: ".intro-img", start: "top 90%", toggleActions: "play reverse play reverse" }, x: -50, opacity: 0, duration: 1 });
    }
    
    // Contact Animations
    if(document.querySelector(".contact-info")) {
        gsap.from(".contact-info", { scrollTrigger: { trigger: ".contact-grid", start: "top 90%", toggleActions: "play reverse play reverse" }, x: -30, opacity: 0, duration: 1 });
        gsap.from(".contact-form", { scrollTrigger: { trigger: ".contact-grid", start: "top 90%", toggleActions: "play reverse play reverse" }, x: 30, opacity: 0, duration: 1, delay: 0.2 });
    }
});