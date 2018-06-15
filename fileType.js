/*******************************************************************
 * Takes a single filepath and returns the file type as a string.
 * File types are:
 * document
 * video
 * image
 * audio
 * template (for conversion purposes)
 ******************************************************************/

const path = require('path');

var webExtensions = [
    '.js',
    '.css',
];

var documentExtensions = [
    '.html',
    '.doc',
    '.docx',
    '.pdf',
    '.xls',
    '.xlsx',
    '.csv',
    '.odt',
    '.ods',
    '.txt',
    '.dat',
    '.log',
    '.mdb',
    '.sav',
    '.sql',
    '.tar',
    '.xlr',
    '.wpd',
    '.wks',
    '.wps',
    '.xlsm',
    '.rtf',
    '.xps',
    '.ppt',
    '.pptx',
    '.pps',
    '.xml',
    '.ttf',
];

var imageExtensions = [
    '.png',
    '.jpeg',
    '.gif',
    '.bmp',
    '.ai',
    '.ico',
    '.jpg',
    '.ps',
    '.psd',
    '.svg',
    '.tif',
    '.tiff',
    '.pub',
];

var videoExtensions = [
    '.avi',
    '.wmv',
    '.mpg',
    '.mpeg',
    '.swf',
    '.mov',
    '.mp4',
];

var audioExtensions = [
    '.aif',
    '.cda',
    '.mid',
    '.midi',
    '.mp3',
    '.wav',
    '.ogg',
    '.wma',
    '.wpl',
];

var templateExtensions = [
    'dashboard.jpg',
    'homeImage.jpg',
    'courseBanner.jpg'
];

// Will be deleted
var deletableExtensions = [
    '.slk'
];

module.exports = (fileName) => {
    var ext = path.extname(fileName.toLowerCase());
    if (templateExtensions.includes(ext)) return 'template';
    if (webExtensions.includes(ext)) return 'documents';
    if (documentExtensions.includes(ext)) return 'documents';
    if (imageExtensions.includes(ext)) return 'media';
    if (videoExtensions.includes(ext)) return 'media';
    if (audioExtensions.includes(ext)) return 'media';
    if (deletableExtensions.includes(ext)) return 'documents';
    return null;
};