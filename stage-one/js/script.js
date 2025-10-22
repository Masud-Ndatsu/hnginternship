document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  const dialog = document.querySelector(".dialog");
  const closeDialogBtn = dialog.querySelector(".dialog-button");

  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");

  const errors = {
    fullName: document.getElementById("fullNameError"),
    email: document.getElementById("emailError"),
    subject: document.getElementById("subjectError"),
    message: document.getElementById("messageError"),
  };
  const showError = (el, message) => {
    el.textContent = message;
    el.style.color = message ? "red" : "";
  };

  const validateForm = () => {
    let isValid = true;

    if (!fullNameInput.value.trim()) {
      showError(errors.fullName, "Full name is required");
      isValid = false;
    } else {
      showError(errors.fullName, "");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      showError(errors.email, "Email is required");
      isValid = false;
    } else if (!emailRegex.test(emailInput.value)) {
      showError(errors.email, "Enter a valid email address");
      isValid = false;
    } else {
      showError(errors.email, "");
    }

    if (!subjectInput.value.trim()) {
      showError(errors.subject, "Subject is required");
      isValid = false;
    } else {
      showError(errors.subject, "");
    }

    const messageText = messageInput.value.trim();
    if (!messageText && messageInput.length < 1) {
      showError(errors.message, "Message is required");
      isValid = false;
    } else if (messageText.length < 10) {
      showError(errors.message, "Message must be at least 10 characters");
      isValid = false;
    } else {
      showError(errors.message, "");
    }

    return isValid;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (validateForm()) {
      dialog.classList.add("dialog-active");
      form.reset();
    }
  });

  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("keypress", () => {
      validateForm();
    });
  });

  closeDialogBtn.addEventListener("click", () => {
    dialog.classList.remove("dialog-active");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      dialog.classList.remove("dialog-active");
    }
  });
});
