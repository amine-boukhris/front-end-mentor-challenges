const form = document.querySelector("form");
const dismiss_button = document.querySelector(".success__form-button");

const form_image = document.querySelector(".form__image");
const form_content = document.querySelector(".form__content__container");
const success_content = document.querySelector(".success");
const errorMessage = form.querySelector(".form__error-message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = form.querySelector("#email");
  if (!isValidEmail(email.value)) {
    errorMessage.classList.add("error");
    email.classList.add("error");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.value }),
    });

    if (response.ok) {
      const data = await response.text();
      form_image.classList.add("none");
      form_content.classList.add("none");
      success_content.classList.remove("none");
      errorMessage.classList.add("error");

      email.value = "";
      // console.log("Email added successfully:", data);
    } else {
      console.error("Error adding email:", response.statusText);
      email.classList.add("error");
    }
  } catch (error) {
    console.error("An error occurred while adding email:", error);
  }
});

dismiss_button.addEventListener("click", () => {
  form_image.classList.remove("none");
  form_content.classList.remove("none");
  success_content.classList.add("none");
  errorMessage.classList.remove("error");
  email.classList.remove("error");
});

function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}
