import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import webpush from 'web-push';
import { env } from '../env';

export const notificationLoader: MicroframeworkLoader = (
    settings: MicroframeworkSettings | undefined,
) => {
    if (settings) {
        webpush.setVapidDetails(
            'mailto:bxnandoxd@edu.unifil.br',
            env.webNotification.publicKey,
            env.webNotification.privateKey,
        );
    }
};
