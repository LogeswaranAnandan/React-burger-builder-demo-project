import { ValidationRules } from "../models/Interface";
import Constants from "../constants/constants";

const checkFieldValidity = (rules: ValidationRules, value: string) => {
    let errorMessage = null;
    for (let rule in rules) {
        if (!errorMessage) {
            switch (rule) {
                case Constants.VALIDATION_RULES.REQUIRED:
                    if (value.toString().trim() === '') {
                        errorMessage = Constants.ERROR_MESSAGE.REQUIRED
                    }
                    break;
                case Constants.VALIDATION_RULES.MIN_LENGTH:
                    if (value.toString().trim().length < rules[rule]) {
                        errorMessage = Constants.ERROR_MESSAGE.MIN_LENGTH
                    }
                    break;
                case Constants.VALIDATION_RULES.MAX_LENGTH:
                    if (value.toString().trim().length > rules[rule]) {
                        errorMessage = Constants.ERROR_MESSAGE.MAX_LENGTH
                    }
                    break;
                default:
                    errorMessage = Constants.ERROR_MESSAGE.REQUIRED
                    break;
            }
        }
    }
    return errorMessage;
}

export default checkFieldValidity;