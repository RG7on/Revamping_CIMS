document.addEventListener('DOMContentLoaded', function() {
    initializeTimetable();
    
    // Handle section selection
    document.querySelectorAll('.section-select').forEach(select => {
        select.addEventListener('change', function() {
            const courseRow = this.closest('.course-row');
            const courseCode = courseRow.dataset.courseCode;
            updateSectionDetails(courseCode, this.value);
            updateTimetable();
        });
    });
});

function initializeTimetable() {
    // Initialize empty timetable grid
    const daySlots = document.querySelectorAll('.day-slots');
    daySlots.forEach(daySlot => {
        for (let i = 0; i < 12; i++) {
            const slot = document.createElement('div');
            slot.classList.add('time-slot-cell');
            daySlot.appendChild(slot);
        }
    });
}

function updateSectionDetails(courseCode, sectionNo) {
    // Fetch and display section details
    // This would typically involve an API call
    
    // Example static data
    const sectionDetails = [
        { day: 'Sunday', time: '10:00 - 11:20', location: 'A201', instructor: 'Dr. Smith' },
        { day: 'Tuesday', time: '10:00 - 11:20', location: 'A201', instructor: 'Dr. Smith' }
    ];
    
    // Update sections table
    const sectionTable = document.querySelector('.section-table tbody');
    sectionTable.innerHTML = sectionDetails.map((section, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${section.day}</td>
            <td>${section.time}</td>
            <td>${section.location}</td>
            <td>${section.instructor}</td>
        </tr>
    `).join('');
}

function updateTimetable() {
    // Clear existing slots
    document.querySelectorAll('.course-slot').forEach(slot => slot.remove());
    
    // Add selected courses to timetable
    // This would use the selected sections data to populate the timetable
    // and check for clashes
} 