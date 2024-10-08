import React, { useRef, useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';

const socket = io('ws://localhost:3001/signal');

const iceServers = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};

export const WebCamComponentStreaming = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const peerConnectionsRef = useRef<{ [key: string]: RTCPeerConnection }>({});
    const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);

    const initializeConnection = useCallback((stream: MediaStream, id: string) => {
        if (peerConnectionsRef.current[id]) {
            console.log(`Closing existing connection for peer: ${id}`);
            peerConnectionsRef.current[id].close();
            delete peerConnectionsRef.current[id];
        }

        console.log(`Initializing connection for peer: ${id}`);
        const peer = new RTCPeerConnection(iceServers);
        stream.getTracks().forEach((track) => peer.addTrack(track, stream));

        peer.onicecandidate = (event) => {
            if (event.candidate) {
                console.log(`Sending ICE candidate for peer: ${id}`, event.candidate);
                socket.emit('signal', { type: 'candidate', candidate: event.candidate, id });
            }
        };

        peer.ontrack = (event) => {
            const [remoteStream] = event.streams;
            console.log('Remote stream received:', remoteStream);
            if (remoteStream) {
                setRemoteStreams((prevStreams) => {
                    console.log('Adding new remote stream:', remoteStream);
                    return [...prevStreams, remoteStream];
                });
            } else {
                console.error('No remote stream received.');
            }
        };

        peerConnectionsRef.current[id] = peer; // Atualiza o ref diretamente
        return peer;
    }, []);

    const getVideo = useCallback(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                console.log('Stream capturada:', stream);

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }

                socket.emit('join-room', 'some-room'); // Notificar o servidor que entrou na sala

                socket.on('user-connected', (id) => {
                    console.log(`User connected: ${id}`);
                    const peer = initializeConnection(stream, id);
                    peer.createOffer().then((offer) => {
                        console.log(`Created offer for peer: ${id}`);
                        return peer.setLocalDescription(offer);
                    }).then(() => {
                        socket.emit('signal', { type: 'offer', offer: peer.localDescription, id });
                    }).catch((error) => {
                        console.error(`Error setting local description for peer: ${id}`, error);
                    });
                });

                socket.on('signal', async ({ type, offer, answer, candidate, id }) => {
                    console.log('Signal received:', { type, id });
                    const peer = peerConnectionsRef.current[id] || initializeConnection(stream, id);

                    try {
                        if (type === 'offer') {
                            console.log(`Received offer from peer: ${id}`);
                            if (!peer.remoteDescription) {
                                await peer.setRemoteDescription(new RTCSessionDescription(offer));
                                const answer = await peer.createAnswer();
                                await peer.setLocalDescription(answer);
                                console.log(`Sending answer to peer: ${id}`);
                                socket.emit('signal', { type: 'answer', answer: peer.localDescription, id });
                            } else {
                                console.warn(`Peer ${id} already has a remote description. Ignoring offer.`);
                            }
                        } else if (type === 'answer') {
                            console.log(`Received answer from peer: ${id}`);
                            if (peer.remoteDescription) {
                                await peer.setRemoteDescription(new RTCSessionDescription(answer));
                            } else {
                                console.warn(`Peer ${id} does not have a remote description yet. Ignoring answer.`);
                            }
                        } else if (type === 'candidate') {
                            console.log(`Received ICE candidate from peer: ${id}`);
                            if (peer.remoteDescription) {
                                await peer.addIceCandidate(new RTCIceCandidate(candidate));
                            } else {
                                console.warn(`Peer ${id} remote description not set yet. Candidate not added.`);
                            }
                        }
                    } catch (error) {
                        console.error(`Error handling signal for peer: ${id}`, error);
                    }
                });
            })
            .catch((error) => {
                console.error('Error accessing media devices:', error);
            });
    }, [initializeConnection]);

    useEffect(() => {
        getVideo();

        return () => {
            Object.values(peerConnectionsRef.current).forEach((peer) => peer.close());
        };
    }, [getVideo]);

    return (
        <div>
            <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{ width: '300px', border: '1px solid black' }}
            ></video>
            {remoteStreams.map((stream, index) => (
                <video
                    key={index}
                    autoPlay
                    playsInline
                    ref={(el) => {
                        if (el && stream) {
                            el.srcObject = stream; // Garante que a srcObject seja atribuída
                        }
                    }}
                    style={{ width: '300px', border: '1px solid black', margin: '10px' }}
                ></video>
            ))}
        </div>
    );
};
