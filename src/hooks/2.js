import { useState, useEffect } from "react";

const useTextToSpeech = () => {
  const [voices, setVoices] = useState([]);
  const [forcedLang, setForcedLang] = useState(null);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVoiceLoaded, setIsVoiceLoaded] = useState(false);
  const [settings, setSettings] = useState({
    rate: 1,
    pitch: 1,
    volume: 1,
  });

  useEffect(() => {
    let isMounted = true;
    const loadVoices = () => {
      let attempts = 0;
      const tryLoad = () => {
        if (!isMounted) return;

        const availableVoices = window.speechSynthesis.getVoices();
        if (availableVoices.length > 0 || attempts >= 3) {
          if (isMounted) {
            setVoices(availableVoices);
            if (availableVoices.length > 0 && !selectedVoice) {
              setSelectedVoice(availableVoices[0]);
            }
            setIsVoiceLoaded(true);
          }
        } else {
          attempts++;
          setTimeout(tryLoad, 500);
        }
      };
      tryLoad();
    };

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;

      setTimeout(() => {
        if (isMounted && voices.length === 0) {
          loadVoices();
        }
      }, 1000);
    }

    return () => {
      isMounted = false;
      if (typeof window !== "undefined") {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  const speak = async (text) => {
    if (!text.trim() || isSpeaking) return;

    setIsSpeaking(true);

    try {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      doSpeak(text);
    } catch (error) {
      console.error("Speech error:", error);
    } finally {
      setIsSpeaking(false);
    }
  };

  function handleSpeechError(event) {
    const ignoredErrors = ["interrupted", "canceled"];
    if (ignoredErrors.includes(event.error)) {
      return;
    }
    console.error("Speech error:", event);
  }

  const doSpeak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);

    let voiceToUse = null;

    let isKhmer = /[\u1780-\u17FF]/.test(text);

    if (forcedLang) {
      if (forcedLang === "km") {
        isKhmer = true;
      } else if (forcedLang === "en") {
        isKhmer = false;
      }
    }

    if (isKhmer) {
      voiceToUse = voices.find((v) => v.lang.startsWith("km"));
    }

    if (!voiceToUse) {
      voiceToUse =
        voices.find((v) => v.voiceURI === selectedVoice?.voiceURI) ||
        voices.find((v) => v.default) ||
        null;
    }

    if (voiceToUse) {
      utterance.voice = voiceToUse;
      utterance.lang = voiceToUse.lang;
    }

    utterance.onerror = handleSpeechError;

    utterance.rate = settings.rate;
    utterance.pitch = settings.pitch;
    utterance.volume = settings.volume;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return {
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
  };
};

export default useTextToSpeech;
