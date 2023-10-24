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

const FetchData = async (type, setData, setIsLoading, setIsError) => {
    const uuid = crypto.randomUUID();
    const stamp = Math.floor(Date.now() / 1000).toString();
    const localData = localStorage.getItem(`${type}_data`);
    if (localData){
        GetSignature(localData, stamp)
            .then(localDataSign => {
                GetNewContent(type, uuid, stamp, localDataSign)
                    .then((newContent) => {
                        if (newContent === false) { setData(JSON.parse(localData)) }
                        else { 
                            SetLocalStorage(JSON.stringify(newContent), `${type}_data`); 
                            setData(newContent); 
                        }
                    })
                    .catch(error => { 
                        FetchErrorHandler(error, type);
                        try {
                            setData(JSON.parse(localData));
                        } catch (error) {
                            setIsError(true);
                        }
                    })
            })
            .catch(error => { FetchErrorHandler(error, type); setIsError(true); })
            .finally(_ => { setIsLoading(false) })
    } else {
        GetNewContent(type, uuid, stamp)
            .then((newContent) => { SetLocalStorage(JSON.stringify(newContent), `${type}_data`); setData(newContent); })
            .catch(error => { FetchErrorHandler(error, type); setIsError(true); })
            .finally(_ => { setIsLoading(false) })
    }
};

const SetLocalStorage = (data, key) => {
    localStorage.setItem(key, data);
}

const FetchErrorHandler = (error, type) => {
    if (process.env.NEXT_PUBLIC_ENV === "development"){
        console.log(error);
    }
    console.error(`Failed to fetch new ${type} content`);
}

export { FetchData };