console.log("Client side javascript is loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const para1 = document.getElementById("para-1");
const para2 = document.getElementById("para-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;
  para1.textContent = "Loading...";
  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          para1.textContent = data.error;
        } else {
          para1.textContent = data.location;
          para2.textContent = data.forecast;
        }
      });
    }
  );
});
