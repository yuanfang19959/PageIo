// import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/yuque.css";
import BaseFooter from "./components/BaseFooter/index";
import BaseHeader from "./components/BaseHeader/index";

// export const metadata = {
//   title: "Next Stack 技术栈联盟",
//   description: "Next Stack技术联盟，诣在聚集各自领域的先进产品的代表，为下一代世界领先的基础软件服务努力拼搏，向全球用户提供有竞争力的软件产品服务，赢得全球用户的赞誉和口碑。",
//   alternates: {
//     canonical: '/',
//   },
//   openGraph: {
//     title: 'Next Stack 技术栈联盟',
//     description: "Next Stack技术联盟，诣在聚集各自领域的先进产品的代表，为下一代世界领先的基础软件服务努力拼搏，向全球用户提供有竞争力的软件产品服务，赢得全球用户的赞誉和口碑。",
//     image: "https://mdn.alipayobjects.com/huamei_22khvb/afts/img/A*RphFQIYS8h4AAAAAAAAAAAAADiGDAQ/original",
//     type: "website",
//   },
// };

export default function RootLayout(props) {
  return (
    <html>
      <body>
      <link rel="stylesheet" href="https://gw.alipayobjects.com/os/lib/antd/5.22/dist/antd.min.css" />
        <link
          rel="stylesheet"
          href="https://gw.alipayobjects.com/render/p/yuyan_npm/@alipay_lakex-doc/1.48.0/umd/doc.css"
        />
        <script src="https://gw.alipayobjects.com/os/lib/react/18.3.0-next-fecc288b7-20221025/umd/react.production.min.js"></script>
        <script src="https://gw.alipayobjects.com/os/lib/react-dom/18.3.0-next-fecc288b7-20221025/umd/react-dom.production.min.js"></script>
        <script src="https://gw.alipayobjects.com/render/p/yuyan_npm/@alipay_lakex-doc/1.48.0/umd/doc.umd.js"></script>
        <BaseHeader />
        {props.children}
        <BaseFooter />
      </body>
    </html>
  );
}
