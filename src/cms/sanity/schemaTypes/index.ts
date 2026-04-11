import { heroSchema } from './hero';
import { aboutSchema } from './about';
import { ministrySchema } from './ministry';
import { serviceTimeSchema } from './serviceTime';
import { eventSchema } from './event';
import { gallerySchema } from './gallery';
import { parishSchema } from './parish';
import { siteConfigSchema } from './siteConfig';

export const schemaTypes = [
  // Singleton
  siteConfigSchema,
  heroSchema,
  aboutSchema,
  // Collections
  ministrySchema,
  serviceTimeSchema,
  eventSchema,
  gallerySchema,
  parishSchema,
];
