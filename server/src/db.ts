import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dataDirectory = path.resolve(__dirname, '../data');
const databaseFile = path.join(dataDirectory, 'inquiries.db');

if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory, { recursive: true });
}

const db = new Database(databaseFile);

db.prepare(`
  CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    pet_type TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`).run();

export interface InquiryPayload {
  name: string;
  email: string;
  petType: string;
  message: string;
}

const insertStatement = db.prepare<InquiryPayload>(`
  INSERT INTO inquiries (name, email, pet_type, message)
  VALUES (@name, @email, @petType, @message)
`);

export const saveInquiry = (payload: InquiryPayload) => {
  return insertStatement.run(payload);
};

export default db;
