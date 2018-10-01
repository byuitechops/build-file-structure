const canvas = require('canvas-api-wrapper');
const fileType = require('./fileType.js');

module.exports = (course, stepCallback) => {
    var templateFiles = [
        'dashboard.jpg',
        'homeImage.jpg',
        'courseBanner.jpg'
    ];

    (async () => {
        return new Promise(async (resolve, reject) => {
            var canvasCourse = canvas.getCourse(course.info.canvasOU);
            await canvasCourse.files.get();
            await canvasCourse.folders.get();
            let topFolder = canvasCourse.folders.find(folder => folder.name === 'course files');

            // Create the three main folders: documents, media, template
            if (course.settings['Create three main folders']) {
                try {
                    let documents = canvasCourse.folders.find(folder => folder.name === 'documents');
                    let media = canvasCourse.folders.find(folder => folder.name === 'media');
                    let template = canvasCourse.folders.find(folder => folder.name === 'template');

                    if (!documents) documents = await canvasCourse.folders.create({name: 'documents', parent_folder_id: topFolder.id});
                    if (!media) media = await canvasCourse.folders.create({name: 'media', parent_folder_id: topFolder.id});
                    if (!template) template = await canvasCourse.folders.create({name: 'template', parent_folder_id: topFolder.id});

                    var mainThree = {
                        documents,
                        media,
                        template
                    };

                    course.log('Folders Created', {
                        'Name': 'documents'
                    });
                    course.log('Folders Created', {
                        'Name': 'media'
                    });
                    course.log('Folders Created', {
                        'Name': 'template'
                    });
                } catch (e) {
                    course.error(e);
                }
            }

            // Move all files into each of the three main folders, then delete all other folders
            if (course.settings['Move files into three main folders'] && course.settings['Create three main folders']) {
                canvasCourse.files.forEach(file => {
                    try {
                        var type = fileType(file.display_name);
                        if (templateFiles.includes(file.display_name)) {
                            type = 'template';
                        }

                        if (mainThree[type]) {
                            file.on_duplicate = 'rename';
                            file.parent_folder_id = '' + mainThree[type].id;
                            course.log('Files Moved', {
                                'Name': file.display_name,
                                'New Location': type
                            });
                        }
                    } catch (e) {
                        course.error(e);
                    }
                });

                try {
                    // Update the files to relocate them
                    await canvasCourse.files.update();

                    // Re-retrieve the folders, since we need updated file counts
                    await canvasCourse.folders.get();
                } catch (e) {
                    course.error(e);
                }

                var folderNames = [
                    'documents',
                    'media',
                    'template',
                    'archive',
                    'course files'
                ];

                for (let x = 0; x < canvasCourse.folders.length; x++) {
                    if (folderNames.every(name => canvasCourse.folders[x].name !== name) && canvasCourse.folders[x].files_count === 0) {
                        try {
                            await canvas.delete(`/api/v1/folders/${canvasCourse.folders[x].id}?force=true`);
                            course.log('Folders Deleted', {
                                'Name': canvasCourse.folders[x].name
                            });
                        } catch (e) {
                            course.error(e);
                        }
                    }
                }
            }

            // Create the archive folder
            if (course.settings['Create Archive']) {
                try {
                    var archive = canvasCourse.folders.find(folder => folder.name === 'archive');
                    if (!archive) archive = await canvasCourse.folders.create({name: 'archive', parent_folder_id: topFolder.id});
                    course.log('Folders Created', {
                        'Name': 'archive'
                    });
                } catch (e) {
                    course.error(e);
                }
            }
            // Move all unused files into archive
            if (course.settings['Archive unused files']) {
                if (!archive) {
                    course.error(new Error('Option to archive unused files selected, but option to create archive folder was not.'));
                } else {
                    canvasCourse.files.forEach(file => {
                        if (course.info.unusedFiles && course.info.unusedFiles.includes(file.display_name)) {
                            file.on_duplicate = 'rename';
                            file.parent_folder_id = archive.id;
                            course.log('Files Archived', {
                                'Name': file.display_name,
                                'New Location': 'archive'
                            });
                        }
                    });
                    try {
                        await canvasCourse.files.update();
                    } catch (e) {
                        course.error(e);
                    }
                }
            }

            // Delete all unused files
            if (course.settings['Delete unused files']) {
                if (course.settings['Archive unused files']) {
                    course.error(new Error('Option to archive unused files selected, as well as the option to delete them. Unused files will not be deleted.'));
                } else {
                    for (let x = 0; x < canvasCourse.files.length; x++) {
                        try {
                            if (course.info.unusedFiles && course.info.unusedFiles.includes(canvasCourse.files[x].display_name)) {
                                await canvasCourse.files[x].delete();
                                course.log('Unused Files Deleted', {
                                    'Name': canvasCourse.files[x].display_name
                                });
                            }
                        } catch (e) {
                            course.error(e);
                        }
                    }
                }
            }

            resolve();
        });
    })()
        .then(() => {
            stepCallback(null, course);
        })
        .catch(e => {
            course.error(e);
            stepCallback(null, course);
        });
};
