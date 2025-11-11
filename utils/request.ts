const PREFIX_URL_INTERFACE = "http://127.0.0.1:7001"
import { message } from 'antd';
import { useRouter } from 'next/navigation';

export type BaseResponse<T> = Response & {
  code: number;
  data: T;
  message: string;
  success: boolean;
};

type DEFAULT_OPTIONS = { credentials: "include" | "omit" | "same-origin" }

export const isErrorCode = (code: string | number) => (`${code}`.startsWith('4') || `${code}`.startsWith('5'))

export default async function request<T = unknown>(
  url: string,
  options?: RequestInit,
): Promise<BaseResponse<T>> {
  try {
    const result = await fetch(url, {
      ...options,
      credentials: 'include',
      headers: {
        ...options?.headers,
      },
    })
    // if (isErrorCode(result.status)) {
    //   return new Response(
    //     JSON.stringify({ message: 'Failed to fetch', code: result.status }),
    //   ) as BaseResponse<T>;
    // }
    return result as BaseResponse<T>
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Failed to fetch', code: 500 }),
    ) as BaseResponse<T>;
  }
}

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const checkStatusNo401 = (response) => {
  if (response.status >= 200 && response.status < 300 || response.status === 401) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;

  const error = new Error(errortext);
  error.name = response.status;
  // error.response = response;
  throw error;
};

// 用于视频url登录
export function requestVideoUrl(url, opts: RequestInit = {}) {
  const router = useRouter();
  const defaultOptions: DEFAULT_OPTIONS = {
    credentials: 'include',
  };
  const options = { ...defaultOptions, ...opts };
  if (
    options.method === 'POST' ||
    options.method === 'PUT' ||
    options.method === 'DELETE'
  ) {
    if (!(options.body instanceof FormData)) {
      options.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...options.headers,
      };
      options.body = JSON.stringify(options.body);
    } else {
      // options.body is FormData
      options.headers = {
        Accept: 'application/json',
        ...options.headers,
      };
    }
  }

  let urls = `${PREFIX_URL_INTERFACE}${url}`;
  if (url.indexOf('http') > -1) {
    urls = url;
  }
  return fetch(urls, options)
    .then(checkStatusNo401)
    .then((response) => {
      // DELETE and 204 do not return data by default
      // using .json will report an error.
      if (options.method === 'DELETE' || response.status === 204) {
        return response.text();
      }
      return response.json();
    })
    .catch((e) => {
      const status = e.name;
      if (status === 401) {
        console.log(e)
        return;
      }
      // environment should not be used
      if (status === 403) {
        router.push('/exception/403');
        return;
      }
      if (status <= 504 && status >= 500) {
        router.push('/');
        return;
      }
      if (status >= 404 && status < 422) {
        if (urls.includes('/searchDoc')) {
          router.push('/docs/404');
          return
        }
        router.push('/exception/404');
      }
    });
}
