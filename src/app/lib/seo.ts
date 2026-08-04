import type { Metadata } from "next";
import { cache } from "react";
import axios from "axios";

import { apiUrl } from "../config";

export type SeoData = {
  id: number;
  page_name: string;
  meta_title: string | null;
  meta_keyword: string | null;
  meta_description: string | null;
  head: string | null;
  body: string | null;
  h1_tag: string | null;
  h1_tag_grey: string | null;
  created_at: string;
  updated_at: string;
};

type SeoApiResponse = {
  success: boolean;
  message: string;
  data: SeoData | null;
};

type SeoMetadataOptions = {
  id: string;
  fallbackTitle: string;
  fallbackDescription: string;
};

export type JsonLdSchema = Record<
  string,
  unknown
>;

/* =========================================
   SEO API
   ========================================= */

/*
 * React cache prevents duplicate Axios calls
 * when generateMetadata() and page component
 * request the same SEO ID during one render/build.
 */
export const getSeoData = cache(
  async (
    id: string,
  ): Promise<SeoData | null> => {
    try {
      const response =
        await axios.post<SeoApiResponse>(
          `${apiUrl}/getSeoById`,
          {
            id,
          },
          {
            headers: {
              Accept:
                "application/json",

              "Content-Type":
                "application/json",
            },

            timeout: 15000,
          },
        );

      if (
        !response.data?.success ||
        !response.data?.data
      ) {
        console.error(
          `SEO API failed for ID ${id}:`,
          response.data?.message,
        );

        return null;
      }

      return response.data.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          `SEO Axios error for ID ${id}:`,
          {
            message: error.message,
            status:
              error.response?.status,
            data:
              error.response?.data,
          },
        );
      } else {
        console.error(
          `SEO unknown error for ID ${id}:`,
          error,
        );
      }

      return null;
    }
  },
);

/* =========================================
   Metadata parsing helpers
   ========================================= */

function escapeRegExp(
  value: string,
): string {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );
}

function getHtmlAttribute(
  tag: string,
  attribute: string,
): string | undefined {
  const expression = new RegExp(
    `${escapeRegExp(
      attribute,
    )}\\s*=\\s*["']([^"']*)["']`,
    "i",
  );

  return (
    tag.match(expression)?.[1]?.trim() ||
    undefined
  );
}

function getMetaContent(
  head: string,
  metaName: string,
): string | undefined {
  if (!head) {
    return undefined;
  }

  const metaTags =
    head.match(/<meta\b[^>]*>/gi) ?? [];

  const requiredName =
    metaName.toLowerCase();

  const matchedTag = metaTags.find(
    (tag) => {
      const property =
        getHtmlAttribute(
          tag,
          "property",
        )?.toLowerCase();

      const name =
        getHtmlAttribute(
          tag,
          "name",
        )?.toLowerCase();

      return (
        property === requiredName ||
        name === requiredName
      );
    },
  );

  return matchedTag
    ? getHtmlAttribute(
        matchedTag,
        "content",
      )
    : undefined;
}

function getCanonicalUrl(
  head: string,
): string | undefined {
  if (!head) {
    return undefined;
  }

  const linkTags =
    head.match(/<link\b[^>]*>/gi) ?? [];

  const canonicalTag = linkTags.find(
    (tag) => {
      const rel =
        getHtmlAttribute(
          tag,
          "rel",
        )?.toLowerCase();

      return rel === "canonical";
    },
  );

  return canonicalTag
    ? getHtmlAttribute(
        canonicalTag,
        "href",
      )
    : undefined;
}

function parseKeywords(
  keywords: string | null,
): string[] | undefined {
  if (!keywords) {
    return undefined;
  }

  const values = keywords
    .split(/\r?\n|,/)
    .map((keyword) =>
      keyword.trim(),
    )
    .filter(Boolean);

  return values.length > 0
    ? values
    : undefined;
}

/* =========================================
   Dynamic JSON-LD extraction
   ========================================= */

/*
 * Schema is extracted only from API head/body.
 * No static or hardcoded schema is added.
 */
