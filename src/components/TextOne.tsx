// import React, { useState } from "react";
// import axios from "axios";

// const TextProcessingInterface = () => {
//   const [inputText, setInputText] = useState("");
//   const [outputText, setOutputText] = useState("");
//   const [detectedLanguage, setDetectedLanguage] = useState("");
//   const [summary, setSummary] = useState("");
//   const [translation, setTranslation] = useState("");
//   const [selectedLanguage, setSelectedLanguage] = useState("en");

//   const handleSend = async () => {
//     if (!inputText.trim()) {
//       alert("Please enter some text.");
//       return;
//     }

//     setOutputText(inputText);
//     detectLanguage(inputText);
//   };

//   const detectLanguage = async (text) => {
//     try {
//       const response = await axios.post("/api/detect-language", { text });
//       setDetectedLanguage(response.data.language);
//     } catch (error) {
//       console.error("Error detecting language:", error);
//     }
//   };

//   const handleSummarize = async () => {
//     try {
//       const response = await axios.post("/api/summarize", { text: outputText });
//       setSummary(response.data.summary);
//     } catch (error) {
//       console.error("Error summarizing text:", error);
//     }
//   };

//   const handleTranslate = async () => {
//     try {
//       const response = await axios.post("/api/translate", {
//         text: outputText,
//         targetLanguage: selectedLanguage,
//       });
//       setTranslation(response.data.translation);
//     } catch (error) {
//       console.error("Error translating text:", error);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="output-area">
//         <p>{outputText}</p>
//         {detectedLanguage && <p>Detected Language: {detectedLanguage}</p>}
//         {outputText.length > 150 && detectedLanguage === "en" && (
//           <button onClick={handleSummarize}>Summarize</button>
//         )}
//         {summary && <p>Summary: {summary}</p>}
//         <div>
//           <select
//             value={selectedLanguage}
//             onChange={(e) => setSelectedLanguage(e.target.value)}
//           >
//             <option value="en">English</option>
//             <option value="pt">Portuguese</option>
//             <option value="es">Spanish</option>
//             <option value="ru">Russian</option>
//             <option value="tr">Turkish</option>
//             <option value="fr">French</option>
//           </select>
//           <button onClick={handleTranslate}>Translate</button>
//         </div>
//         {translation && <p>Translated Text: {translation}</p>}
//       </div>
//       <div className="input-area">
//         <textarea
//           value={inputText}
//           onChange={(e) => setInputText(e.target.value)}
//           placeholder="Enter your text here..."
//         />
//         <button onClick={handleSend}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default TextProcessingInterface;