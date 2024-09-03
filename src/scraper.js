const puppeteer = require('puppeteer')
const fs = require('fs')

const productosarray = []

const scrapper = async (url) => {
  const browser = await puppeteer.launch({ headless: false })

  const page = await browser.newPage()

  await page.goto(url)

  await page.setViewport({ width: 2000, height: 1024 })

  repeat(page, browser)
}

const repeat = async (page, browser) => {
  const arrayDivs = await page.$$('.force-badge')

  for (const element of arrayDivs) {
    let price
    let title = await element.$eval('.title', (el) => el.textContent)
    let img = await element.$eval('img', (el) => el.src)

    try {
      price = await element.$eval('.price', (el) =>
        parseFloat(el.textContent.slice(0, el.textContent.length - 1))
      )

      const producto = {
        title,
        price,
        img
      }
      productosarray.push(producto)
    } catch (error) {
      const producto = {
        title,
        img,
        stock: false
      }
      productosarray.push(producto)
    }
  }

  try {
    await page.$eval("[title= 'Next']", (el) => el.click())
    await page.waitForNavigation()
    repeat(page, browser)
  } catch (error) {
    write(productosarray)
    await browser.close()
  }
}

const write = (array) => {
  fs.writeFile('productos.json', JSON.stringify(array), () => {
    console.log('Escrito correctamente')
  })
}

scrapper('https://www.instant-gaming.com/es/pc/steam/tendencias/')

module.exports = { scrapper }
