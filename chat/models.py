from django.db import models


class Message(models.Model):
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    room = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.room}: {self.content[:20]}...'

    class Meta:
        app_label = 'chat'
        ordering = ['-timestamp']
