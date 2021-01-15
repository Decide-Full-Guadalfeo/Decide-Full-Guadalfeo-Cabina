from django.db import models


class Census(models.Model):
    voting_id = models.PositiveIntegerField()
    voter_id = models.PositiveIntegerField()
    
    #Practica 1 - Tarea:
    adscription = models.CharField(max_length=50, default='')

    class Meta:
        unique_together = (('voting_id', 'voter_id'),)
