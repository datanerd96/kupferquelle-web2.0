// Kupferquelle Hotel Website JavaScript

// Main initialization
document.addEventListener('DOMContentLoaded', function () {
    // Initialize mobile menu
    initMobileMenu();

    // Initialize sliders
    initSliders();

    // Initialize language selector
    initLanguageSelector();

    // Initialize booking system on booking pages
    if (document.getElementById('booking-form')) {
        new BookingSystem();
    }

    // Initialize booking confirmation page
    if (document.querySelector('.confirmation-section')) {
        displayBookingConfirmation();
    }
});

// Function to display booking confirmation details
function displayBookingConfirmation() {
    const bookingDetailsJSON = sessionStorage.getItem('bookingDetails');

    if (bookingDetailsJSON) {
        const bookingDetails = JSON.parse(bookingDetailsJSON);
        const bookingSummary = document.getElementById('booking-summary');

        if (bookingSummary) {
            // Format dates for display
            const checkInDate = new Date(bookingDetails.checkIn);
            const checkOutDate = new Date(bookingDetails.checkOut);
            const formattedCheckIn = checkInDate.toLocaleDateString('en-US');
            const formattedCheckOut = checkOutDate.toLocaleDateString('en-US');

            // Get room type name based on the current language
            const currentLang = localStorage.getItem('preferredLanguage') || 'en';
            let roomTypeName = getRoomTypeName(bookingDetails.roomType, currentLang);

            // Create HTML for booking summary
            bookingSummary.innerHTML = `
                <div class="booking-info">
                    <p><strong>Booking Number:</strong> KQ-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
                    <p><strong>Check-in:</strong> ${formattedCheckIn}</p>
                    <p><strong>Check-out:</strong> ${formattedCheckOut}</p>
                    <p><strong>Number of Nights:</strong> ${bookingDetails.nights}</p>
                    <p><strong>Number of Guests:</strong> ${bookingDetails.guests}</p>
                    <p><strong>Room Type:</strong> ${roomTypeName}</p>
                    <p><strong>Total Price:</strong> NAD ${bookingDetails.totalPrice.toLocaleString('en-US')}</p>
                </div>
            `;
        }
    }
}

// Helper function to get room type name based on language
function getRoomTypeName(type, lang) {
    const names = {
        'standard': {
            'de': 'Standard Zimmer',
            'en': 'Standard Room',
            'af': 'Standaard Kamer'
        },
        'deluxe': {
            'de': 'Deluxe Zimmer',
            'en': 'Deluxe Room',
            'af': 'Luukse Kamer'
        },
        'suite': {
            'de': 'Suite',
            'en': 'Suite',
            'af': 'Suite'
        },
        'family': {
            'de': 'Familienzimmer',
            'en': 'Family Room',
            'af': 'Familie Kamer'
        }
    };

    return names[type] ? names[type][lang] || names[type]['en'] : type;
}

// Function to initialize sliders
function initSliders() {
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        // Initialize slider logic
        // e.g., Swiper.js or custom script
        // Example:
        // new Swiper(heroSlider, {...});
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });

        document.addEventListener('click', function (event) {
            if (!event.target.closest('nav') && !event.target.closest('.mobile-menu-toggle') && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }
}

// 🧠 Language Translations (if using <script src="translations.js"></script>)
const translations = window.translations || {};

// Language selector functionality
function initLanguageSelector() {
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        const currentLang = localStorage.getItem('preferredLanguage') || 'en';
        languageSelector.value = currentLang;
        applyTranslations(currentLang);

        languageSelector.addEventListener('change', function () {
            const selectedLanguage = this.value;
            changeLanguage(selectedLanguage);
        });
    }
}

function changeLanguage(lang) {
    localStorage.setItem('preferredLanguage', lang);
    applyTranslations(lang);
    document.documentElement.lang = lang;
}

function applyTranslations(lang) {
    // First, handle elements with data-i18n attributes (for future compatibility)
    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let translation = translations;

        for (const k of keys) {
            if (translation[k]) {
                translation = translation[k];
            } else {
                console.warn(`Translation key not found: ${key}`);
                return;
            }
        }

        if (translation[lang]) {
            if (element.tagName === 'INPUT' && element.getAttribute('type') === 'placeholder') {
                element.placeholder = translation[lang];
            } else if (element.tagName === 'META' && element.getAttribute('name') === 'description') {
                element.content = translation[lang];
            } else {
                element.innerHTML = translation[lang];
            }
        }
    });
    
    // Set the document language
    document.documentElement.lang = lang;
    
    // Apply translations to navigation menu
    const navItems = document.querySelectorAll('nav ul li a');
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        let key;
        
        // Determine which navigation item this is based on href
        if (href === 'index.html') key = 'home';
        else if (href === 'rooms.html') key = 'rooms';
        else if (href === 'restaurant.html') key = 'restaurant';
        else if (href === 'activities.html') key = 'activities';
        else if (href === 'about.html') key = 'about';
        else if (href === 'contact.html') key = 'contact';
        
        // Apply translation if we have a key and it exists in translations
        if (key && translations.common && translations.common.nav && translations.common.nav[key]) {
            item.textContent = translations.common.nav[key][lang];
        }
    });
    
    // Apply translation to booking button
    const bookingBtn = document.querySelector('.booking-btn a');
    if (bookingBtn && translations.common && translations.common.nav && translations.common.nav.booking) {
        bookingBtn.textContent = translations.common.nav.booking[lang];
    }
    
    // Apply translations to page-specific content
    updatePageSpecificContent(lang);
}

