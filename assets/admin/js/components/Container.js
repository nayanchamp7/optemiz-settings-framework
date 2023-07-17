import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios'
import QS from 'qs';
import NotificationSystem from 'react-notification-system';

import { Fragment, useState, useEffect, createRef, useRef } from "@wordpress/element";

import DashboardContext from '../context/DashboardContext';

import Header from './Header';
import Body from './Body';

export default function Container() {
    let notificationSystem = createRef();
    const runDataRef = useRef(false);

    const [apiData, setApiData] = useState({
        localData: opt_dashboard_data,
        settingsValue: {}
    });

    const [dataValue, setDataValue] = useState({});
    const [runData, setRunData] = useState(true);
    const [runX, setRunX] = useState('one');

    useEffect( () => {

        async function fetchAPIData() {
            if( runData ) {

                let dataValueObj = await optGetDefaultData();

                console.log(opt_dashboard_data.ajaxurl);
                var data = { action: 'opt_get_settings_data', key2:'value2' };

                axios.post(opt_dashboard_data.ajaxurl, QS.stringify( data ))
                .then( function (response) {
                    console.log(response);
                    let data = response.data;

                    if( data.success ) {
                        if( data.data.result.length > 0 ) {
                            console.log(data.data.result);

                            // dataValueObj = data.data.result;
                        }else {
                            dataValueObj = optGetDefaultData();
                        }
                    }

                    console.log(dataValueObj);

                    setDataValue(dataValueObj);

                })
                .catch(function (error) {
                    console.log(error);
                });

                setRunData(false);
            }
        }

        fetchAPIData();
    }, [runData])

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



    async function optGetDefaultData() {
        let field_data = {};
        let items = opt_dashboard_data.settings.form.items;

        console.log('cool');

        if( Object.keys(items).length > 0 ) {
            Object.keys(items).map( (items_key) => {
                let item = items[items_key];
                if( 'tabs' in item ) {
                    let tabs = item.tabs; //@TODO need to check `tabs` exists

                    Object.keys(tabs).map( (tab_key) => {

                        if( 'fields' in tabs[tab_key] ) {
                            let fields = tabs[tab_key].fields; //@TODO need to check `fields` exists

                            Object.keys(fields).map( (field_key) => {
                                let field           = fields[field_key];

                                if( 'name' in field && 'default_value' in field ) {
                                    let name            = field.name;
                                    let default_value   = field.default_value;

                                    field_data[name] = default_value;
                                }

                            });
                        }

                    });
                }

            });

            // console.log(field_data);

        }

        return field_data;
    }

    function saveData(event) {
        event.preventDefault();

        console.log("submited");
        console.log(dataValue);

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
        console.log(event.target.name);

        let name  = event.target.name;
        let value = event.target.value; //@TODO need to make eligible with array value

        let currentData = { ...dataValue };

        currentData[name] = value;

        setDataValue(currentData);
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
            <Body go={runData}/>
            <NotificationSystem ref={notificationSystem} style={NotiStyle}/>

        </DashboardContext.Provider>
    );
}