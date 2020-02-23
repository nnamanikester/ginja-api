import { submitRating } from '../controllers/rating';

const ratingMutations = {
    submitRating: (root: any, args: any, context: any) => submitRating(root, args, context)
};

export { ratingMutations };
