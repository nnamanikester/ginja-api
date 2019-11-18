import * as workers from '../../../workers';

let handle = (invitation: any) => {
    console.log('new invitation email');
    const { data } = invitation;
    if (invitation.channel == 'email') {
        workers.publish('notification', 'send', {
            notification: 'general_by_id',
            data: {
                ...invitation
            },
            channels: {
                email: invitation.channel_address
            }
        });
    }
};

export default handle;
