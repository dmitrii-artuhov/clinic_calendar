const saveToken = (tokenData) => {
	localStorage.setItem('accessToken', tokenData.accessToken);
	localStorage.setItem('expiresAt', tokenData.expiresAt);
}


export default saveToken;