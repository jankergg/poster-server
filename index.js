const shell = require('shelljs');
const express = require('express');
const {createPoster} = require('./utils/create-poster.js');
const app = express();
const port = 3000;

app.use(express.static('images'))
app.use('/static', express.static('template'))

// start chromeheadless then run the express server.
createPoster().then(({page, browser, options})=>{
    // goto a specific page configed in options, which can be configured by passing parameter `options` to `createPoster`
    page.goto(options.templateUrl).then(()=>{

        // listening a api that recive parameters used to config the page.
        app.post('/getposter', (req,res)=>{
            console.log(req.params)
            console.log(req.body)
            const {pageConf} = req.params
            res.json(req.body);
            // run js function inside the page.
            //page.evaluate((pageConf)=>{
                //// written in the page, use to update form fields.
                //update(pageConf)
            //}, pageConf).then(()=>{
                //// take a screenshot after eval js functions.
                //page.screenshot({path: options.fullPath, omitBackground: true}).then(()=>{ 
                    //// run png compress by calling pngquant.
                    //const shell_result = shell.exec(`pngquant --quality=65-80 ${options.fullPath} --output ${options.filePath}${options.fileName}-min.png --force`)
                    //const resp = {
                        //origin: options.fullPath
                    //}
                    //if (shell_result.code !== 0) {
                        //shell.echo('Error: png compress failed');
                        //shell.exit(1);
                    //} else {
                        //resp.min = options.filePath + options.fileName + '-min.png'
                    //}
                    //// return image urls.
                    //res.send(JSON.stringify(resp));
                //})
            //})
            // run js function end.
        });
    })

})

app.listen(port, ()=>console.log('app is running at port: ' + port));

