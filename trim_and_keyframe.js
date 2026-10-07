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
    const targetFile = file.replace(/ /g, '_').toLowerCase();
    const targetPath = path.join(targetDir, targetFile);

    console.log(`Re-compressing ${file} for smooth scrubbing...`);
    
    // -t 5 : trim to exactly 5 seconds
    // -g 1 -keyint_min 1 : Force a keyframe at every single frame (All-Intra) for smooth scrubbing
    // -profile:v baseline -pix_fmt yuv420p : Maximum compatibility
    const command = `"${ffmpegPath}" -y -i "${sourcePath}" -t 5 -vcodec libx264 -g 1 -keyint_min 1 -profile:v baseline -pix_fmt yuv420p -crf 26 -preset fast -vf "scale=-2:1080" -an "${targetPath}"`;
    
    try {
        execSync(command, { stdio: 'inherit' });
        console.log(`Successfully compressed ${file} to ${targetFile}`);
    } catch (error) {
        console.error(`Error compressing ${file}:`, error.message);
    }
});

console.log('All videos re-processed for smooth scrubbing!');
