# Dr. Monika Kumal — Academic Website

A responsive, static academic and professional profile website for **Dr. Monika Kumal**, configured for `monikakumal.com.np`.

## Hosting architecture

- GitHub: source-code repository and version history.
- Cloudflare Pages: free static hosting and automatic deployment from GitHub.
- Cloudflare DNS: domain DNS management, HTTPS, and CDN.

No build step or framework is required. Cloudflare Pages serves the `public/` directory directly.

## 1. Replace the profile photograph

1. Prepare a professional portrait image, ideally JPG or WebP, with a portrait crop (4:5 recommended).
2. Rename it `profile.jpg` or `profile.webp`.
3. Upload it to `public/assets/images/`.
4. In `public/index.html`, find:
   ```html
   <img src="/assets/images/profile-placeholder.svg"
   ```
   and change the source to:
   ```html
   <img src="/assets/images/profile.jpg"
   ```
5. Update the alt text to accurately describe the photograph, e.g. `Portrait of Dr. Monika Kumal`.

Use a photograph you have permission to publish. Compress it to keep the page fast.

## 2. Personalise your profile

Edit `public/index.html` and replace the clearly generic starter text in these sections:

- About: biography, qualifications, education and professional interests.
- Research: actual research themes and current projects.
- Experience: verified appointments, institutions, locations and dates.
- Teaching: actual teaching, mentorship and presentations.
- Awards: verified awards, scholarships and distinctions.

Do not publish placeholder or unverified credentials.

## 3. Add professional links and email (optional)

Edit `public/assets/js/site.js`:

```js
const SITE_CONFIG = {
  email: "your-public-contact-email@example.com",
  links: {
    orcid: "https://orcid.org/YOUR-ORCID",
    scholar: "YOUR-GOOGLE-SCHOLAR-PROFILE-URL",
    linkedin: "YOUR-LINKEDIN-PROFILE-URL"
  }
};
```

Leave a value as an empty string (`""`) if you do not want that link displayed. The website does not create or host an email inbox.

## 4. Add publications

Edit `public/assets/js/publications.js`. Add one object per verified publication to the `window.PUBLICATIONS` array:

```js
window.PUBLICATIONS = [
  {
    year: "2025",
    title: "Full article title",
    authors: "A. Author, B. Author",
    journal: "Journal Name",
    doi: "https://doi.org/10.xxxx/xxxxx"
  }
];
```

Use a DOI URL or another stable public article URL in `doi`. Ensure author order, title, journal and publication status are accurate.

## 5. Add your academic CV

Replace `public/documents/academic-cv-placeholder.txt` with your PDF named exactly:

`academic-cv.pdf`

The CV link on the home page already points to `/documents/academic-cv.pdf`. Do not upload a CV containing private information you do not want public.

## 6. Preview locally

You can open `public/index.html` in a browser for a quick preview. For a more reliable local preview, run a static server from the project root:

```bash
python -m http.server 8000 --directory public
```

Then visit `http://localhost:8000`.

## 7. Publish to GitHub

1. Create a **public** GitHub repository named `personal-website`.
2. Upload the contents of this project folder (the `public` folder and `README.md`) to the repository root.
3. Commit the files to the `main` branch.

The repository should look like:

```text
personal-website/
├── public/
│   ├── index.html
│   ├── assets/
│   ├── documents/
│   ├── robots.txt
│   └── sitemap.xml
└── README.md
```

## 8. Deploy on Cloudflare Pages

1. Sign in to Cloudflare Dashboard.
2. Go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Authorise GitHub and select `personal-website`.
4. Set:
   - Production branch: `main`
   - Framework preset: `None`
   - Build command: leave blank
   - Build output directory: `public`
5. Select **Save and Deploy**.
6. Wait for the deployment to complete. Cloudflare gives you a `*.pages.dev` preview URL.

Each push to `main` triggers a new deployment.

## 9. Connect `monikakumal.com.np`

For an apex/root domain such as `monikakumal.com.np`, Cloudflare Pages requires the domain to be added as a Cloudflare zone and its nameservers to be pointed to Cloudflare.

1. In Cloudflare, choose **Add a domain** and enter `monikakumal.com.np`.
2. Select the Free plan and review the DNS scan.
3. Cloudflare displays two assigned authoritative nameservers.
4. Sign in to the Nepal `.np` registry at https://register.com.np/.
5. Open the domain's DNS/nameserver modification page and replace the current nameservers with the exact two Cloudflare nameservers.
6. Submit the change and wait for the registry and Cloudflare to confirm activation. Do not guess or copy example nameservers from a tutorial.
7. In Cloudflare Pages, open the project → **Custom domains** → **Set up a custom domain**.
8. Add `monikakumal.com.np`. Add `www.monikakumal.com.np` as a second custom domain if desired.
9. Follow Cloudflare's prompts and wait for DNS and certificate provisioning.

**DNS caution:** Before changing nameservers, inspect existing DNS records. If the domain already has mail or other services, recreate the required MX, TXT, and other records in Cloudflare DNS before switching. This project is configured as website-only, but the domain may have pre-existing records.

## 10. Final checks

- [ ] `https://monikakumal.com.np` loads.
- [ ] `https://www.monikakumal.com.np` loads if configured.
- [ ] HTTPS certificate is active.
- [ ] Profile photo is correct and has descriptive alt text.
- [ ] Biography and qualifications are accurate.
- [ ] Publications and DOI links are verified.
- [ ] CV opens and contains only intended public information.
- [ ] ORCID / Scholar / LinkedIn links work.
- [ ] Site is usable on a phone.
- [ ] No placeholder text remains.

## Notes

- This is a static website; it does not require a database, server-side runtime, or paid hosting.
- The contact section uses a `mailto:` link when you add an email address. It is not a contact-form backend.
- Do not publish patient-identifiable information, private phone numbers, home addresses, or confidential documents.
- Cloudflare and GitHub free-plan terms and quotas may change; check their current plan pages.
