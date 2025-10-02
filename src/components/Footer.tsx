import '../styles/footer.css';

interface FooterProps {
  currentYear: number;
}

const Footer = ({ currentYear }: FooterProps) => {
  return (
    <footer className="footer">
      <div className="footer__brand">
        <span className="footer__logo">서울 펫 클리닉 센터</span>
        <p>젊은 보호자를 위한 24시 프리미엄 동물의료 파트너</p>
      </div>
      <div className="footer__info">
        <p>서울특별시 송파구 위례성대로 14길 24 · 지상 2F</p>
        <p>상담 02-7777-1234 · 24시 응급 010-9876-5432</p>
      </div>
      <div className="footer__copyright">
        © {currentYear} Seoul Pet Clinic Center. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
