const requirments = document.querySelector(".requirments");

if (requirments) {
  const requirmentsBtns = document.querySelectorAll(".requirments__btn");
  const contents = document.querySelectorAll(".requirments__content");

  requirmentsBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      if (btn.classList.contains("requirments__btn--active")) {
        return;
      } else {
        const name = btn.dataset.name;

        requirmentsBtns.forEach((btn) => {
          btn.classList.remove("requirments__btn--active");
        });

        contents.forEach((content) => {
          content.classList.remove("requirments__content--active");
        });

        btn.classList.add("requirments__btn--active");

        Array.from(contents)
          .find((content) => content.dataset.content === name)
          .classList.add("requirments__content--active");
      }
    })
  );
}