export function extractJsonLdSchemas(
  ...sources: Array<
    string | null | undefined
  >
): JsonLdSchema[] {
  const schemas: JsonLdSchema[] = [];

  for (const source of sources) {
    if (!source?.trim()) {
      continue;
    }

    /*
     * Supports:
     * <script type="application/ld+json">
     * {...}
     * </script>
     */
    const scriptPattern =
      /<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

    let match:
      | RegExpExecArray
      | null;

    let scriptFound = false;

    while (
      (match =
        scriptPattern.exec(source)) !==
      null
    ) {
      scriptFound = true;

      const jsonText =
        match[1]?.trim();

      if (!jsonText) {
        continue;
      }

      try {
        const parsed =
          JSON.parse(jsonText);

        if (Array.isArray(parsed)) {
          for (const schema of parsed) {
            if (
              schema &&
              typeof schema ===
                "object"
            ) {
              schemas.push(
                schema as JsonLdSchema,
              );
            }
          }
        } else if (
          parsed &&
          typeof parsed === "object"
        ) {
          schemas.push(
            parsed as JsonLdSchema,
          );
        }
      } catch (error) {
        console.error(
          "Invalid API JSON-LD schema:",
          error,
        );
      }
    }

    /*
     * Optional support:
     * API body may contain raw JSON without
     * <script> tag.
     */
    if (!scriptFound) {
      const cleanSource =
        source.trim();

      if (
        cleanSource.startsWith("{") ||
        cleanSource.startsWith("[")
      ) {
        try {
          const parsed =
            JSON.parse(cleanSource);

          if (Array.isArray(parsed)) {
            for (const schema of parsed) {
              if (
                schema &&
                typeof schema ===
                  "object"
              ) {
                schemas.push(
                  schema as JsonLdSchema,
                );
              }
            }
          } else if (
            parsed &&
            typeof parsed === "object"
          ) {
            schemas.push(
              parsed as JsonLdSchema,
            );
          }
        } catch (error) {
          console.error(
            "Invalid raw API schema:",
            error,
          );
        }
      }
    }
  }

  return schemas;
}

/* =========================================
   Dynamic metadata
   ========================================= */

export async function buildSeoMetadata({
  id,
  fallbackTitle,
  fallbackDescription,
}: SeoMetadataOptions): Promise<Metadata> {
  const seo = await getSeoData(id);

  if (!seo) {
    return {
      title: fallbackTitle,

      description:
        fallbackDescription,

      robots: {
        index: true,
        follow: true,
      },
    };
  }

  const head = seo.head ?? "";

  const title =
    seo.meta_title ||
    getMetaContent(
      head,
      "og:title",
    ) ||
    seo.page_name ||
    fallbackTitle;

  const description =
    seo.meta_description ||
    getMetaContent(
      head,
      "og:description",
    ) ||
    fallbackDescription;

  const canonicalUrl =
    getCanonicalUrl(head) ||
    getMetaContent(
      head,
      "og:url",
    );

  const openGraphImage =
    getMetaContent(
      head,
      "og:image",
    );

  const openGraphImageAlt =
    getMetaContent(
      head,
      "og:image:alt",
    );

  const openGraphImageType =
    getMetaContent(
      head,
      "og:image:type",
    );

  const twitterImage =
    getMetaContent(
      head,
      "twitter:image",
    ) || openGraphImage;

  const twitterImageAlt =
    getMetaContent(
      head,
      "twitter:image:alt",
    ) ||
    openGraphImageAlt ||
    title;

  const twitterUrl =
    getMetaContent(
      head,
      "twitter:url",
    );

  const otherMetadata: Record<
    string,
    string
  > = {};

  if (twitterUrl) {
    otherMetadata["twitter:url"] =
      twitterUrl;
  }

  return {
    title,
    description,

    keywords: parseKeywords(
      seo.meta_keyword,
    ),

    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,

        "max-image-preview":
          "large",

        "max-snippet": -1,

        "max-video-preview": -1,
      },
    },

    alternates: canonicalUrl
      ? {
          canonical:
            canonicalUrl,
        }
      : undefined,

    openGraph: {
      type: "website",

      title:
        getMetaContent(
          head,
          "og:title",
        ) || title,

      description:
        getMetaContent(
          head,
          "og:description",
        ) || description,

      url:
        getMetaContent(
          head,
          "og:url",
        ) || canonicalUrl,

      siteName:
        getMetaContent(
          head,
          "og:site_name",
        ),

      locale:
        getMetaContent(
          head,
          "og:locale",
        ),

      images: openGraphImage
        ? [
            {
              url:
                openGraphImage,

              alt:
                openGraphImageAlt ||
                title,

              type:
                openGraphImageType,
            },
          ]
        : undefined,
    },

    twitter: {
      card:
        "summary_large_image",

      title:
        getMetaContent(
          head,
          "twitter:title",
        ) || title,

      description:
        getMetaContent(
          head,
          "twitter:description",
        ) || description,

      site:
        getMetaContent(
          head,
          "twitter:site",
        ),

      creator:
        getMetaContent(
          head,
          "twitter:creator",
        ),

      images: twitterImage
        ? [
            {
              url:
                twitterImage,

              alt:
                twitterImageAlt,
            },
          ]
        : undefined,
    },

    other:
      Object.keys(otherMetadata)
        .length > 0
        ? otherMetadata
        : undefined,
  };
}