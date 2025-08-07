// Astolfi 1570 - Form Handler
// Configuration
const CONFIG = {
    API_ENDPOINT: window.ASTOLFI_API_ENDPOINT || 'https://37.187.150.143:5678/webhook-test/astolfi1570_proposal',
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000,
    FORM_TIMEOUT: 30000
};

// Enhanced email validation
function validateEmail(email) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return re.test(email.toLowerCase());
}

// Sanitize input to prevent XSS
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Show error message
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    const errorText = errorDiv.querySelector('p');
    if (message) {
        errorText.innerHTML = message + ' Riprova tra qualche minuto o contattaci direttamente a <a href="mailto:info@astolfi1570.it" class="font-bold text-blue-600 hover:underline">info@astolfi1570.it</a>';
    }
    errorDiv.classList.remove('hidden');
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Hide all messages
function hideMessages() {
    document.getElementById('successMessage').classList.add('hidden');
    document.getElementById('errorMessage').classList.add('hidden');
}

// Submit form with retry logic
async function submitFormWithRetry(data, attempts = CONFIG.RETRY_ATTEMPTS) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), CONFIG.FORM_TIMEOUT);
        
        const response = await fetch(CONFIG.API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return response;
    } catch (error) {
        if (attempts > 1 && error.name !== 'AbortError') {
            await new Promise(resolve => setTimeout(resolve, CONFIG.RETRY_DELAY));
            return submitFormWithRetry(data, attempts - 1);
        }
        throw error;
    }
}

// Form validation
function validateForm() {
    const errors = [];
    
    // Reset errors
    document.querySelectorAll('[id$="Error"]').forEach(el => el.classList.add('hidden'));
    
    // Validate required fields
    const companyName = document.getElementById('companyName');
    if (!companyName.value.trim()) {
        document.getElementById('companyNameError').classList.remove('hidden');
        errors.push('companyName');
    }
    
    const city = document.getElementById('city');
    if (!city.value.trim()) {
        document.getElementById('cityError').classList.remove('hidden');
        errors.push('city');
    }
    
    const email = document.getElementById('contactEmail');
    if (!email.value.trim() || !validateEmail(email.value)) {
        document.getElementById('emailError').classList.remove('hidden');
        errors.push('email');
    }
    
    const privacy = document.getElementById('privacy');
    if (!privacy.checked) {
        document.getElementById('privacyError').classList.remove('hidden');
        errors.push('privacy');
    }
    
    // Focus first error field
    if (errors.length > 0) {
        const firstError = errors[0];
        if (firstError === 'privacy') {
            privacy.focus();
        } else if (firstError === 'email') {
            email.focus();
        } else if (firstError === 'city') {
            city.focus();
        } else {
            companyName.focus();
        }
        return false;
    }
    
    return true;
}

// Collect form data
function collectFormData() {
    return {
        companyName: sanitizeInput(document.getElementById('companyName').value.trim()),
        city: sanitizeInput(document.getElementById('city').value.trim()),
        sector: document.getElementById('sector').value,
        website: sanitizeInput(document.getElementById('website').value.trim()),
        contactName: sanitizeInput(document.getElementById('contactName').value.trim()),
        contactEmail: sanitizeInput(document.getElementById('contactEmail').value.trim()),
        phone: sanitizeInput(document.getElementById('phone').value.trim()),
        analysisFocus: sanitizeInput(document.getElementById('analysisFocus').value.trim()),
        timestamp: new Date().toISOString(),
        source: 'landing_page'
    };
}

// Main form submission handler
async function handleFormSubmit(e) {
    e.preventDefault();
    
    hideMessages();
    
    if (!validateForm()) {
        return;
    }
    
    const submitBtn = document.getElementById('submitBtn');
    const buttonText = document.getElementById('buttonText');
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    // Show loading state
    submitBtn.disabled = true;
    buttonText.classList.add('hidden');
    loadingSpinner.classList.remove('hidden');
    loadingSpinner.classList.add('flex');
    
    try {
        const formData = collectFormData();
        
        // Submit form with retry logic
        await submitFormWithRetry(formData);
        
        // Show success message
        document.getElementById('successMessage').classList.remove('hidden');
        document.getElementById('fundraisingForm').reset();
        document.getElementById('successMessage').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
        
        // Track success (if analytics available)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                'event_category': 'engagement',
                'event_label': 'fundraising_analysis_request'
            });
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        
        // Show appropriate error message
        if (error.name === 'AbortError') {
            showError('La richiesta ha impiegato troppo tempo.');
        } else if (error.message.includes('status: 5')) {
            showError('Il servizio è temporaneamente non disponibile.');
        } else if (!navigator.onLine) {
            showError('Controlla la tua connessione internet e riprova.');
        } else {
            showError('Si è verificato un errore durante l\'invio.');
        }
        
        // Track error (if analytics available)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_error', {
                'event_category': 'errors',
                'event_label': error.message
            });
        }
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        buttonText.classList.remove('hidden');
        loadingSpinner.classList.add('hidden');
        loadingSpinner.classList.remove('flex');
    }
}

// Initialize form
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('fundraisingForm');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        
        // Remove error messages on input
        document.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('input', () => {
                const errorId = input.id + 'Error';
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.classList.add('hidden');
                }
            });
        });
        
        // Privacy checkbox change handler
        const privacyCheckbox = document.getElementById('privacy');
        if (privacyCheckbox) {
            privacyCheckbox.addEventListener('change', () => {
                document.getElementById('privacyError').classList.add('hidden');
            });
        }
        
        // Progressive enhancement: Enable form if JavaScript is available
        form.classList.remove('no-js');
    }
    
    // Add skip link for accessibility
    const skipLink = document.createElement('a');
    skipLink.href = '#fundraisingForm';
    skipLink.className = 'skip-to-main';
    skipLink.textContent = 'Vai al modulo principale';
    document.body.insertBefore(skipLink, document.body.firstChild);
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmail,
        sanitizeInput,
        validateForm,
        collectFormData
    };
}