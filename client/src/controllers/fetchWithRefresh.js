import axios from 'axios';

// controllers
import saveToken from './saveToken';

const fetchWithRefresh = async (url, method, options = {}) => {
	const accessToken = localStorage.getItem('accessToken');
	const refreshToken = localStorage.getItem('refreshToken');
	const expiresAt = localStorage.getItem('expiresAt');

	if(!accessToken || !refreshToken) {
		console.log('No token provided');
	}
	else if(Date.now() > expiresAt) {
		await axios.post('api/users/token', { refreshToken })
			.then((res) => {
				const tokenData = {
					accessToken: res.data.accessToken,
					expiresAt: res.data.expiresAt
				};

				saveToken(tokenData);

				options.headers = {
					'x-auth-token': tokenData.accessToken
				}
			})
			.catch((err) => {
				console.error(err);
			});

		return axios({
			url,
			method,
			...options
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.error(err);
		})

	} else {
		options.headers = {
			'x-auth-token': localStorage.getItem('accessToken')
		}

		return axios({
			url,
			method,
			...options 
		})
			.then((res) => {
				return res.data;
			})
			.catch((err) => {
				console.error(err);
			});
	}
}


export default fetchWithRefresh;

// https://habr.com/ru/post/456188/