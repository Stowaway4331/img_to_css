const modal = document.querySelector('#modal');
const openModal = document.querySelector('#open-button');
const closeModal = document.querySelector('#close-button');

openModal.onclick = function () {
  modal.style.display = "block";
  const boxShadowText = document.getElementById('canvas2').innerHTML;
  const base64Text = document.getElementById('canvas1').style.backgroundImage.slice(5,-2);
  console.log(base64Text);
  $('#box-shadow-text').text( boxShadowText );
  $('#base64-text').text( base64Text );
}

closeModal.onclick = function () {
  modal.style.display = "none";
}

$('.modal-header span').click( function () {
  
  if(this.classList.contains('active')) {
    return;
  }
  
  var headerItems = document.getElementsByClassName('modal-header-item');
  var b;
  for(a = 0; a < headerItems.length; a++) {
    $(headerItems[a]).removeClass("active");
  }
  $(this).addClass('active');
})

$('.code-css-header').click( function () {
  $('#base64-text').css({
    "display": "none"
  })
  $('#box-shadow-text').css({
    "display": "block"
  })
})

$('.code-base64-header').click( function () {
  $('#base64-text').css({
    "display": "block"
  })
  $('#box-shadow-text').css({
    "display": "none"
  })
})