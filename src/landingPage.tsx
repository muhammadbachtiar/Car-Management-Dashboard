import HeroContent from './components/heroContent'
import OurServiceContent from './components/ourServiceContent'
import WhyUsContent from './components/whyUsContent'
import TestimonialContent from './components/testimonialContent'
import CTAContent from './components/ctaContent'
import FAQContent from './components/faqContent'
import Footer from './components/footer'

import './styles/Style.css'

function LandingPage(){
    return (
        <>
        <HeroContent showStartRentButton = {true}/>
        <OurServiceContent />
        <WhyUsContent />
        <TestimonialContent />
        <CTAContent />
        <FAQContent />
        <Footer />
        </>
    );
}

export default LandingPage