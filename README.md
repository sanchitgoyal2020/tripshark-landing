# Trip Website - Next.js + Sanity CMS + Vercel

This is a modern website development environment configured with:
- **[Next.js](https://nextjs.org/)** (App Router, Tailwind CSS, TypeScript)
- **[Sanity CMS](https://www.sanity.io/)** (Embedded Studio)
- **[Vercel](https://vercel.com/)** (Ready for deployment)

## Getting Started

### 1. Configure Sanity CMS
1. Go to [Sanity.io](https://www.sanity.io/) and create an account or log in.
2. Create a new project or get your existing Project ID.
3. Open the `.env.local` file in this repository and add your Project ID:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
   NEXT_PUBLIC_SANITY_DATASET="production"
   ```

### 2. Run the Development Server
Install dependencies (if not already done) and start the local development server:
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your Next.js app.
Open [http://localhost:3000/studio](http://localhost:3000/studio) to access your Sanity Studio CMS!

### 3. Deploy to Vercel
This project is configured out-of-the-box for Vercel. 
1. Push this code to a GitHub, GitLab, or Bitbucket repository.
2. Import the repository into your Vercel dashboard.
3. Add your `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` into the **Environment Variables** section on Vercel.
4. Click **Deploy**!

---

### Customizing your CMS
You can find and modify your Sanity schema inside `src/sanity/schema.ts`. Adding new document types will automatically update the Studio at `/studio`.
