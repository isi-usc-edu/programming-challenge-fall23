import {finalGrammer, grammar as grammarList} from './GrammerList'
const checkBrowserCompatibility = () => {
    console.log("Checking Browser compactibility")
    let SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
    let SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList

    console.log(finalGrammer)
}

let SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
let SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
let moods = ['milk', 'fruits', 'cream', 'apple']
let grammar = '#JSGF V1.0; grammar moods; public <moods> = ' + moods.join(' | ') + ';';

let recognition = new SpeechRecognition()
let recognitionList = new SpeechGrammarList()
recognitionList.addFromString(grammarList, 1)
recognition.grammars = recognitionList

recognition.lang = 'en-US'
recognition.continuous = false;
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const renderSpeech = () => {
    console.log("Speak")
    recognition.start()
    recognition.onresult = (event) => {
        //handle result in here
        console.log("parsing")
        let word = event.results[0][0].transcript

        console.log(word)
    }
}



export {checkBrowserCompatibility, moods, grammar, recognition, recognitionList, renderSpeech};