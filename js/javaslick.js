$(document).ready(function (){

  //NASA APOD api
  let nasaData = $.getJSON('https://api.nasa.gov/planetary/apod?api_key=vTuOXQ2zPozXkD0WTA8SvQUcGIlXNoh9uR3IUqEe&start_date=2017-06-01&end_date=2017-08-24', function(data) {

    // filter and remove videos from data set (only images and gifs)
    let starPhotosArray = data.filter((element) => {
      return element['media_type'] != 'video'
    })

    // save starPhotosArray to local storage
    localStorage.setItem('starInfo', JSON.stringify(starPhotosArray))
    let storage = localStorage.getItem('starInfo')
    let localStarArray = JSON.parse(storage)

    // build an array of 10 image objects with id numbers
    // id number is based on index position
    let cardsArrayOfTen = []
    let i = 0
    while (i < 10) {
      let randomPhotoObj = localStarArray[Math.floor(Math.random() * localStarArray.length)]
      randomPhotoObj['id'] = i
      cardsArrayOfTen.push(randomPhotoObj)
      i++
    }

    // create a new array with 20 images, 2 sets of 10
    let cardsArrayOfTwenty = []
    for (let i = 0; i < cardsArrayOfTen.length; i++) {
      cardsArrayOfTwenty.push(cardsArrayOfTen[i])
    }
    for (let i = 0; i < cardsArrayOfTen.length; i++) {
      cardsArrayOfTwenty.push(cardsArrayOfTen[i])
    }

    // shuffle cardsArrayOfTwenty
    function shuffle(array) {
      let counter = array.length;
      while (counter > 0) {
          let index = Math.floor(Math.random() * counter);
          counter--;
          let temp = array[counter];
          array[counter] = array[index];
          array[index] = temp;
      }
      return array;
    }
    shuffle(cardsArrayOfTwenty)

    // append the DOM with 20 cards
    let cardBackImage = 'http://i.imgur.com/0w9tMNF.jpg'
    for (let i = 0; i < cardsArrayOfTwenty.length; i++) {
      let newDiv = document.createElement("div")
      let image = cardsArrayOfTwenty[i]['url']
      let id = cardsArrayOfTwenty[i]['id']

      $(newDiv).addClass('card col-sm-2 no-match')
      $(newDiv).attr('id', i)
      $(newDiv).css('background-image', 'url(' + cardBackImage + ')')
      $('#card-holder').append(newDiv)
    }

    // set the click handler to add a photo when clicked (reveal the underside)
    // keep track of clicks
    let clicks = 0
    let imageNumber = null
    let arrayOfDivTargets = []
    let points = parseInt($('.points-label').text())

    $('.card').click(event, function(event) {
      clicks++
      // add animation to flip to front side
      $(event.target).addClass('animated flipInY').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $(event.target).removeClass('animated flipInY')
      })
      // apply the randomly generated NASA photo, according to index
      imageNumber = event.target.id
      for (var i = 0; i < cardsArrayOfTwenty.length; i++) {
        if (imageNumber == i) {
          $(event.target).css('background-image', 'url(' + cardsArrayOfTwenty[i]['url'] + ')')
          $(event.target).attr('title', cardsArrayOfTwenty[i]['id'])
          arrayOfDivTargets.push(event.target)
        }
      }
      // after two clicks, check to see if images have the same id number
      if (clicks == 2) {
        let titleOfPreviousClick = arrayOfDivTargets[arrayOfDivTargets.length-2].title
        let divOfPreviousClick = arrayOfDivTargets[arrayOfDivTargets.length-2]

        // if its a match, animate
        if (event.target.title == titleOfPreviousClick) {
          points = points + 1
          $('.points-label').text(points)
          $(event.target).removeClass('no-match')
          $(divOfPreviousClick).removeClass('no-match')
          window.setTimeout(matchAnimation, 1100)
        }
        // if its not a match, use the flipCardToBack function
        else {
          points = points - 1
          $('.points-label').text(points)
          window.setTimeout(flipCardToBack, 1100)
        }

        // you lose pop up and animation
        if (points == 0) {
          console.log(points)
          console.log('you just destroyed planet earth!')
          $('#youlose-modal').modal({ backdrop: false })
          console.log($('#card-holder').children())
        }

        // keep track of matches, apply an animation when all are matched and game is won, run function to switch modes
        if ($('#card-holder').children().hasClass('no-match')) {
        }
        else {
          window.setTimeout(donezies, 1100)
        }

        // function to reset to cardBackImage with animation if it's not a match
        function flipCardToBack() {
          // animation for event.target
          $(event.target).addClass('animated flipInY').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(event.target).removeClass('animated flipInY')
          })
          // add the animation to the previously clicked div
          $(divOfPreviousClick).addClass('animated flipInY').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(divOfPreviousClick).removeClass('animated flipInY')
          })
          // reset the photo to cardBackImage
          $(event.target).css('background-image', 'url(' + cardBackImage + ')')
          $(divOfPreviousClick).css('background-image', 'url(' + cardBackImage + ')')
        }

        // function animation when match happens
        function matchAnimation() {
          // animation for last clicked
          $(event.target).addClass('animated tada').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(event.target).removeClass('animated tada')
          })
          // animation for previously clicked
          $(divOfPreviousClick).addClass('animated tada').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(divOfPreviousClick).removeClass('animated tada')
          })
        }
        // reset clicks to 0
        clicks = 0
      }
    })

    // function for donezies (win!) animation/ not play mode
    function donezies() {
      $('#card-holder').addClass('animated bounce').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $('#card-holder').removeClass('animated bounce')
      })
      // remove game play mode
      $('.card').unbind('click')
      // you win pop up
      $('#youwin-modal').modal({ backdrop: false })
      // new click handler to show info about each photo
      $('#card-holder').click(event, function() {
        console.log(event.target)
        console.log(cardsArrayOfTwenty)
        for (var i = 0; i < cardsArrayOfTwenty.length; i++) {
          let imageId = cardsArrayOfTwenty[i]['id']
          let imageTitle = cardsArrayOfTwenty[i]['title']
          let imageUrl = cardsArrayOfTwenty[i]['url']
          let imageDate = cardsArrayOfTwenty[i]['date']
          let imageExp = cardsArrayOfTwenty[i]['explanation']
          if (event.target.title == imageId) {
            console.log(imageTitle)
            console.log($('#target-title').text())
            console.log(imageUrl)
            $('#info-modal').modal({ backdrop: false })
            $('#target-title').text(imageTitle)
            $('#target-photo').attr('src', `${imageUrl}`)
            $('#target-date').text(imageDate)
            $('#target-info').text(imageExp)
          }
        }
      })
    }

  // end of main function bracket
  })

  // shuffle button click to reload page
  $('.button').click(function(){
    $('.button').addClass('animated tada').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      $('.button').removeClass('animated tada')
      window.location.reload()
    })
    $('#card-holder').addClass('animated zoomOut')
  })


// document.ready closing bracket
})
