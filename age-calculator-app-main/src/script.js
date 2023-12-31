const form = document.querySelector(".form form");

const yearsValue = document.querySelector("#result__years-value");
const monthsValue = document.querySelector("#result__months-value");
const daysValue = document.querySelector("#result__days-value");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const labels = document.querySelectorAll(".form__input label");
  const inputs = document.querySelectorAll(".form__input input");
  const errorTexts = document.querySelectorAll(".form__error-text");

  errorTexts.forEach((errorText) => {
    errorText.textContent = "";
  });
  labels.forEach((label) => {
    label.style.color = "hsl(0, 1%, 44%)";
  });
  resetResults();

  // checking for empty fields
  let quit = false;
  for (let i = 0; i < inputs.length; i++) {
    const label = labels[i];
    const input = inputs[i];
    const errorText = errorTexts[i];
    if (input.value.length < 1) {
      label.style.color = "#dc3545";
      errorText.textContent = "field required";
      quit = true;
    } else if (!isNumber(input.value)) {
      label.style.color = "#dc3545";
      errorText.textContent = "not a number";
      quit = true;
    }
  }
  if (quit) return;

  const day = inputs[0].value;
  const month = inputs[1].value;
  const year = inputs[2].value;
  if (!isValidDate(day, month, year)) {
    labels.forEach((label) => {
      label.style.color = "#dc3545";
    });
    errorTexts.forEach((errorText) => {
      errorText.textContent = "invalid";
    });
    return;
  }

  const { days, months, years } = dateDifference(day, month, year);

  // animating the values
  daysValue.textContent = 0;
  monthsValue.textContent = 0;
  yearsValue.textContent = 0;

  let intervalDuration = 35;
  const intervalId = setInterval(() => {
    if (daysValue.textContent < days) {
      daysValue.textContent++;
    }
    if (monthsValue.textContent < months) {
      monthsValue.textContent++;
    }
    if (yearsValue.textContent < years) {
      yearsValue.textContent++;
    }
    if (daysValue.textContent == days && monthsValue.textContent == months && yearsValue.textContent == years) {
      clearInterval(intervalId);
    }
  }, intervalDuration);
});

function dateDifference(day, month, year) {
  const currentDate = new Date();

  let days = currentDate.getDate() - day;
  let months = currentDate.getMonth() + 1 - month;
  let years = currentDate.getFullYear() - year;

  if (days < 0) {
    months--;
    const daysInLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    days += daysInLastMonth;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { days, months, years };
}

function isValidDate(day, month, year) {
  // is date invalid?
  if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1) {
    return false;
  }

  // does the number of days match the month?
  const maxDaysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (day > maxDaysInMonth[month]) {
    return false;
  }

  // is the date in the future?
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  if (
    year > currentYear ||
    (year === currentYear && month > currentMonth) ||
    (year === currentYear && month === currentMonth && day > currentDay)
  ) {
    return false;
  }

  // none of the conditions above is true
  return true;
}

function resetResults() {
  yearsValue.textContent = "--";
  monthsValue.textContent = "--";
  daysValue.textContent = "--";
}

function isNumber(value) {
  const pattern = /^[0-9]+$/;
  return pattern.test(value);
}
