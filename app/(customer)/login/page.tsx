import { WithSearchParamsProps } from "@/utils/viewport";
import { Suspense } from "react";
import Forms from "./components/Forms";
import { headers } from "next/headers";
import styles from './index.module.scss';

// 服务端使用
export async function generateMetadata() {
  const headerList: any = headers();
  const url = headerList.headers.referer;
  return {
    title: "登录/注册",
    description: "登录/注册",
    alternates: {
      canonical: url, // 动态设置为当前页面URL
    },
    openGraph: {
      title: "登录/注册",
      description: "登录/注册",
    },
  };
}

const Empty = () => <></>;
const HomePage = ({ searchParams: { viewport } }: WithSearchParamsProps) => {
  return (
    <div className={styles.bg}>
    <div style={{ maxWidth: 300, margin: "0 auto", padding: "20px", paddingTop: 250 }}>
      <Suspense fallback={<Empty />}>
        <Forms />
      </Suspense>
    </div>
    </div>
  );
};

export default HomePage;