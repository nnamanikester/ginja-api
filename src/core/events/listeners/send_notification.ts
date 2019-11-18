import * as workers from '../../../workers';

let handle = (invitation: any) => {
    console.log('new invitation email');

    if (invitation.channel == 'email') {
        workers.publish('notification', 'send', {
            notification: 'general',
            data: {
                html: invitation.html,
                subject: invitation.subject
            },
            channels: {
                email: invitation.channel_address
            }
        });
    }
};

export default handle;
