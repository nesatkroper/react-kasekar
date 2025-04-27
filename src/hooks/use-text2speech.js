import { useState, useEffect, useCallback, useRef, useMemo } from "react";

const useTextToSpeech = (options = {}) => {
  const [voices, setVoices] = useState([]);
  const [forcedLang, setForcedLang] = useState(options.defaultLanguage || null);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVoiceLoaded, setIsVoiceLoaded] = useState(false);
  const [settings, setSettings] = useState({
    rate: options.defaultRate || 1,
    pitch: options.defaultPitch || 1,
    volume: options.defaultVolume || 1,
  });

  const isSpeakingRef = useRef(isSpeaking);
  const utteranceRef = useRef(null);

  useEffect(() => {
    isSpeakingRef.current = isSpeaking;
  }, [isSpeaking]);

  const loadVoices = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    const availableVoices = window.speechSynthesis.getVoices();
    if (availableVoices.length > 0) {
      setVoices(availableVoices);

      console.log(
        "Available voices:",
        availableVoices.map((v) => `${v.name} (${v.lang})`)
      );

      const khmerVoice = availableVoices.find((v) => v.lang.startsWith("km"));
      if (options.preferKhmer && khmerVoice) {
        setSelectedVoice(khmerVoice);
      } else if (!selectedVoice) {
        const defaultVoice = options.defaultVoice
          ? availableVoices.find((v) => v.name === options.defaultVoice)
          : availableVoices.find((v) => v.default) || availableVoices[0];

        setSelectedVoice(defaultVoice);
      }

      setIsVoiceLoaded(true);
    }
  }, [options.defaultVoice, options.preferKhmer, selectedVoice]);

  useEffect(() => {
    let isMounted = true;
    let retryTimeout;
    let attempts = 0;
    const MAX_ATTEMPTS = 5;

    const tryLoadVoices = () => {
      if (!isMounted) return;

      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        loadVoices();
      } else if (attempts < MAX_ATTEMPTS) {
        attempts++;
        retryTimeout = setTimeout(tryLoadVoices, 500);
      }
    };

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;

      tryLoadVoices();
    }

    return () => {
      isMounted = false;
      clearTimeout(retryTimeout);
      if (typeof window !== "undefined") {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [loadVoices]);

  const detectLanguage = useCallback(
    (text) => {
      const isKhmer = /[\u1780-\u17FF]/.test(text);

      if (forcedLang) {
        if (forcedLang === "km") {
          return "km";
        } else if (forcedLang === "en") {
          return "en";
        }
      }

      return isKhmer ? "km" : "en";
    },
    [forcedLang]
  );

  const getVoiceForLanguage = useCallback(
    (langCode) => {
      if (langCode === "km") {
        const khmerVoice = voices.find((v) => v.lang.startsWith("km"));
        if (khmerVoice) return khmerVoice;

        console.warn("No Khmer voice found. Using default voice instead.");
      }

      return selectedVoice || voices.find((v) => v.default) || voices[0];
    },
    [voices, selectedVoice]
  );

  const handleSpeechError = useCallback((event) => {
    const ignoredErrors = ["interrupted", "canceled"];
    if (event && event.error && !ignoredErrors.includes(event.error)) {
      console.error(
        `Speech error: ${event.error} - ${event.message || "No details"}`
      );
    }
    setIsSpeaking(false);
  }, []);

  const speak = useCallback(
    async (text) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        console.error("Speech synthesis not supported");
        return;
      }

      if (!text || !text.trim() || isSpeakingRef.current) return;

      try {
        window.speechSynthesis.cancel();
        await new Promise((resolve) => setTimeout(resolve, 100));

        const detectedLang = detectLanguage(text);
        const voiceToUse = getVoiceForLanguage(detectedLang);

        if (!voiceToUse) {
          console.error("No voice available for speech synthesis");
          return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = voiceToUse;
        utterance.lang = voiceToUse.lang;
        utterance.rate = settings.rate;
        utterance.pitch = settings.pitch;
        utterance.volume = settings.volume;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = handleSpeechError;

        utteranceRef.current = utterance;

        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.error("Failed to initiate speech:", error);
        setIsSpeaking(false);
      }
    },
    [detectLanguage, getVoiceForLanguage, handleSpeechError, settings]
  );

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const updateSettings = useCallback((newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const availableLanguages = useMemo(() => {
    const langSet = new Set(voices.map((voice) => voice.lang.split("-")[0]));
    return Array.from(langSet);
  }, [voices]);

  const isKhmerAvailable = useMemo(() => {
    return voices.some((voice) => voice.lang.startsWith("km"));
  }, [voices]);

  return {
    voices,
    selectedVoice,
    setSelectedVoice,
    isSpeaking,
    isVoiceLoaded,
    speak,
    stop,
    settings,
    setSettings: updateSettings,
    forcedLang,
    setForcedLang,
    availableLanguages,
    isKhmerAvailable,
  };
};

export default useTextToSpeech;
