import { prisma } from '../generated';

const seedConfig = {
    numberOfSpaces: 1
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const setup = async () => {
    try {
        await prisma.createListingsFrequencies({
            id: 1,
            name: 'As often as possible',
            slug: 'as-often-as-possible',
            default: true
        });
        await prisma.createListingsFrequencies({
            id: 2,
            name: 'Weekly',
            slug: 'weekly',
            default: true
        });
        await prisma.createListingsFrequencies({
            id: 3,
            name: 'Monthly',
            slug: 'monthly',
            default: true
        });
        await prisma.createListingsFrequencies({
            id: 4,
            name: 'Twice a year',
            slug: 'twice-a-year',
            default: true
        });
        await prisma.createListingsFrequencies({
            id: 5,
            name: 'Yearly',
            slug: 'yearly',
            default: true
        });
        console.log('Listing Frequencies options seeded!');
    } catch (err) {
        console.log('Listing Frequencies options not seeded! Error:', err.message);
    }
    try {
        await prisma.createSpacesOptions({
            id: 1,
            name: 'Unshelved-spaces',
            slug: 'unshelved-spaces',
            default: true
        });
        await prisma.createSpacesOptions({
            id: 2,
            name: 'Shelved-spaces',
            slug: 'shelved-spaces',
            default: true
        });
        console.log('Spaces options seeded!');
    } catch (err) {
        console.log('Spaces options not seeded! Error:', err.message);
    }
    try {
        await prisma.createPropertiesOptions({
            id: 1,
            name: 'Three Bedroom flat',
            slug: 'three-bedroom-flat',
            default: true
        });
        await prisma.createPropertiesOptions({
            id: 2,
            name: 'Duplex',
            slug: 'duplex',
            default: true
        });
        await prisma.createPropertiesOptions({
            id: 3,
            name: 'Shop',
            slug: 'shop',
            default: true
        });
        await prisma.createPropertiesOptions({
            id: 4,
            name: 'Office Complex',
            slug: 'office-complex',
            default: true
        });
        await prisma.createPropertiesOptions({
            id: 5,
            name: 'Hotel',
            slug: 'hotel',
            default: true
        });
        await prisma.createPropertiesOptions({
            id: 6,
            name: 'Private property',
            slug: 'private-property',
            default: true
        });
        console.log('Properties options seeded!');
    } catch (err) {
        console.log('Properties options not seeded! Error:', err.message);
    }
    try {
        await prisma.createFloorsOptions({
            id: 1,
            name: 'Cement floor',
            slug: 'cement-floor',
            default: true
        });
        await prisma.createFloorsOptions({
            id: 2,
            name: 'Tiled floor',
            slug: 'tiled-floor',
            default: true
        });
        await prisma.createFloorsOptions({
            id: 3,
            name: 'Terrazo floor',
            slug: 'terrazo-floor',
            default: true
        });
        await prisma.createFloorsOptions({
            id: 4,
            name: 'Marble floor',
            slug: 'marble-floor',
            default: true
        });
        await prisma.createFloorsOptions({
            id: 5,
            name: 'Carpet floor',
            slug: 'carpet-floor',
            default: true
        });
        await prisma.createFloorsOptions({
            id: 6,
            name: 'Hardwood floor',
            slug: 'hardwood-floor',
            default: true
        });
        console.log('Floor options seeded!');
    } catch (err) {
        console.log('Floor options not seeded! Error:', err.message);
    }
    try {
        await prisma.createWallFinishesOptions({
            id: 1,
            name: 'Painted gloss',
            slug: 'painted-gloss',
            default: true
        });
        await prisma.createWallFinishesOptions({
            id: 2,
            name: 'Emolsion painted',
            slug: 'emolsion-painted',
            default: true
        });
        await prisma.createWallFinishesOptions({
            id: 3,
            name: 'Tailed finishing',
            slug: 'tailed-finishing',
            default: true
        });
        await prisma.createWallFinishesOptions({
            id: 4,
            name: 'Wallpaper',
            slug: 'wallpaper',
            default: true
        });
        await prisma.createWallFinishesOptions({
            id: 5,
            name: 'Scrided',
            slug: 'scrided',
            default: true
        });
        console.log('Wall finish options seeded!');
    } catch (err) {
        console.log('Wall finish options not seeded! Error:', err.message);
    }
    try {
        await prisma.createRoofingMaterialOptions({
            id: 1,
            name: 'Aluminium',
            slug: 'aluminium',
            default: true
        });
        await prisma.createRoofingMaterialOptions({
            id: 2,
            name: 'Corrugated iron',
            slug: 'corrugated-iron',
            default: true
        });
        await prisma.createRoofingMaterialOptions({
            id: 3,
            name: 'Asbestos',
            slug: 'asbestos',
            default: true
        });
        await prisma.createRoofingMaterialOptions({
            id: 4,
            name: 'Slates',
            slug: 'slates',
            default: true
        });
        await prisma.createRoofingMaterialOptions({
            id: 5,
            name: 'Stone coated',
            slug: 'stone-coated',
            default: true
        });
        console.log('Roofing Material options seeded!');
    } catch (err) {
        console.log('Roofing Material options not seeded! Error:', err.message);
    }
    try {
        await prisma.createOrganizationType({
            id: 'ck5lippgi00140a31lloh8pef',
            name: 'merchant'
        });
        await prisma.createOrganizationType({
            id: 'ck5lipxks00190a31g6c8z96t',
            name: 'warehouser'
        });
        console.log('Organization types seeded!');
    } catch (err) {
        console.log('Organization types not seeded! Error:', err.message);
    }
    try {
        await prisma.createRole({
            id: 'ck5liq598001e0a31foyummqp',
            name: 'owner'
        });
        console.log('Roles seeded!');
    } catch (err) {
        console.log('Roles not seeded! Error:', err.message);
    }
    try {
        await prisma.createAmenitiesOptions({
            id: 1,
            name: 'Smoke detector',
            slug: 'smoke-detector',
            default: true
        });
        await prisma.createAmenitiesOptions({
            id: 2,
            name: 'Fire extinguisher',
            slug: 'fire-extinguisher',
            default: true
        });
        await prisma.createAmenitiesOptions({
            id: 3,
            name: 'Luck on warehouse',
            slug: 'luck-on-warehouse',
            default: true
        });
        await prisma.createAmenitiesOptions({
            id: 4,
            name: 'Wooden/Plastic pallets',
            slug: 'wooden-plastic-pallets',
            default: true
        });
        await prisma.createAmenitiesOptions({
            id: 5,
            name: 'Wooden/Metal racks',
            slug: 'wooden-metal-racks',
            default: true
        });
        console.log('Amenities options seeded!');
    } catch (err) {
        console.log('Amenities options not seeded! Error:', err.message);
    }

    try {
        await prisma.createValueAddedServices({
            id: 1,
            name: 'Product sorting',
            slug: 'product-sorting',
            default: true
        });
        await prisma.createValueAddedServices({
            id: 2,
            name: 'Product packaging',
            slug: 'product-packaging',
            default: true
        });
        await prisma.createValueAddedServices({
            id: 3,
            name: 'Regular fumigation',
            slug: 'regular-fumigation'
        });
        await prisma.createValueAddedServices({
            id: 4,
            name: 'Regular cleaning',
            slug: 'regular-cleaning',
            default: true
        });
        await prisma.createValueAddedServices({
            id: 5,
            name: 'Terminal Pick-up service',
            slug: 'terminal-pick-up-services',
            default: true
        });
        console.log('Value added service seeded!');
    } catch (err) {
        console.log('Value added service not seeded! Error:', err.message);
    }
    try {
        await prisma.createListingProducts({
            id: 1,
            name: 'Herbal Tea',
            slug: 'herbal-tea',
            default: true
        });
        await prisma.createListingProducts({
            id: 2,
            name: 'Sexual wellness products',
            slug: 'sexual-wellness-products',
            default: true
        });
        await prisma.createListingProducts({
            id: 3,
            name: 'Beauty & Personal care',
            slug: 'beauty-and-personal-care',
            default: true
        });
        await prisma.createListingProducts({
            id: 4,
            name: 'Haircare products',
            slug: 'haircare-products',
            default: true
        });
        await prisma.createListingProducts({
            id: 5,
            name: 'Artificial hair & extensions',
            default: true,
            slug: 'artificial-hair-and-extensions'
        });
        await prisma.createListingProducts({
            id: 6,
            name: 'Exotic wines & spirits',
            slug: 'exotic-wines-and-spirits',
            default: true
        });
        await prisma.createListingProducts({
            id: 7,
            name: 'Baby products',
            slug: 'baby-products',
            default: true
        });
        console.log('Listing Products seeded!');
    } catch (err) {
        console.log('Listing Products not seeded! Error:', err.message);
    }
    try {
        await prisma.createIdentificationsOptions({
            id: 1,
            name: 'National Id',
            slug: 'national-id',
            default: true
        });
        await prisma.createIdentificationsOptions({
            id: 2,
            name: 'International Passport',
            slug: 'international-passport',
            default: true
        });
        await prisma.createIdentificationsOptions({
            id: 3,
            name: 'Drivers License',
            slug: 'drivers-license',
            default: true
        });
        await prisma.createIdentificationsOptions({
            id: 4,
            name: 'Voters Card',
            slug: 'voters-card',
            default: true
        });
        console.log('Identification options seeded!');
    } catch (err) {
        console.log('Identification options not seeded! Error:', err.message);
    }
    try {
        await prisma.createSelectOptions({
            id: 1,
            name: 'Yes',
            slug: 'yes'
        });
        await prisma.createSelectOptions({
            id: 2,
            name: 'No',
            slug: 'no'
        });
        await prisma.createSelectOptions({
            id: 3,
            name: 'Not yet',
            slug: 'not-yet'
        });
        await prisma.createSelectOptions({
            id: 4,
            name: 'Not sure',
            slug: 'not-sure'
        });
        console.log('Select options seeded!');
    } catch (err) {
        console.log('Select options not seeded! Error:', err.message);
    }
    try {
        await prisma.createRequisitionDuration({
            id: 1,
            name: '30 days',
            slug: '30-days'
        });
        await prisma.createRequisitionDuration({
            id: 2,
            name: '90 days',
            slug: '90-days'
        });
        await prisma.createRequisitionDuration({
            id: 3,
            name: '180 days',
            slug: '180-days'
        });
        await prisma.createRequisitionDuration({
            id: 4,
            name: '360 days',
            slug: '360-days'
        });
        console.log('Requisition Durations seeded!');
    } catch (err) {
        console.log('Requisition Durations not seeded! Error:', err.message);
    }
    try {
        await prisma.createListingRequirements({
            id: 1,
            name: 'Confirmed e-mail address',
            slug: 'confirmed-e-mail-address',
            default: true
        });
        await prisma.createListingRequirements({
            id: 2,
            name: 'Confirmed phone number',
            slug: 'confirmed-phone-number',
            default: true
        });
        await prisma.createListingRequirements({
            id: 3,
            name: 'Payment information',
            slug: 'payment-information',
            default: true
        });
        await prisma.createListingRequirements({
            id: 4,
            name: 'Agree to your time schedule',
            slug: 'agree-to-your-schedule',
            default: true
        });
        await prisma.createListingRequirements({
            id: 5,
            name: 'Product will be shipped to you',
            slug: 'product-will-be-shipped-to-you',
            default: true
        });
        await prisma.createListingRequirements({
            id: 6,
            name: 'Tell you the shelf life of their products',
            slug: 'tell-you-the-shelf-life-of-their-products',
            default: true
        });
        await prisma.createListingRequirements({
            id: 7,
            name: 'Product expiry date',
            slug: 'product-expiry-date',
            default: true
        });
        console.log('Listing Requirements seeded!');
    } catch (err) {
        console.log('Listing Requirements not seeded! Error:', err.message);
    }
    
    return 'done';
};

setup();
