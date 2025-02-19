// import { useState } from "react";
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

// //   async function trans(textToTranslate = "Hello, world!", targetLang = "ja") {
// // 	try {
// // 	  if (!navigator.ai) {
// // 		console.error("AI API is not available. Ensure you enabled Experimental Web AI APIs in Chrome.");
// // 		return;
// // 	  }
  
// // 	  const translator = await navigator.ai.translator.create({
// // 		sourceLanguage: "en",
// // 		targetLanguage: targetLang,
// // 	  });
  
// // 	  const text = await translator.translate(textToTranslate);
// // 	  console.log(text, "Translated Text");
  
// // 	  // Handling streaming response
// // 	  const readableStream = await translator.translateStreaming(`
// // 		Four score and seven years ago our fathers brought forth, upon this...
// // 	  `);
  
// // 	  const reader = readableStream.getReader();
// // 	  let translatedText = "";
  
// // 	  while (true) {
// // 		const { done, value } = await reader.read();
// // 		if (done) break;
// // 		translatedText += new TextDecoder("utf-8").decode(value);
// // 	  }
  
// // 	  console.log(translatedText, "Streaming Translated Text");
  
// // 	} catch (error) {
// // 	  console.error("Translation Error:", error);
// // 	}
// //   }
  
// //   // Example usage:
// //   trans();
  

// //   132.0.6834.197



// async function generateContent(prompt) {
//     const apiKey = "GEMINI_API_KEY";
//     const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
//     const requestBody = {
//         contents: [{
//             parts: [{ text: prompt }]
//         }]
//     };
    
//     try {
//         const response = await fetch(url, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(requestBody)
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
        
//         // Extract the text from the response structure
//         const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response text found";
        
//         return generatedText;
//     } catch (error) {
//         console.error("Error fetching AI response:", error);
//         return null;
//     }
// }

// // Example usage
// generateContent("What is programming?").then(response => console.log(response));



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
