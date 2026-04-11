import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { HOME_SITE_DESCRIPTION } from '../site-description';

export const GET: APIRoute = async (context) => {
  const now = Date.now();
  const posts = await getCollection(
    'blog',
    ({ data }) => !data.draft && !data.comingSoon && data.pubDate.valueOf() <= now,
  );
  posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'Will Germany — Blog',
    description: HOME_SITE_DESCRIPTION,
    site: context.site ?? 'https://blog.williamgermany.com',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/${post.id}/`,
    })),
    customData: '<language>en-us</language>',
  });
};
