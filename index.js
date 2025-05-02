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



function switchImage(imgElement) {
    const mainImage = document.getElementById("main-image");
    mainImage.src = imgElement.src;
}

function switchImageByFile(filename) {
    const mainImage = document.getElementById("main-image");
    mainImage.src = filename;
}

function changeQuantity(change) {
    const quantityElement = document.getElementById("quantity");
    let current = parseInt(quantityElement.textContent);
    current += change;
    if (current < 1) current = 1;
    quantityElement.textContent = current;
}

// Load existing cart or initialize new one
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// DOM elements
const cartCount = document.getElementById("cart-count");
const cartDropdown = document.getElementById("cart-dropdown");
const cartItemsList = document.getElementById("cart-items");
const cartTotalDisplay = document.getElementById("cart-total");

// Save cart to localStorage
function saveCartToStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Update cart UI and storage
function updateCartDisplay() {
    cartItemsList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} (${item.weight}) - £${item.price.toFixed(2)}`;

        // Optional: add remove button per item
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("ml-2", "text-red-500");
        removeBtn.addEventListener("click", () => {
            cart.splice(index, 1);
            updateCartDisplay();
        });

        li.appendChild(removeBtn);
        cartItemsList.appendChild(li);
        total += item.price;
    });

    cartTotalDisplay.textContent = `Total: £${total.toFixed(2)}`;
    cartCount.textContent = cart.length;

    saveCartToStorage();
}

// Toggle cart dropdown visibility
function toggleCart() {
    cartDropdown.classList.toggle("hidden");
}

// Clear the entire cart
function clearCart() {
    cart.length = 0;
    updateCartDisplay();
    localStorage.removeItem("cart");
}

// Initialize cart on DOM load
document.addEventListener("DOMContentLoaded", () => {
    updateCartDisplay();

    // Attach event listeners to "Add to cart" buttons
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

    // Attach toggleCart to cart icon if needed
    const cartIcon = document.getElementById("cart-icon");
    if (cartIcon) {
        cartIcon.addEventListener("click", toggleCart);
    }

    // Attach clearCart to clear button if present
    const clearBtn = document.getElementById("clear-cart");
    if (clearBtn) {
        clearBtn.addEventListener("click", clearCart);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    let cart = [];
    const cartItemsContainer = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");
    const clearCartBtn = document.getElementById("clear-cart");

    // Add to cart logic
    document.querySelector(".add-to-cart").addEventListener("click", () => {
        const productCard = document.querySelector(".product-card");
        const name = productCard.getAttribute("data-name");
        const price = parseFloat(productCard.getAttribute("data-price"));
        const selectedWeight = productCard.querySelector(".weight-btn.selected");
        const quantity = parseInt(document.getElementById("quantity").textContent);

        if (!selectedWeight) {
            alert("Please select a weight.");
            return;
        }

        const weight = selectedWeight.textContent;

        const item = {
            name,
            weight,
            quantity,
            price,
        };

        cart.push(item);
        updateCartDisplay();
    });

    // Select weight
    document.querySelectorAll(".weight-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".weight-btn").forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
        });
    });

    // Quantity
    window.changeQuantity = function (delta) {
        const quantityEl = document.getElementById("quantity");
        let qty = parseInt(quantityEl.textContent);
        qty = Math.max(1, qty + delta);
        quantityEl.textContent = qty;
    };

    // Cart display
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = "";
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.quantity} × ${item.name} (${item.weight}) - £${(item.quantity * item.price).toFixed(2)}`;
            cartItemsContainer.appendChild(li);
            total += item.quantity * item.price;
        });
        cartCount.textContent = cart.length;
        cartTotal.textContent = `Total: £${total.toFixed(2)}`;
    }

    // Clear cart
    clearCartBtn.addEventListener("click", () => {
        cart = [];
        updateCartDisplay();
    });

    // Cart dropdown toggle
    window.toggleCart = function () {
        const dropdown = document.getElementById("cart-dropdown");
        dropdown.classList.toggle("hidden");
    };
});
