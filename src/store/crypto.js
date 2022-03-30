import CryptoJS from "crypto-js"

/**
 * Encrypt the message in argument.
 * The message will be sent to the API et decrypted there.
 * @param message
 * @returns {*}
 */
export default function encrypt (message) {
    return CryptoJS.AES.encrypt(message, process.env.VUE_APP_FRONT_SECRET).toString();
}
