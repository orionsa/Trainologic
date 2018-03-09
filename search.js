const fs = require('fs');
const path = require('path');

const extension = process.argv[2];
const text = process.argv[3];
let noMatchingFiles = true;

function checkFile(elm, pth) { // gets file extension and a string to check
    if (path.extname(elm) == '.' + extension & fs.readFileSync(pth, 'utf8').includes(text)) {
        console.log('pth is ', pth);
        if (noMatchingFiles) noMatchingFiles = false;
    }
}

function mapAllFiles(dir) { //recursively check all files and folders
    fs.readdirSync(dir).forEach((element) => {
        if (fs.lstatSync(dir + '/' + element).isDirectory()) {
            mapAllFiles(dir + '/' + element)
        }
        else { checkFile(element, dir + '/' + element) }
    })
}
mapAllFiles(__dirname);
if (noMatchingFiles) console.log('no file was found')