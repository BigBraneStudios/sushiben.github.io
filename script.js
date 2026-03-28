const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

function syncHeaderOffset() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const offset = Math.ceil(header.getBoundingClientRect().height) + 2;
  document.documentElement.style.setProperty("--header-offset", `${offset}px`);
}

window.addEventListener("resize", syncHeaderOffset, { passive: true });
window.addEventListener("load", syncHeaderOffset);
syncHeaderOffset();

document.querySelectorAll("details.nav-menu, details.lang-switcher").forEach((menu) => {
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.open = false;
    });
  });
});
