import models from './../../models';

let handle = (event: string, description: string, user: any, showUser: boolean) => {
    console.log('audit log event');

    let user_id = user;
    if (user instanceof models.merchants) {
        user_id = user.id;
    }

    models.audit_logs
        .create({
            user_id: user_id,
            event: event,
            description: description,
            show_user: showUser
        })
        .then(() => {
            console.log('event logged');
        })
        .catch((error: any) => {
            console.log('event logging failed');
        });
};

export default handle;
