import React, { useRef, useEffect, useState, useCallback } from 'react';

import {
    Button,
    ButtonSize,
    ButtonVariant,
    Gap,
    GapSize,
    IconColor,
    IconSize,
    MaterialSymbol,
} from '@endeavour/ui-kit';
import io from 'socket.io-client';

import { createStyleHelper } from '../../utils/class-names';

import styles from './web-cam.module.scss';

const style = createStyleHelper(styles, 'web-cam');

const socket = io('ws://localhost:3001/signal'); // Conecte ao servidor WebSocket

const createOffer = async (peerConnection:RTCPeerConnection) => {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit('signal', { type: 'offer', offer });
};

export const WebCamComponent = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const photoRef = useRef<HTMLCanvasElement>(null);
    const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
    const [hasPhoto, setHasPhoto] = useState(false);
    const [hasCapture, setHasCapture] = useState(false);

    // Configuração do STUN server para a conexão WebRTC
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const iceServers = {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' }, // Servidor STUN do Google
        ],
    };

    // Inicializa o WebRTC PeerConnection e manipula os eventos
    const initializeConnection = useCallback(
        (stream: MediaStream) => {
            const peer = new RTCPeerConnection(iceServers);
            stream.getTracks().forEach((track) => peer.addTrack(track, stream));

            // Enviar ICE candidates para o outro peer
            peer.onicecandidate = (event) => {
                if (event.candidate) {
                    socket.emit('signal', { type: 'candidate', candidate: event.candidate });
                }
            };

            // Receber o stream de vídeo do peer
            peer.ontrack = (event) => {
                const [remoteStream] = event.streams;
                if (videoRef.current) {
                    videoRef.current.srcObject = remoteStream;
                }
            };

            setPeerConnection(peer);
        },
        [iceServers],
    );

    // Configura a transmissão de vídeo
    const getVideo = useCallback(() => {
        navigator.mediaDevices
            .getUserMedia({ video: { width: 1080, height: 1080 } })
            .then((stream) => {
                const video = videoRef.current;
                if (video) {
                    video.srcObject = stream;
                    video.play();
                }
                initializeConnection(stream);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }, [initializeConnection]);

    const capture = useCallback(() => {
        const video = videoRef.current;
        const photo = photoRef.current;
        if (photo && video) {
            const cxt = photo.getContext('2d');
            if (cxt) {
                // Ajuste o tamanho do canvas para coincidir com as dimensões do vídeo
                photo.width = video.videoWidth;
                photo.height = video.videoHeight;

                // Desenhe a imagem no canvas
                cxt.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

                setHasPhoto(true);
            }
        }
    }, []);

    const cleanPhoto = useCallback(() => {
        const photo = photoRef.current;
        const video = videoRef.current;

        if (photo && video) {
            const ctx = photo.getContext('2d');

            if (ctx) {
                photo.width = video.videoWidth;
                photo.height = video.videoHeight;

                ctx.clearRect(0, 0, video.videoWidth, video.videoHeight);
            }

            setHasPhoto(false);
        }
    }, []);

    const openCapture = useCallback(() => {
        setHasCapture(true);
    }, []);

    // Função para criar uma oferta de conexão P2P

    // Função para lidar com os sinais recebidos
    useEffect(() => {
        socket.on('signal', async (data) => {
            if (data.type === 'offer') {
                if (peerConnection) {
                    await peerConnection.setRemoteDescription(
                        new RTCSessionDescription(data.offer),
                    );
                    const answer = await peerConnection.createAnswer();
                    await peerConnection.setLocalDescription(answer);
                    socket.emit('signal', { type: 'answer', answer });
                }
            } else if (data.type === 'answer') {
                if (peerConnection) {
                    await peerConnection.setRemoteDescription(
                        new RTCSessionDescription(data.answer),
                    );
                }
            } else if (data.type === 'candidate') {
                if (peerConnection) {
                    await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
                }
            }
        });
    }, [peerConnection]);

    useEffect(() => {
        getVideo();
        
    }, [getVideo]);

    return (
        <div className={style('container')}>
            {!hasCapture ? (
                <div className={style('no-capture')}>
                    <p>
                        Sem <br />
                        Imagem
                    </p>
                    <Button hasIcon onClick={openCapture} size={ButtonSize.SMALL}>
                        <MaterialSymbol
                            size={IconSize.X_SMALL}
                            color={IconColor.INTERACTION}
                            name="photo_camera"
                        />
                    </Button>
                </div>
            ) : null}

            <canvas
                className={style('photo', { hasPhoto, hasCapture: !hasCapture })}
                ref={photoRef}
            ></canvas>
            <video
                className={style('video', { hasPhoto, hasCapture: !hasCapture })}
                ref={videoRef}
                autoPlay
                playsInline
            ></video>
            <div className={style('capture-button', { hasCapture: !hasCapture })}>
                {hasPhoto ? (
                    <Gap direction="horizontal" size={GapSize.SMALL}>
                        <Button hasIcon onClick={cleanPhoto} size={ButtonSize.SMALL}>
                            <MaterialSymbol
                                size={IconSize.X_SMALL}
                                color={IconColor.INTERACTION}
                                name="close"
                            />
                        </Button>
                        <Button
                            variant={ButtonVariant.ACTION}
                            hasIcon
                            size={ButtonSize.SMALL}
                            onClick={capture}
                        >
                            <MaterialSymbol size={IconSize.X_SMALL} name="save" />
                        </Button>
                    </Gap>
                ) : (
                    <Button
                        variant={ButtonVariant.ACTION}
                        hasIcon
                        size={ButtonSize.SMALL}
                        onClick={capture}
                    >
                        <MaterialSymbol size={IconSize.X_SMALL} name="photo_camera" />
                    </Button>
                )}
            </div>
            {peerConnection ? (
                <Button
                    variant={ButtonVariant.ACTION}
                    size={ButtonSize.SMALL}
                    // eslint-disable-next-line @arthurgeron/react-usememo/require-usememo
                    onClick={() => {
                        createOffer(peerConnection);
                    }}
                >
                    Start P2P Connection
                </Button>
            ) : null}
        </div>
    );
};
