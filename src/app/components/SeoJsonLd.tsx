import type { JsonLdSchema } from "../lib/seo";

type SeoJsonLdProps = {
  schemas: JsonLdSchema[];
  idPrefix?: string;
};

function serializeJsonLd(
  schema: JsonLdSchema,
): string {
  return JSON.stringify(
    schema,
  ).replace(/</g, "\\u003c");
}

export default function SeoJsonLd({
  schemas,
  idPrefix = "dynamic-schema",
}: SeoJsonLdProps) {
  /*
   * API schema not available:
   * render nothing.
   */
  if (schemas.length === 0) {
    return null;
  }

  return (
    <>
      {schemas.map(
        (schema, index) => (
          <script
            key={`${idPrefix}-${index}`}
            id={`${idPrefix}-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html:
                serializeJsonLd(
                  schema,
                ),
            }}
          />
        ),
      )}
    </>
  );
}