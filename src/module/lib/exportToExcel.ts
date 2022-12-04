import XLSX from 'sheetjs-style'
import { saveAs } from 'file-saver'


const exportToExcel = async (excelData: Array<Record<string, unknown>>, fileName: string) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF=8'
    const fileExtension = ".xlsx"
    const ws = XLSX.utils.json_to_sheet(excelData)
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] }
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], { type: fileType })
    saveAs(data, fileName + fileExtension)
}

export default exportToExcel