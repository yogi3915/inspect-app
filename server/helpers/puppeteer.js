const puppeteer = require('puppeteer');
const axios = require('axios');

  // Sample Prototype
const checkCredible = async (search) => {
  let scoreTotal = 0;
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: true
  }); // INI GANTI SESUAI LOKASI CHROME KALIAN

  const page = await browser.newPage();

  await page.goto(`https://kpbn.co.id/persh.php?alphabet=${encodeURI(search[0])}`);

  const kpbn = await page.evaluate((search) => {
    let flag = false;
    const searchTotal = document.querySelectorAll('table > tbody > tr');
    searchTotal.forEach((item, ind) => {
      const eachItem = item.querySelectorAll('td');
      if (eachItem[1] !== undefined) {
        console.log(eachItem[1].innerText.split(', ')[0]);
        if (eachItem[1].innerText.split(', ')[0].toLowerCase() === search.toLowerCase()) {
          flag = true;
        }
      }
    })
    return flag;
  }, search);

  await page.goto(`https://www.indonesia-investments.com/id/bisnis/profil-perusahaan/item74?companysearchstring=${ encodeURI(search) }`);

  const indoInvestments = await page.evaluate(search => {
    let flag = false;
    const searchTotal = document.querySelectorAll('table[class="companyfiles"]')[0].querySelectorAll('tbody > tr');
    
    searchTotal.forEach(item => {
      const eachItem = item.querySelectorAll('td[class="companyname"]')[0]
      if (eachItem) {
        if (eachItem.innerText.toLowerCase() === search.toLowerCase()) {
          flag = true;
        }
      }
    })

    return flag;
  }, search);

  const { data } = await axios({
    method: 'GET',
    url: `https://www.idx.co.id/umbraco/Surface/ListedCompany/GetCompanyProfiles?emitenType=s&kodeEmiten=${ encodeURI(search[0]) }&draw=6&columns%5B0%5D%5Bdata%5D=KodeEmiten&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=KodeEmiten&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=false&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=NamaEmiten&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=false&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=TanggalPencatatan&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=false&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&start=0&length=109&search%5Bvalue%5D=&search%5Bregex%5D=false&_=1607953161948`
  })

  let name = '-';
  let idxFlag = false;
  let npwp = '-';
  let email = '-';
  let telephone = '-';
  let address = '-';

  data.data.forEach(el => {
    if (el.NamaEmiten.toLowerCase().includes(search)) {
      name = el.NamaEmiten
      scoreTotal += 14.3;
      idxFlag = true;
      if (el.NPWP) {
        npwp = el.NPWP;
        scoreTotal += 14.3;
      }
      if (el.Email) {
        email = el.Email;
        scoreTotal += 14.3;
      }
      if (el.Telepon) {
        telephone = el.Telepon
        scoreTotal += 14.3;
      }
      if (el.Alamat) {
        address = el.Alamat
        scoreTotal += 14.2;
      }
    }
  });

  await browser.close();
  
  if (indoInvestments) {
    scoreTotal += 14.3;
  }
  if (kpbn) {
    scoreTotal += 14.3;
  }

  return { score: scoreTotal, name, kpbn, indoInvestments, idx: idxFlag, npwp, email, telephone, address };
}

// const execute = async () => {
//   const kpbn = await checkCredible('abm investama');
//   const score = {
//     score: kpbn
//   }
//   console.log(score)
// }

// execute();

module.exports = checkCredible;
