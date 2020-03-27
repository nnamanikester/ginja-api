import * as ratingService from '../../services/rating';

const submitRating = async (parent: any, args: any, context: any): Promise<any> => {
    try {
        return await ratingService.submitRating({ parent, args, context });
    } catch (error) {
        throw error;
    }
};

export { submitRating };
