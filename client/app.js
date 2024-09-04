/*
THIS IS THE PORTION WHERE WE GET THE MISTAKES
*/
// get the div with the id
const mistakesContainer = document.getElementById("mistakes");

// make a fetch to get the itesm from the server (which in turn gets them from the db)
async function getMistakes() {
  const response = await fetch("http://localhost:8080/mistakes");
  const data = await response.json();
  console.log(data);

  // show the mistakes on the page
  // clear the mistakesContainer div
  mistakesContainer.innerHTML = "";

  // loop through the mistakes and put each on on the page
  data.forEach(function (mistake) {
    const p = document.createElement("p");
    p.textContent = `One time, ${mistake.maker} ${mistake.blunder}`;
    mistakesContainer.appendChild(p);
  });
}

getMistakes();

/*
THIS IS THE PORTION WHERE WE POST NEW MISTAKES
*/
const form = document.getElementById("mistake-form");

async function handlePostMistake(event) {
  event.preventDefault();
  // get the information from my form
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  // make a fetch POST request to add a new mistake
  await fetch("http://localhost:8080/mistakes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // reset the form
  form.reset();

  // make it so the new mistake appears on the screen
  getMistakes();
}

form.addEventListener("submit", handlePostMistake);
