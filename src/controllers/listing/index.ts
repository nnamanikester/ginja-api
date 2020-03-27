import { UserModel } from '../../interfaces/auth';
import * as listingService from '../../services/listing';

const createListing = async (parent: any, args: UserModel, context: any): Promise<any> => {
    try {
        return await listingService.createListing({ parent, args, context });
    } catch (error) {
        throw error;
    }
};

const listings = async (parent: any, args: UserModel, context: any): Promise<any> => {
    try {
        return await listingService.listings({ parent, args, context });
    } catch (error) {
        throw error;
    }
};

export { createListing, listings };
