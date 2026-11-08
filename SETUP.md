# Mahinur website + exams – Phase 1 setup (no coding needed)

This folder is ONE website: your portfolio at `yourdomain/` and the exam system at `yourdomain/exams/`. Same header, same domain, same deploy.

- `index.html`, `admin.html`, `config.js`: your existing site (only the empty "Online exams" box changed into an **Open exams** card).
- `exams/`: the new exam system. `supabase/`: database files.

You will do 5 short parts. Total time: about 30 minutes. Take them in order.

---
## Part 1 – Create a NEW Supabase project (your exam database)

1. Open https://supabase.com/dashboard and sign in (the same account is fine).
2. Click **New project**. If asked for an organization, choose the one that is there.
3. **Name:** `mahinur-exams`
4. **Database password:** click **Generate a password**, then **Copy** it and save it in your phone notes. You will rarely need it.
5. **Region:** choose **Southeast Asia (Singapore)**. It is the closest to Bangladesh.
6. Click **Create new project**. Wait 1–2 minutes until the dashboard opens.

## Part 2 – Install the database

1. In the left menu click **SQL Editor**, then **New query**.
2. Open the file `supabase/01_schema.sql` from this folder in Notepad. Select all (Ctrl+A), copy (Ctrl+C).
3. Paste into the SQL Editor (Ctrl+V). Click the green **Run** button.
4. You should see **Success. No rows returned**. If you see red text, send me a screenshot.

## Part 3 – Turn on login

**Email login** is already on. Supabase sends a verification email by itself.

**Google login:**
1. Open https://console.cloud.google.com and sign in. Top bar: click the project box → **New project** → name it `mahinur-exams` → **Create**.
2. Search bar → type **OAuth consent screen** → open it → choose **External** → **Create**. App name: `Mahinur Exams`. Pick your email for both email boxes. Keep clicking **Save and continue** until the end, then **Back to dashboard**. Click **Publish app** → **Confirm**.
3. Search bar → **Credentials** → **Create credentials** → **OAuth client ID** → Application type **Web application**.
4. Under **Authorized redirect URIs** click **Add URI** and paste this (replace `YOURREF` with the code in your Supabase address, for example `https://abcd1234.supabase.co`):
   `https://YOURREF.supabase.co/auth/v1/callback`
5. Click **Create**. A box shows a **Client ID** and **Client secret**. Keep it open.
6. In Supabase: left menu **Authentication** → **Sign In / Providers** → **Google** → switch **Enable** on → paste the Client ID and Client secret → **Save**.

## Part 4 – Give me three things, I build the website

1. In Supabase click the **gear icon Project Settings** → **API Keys** (or **API**).
2. Copy the **Project URL** (looks like `https://abcd1234.supabase.co`).
3. Copy the **Publishable key** (starts with `sb_publishable_`). This key is made to be public. It is safe to share.
4. Send me both in the chat, and tell me **where your portfolio is online today** (for example a Cloudflare, Netlify or other address, or "not online yet"). I will send back the finished `dist` folder with your portfolio and the exams together.

## Part 5 – Put it online (one site, one domain)

Your portfolio and exams upload together, so they share one address.

1. Open https://dash.cloudflare.com and create a free account.
2. Left menu **Workers & Pages** → **Create** → **Pages** tab → **Upload assets**.
3. Project name: `mahinur-alam` (this becomes `mahinur-alam.pages.dev`). Click **Create project**.
4. Drag the finished `dist` folder I send you into the box → **Deploy site**.
5. Your site opens at `https://mahinur-alam.pages.dev` and the exams at `https://mahinur-alam.pages.dev/exams/`. Copy the first address.
6. Back in Supabase: **Authentication** → **URL Configuration**. Set **Site URL** to `https://mahinur-alam.pages.dev/exams/`. Under **Redirect URLs** click **Add URL**, paste the same address, **Save**.
7. If you already own a domain (for example `mahinuralam.com`), in Cloudflare open the project → **Custom domains** → **Set up a custom domain** and follow the steps. Tell me the domain and I will update the Supabase address with you.

## Part 6 – Log in as the teacher (admin)

Your email `mahim3as7@gmail.com` is already set as the only admin. There is nothing to run.

1. Open `yourdomain/exams/`.
2. **Easiest:** click **Continue with Google** and choose `mahim3as7@gmail.com`. No password needed.
3. **Or with a password:** click **Create an account**, enter that email, and choose a strong password of your own (at least 8 characters). Open the verification email Supabase sends, click the link, then sign in.
4. You now see an **Admin panel** button at the top.

**Important:** do this yourself right after the site goes online, **before you share the link with students**. Nobody else can become admin, because admin is only given to a *verified* `mahim3as7@gmail.com`.
Keep your password private. It is not stored anywhere in the website files.
If the Admin button does not appear, run `supabase/02_make_me_admin.sql` once (it is already filled in for you).

---
## How to test Phase 1 (do all of these)

1. **Admin → Question bank → CSV template.** Open the file, add 5 questions, save, then **Import CSV**. Or use **Add question** 5 times.
2. **Admin → Exams → Create exam.** Name it "Test 1", type **Practice**, duration 5 minutes, negative marking 0.25, tick your 5 questions, tick **Published**, **Save exam**.
3. Open your site, tap **Exams** in the menu (or **Open exams**). On your phone, sign in with a **different** Google account (a friend's, or your second email). Open the exam → **Start exam**.
4. Answer 2 questions. **Turn on airplane mode.** The line under the timer changes to "Offline: saved on this phone". Answer one more. **Turn airplane mode off.** It changes back to "All answers saved".
5. **Close the browser completely and reopen the site.** Tap **Resume exam**. Your 3 answers are still there and the timer kept running.
6. Tap **Submit** → check the summary → **Yes, submit**. You see your score and a question-by-question review.
7. Try to start the same exam again. It says you used all attempts.
8. Back on your teacher account: **Results** shows the score, and **Students** lets you block the test account.

If anything looks wrong, take a screenshot and send it to me.

## Honest limits of Phase 1

- Supabase's free tier **pauses the project after about a week without any visits**. Fine for testing. Before your first real live exam, upgrade to Supabase Pro (about $25 per month).
- Supabase's built-in email sender is rate-limited (a few emails per hour). If many students sign up at once, they should use Google sign-in until we add a proper email service in a later phase.
- An answer must reach the server before the timer ends (plus 3 seconds). If a student's internet is off at the very last moment, answers made while offline in the final seconds can be lost. The app warns them when they are offline.
- Not in Phase 1 (see SETUP-PHASE2.md for AI question generation): leaderboards, charts, tab-switch detection (Phase 3), installable app, light mode, payments (Phase 4). Batches and "invited only" exams are also not built yet: every published exam is visible to every signed-in student.
