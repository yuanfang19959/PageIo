/**
 * 密码加密工具（使用 SHA-256）
 * 与后端保持一致
 */
export default async function encryptString(str: string): Promise<string> {
  // 使用 Web Crypto API 进行 SHA-256 加密
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}