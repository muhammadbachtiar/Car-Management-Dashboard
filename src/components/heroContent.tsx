import HeaderMenu from "./header";
import BannerContent from "./bannerContent";

interface BannerContentProps {
    showStartRentButton: boolean;
  }
  

function HeroContent({showStartRentButton} : BannerContentProps){
    return (
        <section id="heroContent">
            <HeaderMenu />
            <BannerContent showStartRentButton = {showStartRentButton} />
        </section>
    );
}

export default HeroContent;