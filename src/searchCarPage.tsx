import Footer from "./components/footer";
import HeroContent from "./components/heroContent";
import SearchCarAndCardCar from "./components/searcAndCardCar";


import './styles/Style.css'

function SearchCarPage (){
    return(
        <>
        <HeroContent showStartRentButton={false} />
        <SearchCarAndCardCar/>
        <Footer />
        </>
    );
}

export default SearchCarPage;