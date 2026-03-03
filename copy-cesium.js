const fs = require('fs');
const path = require('path');

const cesiumSource = path.join(__dirname, 'node_modules/cesium/Build/Cesium');
const cesiumDest = path.join(__dirname, 'public/cesium');

console.log(`Copying Cesium assets from ${cesiumSource} to ${cesiumDest}`);

function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

try {
    ['Assets', 'ThirdParty', 'Widgets', 'Workers'].forEach(folder => {
        copyDir(path.join(cesiumSource, folder), path.join(cesiumDest, folder));
    });
    console.log('Cesium assets copied successfully!');
} catch (err) {
    console.error('Error copying Cesium assets:', err);
}
