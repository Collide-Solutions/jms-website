export type PortfolioPhoto = { image: string; thumbnail?: string; alt: string };
export type PortfolioProject = { name: string; photos: PortfolioPhoto[] };
export type PortfolioCategory = { name: string; projects: PortfolioProject[] };

function project(name: string, folder: string, photos: string[]): PortfolioProject {
  return {
    name,
    photos: photos.map((photo) => {
      const path = `/portfolio/${folder}/${photo}`;
      const description = photo.replaceAll("-", " ");
      return {
        image: `${path}.webp`,
        thumbnail: `${path}-thumb.webp`,
        alt: description[0].toUpperCase() + description.slice(1),
      };
    }),
  };
}

// The first photo in each category is its cover.
export const portfolio: PortfolioCategory[] = [
  {
    name: "Automobile",
    projects: [
      project("Automobile Showroom Signs", "automobile-showroom-signs", [
        "citroen-showroom-at-dusk",
        "illuminated-citroen-showroom",
        "annamalai-toyota-dealership",
        "harley-davidson-showroom",
        "harley-davidson-entrance",
        "mg-showroom-facade",
        "renault-pylon-and-showroom",
        "renault-showroom-facade",
        "kia-showroom-facade",
        "kia-dealership-signage",
        "volvo-showroom-facade",
        "tesla-facade-sign",
        "mercedes-benz-channel-letters",
        "mercedes-benz-showroom-entrance",
        "lexus-showroom-signage",
        "jeep-showroom-and-pylon",
      ]),
      project("Automobile Furniture", "automobile-furniture", [
        "showroom-lounge-with-red-seating",
        "showroom-cafe-seating",
        "showroom-lounge-with-green-sofa",
        "showroom-lounge-with-colourful-chairs",
        "showroom-lounge-and-material-display",
        "kia-customer-counter",
        "showroom-consultation-table",
        "showroom-reception-and-seating",
        "showroom-lounge-with-grey-seating",
        "showroom-meeting-table",
        "showroom-lounge-with-accent-chairs",
        "citroen-cafe-counter",
        "showroom-bar-counter",
        "brick-walled-display-area",
        "brick-walled-reception-desk",
        "tufted-leather-showroom-seating",
      ]),
      project("Automobile Showroom Fit Outs", "automobile-showroom-fit-outs", [
        "renault-showroom-feature-wall",
        "renault-showroom-seating-area",
        "illuminated-renault-emblem",
        "renault-digital-display-and-seating",
        "renault-showroom-coloured-glass",
        "renault-showroom-green-glass-partition",
        "renault-showroom-meeting-area",
        "nissan-dealership-exterior",
      ]),
    ],
  },
  {
    name: "Turnkey Project",
    projects: [
      project("Voltas Experience Centre, Mumbai", "turnkey-prabhadevi", [
        "voltas-experience-centre-showroom",
        "voltas-customer-lounge",
        "voltas-smart-home-display",
        "voltas-appliance-displays",
        "voltas-beko-reception",
        "voltas-product-showcase",
        "voltas-juice-bar-display",
        "voltas-appliance-display-wall",
        "voltas-kitchen-display",
        "voltas-smart-home-kitchen",
        "voltas-smart-home-media-room",
      ]),
      project("Voltas Experience Centre, Chennai", "turnkey-chennai", [
        "voltas-experience-centre-interior",
        "voltas-reception-desk",
        "voltas-open-plan-office",
        "voltas-meeting-room",
        "voltas-showroom-consultation-area",
        "voltas-factory-products-display",
        "voltas-showroom-lounge",
        "voltas-glazed-meeting-room",
        "voltas-showroom-product-bays",
        "voltas-timber-feature-wall",
        "voltas-display-shelving",
        "voltas-showroom-walkway",
        "voltas-showroom-display-island",
      ]),
    ],
  },
  {
    name: "Gas Station",
    projects: [
      project("Gas Station RVIs", "gas-station-rvis", [
        "nayara-station-canopy",
        "indian-oil-station-canopy",
        "illuminated-jio-bp-canopy",
        "reliance-fuel-station",
        "reliance-pylon-sign",
      ]),
    ],
  },
  {
    name: "Healthcare",
    projects: [
      project("Healthcare Branding", "healthcare-branding", [
        "fortis-hospital-facade",
        "fortis-hospital-at-dusk",
        "fortis-hospital-directory-sign",
      ]),
    ],
  },
  {
    name: "Hospitality",
    projects: [
      project("Hospitality Interiors & Furniture", "hospitality-interiors", [
        "hospitality-reception-counter",
        "wall-mounted-hospitality-desk",
        "hospitality-bed-platform",
        "hospitality-storage-and-seating-unit",
      ]),
      project("Hospitality Branding", "hospitality-branding", [
        "ginger-hotel-facade-sign",
        "ginger-hotel-exterior",
        "ginger-hotel-pylon-sign",
      ]),
    ],
  },
  {
    name: "Retail",
    projects: [
      project("Retail Outlet Facades", "retail-outlet-facades", [
        "westside-glass-facade",
        "westside-curved-storefront",
        "westside-storefront-at-dusk",
        "max-illuminated-storefront",
        "max-glass-storefront",
        "star-bazaar-glass-facade",
        "zudio-glass-storefront",
        "zudio-illuminated-storefront",
      ]),
      project("Retail Outlet Fixtures", "retail-outlet-fixtures", [
        "zudio-merchandise-fixtures",
        "retail-floor-with-clothing-racks",
        "retail-fitting-room-entrance",
        "two-sided-garment-rack",
        "vertical-merchandise-display",
        "multi-tier-garment-rack",
      ]),
      project("Retail Outlet Furniture", "retail-outlet-furniture", [
        "open-shelf-display-counters",
        "dark-retail-counters-and-cabinets",
        "retail-media-cabinet",
        "retail-fitting-room-partitions",
        "retail-fitted-storage",
        "dark-merchandise-display-cabinet",
      ]),
      project("Retail Outlet Signage", "retail-outlet-signage", [
        "croma-storefront-sign",
        "star-bazaar-and-zudio-storefront-signs",
      ]),
    ],
  },
];
