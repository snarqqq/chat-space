json.user_name  @message.user.name
json.body  @message.body
json.date  @message.created_at.strftime("%Y/%m/%d %H:%M")
json.image @message.image.url
json.id     @message.id