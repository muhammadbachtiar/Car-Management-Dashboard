import CardWhyUs from "./cardWhyUs.";
import { Container, Row, Col } from 'react-bootstrap';

function WhyUsContent(){
    return(
        <section className="whyUsContent" id="whyUsContent">
        <Container>
          <Row className="justify-content-around">
            <Col md={12} className="align-self-star whyUsContent-Head">
              <h3 className="text-center text-md-start fw-bolder">Why Us?</h3>
              <p className="text-center text-md-start">Mengapa harus pilih Binar Car Rental?</p>
            </Col>
            <Col md={12} className="align-self-center whyUsContent-Content">
              <Row className="whyUsContent-Content-Card g-3">
                    <CardWhyUs
                    title="Mobil Lengkap"
                    description="Tersedia banyak pilihan mobil, kondisi masih baru, bersih dan terawat"
                    iconClass="fa-regular fa-thumbs-up" 
                    spanBackgroundColor="#F9CC00"
                    />
                    <CardWhyUs
                    title="Harga Murah"
                    description="Harga murah dan bersaing, bisa bandingkan harga kami dengan rental mobil lain"
                    iconClass="fa-solid fa-tag" 
                    spanBackgroundColor="#FA2C5A"
                    />
                    <CardWhyUs
                    title="Layanan 24 Jam"
                    description="Siap melayani kebutuhan Anda selama 24 jam nonstop. Kami juga tersedia di akhir minggu"
                    iconClass="fa-regular fa-clock" 
                    spanBackgroundColor="#0D28A6"
                    />
                    <CardWhyUs
                    title="Sopir Profesional"
                    description="Sopir yang profesional, berpengalaman, jujur, ramah, dan selalu tepat waktu"
                    iconClass="fa-solid fa-award" 
                    spanBackgroundColor="#5CB85F"
                    />
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    );

}
export default WhyUsContent;
