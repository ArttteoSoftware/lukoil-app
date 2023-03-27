export async function loginUser(dispatch, data) {
    dispatch({ type: 'REQUEST_LOGIN' });
}

export async function setCurrentUser (dispatch, user) {
    dispatch({ type: 'LOGIN_SUCCESS', payload: user });
}

export async function logout(dispatch) {
	dispatch({ type: 'LOGOUT' });
}