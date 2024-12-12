// Initialize Chart.js
let gpaChart;

// Course data structure
const coursesData = {
    'Diploma': [
        { code: 'MATH1110', name: 'Mathematics I', credits: 3, passMark: 50 },
        { code: 'COMP1100', name: 'Introduction to IT', credits: 3, passMark: 50 },
        { code: 'ENGL1100', name: 'Technical Writing I', credits: 3, passMark: 50 },
        // Add more Diploma courses
    ],
    'Advanced Diploma': [
        { code: 'MATH2110', name: 'Mathematics III', credits: 3, passMark: 50 },
        { code: 'COMP2100', name: 'Database Systems', credits: 4, passMark: 50 },
        { code: 'PROG2100', name: 'Advanced Programming', credits: 3, passMark: 50 },
        // Add more Advanced Diploma courses
    ],
    'B.Tech': [
        { code: 'TECH3110', name: 'Project Management', credits: 3, passMark: 50 },
        { code: 'COMP3100', name: 'Software Engineering', credits: 4, passMark: 50 },
        { code: 'NETW3100', name: 'Network Security', credits: 3, passMark: 50 },
        // Add more B.Tech courses
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    initializeChart();
    loadSavedData();
});

function initializeChart() {
    const ctx = document.getElementById('gpaChart').getContext('2d');
    gpaChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Previous', 'Current', 'Simulated'],
            datasets: [{
                label: 'GPA Trend',
                data: [3.5, 3.7, 0],
                borderColor: '#f68921',
                tension: 0.4,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    min: 0,
                    max: 4,
                    ticks: {
                        stepSize: 0.5
                    }
                }
            }
        }
    });
}

function calculateGPA() {
    const courseCards = document.querySelectorAll('.course-card');
    let totalPoints = 0;
    let totalCredits = 0;
    
    courseCards.forEach(card => {
        const credits = parseFloat(card.querySelector('.credit-select').value || 0);
        const gradeValue = parseFloat(card.querySelector('.grade-select').value || 0);
        
        if (!isNaN(credits) && !isNaN(gradeValue)) {
            totalPoints += gradeValue * credits;
            totalCredits += credits;
        }
    });

    const semesterGPA = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
    updateResults(semesterGPA);
}

function convertMarksToGradePoints(marks) {
    if (marks >= 90) return 4.0;
    if (marks >= 85) return 3.7;
    if (marks >= 80) return 3.3;
    if (marks >= 75) return 3.0;
    if (marks >= 70) return 2.7;
    if (marks >= 65) return 2.3;
    if (marks >= 60) return 2.0;
    if (marks >= 55) return 1.7;
    if (marks >= 50) return 1.3;
    return 0.0;
}

function updateResults(semesterGPA) {
    document.getElementById('semesterGPA').textContent = semesterGPA;
    
    // Update chart
    gpaChart.data.datasets[0].data[2] = parseFloat(semesterGPA);
    gpaChart.update();
}

function saveSimulation() {
    const inputs = document.querySelectorAll('.marks-input');
    const simulationData = Array.from(inputs).map(input => ({
        courseCode: input.closest('tr').cells[0].textContent,
        marks: input.value
    }));
    
    localStorage.setItem('gpaSimulation', JSON.stringify(simulationData));
    showToast('Simulation saved successfully!');
}

function loadSavedData() {
    const savedData = localStorage.getItem('gpaSimulation');
    if (savedData) {
        const simulationData = JSON.parse(savedData);
        const inputs = document.querySelectorAll('.marks-input');
        
        inputs.forEach((input, index) => {
            if (simulationData[index]) {
                input.value = simulationData[index].marks;
            }
        });
        
        calculateGPA();
    }
}

function resetForm() {
    // Remove all courses
    const courseList = document.getElementById('courseList');
    courseList.innerHTML = '';
    
    // Hide header with buttons
    document.getElementById('courseHeader').style.display = 'none !important';
    // Show empty state
    document.getElementById('emptyState').style.display = 'flex';
    
    // Clear local storage
    localStorage.removeItem('gpaSimulation');
    showToast('Form reset successfully!');
}

