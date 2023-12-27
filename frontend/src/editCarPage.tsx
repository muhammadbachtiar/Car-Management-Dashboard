import HeaderAdmin from "./components/headerAdmin";
import SidebarAdmin from "./components/sidebarAdmin";
import EditCarContent from "./components/editCarContent";
import React from "react";

import "./styles/SidebarAdmin.css"
import "./styles/ListCarManagement.css"


const EditCarPage: React.FC = () => {
    return (
        <div className="d-flex" id="wrapper">
            <SidebarAdmin/>
            <div id="page-content-wrapper">
                <HeaderAdmin/>
                <EditCarContent/>
            </div>
        </div>
    );
}

export default EditCarPage