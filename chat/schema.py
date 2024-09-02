import graphene
from graphene_django import DjangoObjectType
from .models import Message
from channels_graphql_ws import Subscription, GraphqlWsConsumer


class MessageType(DjangoObjectType):
    class Meta:
        model = Message


class Query(graphene.ObjectType):
    messages = graphene.List(MessageType)

    def resolve_messages(self, info):
        return Message.objects.all()


class MessageSubscription(Subscription):
    class Arguments:
        room = graphene.String()

    message = graphene.Field(MessageType)

    async def subscribe(self, info, room=None):
        return [f'room_{room}']

    async def publish(self, info, room=None):
        return MessageSubscription(message=self)


class CreateMessage(graphene.Mutation):
    class Arguments:
        content = graphene.String(required=True)
        room = graphene.String(required=True)

    message = graphene.Field(MessageType)

    def mutate(self, info, content, room):
        message = Message(content=content, room=room)
        message.save()
        return CreateMessage(message=message)


class Mutation(graphene.ObjectType):
    send_message = CreateMessage.Field()


schema = graphene.Schema(query=Query, mutation=Mutation, subscription=MessageSubscription)
