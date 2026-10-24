// POST /api/apply — BPO Agent Skills pilot application.
// Emails the full application to Brendan through Emailit. No auto-subscribe:
// an applicant has not asked for a newsletter.

const EMAILIT_URL = 'https://api.emailit.com/v2/emails';
const TO = process.env.CONTACT_TO || 'boktoday@gmail.com';
const FROM = process.env.CONTACT_FROM || 'BPO Agent Skills <go@getonetoeight.org>';

function clean(v, max) {
  return String(v == null ? '' : v).replace(/\s+/g, ' ').trim().slice(0, max);
}
function looksLikeEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') { res.status(204).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ ok: false, error: 'method_not_allowed' }); return; }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  body = body || {};

  if (clean(body.website, 200)) { res.status(200).json({ ok: true }); return; }

  const name = clean(body.first_name, 120);
  const email = clean(body.email, 200).toLowerCase();
  if (!name || !looksLikeEmail(email)) { res.status(400).json({ ok: false, error: 'invalid_input' }); return; }

  const lines = [
    'Name: ' + name,
    'Email: ' + email,
    'City: ' + clean(body.city, 120),
    'Current role: ' + clean(body.role, 160),
    '18+: ' + clean(body.age18, 20),
    'Voice note: ' + clean(body.voice_link, 500),
    '',
    'Written note:',
    String(body.note || '').trim().slice(0, 4000),
    '',
    'Sent from the application form on bpoagentskills.com',
  ];

  try {
    const resp = await fetch(EMAILIT_URL, {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + (process.env.EMAILIT_API_KEY || ''), 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM, to: TO, reply_to: email,
        subject: 'BPO application: ' + name + (clean(body.city, 60) ? ' (' + clean(body.city, 60) + ')' : ''),
        text: lines.join('\n'),
      }),
    });
    if (!resp.ok) { res.status(502).json({ ok: false, error: 'delivery_failed' }); return; }
  } catch (err) {
    res.status(502).json({ ok: false, error: 'delivery_failed' });
    return;
  }
  res.status(200).json({ ok: true, notified: true });
};
