# Kupferquelle Hotel Website

This repository contains the complete website for Kupferquelle Hotel, a luxury hotel located in Tsumeb, Namibia. The website is designed to showcase the hotel's amenities, rooms, and services while providing a direct booking system for guests.

## Features

### Multilingual Support
The website supports multiple languages:
- German (Default)
- English
- Afrikaans

Language switching is handled through the `translations.js` file which contains all text content in the supported languages.

### Direct Booking System
The website includes a complete booking system that allows guests to:
- Check room availability
- Select room types
- Make reservations directly without third-party services
- Receive booking confirmations

### Responsive Design
The website is fully responsive and optimized for all devices:
- Desktop computers
- Tablets
- Mobile phones

### SEO Optimization
The website is optimized for search engines with:
- Semantic HTML structure
- Meta tags and descriptions
- Schema.org structured data
- Optimized page loading speed
- Mobile-friendly design

## Project Structure

```
├── index.html              # Homepage
├── booking.html            # Booking page
├── booking-confirmation.html # Booking confirmation page
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   ├── main.js             # Main JavaScript functionality
│   └── translations.js      # Multilingual support
└── images/                 # Website images (not included in repository)
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/kupferquelle-hotel-website.git
   ```

2. Open the project in your preferred code editor

3. To view the website locally, simply open the `index.html` file in a web browser

## Development

This website is built with vanilla HTML, CSS, and JavaScript without any frameworks or build tools, making it easy to modify and maintain.

### Adding New Pages

To add a new page:
1. Create a new HTML file following the structure of existing pages
2. Add the page to the navigation menu in all HTML files
3. Add any necessary translations to `translations.js`

### Modifying Styles

All styles are contained in `css/styles.css`. The website uses CSS variables for consistent theming:

```css
:root {
    --primary-color: #8b5a2b; /* Copper-like color */
    --secondary-color: #2b5a8b; /* Complementary blue */
    --accent-color: #d4af37; /* Gold accent */
    /* ... other variables ... */
}
```

## License

All rights reserved. This project is proprietary and confidential.

## Contact

For any inquiries about this website, please contact:
- Email: info@kupferquelle.com
- Phone: +264 67 221 068