class ValidationUtils {


    valid_credit_limit_pattern(value) {
        var isValid = false;
        var regex = /^(\d+(?:\.\d{0,2}))$/;
        if ((regex.test(value))) {
            isValid = true;
        }
        return isValid;
    }

    valid_credit_card_pattern(value) {
        var isValid = false;
        if ((/^[0-9\s-]+/.test(value)) && (value.length >= 11 && value.length <= 19)) {
            isValid = true;
        }
        return isValid;
    }

    valid_credit_card(value) {
        // The Luhn Algorithm.
        var nCheck = 0, nDigit = 0, bEven = false;
        value = value.replace(/\D/g, "");

        for (var n = value.length - 1; n >= 0; n--) {
            var cDigit = value.charAt(n),
                nDigit = parseInt(cDigit, 10);

            if (bEven) {
                if ((nDigit *= 2) > 9) nDigit -= 9;
            }

            nCheck += nDigit;
            bEven = !bEven;
        }

        return (nCheck % 10) === 0;
    }

}

export default new ValidationUtils()