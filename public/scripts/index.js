let addBtn = document.querySelector("#add-btn");
let amount = document.querySelector("#amount");
let form = document.querySelector("#add-form");
addBtn.addEventListener("click", () => {
  if (amount.value < 0) {
    alert("Enter a Valid Amount");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  }
});
