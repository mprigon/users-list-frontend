import React from "react";
import "./css/style.css";
import icon from "./img/icon.png";


function ModalContent_v1(props) {
    console.log('itemContent from ModalContent_v1', props.contentModal)

    return (
        <>
            <div id="modal" className="main-card-modal">
                <div className="main-card-modal-name">
                        <div className="main-card-modal-name-text">{ props.contentModal.name }</div>
                        <button type="button" className="main-card-modal-btn" onClick={ props.onClose }><img src={ icon } className="main-card-modal-name-img"alt="Close"/></button>
                </div>
                <div className="main-card-modal-details">
                    <div className="main-card-modal-details-headers"> 
                        <div className="main-card-modal-details-headers-row">Телефон:</div>
                        <div className="main-card-modal-details-headers-row">Почта:</div>
                        <div className="main-card-modal-details-headers-row">Дата приема:</div>
                        <div className="main-card-modal-details-headers-row">Должность:</div>
                        <div className="main-card-modal-details-headers-row">Подразделение:</div>
                    </div>
                    <div className="main-card-modal-details-info">
                        <div className="main-card-modal-details-info-row">{ props.contentModal.phone }</div>
                        <div className="main-card-modal-details-info-row">{ props.contentModal.email }</div>
                        <div className="main-card-modal-details-info-row">{ props.contentModal.hire_date }</div>
                        <div className="main-card-modal-details-info-row modal-details-position">{ props.contentModal.position_name }</div>
                        <div className="main-card-modal-details-info-row">{ props.contentModal.department }</div>
                    </div>
                </div>
                    <div className="main-card-modal-additional">
                        <div className="main-card-modal-additional-header">Дополнительная информация:</div>
                    <div className="main-card-modal-additional-info">Разработчики используют текст в качестве заполнителя макта страницы. Разработчики используют текст в качестве заполнителя макта страницы.</div>
                </div>
            </div>
        </>
    );
}

export default ModalContent_v1;
