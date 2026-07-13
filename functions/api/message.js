function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

function mailtoUrl({ name, email, message }) {
  const subject = encodeURIComponent(`AstraLink message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  return `mailto:leesanfong1989@gmail.com?subject=${subject}&body=${body}`;
}

export async function onRequestPost({ request }) {
  try {
    const input = await request.json();
    const name = String(input.name || "")
      .trim()
      .slice(0, 120);
    const email = String(input.email || "")
      .trim()
      .slice(0, 180);
    const message = String(input.message || "")
      .trim()
      .slice(0, 4000);

    if (!name || !email || !message || !email.includes("@")) {
      return json({ ok: false, error: "Please enter a valid name, email, and message." }, 400);
    }

    return json({
      ok: true,
      mode: "mailto",
      mailtoUrl: mailtoUrl({ name, email, message })
    });
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }
}
