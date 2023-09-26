import React, { useEffect, useState } from 'react';

const SpeechRecognitionComponent = ({originalList, addItems}) => {
  const [transcript, setTranscript] = useState('');
  const [transcripts, setTranscripts] = useState([]);
  const [ isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);

  // Function to calculate Levenshtein distance between two strings
function getLevenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
  
    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
  
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
  
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        const cost = a[j - 1] === b[i - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }
  
    return matrix[b.length][a.length];
  }

  

  const createFinalList = (recognizedList) => {
    // Set a threshold for similarity
    const similarityThreshold = 2; // Adjust as needed

    // Create a final list of similar items
    const finalList = [];
    for (const recognizedItem of recognizedList) {
    for (const originalItem of originalList) {
        const distance = getLevenshteinDistance(recognizedItem.toLowerCase(), originalItem.toLowerCase());
        if (distance <= similarityThreshold) {
        finalList.push(originalItem);
        break; // Move to the next recognized item
        }
    }
    }

    addItems(finalList)
  }

  useEffect(() => {
    // Check for browser support
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const recognitionInstance =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionObj = new recognitionInstance();

      recognitionObj.lang = 'en-US'; // Set the language you want to recognize

      recognitionObj.onresult = (event) => {
        const result = event.results[0][0].transcript;
        setTranscript(result);
        setTranscripts((prevTranscripts) => [
          ...prevTranscripts,
          ...result.split(' '), // Split recognized phrase into words
        ]);
        console.log("DD")
        createFinalList(result.split(' '))
      };

      recognitionObj.onend = () => {
        if (isRecording) {
          // If recording is still active, restart recognition
          recognitionObj.start();
        }
      };

      setRecognition(recognitionObj);
    } else {
      console.error('Speech recognition not supported in this browser');
    }
  }, [isRecording]);

  const startRecording = () => {
    if (recognition) {
      setIsRecording(true);
      setTranscript('');
      setTranscripts([]);
      recognition.start();
    }
  };

  const stopRecording = () => {
    if (recognition) {
      setIsRecording(false);
      recognition.stop();
    }
  };

  return (
    <div>
      
      <button onClick={() => {
        if (!isRecording) {
            startRecording()
        } else {
            stopRecording()
        }
      }}>
        {isRecording ? 'Stop' : 'Start'} Recording
      </button>
      {/* <p>Transcripts: {transcripts.join(', ')}</p>
      <p>Current Transcript: {transcript}</p> */}
    </div>
  );
};

export default SpeechRecognitionComponent;