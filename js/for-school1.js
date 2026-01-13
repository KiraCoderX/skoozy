document.addEventListener("DOMContentLoaded", () => {
  const texts = [
    "ERP Systems",
    "LMS Platforms",
    "Robotics & AI",
    "Content & Curriculum",
    "Assessment Tools & Progress Card",
    "Teacher Training & Hiring",
    "Student Counselling & Admission",
    "Experiential Learning",
    "School Consultancy & Market Research",
    "Global Exposure Programs",
    "School Adventure Camps",
    "Pre School Services"
  ];

  const el = document.getElementById("rotatingText1");
  let index = 0;

  function showText() {
    el.classList.remove("exit");
    el.textContent = texts[index];
    el.classList.add("enter");

    index = (index + 1) % texts.length;

    setTimeout(() => {
      el.classList.remove("enter");
      el.classList.add("exit");
    }, 2200);
  }

  showText();
  setInterval(showText, 3000);
});
