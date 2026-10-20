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

## Hosting

Live at **https://bohyunbh.github.io**. The repo is `bohyunbh/bohyunbh.github.io`,
and GitHub serves a repo with that exact name at the top level. It's published by
GitHub Pages from `main` / root (**Settings → Pages**), and every push redeploys it.

- To let someone else help edit: **Settings → Collaborators → Add people**.
- Optional: buy a domain such as `bohyunpark.com` and set it in **Settings → Pages → Custom domain**.

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
