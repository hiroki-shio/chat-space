$(function(){  
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="MessageBox" data-message-id=${message.id}>
          <div class="messsage-box">
            <div class="message-list__member">
              ${message.user_name}
            </div>
            <div class="message-list__date">
              ${message.created_at}
            </div>
          </div>
          <div class="Message">
            <p class="message-list__text">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="MessageBox" data-message-id=${message.id}>
        <div class="message-box">
          <div class="message-list__member">
            ${message.user_name}
          </div>
          <div class="message-list__date">
            ${message.created_at}
          </div>
        </div>
        <div class="Message">
          <p class="message-list__text">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }
  $('.new-message').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.message-list').append(html);
      $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});    
      $('form')[0].reset();
      $(".submit-btn").prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  　});
  });
});  