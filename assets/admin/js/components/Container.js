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
    const [saveData, setSaveData] = useState(false);
    const [runX, setRunX] = useState('one');

    useEffect( () => {

        async function fetchData() {
            if( runData ) {

                let defaultValues = await optGetDefaultData();
                let parsedValue = defaultValues;

                var data = {
                    action: 'opt_get_settings_data',
                    key: opt_dashboard_data.settings.key,
                };

                axios.post(opt_dashboard_data.ajaxurl, QS.stringify( data ))
                .then( function (response) {
                    let data = response.data;
                    let dataValueObj = {};

                    if( data.success ) {
                        if( data.data.values.length > 0 ) {
                            dataValueObj = JSON.parse(data.data.values);
                        }
                    }

                    // merge default values and database values
                    if( dataValueObj ) {
                        parsedValue = { ...defaultValues, ...dataValueObj };
                    }

                    console.log(parsedValue);

                    setDataValue(parsedValue);

                })
                .catch(function (error) {
                    console.log(error);
                });

                setRunData(false);
            }
        }

        fetchData();
    }, [runData])

    useEffect( () => {

        async function updateData() {
            if( saveData ) {

                var data = {
                    action: 'opt_update_settings_data',
                    key: opt_dashboard_data.settings.key,
                    value: dataValue
                };

                axios.post(opt_dashboard_data.ajaxurl, QS.stringify( data ))
                .then( function (response) {
                    console.log(response);
                    let data = response.data;
                    let dataValueObj = {};

                    if( data.success ) {
                        if( data.data.result.length > 0 ) {
                            console.log(data.data.result);

                            //@TODO need to be dynamic, database value
                            // dataValueObj = data.data.result;
                        }

                        const notification = notificationSystem.current;
                        notification.addNotification({
                            title: 'Success!', //@TODO need to be dynamic
                            message: 'Settings Saved', //@TODO need to be dynamic
                            level: 'success',
                            position: 'br',
                            autoDismiss: 2,
                        });
                    }

                })
                .catch(function (error) {
                    console.log(error);
                });

                setSaveData(false);
            }
        }

        updateData();
    }, [saveData])

    async function optGetDefaultData() {
        let field_data = {};
        let items = opt_dashboard_data.settings.form.items;

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

    function onSubmitData(event) {
        event.preventDefault();

        setSaveData(true);

    }

    function onChangeInput(event) {

        console.log("inside on change input");

        let { value, name, type, checked } = event.target;
        let currentData = { ...dataValue };

        console.log(checked);
        console.log(value);
        console.log(name);

        if( type === 'checkbox' || type === 'select' ) {
            // remove `[]` parenthesis from the name
            name = name.replace(/[\])}[{(]/g, '');

            // get the old values
            let oldValues = currentData[name];

            if (checked) {
                // add to the list
                currentData[name] = [
                    ...oldValues,
                    value,
                ];
            } else {
                // remove from list
                currentData[name] = oldValues.filter((oldValue) => oldValue !== value);
            }

        }else {
            currentData[name] = value;
        }

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
            value={{apiData, onSubmitData, dataValue, onChangeInput}}
        >
            <Header />
            <Body go={runData}/>
            <NotificationSystem ref={notificationSystem} style={NotiStyle}/>

        </DashboardContext.Provider>
    );
}