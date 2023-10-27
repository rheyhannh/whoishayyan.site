'use server'

import cryptoJS from 'crypto-js';

const GetNewContent = async (stamp, data = null) => {
    const config = process.env;

    try {
        const signData = {
            stamp: `${stamp[7]}${stamp[9]}${stamp[8]}${stamp[6]}${stamp[5]}`,
            key: `${config.USER_UUID}`,
            method: `GET`
        };

        const token = cryptoJS.HmacSHA256(JSON.stringify(signData), config.SECRET_KEY).toString(cryptoJS.enc.Hex);

        const response = await (
            data
                ? fetch(`${config.API_URI}/journey/${config.USER_UUID}?validate=${data}&stamp=${stamp}&identifier=${token}`, {
                    method: "GET",
                    mode: "cors",
                    cache: "no-cache",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                : fetch(`${config.API_URI}/journey/${config.USER_UUID}?stamp=${stamp}&identifier=${token}`, {
                    method: "GET",
                    mode: "cors",
                    cache: "no-cache",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
        );

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const { data: newData } = await response.json();
        return newData;
        
    } catch (error) {
        throw error;
    }
};

export default GetNewContent;