import { type SchemaTypeDefinition } from "sanity";
import { packageType } from "./schema/packageType";
import { reviewType } from "./schema/reviewType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [packageType, reviewType],
};
