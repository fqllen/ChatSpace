$(function() {
  function buildHTML(message){
    if (message.image) {
      addImage = `<img src="${message.image}" class="lower-message__image">`;
    }
    var html = `
        <div class="message" data-message-id="${message.id}">
          <div class="message-box">
            <div class="message-box__person">${message.user_name}</div>
            <div class="message-box__person--timestamp">${message.date}</div>
          </div>
          <div class="message-box__text">
            <p class="message-box__text">
              ${message.content}
            </p>
            ${addImage}
          </div>
        </div>`;
    return html;
  }
  $('#new_message').on('submit',function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action")
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      $('.submit-btn').prop('disabled', false);
    if(message.length != 0){
      var html = buildHTML(message);
      $('.messages').append(html)
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('#new_message')[0].reset();
    }
    })
    .fail(function(){
      alert('error');
    })
  })


  function buildHTML(message){
    if (message.image) {
      addImage = `<img src="${message.image}" class="lower-message__image">`;
    }
    var html = `
                  <div class="message" data-message-id="${message.id}">
                    <div class="message-box">
                      <div class="message-box__person">${message.user_name}</div>
                      <div class="message-box__person--timestamp">${message.date}</div>
                    </div>
                    <div class="message-box__text">
                      <p class="message-box__text">
                        ${message.content}
                      </p>
                      ${addImage}
                    </div>
                  </div>
                `
    $('.messages').append(html);
  };
  if (window.location.href.match(/\/groups\/\d+\/messages/)){
       setInterval(autoUpdate,5000)
  };

  function autoUpdate() {
    var href = $(this).attr("action")

      if($('.messages')[0]){
        var message_id = $('.message').last().attr('data-message-id');
        var group_id = $('.main-header__box__title').last().attr('data-group-id');
      } else { //ない場合は
        var message_id = 0
      }

    $.ajax({
      url: href,
      type: 'GET',
      dataType: 'json',
      data: { message_id: message_id,
        group_id: group_id
      } //railsに引き渡すデータは
          //このような形(paramsの形をしています)で、'id'には'message_id'を入れる
    })

    .done(function(messages) {
      $.each(messages, function(i, message){ //'messages'を'message'に代入してeachで回す
        buildHTML(message);
      });
    })
    .fail(function(){
      alert('メッセージの取得に失敗しました');
    });
  };
});

