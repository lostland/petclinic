import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/inquiry.css';

interface InquiryFormValues {
  name: string;
  email: string;
  petType: string;
  message: string;
}

const initialValues: InquiryFormValues = {
  name: '',
  email: '',
  petType: '',
  message: ''
};

const InquirySection = () => {
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        throw new Error('문의 접수에 실패했어요. 잠시 후 다시 시도해주세요.');
      }

      setValues(initialValues);
      setStatus('success');
      setFeedback('문의가 정상적으로 접수되었어요! 24시간 이내에 이메일로 안내드릴게요.');
    } catch (error) {
      setStatus('error');
      setFeedback((error as Error).message);
    }
  };

  return (
    <section className="inquiry">
      <div className="section-heading">
        <p className="section-badge">Smart Inquiry</p>
        <h2>3분이면 끝나는 스마트 상담 신청</h2>
        <p className="section-description">
          기본 정보를 남겨주시면 케어 매니저가 반려동물의 컨디션과 일정에 맞춘 맞춤 플랜을 제안드려요.
        </p>
      </div>
      <motion.form
        className="inquiry__form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
      >
        <div className="form-group">
          <label htmlFor="name">보호자 이름</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="보호자 성함을 입력해주세요"
            value={values.name}
            onChange={(event) => setValues({ ...values, name: event.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="연락 가능한 이메일을 입력해주세요"
            value={values.email}
            onChange={(event) => setValues({ ...values, email: event.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="petType">반려동물 타입</label>
          <select
            id="petType"
            name="petType"
            value={values.petType}
            onChange={(event) => setValues({ ...values, petType: event.target.value })}
            required
          >
            <option value="" disabled>
              반려동물을 선택해주세요
            </option>
            <option value="강아지">강아지</option>
            <option value="고양이">고양이</option>
            <option value="소동물">소동물</option>
          </select>
        </div>
        <div className="form-group form-group--full">
          <label htmlFor="message">문의 내용</label>
          <textarea
            id="message"
            name="message"
            placeholder="반려동물의 컨디션과 상담을 원하는 내용을 자유롭게 적어주세요"
            rows={5}
            value={values.message}
            onChange={(event) => setValues({ ...values, message: event.target.value })}
            required
          />
        </div>
        <motion.button
          type="submit"
          className="inquiry__submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? '전송 중...' : '문의 보내기'}
        </motion.button>
        {status !== 'idle' && (
          <p className={`inquiry__feedback inquiry__feedback--${status}`}>
            {feedback}
          </p>
        )}
      </motion.form>
    </section>
  );
};

export default InquirySection;
