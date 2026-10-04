function main() {
  // ---------- 1. Grab elements ----------
  const grid = document.getElementById("destinationGrid");
  const searchBox = document.getElementById("searchBox");
  const stateFilters = document.getElementById("stateFilters");
  const categoryFilters = document.getElementById("categoryFilters");
  const resultCount = document.getElementById("resultCount");
  const emptyMsg = document.getElementById("emptyMsg");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const themeBtn = document.getElementById("themeBtn");
  const wishCount = document.getElementById("wishCount");
  const slides = document.querySelectorAll(".slide");

  const modal = document.getElementById("modal");
  const modalClose = document.getElementById("modalClose");
  const modalSave = document.getElementById("modalSave");
  const modalBook = document.getElementById("modalBook");

  const monthSelect = document.getElementById("monthSelect");
  const seasonResults = document.getElementById("seasonResults");
  const seasonCount = document.getElementById("seasonCount");

  const budgetDest = document.getElementById("budgetDest");
  const budgetDays = document.getElementById("budgetDays");
  const budgetPeople = document.getElementById("budgetPeople");
  const budgetHotel = document.getElementById("budgetHotel");
  const budgetTravel = document.getElementById("budgetTravel");
  const budgetBtn = document.getElementById("budgetBtn");
  const budgetResult = document.getElementById("budgetResult");

  const tripList = document.getElementById("tripList");
  const tripEmpty = document.getElementById("tripEmpty");
  const printBtn = document.getElementById("printBtn");
  const clearBtn = document.getElementById("clearBtn");

  const bookingForm = document.getElementById("bookingForm");
  const bookDest = document.getElementById("bookDest");
  const bookName = document.getElementById("bookName");
  const bookPhone = document.getElementById("bookPhone");
  const bookEmail = document.getElementById("bookEmail");
  const bookDate = document.getElementById("bookDate");
  const bookDays = document.getElementById("bookDays");
  const bookPeople = document.getElementById("bookPeople");
  const bookHotel = document.getElementById("bookHotel");
  const bookTravel = document.getElementById("bookTravel");
  const bookTotal = document.getElementById("bookTotal");
  const bookingConfirm = document.getElementById("bookingConfirm");
  const bookingList = document.getElementById("bookingList");
  const bookingEmpty = document.getElementById("bookingEmpty");
  const errName = document.getElementById("errName");
  const errPhone = document.getElementById("errPhone");
  const errEmail = document.getElementById("errEmail");
  const errDate = document.getElementById("errDate");
  const errDays = document.getElementById("errDays");
  const errPeople = document.getElementById("errPeople");

  // ---------- 2. State variables ----------
  let selectedState = "All";
  let selectedCategory = "All";
  let keyword = "";
  let slideIndex = 0;
  let openId = null;     // which destination is open in the modal
  let wishlist = [];     // array of destination ids
  let bookings = [];     // array of booking objects
  let theme = "light";

  const monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];

  // Budget rates in rupees (rough numbers, change them as you like)
  const stayPerPersonPerDay = { budget: 1200, standard: 2500, premium: 5000 };
  const travelPerPerson = { bus: 800, train: 600, cab: 1500, flight: 4000 };

  // ---------- 3. Load saved data from localStorage ----------
  try {
    wishlist = JSON.parse(localStorage.getItem("tv-wishlist")) || [];
    bookings = JSON.parse(localStorage.getItem("tv-bookings")) || [];
    theme = localStorage.getItem("tv-theme") || "light";
  } catch (err) {
    wishlist = [];
    bookings = [];
    theme = "light";
  }

  // ---------- 4. Dark mode ----------
  function applyTheme() {
    document.documentElement.setAttribute("data-theme", theme);
    themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";
  }
  themeBtn.addEventListener("click", function () {
    theme = theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("tv-theme", theme); } catch (err) {}
    applyTheme();
  });
  applyTheme();

  // ---------- 5. Wishlist helpers ----------
  function isSaved(id) {
    return wishlist.includes(id);
  }

  function toggleWish(id) {
    const pos = wishlist.indexOf(id);
    if (pos >= 0) {
      wishlist.splice(pos, 1);
    } else {
      wishlist.push(id);
    }
    try { localStorage.setItem("tv-wishlist", JSON.stringify(wishlist)); } catch (err) {}
    renderCards();
    renderTrip();
    updateModalSaveButton();
  }

  // ---------- 6. Build category buttons from data ----------
  const categories = ["All"];
  for (let i = 0; i < destinations.length; i++) {
    if (!categories.includes(destinations[i].category)) {
      categories.push(destinations[i].category);
    }
  }
  categoryFilters.innerHTML = categories
    .map(function (c) {
      const active = c === "All" ? " active" : "";
      return '<button class="chip' + active + '" data-category="' + c + '">' + c + "</button>";
    })
    .join("");

  // ---------- 7. Render destination cards ----------
  function renderCards() {
    const filtered = destinations.filter(function (d) {
      const matchState = selectedState === "All" || d.state === selectedState;
      const matchCategory = selectedCategory === "All" || d.category === selectedCategory;
      const text = (d.name + " " + d.district + " " + d.category).toLowerCase();
      const matchSearch = text.includes(keyword);
      return matchState && matchCategory && matchSearch;
    });

    grid.innerHTML = filtered
      .map(function (d) {
        const saved = isSaved(d.id);
        return (
          '<article class="card" data-id="' + d.id + '">' +
            '<button class="heart' + (saved ? " saved" : "") + '" data-id="' + d.id + '" aria-label="Save to trip plan">' +
              (saved ? "♥" : "♡") +
            "</button>" +
            '<img src="' + d.image + '" alt="' + d.name + '" loading="lazy">' +
            '<div class="card-body">' +
              '<span class="tag">' + d.category + "</span>" +
              "<h3>" + d.name + "</h3>" +
              '<p class="place">' + d.district + ", " + d.state + "</p>" +
              "<p>" + d.short + "</p>" +
              '<p class="season">Best time: ' + d.season + "</p>" +
            "</div>" +
          "</article>"
        );
      })
      .join("");

    resultCount.textContent = filtered.length + " of " + destinations.length + " destinations";
    emptyMsg.hidden = filtered.length !== 0;
  }

  // ---------- 8. Render My Trip Plan ----------
  function renderTrip() {
    const items = wishlist.map(function (id) {
      return destinations.find(function (d) { return d.id === id; });
    });

    tripList.innerHTML = items
      .map(function (d, index) {
        return (
          '<div class="trip-item">' +
            '<span class="trip-no">' + (index + 1) + "</span>" +
            '<div class="trip-info">' +
              "<h4>" + d.name + "</h4>" +
              "<p>" + d.district + ", " + d.state + " | Best time: " + d.season + "</p>" +
            "</div>" +
            '<button class="remove-btn" data-remove="' + d.id + '" aria-label="Remove">&times;</button>' +
          "</div>"
        );
      })
      .join("");

    tripEmpty.hidden = wishlist.length !== 0;
    wishCount.textContent = wishlist.length;
    wishCount.classList.toggle("show", wishlist.length > 0);
  }

  // ---------- 9. Season recommender ----------
  monthSelect.innerHTML = monthNames
    .map(function (name, i) {
      return '<option value="' + (i + 1) + '">' + name + "</option>";
    })
    .join("");
  monthSelect.value = String(new Date().getMonth() + 1); // start with the current month

  function renderSeason() {
    const month = Number(monthSelect.value);
    const matches = destinations.filter(function (d) {
      return d.bestMonths.includes(month);
    });

    seasonResults.innerHTML = matches
      .map(function (d) {
        return (
          '<button class="season-item" data-id="' + d.id + '">' +
            "<strong>" + d.name + "</strong>" +
            "<span>" + d.state + " | " + d.category + "</span>" +
          "</button>"
        );
      })
      .join("");

    seasonCount.textContent = matches.length + " destinations are good in " + monthNames[month - 1];
  }
  monthSelect.addEventListener("change", renderSeason);

  seasonResults.addEventListener("click", function (e) {
    const item = e.target.closest(".season-item");
    if (!item) return;
    openModal(Number(item.dataset.id));
  });

  // ---------- 10. Budget calculator ----------
  budgetDest.innerHTML = destinations
    .map(function (d) {
      return '<option value="' + d.id + '">' + d.name + "</option>";
    })
    .join("");

  budgetBtn.addEventListener("click", function () {
    const days = Number(budgetDays.value);
    const people = Number(budgetPeople.value);

    if (!Number.isInteger(days) || !Number.isInteger(people) || days < 1 || people < 1) {
      budgetResult.hidden = false;
      budgetResult.innerHTML = "<p>Please enter days and people as whole numbers (1 or more).</p>";
      return;
    }

    const destName = budgetDest.options[budgetDest.selectedIndex].text;
    const stayRate = stayPerPersonPerDay[budgetHotel.value];
    const travelRate = travelPerPerson[budgetTravel.value];

    const stayCost = stayRate * days * people;   // stay + food + local travel
    const travelCost = travelRate * people;      // going and coming back
    const total = stayCost + travelCost;
    const perPerson = Math.round(total / people);

    budgetResult.hidden = false;
    budgetResult.innerHTML =
      "<h4>" + destName + ": " + days + " days, " + people + " people</h4>" +
      "<p>Stay, food and local travel: <strong>₹" + stayCost.toLocaleString("en-IN") + "</strong></p>" +
      "<p>Travel to and from: <strong>₹" + travelCost.toLocaleString("en-IN") + "</strong></p>" +
      '<p class="total">Estimated total: ₹' + total.toLocaleString("en-IN") + "</p>" +
      "<p>About ₹" + perPerson.toLocaleString("en-IN") + " per person</p>";
  });

  // ---------- 11. Booking (demo, saved in localStorage) ----------
  function esc(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function todayString() {
    const t = new Date();
    const m = String(t.getMonth() + 1).padStart(2, "0");
    const d = String(t.getDate()).padStart(2, "0");
    return t.getFullYear() + "-" + m + "-" + d;
  }

  function saveBookings() {
    try { localStorage.setItem("tv-bookings", JSON.stringify(bookings)); } catch (err) {}
  }

  bookDest.innerHTML = destinations
    .map(function (d) {
      return '<option value="' + d.id + '">' + d.name + "</option>";
    })
    .join("");
  bookDate.min = todayString();

  function calcBookingTotal() {
    const days = Number(bookDays.value);
    const people = Number(bookPeople.value);
    if (!Number.isInteger(days) || !Number.isInteger(people) || days < 1 || people < 1) {
      return 0;
    }
    return stayPerPersonPerDay[bookHotel.value] * days * people +
           travelPerPerson[bookTravel.value] * people;
  }

  function updateBookTotal() {
    const total = calcBookingTotal();
    bookTotal.textContent = total > 0
      ? "Estimated amount: ₹" + total.toLocaleString("en-IN")
      : "Estimated amount: enter valid days and people";
  }

  function check(valid, input, errBox, message) {
    errBox.textContent = valid ? "" : message;
    input.classList.toggle("invalid", !valid);
    return valid;
  }

  function validateBooking() {
    const name = bookName.value.trim();
    const phone = bookPhone.value.trim();
    const email = bookEmail.value.trim();
    const days = Number(bookDays.value);
    const people = Number(bookPeople.value);

    const okName = check(/^[A-Za-z][A-Za-z .]{2,}$/.test(name), bookName, errName,
      "Enter your full name (letters only, minimum 3).");
    const okPhone = check(/^[6-9]\d{9}$/.test(phone), bookPhone, errPhone,
      "Enter a valid 10-digit mobile number.");
    const okEmail = check(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), bookEmail, errEmail,
      "Enter a valid email address.");
    const okDate = check(bookDate.value !== "" && bookDate.value >= todayString(), bookDate, errDate,
      "Choose today or a future date.");
    const okDays = check(Number.isInteger(days) && days >= 1 && days <= 30, bookDays, errDays,
      "Days must be between 1 and 30.");
    const okPeople = check(Number.isInteger(people) && people >= 1 && people <= 20, bookPeople, errPeople,
      "People must be between 1 and 20.");

    return okName && okPhone && okEmail && okDate && okDays && okPeople;
  }

  function renderBookings() {
    bookingList.innerHTML = bookings
      .map(function (b) {
        const p = b.date.split("-");
        const niceDate = p[2] + " " + monthNames[Number(p[1]) - 1] + " " + p[0];
        return (
          '<div class="booking-item">' +
            '<div class="booking-info">' +
              "<h4>" + esc(b.destName) + ' <span class="ref">' + b.ref + "</span></h4>" +
              "<p>" + niceDate + " | " + b.days + " days | " + b.people + " people</p>" +
              "<p>" + esc(b.name) + " | " + esc(b.phone) + "</p>" +
              '<p class="amount">₹' + b.total.toLocaleString("en-IN") + "</p>" +
            "</div>" +
            '<button class="cancel-btn" data-cancel="' + b.ref + '">Cancel</button>' +
          "</div>"
        );
      })
      .join("");
    bookingEmpty.hidden = bookings.length !== 0;
  }

  // live total while typing
  bookingForm.addEventListener("input", updateBookTotal);

  // submit
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validateBooking()) return;

    const booking = {
      ref: "TV-" + Date.now().toString().slice(-6),
      destId: Number(bookDest.value),
      destName: bookDest.options[bookDest.selectedIndex].text,
      name: bookName.value.trim(),
      phone: bookPhone.value.trim(),
      email: bookEmail.value.trim(),
      date: bookDate.value,
      days: Number(bookDays.value),
      people: Number(bookPeople.value),
      hotel: bookHotel.value,
      travel: bookTravel.value,
      total: calcBookingTotal()
    };

    bookings.unshift(booking);
    saveBookings();
    renderBookings();

    const stayLabel = booking.hotel.charAt(0).toUpperCase() + booking.hotel.slice(1);
    bookingConfirm.hidden = false;
    bookingConfirm.innerHTML =
      "<h3>Booking Confirmed ✅</h3>" +
      "<p>Booking ID: <strong>" + booking.ref + "</strong></p>" +
      "<p>" + esc(booking.destName) + " | " + booking.days + " days | " + booking.people + " people</p>" +
      "<p>" + stayLabel + " stay, travel by " + booking.travel + "</p>" +
      '<p class="total">Amount: ₹' + booking.total.toLocaleString("en-IN") + "</p>" +
      '<p class="demo-note">Demo booking: no payment taken, no email sent.</p>';

    const keepDest = bookDest.value;
    bookingForm.reset();
    bookDest.value = keepDest;
    updateBookTotal();
    bookingConfirm.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  // cancel
  bookingList.addEventListener("click", function (e) {
    const btn = e.target.closest(".cancel-btn");
    if (!btn) return;
    if (!window.confirm("Cancel this booking?")) return;
    bookings = bookings.filter(function (b) { return b.ref !== btn.dataset.cancel; });
    saveBookings();
    renderBookings();
  });

  // "Book This Trip" button inside the modal
  modalBook.addEventListener("click", function () {
    if (openId === null) return;
    const id = openId;
    closeModal();
    bookDest.value = String(id);
    updateBookTotal();
    document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
  });

  // ---------- 12. Search ----------
  searchBox.addEventListener("input", function () {
    keyword = searchBox.value.trim().toLowerCase();
    renderCards();
  });

  // ---------- 13. State filter ----------
  stateFilters.addEventListener("click", function (e) {
    if (!e.target.matches(".chip")) return;
    selectedState = e.target.dataset.state;
    stateFilters.querySelectorAll(".chip").forEach(function (b) { b.classList.remove("active"); });
    e.target.classList.add("active");
    renderCards();
  });

  // ---------- 14. Category filter ----------
  categoryFilters.addEventListener("click", function (e) {
    if (!e.target.matches(".chip")) return;
    selectedCategory = e.target.dataset.category;
    categoryFilters.querySelectorAll(".chip").forEach(function (b) { b.classList.remove("active"); });
    e.target.classList.add("active");
    renderCards();
  });

  // ---------- 15. Card click: heart or open modal ----------
  grid.addEventListener("click", function (e) {
    const heart = e.target.closest(".heart");
    if (heart) {
      toggleWish(Number(heart.dataset.id));
      return;
    }
    const card = e.target.closest(".card");
    if (!card) return;
    openModal(Number(card.dataset.id));
  });

  // ---------- 16. Modal ----------
  function updateModalSaveButton() {
    if (openId === null) return;
    modalSave.textContent = isSaved(openId) ? "♥ Remove from My Trip" : "♡ Add to My Trip";
  }

  function openModal(id) {
    const d = destinations.find(function (item) { return item.id === id; });
    openId = id;

    document.getElementById("modalImg").src = d.image;
    document.getElementById("modalImg").alt = d.name;
    document.getElementById("modalTitle").textContent = d.name;
    document.getElementById("modalMeta").textContent = d.district + ", " + d.state + " | " + d.category;
    document.getElementById("modalDesc").textContent = d.description;
    document.getElementById("modalThings").textContent = d.things;
    document.getElementById("modalReach").textContent = d.reach;
    document.getElementById("modalFood").textContent = d.food;
    document.getElementById("modalSeason").textContent = d.season;

    updateModalSaveButton();
    modal.hidden = false;
    document.body.classList.add("no-scroll");
  }

  function closeModal() {
    modal.hidden = true;
    openId = null;
    document.body.classList.remove("no-scroll");
  }

  modalSave.addEventListener("click", function () {
    if (openId !== null) toggleWish(openId);
  });
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

  // ---------- 17. Trip plan buttons ----------
  tripList.addEventListener("click", function (e) {
    const btn = e.target.closest(".remove-btn");
    if (!btn) return;
    toggleWish(Number(btn.dataset.remove));
  });

  clearBtn.addEventListener("click", function () {
    wishlist = [];
    try { localStorage.setItem("tv-wishlist", JSON.stringify(wishlist)); } catch (err) {}
    renderCards();
    renderTrip();
  });

  printBtn.addEventListener("click", function () {
    window.print();
  });

  // ---------- 18. Hamburger menu ----------
  hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("open");
  });
  navLinks.addEventListener("click", function () {
    navLinks.classList.remove("open");
  });

  // ---------- 19. Hero slideshow ----------
  setInterval(function () {
    slides[slideIndex].classList.remove("active");
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add("active");
  }, 5000);

  // ---------- 20. First render ----------
  renderCards();
  renderTrip();
  renderSeason();
  renderBookings();
  updateBookTotal();
    // ---------- 21. About stats + footer ----------
  const statPlaces = document.getElementById("statPlaces");
  const statStates = document.getElementById("statStates");
  const statCategories = document.getElementById("statCategories");
  const yearEl = document.getElementById("year");

  const stateList = [];
  for (let i = 0; i < destinations.length; i++) {
    if (!stateList.includes(destinations[i].state)) {
      stateList.push(destinations[i].state);
    }
  }
  statPlaces.textContent = destinations.length;
  statStates.textContent = stateList.length;
  statCategories.textContent = categories.length - 1; // "All" is not a real category
  yearEl.textContent = new Date().getFullYear();

  // footer "Explore" links filter the destination cards
  document.querySelectorAll("[data-cat]").forEach(function (link) {
    link.addEventListener("click", function () {
      const chip = categoryFilters.querySelector('[data-category="' + link.dataset.cat + '"]');
      if (chip) chip.click();
    });
  });
    // ---------- 22. Enquiry form (demo, saved in localStorage) ----------
  const enquiryForm = document.getElementById("enquiryForm");
  const enqName = document.getElementById("enqName");
  const enqEmail = document.getElementById("enqEmail");
  const enqPhone = document.getElementById("enqPhone");
  const enqSubject = document.getElementById("enqSubject");
  const enqMessage = document.getElementById("enqMessage");
  const enqCount = document.getElementById("enqCount");
  const enqSuccess = document.getElementById("enqSuccess");
  const errEnqName = document.getElementById("errEnqName");
  const errEnqEmail = document.getElementById("errEnqEmail");
  const errEnqPhone = document.getElementById("errEnqPhone");
  const errEnqMessage = document.getElementById("errEnqMessage");
  const enqMax = 300;

  // live character counter
  enqMessage.addEventListener("input", function () {
    enqCount.textContent = enqMessage.value.length + " / " + enqMax;
  });

  // submit
  enquiryForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = enqName.value.trim();
    const email = enqEmail.value.trim();
    const phone = enqPhone.value.trim();
    const message = enqMessage.value.trim();

    const okName = check(/^[A-Za-z][A-Za-z .]{2,}$/.test(name), enqName, errEnqName,
      "Enter your full name (letters only, minimum 3).");
    const okEmail = check(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), enqEmail, errEnqEmail,
      "Enter a valid email address.");
    const okPhone = check(phone === "" || /^[6-9]\d{9}$/.test(phone), enqPhone, errEnqPhone,
      "Enter a valid 10-digit mobile number, or leave it empty.");
    const okMessage = check(message.length >= 10 && message.length <= enqMax, enqMessage, errEnqMessage,
      "Message must be between 10 and " + enqMax + " characters.");

    if (!(okName && okEmail && okPhone && okMessage)) return;

    let saved = [];
    try {
      saved = JSON.parse(localStorage.getItem("tv-enquiries")) || [];
    } catch (err) {
      saved = [];
    }

    const enquiry = {
      ref: "EQ-" + Date.now().toString().slice(-6),
      name: name,
      email: email,
      phone: phone,
      subject: enqSubject.value,
      message: message,
      time: new Date().toLocaleString("en-IN")
    };

    saved.unshift(enquiry);
    try { localStorage.setItem("tv-enquiries", JSON.stringify(saved)); } catch (err) {}

    enqSuccess.hidden = false;
    enqSuccess.innerHTML =
      "<h3>Thank you, " + esc(name) + "! ✅</h3>" +
      "<p>Your enquiry ID is <strong>" + enquiry.ref + "</strong>.</p>" +
      '<p class="demo-note">Demo form: saved in this browser only, no email is sent.</p>';

    enquiryForm.reset();
    enqCount.textContent = "0 / " + enqMax;
  });
}

main();