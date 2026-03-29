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

const supportForm = document.getElementById("support-form");
const formStatus = document.getElementById("form-status");

function setFormStatus(message, state = "neutral") {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.classList.toggle("is-error", state === "error");
  formStatus.classList.toggle("is-success", state === "success");
}

if (supportForm) {
  supportForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    setFormStatus("", "neutral");

    const honey = supportForm.querySelector('input[name="website"]');
    if (honey && honey.value.trim() !== "") {
      setFormStatus("Submission blocked.", "error");
      return;
    }

    const name = supportForm.querySelector('input[name="name"]');
    const email = supportForm.querySelector('input[name="email"]');
    const category = supportForm.querySelector('select[name="category"]');
    const message = supportForm.querySelector('textarea[name="message"]');

    if (!name?.value.trim()) {
      setFormStatus("Please enter your name.", "error");
      name?.focus();
      return;
    }
    if (!email?.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      setFormStatus("Please enter a valid email address.", "error");
      email?.focus();
      return;
    }
    if (!category?.value) {
      setFormStatus("Please choose a category.", "error");
      category?.focus();
      return;
    }
    if (!message?.value.trim()) {
      setFormStatus("Please enter a message.", "error");
      message?.focus();
      return;
    }

    const action = supportForm.getAttribute("action") || "";
    const payload = {
      name: name.value.trim(),
      email: email.value.trim(),
      category: category.value,
      message: message.value.trim(),
      website: honey ? honey.value.trim() : "",
      page: "support",
      locale: document.documentElement.lang || "en",
      sourceUrl: window.location.href,
      submittedAt: new Date().toISOString(),
    };

    if (action.includes("REPLACE_WITH_YOUR_WORKER")) {
      setFormStatus("Backend endpoint is not configured yet.", "error");
      return;
    }

    try {
      const response = await fetch(action, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        setFormStatus("Something went wrong sending your message. Please try again.", "error");
        return;
      }

      supportForm.classList.add("is-success");
      supportForm.reset();
      setFormStatus("Thanks, your message was sent successfully.", "success");
    } catch (_err) {
      setFormStatus("Something went wrong sending your message. Please try again.", "error");
    }
  });
}
