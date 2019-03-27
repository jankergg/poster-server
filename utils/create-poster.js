const puppeteer = require('puppeteer');
const shell = require('shelljs');
const {createHash} = require('./create-hash.js');
const config = require('../page.json');

const fileName = createHash({secret: 'UserName', text: "information in json"});
const filePath = config.local.filePath
const defaultOptions = {
    templateUrl: config.local.templateUrl ,
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
    return {browser, page, options};
};
