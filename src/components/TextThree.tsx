// import { useState } from "react";
// import bgImg from "../assets/pexels-byrahul-695644.jpg";
// import sendIcon from "../assets/send-icon.svg";
// import transIcon from "../assets/translate.png";

// interface ArrMessageType {
//   text: string;
//   time: string;
//   id: number;
//   summary?: string;
// }

// function TextThree() {
//   const [text, setTextArea] = useState<string>("");
//   const [textAfterSending, setTextAfterSending] = useState<string>("");
//   const [targetLanguage, setTargetLanguage] = useState<string>("");
//   const [translatedOutput, setTranslatedOutput] = useState<string>("");
//   const [error, setError] = useState("");
//   const [LanguageDetector, setLanguageDetector] = useState<string>("");
//   const [confidence, setConfidence] = useState<number>();
//   const [summaryIsLoading, setSummaryIsLoading] = useState<boolean>(false);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [arrMessage, setArrMessgae] = useState<ArrMessageType[]>([]);

//   function handleLangSelection(
//     event: React.ChangeEvent<HTMLSelectElement>,
//     id: number
//   ): void {
//     const data = arrMessage.find((obj) => obj.id === id);
//     const unique = data?.id;
//     if (unique === id) {
//       setTargetLanguage(event?.target?.value);
//     }
//   }

//   function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
//     setTextArea(e.target.value);
//     // console.log(e.target.value);
//     languageDetector();
//   }

//   const get24HourTime = () => {
//     return new Date().toLocaleTimeString("en-GB", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: false
//     });
//   };

//   const time = get24HourTime();

//   // console.log(); // Example Output: "14:30"

//   function sendUserInputFtn(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setTextAfterSending(text);
//     setArrMessgae((prev) => {
//       const userInput = { text, time, id: prev.length + 1 };
//       return [...prev, userInput];
//     });

//     setTextArea("");
//   }

//   //Translator API
//   async function translatorFtn(id: number) {
//     try {
//       setIsLoading(true);
//       const translator = await ai.translator.create({
//         sourceLanguage: "en",
//         targetLanguage: targetLanguage
//         // targetLanguage: "ja"
//         // monitor(m) {
//         //   m.addEventListener("downloadprogress", (e) => {
//         //     // console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
//         //   });
//         // }
//       });

//       const text = arrMessage.find((obj) => obj.id === id);

//       console.log(text?.id, "id");
//       if (text?.id === id) {
//         const transout = await translator.translate(text.text);
//         console.log(transout, "transout");
//         setTranslatedOutput(transout);
//         setIsLoading(false);
//       }
//     } catch (error) {
//       setError(error);
//       // console.log(error, "error");
//     }
//   }

//   //

//   //Language Detector API
//   async function languageDetector() {
//     try {
//       const languageDetectorCapabilities =
//         await self.ai.languageDetector.capabilities();
//       const canDetect = languageDetectorCapabilities.capabilities;
//       let detector;
//       if (canDetect === "no") {
//         // The language detector isn't usable.
//         return;
//       }
//       if (canDetect === "readily") {
//         // The language detector can immediately be used.
//         detector = await self.ai.languageDetector.create();
//       } else {
//         // The language detector can be used after model download.
//         detector = await self.ai.languageDetector.create({
//           monitor(m) {
//             m.addEventListener("downloadprogress", (e) => {
//               // console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
//             });
//           }
//         });
//         await detector.ready;
//       }

//       const results = await detector.detect(text);
//       const firstResult = results[0]?.detectedLanguage;
//       const resultConfidence = results[0]?.confidence;

//       setConfidence(resultConfidence);

//       if (firstResult === "es") {
//         setLanguageDetector("Spanish");
//       } else if (firstResult === "pt") {
//         setLanguageDetector("Portuguese");
//       } else if (firstResult === "ru") {
//         setLanguageDetector("Russian");
//       } else if (firstResult === "tr") {
//         setLanguageDetector("Turkish");
//       } else if (firstResult === "fr") {
//         setLanguageDetector("French");
//       } else if (firstResult === "en") {
//         setLanguageDetector("English");
//       } else {
//         setLanguageDetector("Not found");
//       }
//     } catch (error) {
//       console.error("Language detection failed:", error);
//     }
//     console.log(languageDetector, "languageDetector");
//   }

//   //

//   //Summarizer APi
//   interface SummarizeOptions {
//     sharedContext: string | undefined;
//     type: string;
//     format: string;
//     length: string;
//   }

//   interface SummarizerCapabilities {
//     available: string;
//   }

//   interface Summarizer {
//     summarize: (text: string) => Promise<string>;
//     addEventListener: (
//       event: string,
//       callback: (e: ProgressEvent) => void
//     ) => void;
//     ready: Promise<void>;
//   }

//   async function summarizeFtn(id: number) {
//     if (LanguageDetector !== "English") {
//       alert("Only English can be summarized");
//       return;
//     }

//     setSummaryIsLoading(true);
//     const options: SummarizeOptions = {
//       sharedContext: text?.text,
//       type: "key-points",
//       format: "markdown",
//       length: "long"
//     };

//     try {
//       setSummaryIsLoading(true);
//       const text = arrMessage.find((obj) => obj.id === id);

//       const unique = text?.id;

//       if (unique === id) {
//         const capabilities: SummarizerCapabilities =
//           await self.ai.summarizer.capabilities();
//         const available = capabilities.available;
//         if (available === "no") {
//           // console.error("Summarizer API is not available.");
//           return;
//         }

