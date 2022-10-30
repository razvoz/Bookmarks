import { Router } from 'express';
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';
const router = Router();

router.get('/get', async ({ query: { url } }, res) => {
  try {
    const response = await fetch(url),
          body = await response.text();

    const html = parse(body),
          title = html.querySelector("title").textContent,
          desriptionTag = html.querySelector("meta[name=description]"),
          description = desriptionTag
            ? desriptionTag.getAttribute("content")
            : null;

    res.status(200).json({
      title,
      description
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error'
    });
  }
})

export default router;
