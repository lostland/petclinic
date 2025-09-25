const path = require('path');
const fs = require('fs');
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const db = new sqlite3.Database(path.join(DATA_DIR, 'petclinic.db'));
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      admin_note TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  db.run(`CREATE TRIGGER IF NOT EXISTS update_inquiries_updated_at
    AFTER UPDATE ON inquiries
    BEGIN
      UPDATE inquiries SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;
  `);
});

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2b$10$XwWmpcSjyrFlfy4750lzwOJFOmk2975tsQaBJ/LB3///DpiDjWDjW';
const SESSION_SECRET = process.env.SESSION_SECRET || 'petclinic-secret';
const ALLOWED_STATUSES = new Set(['new', 'in_progress', 'completed']);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    name: 'petclinic.sid',
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 4,
    },
  })
);

app.use(express.static(path.join(__dirname, 'public')));

const requireAdmin = (req, res, next) => {
  if (req.session && req.session.isAdmin) {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized' });
};

app.post('/api/inquiries', (req, res) => {
  const { name, phone, message } = req.body;
  if (!name || !phone || !message) {
    return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
  }
  const stmt = db.prepare(
    'INSERT INTO inquiries (name, phone, message) VALUES (?, ?, ?)'
  );
  stmt.run(name.trim(), phone.trim(), message.trim(), function (err) {
    if (err) {
      console.error('Failed to save inquiry', err);
      return res
        .status(500)
        .json({ message: '문의 저장 중 오류가 발생했습니다.' });
    }
    return res.status(201).json({ message: '문의가 접수되었습니다!', id: this.lastID });
  });
  stmt.finalize();
});

app.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: '아이디와 비밀번호를 입력해주세요.' });
  }
  if (username !== ADMIN_USERNAME) {
    return res.status(401).json({ message: '계정을 확인해주세요.' });
  }
  const isValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  if (!isValid) {
    return res.status(401).json({ message: '계정을 확인해주세요.' });
  }
  req.session.isAdmin = true;
  req.session.username = username;
  return res.json({ message: '로그인 성공', username });
});

app.post('/admin/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('petclinic.sid');
    res.json({ message: '로그아웃 되었습니다.' });
  });
});

app.get('/api/admin/session', (req, res) => {
  if (req.session && req.session.isAdmin) {
    return res.json({ authenticated: true, username: req.session.username });
  }
  return res.json({ authenticated: false });
});

app.get('/api/admin/inquiries', requireAdmin, (req, res) => {
  db.all(
    'SELECT id, name, phone, message, status, admin_note, created_at, updated_at FROM inquiries ORDER BY created_at DESC',
    (err, rows) => {
      if (err) {
        console.error('Failed to fetch inquiries', err);
        return res
          .status(500)
          .json({ message: '문의 목록을 불러오는 중 오류가 발생했습니다.' });
      }
      return res.json({ inquiries: rows });
    }
  );
});

app.patch('/api/admin/inquiries/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const { status, admin_note } = req.body;
  if (!status && typeof admin_note === 'undefined') {
    return res.status(400).json({ message: '업데이트할 정보를 입력해주세요.' });
  }
  const updates = [];
  const params = [];
  if (status) {
    if (!ALLOWED_STATUSES.has(status)) {
      return res.status(400).json({ message: '올바른 상태 값을 입력해주세요.' });
    }
    updates.push('status = ?');
    params.push(status);
  }
  if (typeof admin_note !== 'undefined') {
    updates.push('admin_note = ?');
    params.push(admin_note);
  }
  params.push(id);
  const query = `UPDATE inquiries SET ${updates.join(', ')} WHERE id = ?`;
  db.run(query, params, function (err) {
    if (err) {
      console.error('Failed to update inquiry', err);
      return res
        .status(500)
        .json({ message: '문의 업데이트 중 오류가 발생했습니다.' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: '해당 문의를 찾을 수 없습니다.' });
    }
    return res.json({ message: '문의가 업데이트되었습니다.' });
  });
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.use((req, res, next) => {
  if (
    req.method === 'GET' &&
    !req.path.startsWith('/api') &&
    !req.path.startsWith('/admin') &&
    req.accepts('html')
  ) {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
  return next();
});

app.use((req, res) => {
  res.status(404).json({ message: '요청하신 리소스를 찾을 수 없습니다.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
