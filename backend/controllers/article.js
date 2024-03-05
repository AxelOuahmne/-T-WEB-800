let Parser = require('rss-parser');
let parser = new Parser();

exports.getArticles = async (req, res) => {
  const myParams = req.query

  try {
    let feedUrls
    if (myParams && myParams.params) {
      const pref = myParams.params.split(',');
      feedUrls = pref.map(lmt => { return `https://coinjournal.net/fr/actualites/category/${lmt}/feed/` });
    } else {
      feedUrls = [`https://coinjournal.net/fr/actualites/feed/`]
    }
    
    const feeds = await Promise.all(feedUrls.map(feedUrl => parser.parseURL(feedUrl)));
    const allItems = feeds.flatMap(feed => feed.items);

    const feedInfo = {
      items: allItems.map(item => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        description: item.contentSnippet,
        categories: item.categories,
      })),
    };

    res.json(feedInfo);
  } catch (error) {
    console.error('Error fetching or parsing RSS feed:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
