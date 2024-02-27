const fs = require('fs');
const htmlContent = require('create_file_page.js')

    
const value_creation_form = {"name":"", "fullname":"","id":int} // changer en fonction de ce qui aura



function write_anti_gpt_personnalized_qizz_web_page (fileName){
    const fileName = fileName //changer le filename avec ce dont on aura besoin pour le site (le chemin de celui ci sera different de meme que son nom)

    fs.writeFile(fileName, htmlContent, (err) => {
        if (err){
            console.log('error', err);
        }
        console.log("The creation was a success !! Name of the file :", fileName);
    })
}




// fs.readFile('demo.txt', (err,data)=> {
//     if(err){
//       console.log('error',err);
//     }
//     console.log(data.toString());
// })

