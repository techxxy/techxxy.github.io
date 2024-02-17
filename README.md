This project is based on [chronark.com](https://github.com/chronark/chronark.com).

Chronark.com is built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Upstash](https://upstash.com?ref=chronark.com), [Contentlayer](https://www.contentlayer.dev/), and deployed to [Vercel](https://vercel.com/).

I removed the page view counter feature and deployed it to GitHub Pages.

This project utilizes [Contentlayer](https://www.contentlayer.dev/). By simply creating an MDX file in the `content/projects` directory, a new project post is generated on the Project pages. However, the top three featured pages need to be selected and hardcoded in `App > projects > pages.tsx`.

Please note that changing the names of these three files will render deployment on GitHub Pages impossible. It is a bug that I cannot fix myself. Pull requests are more than welcome.
