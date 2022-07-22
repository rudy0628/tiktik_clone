import React from 'react';
import { AiOutlineUser, AiOutlineClose } from 'react-icons/ai';
import io from 'socket.io-client';
import usePostStore from '../../store/postStore';

interface IProps {
	usersNum: number;
}

const InfoBar = ({ usersNum }: IProps) => {
	const { setChatroomIsOpen } = usePostStore();

	const clickHandler = () => {
		let socket = io('https://socketio-chatroom-rudy.herokuapp.com/');
		socket.emit('disconnection');
		socket.off();
		setChatroomIsOpen(false);
	};

	return (
		<div className="py-3 px-4 bg-[#F51997] flex justify-between items-center">
			<p className="text-white text-md font-semibold flex items-center gap-4">
				<AiOutlineUser className="text-xl" />
				{usersNum}
			</p>
			<button onClick={clickHandler}>
				<AiOutlineClose className="text-white" />
			</button>
		</div>
	);
};

export default InfoBar;
