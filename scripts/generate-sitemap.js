import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { Readable } from 'stream';

// Define your website routes
const routes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/umrah-visa', changefreq: 'weekly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.5 },
  { url: '/special-offers', changefreq: 'weekly', priority: 0.8 },
  { url: '/popular-packages', changefreq: 'weekly', priority: 0.8 },
  { url: '/explore-by-theme', changefreq: 'weekly', priority: 0.7 },
];

// Create a stream to write to
const stream = new SitemapStream({ hostname: 'https://nisatravels.com' });

// Return a promise that resolves with your XML string
const sitemap = streamToPromise(Readable.from(routes).pipe(stream)).then((data) =>
  data.toString()
);

// Write the sitemap to a file
sitemap.then((xmlString) => {
  createWriteStream('./public/sitemap.xml').write(xmlString);
  console.log('Sitemap generated successfully!');
}); 