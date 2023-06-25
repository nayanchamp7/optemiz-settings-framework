import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios'

import { Fragment, useState, useEffect } from "@wordpress/element";

import DashboardContext from '../context/DashboardContext';

import Header from './Header';
import Body from './Body';

export default function Container() {

    const [apiData, setApiData] = useState({
        localData: opt_dashboard_data,
        settingsValue: {}
    });
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

        let form = document.querySelector('.opt-dashboard-form');

        //console.log(Array.from(form.elements));


        let elements = Array.from(form.elements).filter(tag => ["select", "textarea", "input"].includes(tag.tagName.toLowerCase()));
        elements.forEach( (element) => {
            //console.log(element.value);
        })



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

    return (
        <DashboardContext.Provider value={{apiData, saveData}}>
            <Header />
            <Body />

        </DashboardContext.Provider>
    );
}