import { usePeers } from "@huddle01/react/hooks";
import { useEffect, useRef, useState } from "react";

const useAudioRecorder = () => {
  const { peers } = usePeers();

  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<any[]>([]);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  const handleDataAvailable = (e: any) => {
    if (e.data.size > 0) {
      recordedChunksRef.current.push(e.data);
    }
  };

  const handleStop = () => {
    const blob = new Blob(recordedChunksRef.current, {
      type: "audio/webm",
    });
    const url = URL.createObjectURL(blob);
    setAudioURL(url);
  };

  useEffect(() => {
    const mediaStream = new MediaStream();
    setMediaStream(mediaStream);

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (!mediaStream) return;

    const tracks = Object.values(peers)
      .filter((peer) => peer.mic)
      .map((peer) => peer.mic);

    tracks.forEach((track) => {
      mediaStream.addTrack(track);
    });
  }, [peers, mediaStream]);

  const startRecording = () => {
    if (
      isRecording ||
      !mediaStream ||
      !(mediaStream.getAudioTracks().length > 0)
    )
      return;
    setIsRecording(true);
    mediaRecorderRef.current = new MediaRecorder(mediaStream!);
    mediaRecorderRef.current.ondataavailable = handleDataAvailable;
    mediaRecorderRef.current.onstop = handleStop;
    mediaRecorderRef.current.start();
  };

  const stopRecording = () => {
    if (isRecording && mediaRecorderRef.current) {
      setIsRecording(false);
      mediaRecorderRef.current.stop();
    }
  };

  return { isRecording, startRecording, stopRecording, audioURL };
};

export default useAudioRecorder;
