// Text size adjustment
let currentSize = 16;
function adjustTextSize(change) {
    currentSize = Math.min(Math.max(currentSize + change, 12), 24);
    document.body.style.fontSize = currentSize + 'px';
    // Save preference
    localStorage.setItem('preferredTextSize', currentSize);
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
    
    // Save preference
    localStorage.setItem('highContrast', body.classList.contains('high-contrast'));
}

// Load saved preferences
document.addEventListener('DOMContentLoaded', function() {
    // Load text size
    const savedSize = localStorage.getItem('preferredTextSize');
    if (savedSize) {
        currentSize = parseInt(savedSize);
        document.body.style.fontSize = currentSize + 'px';
    }
    
    // Load contrast mode
    const savedContrast = localStorage.getItem('highContrast');
    if (savedContrast === 'true') {
        document.body.classList.add('high-contrast');
        const icon = document.querySelector('#contrastToggle i');
        if (icon) {
            icon.classList.remove('bi-sun-fill');
            icon.classList.add('bi-moon-fill');
        }
    }
});

// Add toast notification system
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} show`;
    toast.innerHTML = `
        <div class="toast-header">
            <i class="bi bi-info-circle me-2"></i>
            <strong class="me-auto">Notification</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body">${message}</div>
    `;
    
    document.querySelector('.toast-container').appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
} 