const timetables = {
    school1: [
        { date: "20/03/2025", time: "9:00 AM", class: "Box fit" },
        { date: "22/03/2023", time: "10:00 AM", class: "Technical" },
    ],
    school2: [
        { date: "20/03/2025", time: "9:00 AM", class: "Box fit" },
        { date: "22/03/2023", time: "10:00 AM", class: "Technical" },
    ],
    school3: [
        { date: "20/03/2025", time: "9:00 AM", class: "Box fit" },
        { date: "22/03/2023", time: "10:00 AM", class: "Technical" },
    ],
    school4: [
        { date: "20/03/2025", time: "9:00 AM", class: "Box fit" },
        { date: "22/03/2023", time: "10:00 AM", class: "Technical" },
    ],
};

function loadTimetable() {
    const schoolSelect = document.getElementById("schoolSelect");
    if (!schoolSelect) return;

    const school = schoolSelect.value;
    const timetable = timetables[school] || [];
    const tbody = document.querySelector("#timetable tbody");

    if (!tbody) return;
    tbody.innerHTML = "";

    timetable.forEach(entry => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${entry.date}</td><td>${entry.time}</td><td class="available" onclick="bookClass(this)">${entry.class}</td>`;
        tbody.appendChild(row);
    });
}

function bookClass(cell) {
    if (cell.classList.contains("available")) {
        cell.classList.remove("available");
        cell.classList.add("booked");
        cell.innerHTML += " (Booked)";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Burger menu toggle
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");

    if (burger && nav) {
        burger.addEventListener("click", () => {
            nav.classList.toggle("active");
        });
    }

    // Auto-close nav menu on link click (mobile)
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                nav.classList.remove("active");
            }
        });
    });

    // Load timetable if the dropdown exists
    loadTimetable();
});
