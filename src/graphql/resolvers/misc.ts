const miscQueries = {
    spacesOptions: (root: any, args: any, context: any, info: any) => context.prisma.spacesOptionses(),
    propertiesOptions: (root: any, args: any, context: any, info: any) => context.prisma.propertiesOptionses(),
    wallFinishesOptions: (root: any, args: any, context: any, info: any) => context.prisma.wallFinishesOptionses(),
    roofingMaterialOptions: (root: any, args: any, context: any, info: any) => context.prisma.roofingMaterialOptionses(),
    floorsOptions: (root: any, args: any, context: any, info: any) => context.prisma.floorsOptionses(),
    selectOptions: (root: any, args: any, context: any, info: any) => context.prisma.selectOptionses(),
    amenitiesOptions: (root: any, args: any, context: any, info: any) => context.prisma.amenitiesOptionses(),
    valueAddedServices: (root: any, args: any, context: any, info: any) => context.prisma.valueAddedServiceses(),
    listingsFrequencies: (root: any, args: any, context: any, info: any) => context.prisma.listingsFrequencieses(),
    listingRequirements: (root: any, args: any, context: any, info: any) => context.prisma.listingRequirementses(),
    listingProducts: (root: any, args: any, context: any, info: any) => context.prisma.listingProductses()
};

const miscTypes = {
    ListingRequirements: {
        id: (parent: any) => parent.id,
        slug: (parent: any) => parent.slug,
        name: (parent: any) => parent.name,
        default: (parent: any) => parent.default
    },
    WallFinishesOptions: {
        id: (parent: any) => parent.id,
        slug: (parent: any) => parent.slug,
        name: (parent: any) => parent.name,
        default: (parent: any) => parent.default
    },
    SelectOptions: {
        id: (parent: any) => parent.id,
        slug: (parent: any) => parent.slug,
        name: (parent: any) => parent.name
    },
    SpacesOptions: {
        id: (parent: any) => parent.id,
        slug: (parent: any) => parent.slug,
        name: (parent: any) => parent.name
    },
    RoofingMaterialOptions: {
        id: (parent: any) => parent.id,
        slug: (parent: any) => parent.slug,
        name: (parent: any) => parent.name
    },
    FloorsOptions: {
        id: (parent: any) => parent.id,
        slug: (parent: any) => parent.slug,
        name: (parent: any) => parent.name
    },
    AmenitiesOptions: {
        id: (parent: any) => parent.id,
        slug: (parent: any) => parent.slug,
        name: (parent: any) => parent.name
    },
    ValueAddedServices: {
        id: (parent: any) => parent.id,
        slug: (parent: any) => parent.slug,
        name: (parent: any) => parent.name
    },
    ListingsFrequencies: {
        id: (parent: any) => parent.id,
        slug: (parent: any) => parent.slug,
        name: (parent: any) => parent.name
    },
    ListingProducts: {
        id: (parent: any) => parent.id,
        slug: (parent: any) => parent.slug,
        name: (parent: any) => parent.name
    },
    PropertiesOptions: {
        id: (parent: any) => parent.id,
        slug: (parent: any) => parent.slug,
        name: (parent: any) => parent.name
    }
};

export { miscTypes, miscQueries };
