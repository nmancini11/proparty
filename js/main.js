$(function () {

  $('.jumbotron h1').fitText(0.8, { minFontSize: 50, maxFontSize: 110 });
  // title
  for (var i = 1; i <= 8; i++) {
    pp('.char' + i, { duration: 10000, initialDelay: (400 * i), cycle: true, ease: 'out' })
    .set('color', [ '#C7F464', '#FF6B6B', '#C44D58' ])
    .start();
  }

  // setup Audio
  var skate = new Audio("audio/skate.mp3"), // buffers automatically when created
      pop = new Audio("audio/pop.mp3");
      skate.play();

  // easing types
  var types = ['in', 'out', 'in-out', 'linear', 'snap', 'ease-in-quad', 'ease-in-cubic', 'ease-in-quart', 'ease-in-quint', 'ease-in-sine', 'ease-in-expo', 'ease-in-circ', 'ease-in-back', 'ease-out-quart', 'ease-out-quint', 'ease-out-sine', 'ease-out-expo', 'ease-out-circ', 'ease-out-back', 'ease-out-quad', 'ease-out-cubic', 'ease-in-out-quart', 'ease-in-out-quint', 'ease-in-out-sine', 'ease-in-out-expo', 'ease-in-out-circ', 'ease-in-out-back'];

  $('#easingSelect')
    .html(types.map(function (x){ return '<option value="' + x + '">' + x + '</option>'; }))
    .on('change', function () {
      var selected = $(this).val();
      $('#easingCode').text([
        'pp(\'.example\', { ease: \'' + selected + '\' })',
        ' .set(\'top\', \'80%\')',
        ' .start();'
      ].join('\n'));
    })
    .change();

  var tricks = {
    treflip: function (trick, ease) {
      return trick
        .setSettings({ duration: 250, delay: 100, initialDelay: 50})
        .set('top', ['23%','28%'])
        .transform('rotateZ', ['-360deg'])
        .transform('rotateX', ['360deg']);
    },
    varialflip: function (trick, ease) {
      return trick
        .setSettings({ duration: 250, delay: 100, initialDelay: 50})
        .set('top', ['23%','28%'])
        .transform('rotateZ', ['-180deg'])
        .transform('rotateX', ['360deg']);
    },
    kickflip: function (trick) {
      return trick
        .setSettings({ duration: 250})
        .set('top', ['23%','28%'])
        .transform('rotateX', ['-360deg','-360deg']);
    },
    heelflip: function (trick) {
      return trick
        .setSettings({ duration: 250})
        .set('top', ['23%','28%'])
        .transform('rotateX', ['360deg','360deg']);
    },
    shuvit: function (trick) {
      return trick
        .setSettings({ duration: 250})
        .set('top', ['23%','28%'])
        .transform('rotateZ', ['180deg','180deg']);
    },
    manual: function (trick) {
      return trick
        .setSettings({ duration: 300})
        .transform('rotateY',['-35deg', '-5deg','0deg'])
        .transform('translateZ',['50px']);
    }
  };

  var pptrick1;
  var pptrick2;

  $('.play').on('click', function () {
    var trick = $(this).data('play');


    $('.trick').attr('style', '');
    $('.trick-text').text('');

    // data-controls is true like play / pause / stop / destroy
    // if it has them... show them. If not hide them
    // $('.trick-controls')[$(this).data('controls') ? 'show' : 'hide']();

    // $('.trick-controls .toggle')
    //     .data('toggle', 'pause')
    //     .text('Pause');

    $('.trick-container').toggleClass('multiple', !!$(this).data('multiple'));

    // this is the Proparty function that executes the animation
    pp('.trick-container')
      .whenStarted(function () {
        pop.play();
        skate.pause().delay(10);
      })
      .chain(function () {
        pptrick1 = pp('.trick-one');
        pptrick2 = pp('.trick-two');
        return tricks[trick](pptrick1, $('#easingSelect').val(), pptrick2)
          .chain(function () {
            return pp('.trick-container')
              .whenDestroyed(function () {
                skate.play();
              });
          });
      })
      .start();
  });

  // $('.manual').on('mouseover', function () {
  //   var trick = $(this).data('play');


  //   $('.trick').attr('style', '');
  //   $('.trick-text').text('');

  //   $('.trick-container').toggleClass('multiple', !!$(this).data('multiple'));

  //   // this is the Proparty function that executes the animation
  //   pp('.trick-container')
  //     .chain(function () {
  //       pptrick1 = pp('.trick-one');
  //       return tricks[trick](pptrick1, $('#easingSelect').val(), pptrick2)
  //         .chain(function () {
  //           return pp('.trick-container');
  //         });
  //     })
  //     .start();
  // });


  // pp('.example', { cycle: true })
  //   .set('font-size', [ '150%', '450%', '75%' ])
  //   // .set('background-color', [ '#556270', '#4ECDC4', '#C7F464', '#FF6B6B', '#C44D58' ])
  //   .set('background-color', function () { return '#' + (Math.random().toString(16) + '000000').slice(2, 8); })
  //   .set('padding', [ '20px', '50px' ])
  //   .transform('rotateX', [ '180deg', '0deg', '0deg', '180deg' ])
  //   .transform('rotateY', [ '180deg', '0deg', '0deg', '180deg' ])
  //   .start();

  // pp('.example', { delay: 1000, duration: 500, cycle: true })
  //   .setWithVendor('border-radius', [ '0px', '20px', '80px' ])
  //   .start();

  // pp('.example', { duration: 750, cycle: true, ease: 'snap' })
  //   // .set('top', pp.add([ '5%', '5%', '10%', '20%' ]))
  //   // .set('left', [ '20%', '20%', '40%', '40%' ])
  //   .set('top', [ '25%', '50%', '35%', '40%' ])
  //   .set('left', [ '50%', '25%', '60%' ])
  //   // .set('top', function () { return Math.floor((Math.random() * 90) + 1) + '%'; })
  //   // .set('left', function () { return Math.floor((Math.random() * 90) + 1) + '%'; })
  //   .whenStarted(function () { console.log('start!'); })
  //   .whenPaused(function () { console.log('paused!'); })
  //   .whenStopped(function () { console.log('stopped!'); })
  //   .start()

});