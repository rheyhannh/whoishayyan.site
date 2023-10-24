'use server'

import cryptoJS from 'crypto-js';

const GetNewContent = async (type, uuid, stamp, data = null) => {
    const config = process.env;

    try {
        const signData = {
            type: `${type}`,
            stamp: `${stamp[1]}${stamp[2]}${stamp[4]}${stamp[3]}${stamp[5]}${stamp[7]}${stamp[6]}`,
            uuid: `${uuid}`,
        };

        const token = cryptoJS.HmacSHA1(JSON.stringify(signData), config.SECRET_KEY).toString(cryptoJS.enc.Hex);

        const response = await (
            data
                ? fetch(`${config.API_URI}/${uuid}?stamp=${stamp}&type=${type}&identifier=${token}`, {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        [stamp]: data,
                    }),
                })
                : fetch(`${config.API_URI}/${uuid}?stamp=${stamp}&type=${type}&identifier=${token}`, {
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

        return response.json();
    } catch (error) {
        throw error;
    }
};

export default GetNewContent;