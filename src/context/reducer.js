import React, { useState, useReducer } from 'react';

export const initialState = {
	user: {},
    loading: true
};

export const AuthReducer = (initialState, action) => {
	switch (action.type) {
		case 'REQUEST_LOGIN':
			return {
				loading: true,
			};
		case 'LOGIN_SUCCESS':
			return {
				user: action.payload,
				loading: false,
			};
		case 'LOGOUT':
			return {
				user: {},
                loading: false
			};

		case 'LOGIN_ERROR':
			return {
				loading: false,
				errorMessage: action.error,
			};

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};