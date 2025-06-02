// ========== Global Variables and Initial State ==========
const cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentReview = 0;

// ========== Utility Functions ==========
function saveCartToStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

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

// ========== Cart Logic ==========
function updateCartDisplay() {
    const cartItemsList = document.getElementById("cart-items");
    const cartTotalDisplay = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");
    const pay = document.getElementById("pay"); // <-- always get fresh reference

    cartItemsList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.quantity || 1} × ${item.name} (${item.weight}) - £${(item.price * (item.quantity || 1)).toFixed(2)}`;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("ml-2", "text-red-500");
        removeBtn.addEventListener("click", () => {
            cart.splice(index, 1);
            updateCartDisplay();
        });

        li.appendChild(removeBtn);
        cartItemsList.appendChild(li);
        total += item.price * (item.quantity || 1);
    });

    cartTotalDisplay.textContent = `Total: £${total.toFixed(2)}`;
    cartCount.textContent = cart.length;

    if (pay) {
        if (total > 0) {
            pay.removeAttribute("hidden");
        } else {
            pay.setAttribute("hidden", "");
        }
    }

    saveCartToStorage();
}


function toggleCart() {
    const cartDropdown = document.getElementById("cart-dropdown");
    cartDropdown?.classList.toggle("hidden");
}

function clearCart() {
    cart.length = 0;
    updateCartDisplay();
    localStorage.removeItem("cart");
}

function handleAddToCart(button) {
    const card = button.closest(".product-card");
    const name = card.getAttribute("data-name");
    const price = parseFloat(card.getAttribute("data-price"));

    const selectedWeightBtn = card.querySelector(".weight-btn.selected");
    if (!selectedWeightBtn) {
        alert("Please select a glove weight before adding to cart.");
        return;
    }

    const weight = selectedWeightBtn.textContent;
    const quantity = parseInt(card.querySelector("#quantity")?.textContent || "1");

    cart.push({ name, price, weight, quantity });
    updateCartDisplay();
}

// ========== Navigation (Burger Menu) ==========
document.addEventListener("DOMContentLoaded", () => {

    const pay = document.getElementById("pay");

    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    if (pay) pay.setAttribute("hidden", "");

    burger?.addEventListener("click", () => {
        nav?.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                nav?.classList.remove("active");
            }
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            nav?.classList.remove("active");
        }
    });

    // === Cart & Glove UI Setup ===
    updateCartDisplay();

    document.querySelectorAll(".weight-buttons .weight-btn").forEach(button => {
        button.addEventListener("click", () => {
            const group = button.closest(".weight-buttons");
            group.querySelectorAll(".weight-btn").forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
        });
    });

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => handleAddToCart(button));
    });

    document.getElementById("clear-cart")?.addEventListener("click", clearCart);
    document.getElementById("cart-icon")?.addEventListener("click", toggleCart);

    document.addEventListener("click", (event) => {
        const cartDropdown = document.getElementById("cart-dropdown");
        const cartIcon = document.querySelector(".cart-icon");

        if (!cartDropdown || !cartIcon) return;

        const clickedInsideCart = cartDropdown.contains(event.target);
        const clickedCartIcon = cartIcon.contains(event.target);

        const isRemoveOrClearButton = event.target.closest(".text-red-500") || event.target.id === "clear-cart";

        if (clickedInsideCart || clickedCartIcon || isRemoveOrClearButton) {
            // Don't close the cart
            return;
        }

        cartDropdown.classList.add("hidden");
    });


});

// ========== Email Handler ==========
function sendEmail(e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const msg = document.getElementById("msg").value.trim();
    const user = "dylan1080g";
    const host = "gmail.com";
    const address = user + "@" + host;
    const subject = encodeURIComponent("Website enquiry from " + name);
    const body = encodeURIComponent(msg);
    window.location.href = `mailto:${address}?subject=${subject}&body=${body}`;
}

// ========== Reviews Carousel ==========
const reviews = [
    `"OMG they are Beautiful" – Corporation`,
    `"These gloves are built like tanks!" – Alex T.`,
    `"Elegant, durable, and reliable." – Maria G.`,
    `"I’ve never had better wrist support." – James.`,
    `"Looks and feels premium." – Sarah L.`
];

function updateReview() {
    const reviewText = document.getElementById("review-text");
    if (reviewText) {
        reviewText.textContent = reviews[currentReview];
        updateDots();
    }
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
    if (!dotsContainer) return;
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

document.addEventListener("DOMContentLoaded", updateReview);

// ========== Timetable Loader ==========
function loadTimetable() {
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
        ]
    };

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

document.addEventListener("DOMContentLoaded", loadTimetable);
