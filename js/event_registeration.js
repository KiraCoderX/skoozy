function openRegister(id, title) {
  document.querySelector("#eventTitle").textContent = title;
  const form = document.querySelector("#registerForm");

  form.eventId.value = id;
  form.eventName.value = title;

  document.querySelector("#registerModal").style.display = "block";
}