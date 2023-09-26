import React, { useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';    
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import PrintIcon from '@mui/icons-material/Print';
import IosShareIcon from '@mui/icons-material/IosShare';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './ShoppingList.css';

const ShoppingList = () => {
	
	const [item, setItem] = useState("");
	const [newItem, setNewItem] = useState([]);
    const {transcript, resetTranscript} = useSpeechRecognition();
	
    if(!SpeechRecognition.browserSupportsSpeechRecognition()){
        return null
    }

	const firstEvent = (event) => {
		setItem(event.target.value);
	}
	
	const secondEvent = () => {
		

		setNewItem((prev)=>{
			return [...prev, item]
		});
		
		setItem("");
		
	}
	
	const thirdEvent = () => {
		setNewItem([]);
	}

    const handle = () => {
        SpeechRecognition.stopListening();
        let words = transcript.split(' ');
        let final_list = [];
        let temp_list = [];
        for (let i = 0; i < words.length; i++) {
            if(words[i] === 'lb' || words[i] === 'oz') {
                temp_list.push(words[i]);
                final_list.push(temp_list.join(' '));
                temp_list = [];
                continue;
            }
            temp_list.push(words[i]);
        }
        console.log(final_list)
        console.log(words)
        for (let i = 0; i < final_list.length; i++) {
            setNewItem((prev)=>{
                return [...prev, final_list[i]]
            });
        }
        resetTranscript("");
    }

    const handlePrint = () => {
        var content = document.getElementById("shoppingList");
        console.log(content)
        var pri = document.getElementById("ifmcontentstoprint").contentWindow;
        console.log(content.innerHTML)
        pri.document.open();
        pri.document.write(content.innerHTML);
        pri.document.close();
        pri.focus();
        pri.print();
    }
	
    const handleShare = () => {

    }

	return(
		<div>
			<br />
			<br />
			<div className="childOne">
				<input type="text" value={item} placeholder="Add a task" onChange={firstEvent} />
				<Button className="AddBtn" onClick={secondEvent}>
					<AddIcon />
				</Button>
                <Button onClick={SpeechRecognition.startListening}>
                    <MicIcon />
                </Button>
                <Button onClick={handle}>
                    <StopIcon />
                </Button>
				<br />
				<br />
                <div id="shoppingList">
                    <ul className="textFont">
                        {
                            newItem.map((val) => {
                                return <li> {val} </li>;
                            })
                        }
                    </ul>
                </div>
                
                <div className="childTwo">
                <span style={{display: 'inline'}}>
                    <Button className="delBtn" onClick={thirdEvent}>
                        <DeleteIcon />Delete All
                    </Button>
                    <br /><br />
                    <Button className="delBtn" onClick={handlePrint}>
                        <PrintIcon />Print
                    </Button>
                    <br /><br />
                    <Button className="delBtn" onClick={handleShare}>
                        <IosShareIcon />Share
                    </Button>
                </span>
                </div>
			</div>
			<br />
			<br />
            <iframe id="ifmcontentstoprint" sx={{height: "0px", width: "0px", position: "absolute", display: 'hidden'}} ></iframe>
		</div>
	);
}

export default ShoppingList;