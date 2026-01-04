const API_URL =
  "https://script.google.com/macros/s/AKfycbySjKMEuMIHEgxWLUWtf-4ixMMMxwXd0Zx8MUH6t7voFaMID-hd8-wl2B1wpdb6dHCqNw/exec";

const FORM_BASE =
  "https://docs.google.com/forms/d/e/1FAIpQLSedF0Q5daimxdK63JikIwJFPv9YIdHKDXHTlE1a17FFxYKNTg/viewform?usp=pp_url&entry.1701203812=";

const eventsList = document.getElementById("eventsList");

async function loadEvents() {
  try {
    const res = await fetch(API_URL);
    const events = await res.json();

    eventsList.innerHTML = "";

    events.forEach(ev => {

      const prefillForm = FORM_BASE + encodeURIComponent(ev.title);

      // ---- DATE FORMAT ----
      let formattedDate = ev.date;

      if (ev.date && ev.date !== "Coming Soon") {
        formattedDate = new Date(ev.date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "long",
          year: "numeric"
        });
      }

      const card = document.createElement("div");
      card.className = "event-card";

      card.innerHTML = `
        <img src="${ev.banner}" class="event-banner"/>

        <div class="event-content">
          <h3>${ev.title}</h3>

          <p>${ev.description}</p>

          <ul class="event-meta">
            <li><strong>Location:</strong> ${ev.location}</li>
            <li><strong>Date:</strong> ${formattedDate}</li>
            <li><strong>Audience:</strong> ${ev.audience}</li>
          </ul>

          ${
            ev.status === "open"
              ? `<a target="_blank" class="event-btn" href="${prefillForm}">Register Now</a>`
              : `<button class="event-btn" disabled>Coming Soon</button>`
          }
        </div>
      `;

      eventsList.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    eventsList.innerHTML = "<p>Failed to load events.</p>";
  }
}

loadEvents();