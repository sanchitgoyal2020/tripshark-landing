const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

const sourceDir = 'C:\\Users\\sanch\\Downloads\\Tripshark new';
const targetDir = path.join(__dirname, 'public', 'videos');

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.mp4'));

console.log('Found videos:', files);

files.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    // Remove spaces from target filename for easier usage
    const targetFile = file.replace(/ /g, '_').toLowerCase();
    const targetPath = path.join(targetDir, targetFile);

    console.log(`Compressing ${file}...`);
    // -vcodec libx264 -crf 28 (higher is more compressed, 23 is default, 28 is a good balance for web)
    // -preset veryfast
    // -vf scale=-1:1080 (max height 1080p to maintain quality but reduce massive files)
    const command = `"${ffmpegPath}" -y -i "${sourcePath}" -vcodec libx264 -crf 28 -preset fast -vf "scale=-2:1080" -an "${targetPath}"`;
    
    try {
        execSync(command, { stdio: 'inherit' });
        console.log(`Successfully compressed ${file} to ${targetFile}`);
    } catch (error) {
        console.error(`Error compressing ${file}:`, error.message);
    }
});

console.log('All videos processed!');
