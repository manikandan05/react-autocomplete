import React, { useState, useRef, useCallback } from 'react';
import debounce from 'loadsh/debounce';
import InputBase from './InputBase';
import Popup from './Popup';
import axios from 'axios';

import styles from 'styled-components';

const Wrapper = styles.div`
    display: block;
    width:100%;
    height: 60px;
    position: relative;
`;

const url = axios.create({
	baseURL: 'https://api.publicapis.org/',
});

const processList = (word) => {
	let result = [];
	if (word) {
		result = url.get(`/entries?title=${word}`).then((res) => {
			return res.data;
		}).catch((error) => {
			return error;
		});
	}
	return result;
}

const AutoComplete = () => {
	const [text, setText] = useState('');
	const [isLoader, setLoader] = useState(false);
	const [dataList, setList] = useState([]);
	const [isExpand, setExpand] = useState(false);
	const inputRef = useRef();

	const fetchValue = async (args) => {
		if (args.target.value) {
			setLoader(true);
			setText(args.target.value);
			setExpand(true);
			let list = await processList(args.target.value);
			setList(list);
			setLoader(false);
		} else {
			setText(args.target.value);
			setList([]);
		}
	}

	const debounceValue = useCallback(debounce((newVal) => fetchValue(newVal), 500), []);

	const handleValue = (args) => {
		if (args.target.value) {
			setText(args.target.value);
			debounceValue(args);
		} else {
			setText(args.target.value);
			setList([]);
			setExpand(false);
		}
	}

	const onSelectHandler = (args) => {
		setText(args?.API);
		setExpand(false);
	}

	return (
		<Wrapper>
			<InputBase refObj={inputRef} handleValue={handleValue} text={text} popupExpand={isExpand} />
			<Popup options={dataList} isLoader={isLoader} isOpen={isExpand} onSelectHandler={onSelectHandler} />
		</Wrapper>
	)
}
export default AutoComplete;