import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const createOrGetUser = async (response: any, addUser: any) => {
	const decoded: { name: string; picture: string; sub: string; email: string } =
		jwtDecode(response.credential);
	const { name, picture, sub, email } = decoded;
	const user = {
		_id: sub,
		_type: 'user',
		userName: name,
		image: picture,
		email: email,
	};

	// add user in current state Zustand
	addUser(user);

	// call api to create an user
	await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`, user);
};
