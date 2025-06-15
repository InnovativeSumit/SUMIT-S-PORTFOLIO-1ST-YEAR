// Three.js Background Animation
function initThreeJSBackground() {
    const container = document.getElementById('threejs-background');
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1500;

    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Particle material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x6c63ff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    // Particle system
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Camera position
    camera.position.z = 3;

    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;

        // Mouse movement effect
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();
}

// Initialize Typed.js for typing animation
function initTypedJS() {
    const typed = new Typed('.typing', {
        strings: ["UI/UX DESIGNER", "FRONTEND DEVELOPER", "RPA ENTHUSIAST", "PYTHON DEVELOPER", "PROMPT STRATEGIST"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true,
        cursorChar: '|',
        shuffle: true
    });

    const typed2 = new Typed('.typing-2', {
        strings: ["UI/UX DESIGNER", "FRONTEND DEVELOPER", "RPA ENTHUSIAST", "PYTHON DEVELOPER", "PROMPT STRATEGIST"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true,
        cursorChar: '|',
        shuffle: true
    });
}

// Sticky navbar on scroll
function handleStickyNavbar() {
    const navbar = document.querySelector('.navbar');
    const scrollUpBtn = document.querySelector('.scroll-up-btn');
    
    window.addEventListener('scroll', () => {
        // Sticky navbar
        if (window.scrollY > 20) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
        
        // Scroll-up button show/hide
        if (window.scrollY > 500) {
            scrollUpBtn.classList.add('active');
        } else {
            scrollUpBtn.classList.remove('active');
        }
    });
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbar = document.querySelector('.navbar');
                const menu = document.querySelector('.navbar .menu');
                if (navbar.classList.contains('sticky') && menu.classList.contains('active')) {
                    menu.classList.remove('active');
                    document.querySelector('.menu-btn i').classList.remove('active');
                }
            }
        });
    });
}

// Toggle mobile menu
function setupMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.navbar .menu');
    
    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('active');
        menuBtn.querySelector('i').classList.toggle('active');
    });
}

// Scroll to top functionality
function setupScrollToTop() {
    const scrollUpBtn = document.querySelector('.scroll-up-btn');
    
    scrollUpBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Animate skill bars on scroll
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    function checkScroll() {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (barPosition < screenPosition) {
                const percent = bar.getAttribute('data-percent');
                const progress = bar.querySelector('.progress');
                progress.style.width = percent + '%';
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('load', checkScroll);
}

// Countdown timer for projects section
function setupCountdownTimer() {
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    // Set the date we're counting down to (360 days from now)
    const countDownDate = new Date();
    countDownDate.setDate(countDownDate.getDate() + 360);
    
    // Update the count down every 1 second
    const timer = setInterval(function() {
        // Get today's date and time
        const now = new Date().getTime();
        
        // Find the distance between now and the count down date
        const distance = countDownDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result
        daysElement.textContent = days < 10 ? '0' + days : days;
        hoursElement.textContent = hours < 10 ? '0' + hours : hours;
        minutesElement.textContent = minutes < 10 ? '0' + minutes : minutes;
        secondsElement.textContent = seconds < 10 ? '0' + seconds : seconds;
        
        // If the count down is finished, clear interval
        if (distance < 0) {
            clearInterval(timer);
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
        }
    }, 1000);
}

// Add hover effects to service cards
function addServiceCardHoverEffects() {
    const serviceCards = document.querySelectorAll('.serv-content .card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const x = e.offsetX;
            const y = e.offsetY;
            const cardWidth = card.clientWidth;
            const cardHeight = card.clientHeight;
            const centerX = cardWidth / 2;
            const centerY = cardHeight / 2;
            const angleY = (x - centerX) / 20;
            const angleX = (centerY - y) / 20;
            
            card.querySelector('.box').style.transform = `rotateY(${angleY}deg) rotateX(${angleX}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.box').style.transform = 'rotateY(0) rotateX(0)';
        });
    });
}

// Add animation to elements when they come into view
function setupScrollAnimations() {
    const animateElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Form submission handler
function setupFormSubmission() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        // For demo purposes, we'll just log it and show an alert
        console.log({ name, email, subject, message });
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initThreeJSBackground();
    initTypedJS();
    handleStickyNavbar();
    setupSmoothScrolling();
    setupMobileMenu();
    setupScrollToTop();
    animateSkillBars();
    setupCountdownTimer();
    addServiceCardHoverEffects();
    setupScrollAnimations();
    setupFormSubmission();
    
    // Add delay classes to elements for staggered animations
    document.querySelectorAll('.home-content > *').forEach((el, i) => {
        el.classList.add('fade-in', `delay-${i}`);
    });
    
    document.querySelectorAll('.about-content > *').forEach((el, i) => {
        el.classList.add('fade-in', `delay-${i}`);
    });
    
    document.querySelectorAll('.skills-content > *').forEach((el, i) => {
        el.classList.add('fade-in', `delay-${i}`);
    });
    
    document.querySelectorAll('.serv-content .card').forEach((el, i) => {
        el.classList.add('fade-in', `delay-${i % 4}`);
    });
    
    document.querySelectorAll('.courses-content .course-card').forEach((el, i) => {
        el.classList.add('fade-in', `delay-${i % 3}`);
    });
    
    document.querySelectorAll('.contact-info .contact-card').forEach((el, i) => {
        el.classList.add('fade-in', `delay-${i % 3}`);
    });
});

// Handle page reload to scroll to top
window.onbeforeunload = function() {
    window.scrollTo(0, 0);
}
