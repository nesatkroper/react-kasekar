import useTextToSpeech from "@/hooks/use-text2speech";
import React, { useState } from "react";

const TextToSpeechDemo = () => {
  const [text, setText] = useState("");
  const {
    voices,
    selectedVoice,
    setSelectedVoice,
    isSpeaking,
    isVoiceLoaded,
    speak,
    stop,
    settings,
    setSettings,
    forcedLang,
    setForcedLang,
    isKhmerAvailable,
  } = useTextToSpeech({
    preferKhmer: true,
    defaultLanguage: "km",
  });

  const handleSpeak = () => {
    speak(text);
  };

  return (
    <div className='p-4 max-w-md mx-auto'>
      <h1 className='text-xl font-bold mb-4'>Khmer Text-to-Speech Demo</h1>

      {!isVoiceLoaded ? (
        <div className='text-center'>Loading voices...</div>
      ) : (
        <>
          <div className='mb-4'>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className='w-full p-2 border rounded'
              rows={4}
              placeholder='Enter text in Khmer...'
            />
          </div>

          <div className='mb-4'>
            <label className='block mb-2'>Force Language:</label>
            <select
              value={forcedLang || ""}
              onChange={(e) => setForcedLang(e.target.value || null)}
              className='w-full p-2 border rounded'>
              <option value=''>Auto-detect</option>
              <option value='km'>Khmer</option>
              <option value='en'>English</option>
            </select>
          </div>

          {!isKhmerAvailable && (
            <div className='p-3 mb-4 bg-yellow-100 text-yellow-800 rounded'>
              <p>
                Warning: No Khmer voice is available in your browser. The text
                may not be pronounced correctly.
              </p>
              <p className='text-sm mt-1'>
                Try installing Khmer language pack in your system settings, or
                using a different browser.
              </p>
            </div>
          )}

          <div className='mb-4'>
            <label className='block mb-2'>Select Voice:</label>
            <select
              value={selectedVoice?.voiceURI || ""}
              onChange={(e) => {
                const voice = voices.find((v) => v.voiceURI === e.target.value);
                setSelectedVoice(voice);
              }}
              className='w-full p-2 border rounded'>
              {voices.map((voice) => (
                <option key={voice.voiceURI} value={voice.voiceURI}>
                  {voice.name} ({voice.lang}) {voice.default ? "- Default" : ""}
                </option>
              ))}
            </select>
          </div>

          <div className='grid grid-cols-3 gap-4 mb-4'>
            <div>
              <label className='block mb-2'>Rate:</label>
              <input
                type='range'
                min='0.5'
                max='2'
                step='0.1'
                value={settings.rate}
                onChange={(e) =>
                  setSettings({ rate: parseFloat(e.target.value) })
                }
                className='w-full'
              />
              <div className='text-center'>{settings.rate.toFixed(1)}</div>
            </div>

            <div>
              <label className='block mb-2'>Pitch:</label>
              <input
                type='range'
                min='0.5'
                max='2'
                step='0.1'
                value={settings.pitch}
                onChange={(e) =>
                  setSettings({ pitch: parseFloat(e.target.value) })
                }
                className='w-full'
              />
              <div className='text-center'>{settings.pitch.toFixed(1)}</div>
            </div>

            <div>
              <label className='block mb-2'>Volume:</label>
              <input
                type='range'
                min='0'
                max='1'
                step='0.1'
                value={settings.volume}
                onChange={(e) =>
                  setSettings({ volume: parseFloat(e.target.value) })
                }
                className='w-full'
              />
              <div className='text-center'>{settings.volume.toFixed(1)}</div>
            </div>
          </div>

          <div className='flex space-x-4'>
            <button
              onClick={handleSpeak}
              disabled={isSpeaking}
              className={`flex-1 p-2 rounded ${
                isSpeaking ? "bg-gray-300" : "bg-blue-500 text-white"
              }`}>
              {isSpeaking ? "Speaking..." : "Speak"}
            </button>

            <button
              onClick={stop}
              disabled={!isSpeaking}
              className={`flex-1 p-2 rounded ${
                !isSpeaking ? "bg-gray-300" : "bg-red-500 text-white"
              }`}>
              Stop
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TextToSpeechDemo;
