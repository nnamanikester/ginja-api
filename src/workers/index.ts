import amqplib from 'amqplib';

const servicebus = require('servicebus');
import config from '../core/helpers/config';

let bus = servicebus.bus({
    url: config('bus.rabbitmq.url'),
    exchangeName: 'notification_service',
    exchangeOptions: {
        type: 'fanout'
    }
});

let queueName = 'notification_service';
let exchangeName = 'notification_service';
let open = amqplib.connect(config('bus.rabbitmq.url'));

/**
 * Initilizes and  Subcribes to Bus Queue
 */
export let init = () => {
    console.log('Workers: Initializing service bus listeners');

    bus.subscribe(queueName, function(eventPayload: any, options: any) {
        let eventHandler = null;
        try {
            eventHandler = require('./handlers/' + options.fields.routingKey);
        } catch (err) {
            console.log(err.message);
        }

        eventHandler
            .handle(eventPayload)
            .then((result: any) => {
                console.log(result);
            })
            .catch((err: Error) => {
                console.log(err.message);
            });
    });
};

/**
 * Publish messages to Bus
 *
 * @param service
 * @param event
 * @param payload
 */
export let publish = (service: string, event: string, payload: any) => {
    return open
        .then((connection: any) => {
            return connection.createChannel();
        })
        .then((channel: any) => {
            let exchangePromise = channel.assertExchange(exchangeName, 'fanout');

            return Promise.all([Promise.resolve(channel), exchangePromise]);
        })
        .then(([channel, exchange]: [any, any]) => {
            return channel.publish(exchangeName, service + '.' + event, Buffer.from(JSON.stringify(payload)));
        })
        .then((result: any) => {
            return result;
        })
        .catch((err: Error) => {
            console.log(err);
            throw err;
        });
};
