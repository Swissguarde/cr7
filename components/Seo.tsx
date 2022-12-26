import Head from "next/head";

interface Props {
  title: string;
}
const Seo = ({ title }: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/cr7favico.png" />
    </Head>
  );
};
export default Seo;
