/**
 * Kupferquelle Hotel Website - Translation System
 * This file contains all text content in multiple languages (English, German, Afrikaans)
 */

const translations = {
    // Common elements across all pages
    common: {
        // Navigation
        nav: {
            home: {
                de: "Home",
                en: "Home",
                af: "Tuis"
            },
            rooms: {
                de: "Zimmer & Suiten",
                en: "Rooms & Suites",
                af: "Kamers & Suites"
            },
            restaurant: {
                de: "Restaurant",
                en: "Restaurant",
                af: "Restaurant"
            },
            activities: {
                de: "Aktivitäten",
                en: "Activities",
                af: "Aktiwiteite"
            },
            about: {
                de: "Über uns",
                en: "About Us",
                af: "Oor Ons"
            },
            contact: {
                de: "Kontakt",
                en: "Contact",
                af: "Kontak"
            },
            booking: {
                de: "Jetzt Buchen",
                en: "Book Now",
                af: "Bespreek Nou"
            }
        },
        
        // Footer
        footer: {
            hotel: {
                de: "Kupferquelle Hotel",
                en: "Kupferquelle Hotel",
                af: "Kupferquelle Hotel"
            },
            address: {
                de: "Bahnhof Street<br>Tsumeb, Namibia<br>9000",
                en: "Bahnhof Street<br>Tsumeb, Namibia<br>9000",
                af: "Bahnhof Straat<br>Tsumeb, Namibië<br>9000"
            },
            contact: {
                de: "Tel: +264 67 221 068<br>Email: info@kupferquelle.com",
                en: "Tel: +264 67 221 068<br>Email: info@kupferquelle.com",
                af: "Tel: +264 67 221 068<br>E-pos: info@kupferquelle.com"
            },
            links: {
                de: "Links",
                en: "Links",
                af: "Skakels"
            },
            newsletter: {
                de: "Newsletter",
                en: "Newsletter",
                af: "Nuusbrief"
            },
            newsletterText: {
                de: "Abonnieren Sie unseren Newsletter für exklusive Angebote und Updates.",
                en: "Subscribe to our newsletter for exclusive offers and updates.",
                af: "Skryf in op ons nuusbrief vir eksklusiewe aanbiedinge en opdaterings."
            },
            emailPlaceholder: {
                de: "Ihre E-Mail-Adresse",
                en: "Your email address",
                af: "Jou e-posadres"
            },
            subscribe: {
                de: "Abonnieren",
                en: "Subscribe",
                af: "Teken in"
            },
            followUs: {
                de: "Folgen Sie uns",
                en: "Follow Us",
                af: "Volg Ons"
            },
            copyright: {
                de: "© 2023 Kupferquelle Hotel. Alle Rechte vorbehalten.",
                en: "© 2023 Kupferquelle Hotel. All rights reserved.",
                af: "© 2023 Kupferquelle Hotel. Alle regte voorbehou."
            },
            privacy: {
                de: "Datenschutz",
                en: "Privacy Policy",
                af: "Privaatheidsbeleid"
            },
            terms: {
                de: "AGB",
                en: "Terms & Conditions",
                af: "Terme & Voorwaardes"
            },
            imprint: {
                de: "Impressum",
                en: "Imprint",
                af: "Indruk"
            }
        }
    },
    
    // Home page
    home: {
        hero: {
            title: {
                de: "Willkommen im Kupferquelle Hotel",
                en: "Welcome to Kupferquelle Hotel",
                af: "Welkom by Kupferquelle Hotel"
            },
            subtitle: {
                de: "Ihr Luxushotel in Namibia",
                en: "Your Luxury Hotel in Namibia",
                af: "Jou Luukse Hotel in Namibië"
            }
        },
        booking: {
            title: {
                de: "Buchen Sie Ihren Aufenthalt",
                en: "Book Your Stay",
                af: "Bespreek Jou Verblyf"
            },
            checkIn: {
                de: "Anreise",
                en: "Check-in",
                af: "Aankoms"
            },
            checkOut: {
                de: "Abreise",
                en: "Check-out",
                af: "Vertrek"
            },
            guests: {
                de: "Gäste",
                en: "Guests",
                af: "Gaste"
            },
            search: {
                de: "Verfügbarkeit prüfen",
                en: "Check Availability",
                af: "Kontroleer Beskikbaarheid"
            }
        },
        about: {
            title: {
                de: "Über Kupferquelle",
                en: "About Kupferquelle",
                af: "Oor Kupferquelle"
            },
            content: {
                de: "Das Kupferquelle Hotel bietet Ihnen erstklassigen Service und Komfort in einer der schönsten Regionen Namibias. Unser Hotel verbindet traditionelle Gastfreundschaft mit modernem Luxus, um Ihnen einen unvergesslichen Aufenthalt zu garantieren.",
                en: "Kupferquelle Hotel offers you first-class service and comfort in one of the most beautiful regions of Namibia. Our hotel combines traditional hospitality with modern luxury to guarantee you an unforgettable stay.",
                af: "Kupferquelle Hotel bied jou eersteklas diens en gemak in een van die mooiste streke van Namibië. Ons hotel kombineer tradisionele gasvryheid met moderne luukse om jou 'n onvergeetlike verblyf te waarborg."
            },
            readMore: {
                de: "Mehr erfahren",
                en: "Read More",
                af: "Lees Meer"
            }
        }
    },
    
    // Booking page
    booking: {
        title: {
            de: "Direkte Buchung",
            en: "Direct Booking",
            af: "Direkte Bespreking"
        },
        subtitle: {
            de: "Buchen Sie direkt bei uns und genießen Sie die besten Preise und Vorteile",
            en: "Book directly with us and enjoy the best rates and benefits",
            af: "Bespreek direk by ons en geniet die beste tariewe en voordele"
        },
        advantages: {
            title: {
                de: "Vorteile der Direktbuchung",
                en: "Benefits of Direct Booking",
                af: "Voordele van Direkte Bespreking"
            },
            bestPrice: {
                title: {
                    de: "Beste Preisgarantie",
                    en: "Best Price Guarantee",
                    af: "Beste Prys Waarborg"
                },
                description: {
                    de: "Bei uns erhalten Sie immer den günstigsten Preis ohne versteckte Gebühren.",
                    en: "With us, you always get the lowest price without hidden fees.",
                    af: "By ons kry jy altyd die laagste prys sonder versteekte fooie."
                }
            },
            flexibility: {
                title: {
                    de: "Flexible Stornierung",
                    en: "Flexible Cancellation",
                    af: "Buigsame Kansellasie"
                },
                description: {
                    de: "Kostenlose Stornierung bis zu 48 Stunden vor Anreise.",
                    en: "Free cancellation up to 48 hours before arrival.",
                    af: "Gratis kansellasie tot 48 uur voor aankoms."
                }
            },
            exclusive: {
                title: {
                    de: "Exklusive Angebote",
                    en: "Exclusive Offers",
                    af: "Eksklusiewe Aanbiedinge"
                },
                description: {
                    de: "Zugang zu speziellen Angeboten, die nur bei Direktbuchung verfügbar sind.",
                    en: "Access to special offers only available with direct booking.",
                    af: "Toegang tot spesiale aanbiedinge slegs beskikbaar met direkte bespreking."
                }
            }
        },
        form: {
            title: {
                de: "Ihre Buchung",
                en: "Your Booking",
                af: "Jou Bespreking"
            },
            checkIn: {
                de: "Anreise",
                en: "Check-in",
                af: "Aankoms"
            },
            checkOut: {
                de: "Abreise",
                en: "Check-out",
                af: "Vertrek"
            },
            guests: {
                de: "Gäste",
                en: "Guests",
                af: "Gaste"
            },
            guestOptions: {
                1: {
                    de: "1 Person",
                    en: "1 Person",
                    af: "1 Persoon"
                },
                2: {
                    de: "2 Personen",
                    en: "2 People",
                    af: "2 Persone"
                },
                3: {
                    de: "3 Personen",
                    en: "3 People",
                    af: "3 Persone"
                },
                4: {
                    de: "4 Personen",
                    en: "4 People",
                    af: "4 Persone"
                },
                5: {
                    de: "5+ Personen",
                    en: "5+ People",
                    af: "5+ Persone"
                }
            },
            roomType: {
                de: "Zimmertyp",
                en: "Room Type",
                af: "Kamer Tipe"
            },
            roomOptions: {
                standard: {
                    de: "Standard Zimmer",
                    en: "Standard Room",
                    af: "Standaard Kamer"
                },
                deluxe: {
                    de: "Deluxe Zimmer",
                    en: "Deluxe Room",
                    af: "Luukse Kamer"
                },
                suite: {
                    de: "Suite",
                    en: "Suite",
                    af: "Suite"
                },
                family: {
                    de: "Familienzimmer",
                    en: "Family Room",
                    af: "Familie Kamer"
                }
            },
            specialRequests: {
                de: "Besondere Wünsche",
                en: "Special Requests",
                af: "Spesiale Versoeke"
            },
            bookNow: {
                de: "Jetzt Buchen",
                en: "Book Now",
                af: "Bespreek Nou"
            }
        },
        rooms: {
            title: {
                de: "Unsere Zimmer",
                en: "Our Rooms",
                af: "Ons Kamers"
            },
            standard: {
                title: {
                    de: "Standard Zimmer",
                    en: "Standard Room",
                    af: "Standaard Kamer"
                },
                description: {
                    de: "Komfortables Zimmer mit allen grundlegenden Annehmlichkeiten für einen angenehmen Aufenthalt.",
                    en: "Comfortable room with all basic amenities for a pleasant stay.",
                    af: "Gemaklike kamer met alle basiese geriewe vir 'n aangename verblyf."
                },
                price: {
                    de: "Ab N$ 1.200 pro Nacht",
                    en: "From N$ 1,200 per night",
                    af: "Vanaf N$ 1,200 per nag"
                }
            },
            deluxe: {
                title: {
                    de: "Deluxe Zimmer",
                    en: "Deluxe Room",
                    af: "Luukse Kamer"
                },
                description: {
                    de: "Geräumiges Zimmer mit zusätzlichem Komfort und schönem Ausblick.",
                    en: "Spacious room with additional comfort and beautiful views.",
                    af: "Ruim kamer met ekstra gemak en pragtige uitsigte."
                },
                price: {
                    de: "Ab N$ 1.800 pro Nacht",
                    en: "From N$ 1,800 per night",
                    af: "Vanaf N$ 1,800 per nag"
                }
            },
            suite: {
                title: {
                    de: "Suite",
                    en: "Suite",
                    af: "Suite"
                },
                description: {
                    de: "Luxuriöse Suite mit separatem Wohnbereich und erstklassigen Annehmlichkeiten.",
                    en: "Luxurious suite with separate living area and first-class amenities.",
                    af: "Luukse suite met aparte woonarea en eersteklas geriewe."
                },
                price: {
                    de: "Ab N$ 2.500 pro Nacht",
                    en: "From N$ 2,500 per night",
                    af: "Vanaf N$ 2,500 per nag"
                }
            },
            details: {
                de: "Details",
                en: "Details",
                af: "Besonderhede"
            }
        }
    },
    
    // Booking confirmation page
    confirmation: {
        title: {
            de: "Vielen Dank für Ihre Buchung!",
            en: "Thank you for your booking!",
            af: "Dankie vir jou bespreking!"
        },
        message: {
            de: "Ihre Buchung wurde erfolgreich abgeschlossen. Eine Bestätigungs-E-Mail wurde an Ihre angegebene E-Mail-Adresse gesendet.",
            en: "Your booking has been successfully completed. A confirmation email has been sent to your provided email address.",
            af: "Jou bespreking is suksesvol voltooi. 'n Bevestigingse-pos is gestuur na jou verskafde e-posadres."
        },
        details: {
            title: {
                de: "Buchungsdetails",
                en: "Booking Details",
                af: "Bespreking Besonderhede"
            },
            bookingNumber: {
                de: "Buchungsnummer",
                en: "Booking Number",
                af: "Besprekingsnommer"
            },
            checkIn: {
                de: "Anreise",
                en: "Check-in",
                af: "Aankoms"
            },
            checkOut: {
                de: "Abreise",
                en: "Check-out",
                af: "Vertrek"
            },
            nights: {
                de: "Anzahl der Nächte",
                en: "Number of Nights",
                af: "Aantal Nagte"
            },
            guests: {
                de: "Anzahl der Gäste",
                en: "Number of Guests",
                af: "Aantal Gaste"
            },
            roomType: {
                de: "Zimmertyp",
                en: "Room Type",
                af: "Kamer Tipe"
            },
            totalPrice: {
                de: "Gesamtpreis",
                en: "Total Price",
                af: "Totale Prys"
            }
        },
        actions: {
            home: {
                de: "Zurück zur Startseite",
                en: "Back to Home",
                af: "Terug na Tuisblad"
            },
            questions: {
                de: "Haben Sie Fragen?",
                en: "Have Questions?",
                af: "Het Jy Vrae?"
            }
        },
        info: {
            title: {
                de: "Was Sie wissen sollten",
                en: "What You Should Know",
                af: "Wat Jy Moet Weet"
            },
            checkInOut: {
                title: {
                    de: "Check-in & Check-out",
                    en: "Check-in & Check-out",
                    af: "Aankoms & Vertrek"
                },
                description: {
                    de: "Check-in ab 14:00 Uhr<br>Check-out bis 11:00 Uhr",
                    en: "Check-in from 2:00 PM<br>Check-out until 11:00 AM",
                    af: "Aankoms vanaf 14:00<br>Vertrek tot 11:00"
                }
            },
            parking: {
                title: {
                    de: "Parken",
                    en: "Parking",
                    af: "Parkering"
                },
                description: {
                    de: "Kostenlose Parkplätze stehen für unsere Gäste zur Verfügung.",
                    en: "Free parking is available for our guests.",
                    af: "Gratis parkering is beskikbaar vir ons gaste."
                }
            },
            wifi: {
                title: {
                    de: "WLAN",
                    en: "WiFi",
                    af: "WiFi"
                },
                description: {
                    de: "Kostenloses WLAN im gesamten Hotel verfügbar.",
                    en: "Free WiFi available throughout the hotel.",
                    af: "Gratis WiFi beskikbaar regdeur die hotel."
                }
            }
        }
    }
};

// Export translations for use in other files
export default translations;