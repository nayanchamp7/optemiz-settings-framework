
import React from 'react'
import ReactDOM from 'react-dom'

import Container from './components/Container'

window.addEventListener( 'DOMContentLoaded', function () {

    let optDashboardContainer = document.querySelector('.opt-main-container');

    // render the DOM
    ReactDOM.render(<Container />, optDashboardContainer)

} );