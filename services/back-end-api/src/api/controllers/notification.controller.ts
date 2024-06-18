import { Authorized, Body, JsonController, Post, UseAfter } from 'routing-controllers';
import webpush from 'web-push';
import { Service } from 'typedi';
import { ErrorHandlerMiddleware } from '../middlewares/error.middleware';

interface ISubscription {
    endpoint: string;
    keys: {
        p256dh: string;
        auth: string;
    };
}

interface ISubscriptionBody {
    subscription: ISubscription;
}

type Subscriptions = Record<string, ISubscription>;

@Service()
@Authorized()
@UseAfter(ErrorHandlerMiddleware)
@JsonController('/notification')
export class NotificationController {
    subscriptions: Subscriptions = {};

    @Post('/subscribe')
    public async subscribe(@Body() body: ISubscriptionBody): Promise<Subscriptions> {
        const { subscription } = body;
        this.subscriptions[subscription.keys.auth] = subscription;

        return this.subscriptions;
    }

    @Post('/send-notification')
    public async sendNotification(): Promise<webpush.SendResult[]> {
        const notificationPayload = {
            title: 'New Notification',
            body: 'This is a new notification',
            icon: 'https://some-image-url.jpg',
            data: {
                url: 'https://example.com',
            },
        };

        const sendResults = await Promise.all(
            Object.values(this.subscriptions).map((subscription) =>
                webpush.sendNotification(subscription, JSON.stringify(notificationPayload)),
            ),
        );

        return sendResults;
    }
}
