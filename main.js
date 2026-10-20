// Renders content/site.json into the page. Empty fields are hidden automatically,
// so leaving something blank in the editor simply removes it from the site.

const get = (obj, path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === "") continue;
    if (k === "class") node.className = v;
    else node.setAttribute(k, v);
  }
  for (const child of children.flat()) {
    if (child == null || child === "") continue;
    node.append(child instanceof Node ? child : document.createTextNode(child));
  }
  return node;
}

// Split text on blank lines into paragraphs.
const paragraphs = (text = "") =>
  text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean).map((p) => el("p", {}, p));

function bindSimpleFields(data) {
  document.querySelectorAll("[data-text]").forEach((node) => {
    const value = get(data, node.dataset.text);
    if (value) node.textContent = value;
    else node.hidden = true;
  });
  document.querySelectorAll("[data-href]").forEach((node) => {
    const value = get(data, node.dataset.href);
    if (value) node.href = value;
    else node.hidden = true;
  });
  document.querySelectorAll("[data-href-email]").forEach((node) => {
    const value = get(data, node.dataset.hrefEmail);
    if (value) node.href = `mailto:${value}`;
    else node.hidden = true;
  });
  document.querySelectorAll("[data-src]").forEach((node) => {
    const value = get(data, node.dataset.src);
    if (value) node.src = value;
  });
  document.querySelectorAll("[data-show]").forEach((node) => {
    if (!get(data, node.dataset.show)) node.hidden = true;
  });
}

function renderProjects(projects = []) {
  const root = document.getElementById("projects");
  if (!projects.length) return (document.getElementById("work").hidden = true);
  projects.forEach((p, i) => {
    const card = el(
      "article",
      { class: "project" },
      p.image
        ? el("img", { class: "project-image", src: p.image, alt: p.title, loading: "lazy" })
        : el("div", { class: "project-image placeholder", "aria-hidden": "true" }, String(i + 1).padStart(2, "0")),
      el(
        "div",
        { class: "project-body" },
        el("p", { class: "project-meta" }, [p.client, p.year].filter(Boolean).join(" · ")),
        el("h3", {}, p.title),
        el("p", {}, p.summary),
        p.results?.length
          ? el("ul", { class: "results" }, p.results.map((r) =>
              el("li", {}, el("strong", {}, r.value), el("span", {}, r.label))))
          : null,
        p.tags?.length ? el("ul", { class: "tags" }, p.tags.map((t) => el("li", {}, t))) : null,
        p.link ? el("a", { class: "project-link", href: p.link, target: "_blank", rel: "noopener" }, "See the work →") : null
      )
    );
    root.append(card);
  });
}

function renderAbout(about = {}) {
  document.getElementById("about-body").append(...paragraphs(about.body));
  const facts = document.getElementById("facts");
  (about.facts || []).forEach((f) => facts.append(el("div", {}, el("dt", {}, f.label), el("dd", {}, f.value))));
}

function renderExperience(items = []) {
  const root = document.getElementById("timeline");
  if (!items.length) return (document.getElementById("experience").hidden = true);
  items.forEach((x) =>
    root.append(
      el(
        "li",
        {},
        el("div", { class: "timeline-dates" }, x.dates),
        el(
          "div",
          {},
          el("h3", {}, x.role, x.company ? el("span", { class: "at" }, ` · ${x.company}`) : null),
          el("p", { class: "muted" }, x.location),
          el("p", {}, x.description)
        )
      )
    )
  );
}

function renderBeyond(items = []) {
  const root = document.getElementById("beyond-list");
  if (!items.length) return (document.getElementById("beyond").hidden = true);
  items.forEach((b) =>
    root.append(
      el(
        "article",
        { class: "beyond-item" },
        b.image ? el("img", { src: b.image, alt: b.title, loading: "lazy" }) : null,
        el(
          "div",
          {},
          el("h3", {}, b.title),
          el("p", { class: "muted" }, b.subtitle),
          el("p", {}, b.description),
          b.link ? el("a", { href: b.link, target: "_blank", rel: "noopener" }, "Learn more →") : null
        )
      )
    )
  );
}

async function init() {
  // no-cache so edits show up right after the site redeploys
  const res = await fetch("content/site.json", { cache: "no-cache" });
  const data = await res.json();

  if (data.profile?.name) document.title = data.profile.name;
  if (data.profile?.accentColor) document.documentElement.style.setProperty("--accent", data.profile.accentColor);

  bindSimpleFields(data);
  renderProjects(data.projects);
  renderAbout(data.about);
  renderExperience(data.experience);
  renderBeyond(data.beyond);
  document.getElementById("year").textContent = new Date().getFullYear();
  document.body.classList.add("ready");
}

init().catch((err) => {
  console.error(err);
  document.body.classList.add("ready");
  document.querySelector("main").prepend(
    el("p", { class: "wrap error" }, "Couldn't load the site content. If you just edited it, check content/site.json for a typo.")
  );
});
