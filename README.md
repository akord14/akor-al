# Akord.al – MVP (Next.js + Tailwind)

## Dev
```bash
npm install
npm run dev
```

## Deploy on Vercel
1) Create new project -> Import this folder (or push to GitHub then import).
2) Set **Root Directory** to `/`.
3) Build command: `next build` (default), Output: `.next` (default).
4) After first deploy, add your domain:
   - Add `akord.al` in Vercel -> Domains.
   - In your domain DNS create:
     - **A record** for `@` pointing to **76.76.21.21**
     - **CNAME** for `www` pointing to `cname.vercel-dns.com`
5) Wait for propagation and visit https://akord.al

## Notes
- This MVP does not persist data. To enable auth & DB next step is Supabase.
