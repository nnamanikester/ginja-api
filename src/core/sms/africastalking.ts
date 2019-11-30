let sms: any;

interface AfricasTalkingModel extends Function {
    SMS: any;
}

const options = {
    apiKey: process.env.AFRICAS_TALKING_API_KEY, // use your sandbox app API key for development in the test environment
    username: process.env.AFRICAS_TALKING_API_USERNAME // use 'sandbox' for development in the test environment
};

const AfricasTalking: AfricasTalkingModel = require('africastalking')(options);

// Initialize a service e.g. SMS
sms = AfricasTalking.SMS;

const sendSms = (to: Array<any>, message: String) => {
    // Use the service
    const options = {
        to,
        message
    };

    // Send message and capture the response or error
    sms.send(options)
        .then((response: Response) => {
            console.log(response);
        })
        .catch((error: Error) => {
            console.log(error);
        });
};

export { sendSms };
