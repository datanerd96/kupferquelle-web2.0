// Kupferquelle Hotel Parallax and Background Effects

document.addEventListener('DOMContentLoaded', function() {
    // Initialize parallax effect
    initParallax();
    
    // Initialize video background if present
    initVideoBackground();
    
    // Initialize subtle background animations
    initBackgroundAnimations();
});

/**
 * Initialize parallax scrolling effect for elements with class 'parallax-section'
 */
function initParallax() {
    const parallaxSections = document.querySelectorAll('.parallax-section');
    
    if (parallaxSections.length === 0) return;
    
    // Check if device is mobile (parallax can cause performance issues on mobile)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // On mobile devices, just make sure backgrounds are properly centered
        parallaxSections.forEach(section => {
            section.style.backgroundAttachment = 'scroll';
        });
        return;
    }
    
    // Add scroll event listener for parallax effect
    window.addEventListener('scroll', function() {
        parallaxSections.forEach(section => {
            const scrollPosition = window.pageYOffset;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // Only apply effect when section is in viewport
            if (scrollPosition > sectionTop - window.innerHeight && 
                scrollPosition < sectionTop + sectionHeight) {
                
                // Calculate parallax offset (adjust speed with the 0.5 multiplier)
                const yOffset = (scrollPosition - sectionTop) * 0.5;
                
                // Apply transform to create parallax effect
                section.style.backgroundPositionY = `calc(50% + ${yOffset}px)`;
            }
        });
    });
}

/**
 * Initialize video background for hero section
 */
function initVideoBackground() {
    const videoBackground = document.querySelector('.hero-video video');
    
    if (!videoBackground) return;
    
    // Check if device is mobile with limited bandwidth
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // On mobile, we might want to pause the video to save bandwidth
        // or replace with a static image
        const staticBackgroundFallback = videoBackground.getAttribute('data-mobile-fallback');
        
        if (staticBackgroundFallback) {
            const parentElement = videoBackground.parentElement;
            parentElement.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('${staticBackgroundFallback}')`;
            parentElement.style.backgroundSize = 'cover';
            parentElement.style.backgroundPosition = 'center';
            
            // Remove video to save bandwidth
            videoBackground.remove();
        }
    } else {
        // On desktop, make sure video plays automatically and silently
        videoBackground.play().catch(error => {
            console.log('Auto-play was prevented:', error);
            
            // Add play button if autoplay is blocked
            const playButton = document.createElement('button');
            playButton.classList.add('video-play-btn');
            playButton.innerHTML = '<i class="fas fa-play"></i>';
            playButton.setAttribute('aria-label', 'Play Background Video');
            
            videoBackground.parentElement.appendChild(playButton);
            
            playButton.addEventListener('click', () => {
                videoBackground.play();
                playButton.remove();
            });
        });
    }
}

/**
 * Initialize subtle background animations for texture elements
 */
function initBackgroundAnimations() {
    // Get all elements with the background-texture class
    const textureElements = document.querySelectorAll('.background-texture');
    
    if (textureElements.length === 0) return;
    
    // Add subtle movement to texture elements
    textureElements.forEach(element => {
        // Create random subtle movement
        const randomDelay = Math.random() * 5;
        const randomDuration = 15 + Math.random() * 10;
        
        element.style.animation = `subtleFloat ${randomDuration}s ease-in-out ${randomDelay}s infinite alternate`;
    });
}

/**
 * Add subtle animation to elements when they come into view
 */
document.addEventListener('DOMContentLoaded', function() {
    // Check for IntersectionObserver API support
    if ('IntersectionObserver' in window) {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    // Stop observing after animation is triggered
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 }); // Trigger when at least 10% of the element is visible
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
});