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

import { createStyleHelper } from '../../utils/class-names';

import styles from './web-cam.module.scss';

const style = createStyleHelper(styles, 'web-cam');

export const WebCamComponent = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const photoRef = useRef<HTMLCanvasElement>(null);

    const [hasPhoto, setHasPhoto] = useState(false);
    const [hasCapture, setHasCapture] = useState(false);

    const getVideo = useCallback(() => {
        navigator.mediaDevices
            .getUserMedia({ video: { width: 1080, height: 1080 } })
            .then((stream) => {
                const video = videoRef.current;
                if (video) {
                    video.srcObject = stream;
                    video.play();
                }
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }, []);

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
        </div>
    );
};
