Place your resume PDF in this folder so the site can serve it at `/resume.pdf`.

Steps:

1. Add your resume file here and name it `resume.pdf`.
2. Run a local type-check and build to verify:

   ```bash
   npx tsc --noEmit
   npm run build
   ```

3. Open the site locally (`npm run dev`) and visit the Resume page to confirm the viewer shows your PDF.

If you want, I can run the build and type-check for you after you add the file.