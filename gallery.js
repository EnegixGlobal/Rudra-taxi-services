// Gallery Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Gallery Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Lightbox Modal Functionality
    const viewButtons = document.querySelectorAll('.view-image');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('imageModalLabel');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const imageSrc = this.getAttribute('data-image');
            const imageTitle = this.getAttribute('data-title');
            
            modalImage.src = imageSrc;
            modalTitle.textContent = imageTitle;
        });
    });
    
    // Reset modal image when closed
    const imageModal = document.getElementById('imageModal');
    imageModal.addEventListener('hidden.bs.modal', function() {
        modalImage.src = '';
    });
    
    // Gallery Item Hover Effect
    const galleryCards = document.querySelectorAll('.gallery-card');
    
    galleryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.gallery-overlay');
            overlay.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.gallery-overlay');
            overlay.style.opacity = '0';
        });
    });
    
    // Scroll Animation for Gallery Items
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.5s ease';
        observer.observe(item);
    });
    
    // Counter Animation for Achievements
    const achievementCounters = document.querySelectorAll('.achievement-card .counter');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString() + '+';
            }
        };
        
        updateCounter();
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    achievementCounters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // Image Lazy Loading
    const images = document.querySelectorAll('.gallery-image');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.style.transition = 'opacity 0.5s ease';
        imageObserver.observe(img);
    });
    
    // Keyboard Navigation for Modal
    document.addEventListener('keydown', function(e) {
        const modal = bootstrap.Modal.getInstance(imageModal);
        if (modal && modal._isShown) {
            if (e.key === 'Escape') {
                modal.hide();
            }
        }
    });
    
    // Add active filter count
    function updateFilterCount() {
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        let count = 0;
        
        if (activeFilter === 'all') {
            count = galleryItems.length;
        } else {
            galleryItems.forEach(item => {
                if (item.getAttribute('data-category') === activeFilter) {
                    count++;
                }
            });
        }
        
        console.log(`Showing ${count} items in ${activeFilter} category`);
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', updateFilterCount);
    });
    
    // Initial count
    updateFilterCount();
    
    // Add ripple effect to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    imageModal.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    imageModal.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - could implement next image functionality
            console.log('Swiped left');
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe right - could implement previous image functionality
            console.log('Swiped right');
        }
    }
});
