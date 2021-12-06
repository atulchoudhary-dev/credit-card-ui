import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CreditCardDataService from '../service/CreditCardDataService';
import ListCreditCardsComponent from './ListCreditCardsComponent';
import ValidationUtils from '../util/ValidationUtils';

class AddCreditCardComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cards: [],
            errorMessage: '',
            successMessage: '',
            name: '',
            cardNumber: '',
            limit: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

    componentDidMount() {
        CreditCardDataService.retrieveAllCreditCards()//HARDCODED
            .then(
                response => {
                    this.setState({ cards: response.data })
                }
            ).catch(err => {
                this.setState({ errorMessage: 'Server Not Responding Error !!' });
            })

    }



    validate(values) {
        let errors = {}
        if (!values.name) {
            errors.name = 'Required';
        } else if (values.name.length > 15) {
            errors.name = 'Must be 15 characters or less';
        }
        if (!values.cardNumber) {
            errors.cardNumber = 'Required';
        } else if (!ValidationUtils.valid_credit_card_pattern(values.cardNumber)) {
            errors.cardNumber = 'Card number can only have number[0-9], dash [-], space[] and should be between 11 to 19 characters !';
        } else if (!ValidationUtils.valid_credit_card(values.cardNumber)) {
            errors.cardNumber = 'Not a valid card number';
        }

        if (!values.limit) {
            errors.limit = 'Required';
        } else if (!ValidationUtils.valid_credit_limit_pattern(values.limit)) {
            errors.limit = 'InValid Currency value. Should be in the format 00.00';
        }
        this.setState({ successMessage: '' });
        return errors

    }


    onSubmit(values, { resetForm }) {
        let card = {
            userName: values.name,
            cardNumber: values.cardNumber,
            creditLimit: values.limit
        }
        CreditCardDataService.createCreditCard(card)
            .then(response => {
                if (response.status === 201) {
                    let existingCard = this.state.cards;
                    existingCard.push(response.data);
                    this.setState({ cards: existingCard, errorMessage: '', name: '', cardNumber: '', limit: '', successMessage: 'Successfully created !' })
                    resetForm();
                }
            }).catch(err => {
                let errorMessage = JSON.stringify(err.response.data.message)
                this.setState({ errorMessage: errorMessage, successMessage: '' });
            })

    }

    render() {

        let { name, cardNumber, limit, cards, errorMessage, successMessage } = this.state
        return (
            <div>
                <h4 className="h4">Add</h4>
                <br />
                <div className="container">
                    <div className="text-danger" >
                        <h6>{errorMessage}</h6>
                    </div>
                    <div className="text-danger" >
                        <h6>{successMessage}</h6>
                    </div>
                    <Formik
                        initialValues={{ name, cardNumber, limit }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={true}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            ({ errors, touched, isValidating }) => (
                                <Form>
                                    <fieldset className="form-group">
                                        <label>Name</label>
                                        <Field className="form-control" type="text" name="name" />
                                        <ErrorMessage name="name" component="div" className="text-danger" />

                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Card Number</label>
                                        <Field className="form-control" type="text" name="cardNumber" />
                                        <ErrorMessage name="cardNumber" component="div" className="text-danger" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Limit</label>
                                        <Field className="form-control" type="text" name="limit" />
                                        <ErrorMessage name="limit" component="div" className="text-danger" />
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Add</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
                <br />
                <br />
                <ListCreditCardsComponent cards={cards} />
            </div>
        )
    }
}

export default AddCreditCardComponent