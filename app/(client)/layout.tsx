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
        <BaseHeader />
          {props.children}
        <BaseFooter/>
      </body>
    </html>
  );
}
