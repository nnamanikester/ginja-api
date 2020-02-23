/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Create Listing

const createListing = async (graph: any) => {
    const { args, context } = graph;
    const { prisma } = context;
    const {
        user,
        name,
        slug,
        description,
        price,
        discount,
        currency,
        proofOfOwnership,
        identification,
        spacing,
        property,
        floor,
        wallFinish,
        roofing,
        isSecure,
        pest,
        windows,
        location,
        amenities,
        avatar,
        vas,
        listingPhotos,
        frequency,
        requirements,
        products,
        availability,
        dimensions
    } = args;
    try {
        const result = await prisma.createListing({
            name,
            slug,
            description,
            price,
            discount,
            currency,
            proofOfOwnership,
            identification: {
                create: identification
            },
            spacing: {
                connect: spacing
            },
            property: {
                connect: property
            },
            floor: {
                connect: floor
            },
            wallFinish: {
                connect: wallFinish
            },
            roofing: {
                connect: roofing
            },
            isSecure: {
                connect: isSecure
            },
            pest: {
                connect: pest
            },
            windows,
            location: {
                create: location
            },
            amenities: {
                connect: amenities
            },
            avatar,
            vas: {
                connect: vas
            },
            listingPhotos: {
                create: listingPhotos
            },
            frequency: {
                connect: frequency
            },
            requirements: {
                connect: requirements
            },
            products: {
                connect: products
            },
            availability: {
                create: availability
            },
            dimensions: {
                create: dimensions
            },
            user: {
                connect: {
                    id: user
                }
            },
            status: 0,
            rating: {
                create: {
                    count: 0,
                    rates: 0,
                    average: 0
                }
            }
        });
        if (result) return { success: true };
        return { success: false };
    } catch (error) {
        throw error;
    }
};

const listings = async (graph: any) => {
    const { args, context } = graph;
    const { prisma } = context;
    const { filter, first, skip, user, nextToken, location } = args;
    const filterbyUser = user ? { user: { id: user } } : {};
    const filterByState = location
        ? {
            location: {
                state: location.state
            }
        }
        : {};

    const filterByCountry = location
        ? {
            location: {
                state: location.country
            }
        }
        : {};

    const where =
        {
            OR: [
                { description_contains: filter },
                { name_contains: filter },
                {
                    location: {
                        state_contains: filter
                    }
                },
                {
                    location: {
                        country_contains: filter
                    }
                },
                {
                    location: {
                        lga_contains: filter
                    }
                }
            ],
            ...filterbyUser,
            ...filterByCountry,
            ...filterByState
        } || {};

    const skipQuery = skip ? { skip } : {};
    const firstQuery = first ? { first } : {};
    const QueryParams = {
        ...skipQuery,
        ...firstQuery
    };
    try {
        return await prisma.listings({
            where,
            ...QueryParams
        });
    } catch (error) {
        throw error;
    }
};

export { createListing, listings };
