import HeroContent from './components/heroContent'
import OurServiceContent from './components/ourServiceContent'
import WhyUsContent from './components/whyUsContent'
import TestimonialContent from './components/testimonialContent'
import CTAContent from './components/ctaContent'
import FAQContent from './components/faqContent'
import Footer from './components/footer'
import React from 'react';

import './styles/Style.css'

const LandingPage: React.FC = () => {
    return (
        <>
        <HeroContent showStartRentButton = {true}/>
        <OurServiceContent/>
        <WhyUsContent />
        <TestimonialContent />
        <CTAContent />
        <FAQContent />
        <Footer />
        </>
    );
}

export default LandingPage