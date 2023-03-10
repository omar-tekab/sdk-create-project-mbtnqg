import sdk, { Project } from '@stackblitz/sdk';

import './styles.css';
import { javascriptProject } from './templates/javascript';
import { nodeProject } from './templates/node';

const PROJECTS = {
  javascript: javascriptProject,
  node: nodeProject,
};

let project: Project = PROJECTS.javascript;

/**
 * Embed the project
 */
async function embedProject() {
  sdk.embedProject(
    'embed',
    {
      title: 'Node Starter',
      description: 'A basic Node.js project',
      template: 'node',
      files: {
        'app.js': `const git = require('isomorphic-git'); const http = require('isomorphic-git/http/node'); const fs = require('fs'); // Import the fs module async function cloneRepo() { try { await git.clone({ fs, http, dir: './node_modules/@@tekab-dev-team/storybook-devfactory', url: 'https://github.com/omar-tekab/sfdev', ref: 'main', }); console.log('Repository cloned successfully!'); } catch (error) { console.error('Failed to clone repository', error); } } cloneRepo();`,
        '.stackblitzrc': `{ "startCommand": "mkdir aa" }`,
        'public/index.html': `console.log('Hello World!)';`,
        'index.html': `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <link rel="icon" href="/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Vite App</title>
          </head>
          <body>
            <div id="app"></div>
            <script type="module" src="/src/main.js"></script>
          </body>
        </html>`,
        'tsconfig.json': `{ "compilerOptions": { "target": "esnext", "useDefineForClassFields": true, "module": "esnext", "moduleResolution": "node", "strict": true, "jsx": "preserve", "sourceMap": true, "resolveJsonModule": true, "esModuleInterop": true, "lib": ["esnext", "dom"] }, "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"] }`,
        'vite.config.js': `import { defineConfig } from 'vite'
        import vue from '@vitejs/plugin-vue'
        
        // https://vitejs.dev/config/
        export default defineConfig({
          plugins: [vue()]
        })`,
        'src/main.js': `import { createApp } from 'vue'
        import App from './App.vue'
        
        createApp(App).mount('#app')`,
        'src/App.vue': `<template>
        <div id="app"><h1>Vue Composition API</h1></div>
      </template>
      <script setup></script>
      <style>
      #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
      }
      </style>`,
        'package.json': `{
          "name": "vite-js",
          "version": "0.0.0",
          "scripts": {
            "dev": "vite",
            "build": "vite build",
            "serve": "vite preview"
          },
          "dependencies": {
            "vue": "^3.2.11",
            "isomorphic-git":"*",
            "@vitejs/plugin-vue": "^1.6.0",
            "@vue/compiler-sfc": "^3.2.11",
            "vite": "^2.4.4"
          },
      "stackblitz": { "installDependencies": true, "startCommand": " mkdir aa && npm install && npm i isomorphic-git && npm run dev" }
    }`,
      },
    },
    {
      height: 400,
      openFile: 'src/main.js',
      terminalHeight: 50,
    }
  );
}

/**
 * Open the project in a new window on StackBlitz
 */
function openProject() {
  sdk.openProject(project, {
    openFile: 'index.js',
  });
}

/**
 * Select a project to embed or open
 */
function setTemplate(element: HTMLSelectElement) {
  const key = element.value;
  const target = document.getElementById('embed');

  if (PROJECTS[key]) {
    project = PROJECTS[key];
    // Redo embedding if already embedded
    if (target && target.tagName === 'IFRAME') {
      embedProject();
    }
  } else {
    console.warn('Unknown project: ' + key);
  }
}

// Make our methods available in HTML
(window as any).demo = {
  embedProject,
  openProject,
  setTemplate,
};
