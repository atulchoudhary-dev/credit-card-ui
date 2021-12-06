import React, { Component } from 'react';
class ListCreditCardsComponent extends Component {
    render() {
        return (
            <div className="container">
                <h4 className="h4">Existing Cards</h4>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Card Number</th>
                                <th>Balance</th>
                                <th>Limit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.cards.map(
                                    (card, index) =>
                                        <tr key={index}>
                                            <td>{card.userName}</td>
                                            <td>{card.cardNumber}</td>
                                            <td>{card.currency === 'GBP' && '£'} {card.balance}</td>
                                            <td>{card.creditLimit}</td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListCreditCardsComponent
