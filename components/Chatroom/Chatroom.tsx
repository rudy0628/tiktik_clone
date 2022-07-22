import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { IMessage, IChatUser } from '../../type';

import InfoBar from './InfoBar';
import Input from './Input';
import Messages from './Messages';

interface IProps {
	name: string;
	room: string;
}

let socket: any;

const Chatroom = ({ name, room }: IProps) => {
	const [usersNum, setUsersNum] = useState(0);
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState<IMessage[]>([]);
	const ENDPOINT = 'https://socketio-chatroom-rudy.herokuapp.com/';

	useEffect(() => {
		socket = io(ENDPOINT);

		socket.emit(
			'join',
			{
				name,
				room,
			},
			(error: string) => {
				if (error === 'Username is taken') {
					socket.emit('disconnection');
					socket.off();
					socket.emit('join', { name, room }, () => {});
				}
			}
		);

		return () => {
			socket.emit('disconnection');
			socket.off();
		};
	}, [name, room]);

	useEffect(() => {
		socket.on('message', (message: IMessage) => {
			setMessages([...messages, message]);
		});
	}, [messages]);

	useEffect(() => {
		socket.on(
			'roomData',
			({ room, users }: { room: any; users: IChatUser[] }) => {
				setUsersNum(users.length);
			}
		);
	}, []);

	const sendMessage = (event: any) => {
		event.preventDefault();

		if (message) {
			socket.emit('sendMessage', message, () => setMessage(''));
		}
	};

	console.log(message, messages);

	return (
		<div className="fixed h-[50vh] w-[50vw] top-[50%] left-[50%] bg-white z-50 translate-x-[-50%] translate-y-[-50%] rounded-xl overflow-hidden flex flex-col justify-between">
			<InfoBar usersNum={usersNum} />
			<Messages name={name} messages={messages} />
			<Input
				message={message}
				setMessage={setMessage}
				sendMessage={sendMessage}
			/>
		</div>
	);
};

export default Chatroom;
