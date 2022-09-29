$('#browse-button').click( function () {
  const image_input = document.querySelector('#file-selector');
  var uploaded_image = "";

  image_input.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      uploaded_image = reader.result;
      var tempImg = new Image();
      tempImg.src = uploaded_image;
      var aspectRatio = tempImg.width / tempImg.height;
      // console.log(aspectRatio);
      $(".image-viewer").css({
        "aspect-ratio": aspectRatio.toString()
      });
      document.querySelector('#canvas1').style.backgroundImage = `url(${uploaded_image})`;
      $('.image-preview-area p').html( 'Original size: ' + ((new Blob([uploaded_image]).size) / 1000000).toFixed(3) + ' MB');
      $('.rendered-image-area p').html( 'Size after conversion: ');
      $("#canvas2 div").css({
        "box-shadow": "0 0 black"
      });
      // console.log(uploaded_image);
    });
    reader.readAsDataURL(this.files[0]);
  })
})

function getImage() {
  var img = document.getElementById('canvas1'), style = img.currentStyle || window.getComputedStyle(img, false),
  bi = style.backgroundImage.slice(4, -1).replace(/"/g, "");
  // console.log(bi);
  return bi;
}

function getHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

$('#convert').click(function () {
  const canvas1 = document.getElementById('canvas1');
  const ctx1 = canvas1.getContext('2d');
  const canvasAfterMediaQuery = document.querySelector('.image-viewer');
  // console.log(canvasAfterMediaQuery.offsetWidth, canvasAfterMediaQuery.offsetHeight);
  canvas1.width = canvasAfterMediaQuery.offsetWidth - 4;
  canvas1.height = canvasAfterMediaQuery.offsetHeight - 4;

  const image1 = new Image();
  image1.src = getImage();
  var boxShadowText = '';
  image1.addEventListener('load', function () {
    ctx1.drawImage(image1, 0, 0, canvas1.width, canvas1.height);
    const scannedImage = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    // console.log(scannedImage);
    const scannedData = scannedImage.data;
    for (let a = 0, i = 0, j = 0; a < scannedData.length; a += 4) {

      const r = scannedData[a];
      const g = scannedData[a + 1];
      const b = scannedData[a + 2];

      var hexVal = getHex(r, g, b);

      boxShadowText += i + "px " + j + "px " + hexVal + ",";

      if (i == canvas1.width - 1) {
        j++;
        i = -1;
      }
      i++;
    }
    scannedImage.data = scannedData;
    ctx1.putImageData(scannedImage, 0, 0);
    boxShadowText = boxShadowText.slice(0, boxShadowText.length - 1);
    // console.log(boxShadowText);
    $("#canvas2 div").css({
      "box-shadow": boxShadowText
    });
    $('.rendered-image-area p').html( 'Size after conversion: ' + ((new Blob([boxShadowText]).size) / 1000000).toFixed(2) + ' MB')
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height)
  })
})