// AZ Atlas Builder Group: serves the static site and emails estimate requests via Resend.
const MAX_FILES = 8, MAX_TOTAL = 30 * 1024 * 1024;
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { "content-type": "application/json" } });

function b64(buf) {
  let s = "", bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return btoa(s);
}

async function handleLead(req, env) {
  if (!env.RESEND_API_KEY || !env.LEAD_TO) return json({ ok: false, error: "not_configured" }, 500);
  let fd;
  try { fd = await req.formData(); } catch { return json({ ok: false, error: "bad_request" }, 400); }
  if ((fd.get("company_website") || "").trim()) return json({ ok: true }); // honeypot
  const f = k => (fd.get(k) || "").toString().trim().slice(0, 3000);
  const lead = {
    name: f("name"), phone: f("phone"), email: f("email"), location: f("location"),
    service: f("service") || "Not sure", size: f("size"), timeline: f("timeline"), budget: f("budget"),
    design: f("design"), description: f("description"), source: f("source")
  };
  if (!lead.name || !lead.phone || !lead.email || !lead.description) return json({ ok: false, error: "missing_fields" }, 400);

  const attachments = []; let total = 0;
  for (const file of fd.getAll("photos").slice(0, MAX_FILES)) {
    if (!file || typeof file === "string" || !file.size) continue;
    if (total + file.size > MAX_TOTAL) break;
    total += file.size;
    attachments.push({ filename: (file.name || "photo.jpg").replace(/[^\w.\-]/g, "_"), content: b64(await file.arrayBuffer()) });
  }

  const rows = [["Name", lead.name], ["Phone", lead.phone], ["Email", lead.email], ["Project location", lead.location],
    ["Service", lead.service], ["Project size", lead.size], ["Timeline", lead.timeline], ["Budget", lead.budget],
    ["3D design", lead.design], ["Photos", attachments.length ? attachments.length + " attached" : "None"]]
    .filter(r => r[1]).map(r => `<tr><td style="padding:8px 14px 8px 0;color:#7b6c62;white-space:nowrap;vertical-align:top">${r[0]}</td><td style="padding:8px 0;color:#120d0b;font-weight:600">${esc(r[1])}</td></tr>`).join("");
  const html = `<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:560px;margin:0 auto;color:#120d0b">
  <div style="background:#8e2417;color:#fff;padding:18px 22px;border-radius:14px 14px 0 0;font-size:18px;font-weight:700">New estimate request</div>
  <div style="border:1px solid #eadfd3;border-top:0;border-radius:0 0 14px 14px;padding:20px 22px">
  <table style="border-collapse:collapse;font-size:15px">${rows}</table>
  <div style="margin-top:16px;padding:14px 16px;background:#f7f1ea;border-radius:10px;font-size:15px;line-height:1.5;white-space:pre-wrap">${esc(lead.description)}</div>
  <p style="margin:18px 0 0"><a href="tel:${esc(lead.phone.replace(/[^\d+]/g, ""))}" style="background:#8e2417;color:#fff;padding:11px 18px;border-radius:999px;text-decoration:none;font-weight:600">Call ${esc(lead.name.split(" ")[0])}</a>
  &nbsp; <a href="mailto:${esc(lead.email)}" style="color:#8e2417;font-weight:600">Reply by email</a></p>
  <p style="margin-top:18px;font-size:12px;color:#a69689">Sent from ${esc(lead.source || "azatlasbuilder.com")}</p></div></div>`;
  const text = `New estimate request\n\n${[["Name", lead.name], ["Phone", lead.phone], ["Email", lead.email], ["Location", lead.location], ["Service", lead.service], ["Size", lead.size], ["Timeline", lead.timeline], ["Budget", lead.budget], ["3D design", lead.design]].filter(r => r[1]).map(r => r[0] + ": " + r[1]).join("\n")}\n\n${lead.description}`;

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.LEAD_FROM || "AZ Atlas Website <website@azatlasbuilder.com>",
      to: env.LEAD_TO.split(",").map(s => s.trim()).filter(Boolean),
      reply_to: lead.email, subject: `New estimate request: ${lead.service} (${lead.location || "Tucson"})`,
      html, text, attachments
    })
  });
  if (!r.ok) { console.log("resend error", r.status, await r.text()); return json({ ok: false, error: "send_failed" }, 502); }
  return json({ ok: true });
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (url.pathname === "/api/lead") {
      if (req.method !== "POST") return json({ ok: false }, 405);
      try { return await handleLead(req, env); } catch (e) { console.log("lead error", e && e.stack); return json({ ok: false, error: "server" }, 500); }
    }
    return env.ASSETS.fetch(req);
  }
};
