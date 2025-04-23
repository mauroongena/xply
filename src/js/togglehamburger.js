export function initNavToggle() {
  const navToggle = document.getElementById("nav-toggle");
  const headerGroup = document.querySelector(".header-group");

  if (!navToggle || !headerGroup) return;

  navToggle.addEventListener("click", () => {
    const isActive = navToggle.classList.toggle("active");
    headerGroup.classList.toggle("active", isActive);
    navToggle.setAttribute(
      "aria-label",
      isActive ? "Close navigation" : "Open navigation"
    );
  });
}
