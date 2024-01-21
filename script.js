window.addEventListener("DOMContentLoaded", function () {
  let links = document.querySelectorAll("footer a");

  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      let url = this.getAttribute("href");
      window.open(url, "_blank");
    });
  });
});
