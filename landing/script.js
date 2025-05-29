document.getElementById('currentYear').textContent = new Date().getFullYear();

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
        if (mobileMenu.classList.contains('hidden') === false) {
            mobileMenu.classList.add('hidden');
        }
    });
});

// "How It Works" steps toggle
const stepItems = document.querySelectorAll('.step-item');
stepItems.forEach(item => {
    item.addEventListener('click', () => {
        const stepNumber = item.dataset.step;
        const detailsDiv = document.getElementById(`step-details-${stepNumber}`);
        const arrow = item.querySelector('.step-arrow');

        // Close other open steps
        document.querySelectorAll('.step-details.open').forEach(openDetail => {
            if (openDetail !== detailsDiv) {
                openDetail.classList.remove('open');
                const otherArrow = openDetail.closest('.step-item').querySelector('.step-arrow');
                if (otherArrow) otherArrow.style.transform = 'rotate(0deg)';
            }
        });
        
        detailsDiv.classList.toggle('open');
        if (detailsDiv.classList.contains('open')) {
            arrow.style.transform = 'rotate(180deg)';
        } else {
            arrow.style.transform = 'rotate(0deg)';
        }
    });
});

// Tabs for "Recursos"
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const targetTab = button.dataset.tab;
        tabContents.forEach(content => {
            if (content.id === `tab-content-${targetTab}`) {
                content.classList.remove('hidden');
            } else {
                content.classList.add('hidden');
            }
        });
    });
});

// Testimonial Carousel
const carousel = document.getElementById('testimonialCarousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (carousel && prevBtn && nextBtn) {
    const scrollAmount = () => {
        // Scroll by the width of one card. If cards have margin, this needs adjustment.
        // For simplicity, let's assume a card takes roughly 1/3 of the viewport on larger screens.
        if (window.innerWidth < 768) return carousel.clientWidth * 0.85; // For smaller screens, scroll almost full width
        return carousel.clientWidth / 2.5; // Adjust this factor as needed
    };
    
    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });

    // Show/hide buttons based on scroll position (optional, for better UX)
    const updateCarouselButtons = () => {
        if (carousel.scrollLeft <= 0) {
            prevBtn.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            prevBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }

        if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) { // -10 for tolerance
            nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    };
    if (window.innerWidth >= 768) { // Only show desktop buttons if screen is md or larger
          prevBtn.classList.remove('hidden');
          nextBtn.classList.remove('hidden');
    }

    carousel.addEventListener('scroll', updateCarouselButtons);
    window.addEventListener('resize', updateCarouselButtons); // Re-check on resize
    updateCarouselButtons(); // Initial check
}

// Chart 2: Crescimento de Empresas Parceiras
const parceriasCtx = document.getElementById('parceriasChart')?.getContext('2d');
if (parceriasCtx) {
    new Chart(parceriasCtx, {
        type: 'line',
        data: {
            labels: ['Trimestre 1', 'Trimestre 2', 'Trimestre 3', 'Trimestre 4 (Proj.)'],
            datasets: [{
                label: 'Empresas Parceiras',
                data: [10, 25, 45, 70], // Dados de exemplo
                fill: false,
                borderColor: 'rgba(80, 200, 120, 1)', // secondary-accent-color
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: 80
                }
            },
            plugins: {
                  legend: {
                    position: 'top',
                },
                tooltip: {
                      mode: 'index',
                      intersect: false,
                }
            }
        }
    });
}
