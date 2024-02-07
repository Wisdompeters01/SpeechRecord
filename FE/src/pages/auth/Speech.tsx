import { useEffect, useState } from "react";
import { FaRecordVinyl, FaStop } from "react-icons/fa";
import { MdLoop } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { addVoice } from "../../global/reduxState";
import { sendMails } from "../../api/userAPI";
import toast, { Toaster } from "react-hot-toast";

export const Speech = ({ id }: any) => {
  const [key, setKey] = useState("");

  const script = useSelector((state: any) => state.transcript);

  const dispatch = useDispatch();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    toast.error("Browser doesn't support speech recognition.");

    return <span>Browser doesn't support speech recognition.</span>;
  }

  useEffect(() => {
    setKey(transcript);
    dispatch(addVoice(key));
  }, [transcript]);

  const sendMail = () => {
    if (id!) {
      sendMails(id, { voiceKey: script })
        .then((res) => {
          console.log(res);
        })
        .catch(() => console.error());
    }
  };

  return (
    <div className="flex flex-col items-start gap-3">
      <Toaster position="top-center" reverseOrder={false} />
      <p>Microphone: {listening ? "on" : "off"}</p>
      <div className="flex gap-5 items-center">
        <button
          className="flex gap-5 items-center bg-green-600 text-white rounded-md p-4 py-2"
          onClick={() => {
            SpeechRecognition.startListening();
            sendMail();
          }}
        >
          Start <FaRecordVinyl />
        </button>
        <button
          className="flex gap-5 items-center bg-red-600 text-white rounded-md p-4 py-2"
          onClick={SpeechRecognition.stopListening}
        >
          Stop <FaStop />
        </button>
        <button
          className="flex gap-5 items-center bg-neutral-600 text-white rounded-md p-4 py-2"
          onClick={resetTranscript}
        >
          Reset <MdLoop />
        </button>
      </div>
      <p>Transcripts: {transcript} </p>
    </div>
  );
};
