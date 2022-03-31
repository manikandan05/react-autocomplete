import styles, { css } from 'styled-components';
import Spinner from '@mui/material/CircularProgress'

const Suggestion = styles.div`
    display: none;
    width: 100%;
    box-shadow: 2px 2px 2px 2px #000;
    min-height: 30px;
    overflow: auto;
    max-height: 200px;
    position: absolute;
    top: 80px;
    left: 0;
    background: #fff;
    ${({ isOpen }) => isOpen && css` display: block`}
`;

const UL = styles.ul`
    list-style: none;
    margin:0;
    padding:0;
`;

const LI = styles.li`
    height: 40px;
    width: 100%;
		line-height:40px;
    font-size:1.5rem;
    color:#000;
		text-align: left;
		text-indent: 10px;
    &:hover {
			color: #878484;
			background-color: #cccccc47;
			cursor: pointer;
    }
`;

const Popup = (props) => {
	const { options, isLoader, isOpen, onSelectHandler } = props;
	return (
		<Suggestion isOpen={isOpen}>
			{
				isLoader ? (
					<UL id="selectList_popup"><Spinner /></UL>
				) :
					<UL id="selectList_popup" role="listbox">
						{options?.entries?.length > 0 ? (
							options.entries.map((list, index) => {
								return (
									<LI role="option" key={list.API + '-' + index} onClick={(e) => onSelectHandler(list)}>{list.API}</LI>
								)
							})
						) : <LI role="option" key={"text"}>{"No Result Found"}</LI>
						}
					</UL>
			}
		</Suggestion>
	)
}

export default Popup;