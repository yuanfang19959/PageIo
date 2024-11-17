// import type { Metadata } from "next";
import "@/styles/globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';

export const metadata = {
  title: "平头哥的小站",
  description: "平头哥的小站-首页",
  alternates: {
    canonical: 'http://yuanfang19959.tech',
  },
  openGraph: {
    title: '平头哥的小站',
    description: "平头哥的小站-首页",
    image: "https://mdn.alipayobjects.com/huamei_22khvb/afts/img/A*RphFQIYS8h4AAAAAAAAAAAAADiGDAQ/original",
    type: "website",
  },
};

export default function RootLayout(props) {
  return (
    <html>
      <body>
        <AntdRegistry>{props.children}</AntdRegistry>
      </body>
    </html>
  );
}
