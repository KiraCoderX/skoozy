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
  
    const colors = [
      "#5EC9F3",
      "#8FF89F",
      "#FDC43D",
      "#FD98C1"
    ];
  
    const textEl = document.getElementById("rotatingText");
    const section = document.querySelector(".what-you-need-section");
  
    let index = 0;
  
    function rotate() {
      textEl.classList.remove("show");
  
      setTimeout(() => {
        textEl.textContent = texts[index];
        section.style.background = colors[index % colors.length];
        textEl.classList.add("show");
        index = (index + 1) % texts.length;
      }, 300);
    }
  
    rotate();
    setInterval(rotate, 2600);
  });