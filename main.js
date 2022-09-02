
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const sequelize = require('./db.js');
const models = require('./models.js');
const { DataTypes } = require('sequelize');

async function main() {
    const Category = models(sequelize, DataTypes);
    await Category.destroy({
        where: {},
        truncate: true
    });

    const menu = Category.build({ name: 'Main Menu' });
    await menu.makeRoot();

    puppeteer.use(StealthPlugin());

    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://www.ozon.ru/');
    await page.waitForSelector('#stickyHeader > div.uc8 > div > div.ui-b4 > button');
    await page.evaluate(async () => {
        document.querySelector('#stickyHeader > div.uc8 > div > div.ui-b4 > button').click();
    });
    
    const parentCategories = await page.evaluate(async () => {
        return Array.from(document.querySelectorAll('#stickyHeader > div.uc8 > div > div.cs6 > div > div.sc6 > div > a.a4.cs3.sc3:not(.cs4)'))
            .map(item=> ({
                link: item.getAttribute('href'),
                text: item.innerText
            }));
    });
    for(let parentCategory of parentCategories){
        const parentCategoryItem = Category.build({ 
            name: parentCategory.text,
            link: parentCategory.link
        });
        await parentCategoryItem.appendTo(menu);
        await page.evaluate((parentCategory) => {
            const mouseenterEvent = new Event('mouseenter');
            const parentCategoryEl = document.querySelector(`#stickyHeader a[href='${parentCategory.link}']`);
            parentCategoryEl.dispatchEvent(mouseenterEvent);
        }, parentCategory);

        if(parentCategory.link !== '/category/avtomobili-34458/'){
            await page.waitForSelector('.s0c .cs2.s1c .cs0');
        }
        
        const categories = await page.evaluate(async () => {
            function parseLink(input) {
                return {
                    link: input.getAttribute('href'),
                    text: input.innerText
                };
            }
            const categories = Array.from(document.querySelectorAll('.s0c .cs2.s1c .cs0')).map(category => {
                const parent = parseLink(category.querySelector('a.a4.cs3.s4c'));
                const children = Array.from(category.querySelectorAll('.sc0 a')).map(child => parseLink(child));
                return {
                    parent,
                    children
                };
            });
            return categories;
        });
        for(let category of categories) {
            const categoryItem = Category.build({ 
                name: category.parent.text,
                link: category.parent.link
            });
            await categoryItem.appendTo(parentCategoryItem);

            for(let child of category.children) {
                const childItem = Category.build({ 
                    name: child.text,
                    link: child.link
                });
                await childItem.appendTo(categoryItem);
            }
        }
    }
}
main();
