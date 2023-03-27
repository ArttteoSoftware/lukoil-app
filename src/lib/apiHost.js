import React, { Fragment, useState, useEffect } from 'react';
import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { isEmpty } from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';

const http = axios.create({
	timeout: 10000,
	withCredentials: false
});

const useQueryApiHost = async (options) => {
    const token = await AsyncStorage.getItem('access_token');
    
    const rr = await http(`http://192.168.100.2:3001/api${options.endpoint}`, {
        method: options.method,
        params: options?.method === 'get' || !options?.method ? options?.body : null,
        data: options?.method !== 'get' ? options?.body : null,
        headers: {
            'Authorization': `Bearer ${!isEmpty(token) ? token : null}`
        } 
    }).then(response => {
        return response.data;
    }).catch( async (error) => {
        let err = error.response;
        if (err.status == 401 || (err.status == 500 && err.data.message == 'Token has expired' || err.data.message == 'The token has been blacklisted')) {
        
        }
        throw error.response.data;
    });
    
    return rr;
}

export const apiHost = (options) => {
    return new Promise((resolve, reject) => {
        useQueryApiHost(options).then((response) => resolve(response)).catch((err) => {
            reject(err)
        })
    });
}

export default apiHost;