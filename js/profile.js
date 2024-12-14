document.addEventListener('DOMContentLoaded', function() {
    // Profile Navigation
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.profile-section');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.dataset.section;
            
            // Update active states
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show target section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
        });
    });

    // High Contrast Mode Toggle
    const highContrastToggle = document.getElementById('highContrastMode');
    if (highContrastToggle) {
        highContrastToggle.checked = document.body.classList.contains('high-contrast');
        highContrastToggle.addEventListener('change', () => {
            document.body.classList.toggle('high-contrast');
            // Save preference to localStorage
            localStorage.setItem('highContrast', highContrastToggle.checked);
        });
    }

    // Text Size Preference
    const textSizeSelect = document.querySelector('select[name="textSize"]');
    if (textSizeSelect) {
        textSizeSelect.addEventListener('change', (e) => {
            const size = e.target.value;
            document.documentElement.style.fontSize = {
                'small': '14px',
                'medium': '16px',
                'large': '18px'
            }[size];
            // Save preference to localStorage
            localStorage.setItem('textSize', size);
        });
    }
});

// Profile Photo Upload
function triggerPhotoUpload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.querySelector('.profile-image').src = e.target.result;
                // Here you would typically upload the file to your server
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

// Password Change Modal
function changePassword() {
    // Implement password change modal logic
    alert('Password change functionality to be implemented');
}

// Save Preferences
function savePreferences() {
    // Implement saving preferences to backend
    const preferences = {
        language: document.querySelector('select[name="language"]').value,
        dateFormat: document.querySelector('select[name="dateFormat"]').value,
        highContrast: document.getElementById('highContrastMode').checked,
        textSize: document.querySelector('select[name="textSize"]').value,
        notifications: {
            email: document.getElementById('emailNotifications').checked,
            sms: document.getElementById('smsNotifications').checked,
            grades: document.getElementById('gradeNotifications').checked,
            attendance: document.getElementById('attendanceNotifications').checked,
            announcements: document.getElementById('announcementNotifications').checked
        }
    };

    // Here you would typically send this to your backend
    console.log('Saving preferences:', preferences);
} 