function updatePageSpecificContent(lang) {
    const currentPage = getCurrentPage();

    // Update page title and meta description
    if (document.title) {
        if (currentPage === 'index' && translations.home && translations.home.pageTitle) {
            document.title = translations.home.pageTitle[lang] || document.title;
        }
    }
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && currentPage === 'index' && translations.home && translations.home.metaDescription) {
        metaDescription.content = translations.home.metaDescription[lang] || metaDescription.content;
    }
    
    // Update page-specific content based on the current page
    switch (currentPage) {
        case 'index':
            updateHomePageContent(lang);
            break;
        case 'booking':
            updateBookingPageContent(lang);
            break;
        case 'booking-confirmation':
            updateConfirmationPageContent(lang);
            break;
    }
}

// Function to update home page content
function updateHomePageContent(lang) {
    // Hero section
    const heroTitle = document.querySelector('.hero .slide-content h1');
    const heroSubtitle = document.querySelector('.hero .slide-content p');
    const heroButton = document.querySelector('.hero .slide-content .btn');
    
    if (heroTitle && translations.home && translations.home.hero && translations.home.hero.title) {
        heroTitle.textContent = translations.home.hero.title[lang];
    }
    
    if (heroSubtitle && translations.home && translations.home.hero && translations.home.hero.subtitle) {
        heroSubtitle.textContent = translations.home.hero.subtitle[lang];
    }
    
    // About section
    const aboutTitle = document.querySelector('.about-preview h2');
    const aboutParagraphs = document.querySelectorAll('.about-preview p');
    const aboutButton = document.querySelector('.about-preview .btn-secondary');
    
    if (aboutTitle && translations.home && translations.home.about && translations.home.about.title) {
        aboutTitle.textContent = translations.home.about.title[lang];
    }
    
    if (aboutParagraphs.length > 0 && translations.home && translations.home.about && translations.home.about.content) {
        aboutParagraphs[0].textContent = translations.home.about.content[lang];
    }
    
    if (aboutButton && translations.home && translations.home.about && translations.home.about.readMore) {
        aboutButton.textContent = translations.home.about.readMore[lang];
    }
    
    // Booking widget
    const bookingTitle = document.querySelector('.booking-widget h2');
    const bookingLabels = document.querySelectorAll('.booking-widget label');
    const bookingButton = document.querySelector('.booking-widget button');
    
    if (bookingTitle && translations.home && translations.home.booking && translations.home.booking.title) {
        bookingTitle.textContent = translations.home.booking.title[lang];
    }
    
    if (bookingLabels.length >= 4 && translations.home && translations.home.booking) {
        if (translations.home.booking.checkIn) {
            bookingLabels[0].textContent = translations.home.booking.checkIn[lang];
        }
        if (translations.home.booking.checkOut) {
            bookingLabels[1].textContent = translations.home.booking.checkOut[lang];
        }
        if (translations.home.booking.guests) {
            bookingLabels[2].textContent = translations.home.booking.guests[lang];
        }
    }
    
    if (bookingButton && translations.home && translations.home.booking && translations.home.booking.search) {
        bookingButton.textContent = translations.home.booking.search[lang];
    }
}

// Function to update booking page content
function updateBookingPageContent(lang) {
    // Implement booking page specific translations
    // This is a placeholder for the booking page translation logic
}

