export function ExportCSVFromTableData(data) {
    var CsvString = "";
    console.log(data)

    // Handle titles
    Object.keys(data[0]).forEach(function (title, titleIndex) {
        if (title != "dosya" && title != "id") {
            CsvString += title;
        }
        if (titleIndex < Object.keys(data[0]).length - 2 && title != "dosya" && title != "id")
            CsvString += ","
    })
    CsvString += "\r\n";

    // Handle entries
    data.forEach(function (RowItem, RowIndex) {
        Object.entries(RowItem).forEach(function (ColItem, ColIndex) {
            if (ColItem[0] != "dosya" && ColItem[0] != "id") {
                CsvString += ColItem[1];
            }
            if (ColIndex < Object.entries(RowItem).length - 2 && ColItem[0] != "dosya" && ColItem[0] != "id")
                CsvString += ","

        });
        CsvString += "\r\n";
    });

    CsvString = "data:application/csv," + encodeURIComponent(CsvString);
    console.log(CsvString)

    // Download csv

    var Aelement = document.createElement("A");
    Aelement.setAttribute("href", CsvString);
    Aelement.setAttribute("download", "data.csv");
    document.body.appendChild(Aelement);
    Aelement.click();


}


export function ExportCSVFromArrayData(data) {
    var CsvString = "";
    console.log(data)

    data.forEach(function (RowItem, RowIndex) {
        RowItem.forEach(function (ColItem, ColIndex) {
            CsvString += ColItem;
            if (ColIndex < data[0].length - 1)
                CsvString += ","
        });
        CsvString += "\r\n";
    });

    CsvString = "data:application/csv," + CsvString;
    console.log(CsvString)

    // Download csv

    var Aelement = document.createElement("A");
    Aelement.setAttribute("href", CsvString);
    Aelement.setAttribute("download", "data.csv");
    document.body.appendChild(Aelement);
    Aelement.click();


}