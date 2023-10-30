'use server'

import cryptoJS from 'crypto-js';

const getSignature = (data, key) => {
    return new Promise((resolve, reject) => {
        try {
            var signature = cryptoJS.HmacSHA256(data, key).toString(cryptoJS.enc.Hex);
            resolve(signature);
        } catch (error) {
            reject(error);
        }
    });
}

export default async function getData(localData) {
    const config = process.env;
    const stamp = Math.floor(Date.now() / 1000).toString();
    const identifierData = {
        stamp: `${stamp[7]}${stamp[9]}${stamp[8]}${stamp[6]}${stamp[5]}`,
        key: `${config.USER_UUID}`,
        method: `GET`
    };

    const requestOptions = {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
    }

    if (localData) {
        try {
            const localDataSign = await getSignature(localData, stamp);
            const identifierSign = await getSignature(JSON.stringify(identifierData), config.SECRET_KEY);
            const response = await fetch(`${config.API_URI}/journey/${config.USER_UUID}?validate=${localDataSign}&stamp=${stamp}&identifier=${identifierSign}`, requestOptions)

            if (!response.ok) { throw new Error("Failed to fetch data") }

            const responseJSON = await response.json()

            if (responseJSON.data) { return responseJSON.data }
            else { return false }
        } catch (error) {
            console.error(error);
            throw error
        }
    } else {
        try {
            const identifierSign = await getSignature(JSON.stringify(identifierData), config.SECRET_KEY);
            const response = await fetch(`${config.API_URI}/journey/${config.USER_UUID}?stamp=${stamp}&identifier=${identifierSign}`, requestOptions)

            if (!response.ok) { throw new Error("Failed to fetch data") }

            const responseJSON = await response.json();
            if (responseJSON.data) { return responseJSON.data }
            else { return false }
        } catch (error) {
            console.error(error);
            throw error
        }
    }
}