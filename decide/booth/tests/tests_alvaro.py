from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework.test import APITestCase

from django.utils import timezone

from django.contrib.auth.models import User
from voting.models import Voting, Question, QuestionOption
from authentication.models import VotingUser
from rest_framework.authtoken.models import Token
from base.models import Auth
import json

from base import mods

class BoothTestCase(APITestCase):
    def setUp(self):
        super().setUp()
        self.client = APIClient()
        mods.mock_query(self.client)

        u1 = User(username='voter1', email='voter1@gmail.com')
        u1.set_password('113')
        u1.save()
        self.user1 = u1
        vu1 = VotingUser(user=u1, dni='45454545T', sexo='Man', titulo='Software', curso='First', edad=18)
        vu1.save()
        self.votingUser = vu1
        t1 = Token(user=u1)
        t1.save()
        self.token1 = t1

        q1 = Question(desc='Pregunta 1')
        q1.save()
        qo1 = QuestionOption(number="1", option="Alvaro Aguilar / 1", question=q1)
        qo1.save()
        qo2 = QuestionOption(number="2", option="Nuría Garcia / 2", question=q1)
        qo2.save()
        qo3 = QuestionOption(number="3", option="Andrea Solar / 3", question=q1)
        qo3.save()

        q2 = Question(desc='Pregunta 2')
        q2.save()
        qo4 = QuestionOption(number="1", option="Alvaro Aguilar / 1", question=q2)
        qo4.save()
        qo5 = QuestionOption(number="2", option="Nuría Garcia / 2", question=q2)
        qo5.save()
        qo6 = QuestionOption(number="3", option="Andrea Solar / 3", question=q2)
        qo6.save()

        q3 = Question(desc='Pregunta 3')
        q3.save()
        qo7 = QuestionOption(number="1", option="Alvaro Aguilar / 1", question=q3)
        qo7.save()
        qo8 = QuestionOption(number="2", option="Nuría Garcia / 2", question=q3)
        qo8.save()
        qo9 = QuestionOption(number="3", option="Andrea Solar / 3", question=q3)
        qo9.save()

        q4 = Question(desc='Pregunta 4')
        q4.save()
        qo10 = QuestionOption(number="1", option="Alvaro Aguilar / 1", question=q4)
        qo10.save()
        qo11 = QuestionOption(number="2", option="Nuría Garcia / 2", question=q4)
        qo11.save()
        qo12 = QuestionOption(number="3", option="Andrea Solar / 3", question=q4)
        qo12.save()

        q5 = Question(desc='Pregunta 5')
        q5.save()
        qo13 = QuestionOption(number="1", option="Alvaro Aguilar / 1", question=q5)
        qo13.save()
        qo14 = QuestionOption(number="2", option="Nuría Garcia / 2", question=q5)
        qo14.save()
        qo15 = QuestionOption(number="3", option="Andrea Solar / 3", question=q5)
        qo15.save()

        q6 = Question(desc='Pregunta 6')
        q6.save()
        qo16 = QuestionOption(number="1", option="Alvaro Aguilar / 1", question=q6)
        qo16.save()
        qo17 = QuestionOption(number="2", option="Nuría Garcia / 2", question=q6)
        qo17.save()
        qo18 = QuestionOption(number="3", option="Andrea Solar / 3", question=q6)
        qo18.save()
        
        q7 = Question(desc='Pregunta 7')
        q7.save()
        qo19 = QuestionOption(number="1", option="Alvaro Aguilar / 1", question=q7)
        qo19.save()
        qo20 = QuestionOption(number="2", option="Nuría Garcia / 2", question=q7)
        qo20.save()
        qo21 = QuestionOption(number="3", option="Andrea Solar / 3", question=q7)
        qo21.save()

        v1 = Voting(name="Votacion 1", desc="Descripcion 1", tipo='GV')
        v1.save()
        v1.question.add(q1)
        v1.question.add(q2)
        v1.question.add(q3)
        v1.question.add(q4)
        v1.question.add(q5)
        v1.question.add(q6)
        v1.question.add(q7)

        a1 = Auth(name='http://localhost:8000', url='http://localhost:8000', me=False)
        a1.save()
        v1.auths.add(a1)

        v1.create_pubkey()
        v1.start_date = timezone.now()

    def tearDown(self):
        super().tearDown()
        self.client = None
'''
    def test_voting_id_exist(self):
        voting = Voting.objects.all()
        response = self.client.get('http://localhost:8000/booth/' + str(voting[0].id) + '/')
        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, 'booth/booth.html')

        voting = json.loads(response.context['voting'])
        self.assertEquals(voting["id"], 1)

    def test_voting_id_not_exist(self):
        response = self.client.get('http://localhost:8000/booth/10000/')
        self.assertEquals(response.status_code, 404)'''