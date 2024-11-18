import * as XLSX from "xlsx";
//将行,列转换
function transformSheets(sheets: { [key: string]: any }): any[] {
  var content: any[][] = [];
  var content1: any[][] = [];
  var tmplist = [];
  for (let key in sheets) {
    //读出来的workbook数据很难读,转换为json格式,参考https://github.com/SheetJS/js-xlsx#utility-functions
    tmplist.push(XLSX.utils.sheet_to_json(sheets[key]).length);
    content1.push(XLSX.utils.sheet_to_json(sheets[key]));
  }
  var maxLength = Math.max.apply(Math, tmplist);
  //进行行列转换
  for (let y in [...Array(maxLength)]) {
    content.push([]);
    for (let x in [...Array(tmplist.length)]) {
      try {
        for (let z in content1[x][y] as { [key: string]: any }) {
          content[y].push(content1[x][y][z]);
        }
      } catch (error) {
        content[y].push("");
      }
    }
  }
  content.unshift([]);
  for (let key in sheets) {
    content[0].push(key);
  }
  return content;
}
import axios from "axios";
export function commonSheet(url: string) {
  let sheetTableData: {
    number: any;
    validCount: string;
    referCount: string;
    altCount: string;
    mixCount: string;
  }[] = [];
  let sheetData: any[][] = [];
  // let url = "/chrom.xlsx" //放在public目录下的文件可以直接访问
  //读取二进制excel文件
  axios
    .get(url, { responseType: "arraybuffer" })
    .then((res) => {
      let data = new Uint8Array(res.data);
      let wb = XLSX.read(data, { type: "array" });
      let sheets = wb.Sheets;
      sheetData = transformSheets(sheets).slice(1, 11);
      sheetData.forEach((item) => {
        chromSheet(sheetTableData, item);
        /* sheetTableData.push({
          number: item[0],
          validCount: item[2]+'/'+Number(item[6]*100).toFixed(2)+'%',
          referCount: item[3]+'/'+Number(item[7]*100).toFixed(2)+'%',
          altCount: item[4]+'/'+Number(item[8]*100).toFixed(2)+'%',
          mixCount: item[5]+'/'+Number(item[9]*100).toFixed(2)+'%',
       }) */
      });
    })
    .catch((err) => {
      console.log(err);
    });
  return sheetTableData;
}

export function chromSheet(
  sheetTableData: {
    number: any;
    validCount: string;
    referCount: string;
    altCount: string;
    mixCount: string;
  }[],
  item: { [key: string]: any }
) {
  // let sheetTableData: { number: any; validCount: string; referCount: string; altCount: string; mixCount: string; }[] = []
  sheetTableData.push({
    number: item[0],
    validCount: item[2] + "/" + Number(item[6] * 100).toFixed(2) + "%",
    referCount: item[3] + "/" + Number(item[7] * 100).toFixed(2) + "%",
    altCount: item[4] + "/" + Number(item[8] * 100).toFixed(2) + "%",
    mixCount: item[5] + "/" + Number(item[9] * 100).toFixed(2) + "%",
  });
  return sheetTableData;
}
export { transformSheets };
// export {transformSheets as default}
