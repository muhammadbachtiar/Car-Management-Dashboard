import HeaderAdmin from "./components/headerAdmin";
import SidebarAdmin from "./components/sidebarAdmin";
import AddNewCarContent from "./components/addCarContentAdmin";
import React from 'react';

import "./styles/SidebarAdmin.css";
import "./styles/ListCarManagement.css";

const AddCarPageAdmin: React.FC = () => {
    return (
        <div className="d-flex" id="wrapper">
            <SidebarAdmin/>
            <div id="page-content-wrapper">
                <HeaderAdmin/>
                <AddNewCarContent/>
            </div>
        </div>
    );
}

export default AddCarPageAdmin