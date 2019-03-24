const shell = require('shelljs');
const express = require('express');
const bodyParser = require('body-parser');
const {createPoster} = require('./utils/create-poster.js');
const app = express();
const port = 3000;

// start chromeheadless then run the express server.
createPoster().then(({page, browser, options})=>{
    // goto a specific page configed in options, which can be configured by passing parameter `options` to `createPoster`
    page.goto(options.templateUrl).then(()=>{

        // for body json, must to use
        app.use(bodyParser.json())
        // listening a api that recive parameters used to config the page.
        app.post('/getposter', (req,res)=>{
            // run js function inside the page.
            //const time1 = Date.now()
            // format of pageConf please check /template/poster/config.json
            const {pageConf}= req.body

            page.evaluate((pageConf)=>{
                // written in the page, use to update form fields.
                update(pageConf)
            }, pageConf).then(()=>{
                //// take a screenshot after eval js functions.
                page.screenshot({path: options.fullPath, omitBackground: true}).then(()=>{ 
                    // run png compress by calling pngquant.
                    const resp = {
                        origin: options.fullPath
                    }
                    const shell_result = shell.exec(`pngquant --quality=65-80 ${options.fullPath} --output ${options.filePath}${options.fileName}-min.png --force`)
                    if (shell_result.code !== 0) {
                        shell.echo('Error: png compress failed');
                        shell.exit(1);
                    } else {
                        resp.min = options.filePath + options.fileName + '-min.png'
                    }
                    //const timeconsume = Date.now() - time1 
                    //console.log(timeconsume/1000, '秒');

                    // return image urls.
                    res.send(JSON.stringify(resp));
                })
            })
            // run js function end.
        });
    })

})

app.listen(port, ()=>console.log('app is running at port: ' + port));

