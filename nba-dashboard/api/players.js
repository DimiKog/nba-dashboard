const { Client } = require('@notionhq/client');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const notion = new Client({ auth: process.env.NOTION_TOKEN });
    const today = new Date().toISOString().split('T')[0];
    const response = await notion.databases.query({
      database_id: process.env.DB_RESULTS,
      filter: { property: 'date', date: { equals: today } }
    });
    res.json(response.results);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
