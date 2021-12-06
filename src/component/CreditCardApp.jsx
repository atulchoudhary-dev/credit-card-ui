import React, { Component } from 'react';
import AddCreditCardComponent from './AddCreditCardComponent';

class CreditCardApp extends Component {
    render() {
        return (<>
            <h3 className="h3">Credit Card System</h3>
            <br />
            <AddCreditCardComponent />
        </>
        )
    }
}

export default CreditCardApp