import Head from "next/head";

interface Props {
  title: string;
}
const Seo = ({ title }: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
export default Seo;
