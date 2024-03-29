import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://michaelwatts.me",
  integrations: [mdx(), tailwind(), svelte()],
  markdown: {
    shikiConfig: {
      theme: "vitesse-dark",
    },
  },
});
