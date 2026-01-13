const form = document.getElementById("contactForm");
const statusMsg = document.getElementById("formStatus");

const categorySelect = document.querySelector("select[name='category']");
const jobTitleSelect = document.querySelector("select[name='jobTitle']");

// 🔴 Your Google Apps Script URL
const scriptURL = "https://script.google.com/macros/s/AKfycbwyNuTJdoAIWWtfmmHwYI1ykruxip3FcKVdKgTlMnJiyO-D46QDExcnj8PQ7WHQ_yWz/exec";

// Job title options
const jobOptions = {
  school: [
    "School Owner",
    "Principal",
    "Management Team"
  ],
  edtech: [
    "Founder",
    "Sales",
    "Marketing",
    "Product"
  ]
};

// 🟡 Handle Category Change
categorySelect.addEventListener("change", () => {
  const value = categorySelect.value;

  // Reset dropdown
  jobTitleSelect.innerHTML = `<option value="">Select Job Title*</option>`;

  if (!value) return;

  jobOptions[value].forEach(role => {
    const option = document.createElement("option");
    option.value = role;
    option.textContent = role;
    jobTitleSelect.appendChild(option);
  });
});

// 🟢 Submit form
form.addEventListener("submit", e => {
  e.preventDefault();

  statusMsg.textContent = "Submitting...";
  statusMsg.style.color = "#000";

  const formData = new FormData(form);

  fetch(scriptURL, {
    method: "POST",
    body: formData
  })
  .then(() => {
    statusMsg.textContent = "✅ Thank you! We will contact you shortly.";
    statusMsg.style.color = "green";
    form.reset();
  })
  .catch(() => {
    statusMsg.textContent = "❌ Something went wrong. Please try again.";
    statusMsg.style.color = "red";
  });
});
