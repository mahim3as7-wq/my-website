# Phase 2 setup: AI question generator (no coding needed)

Do this AFTER Phase 1 works (Parts 1 to 6 of SETUP.md).

## A. Create your Claude API account and key (about 10 minutes)
1. Open https://console.anthropic.com and sign up (any email).
2. Left menu **Settings** → **Billing**. Add a card and buy a small amount of credit to start (for example $5). The AI only works while there is credit.
3. **Set a spending limit:** **Settings** → **Limits**. Set a **monthly spend limit** you are comfortable with. This is your strongest protection against surprise bills.
4. Left menu **API keys** → **Create key**. Name it `mahinur-exams`. **Copy the key now** (it starts with `sk-ant-`). It is shown only once. Keep it private. **Never paste it into the website files or send it in chat.**

## B. Add the Phase 2 database part
1. Supabase → **SQL Editor** → **New query**.
2. Open `supabase/03_phase2_ai.sql` in Notepad, copy everything, paste, click **Run**. You should see "Success".

## C. Put the AI function on Supabase
1. Supabase left menu **Edge Functions** → **Deploy a new function** → **Via Editor**.
2. Function name: `generate-questions` (exactly this).
3. Delete the sample code. Open `supabase/functions/generate-questions/index.ts` in Notepad, copy everything, paste it into the editor.
4. Click **Deploy function**. Keep **Verify JWT** switched on.
5. Left menu **Edge Functions** → **Secrets** → **Add new secret**. Name: `ANTHROPIC_API_KEY`. Value: the key from step A4. Save.
   (Supabase fills in the other secrets by itself.)
6. Optional: to choose another Claude model, add a secret `CLAUDE_MODEL`. If you add nothing, it uses `claude-sonnet-5-5`.

## D. Rebuild the website
Send me a message saying Phase 2 database and function are done. I will give you the new `dist` folder to upload to Cloudflare, the same way as before.
(The website needs the new screens. The database and function alone are not enough.)

## How to test Phase 2 (in this order)
1. **Topic test (cheapest).** Admin panel → **AI question generator** → **Topic name**. Subject Biology, topic "Cell structure", 5 questions → **Generate drafts**. A progress bar moves, then drafts appear under **Review drafts**.
2. Check the answers yourself. Tap **Edit** on one and change a word. Tap **Regenerate** on another.
3. **Students must not see drafts:** open the site with a student account. Exams show nothing new. In **Question bank** (admin) the drafts are NOT listed yet.
4. Tick 3 drafts → **Create exam from selected questions**. The exam builder opens with the 3 questions already ticked. Name the exam, **Save exam**.
5. **Photo test:** choose **Book page photo**, pick a clear photo of one book page, 5 questions. Check that the questions only use facts from that page.
6. **PDF test:** choose **Chapter PDF**, pages 12 to 17, 3 pages per section, 4 questions per section. You see "1 of 2 parts", "2 of 2 parts". Check that the source chips show real page numbers.
7. **Resume test:** start a PDF job and close the browser tab in the middle. Reopen the AI generator page. Under **Unfinished jobs** tap **Continue**. It carries on without asking for the file again.
8. **Limit test:** in Supabase **Table Editor** → `ai_settings`, set `hourly_call_cap` to 1. Generate twice quickly. The second one stops with a clear "limit" message. Set it back to 40.

## Costs and limits (honest version)
- Every AI call costs money, charged by Anthropic to your account. I have **not** measured the real cost per page yet, because I cannot run the AI without your key. After your first tests, look at **Anthropic Console → Usage** and divide by the number of questions made. Send me the numbers and I will give you a real estimate for a full chapter.
- Two limits protect you: the **monthly token cap** (`ai_settings`, default 1,500,000 tokens) and the **hourly call cap** (default 40). Both are checked on the server. One request can slightly pass the cap, because the count is checked before each call.
- A job may use at most 100 pages, at most 5 pages per section and 15 questions per section.
- Duplicate check: it removes questions that are almost word for word the same (inside one job, and against your approved questions in the same subject). It cannot catch questions that mean the same thing in different words, so reviewing is still needed.
- AI can be wrong. That is why every question is a draft until you approve it. Check the correct answer on each one, especially numerical and Bangla questions.
- Bangla quality is good but not perfect. Read Bangla questions carefully.

## What I tested, and what I could not
- Tested: the database rules (drafts can never enter an exam, students cannot see AI data or change limits, only admin can use them), and the server function's logic with a pretend database and a pretend Claude (26 checks: admin-only, limits, duplicates, page numbers, outage handling, drafts only).
- Not tested: a real call to Claude, because that needs your key. Not tested: the new admin screens against a real Supabase project. The clickable demo in the preview shows the layout with sample data.
- Expect that the first real run may need a small fix. If something looks wrong, send me a screenshot.