// Function to update booking confirmation page content
function updateConfirmationPageContent(lang) {
    // Get booking details from session storage
    const bookingDetailsJSON = sessionStorage.getItem('bookingDetails');
    
    if (bookingDetailsJSON) {
        const bookingDetails = JSON.parse(bookingDetailsJSON);
        const bookingSummary = document.getElementById('booking-summary');
        
        if (bookingSummary) {
            // Format dates for display
            const checkInDate = new Date(bookingDetails.checkIn);
            const checkOutDate = new Date(bookingDetails.checkOut);
            const formattedCheckIn = checkInDate.toLocaleDateString(lang === 'en' ? 'en-US' : (lang === 'af' ? 'af-ZA' : 'de-DE'));
            const formattedCheckOut = checkOutDate.toLocaleDateString(lang === 'en' ? 'en-US' : (lang === 'af' ? 'af-ZA' : 'de-DE'));
            
            // Get room type name based on the current language
            let roomTypeName = getRoomTypeName(bookingDetails.roomType, lang);
            
            // Create HTML for booking summary with translated labels
            const labels = {
                bookingNumber: translations.booking?.confirmation?.bookingNumber?.[lang] || 'Buchungsnummer:',
                checkIn: translations.booking?.confirmation?.checkIn?.[lang] || 'Anreise:',
                checkOut: translations.booking?.confirmation?.checkOut?.[lang] || 'Abreise:',
                nights: translations.booking?.confirmation?.nights?.[lang] || 'Anzahl der Nächte:',
                guests: translations.booking?.confirmation?.guests?.[lang] || 'Anzahl der Gäste:',
                roomType: translations.booking?.confirmation?.roomType?.[lang] || 'Zimmertyp:',
                totalPrice: translations.booking?.confirmation?.totalPrice?.[lang] || 'Gesamtpreis:'
            };
            
            bookingSummary.innerHTML = `
                <div class="booking-info">
                    <p><strong>${labels.bookingNumber}</strong> KQ-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
                    <p><strong>${labels.checkIn}</strong> ${formattedCheckIn}</p>
                    <p><strong>${labels.checkOut}</strong> ${formattedCheckOut}</p>
                    <p><strong>${labels.nights}</strong> ${bookingDetails.nights}</p>
                    <p><strong>${labels.guests}</strong> ${bookingDetails.guests}</p>
                    <p><strong>${labels.roomType}</strong> ${roomTypeName}</p>
                    <p><strong>${labels.totalPrice}</strong> NAD ${bookingDetails.totalPrice.toLocaleString(lang === 'en' ? 'en-US' : (lang === 'af' ? 'af-ZA' : 'de-DE'))}</p>
                </div>
            `;
        }
    }
}

function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    return (!filename || filename === 'index.html') ? 'index' : filename.replace('.html', '');
}

// Booking System Class
class BookingSystem {
    constructor() {
        this.availableRooms = {
            'standard': {
                price: 1200,
                capacity: 2,
                amenities: ['WiFi', 'Air Conditioning', 'TV']
            },
            'deluxe': {
                price: 1800,
                capacity: 3,
                amenities: ['WiFi', 'Air Conditioning', 'TV', 'Minibar', 'Balcony']
            },
            'suite': {
                price: 2500,
                capacity: 4,
                amenities: ['WiFi', 'Air Conditioning', 'TV', 'Minibar', 'Balcony', 'Whirlpool']
            },
            'family': {
                price: 2200,
                capacity: 5,
                amenities: ['WiFi', 'Air Conditioning', 'TV', 'Minibar', 'Extra Beds']
            }
        };

        this.initBookingForm();
    }

    initBookingForm() {
        const bookingForm = document.getElementById('booking-form');
        const roomTypeSelect = document.getElementById('room-type');
        const guestsSelect = document.getElementById('guests');

        if (bookingForm && roomTypeSelect && guestsSelect) {
            guestsSelect.addEventListener('change', () => {
                this.updateRoomOptions(parseInt(guestsSelect.value));
            });

            this.updateRoomOptions(parseInt(guestsSelect.value));

            bookingForm.addEventListener('submit', (event) => {
                event.preventDefault();
                this.processBooking();
            });
        }
    }

    updateRoomOptions(guestCount) {
        const roomTypeSelect = document.getElementById('room-type');
        if (!roomTypeSelect) return;

        roomTypeSelect.innerHTML = '';

        for (const [type, details] of Object.entries(this.availableRooms)) {
            if (details.capacity >= guestCount) {
                const option = document.createElement('option');
                option.value = type;
                option.textContent = this.getRoomTypeName(type);
                roomTypeSelect.appendChild(option);
            }
        }
    }

    getRoomTypeName(type) {
        const currentLang = localStorage.getItem('preferredLanguage') || 'en';
        const names = {
            'standard': {
                'en': 'Standard Room',
                'de': 'Standard Zimmer',
                'af': 'Standaard Kamer'
            },
            'deluxe': {
                'en': 'Deluxe Room',
                'de': 'Deluxe Zimmer',
                'af': 'Luukse Kamer'
            },
            'suite': {
                'en': 'Suite',
                'de': 'Suite',
                'af': 'Suite'
            },
            'family': {
                'en': 'Family Room',
                'de': 'Familienzimmer',
                'af': 'Familie Kamer'
            }
        };
        return names[type] ? names[type][currentLang] || names[type]['en'] : type;
    }

    processBooking() {
        const checkIn = document.getElementById('check-in').value;
        const checkOut = document.getElementById('check-out').value;
        const guests = document.getElementById('guests').value;
        const roomType = document.getElementById('room-type').value;

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

        if (nights <= 0) {
            alert('Please select valid check-in and check-out dates.');
            return;
        }

        const roomPrice = this.availableRooms[roomType].price;
        const totalPrice = roomPrice * nights;

        const bookingDetails = {
            checkIn,
            checkOut,
            guests,
            roomType,
            nights,
            totalPrice
        };

        sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

        window.location.href = 'booking-confirmation.html';
    }
}
