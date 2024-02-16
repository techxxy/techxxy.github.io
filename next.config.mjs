import { withContentlayer } from "next-contentlayer";

/** 
 * @type {import('next').NextConfig} 
*/
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  experimental: {
		mdxRs: true,
	},
    /**
     * Enable static exports for the App Router.
     *
     * @see https://nextjs.org/docs/app/building-your-application/deploying/static-exports
     */
    output: "export",
  
  };
  
  export default withContentlayer(nextConfig);