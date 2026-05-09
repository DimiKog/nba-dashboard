module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const today = new Date().toISOString().split('T')[0];
    const r = await fetch(
      `https://api.notion.com/v1/databases/${process.env.DB_PLAYERS}/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          filter: { property: 'date', date: { equals: today } }
        })
      }
    );
    const data = await r.json();
    res.json(data.results || []);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};