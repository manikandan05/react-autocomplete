import React from 'react';
import styles from 'styled-components';

const Input = styles.input`
    width: 100%;
    height: 100%;
    text-indent: 10px;
    font-size:1.5rem;
`;

const InputBase = (props) => {
	const { handleValue, text, popupExpand, refObj } = props;
	return (
		<Input value={text}
			ref={refObj}
			onChange={(args) => handleValue(args)}
			id="selectList"
			aria-owns='selectList_popup'
			aria-controls='selectList_popup'
			role="combobox"
			autoComplete='off'
			aria-autocomplete='list'
			aria-expanded={popupExpand}
			placeholder='Select a value' />
	)
}
export default InputBase;