import { readFile, writeFile } from 'fs/promises';


function createJsonFile(filePath, data) {
    try {
        // Convertir les données JavaScript en format JSON
        const jsonData = JSON.stringify(data, null, 2);

        // Écrire les données JSON dans le fichier
        writeFile(filePath, jsonData);

        console.log(`Le fichier JSON a été créé avec succès : ${filePath}`);
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la création du fichier JSON :', error);
    }
}


async function read_File(filePath) {
    try {
        const data = await readFile(filePath, 'utf8');

        const jsonData = JSON.parse(data);

        return jsonData;

    } catch (error) {
        console.error('Une erreur s\'est produite lors de la lecture ou de l\'analyse du fichier JSON :', error);
        return;
    }
};

export {createJsonFile, read_File}
