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

    // Close burger menu if screen is resized to desktop
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            nav.classList.remove("active");
        }
    });

    // Load timetable if the dropdown exists
    loadTimetable();
});

/* 1)  Build the e‑mail only when the user clicks “Send”.
   2)  Using pieces prevents bots from scraping the full address. */
function sendEmail(e) {
    e.preventDefault();                  // stop normal form submission

    const name = document.getElementById("name").value.trim();
    const msg  = document.getElementById("msg").value.trim();

    // --- assemble address ---
    const user = "dylan1080g";           // before the @
    const host = "gmail.com";            // after the @
    const address = user + "@" + host;   // complete e‑mail

    // --- build mailto link with subject & body ---
    const subject = encodeURIComponent("Website enquiry from " + name);
    const body    = encodeURIComponent(msg);

    // open default mail client
    window.location.href = `mailto:${address}?subject=${subject}&body=${body}`;
}

const reviews = [
    `"OMG they are Beautiful" – Corporation`,
    `"These gloves are built like tanks!" – Alex T.`,
    `"Elegant, durable, and reliable." – Maria G.`,
    `"I’ve never had better wrist support." – James.`,
    `"Looks and feels premium." – Sarah L.`
];

let currentReview = 0;

function updateReview() {
    document.getElementById("review-text").textContent = reviews[currentReview];
    updateDots();
}

function nextReview() {
    currentReview = (currentReview + 1) % reviews.length;
    updateReview();
}

function prevReview() {
    currentReview = (currentReview - 1 + reviews.length) % reviews.length;
    updateReview();
}

function updateDots() {
    const dotsContainer = document.getElementById("pagination-dots");
    dotsContainer.innerHTML = "";
    reviews.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (index === currentReview) dot.classList.add("active");
        dot.onclick = () => {
            currentReview = index;
            updateReview();
        };
        dotsContainer.appendChild(dot);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    updateReview();
});
