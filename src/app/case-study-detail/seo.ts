export type CaseStudySeoData = {
  slug: string;
  title: string;
  description: string | null;
  hero_image: string;
  meta_title: string | null;
  meta_keyword: string | null;
  meta_description: string | null;
  head: string | null;
  body: string | null;
};

type MetaAttribute = "name" | "property";
type Cleanup = () => void;

function findMetaTag(
  attribute: MetaAttribute,
  key: string,
): HTMLMetaElement | null {
  return (
    Array.from(
      document.head.querySelectorAll<HTMLMetaElement>("meta"),
    ).find((meta) => meta.getAttribute(attribute) === key) ?? null
  );
}

function updateMetaTag(
  attribute: MetaAttribute,
  key: string,
  content: string | null | undefined,
  cleanups: Cleanup[],
): void {
  const normalizedContent = content?.trim();

  if (!normalizedContent) {
    return;
  }

  const existingMeta = findMetaTag(attribute, key);

  if (existingMeta) {
    const previousContent = existingMeta.getAttribute("content");

    existingMeta.setAttribute("content", normalizedContent);

    cleanups.push(() => {
      if (previousContent === null) {
        existingMeta.removeAttribute("content");
      } else {
        existingMeta.setAttribute("content", previousContent);
      }
    });

    return;
  }

  const meta = document.createElement("meta");

  meta.setAttribute(attribute, key);
  meta.setAttribute("content", normalizedContent);
  meta.setAttribute("data-case-study-seo", "true");

  document.head.appendChild(meta);

  cleanups.push(() => {
    meta.remove();
  });
}

function updateCanonicalTag(
  href: string | null | undefined,
  cleanups: Cleanup[],
): void {
  const normalizedHref = href?.trim();

  if (!normalizedHref) {
    return;
  }

  const existingCanonical =
    document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (existingCanonical) {
    const previousHref = existingCanonical.getAttribute("href");

    existingCanonical.setAttribute("href", normalizedHref);

    cleanups.push(() => {
      if (previousHref === null) {
        existingCanonical.removeAttribute("href");
      } else {
        existingCanonical.setAttribute("href", previousHref);
      }
    });

    return;
  }

  const canonical = document.createElement("link");

  canonical.rel = "canonical";
  canonical.href = normalizedHref;
  canonical.setAttribute("data-case-study-seo", "true");

  document.head.appendChild(canonical);

  cleanups.push(() => {
    canonical.remove();
  });
}

function getParsedHead(head: string | null): Document | null {
  if (!head?.trim()) {
    return null;
  }

  return new DOMParser().parseFromString(head, "text/html");
}

function getMetaValue(
  parsedHead: Document | null,
  attribute: MetaAttribute,
  key: string,
): string | undefined {
  if (!parsedHead) {
    return undefined;
  }

  const tag = Array.from(
    parsedHead.querySelectorAll<HTMLMetaElement>("meta"),
  ).find((meta) => meta.getAttribute(attribute)?.trim() === key);

  return tag?.getAttribute("content")?.trim() || undefined;
}

function getCanonicalValue(parsedHead: Document | null): string | undefined {
  return (
    parsedHead
      ?.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?.getAttribute("href")
      ?.trim() || undefined
  );
}

function appendApiJsonLdSchemas(
  head: string | null,
  body: string | null,
  cleanups: Cleanup[],
): void {
  const sources = [head, body].filter(
    (source): source is string => Boolean(source?.trim()),
  );

  const schemaPattern =
    /<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

  for (const source of sources) {
    schemaPattern.lastIndex = 0;

    let match: RegExpExecArray | null;

    while ((match = schemaPattern.exec(source)) !== null) {
      const schemaText = match[1]?.trim();

      if (!schemaText) {
        continue;
      }

      try {
        const parsedSchema: unknown = JSON.parse(schemaText);
        const script = document.createElement("script");

        script.type = "application/ld+json";
        script.setAttribute("data-case-study-seo", "true");
        script.textContent = JSON.stringify(parsedSchema).replace(
          /</g,
          "\\u003c",
        );

        document.head.appendChild(script);

        cleanups.push(() => {
          script.remove();
        });
      } catch (error) {
        console.error("Invalid API JSON-LD schema:", error);
      }
    }
  }
}

