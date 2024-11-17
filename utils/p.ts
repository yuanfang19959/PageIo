export default function encryptString(str) {
    let encryptedStr = '';
    for (let i = 0; i < str.length; i++) {
        // 获取字符的ASCII码
        let charCode = str.charCodeAt(i);
        // 进行简单的加密运算，这里示例为将ASCII码值加上一个固定值（可根据需要调整）
        charCode += 5;
        // 将加密后的ASCII码转换回字符并添加到加密字符串中
        encryptedStr += String.fromCharCode(charCode);
    }
    return encryptedStr;
}