import "./style.css";

const form = document.querySelector("form");

function showSpinner() {
  const button = document.querySelector("button");
  button.disabled = true;
  button.innerHTML =
    'Painting your picture <span class="spinner"><img class="brush" src="brush.svg"/></span>';
}
function hideSpinner() {
  const button = document.querySelector("button");
  button.disabled = false;
  button.innerHTML = "Generate picture";
}
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  showSpinner();
  const data = new FormData(form);

  const response = await fetch("http://localhost:8080/drawing", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: data.get("prompt") }),
  });

  if (response.ok) {
    form.reset();
    const { image } = await response.json();
    const result = document.querySelector("#result");
    result.innerHTML = `<img class="result_image" src="${image}" />`;
  } else {
    const err = await response.text();
    alert(err);
    console.error(err);
  }

  hideSpinner();
});
