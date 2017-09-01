$(document).ready(() => {

  setTimeout(() => {
    $('.1').removeClass('hidden').addClass('animated rotateIn')}, 2000)
  setTimeout(() => {
    $('.2').removeClass('hidden').addClass('animated rotateIn')}, 2200)
  setTimeout(() => {
    $('.3').removeClass('hidden').addClass('animated rotateIn')}, 2400)
  setTimeout(() => {
    $('.4').removeClass('hidden').addClass('animated rotateIn')}, 2600)
  setTimeout(() => {
    $('.5').removeClass('hidden').addClass('animated rotateIn')}, 2800)
  setTimeout(() => {
    $('.6').removeClass('hidden').addClass('animated rotateIn')}, 3000)
  setTimeout(() => {
    $('.7').removeClass('hidden').addClass('animated rotateIn')}, 3200)
  setTimeout(() => {
    $('.8').removeClass('hidden').addClass('animated rotateIn')}, 3400)
  setTimeout(() => {
    $('.9').removeClass('hidden').addClass('animated rotateIn')}, 3600)
  setTimeout(() => {
    $('.10').removeClass('hidden').addClass('animated rotateIn')}, 3800)

  setTimeout(() => {
    $('#game-subtitle').removeClass('hidden').addClass('animated slideInUp')
  }, 4200)

  setTimeout(() => {
    $('.button').removeClass('hidden').addClass('animated fadeIn')
  }, 6000)

  setTimeout(() => {
    $('.arrow').removeClass('hidden').addClass('animated fadeIn')
  }, 6000)

  $('.button').click(() => {
    window.location.href = 'game.html'
  })

  $('.play-button').click(() => {
    window.location.href = 'game.html'
  })

  $('.arrow').click(function() {
  $('html, body').animate({ scrollTop: $(document).height() }, "slow")
  return false
});

})
