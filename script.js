document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".mail-form");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input");

      if (input && input.value.trim()) {
        input.value = "";
        input.placeholder = "Thanks for signing up";
      }
    });
  }
});
