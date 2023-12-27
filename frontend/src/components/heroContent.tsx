import React from 'react';
import HeaderMenu from './header';
import BannerContent from './bannerContent';

interface BannerContentProps {
    showStartRentButton: boolean;
}

const HeroContent: React.FC<BannerContentProps> = ({ showStartRentButton }) => {
    return (
        <section id="heroContent" data-testid="heroContent">
            <HeaderMenu />
            <BannerContent showStartRentButton={showStartRentButton} />
        </section>
    );
}

export default HeroContent;
