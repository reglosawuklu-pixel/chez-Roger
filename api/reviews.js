const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 2000;

function send(res, status, body) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  return res.status(status).json(body);
}

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return send(res, 405, { error: "Methode non autorisee." });
  }

  const origin = req.headers.origin;
  const host = req.headers.host;
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return send(res, 403, { error: "Origine non autorisee." });
    } catch {
      return send(res, 403, { error: "Origine non autorisee." });
    }
  }

  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const supabaseKey = process.env.SUPABASE_SECRET_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return send(res, 503, req.method === "GET" ? { reviews: [] } : { error: "Votre avis n'a pas pu etre envoye. Reessayez plus tard." });
  }

  if (req.method === "GET") {
    try {
      const query = new URLSearchParams({
        select: "rating,message,created_at",
        status: "eq.approved",
        order: "created_at.desc",
        limit: "20",
      });
      const response = await fetch(supabaseUrl + "/rest/v1/reviews?" + query, {
        headers: { apikey: supabaseKey, Authorization: "Bearer " + supabaseKey },
      });
      if (!response.ok) return send(res, 502, { reviews: [] });
      const reviews = await response.json();
      return send(res, 200, { reviews: Array.isArray(reviews) ? reviews : [] });
    } catch {
      return send(res, 502, { reviews: [] });
    }
  }

  const body = req.body && typeof req.body === "object" ? req.body : {};
  if (typeof body.website === "string" && body.website.trim()) return send(res, 201, { ok: true });

  const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const rating = Number(body.rating);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    fullName.length < 2 || fullName.length > MAX_NAME_LENGTH ||
    email.length > MAX_EMAIL_LENGTH || !emailPattern.test(email) ||
    !Number.isInteger(rating) || rating < 1 || rating > 5 ||
    message.length < 3 || message.length > MAX_MESSAGE_LENGTH || body.consent !== true
  ) {
    return send(res, 400, { error: "Verifiez les champs et reessayez." });
  }

  try {
    const response = await fetch(supabaseUrl + "/rest/v1/reviews", {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: "Bearer " + supabaseKey,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ full_name: fullName, email, rating, message }),
    });
    if (!response.ok) return send(res, 502, { error: "Votre avis n'a pas pu etre envoye. Reessayez plus tard." });
    return send(res, 201, { ok: true });
  } catch {
    return send(res, 502, { error: "Votre avis n'a pas pu etre envoye. Reessayez plus tard." });
  }
}
