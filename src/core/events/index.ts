import emitter from './emitter';

let eventsMap: any = {
    'notification:send': ['send_notification'],
    'send_message:send': ['existing_merchant'],
    'audit:log': ['audit_log'],
    'general_by_id:send': ['general_by_id']
};

export let init = () => {
    console.log('Events: Initializing events listeners and subscribers');

    let count = 1;
    for (var event in eventsMap) {
        if (!eventsMap.hasOwnProperty(event)) {
            continue;
        }

        eventsMap[event].forEach((listener: string) => {
            try {
                let listenerHandler = require('./listeners/' + listener);
                emitter.on(event, listenerHandler.default);
                console.log(count + ': ' + event + ' => ' + listener);
                count = count + 1;
            } catch (err) {
                console.log('Failed: ' + event + ' => ' + listener + '. ' + err.message);
            }
        });
    }
};