//         let summarizer: Summarizer;
//         if (available === "readily") {
//           summarizer = await self.ai.summarizer.create(options);
//         } else {
//           summarizer = await self.ai.summarizer.create(options);
//           summarizer.addEventListener(
//             "downloadprogress",
//             (e: ProgressEvent) => {
//               // console.log(`Download Progress: ${e.loaded}/${e.total}`);
//             }
//           );
//           await summarizer.ready;
//         }

//         const summary = await summarizer.summarize(textAfterSending);
//         setSummaryIsLoading(false);
//         setArrMessgae((prev) =>
//           prev.map((obj) =>
//             obj.id === id
//               ? { ...obj, summary: summary.replace(/\*/g, "\n") }
//               : obj
//           )
//         );

//         setSummaryIsLoading(false);
//       }

//       console.log(arrMessage, "arrMessage1");
//     } catch (error) {
//       console.error("Error while summarizing:", error);
//     }
//   }

//   console.log(arrMessage, "arrMessage2");

//   //

//   const bgImage = {
//     width: "100%",
//     backgroundImage: `url(${bgImg})`,
//     backgroundSize: "contain",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat"
//   };

//   return (
//     <div style={bgImage} className="text-white px-3 relative py-3 ">
//       <div className="">
//         <div className="overflow-y-scroll h-[80vh] pb-[4vh]">
//           <div className=" grid gap-5">
//             {arrMessage?.map((obj: ArrMessageType) => {
//               return (
//                 <>
//                   <div className="" key={obj.id}>
//                     <div
//                       className={`w-[100%]  flex gap-1 rounded-2xl text-white ${
//                         obj.id % 2 === 0 ? "md:justify-start" : "md:justify-end"
//                       }`}>
//                       <div
//                         className={`py-1 ${obj.id % 2 === 0 ? "order-1" : ""}`}>
//                         <label htmlFor="lang">
//                           <select
//                             id="lang"
//                             onChange={(e) => handleLangSelection(e, obj.id)}>
//                             <option value="">Languages</option>
//                             <option value="pt">Portuguese</option>
//                             <option value="es">Spanish</option>
//                             <option value="ru">Russian</option>
//                             <option value="tr">Turkish</option>
//                             <option value="fr">French</option>
//                           </select>
//                         </label>
//                       </div>
//                       <div
//                         className={`w-[100%] md:w-[20vw] py-1 ${
//                           obj.id % 2 === 0 ? "" : "order-1"
//                         }`}>
//                         <div
//                           className=" px-2 bg-amber-600 
//                rounded-2xl py-2">
//                           <div className="w-[100%] flex flex-col overflow-hidden break-words">
//                             <p className="text-[14px] text-justify">
//                               {obj?.text}
//                             </p>
//                             <p className="text-[8px] py-2 ">{obj?.time}</p>
//                           </div>
//                         </div>
//                         <div>
//                           <p className="px-3 text-green-800">
//                             {isLoading ? "Loading..." : translatedOutput}
//                           </p>
//                           {error && (
//                             <small className="text-red-700 text-[8px]">
//                               {translatedOutput !== "" ? "" : `${error}`}
//                             </small>
//                           )}
//                         </div>
//                         <div>
//                           <p className="px-2 py-2 text-justify text-[12px] text-gray-400">
//                             {summaryIsLoading ? "Loading..." : obj?.summary}
//                           </p>
//                         </div>
//                         <div className="flex items-center justify-between px-3">
//                           <div className="flex gap-1 items-center">
//                             <div className="  py-1">
//                               <button
//                                 onClick={() => translatorFtn(obj.id)}
//                                 className="cursor-pointer hover:text-green-800">
//                                 Traslate
//                               </button>
//                             </div>
//                             <div className="w-[1vw]">
//                               <img
//                                 src={transIcon}
//                                 alt=""
//                                 className="animate-spin"
//                               />
//                             </div>
//                           </div>
//                           <div></div>

//                           <div className="flex flex-col text-center gap-2">
//                             {obj.text.length > 150 ? (
//                               <div className="py-1">
//                                 <button
//                                   className="cursor-pointer hover:text-green-800"
//                                   onClick={() => summarizeFtn(obj.id)}>
//                                   Summerize
//                                 </button>
//                               </div>
//                             ) : (
//                               ""
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               );
//             })}
//           </div>
//         </div>

//         <form onSubmit={sendUserInputFtn}>
//           <div>
//             <div className="flex justify-center py-1">
//               {LanguageDetector && (
//                 <p>{`${
//                   confidence ? Math.ceil(confidence * 100) : ""
//                 }% ${LanguageDetector}`}</p>
//               )}
//             </div>
//             <div className="flex items-end ">
//               <div className=" w-[100%] md:flex md:justify-center md:gap-3 items-center">
//                 <label htmlFor="userInput">
//                   <textarea
//                     className="bg-white px-4 py-2 text-black w-[100%] rounded-2xl"
//                     id="userInput"
//                     name="w3review"
//                     rows={2}
//                     cols={100}
//                     onChange={handleChange}
//                     placeholder="Textareaa..."
//                   />
//                 </label>
//                 <div className=" bg-green-800 px-3  rounded-sm py-1">
//                   <div className="flex items-center gap-1">
//                     <button type="submit" className="cursor-pointer">
//                       Send
//                     </button>
//                     <div className="w-[16px]">
//                       <img src={sendIcon} alt="" className="w-[100%]" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default TextThree;
