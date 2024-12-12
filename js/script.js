// Text size adjustment
let currentSize = 16;
function adjustTextSize(change) {
    currentSize = Math.min(Math.max(currentSize + change, 12), 24);
    document.body.style.fontSize = currentSize + 'px';
}

// High contrast mode
function toggleHighContrast() {
    const body = document.body;
    const icon = document.querySelector('#contrastToggle i');
    
    body.classList.toggle('high-contrast');
    
    // Toggle icon between sun and moon
    if (body.classList.contains('high-contrast')) {
        icon.classList.remove('bi-sun-fill');
        icon.classList.add('bi-moon-fill');
    } else {
        icon.classList.remove('bi-moon-fill');
        icon.classList.add('bi-sun-fill');
    }
}

// Add this function to the existing script.js
function switchLanguage(lang) {
    // Update buttons active state
    document.querySelectorAll('.language-switcher .btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.currentTarget.classList.add('active');

    // Set language and direction
    document.documentElement.lang = lang;
    document.body.style.direction = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Here you can add more language-specific adjustments
}
