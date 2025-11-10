// import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/yuque.css";
import BaseFooter from "./components/BaseFooter/index";
import BaseHeader from "./components/BaseHeader/index";
import ScrollToTop from "./components/ScrollToTop/index";

export default function RootLayout(props) {
  return (
    <html>
      <body>
      <link rel="stylesheet" href="https://unpkg.com/antd@4.24.13/dist/antd.css" />
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
        <ScrollToTop />
      </body>
    </html>
  );
}