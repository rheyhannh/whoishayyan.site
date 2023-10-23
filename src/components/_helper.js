'use server'

import cryptoJS from 'crypto-js';

const GetIdentifier = async (type, uuid, stamp) => {
    try {
        const signData = {
            type: `${type}`,
            stamp: `${stamp[1]}${stamp[2]}${stamp[4]}${stamp[3]}${stamp[5]}${stamp[7]}${stamp[6]}`,
            uuid: `${uuid}`
        }

        var token = cryptoJS.HmacSHA1(JSON.stringify(signData), process.env.SECRET_KEY).toString(cryptoJS.enc.Hex);
    } catch (error) {
        console.log(error);
        return -1;
    }

    return token;
}

export default GetIdentifier;