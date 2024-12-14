// Language switcher functionality
function switchLanguage(lang) {
    document.querySelectorAll('.language-switcher .btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const clickedBtn = document.querySelector(`.language-switcher .btn[onclick*="${lang}"]`);
    clickedBtn.classList.add('active');
    
    document.documentElement.lang = lang;
    document.body.style.direction = lang === 'ar' ? 'rtl' : 'ltr';
}

// Initialize tooltips
document.addEventListener('DOMContentLoaded', function() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Handle sidebar toggle for mobile
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('show');
} 

// Add this to your dashboard.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GPA circles
    const gpaCircles = document.querySelectorAll('.gpa-circle');
    gpaCircles.forEach(circle => {
        const value = parseFloat(circle.dataset.value);
        const progress = (value / 4) * 100; // Assuming max GPA is 4.0
        circle.querySelector('.circle-progress').style.setProperty('--progress', progress);
    });
}); 

// Toggle password visibility
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function() {
        const input = this.parentElement.querySelector('input');
        const icon = this.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('bi-eye');
            icon.classList.add('bi-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('bi-eye-slash');
            icon.classList.add('bi-eye');
        }
    });
});

// Initialize attendance pie charts
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.pie-wrapper').forEach(wrapper => {
        const absencePercentage = wrapper.dataset.absence;
        const pieProgress = wrapper.querySelector('.pie-progress');
        pieProgress.style.setProperty('--absence', absencePercentage);
        
        // Set color based on absence percentage
        if (absencePercentage >= 15) {
            pieProgress.classList.add('critical');
        } else if (absencePercentage >= 10) {
            pieProgress.classList.add('warning');
        }
    });
});

// Available actions catalog
const actionsCatalog = [
    // Academic Services
    { id: 'course-advising', icon: 'bi-person-video3', title: 'Course Advising', category: 'academic' },
    { id: 'course-registration', icon: 'bi-journal-plus', title: 'Course Registration', category: 'academic' },
    { id: 'grades-transcripts', icon: 'bi-card-checklist', title: 'Grades & Transcripts', category: 'academic' },
    { id: 'attendance-records', icon: 'bi-calendar-check', title: 'Attendance Records', category: 'academic' },
    { id: 'gpa-simulator', icon: 'bi-calculator', title: 'GPA Simulator', category: 'academic' },
    { id: 'timetable', icon: 'bi-table', title: 'Timetable', category: 'academic' },
    { id: 'academic-calendar', icon: 'bi-calendar4-week', title: 'Academic Calendar', category: 'academic' },
    
    // Administrative Services
    { id: 'postponement', icon: 'bi-calendar-x', title: 'Postponement Request', category: 'administrative' },
    { id: 'grievances', icon: 'bi-exclamation-circle', title: 'Grievances', category: 'administrative' },
    { id: 'department-change', icon: 'bi-arrow-left-right', title: 'Department Change', category: 'administrative' },
    { id: 'appeal-marks', icon: 'bi-pencil-square', title: 'Appeal Marks', category: 'administrative' },
    { id: 'clearance', icon: 'bi-check2-circle', title: 'Student Clearance', category: 'administrative' },
    { id: 'allowance', icon: 'bi-wallet2', title: 'Student Allowance', category: 'administrative' },
    { id: 'payment-history', icon: 'bi-receipt', title: 'Payment History', category: 'administrative' }
];

// Get user's quick actions from localStorage or use defaults
let userQuickActions = JSON.parse(localStorage.getItem('userQuickActions')) || [
    'course-registration', 'timetable', 'attendance-records', 
    'grades-transcripts', 'gpa-simulator', 'academic-calendar'
];

// Initialize quick actions
function initializeQuickActions() {
    renderQuickActions();
    initializeModal();
}

// Render quick actions grid
function renderQuickActions() {
    const grid = document.getElementById('quickActionsGrid');
    grid.innerHTML = userQuickActions.map(id => {
        const action = actionsCatalog.find(a => a.id === id);
        return `
            <a href="#" class="action-card">
                <i class="bi ${action.icon}"></i>
                <span>${action.title}</span>
            </a>
        `;
    }).join('');
}

// Initialize modal content
function initializeModal() {
    const availableActions = document.getElementById('availableActions');
    const selectedActions = document.getElementById('selectedActions');
    
    // Render available actions
    availableActions.innerHTML = actionsCatalog
        .filter(action => !userQuickActions.includes(action.id))
        .map(action => createActionItem(action, false))
        .join('');
        
    // Render selected actions
    selectedActions.innerHTML = userQuickActions
        .map(id => actionsCatalog.find(a => a.id === id))
        .map(action => createActionItem(action, true))
        .join('');
        
    // Initialize drag and drop
    initializeDragAndDrop();
}

// Create action item HTML
function createActionItem(action, isSelected) {
    return `
        <div class="action-item" draggable="true" data-id="${action.id}">
            <i class="bi ${action.icon}"></i>
            <span>${action.title}</span>
            <i class="bi bi-grip-vertical action-move"></i>
        </div>
    `;
}

// Open quick actions editor
function openQuickActionsEditor() {
    const modal = new bootstrap.Modal(document.getElementById('quickActionsModal'));
    modal.show();
    initializeModal();
}

// Save quick actions
function saveQuickActions() {
    const selectedItems = document.querySelectorAll('#selectedActions .action-item');
    userQuickActions = Array.from(selectedItems).map(item => item.dataset.id);
    localStorage.setItem('userQuickActions', JSON.stringify(userQuickActions));
    renderQuickActions();
    bootstrap.Modal.getInstance(document.getElementById('quickActionsModal')).hide();
}

// Initialize drag and drop functionality
function initializeDragAndDrop() {
    const items = document.querySelectorAll('.action-item');
    const containers = document.querySelectorAll('.available-actions, .selected-actions');
    
    items.forEach(item => {
        item.addEventListener('dragstart', () => item.classList.add('dragging'));
        item.addEventListener('dragend', () => item.classList.remove('dragging'));
    });
    
    containers.forEach(container => {
        container.addEventListener('dragover', e => {
            e.preventDefault();
            const draggable = document.querySelector('.dragging');
            container.appendChild(draggable);
        });
    });
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', initializeQuickActions);

// Update greeting based on time of day
document.addEventListener('DOMContentLoaded', function() {
    const hour = new Date().getHours();
    const greetingElement = document.querySelector('.greeting');
    
    let greeting = 'Good morning';
    if (hour >= 12 && hour < 17) {
        greeting = 'Good afternoon';
    } else if (hour >= 17) {
        greeting = 'Good evening';
    }
    
    greetingElement.textContent = greeting;
});

function markAllAsRead() {
    const unreadNotifications = document.querySelectorAll('.notification-item.unread');
    unreadNotifications.forEach(notification => {
        notification.classList.remove('unread');
    });
    
    // Update notification badge
    const badge = document.querySelector('.notification-badge');
    badge.style.display = 'none';
    
    // Prevent dropdown from closing
    event.stopPropagation();
}

// Initialize tooltips and handle notification clicks
document.addEventListener('DOMContentLoaded', function() {
    // Add click handler for individual notifications
    document.querySelectorAll('.notification-item').forEach(item => {
        item.addEventListener('click', function() {
            this.classList.remove('unread');
            // Here you can add logic to handle notification clicks
            // For example, navigate to relevant page or show more details
        });
    });
});

