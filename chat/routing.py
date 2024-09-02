from django.urls import re_path, path
from . import consumers
from channels_graphql_ws import GraphqlWsConsumer


websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<room_name>\w+)/$', consumers.ChatConsumer.as_asgi()),
]
