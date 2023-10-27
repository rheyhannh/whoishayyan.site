'use client'

import cryptoJS from 'crypto-js';
import GetNewContent from './_ServerHelper';

const GetSignature = (data, key) => {
    return new Promise((resolve, reject) => {
        try {
            var signature = cryptoJS.HmacSHA256(data, key).toString(cryptoJS.enc.Hex);
            resolve(signature);
        } catch (error) {
            reject(error);
        }
    });
}

const FetchData = async (type, setData, setLoading, setError) => {
    const stamp = Math.floor(Date.now() / 1000).toString();
    const localData = localStorage.getItem(`_data`);
    if (localData) {
        GetSignature(localData, stamp)
            .then(localDataSign => {
                GetNewContent(stamp, localDataSign)
                    .then((newContent) => {
                        if (!newContent) {
                            if (type) { setData(JSON.parse(localData)[type]) }
                            else { setData(JSON.parse(localData)) }
                        }
                        else {
                            SetLocalStorage(JSON.stringify(newContent), `_data`);
                            if (type) { setData(newContent[type]) }
                            else { setData(newContent) }
                        }
                    })
                    .catch(_ => {
                        console.error(`Failed to fetch new data`)
                        try {
                            const data = JSON.parse(localData);
                            if (type) {
                                if (data[type]) { setData(data[type]) }
                                else { throw new Error(`Local ${type} data not found`) }
                            }
                            else {
                                if (data) { setData(data) }
                                else { throw new Error(`Local data not found`) }
                            }
                        } catch (error) {
                            if (type) { console.error(`Failed to load local ${type} data`); setError(true); }
                            else { console.error(`Failed to load local data`) }
                        }
                    })
            })
            .catch(_ => {
                console.error(`Failed to fetch new data`)
                if (type) { setError(true); }
            })
            .finally(_ => { if (type) { setLoading(false); } })
    } else {
        GetNewContent(stamp)
            .then((newContent) => {
                SetLocalStorage(JSON.stringify(newContent), `_data`);
                if (type) { setData(newContent[type]) }
                else { setData(newContent) }
            })
            .catch(_ => {
                if (type) { console.error(`Failed to fetch new ${type} data`); setError(true); }
                else { console.error(`Failed to fetch new data`) }
            })
            .finally(_ => { if (type) { setLoading(false); } })
    }
};

const SetLocalStorage = (data, key) => {
    localStorage.setItem(key, data);
}

const FetchErrorHandler = (error, type) => {
    if (process.env.NEXT_PUBLIC_ENV === "development") {
        console.log(error);
    }
    console.error(`Failed to fetch new ${type} content`);
}

export { FetchData };