const puppeteer = require('puppeteer');

describe('Google', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({headless: false});
    page = await browser.newPage();
    await page.goto('https://google.com');
  });

  it('should be titled "Google"', async () => {
    await expect(page.title()).resolves.toMatch('Google');
  });

  it('search Bitopro', async () => {
    search_bar_selector = "body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input"
    search_result_selector = "#result-stats"
    await page.type(search_bar_selector, 'Bitopro');
    await page.keyboard.press("Enter");
    await page.waitForNavigation();
    const divCount = await page.$$eval('#rso > div', divs => divs.length);
    const data = await page.$$eval('#rso > div', options => {
        return options.map(option => option.textContent);
    });
    console.log('Search result : ' + divCount)

    for (let d of data) {
        if (d.includes('https://www.bitopro.com') || d.includes('BitoPro台灣幣托交易所')){
            expect(d).toContain('https://www.bitopro.com')
            expect(d).toContain('BitoPro 台灣幣託交易所')
            console.log('Slice of data : ' + d.slice(0,100))
        }
    }
  });


  afterAll(async () => {
    await page.close();
    await browser.close();
  });

});