import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('https://7647-84-54-80-24.ngrok-free.app/');

function App() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  var localStream = []
  const [remoteStream, setRemoteStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStream.push(stream)
      localVideoRef.current.srcObject = stream;

      const pc = new RTCPeerConnection();
      setPeerConnection(pc);

      pc.onicecandidate = handleICECandidateEvent;
      pc.ontrack = handleTrackEvent;

      socket.on('offer', handleOffer);
      socket.on('answer', handleAnswer);
      socket.on('ice-candidate', handleNewICECandidateMsg);

      // Automatically initiate the call when component mounts
      initiateCall();
    };

    initialize();

    return () => {
      if(localStream.length >= 1)
      if (peerConnection) {{
        localStream[localStream.length - 1].getTracks().forEach(track => track.stop())
      }
        peerConnection.close();
      }
    };
  }, []);

  const handleICECandidateEvent = (event) => {
    if (event.candidate) {
      socket.emit('ice-candidate', event.candidate);
    }
  };

  const handleTrackEvent = (event) => {
    setRemoteStream(event.streams[0]);
    remoteVideoRef.current.srcObject = event.streams[0];
  };

  const handleOffer = async (offer) => {
    if (!peerConnection) return;

    try {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      socket.emit('answer', answer);
    } catch (error) {
      console.error('Error handling offer:', error);
    }
  };

  const handleAnswer = async (answer) => {
    if (!peerConnection) return;

    try {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    } catch (error) {
      console.error('Error handling answer:', error);
    }
  };

  const handleNewICECandidateMsg = async (candidate) => {
    if (!peerConnection) return;

    try {
      await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
      console.error('Error handling ICE candidate:', error);
    }
  };

  const initiateCall = async () => {
    if (!peerConnection) return;

    try {
      localStream[localStream.length - 1].getTracks().forEach(track => peerConnection.addTrack(track, localStream));
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      socket.emit('offer', offer);
    } catch (error) {
      console.error('Error initiating call:', error);
    }
  };

  return (
    <div>
      <div>
        <video ref={localVideoRef} autoPlay muted style={{ width: '320px', height: '240px' }}></video>
        <video ref={remoteVideoRef} autoPlay style={{ width: '320px', height: '240px' }}></video>
      </div>
    </div>
  );
}

export default App;
