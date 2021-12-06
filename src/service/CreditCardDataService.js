import axios from 'axios'

const CREDIT_CARD_API_URL = 'http://localhost:9090'
const GET_ALL_CARDS_API_URL = `${CREDIT_CARD_API_URL}/credit-card-api/v1`

class CreditCardDataService {

    retrieveAllCreditCards() {
        return axios.get(`${GET_ALL_CARDS_API_URL}/cards`);
    }

    createCreditCard(card) {
        return axios.post(`${GET_ALL_CARDS_API_URL}/cards`, card);
    }
}

export default new CreditCardDataService()