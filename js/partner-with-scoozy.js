const form = document.getElementById("partnerForm");
const statusMsg = document.getElementById("formStatus");
const submitBtn = form.querySelector("button[type='submit']");

// 🔐 Your Google Script Web App URL (we'll create it below)
const scriptURL = "https://script.google.com/macros/s/AKfycbyHKdBq9JPzMM67eH0BBobOZFDFxwt2gtLqVKSC78QIl50947AEPNBwHkaxGc78GsMa2Q/exec";

// Prevent multiple clicks flag
let isSubmitting = false;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // If already submitting → block
  if (isSubmitting) return;

  // Build unique key (email + company)
  const email = form.email.value.trim().toLowerCase();
  const message = form.message.value.trim().toLowerCase();
  const duplicateKey = `${email}-${message}`;

  // Check LocalStorage to avoid accidental repeat submits
  if (localStorage.getItem("skoozy_partner_last") === duplicateKey) {
    statusMsg.textContent = "⚠️ You already submitted this form.";
    statusMsg.style.color = "#d97706";
    return;
  }

  isSubmitting = true;
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting…";
  statusMsg.textContent = "Submitting...";
  statusMsg.style.color = "#000";

  try {
    const formData = new FormData(form);

    const res = await fetch(scriptURL, {
      method: "POST",
      body: formData
    });

    if (!res.ok) throw new Error("Network response failed");

    // Save locally to block duplicates
    localStorage.setItem("skoozy_partner_last", duplicateKey);

    statusMsg.textContent =
      "✅ Thank you! Our team will get back to you shortly.";
    statusMsg.style.color = "green";

    form.reset();
  } catch (err) {
    console.error(err);
    statusMsg.textContent =
      "❌ Something went wrong. Please try again.";
    statusMsg.style.color = "red";

    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
    isSubmitting = false;
  }
});
