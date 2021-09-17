import axios from 'axios'
const authFetcher = (url: string, token: string) => {
	return axios.get(url, { headers: { Authorization: `Token ${token}` } }).then(res => res.data)
}

export default authFetcher