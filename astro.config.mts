import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import rehypeExternalLinks from "rehype-external-links";
import rehypePrettyCode from "rehype-pretty-code";
import { transformerNotationDiff } from "@shikijs/transformers";

// https://astro.build/config
export default defineConfig({
  site: "https://michaelwatts.me",
  integrations: [mdx(), tailwind(), svelte()],
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: {
            dark: "vitesse-dark",
            light: "vitesse-light",
          },
          transformers: [transformerNotationDiff()],
          onVisitHighlightedLine(node: any) {
            node?.properties?.className?.push("highlighted");
          },
          onVisitHighlightedChars(node: any) {
            node?.properties?.className
              ? node.properties.className.push("highlighted-chars")
              : (node.properties.className = ["highlighted-chars"]);
          },
        },
      ],
      [
        rehypeExternalLinks,
        {
          content: { type: "text", value: " ☍" },
          target: "_blank",
        },
      ],
    ],
  },
});
