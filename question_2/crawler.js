const puppeteer = require('puppeteer');
// const { GoogleSpreadsheet } = require('google-spreadsheet');

async function main() {
    browser = await puppeteer.launch({headless: false});
    page = await browser.newPage();
    await page.goto('https://www.bitopro.com/ns/fees');
    // Get all elements from table
    const data = await page.evaluate(() => {
        const table_selector = "tbody tr td"
        const tds = Array.from(document.querySelectorAll(table_selector))
        return tds.map(td => td.innerText)
    });
    const newArr = [];
    // Grouping the data
    while(data.length) newArr.push(data.splice(0,6));
    // Filtering the data
    console.log(newArr[0]);
    const finArr = [];
    for (const a of newArr){
        if (String(a).includes('VIP')){
            console.log(a);
            finArr.push(a)
        };
    };
    console.log(finArr);
    // uploadAPI(finArr) mock function
};


//Mock function
//Ref: https://ithelp.ithome.com.tw/articles/10234325
async function uploadAPI(data) {
    // init, credentialsPath = './credentials.json'
    //const doc = new GoogleSpreadsheet(docID);
    //const creds = require(credentialsPath);
    //await doc.useServiceAccountAuth(creds);
    //await doc.loadInfo();
    //const sheet = doc.sheetsById[sheetID];
    const sheet = await doc.addSheet({ headerValues: ['lv', 'c30', 'op', 'c1', 'mt', 'mt_bito'] });
    for (d of data){
        const addRowAction = await sheet.addRow({ lv: d[0], c30: d[1], op: d[2], c1: d[3], mt: d[4], mt_bito: d[5] });
    };
};

main()