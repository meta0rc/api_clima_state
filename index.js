const express = require('express')
const cors = require('cors')
const puppeteer = require('puppeteer');
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(cors())

const port = process.env.PORT || 3333


app.get('/', async (req, res) => {

    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.google.com/search?q=temperatura+s%C3%A3o+paulo&oq=temperatura+s%C3%A3o+paulo&aqs=chrome..69i57j0i271l2.4225j0j1&sourceid=chrome&ie=UTF-8');
      
        const clima = await page.evaluate(() => { 
            const tempo = {
                tmp: document.querySelector('#wob_tm').innerHTML,
                rain: document.querySelector('#wob_pp').innerHTML,
                hum: document.querySelector('#wob_hm').innerHTML,
                wind: document.querySelector('#wob_ws').innerHTML
                
            }
            return tempo
         
        });
            //     
            await browser.close();     
        
            return res.status(200).json(clima)
          
      })();

    

})
app.post('/search', async (req, res) => {

    if(req.body.param){
        
      

    (async () => {

        const regiao = req.body.param
        const base = `https://www.google.com/search?q=temperatura+em+${regiao}&oq=temperatura+${regiao}&aqs=chrome..69i57j0i271l2.4225j0j1&sourceid=chrome&ie=UTF-8`
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(base);
      
        const clima = await page.evaluate(() => { 
            const tempo = {
                tmp: document.querySelector('#wob_tm').innerHTML,
                rain: document.querySelector('#wob_pp').innerHTML,
                hum: document.querySelector('#wob_hm').innerHTML,
                wind: document.querySelector('#wob_ws').innerHTML
                
            }
            return tempo
            
        });
        //     
        await browser.close();     
        
        return res.status(200).json(clima)
        
    })();
    
}
    
})

app.get('/teste', (req, res) => {
    res.status(200).json({msg: "Teste"})
})

app.listen(port, () => console.log("Running"))