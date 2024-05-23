import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
};
export default withNextIntl(nextConfig);
