import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import { JSDOM } from 'jsdom';
import { optimize } from 'svgo';

import getToken from './lib/umami/getToken';
import getViews from './lib/umami/getViews';
import getWebsite from './lib/umami/getWebsite';
import XYChart from './packages/xy-chart';
import getBaseURL from './utils/getBaseURL';
import getShareToken from './utils/getShareToken';
import { replaceSVGContentFilterWithCamelcase } from './utils/replaceSVGContentFilterWithCamelcase';

const app = express();

app.use(cors());

app.get('/svg', async (req, res) => {
  try {
    const { shareURL, theme, transparent } = req.query as {
      shareURL?: string;
      theme?: 'light' | 'dark';
      transparent?: unknown;
    };

    if (!shareURL) return res.status(400).send('Missing shareURL');

    const shareId = getShareToken(shareURL);
    if (!shareId) return res.status(400).send('Invalid shareId');

    const websiteAPI = getBaseURL(shareURL);

    const tokenResponse = await getToken(websiteAPI, shareId);
    if (!tokenResponse)
      return res.status(400).send('Failed to get share token');
    const { token, websiteId } = tokenResponse;

    const website = await getWebsite(websiteAPI, websiteId, token);
    if (!website)
      return res.status(500).send('Failed to get website information');

    const views = await getViews(websiteAPI, websiteId, token);
    if (!views) return res.status(500).send('Failed to get views');
    const { pageviews } = views;

    const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
    const body = dom.window.document.querySelector('body')!;
    const svg = dom.window.document.createElement(
      'svg',
    ) as unknown as SVGSVGElement;

    if (!dom || !body || !svg)
      res.status(500).send('Failed to mock dom with JSDOM');

    const width = 1_000;

    body.append(svg);
    svg.setAttribute('width', String(width));
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    XYChart(
      svg,
      {
        title: 'Website Views',
        xLabel: 'Date',
        yLabel: 'Views',
        data: {
          datasets: [
            {
              label: website.domain,
              logo: '',
              data: pageviews
                .map((pageview) => ({
                  x: new Date(pageview.x),
                  y: pageview.y,
                }))
                .sort((a, b) => b.x.getTime() - a.x.getTime()),
            },
          ],
        },
        showDots: false,
        theme: theme || 'dark',
        transparent: !!transparent,
      },
      {
        chartWidth: width,
      },
    );

    const svgContent = replaceSVGContentFilterWithCamelcase(svg.outerHTML);
    const optimized = optimize(svgContent, { multipass: true }).data;

    res
      .setHeader('content-type', 'image/svg+xml;charset=utf-8')
      .setHeader('cache-control', 'max-age=60, must-revalidate')
      .setHeader('date', String(new Date()))
      .setHeader('expires', String(new Date(Date.now() + 60_000)))
      .send(optimized);
  } catch (error) {
    console.warn(error);
    if (!res.headersSent) res.status(500).send('Server error');
  } finally {
    // end request if something happened
    if (!res.headersSent) res.status(520).send('Unknown');
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on :${port}`));
