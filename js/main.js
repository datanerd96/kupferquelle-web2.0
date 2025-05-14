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
    if (document.getElementById('booking-summary')) { // Changed condition here
        displayBookingConfirmation();
    }
});

// Generate a unique booking number
function generateBookingNumber() {
    const prefix = 'KQ';
    const timestamp = new Date().getTime().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
}

// Function to display booking confirmation details
function displayBookingConfirmation() {
    const bookingDetailsJSON = sessionStorage.getItem('bookingDetails');
    const currentLang = localStorage.getItem('preferredLanguage') || 'en'; // Get current language
    const locale = currentLang === 'de' ? 'de-DE' : (currentLang === 'af' ? 'af-ZA' : 'en-US'); // Map language to locale

    if (bookingDetailsJSON) {
        const bookingDetails = JSON.parse(bookingDetailsJSON);
        const bookingSummary = document.getElementById('booking-summary');

        if (bookingSummary) {
            // Format dates for display
            const checkInDate = new Date(bookingDetails.checkIn);
            const checkOutDate = new Date(bookingDetails.checkOut);
            const formattedCheckIn = checkInDate.toLocaleDateString(locale);
            const formattedCheckOut = checkOutDate.toLocaleDateString(locale);

            // Get room type name based on the current language
            let roomTypeName = getRoomTypeName(bookingDetails.roomType, currentLang); // Assumes getRoomTypeName is available globally

            bookingSummary.innerHTML = `
                <div class="detail-row">
                    <span class="detail-label" data-i18n="bookingConfirmation.bookingNumberLabel">Booking Number:</span>
                    <span class="detail-value">${generateBookingNumber()}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label" data-i18n="bookingConfirmation.checkInLabel">Check-In:</span>
                    <span class="detail-value">${formattedCheckIn}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label" data-i18n="bookingConfirmation.checkOutLabel">Check-Out:</span>
                    <span class="detail-value">${formattedCheckOut}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label" data-i18n="bookingConfirmation.nightsLabel">Number of Nights:</span>
                    <span class="detail-value">${bookingDetails.nights}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label" data-i18n="bookingConfirmation.guestsLabel">Number of Guests:</span>
                    <span class="detail-value">${bookingDetails.guests}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label" data-i18n="bookingConfirmation.roomTypeLabel">Room Type:</span>
                    <span class="detail-value">${roomTypeName}</span>
                </div>
                <div class="detail-row total">
                    <span class="detail-label" data-i18n="bookingConfirmation.totalPriceLabel">Total Price:</span>
                    <span class="detail-value">N$ ${bookingDetails.totalPrice.toLocaleString(locale)}</span>
                </div>
            `;

            // Re-apply translations for the newly added elements
            if (window.applyTranslations) {
                 window.applyTranslations(currentLang);
            }
        }
    } else {
        // If no booking details found, redirect to booking page
        window.location.href = 'booking.html';
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
    // Always determine and apply the language on initial load
    const currentLang = localStorage.getItem('preferredLanguage') || 'en';
    document.documentElement.lang = currentLang; // Set lang attribute early
    applyTranslations(currentLang); // Apply translations regardless of selector presence

    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.value = currentLang; // Set selector value if it exists
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

        let textToApply = translation[lang];
        // Fallback to English if translation for the current language is missing, but English exists
        if (typeof textToApply === 'undefined' && typeof translation['en'] !== 'undefined' && lang !== 'en') {
            // console.warn(`Translation missing for key '${key}' in language '${lang}'. Falling back to English.`);
            textToApply = translation['en'];
        }
        
        if (typeof textToApply !== 'undefined') { // Proceed only if a translation string is available
            if ((element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') && element.hasAttribute('placeholder')) {
                element.placeholder = textToApply;
            } else if (element.tagName === 'IMG' && element.hasAttribute('alt')) {
                element.alt = textToApply;
            } else if (element.tagName === 'META' && element.getAttribute('name') === 'description') {
                element.content = textToApply;
            } else if (element.tagName === 'INPUT' && (element.type === 'button' || element.type === 'submit' || element.type === 'reset')) {
                element.value = textToApply;
            } else if (element.tagName === 'OPTION') {
                element.textContent = textToApply;
            } else {
                if (element.tagName !== 'INPUT' && element.tagName !== 'TEXTAREA' && element.tagName !== 'SELECT') {
                    element.innerHTML = textToApply;
                }
            }
        } else {
            // console.warn(`No translation (including English fallback) found for key: ${key}`);
        }
    });
    
    // Set the document language
    document.documentElement.lang = lang; // Ensure this is set
    
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
            let navText = translations.common.nav[key][lang];
            // Fallback to English if translation for the current language is missing, but English for the key exists
            if (typeof navText === 'undefined' && typeof translations.common.nav[key]['en'] !== 'undefined' && lang !== 'en') {
                navText = translations.common.nav[key]['en'];
            }

            if (typeof navText !== 'undefined') { // Proceed only if a translation string is available
                item.textContent = navText;
            }
            // If navText is still undefined (e.g. key itself or 'en' version is missing),
            // item.textContent remains unchanged, preserving the original HTML text.
        }
    });
    
    // Apply translation to booking button
    const bookingBtn = document.querySelector('.booking-btn a');
    if (bookingBtn && translations.common && translations.common.nav && translations.common.nav.booking) {
        let bookingBtnText = translations.common.nav.booking[lang];
        if (typeof bookingBtnText === 'undefined' && typeof translations.common.nav.booking['en'] !== 'undefined' && lang !== 'en') {
            bookingBtnText = translations.common.nav.booking['en'];
        }
        if (typeof bookingBtnText !== 'undefined') {
            bookingBtn.textContent = bookingBtnText;
        }
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
    // The dynamic booking details are now handled by displayBookingConfirmation.
    // This function can be used for other static translatable elements on the confirmation page if any.
    // Or, rely on the generic applyTranslations to handle all data-i18n attributes.
    // For now, we ensure it doesn't conflict with displayBookingConfirmation's work on #booking-summary.

    // Example: if there were other elements to translate on this page:
    // const pageTitle = document.querySelector('.confirmation-page-title'); // Fictional element
    // if (pageTitle && translations.bookingConfirmation && translations.bookingConfirmation.pageTitle) {
    //     pageTitle.textContent = translations.bookingConfirmation.pageTitle[lang] || translations.bookingConfirmation.pageTitle['en'];
    // }
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
