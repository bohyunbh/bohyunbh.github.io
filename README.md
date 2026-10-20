# Bohyun Park — Portfolio

A plain HTML/CSS/JS site with no build step. **Everything on the page comes from
`content/site.json`**, which is edited through [Pages CMS](https://pagescms.org),
a free, form-based editor that saves changes straight to GitHub.

```
index.html          layout (rarely touched)
styles.css          design
main.js             reads site.json and fills in the page
content/site.json   ALL the words, links and images
images/             uploaded photos / PDFs
.pages.yml          defines the editing form in Pages CMS
```

## One-time setup (Andrew)

1. Create a GitHub repo (e.g. `bohyun-portfolio`) and push this folder.
2. Hosting: in the repo go to **Settings → Pages → Deploy from branch → `main` / root**.
   The site will be live at `https://<username>.github.io/bohyun-portfolio/` within a minute.
   (Netlify or Vercel also work. Point them at the repo with no build command.)
3. Have Bohyun make a GitHub account, then add her as a collaborator
   (**Settings → Collaborators**).
4. She goes to **https://app.pagescms.org**, signs in with GitHub, and picks the repo.
5. Optional: buy a domain such as `bohyunpark.com` and set it in **Settings → Pages → Custom domain**.

## Editing guide (Bohyun)

1. Go to **app.pagescms.org** and open the portfolio.
2. Click **My Website**. You'll see sections: Intro & contact, Selected work, About me, etc.
3. Change any text, upload photos, add or drag to reorder projects.
4. Click **Save**. The live site updates in about a minute (refresh the page).

Tips:
- Leaving a field blank hides it on the site.
- In long text fields, leave an empty line between paragraphs.
- Every save is versioned in GitHub, so nothing is ever lost.

## Previewing locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. (Opening `index.html` directly won't work,
because the browser blocks loading `site.json` from a file.)
