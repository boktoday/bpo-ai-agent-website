# BPO Agent Skills

The landing page for **BPO Agent Skills**, a free four-week pilot teaching Filipino call-centre agents and virtual assistants to build, test and supervise AI agents.

- Live: https://boktoday.github.io/bpo-ai-agent-website/
- Domain: bpoagentskills.com (to be pointed at Vercel)
- Curriculum and marketing plan: Google Doc, linked from the pilot owner

## What is here

- `index.html` — the whole page: hero, the case, Philippine statistics with a linked Sources section, four-week outline, pricing for later cohorts, the Autism Works pledge, application form, waitlist and FAQ.
- `assets/hero.png` — the hero photograph.

## How the application works

The applicant records a two-minute voice note in the browser, downloads the file, uploads it wherever they like (Drive, Dropbox, Messenger to themselves) and pastes the link into the form. The form then posts JSON to an ActivePieces webhook once one is configured; until then it saves locally and says so.

No audio is uploaded from the page. There is no microphone permission to break, and no file transfer to fail.

## Deploying

Static, no build step. GitHub Pages serves `main` today. To move to Vercel: import this repository, framework preset **Other**, no build command, output directory `.`, then add `bpoagentskills.com` as a custom domain and follow the DNS instructions Vercel gives.

## Editing rules

- British English, no em dashes.
- Audience: agents and VAs, 18 or over. Never call them teenagers.
- Every statistic on the page carries a named source and a link in the Sources section.
- Never imply the work is free forever: learning is free, running an agent in a real role is not.
