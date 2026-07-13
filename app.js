const form = document.querySelector("#message-form");
const statusEl = document.querySelector("#form-status");

function buildMailto(data) {
  const subject = encodeURIComponent(`AstraLink message from ${data.name}`);
  const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`);
  return `mailto:leesanfong1989@gmail.com?subject=${subject}&body=${body}`;
}

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  statusEl.textContent = "Sending...";

  try {
    const response = await fetch("/api/message", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await response.json();

    if (result.mailtoUrl) {
      window.location.href = result.mailtoUrl;
      statusEl.textContent = "Your email app is opening.";
      return;
    }

    if (!response.ok) {
      throw new Error(result.error || "Message failed");
    }

    form.reset();
    statusEl.textContent = "Message sent. Thank you.";
  } catch {
    window.location.href = buildMailto(data);
    statusEl.textContent = "Your email app is opening.";
  }
});
