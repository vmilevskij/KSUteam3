$(document).ready(function () {
    $(document).on('click', '#bind-sendComment', function () {
        args = {};
        args['text'] = $('#commentText').val();
        args['articleID'] = 0; // Reikia sugalvoti kaip gauti article ID
        args['userID'] = 0; // Reikia sugalvoti kaip gauti article ID
        $.ajax({
            url: "components/comments/ajax/comment.controller.php",
            data: {action: 'send', args:args}
          }).done(function() {
            $( this ).addClass( "done" );
          });
    })
    args = {};
    args['articleID'] = 0; // Reikia sugalvoti kaip gauti article ID
    args['userID'] = 0; // Reikia sugalvoti kaip gauti article ID
    $.ajax({
        url: "components/comments/ajax/comment.controller.php",
        data: {action: 'getComments', args:args}
      }).done(function(args) {
        console.log(args);
      });
})