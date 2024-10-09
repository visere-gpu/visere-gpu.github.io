const canvas = document.getElementById('logoCanvas');
const ctx = canvas.getContext('2d');
const bgColorInput = document.getElementById('bgColor');
const logoColorInput = document.getElementById('logoColor');
const downloadLogoButton = document.getElementById('downloadLogo');
const transparentCheck = document.getElementById("transparentBg");
const logoImage = new Image();
logoImage.src = 'assets/images/logo_white.png';
logoImage.crossOrigin = "anonymous";

const margin = 150;

function drawCanvas() {
    const bgColor = bgColorInput.value;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(!transparentCheck.checked)
    {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    drawLogo();
}

function drawLogo() {
    const logoWidth = canvas.width - 2 * margin;
    const logoHeight = canvas.height - 2 * margin;

    const x = margin;
    const y = margin;

    ctx.drawImage(logoImage, x, y, logoWidth, logoHeight);

    colorLogo(logoWidth, logoHeight, x, y);
}

function colorLogo(logoWidth, logoHeight, x, y) {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');

    tempCanvas.width = logoWidth;
    tempCanvas.height = logoHeight;

    tempCtx.drawImage(logoImage, 0, 0, logoWidth, logoHeight);

    tempCtx.globalCompositeOperation = 'source-in';
    tempCtx.fillStyle = logoColorInput.value;
    tempCtx.fillRect(0, 0, logoWidth, logoHeight);

    const coloredLogo = new Image();
    coloredLogo.src = tempCanvas.toDataURL('image/png');
    coloredLogo.onload = () => {
        ctx.drawImage(coloredLogo, x, y, logoWidth, logoHeight);
    };
}

function downloadLogo() {
    const downloadCanvas = document.createElement('canvas');
    const downloadCtx = downloadCanvas.getContext('2d');

    downloadCanvas.width = canvas.width;
    downloadCanvas.height = canvas.height;

    const logoWidth = canvas.width - 2 * margin;
    const logoHeight = canvas.height - 2 * margin;
    const x = margin;
    const y = margin;

    colorLogo(logoWidth, logoHeight, x, y, downloadCtx);

    downloadCtx.clearRect(0, 0, downloadCanvas.width, downloadCanvas.height);

    const coloredLogo = new Image();
    coloredLogo.src = canvas.toDataURL('image/png');
    coloredLogo.onload = () => {
        downloadCtx.drawImage(coloredLogo, x, y, logoWidth, logoHeight);
        const link = document.createElement('a');
        link.download = 'custom_logo.png';
        link.href = downloadCanvas.toDataURL('image/png');
        link.click();
    };
}

bgColorInput.addEventListener('input', drawCanvas);
transparentCheck.addEventListener('input', drawCanvas);
logoColorInput.addEventListener('input', drawCanvas);
downloadLogoButton.addEventListener('click', downloadLogo);

logoImage.onload = function() {
    drawCanvas();
};
