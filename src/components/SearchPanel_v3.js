import React, { useEffect, useState } from "react";
import { Fragment } from "react";

import { createPortal } from 'react-dom';
import ModalContent_v1 from './ModalContent_v1.js';

import "./css/style.css";
import frame_4806 from "./img/Frame_4806.png";
import frame_4807 from "./img/Frame_4807.png";
import frame_4815 from "./img/Frame_4815.png";

function SearchPanel_v3() {
    const [usersList, setUsersList] = useState([]);
    //itemModal содержание карточки для модального окна
    const [itemModal, setItemModal] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [stringSearch, setStringSearch] = useState('');
    const [filteredUsersList, setFilteredUsersList] = useState([]);

    function CardModal() {
        return (
            <>
                {showModal && createPortal(
                    <ModalContent_v1 onClose={() => setShowModal(false)} contentModal={itemModal} />,
                    document.body
                )}
            </>
        )
    }

    function handleClickOutside(event) {
        const domModalNode = document.querySelector("#modal");
        const domRootNode = document.querySelector("#root");
        const domSectionNode = document.querySelector("#section");
        const domBodyNode = document.body;
        console.log('event.target', event.target);
        console.log('domModalNode: ', domModalNode);
        console.log('domRootNode: ', domRootNode);
        console.log('showModal', showModal);
        console.log('domBodyNode: ', domBodyNode);

        // console.log("domRootNode.contains(event.target): ", domRootNode.contains(event.target));
        // console.log("domBodyNode.contains(event.target): ", domBodyNode.contains(event.target));
        // console.log("domModalNode.contains(event.target): ", domModalNode.contains(event.target));

        if ((showModal && (domBodyNode.contains(event.target))) ||
            (!showModal && domBodyNode == event.target) ||
            (!showModal && domSectionNode == event.target)
        )
        {
            setShowModal(false);
            document.removeEventListener('click', handleClickOutside, false);
        }
    }

    async function getUsersList() {
        //запрос полного списка пользователей
        const url = "http://127.0.0.1:3000"

        let response = await fetch(url,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
        if (response.ok) {
            let resultJSON = await response.json();
            console.log('resultJSON in getUsersList: ', resultJSON);
            setUsersList(resultJSON);
        } else {
            alert('ошибка HTTP in fetch: ' + response.status);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        console.log("function handleSubmit working");
        console.log("stringSearch in handleSubmit: ", stringSearch);
        //запрос отфильтрованного списка пользователей
        
        // читаем данные формы
        const form = event.target;
        const formData = new FormData(form);
        console.log('formData from handleSubmit: ', formData);

        const urlSearch = "http://127.0.0.1:3000/?term=" + stringSearch;

        let response = await fetch(urlSearch,
            {
                method: form.method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                body: formData,
                },
            });
        if (response.ok) {
            let resultJSON = await response.json();
            console.log('resultJSON in handleSubmit: ', resultJSON);
            setUsersList(resultJSON);
        } else {
            alert('ошибка HTTP in fetch: ' + response.status);
        }
    }
    
    useEffect(() => {
        getUsersList();
    }, []);  

    return (
        <React.Fragment>
            <body>
                <div className="container">
                    <section id="section" className="section-main">
                        <div className="main-search">
                            <form method="get" onSubmit={handleSubmit} className="main-search-form">
                                <input
                                    type="text"
                                    value={stringSearch}
                                    onChange={event => setStringSearch(event.target.value)}
                                    placeholder="enter string in name to filter"
                                    id="search"
                                    className="main-search-input" />
                                <img src={frame_4815} className="main-search-img"/>
                            </form>
                        </div>
                        <div className="main-card-row">
                            {usersList.map(item => (
                                <div key={item.name + item.address} className="main-cards-all">
                                    <div className="main-card" onClick={() => {
                                        setShowModal(true);
                                        console.log('item: ', item);
                                        setItemModal(item);
                                        document.addEventListener('click', handleClickOutside, false);
                                       
                                    }}>
                                        <div className="main-card-name-text">{item.name}</div>
                                        <div className="main-card-phone">
                                            <div className="main-card-phone-img"><img src={frame_4806} /></div>
                                            <div className="main-card-phone-text">{item.phone}</div>
                                        </div>
                                        <div className="main-card-email">
                                            <div className="main-card-email-img"><img src={frame_4807} /></div>
                                            <div className="main-card-email-text">{item.email}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                            )}
                        </div>
                    </section>
                </div>
                <CardModal />
            </body>
        </React.Fragment>
    );
}

export default SearchPanel_v3;
