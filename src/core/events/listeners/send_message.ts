import * as workers from '../../../workers';

let handle = (invitation: any) => {
    console.log('new invitation email');

    if (invitation.channel == 'email') {
        workers.publish('notification', 'send', {
            notification: 'send_message',
            data: {
                param_1: ''
            },
            channels: {
                email: invitation.channel_address
            }
        });
    }
};

export default handle;
