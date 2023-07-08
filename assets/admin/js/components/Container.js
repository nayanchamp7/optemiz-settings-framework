import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios'
import NotificationSystem from 'react-notification-system';

import { Fragment, useState, useEffect, createRef } from "@wordpress/element";

import DashboardContext from '../context/DashboardContext';

import Header from './Header';
import Body from './Body';

export default function Container() {
    let notificationSystem = createRef();

    const [apiData, setApiData] = useState({
        localData: opt_dashboard_data,
        settingsValue: {}
    });

    const [dataValue, setDataValue] = useState([]);

    const [getAPIData, setGetAPIData] = useState(true);

    useEffect( () => {

        async function fetchAPIData() {

            //console.log("very first");
            //console.log(apiData);

            if( getAPIData ) {
                //await getData();
            }
        }

        fetchAPIData();

    }, [getAPIData] )

    async function getData(url = '') {

        if( ! opt_dashboard_data.homeurl ) {
            return;
        }

        if( ! url ) {
            url = opt_dashboard_data.homeurl + "/wp-json/storepress/v1/wpf/patterns";
        }

        await Promise.all([
            fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(function(response) {
                return response.json();
            })
            .then( function(response) {
                //console.log(response);

                setApiData(response);
            })
        ]);

        setGetAPIData(false);
    }

    function saveData(event) {
        event.preventDefault();

        console.log("submited");

        const notification = notificationSystem.current;
        notification.addNotification({
            title: 'Success!', //@TODO need to be dynamic
            message: 'Settings Saved', //@TODO need to be dynamic
            level: 'success',
            position: 'br',
            autoDismiss: 2,
        });

        //let form = document.querySelector('.opt-dashboard-form');

        //console.log(Array.from(form.elements));


        // let elements = Array.from(form.elements).filter(tag => ["select", "textarea", "input"].includes(tag.tagName.toLowerCase()));
        // elements.forEach( (element) => {
        //     //console.log(element.value);
        // })



        //let formData = new FormData(form);

        //let data = Array.from(formData);

        //let keys = formData.keys();

        //console.log(formData.entries());
        //console.log(keys);

        // const formDataObj = {};
        // formData.forEach((value, key) => (formDataObj[key] = value));
        // console.log(formDataObj);

        // for (var key of keys) {
        //     // console.log("something");
		// 	console.log(key)

        //     let values = formData.getAll(key);

        //     console.log(values);
		// }

        // formData.set("opt_dashboard_data[opt_frontend]", "five");

        // for (var key of formData.entries()) {
        //     // console.log("something");
		// 	console.log(key[0] + ', ' + key[1])
		// }

    }

    function onChangeInput(event) {
        event.preventDefault();

        console.log("inside on change input");
        console.log(event.target.value);
    }

    let NotiStyle = {
        Containers: {
            DefaultStyle: {
                width: '260px',
            },
            br: {
                top: 'auto',
                bottom: '30px',
                left: 'auto',
                right: '50px'
            },
        },
        NotificationItem: {
            DefaultStyle: {
                borderTop: '',
                borderLeft: '5px solid #4abe61',
                margin: '10px 0px 0px 0px',
                padding: '15px',
                borderRadius: '5px',
            },
            success: {
                color: '#5B616F',
                backgroundColor: '#fff',
            }
        },
        Title: {
            DefaultStyle: {
                fontSize: '16px',
                fontWeight: '600'
            },
            success: {
                color: '#24A148'
            },
        }
    }

    return (
        <DashboardContext.Provider
            value={{apiData, saveData, dataValue, onChangeInput}}
        >
            <Header />
            <Body />
            <NotificationSystem ref={notificationSystem} style={NotiStyle}/>

        </DashboardContext.Provider>
    );
}