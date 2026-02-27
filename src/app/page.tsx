import { HomePage } from "@/components/home/HomePage";
import { getSiteContent } from "@/lib/site-content";
import { buildLocalBusinessJsonLd } from "@/lib/site-structured-data";

export default async function Page() {
  const content = await getSiteContent("en");
  const localBusinessJsonLd = buildLocalBusinessJsonLd(content);

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <HomePage content={content} />
    </>
  );
}
