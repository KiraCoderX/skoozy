const form = document.getElementById("schoolForm");
const submitBtn = form.querySelector("button[type='submit']");

let isSubmitting = false;

// 🔐 Google Apps Script Web App URL
const scriptURL = "https://script.google.com/macros/s/AKfycbw63cIVTEPnwe8f2sltCQflphtRDg_rX2nNA4yhQECvux06EHs_qRg6iXt54lbLk-fT/exec";

// Handle submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (isSubmitting) return;

  // Build duplicate key: email + service
  const email = form.email.value.trim().toLowerCase();
  const service = (form.service?.value || "").trim().toLowerCase();
  const duplicateKey = `${email}-${service}`;

  // Check local duplicate storage
  if (localStorage.getItem("skoozy_schedule_last") === duplicateKey) {
    alert("⚠️ You already scheduled a meeting for this service.");
    return;
  }

  isSubmitting = true;
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting…";

  try {
    const formData = new FormData(form);

    const res = await fetch(scriptURL, {
      method: "POST",
      body: formData
    });

    if (!res.ok) throw new Error("Network error");

    // Store to prevent duplicates
    localStorage.setItem("skoozy_schedule_last", duplicateKey);

    alert("✅ Thank you! Our team will contact you soon.");
    form.reset();

  } catch (err) {
    console.error(err);
    alert("❌ Something went wrong. Please try again.");
  }

  submitBtn.disabled = false;
  submitBtn.textContent = "Submit";
  isSubmitting = false;
});
