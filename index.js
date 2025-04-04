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
    if (!schoolSelect) return; // exit if dropdown doesn't exist

    const school = schoolSelect.value;
    const timetable = timetables[school] || [];
    const tbody = document.querySelector("#timetable tbody");

    tbody.innerHTML = ""; // Clear existing rows

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
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");

    if (burger && nav) {
        burger.addEventListener("click", () => {
            nav.classList.toggle("active");
        });
    }
});

window.onload = loadTimetable;