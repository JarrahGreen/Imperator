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

const cart = [];
const cartCount = document.getElementById("cart-count");
const cartDropdown = document.getElementById("cart-dropdown");
const cartItemsList = document.getElementById("cart-items");
const cartTotalDisplay = document.getElementById("cart-total");

function updateCartDisplay() {
    cartItemsList.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} (${item.weight}) - £${item.price.toFixed(2)}`;
        cartItemsList.appendChild(li);
        total += item.price;
    });

    cartTotalDisplay.textContent = `Total: £${total.toFixed(2)}`;
    cartCount.textContent = cart.length;
}

function toggleCart() {
    cartDropdown.classList.toggle("hidden");
}

// Make buttons functional
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const card = button.closest(".product-card");
            const name = card.dataset.name;
            const price = parseFloat(card.dataset.price);
            const weightSelect = card.querySelector(".product-weight");
            const weight = weightSelect ? weightSelect.value : "N/A";

            cart.push({ name, price, weight });
            updateCartDisplay();
        });
    });
});

function updateCartDisplay() {
    cartItemsList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
      ${item.name} (${item.weight}) - £${item.price.toFixed(2)}
      <button class="remove-item" data-index="${index}">Remove</button>
    `;
        cartItemsList.appendChild(li);
        total += item.price;
    });

    cartTotalDisplay.textContent = `Total: £${total.toFixed(2)}`;
    cartCount.textContent = cart.length;

    // Add event listeners for remove buttons
    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", (e) => {
            const index = parseInt(button.dataset.index);
            cart.splice(index, 1);
            updateCartDisplay();
        });
    });
}
