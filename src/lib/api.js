import React, { Fragment, useState, useEffect } from 'react';
import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { isEmpty } from 'lodash';
import XMLParser from 'react-xml-parser';

const http = axios.create({
	timeout: 10000,
	withCredentials: false
});


const useQueryApi = async (options) => {
    const rr = await http(`http://212.72.138.61:9091/CustomerWs/Service?wsdl`, {
        method: 'POST',
        data: options.body,
        headers: {
            'Content-Type': 'text/xml'
        } 
    }).then(response => {
        var xml = new XMLParser().parseFromString(response.data); 
        var res = xml.getElementsByTagName(options.xmp);
        return res;
    }).catch( async (error) => {
        
        let err = error.response;
        if (err.status == 401) {

        } 
        throw error.response.data;
    });
    
    return rr;
}

export const myApi = (options) => {
    return new Promise((resolve, reject) => {
        useQueryApi(options).then((response) => resolve(response)).catch((err) => {
            reject(err)
        })
    });
}

export default myApi;