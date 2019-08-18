$(document).on('turbolinks:load', function() {

  function buildHTML(message){
    var imagehtml = message.image == null ? "" : `<img src="${message.image}" class="lower-message__image">`;
    var html = `<div class=message data-messageid=${message.id}>
                    <div class="message__upper-info">
                      <div class="message__user-name">
                      ${message.user_name}
                      </div>
                      <div class="message__date">
                      ${message.date}
                      </div>
                    </div>
                    <div class="message__body">
                      <p class="message__text">
                      ${message.body}
                      </p>
                      ${imagehtml}
                    </div>
                  </div> `
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('.new_message')[0].reset();
      $( ".form__button").prop( "disabled", false );
    })
    .fail(function(){
      alert('error');
      $( ".form__button").prop( "disabled", false );
    })
  })

  function reloadMessages() {
    var last_message_id = $('.message').last().attr('data-messageid');
    console.log(last_message_id)
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
       messages.forEach(function(message){
         if (message.id > last_message_id){
           var insertHTML = buildHTML(message);
           $('.messages').append(insertHTML);
           $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
         };
       });
    })
    .fail(function() {
      alert('メッセージの取得に失敗しました');
    });
  };

  if (window.location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages,3000);
  };

});