function showToast(message) {
    const toastContainer = document.querySelector('.toast-container') || 
                          createToastContainer();
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = message;
    
    toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function createToastContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
}

function addCourse() {
    const courseList = document.getElementById('courseList');
    const courseCard = document.createElement('div');
    courseCard.className = 'course-card';
    courseCard.innerHTML = `
        <div class="course-header">
            <div class="course-selectors">
                <select class="form-select form-select-sm level-select mb-2" onchange="updateCourseOptions(this)">
                    <option value="">Select Level</option>
                    ${Object.keys(coursesData).map(level => 
                        `<option value="${level}">${level}</option>`
                    ).join('')}
                </select>
                <select class="form-select form-select-sm course-select" onchange="updateCourseDetails(this)" disabled>
                    <option value="">Select Course</option>
                </select>
            </div>
            <button class="btn btn-link text-danger btn-sm" onclick="removeCourse(this)">
                <i class="bi bi-x-lg"></i>
            </button>
        </div>
        <div class="course-info mt-2" style="display: none;">
            <div class="d-flex justify-content-between mb-2">
                <span class="credit-badge"></span>
                <span class="passing-mark"></span>
            </div>
            <div class="grade-input">
                <select class="form-select grade-select" onchange="calculateGPA()">
                    <option value="">Select Grade</option>
                    <option value="4.0">A (90-100)</option>
                    <option value="3.7">A- (85-89)</option>
                    <option value="3.3">B+ (80-84)</option>
                    <option value="3.0">B (75-79)</option>
                    <option value="2.7">B- (70-74)</option>
                    <option value="2.3">C+ (65-69)</option>
                    <option value="2.0">C (60-64)</option>
                    <option value="1.7">C- (55-59)</option>
                    <option value="1.3">D (50-54)</option>
                    <option value="0.0">F (0-49)</option>
                </select>
            </div>
        </div>
    `;
    courseList.appendChild(courseCard);
    
    // Show or hide empty state message
    toggleEmptyState();
}

function toggleEmptyState() {
    const courseList = document.getElementById('courseList');
    const emptyState = document.getElementById('emptyState');
    const courseHeader = document.getElementById('courseHeader');
    
    if (courseList.children.length === 0) {
        emptyState.style.display = 'flex';
        courseHeader.style.display = 'none !important';
    } else {
        emptyState.style.display = 'none';
        courseHeader.style.display = 'flex !important';
    }
}

function updateCourseOptions(levelSelect) {
    const courseSelect = levelSelect.closest('.course-card').querySelector('.course-select');
    const level = levelSelect.value;
    
    courseSelect.innerHTML = '<option value="">Select Course</option>';
    courseSelect.disabled = !level;
    
    if (level) {
        coursesData[level].forEach(course => {
            courseSelect.innerHTML += `
                <option value="${course.code}">${course.code} - ${course.name}</option>
            `;
        });
    }
}

function updateCourseDetails(courseSelect) {
    const card = courseSelect.closest('.course-card');
    const courseInfo = card.querySelector('.course-info');
    const level = card.querySelector('.level-select').value;
    const courseCode = courseSelect.value;
    
    if (courseCode) {
        const course = coursesData[level].find(c => c.code === courseCode);
        card.querySelector('.credit-badge').textContent = `${course.credits} Credits`;
        card.querySelector('.passing-mark').textContent = `Pass: ${course.passMark}%`;
        courseInfo.style.display = 'block';
        calculateGPA();
    } else {
        courseInfo.style.display = 'none';
    }
}

function removeCourse(button) {
    const card = button.closest('.course-card');
    card.classList.add('fade-out');
    setTimeout(() => {
        card.remove();
        calculateGPA();
    }, 300);
}

function addFirstCourse() {
    // Show the header with buttons
    document.getElementById('courseHeader').style.display = 'flex !important';
    // Hide empty state
    document.getElementById('emptyState').style.display = 'none';
    // Add the first course
    addCourse();
} 