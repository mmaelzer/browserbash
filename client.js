var domready = require('domready');
var shoe = require('shoe');

domready(function () {
  var $prompt = $('#prompt');
  var $promptOut = $('#prompt-out');

  var stream = shoe('/bash');

  var scrollToBottom = function() {
    $("html, body").animate({ scrollTop: $(document).height() }, 400);
  };

  var clearAndFocus = function() {
    $promptOut.text('');
    $prompt.val('');
  };

  stream.on('data', function(data) {
    $promptOut.text($promptOut.text() + data + '\n');
    scrollToBottom();
  });

  $prompt.keyup(function(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code != 13) {
      return false;
    }

    if ($prompt.val() === 'clear') {
      return clearAndFocus();
    }
    stream.write($prompt.val() + '\n');
    $promptOut.text($promptOut.text() + '$ ' + $prompt.val() + '\n');
    clearAndFocus();
    scrollToBottom();
  });

  $(document).click(function() {
    $prompt.focus();
  });

  $prompt.focus();
});