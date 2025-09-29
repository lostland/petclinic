import express from 'express';
import cors from 'cors';
import path from 'path';
import { saveInquiry, InquiryPayload } from './db';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/inquiries', (request, response) => {
  const { name, email, petType, message } = request.body as InquiryPayload;

  if (!name || !email || !petType || !message) {
    return response.status(400).json({ message: '모든 필드를 입력해주세요.' });
  }

  try {
    saveInquiry({ name, email, petType, message });
    response.status(201).json({ message: '문의가 저장되었습니다.' });
  } catch (error) {
    console.error('Failed to save inquiry', error);
    response.status(500).json({ message: '문의 저장 중 오류가 발생했어요.' });
  }
});

const clientDistPath = path.resolve(__dirname, '../../dist');
app.use(express.static(clientDistPath));
app.get('*', (_request, response) => {
  response.sendFile(path.join(clientDistPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
