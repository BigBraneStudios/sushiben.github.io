const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const THEME_KEY = "sb_theme";
const themeButtons = Array.from(document.querySelectorAll("[data-theme-toggle]"));

function applyTheme(theme, persist = false) {
  const finalTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", finalTheme);
  if (persist) {
    try {
      localStorage.setItem(THEME_KEY, finalTheme);
    } catch (_err) {
      // Ignore storage failures (private mode, strict privacy settings, etc).
    }
  }

  themeButtons.forEach((btn) => {
    const isDark = finalTheme === "dark";
    btn.textContent = isDark ? "\u2600" : "\u263E";
    btn.setAttribute("aria-pressed", isDark ? "true" : "false");
    btn.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    btn.setAttribute("title", isDark ? "Switch to light theme" : "Switch to dark theme");
    btn.classList.toggle("is-dark", isDark);
  });

  const discordWidget = document.querySelector("iframe[data-discord-widget]");
  if (discordWidget) {
    const themeParam = finalTheme === "dark" ? "dark" : "light";
    const base = "https://discord.com/widget?id=1102657848393093152";
    const nextSrc = `${base}&theme=${themeParam}`;
    if (discordWidget.getAttribute("src") !== nextSrc) {
      discordWidget.setAttribute("src", nextSrc);
    }
  }

  document.querySelectorAll("iframe[data-spotify-widget]").forEach((spotifyWidget) => {
    const base = spotifyWidget.getAttribute("data-spotify-src");
    if (!base) return;
    const joiner = base.includes("?") ? "&" : "?";
    const nextSrc = finalTheme === "dark" ? `${base}${joiner}theme=0` : base;
    if (spotifyWidget.getAttribute("src") !== nextSrc) {
      spotifyWidget.setAttribute("src", nextSrc);
    }
  });
}

themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next, true);
  });
});

const initialTheme = document.documentElement.getAttribute("data-theme") || "light";
applyTheme(initialTheme, false);

document.querySelectorAll("details.nav-menu, details.lang-switcher").forEach((menu) => {
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.open = false;
    });
  });
});

const dropdowns = Array.from(document.querySelectorAll("details.nav-menu, details.lang-switcher"));
dropdowns.forEach((menu) => {
  menu.addEventListener("toggle", () => {
    if (!menu.open) return;
    dropdowns.forEach((other) => {
      if (other !== menu) other.open = false;
    });
  });
});

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  dropdowns.forEach((menu) => {
    if (!menu.open) return;
    if (!menu.contains(target)) {
      menu.open = false;
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  dropdowns.forEach((menu) => {
    menu.open = false;
  });
});

const supportForm = document.getElementById("support-form");
const formStatus = document.getElementById("form-status");
const shotLightbox = document.getElementById("shot-lightbox");
const shotLightboxImage = document.getElementById("shot-lightbox-image");
const shotLightboxClose = document.querySelector(".shot-lightbox-close");

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
    const turnstileResponse = supportForm.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]');

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
    if (!turnstileResponse?.value.trim()) {
      setFormStatus("Please complete the verification challenge.", "error");
      return;
    }

    const action = supportForm.getAttribute("action") || "";
    const payload = {
      name: name.value.trim(),
      email: email.value.trim(),
      category: category.value,
      message: message.value.trim(),
      token: turnstileResponse.value.trim(),
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

if (shotLightbox && shotLightboxImage) {
  document.querySelectorAll(".shot[data-shot]").forEach((button) => {
    button.addEventListener("click", () => {
      const src = button.getAttribute("data-shot");
      if (!src) return;
      shotLightboxImage.setAttribute("src", src);
      shotLightbox.showModal();
    });
  });

  if (shotLightboxClose) {
    shotLightboxClose.addEventListener("click", () => {
      shotLightbox.close();
    });
  }

  shotLightbox.addEventListener("click", (event) => {
    const rect = shotLightbox.getBoundingClientRect();
    const inDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;
    if (!inDialog) {
      shotLightbox.close();
    }
  });
}
