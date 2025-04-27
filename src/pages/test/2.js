import React, { useState } from "react";
import Layout from "@/layout/layout";
import useTextToSpeech from "@/hooks/use-text2speech";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Test = () => {
  const [text, setText] = useState("");
  const {
    voices,
    selectedVoice,
    setSelectedVoice,
    isSpeaking,
    speak,
    stop,
    settings,
    setSettings,
    forcedLang,
    setForcedLang,
  } = useTextToSpeech();

  const handleSpeak = () => {
    speak(text);
  };

  const handleVoiceChange = (value) => {
    stop();
    const voice = voices.find((v) => v.voiceURI === value);
    setSelectedVoice(voice);
  };

  return (
    <Layout>
      <div className='p-4 max-w-md mx-auto bg-white rounded-lg shadow-md'>
        <h2 className='text-lg font-bold mb-4'>Text to Speech Player</h2>

        <Textarea
          className='w-full p-2 border rounded mb-4'
          rows='5'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Enter text to speak...'
        />

        {/* Voice Selection */}
        {voices.length > 0 && (
          <div className='mb-4'>
            <Label className='block mb-2'>Select Voice:</Label>
            <Select
              className='w-full'
              value={selectedVoice?.voiceURI || ""}
              onValueChange={handleVoiceChange}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Select Voice' />
              </SelectTrigger>
              <SelectContent className='w-full'>
                {voices.map((voice) => (
                  <SelectItem key={voice.voiceURI} value={voice.voiceURI}>
                    {voice.name} ({voice.lang})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Settings Controls */}
        <div className='space-y-4 mb-4'>
          <div>
            <Label className='block mb-1'>
              Speed: {settings.rate.toFixed(1)}
            </Label>
            <Input
              type='range'
              min='0.5'
              max='2'
              step='0.1'
              value={settings.rate}
              onChange={(e) =>
                setSettings({ ...settings, rate: parseFloat(e.target.value) })
              }
              className='w-full'
            />
          </div>
          <div>
            <Label className='block mb-1'>
              Pitch: {settings.pitch.toFixed(1)}
            </Label>
            <Input
              type='range'
              min='0.5'
              max='2'
              step='0.1'
              value={settings.pitch}
              onChange={(e) =>
                setSettings({ ...settings, pitch: parseFloat(e.target.value) })
              }
              className='w-full'
            />
          </div>
          <div>
            <Label className='block mb-1'>
              Volume: {settings.volume.toFixed(1)}
            </Label>
            <Input
              type='range'
              min='0'
              max='1'
              step='0.1'
              value={settings.volume}
              onChange={(e) =>
                setSettings({ ...settings, volume: parseFloat(e.target.value) })
              }
              className='w-full'
            />
          </div>
        </div>

        {/* Control Buttons */}
        <div className='flex gap-2 mb-4'>
          <Button
            variant={forcedLang === "km" ? "secondary" : "outline"}
            onClick={() => setForcedLang("km")}>
            🇰🇭 Speak Khmer
          </Button>
          <Button
            variant={forcedLang === "en" ? "secondary" : "outline"}
            onClick={() => setForcedLang("en")}>
            🇺🇸 Speak English
          </Button>
          <Button
            variant={forcedLang === null ? "secondary" : "outline"}
            onClick={() => setForcedLang(null)}>
            🎯 Auto Detect
          </Button>
        </div>
        <div className='flex gap-2'>
          <Button
            onClick={handleSpeak}
            disabled={isSpeaking || !text.trim()}
            className={`rounded ${
              isSpeaking || !text.trim()
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}>
            {isSpeaking ? "Speaking..." : "Speak"}
          </Button>

          {isSpeaking && (
            <Button
              onClick={stop}
              className='rounded bg-red-500 hover:bg-red-600 text-white'>
              Stop
            </Button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Test;
