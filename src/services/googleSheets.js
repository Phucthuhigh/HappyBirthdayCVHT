const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEETS_ID;
const RANGE = import.meta.env.VITE_GOOGLE_SHEETS_RANGE || 'Form Responses 1!A:B';

export async function fetchWishes() {
  if (!API_KEY || !SHEET_ID || API_KEY === 'your_api_key_here') {
    return null;
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(RANGE)}?key=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Google Sheets API error: ${response.status}`);
  }

  const data = await response.json();
  const rows = data.values || [];

  // Skip header row (first row from form responses)
  const wishes = rows.slice(1).map((row, index) => ({
    id: index + 1,
    name: row[0] || 'Ẩn danh',
    message: row[1] || '',
  })).filter(wish => wish.message.trim() !== '');

  return wishes;
}
