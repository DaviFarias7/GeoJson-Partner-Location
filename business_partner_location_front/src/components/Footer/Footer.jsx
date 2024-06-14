import instagramImg from './instagram.svg';
import linkedinImg from './linkedin.svg';
import './styles.css';

function Footer() {
  return (
    <footer className="main-footer">
      App desenvido por Davi Farias
      <div className="footer-icons">
        <a href="https://www.instagram.com/davic.farias7/" target="_new">
          <img src={instagramImg} alt="instagramImg" className="instagramImg" />
        </a>
        <a
          href="https://www.linkedin.com/in/davi-farias-14560321b/"
          target="_new"
        >
          <img src={linkedinImg} alt="linkedinImg" className="linkedinImg" />
        </a>
      </div>
    </footer>
  );
}
export default Footer;
