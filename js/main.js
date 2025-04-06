// Kupferquelle Hotel Website JavaScript

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
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
            const formattedCheckIn = checkInDate.toLocaleDateString('de-DE');
            const formattedCheckOut = checkOutDate.toLocaleDateString('de-DE');
            
            // Get room type name based on the current language
            const currentLang = localStorage.getItem('preferredLanguage') || 'de';
            let roomTypeName = getRoomTypeName(bookingDetails.roomType, currentLang);
            
            // Create HTML for booking summary
            bookingSummary.innerHTML = `
                <div class="booking-info">
                    <p><strong>Buchungsnummer:</strong> KQ-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
                    <p><strong>Anreise:</strong> ${formattedCheckIn}</p>
                    <p><strong>Abreise:</strong> ${formattedCheckOut}</p>
                    <p><strong>Anzahl der Nächte:</strong> ${bookingDetails.nights}</p>
                    <p><strong>Anzahl der Gäste:</strong> ${bookingDetails.guests}</p>
                    <p><strong>Zimmertyp:</strong> ${roomTypeName}</p>
                    <p><strong>Gesamtpreis:</strong> NAD ${bookingDetails.totalPrice.toLocaleString('de-DE')}</p>
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
    
    return names[type] ? names[type][lang] || names[type]['de'] : type;
}

// Function to initialize sliders
function initSliders() {
    // Placeholder for slider initialization
    // This would typically contain code to initialize any image sliders on the page
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        // Slider initialization code would go here
        console.log('Hero slider initialized');
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('nav') && !event.target.closest('.mobile-menu-toggle') && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }
});


// Import translations
import { translations } from './translations.js';

// Language selector functionality
function initLanguageSelector() {
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        // Set initial language based on localStorage or default to 'de'
        const currentLang = localStorage.getItem('preferredLanguage') || 'de';
        languageSelector.value = currentLang;
        
        // Apply translations for current language
        applyTranslations(currentLang);
        
        // Add change event listener
        languageSelector.addEventListener('change', function() {
            const selectedLanguage = this.value;
            changeLanguage(selectedLanguage);
        });
    }
}

// Function to change language
function changeLanguage(lang) {
    // Store the selected language in localStorage
    localStorage.setItem('preferredLanguage', lang);
    
    // Apply translations for the selected language
    applyTranslations(lang);
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// Function to apply translations based on the selected language
function applyTranslations(lang) {
    // Get all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        
        // Navigate through the translations object
        let translation = translations;
        for (const k of keys) {
            if (translation[k]) {
                translation = translation[k];
            } else {
                console.warn(`Translation key not found: ${key}`);
                return;
            }
        }
        
        // Apply translation if it exists for the current language
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
    
    // Special handling for page-specific content
    updatePageSpecificContent(lang);
}

// Function to update page-specific content based on current page
function updatePageSpecificContent(lang) {
    const currentPage = getCurrentPage();
    
    switch(currentPage) {
        case 'index':
            updateHomePageContent(lang);
            break;
        case 'booking':
            updateBookingPageContent(lang);
            break;
        case 'booking-confirmation':
            updateConfirmationPageContent(lang);
            break;
        // Add more pages as needed
    }
}

// Helper function to determine current page
function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    
    if (!filename || filename === '' || filename === 'index.html') {
        return 'index';
    }
    
    return filename.replace('.html', '');
}

// Direct booking system functionality
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
            // Update room options based on guest count
            guestsSelect.addEventListener('change', () => {
                this.updateRoomOptions(parseInt(guestsSelect.value));
            });
            
            // Initialize room options
            this.updateRoomOptions(parseInt(guestsSelect.value));
            
            // Handle form submission
            bookingForm.addEventListener('submit', (event) => {
                event.preventDefault();
                this.processBooking();
            });
        }
    }
    
    updateRoomOptions(guestCount) {
        const roomTypeSelect = document.getElementById('room-type');
        if (!roomTypeSelect) return;
        
        // Clear current options
        roomTypeSelect.innerHTML = '';
        
        // Add only room types that can accommodate the guest count
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
        const names = {
            'standard': 'Standard Zimmer',
            'deluxe': 'Deluxe Zimmer',
            'suite': 'Suite',
            'family': 'Familienzimmer'
        };
        return names[type] || type;
    }
    
    processBooking() {
        const checkIn = document.getElementById('check-in').value;
        const checkOut = document.getElementById('check-out').value;
        const guests = document.getElementById('guests').value;
        const roomType = document.getElementById('room-type').value;
        
        // Calculate stay duration
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
        
        // Calculate total price
        const roomPrice = this.availableRooms[roomType].price;
        const totalPrice = roomPrice * nights;
        
        // Store booking details in session storage
        const bookingDetails = {
            checkIn,
            checkOut,
            guests,
            roomType,
            nights,
            totalPrice
        };
        
        sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
        
        // Redirect to booking confirmation page
        window.location.href = 'booking-confirmation.html';
    }
}

// Initialize booking system on booking pages
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('booking-form')) {
        new BookingSystem();
    }
});