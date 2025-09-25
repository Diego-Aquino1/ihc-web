'use strict';
const fs = require('fs');
const upath = require('upath');
const pug = require('pug');
const sh = require('shelljs');
const prettier = require('prettier');

module.exports = function renderPug(filePath) {
    const destPath = filePath.replace(/src\/pug\//, 'dist/').replace(/\.pug$/, '.html');
    const srcPath = upath.resolve(upath.dirname(__filename), '../src');
    const jsonPath = upath.resolve(srcPath, 'assets/data/projectEvents.json'); // Ruta al archivo JSON

    console.log(`### INFO: Rendering ${filePath} to ${destPath}`);

    // Cargar datos desde JSON
    let projectEvents = [];
    try {
        const jsonData = fs.readFileSync(jsonPath, 'utf-8');
        projectEvents = JSON.parse(jsonData);
    } catch (err) {
        console.error(`### ERROR: No se pudo cargar el archivo JSON en ${jsonPath}`);
        console.error(err);
        process.exit(1);
    }

    // Renderizar archivo Pug con los datos JSON
    const html = pug.renderFile(filePath, {
        doctype: 'html',
        filename: filePath,
        basedir: srcPath,
        projectEvents // Pasar datos JSON al motor Pug
    });

    // Asegurarse de que el directorio de destino exista
    const destPathDirname = upath.dirname(destPath);
    if (!sh.test('-e', destPathDirname)) {
        sh.mkdir('-p', destPathDirname);
    }

    // Aplicar Prettier al HTML generado
    const prettified = prettier.format(html, {
        printWidth: 1000,
        tabWidth: 4,
        singleQuote: true,
        proseWrap: 'preserve',
        endOfLine: 'lf',
        parser: 'html',
        htmlWhitespaceSensitivity: 'ignore'
    });

    // Guardar el archivo HTML en la carpeta de destino
    fs.writeFileSync(destPath, prettified);
    console.log(`✔ Renderizado exitoso: ${destPath}`);
};
