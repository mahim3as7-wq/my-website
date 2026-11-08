import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
// The exam app lives in /exams and is built into dist/exams.
// The portfolio files are copied into dist/ by scripts/build-site.mjs, so everything is ONE site on ONE domain.
export default defineConfig({root:'exams',base:'./',plugins:[react()],build:{outDir:'../dist/exams',emptyOutDir:true}})
