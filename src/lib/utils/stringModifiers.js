export function formatPhoneNumber(phoneNumberString) {
    if (phoneNumberString.length == 11) {

        return `${phoneNumberString.slice(0, 4)}-${phoneNumberString.slice(4, 7)}-${phoneNumberString.slice(7, 11)}`
    }
    else if (phoneNumberString.length == 10) {

        return `${phoneNumberString.slice(0, 3)}-${phoneNumberString.slice(3, 6)}-${phoneNumberString.slice(6, 10)}`
    }
    return phoneNumberString;
}

export function noDashPhoneNumber(phoneNumberString) {
    let res = phoneNumberString?.split("-").join("");
    return res ?? ""
}