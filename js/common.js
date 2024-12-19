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

// Elective Course Selection
function selectElective(element) {
    // Remove selection from other courses
    document.querySelectorAll('.elective-course').forEach(course => {
        course.classList.remove('selected');
    });
    
    // Select the clicked course
    element.classList.add('selected');
    
    // Check the radio button
    element.querySelector('input[type="radio"]').checked = true;
}

function confirmElective() {
    const selectedCourse = document.querySelector('.elective-course.selected');
    if (!selectedCourse) {
        alert('Please select an elective course');
        return;
    }

    // Get course details
    const courseTitle = selectedCourse.querySelector('h6').textContent;
    const [courseCode, courseName] = courseTitle.split(' - ');
    const credits = selectedCourse.querySelector('.badge.bg-primary').textContent;
    const courseType = selectedCourse.querySelector('.badge:not(.bg-primary)').textContent;

    // Update the elective slot with selected course
    const activeSlot = document.querySelector('.elective-slot[data-active="true"]');
    if (activeSlot) {
        activeSlot.querySelector('.course-code').textContent = courseCode;
        activeSlot.querySelector('.course-name').textContent = courseName;
        activeSlot.querySelector('.course-credits').textContent = credits;
        activeSlot.querySelector('.course-status').textContent = 'Planned';
        activeSlot.classList.remove('elective-slot');
        activeSlot.removeAttribute('data-bs-toggle');
        activeSlot.removeAttribute('data-bs-target');
        activeSlot.removeAttribute('data-active');
    }

    // Close the modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('electiveModal'));
    modal.hide();
}

// Filter elective courses
document.querySelectorAll('.elective-filters button').forEach(button => {
    button.addEventListener('click', function() {
        // Update active state
        document.querySelectorAll('.elective-filters button').forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');

        // Filter courses
        const filter = this.dataset.filter;
        document.querySelectorAll('.elective-course').forEach(course => {
            if (filter === 'all' || course.classList.contains(filter)) {
                course.style.display = 'block';
            } else {
                course.style.display = 'none';
            }
        });
    });
});

// Set active elective slot when modal is opened
document.getElementById('electiveModal').addEventListener('show.bs.modal', function(event) {
    const button = event.relatedTarget;
    // Mark the clicked slot as active
    document.querySelectorAll('.elective-slot').forEach(slot => {
        slot.removeAttribute('data-active');
    });
    button.setAttribute('data-active', 'true');
}); 