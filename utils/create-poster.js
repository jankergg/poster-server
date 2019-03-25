const puppeteer = require('puppeteer');
const shell = require('shelljs');
const {createHash} = require('./create-hash.js');

const fileName = createHash({secret: 'UserName', text: "information in json"});
const filePath = '/home/www/php-server/public/images/poster/'
const defaultOptions = {
    //templateUrl: 'file:///Users/janko/Projects/frontEnd/chromeheadless/examples/poster/index.html' ,
    //filePath: `/home/www/php-server/static/images/poster/${fileName}.png`
    templateUrl: 'file:///home/www/node-server/template/poster/index.html' ,
    fileName: fileName,
    filePath: filePath,
    fullPath: filePath + fileName + '.png',
    viewPort: {
        width: 640,
        height: 1024,
        deviceScaleFactor: 2
    }
}

exports.createPoster = async (options={}) => {
    options = {...defaultOptions, ...options}
    const browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();
    page.setViewport(options.viewPort);
    //await page.goto(options.templateUrl);
    //await page.screenshot({path: options.filePath + fileName + '.png', omitBackground: true});
    // run shell compress png and forece override the original one
    //if (shell.exec(`pngquant --quality=65-80 ${options.filePath}${fileName}.png --output ${options.filePath}${fileName}-min.png --force`).code !== 0) {
        //shell.echo('Error: png compress failed');
        //shell.exit(1);
    //}
    //browser.close();
    return {browser, page, options};
};
