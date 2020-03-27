/* eslint-disable @typescript-eslint/explicit-function-return-type */
// Create user

const submitRating = async (graph: any) => {
    const { context, args } = graph;
    const { prisma } = context;
    const { listingId, ratingId, rate, userId } = args;
    try {
        // make this feature use pubsub or use future atomic prisma request when it is released.

        if (rate >= 1 && rate <= 5) {
            const result = await prisma.createRating({ listingId, ratingId, rate, userId });
            if (result) {
                const prevRating = await prisma.listingRating({ id: ratingId });
                const { count, rates } = prevRating;
                const data = {
                    count: +count + 1,
                    rates: +rates + rate,
                    average: (+rates + +rate) / (+count + 1)
                };
                const update = await prisma.updateListingRating({
                    where: { id: ratingId },
                    data
                });
                if (update) {
                    return { success: true };
                }
                return { success: false };
            }
        }

        throw new Error('Invalid Rate value');
    } catch (error) {
        throw error;
    }
};

export { submitRating };
