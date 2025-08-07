// Astolfi 1570 - Configuration
// This file should be included before astolfi-form.js

// Production API endpoint
window.ASTOLFI_API_ENDPOINT = 'https://37.187.150.143:5678/webhook-test/astolfi1570_proposal';

// For local development, uncomment:
// window.ASTOLFI_API_ENDPOINT = 'http://localhost:5678/webhook-test/astolfi1570_proposal';

// Google Analytics (optional)
// Replace with your GA tracking ID
window.GA_TRACKING_ID = 'UA-XXXXXXXXX-X';

// Initialize GA if ID is provided
if (window.GA_TRACKING_ID && window.GA_TRACKING_ID !== 'UA-XXXXXXXXX-X') {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', window.GA_TRACKING_ID);
    
    // Load GA script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${window.GA_TRACKING_ID}`;
    document.head.appendChild(script);
}