export function applyCaseStudySeo(
  caseStudy: CaseStudySeoData,
): Cleanup {
  const cleanups: Cleanup[] = [];
  const previousTitle = document.title;
  const parsedHead = getParsedHead(caseStudy.head);

  const title =
    caseStudy.meta_title?.trim() ||
    getMetaValue(parsedHead, "property", "og:title") ||
    caseStudy.title?.trim() ||
    "Case Study | Purple Phase";

  const description =
    caseStudy.meta_description?.trim() ||
    getMetaValue(parsedHead, "property", "og:description") ||
    caseStudy.description?.trim() ||
    "";

  const fallbackCanonical = `${window.location.origin}/case-study-detail?slug=${encodeURIComponent(
    caseStudy.slug,
  )}`;

  const canonicalUrl =
    getCanonicalValue(parsedHead) ||
    getMetaValue(parsedHead, "property", "og:url") ||
    fallbackCanonical;

  const ogImage =
    getMetaValue(parsedHead, "property", "og:image") ||
    caseStudy.hero_image;

  document.title = title;
  cleanups.push(() => {
    document.title = previousTitle;
  });

  updateMetaTag("name", "description", description, cleanups);
  updateMetaTag("name", "keywords", caseStudy.meta_keyword, cleanups);

  updateCanonicalTag(canonicalUrl, cleanups);

  // Open Graph: API values get first priority; missing values use fallbacks.
  updateMetaTag(
    "property",
    "og:type",
    getMetaValue(parsedHead, "property", "og:type") || "article",
    cleanups,
  );
  updateMetaTag("property", "og:url", canonicalUrl, cleanups);
  updateMetaTag(
    "property",
    "og:title",
    getMetaValue(parsedHead, "property", "og:title") || title,
    cleanups,
  );
  updateMetaTag(
    "property",
    "og:description",
    getMetaValue(parsedHead, "property", "og:description") || description,
    cleanups,
  );
  updateMetaTag("property", "og:image", ogImage, cleanups);
  updateMetaTag(
    "property",
    "og:image:alt",
    getMetaValue(parsedHead, "property", "og:image:alt") || caseStudy.title,
    cleanups,
  );
  updateMetaTag(
    "property",
    "og:site_name",
    getMetaValue(parsedHead, "property", "og:site_name") || "Purple Phase",
    cleanups,
  );
  updateMetaTag(
    "property",
    "og:locale",
    getMetaValue(parsedHead, "property", "og:locale") || "en_IN",
    cleanups,
  );

  // Twitter card: API values get first priority; missing values use fallbacks.
  updateMetaTag(
    "name",
    "twitter:card",
    getMetaValue(parsedHead, "name", "twitter:card") ||
      "summary_large_image",
    cleanups,
  );
  updateMetaTag(
    "name",
    "twitter:url",
    getMetaValue(parsedHead, "name", "twitter:url") || canonicalUrl,
    cleanups,
  );
  updateMetaTag(
    "name",
    "twitter:title",
    getMetaValue(parsedHead, "name", "twitter:title") || title,
    cleanups,
  );
  updateMetaTag(
    "name",
    "twitter:description",
    getMetaValue(parsedHead, "name", "twitter:description") || description,
    cleanups,
  );
  updateMetaTag(
    "name",
    "twitter:image",
    getMetaValue(parsedHead, "name", "twitter:image") || ogImage,
    cleanups,
  );
  updateMetaTag(
    "name",
    "twitter:image:alt",
    getMetaValue(parsedHead, "name", "twitter:image:alt") || caseStudy.title,
    cleanups,
  );
  updateMetaTag(
    "name",
    "twitter:site",
    getMetaValue(parsedHead, "name", "twitter:site"),
    cleanups,
  );
  updateMetaTag(
    "name",
    "twitter:creator",
    getMetaValue(parsedHead, "name", "twitter:creator"),
    cleanups,
  );

  // JSON-LD is inserted only when it exists in the API head/body.
  appendApiJsonLdSchemas(caseStudy.head, caseStudy.body, cleanups);

  return () => {
    [...cleanups].reverse().forEach((cleanup) => {
      cleanup();
    });
  };
}