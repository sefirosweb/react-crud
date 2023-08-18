import { utils, writeFileXLSX } from 'xlsx';

const exportToExcel = async (excelData: Array<Record<string, unknown>>, fileName: string) => {
    const fileExtension = ".xlsx"
    const ws = utils.json_to_sheet(excelData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb, fileName + fileExtension);
}

export default exportToExcel