$(function() {
  function buildHTML(message){
    var addImage = '';
    if (message.image.url) {
      addImage = `<img src="${message.image.url}" class="lower-message__image">`;
    }
    var html = `
        <div class="message" data-message-id="${message.id}">
          <div class="message-box">
            <div class="message-box__person">${message.name}</div>
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
    var url = window.location.href
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html)
      $('.input-box__text').val('')
      $('.submit-btn').prop('disabled', false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('.hidden').remove();
    })
    .fail(function(){
      alert('error');
    })
  })
});
