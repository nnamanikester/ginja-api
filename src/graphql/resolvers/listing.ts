import { createListing, listings } from '../../controllers/listing';

const listingQueries = {
    listings: (root: any, args: any, context: any, info: any) => listings(root, args, context)
};

const listingMutations = {
    addListing: (root: any, args: any, context: any) => createListing(root, args, context)
};

const listingTypes = {
    Listing: {
        id: (parent: any) => parent.id,
        user: (parent: any, args: any, context: any) => context.prisma.listing({ id: parent.id }).user(),
        name: (parent: any) => parent.name,
        slug: (parent: any) => parent.slug,
        description: (parent: any) => parent.description,
        price: (parent: any) => parent.price,
        discount: (parent: any) => parent.discount,
        currency: (parent: any) => parent.currency,
        proofOfOwnership: (parent: any) => parent.proofOfOwnership,
        identification: (parent: any, args: any, context: any) => context.prisma.listing({ id: parent.id }).identification(),
        spacing: (parent: any, args: any, context: any) => context.prisma.listing({ id: parent.id }).spacing(),
        property: (parent: any, args: any, context: any) => context.prisma.listing({ id: parent.id }).property(),
        floor: (parent: any, args: any, context: any) => context.prisma.listing({ id: parent.id }).floor(),
        wallFinish: (parent: any, args: any, context: any) => context.prisma.listing({ id: parent.id }).wallFinish(),
        roofing: (parent: any, args: any, context: any) => context.prisma.listing({ id: parent.id }).roofing(),
        isSecure: (parent: any, args: any, context: any) => context.prisma.listing({ id: parent.id }).isSecure(),
        pest: (parent: any, args: any, context: any) => context.prisma.listing({ id: parent.id }).pest(),
        windows: (parent: any) => parent.windows,
        location: (parent: any, args: any, context: any) => context.prisma.listing({ id: parent.id }).location(),
        amenities: (parent: any, args: any, context: any) => context.prisma.listing({ id: parent.id }).amenities(),
        avatar: (parent: any) => parent.avatar,
        vas: (parent: any, args: any, context: any) => context.prisma.listing({ id: parent.id }).vas(),
        listingPhotos: (parent: any, args: any, context: any) => context.prisma.listing({ id: parent.id }).listingPhotos(),
        frequency: (parent: any, args: any, context: any) => context.prisma.listing({ id: parent.id }).frequency(),
        requirements: (parent: any, args: any, context: any) => context.prisma.listing({ id: parent.id }).requirements(),
        products: (parent: any, args: any, context: any) => context.prisma.listing({ id: parent.id }).requirements(),
        availability: (parent: any, args: any, context: any) => context.prisma.listing({ id: parent.id }).availability(),
        dimensions: (parent: any, args: any, context: any) => context.prisma.listing({ id: parent.id }).dimensions(),
        rating: (parent: any, args: any, context: any) => context.prisma.listing({ id: parent.id }).rating()
    }
};

export { listingTypes, listingMutations, listingQueries };
