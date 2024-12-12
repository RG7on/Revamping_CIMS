// Realistic timetable data structure
const timetableData = {
    schedule: [
        {
            code: 'MATH1110',
            name: 'Mathematics I',
            type: 'lecture',
            day: 'Monday',
            startTime: '08:30',
            endTime: '10:20',
            location: 'Room A201',
            instructor: 'Dr. Sarah Smith',
            color: '#e3f2fd'
        },
        {
            code: 'COMP1100',
            name: 'Introduction to IT',
            type: 'lecture',
            day: 'Monday',
            startTime: '10:30',
            endTime: '12:20',
            location: 'Room B102',
            instructor: 'Prof. James Wilson',
            color: '#fff3e0'
        },
        {
            code: 'COMP1100',
            name: 'Introduction to IT',
            type: 'lab',
            day: 'Tuesday',
            startTime: '13:30',
            endTime: '15:20',
            location: 'Lab 305',
            instructor: 'Mr. David Chen',
            color: '#fff3e0'
        },
        {
            code: 'ENGL1100',
            name: 'Technical Writing I',
            type: 'lecture',
            day: 'Wednesday',
            startTime: '09:30',
            endTime: '11:20',
            location: 'Room C103',
            instructor: 'Dr. Smith',
            color: '#e3f2fd'
        }
    ],
    settings: {
        startHour: 8, // 8 AM
        endHour: 18,  // 6 PM
        daysOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']
    }
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeTimeGrid();
    loadSchedule();
    setupViewControls();
});

function initializeTimeGrid() {
    const timeSlots = document.querySelector('.time-slots');
    const scheduleGrid = document.querySelector('.schedule-grid');
    
    // Generate time slots
    for (let hour = timetableData.settings.startHour; hour <= timetableData.settings.endHour; hour++) {
        const timeSlot = document.createElement('div');
        timeSlot.className = 'time-slot';
        timeSlot.textContent = formatTime(hour);
        timeSlots.appendChild(timeSlot);
    }
}

function loadSchedule() {
    const scheduleGrid = document.querySelector('.schedule-grid');
    scheduleGrid.innerHTML = '';
    
    timetableData.schedule.forEach(class => {
        const classBlock = createClassBlock(class);
        scheduleGrid.appendChild(classBlock);
    });
}

function createClassBlock(classInfo) {
    const block = document.createElement('div');
    block.className = `class-block ${classInfo.type}`;
    
    // Calculate position and height
    const dayIndex = timetableData.settings.daysOfWeek.indexOf(classInfo.day);
    const startMinutes = timeToMinutes(classInfo.startTime);
    const endMinutes = timeToMinutes(classInfo.endTime);
    const duration = endMinutes - startMinutes;
    
    // Position the block
    block.style.left = `${(dayIndex * 20)}%`;
    block.style.top = `${startMinutes}px`;
    block.style.height = `${duration}px`;
    
    block.innerHTML = `
        <div class="class-title">${classInfo.code}</div>
        <div class="class-details">
            <small>${classInfo.location}</small>
        </div>
    `;
    
    // Add click handler for details modal
    block.onclick = () => showClassDetails(classInfo);
    
    return block;
}

function showClassDetails(classInfo) {
    const modal = new bootstrap.Modal(document.getElementById('courseDetailsModal'));
    const modalBody = document.querySelector('#courseDetailsModal .modal-body');
    
    modalBody.innerHTML = `
        <h5>${classInfo.code} - ${classInfo.name}</h5>
        <div class="class-detail-row">
            <i class="bi bi-clock"></i>
            <span>${classInfo.startTime} - ${classInfo.endTime}</span>
        </div>
        <div class="class-detail-row">
            <i class="bi bi-geo-alt"></i>
            <span>${classInfo.location}</span>
        </div>
        <div class="class-detail-row">
            <i class="bi bi-person"></i>
            <span>${classInfo.instructor}</span>
        </div>
    `;
    
    modal.show();
}

// Utility functions
function timeToMinutes(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    return (hours - timetableData.settings.startHour) * 60 + minutes;
}

function formatTime(hour) {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:00 ${period}`;
}

// Export functions
function printTimetable() {
    window.print();
}

function exportPDF() {
    // Implementation for PDF export
    // Could use libraries like jsPDF
}

function syncCalendar() {
    // Implementation for calendar sync
    // Could use Google Calendar API
} 