from django.test import TestCase
from django.contrib.staticfiles.testing import StaticLiveServerTestCase

from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys

from base.tests import BaseTestCase
import time

from django.utils import timezone

from django.contrib.auth.models import User
from voting.models import Voting, Question, QuestionOption, Candidatura
from authentication.models import VotingUser
from rest_framework.authtoken.models import Token
from base.models import Auth
from census.models import Census

class BoothTestCase(StaticLiveServerTestCase):

    def setUp(self):
        self.base = BaseTestCase()
        self.base.setUp()

        options = webdriver.ChromeOptions()
        options.headless = True
        self.driver = webdriver.Chrome(options=options)

        super().setUp()

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

        u2 = User(username='voter2', email='voter2@gmail.com')
        u2.set_password('113')
        u2.save()
        self.user2 = u2
        vu2 = VotingUser(user=u2, dni='45454545D', sexo='Man', titulo='Software', curso='First', edad=18)
        vu2.save()
        self.votingUser = vu2
        t2 = Token(user=u2)
        t2.save()
        self.token2 = t2

        u3 = User(username='voter3', email='voter3@gmail.com')
        u3.set_password('113')
        u3.save()
        self.user2 = u3

        c = Candidatura(nombre="Candidatura completa", delegadoCentro=u1, representanteDelegadoPrimero=u1,
            representanteDelegadoSegundo=u1, representanteDelegadoTercero=u1, representanteDelegadoCuarto=u1,
            representanteDelegadoMaster=u1)
        c.save()

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

        v1 = Voting(name="Votacion 1", desc="Descripcion 1", tipo='PV')
        v1.save()
        v1.question.add(q1)
        v1.question.add(q2)
        v1.question.add(q3)
        v1.question.add(q4)
        v1.question.add(q5)
        v1.question.add(q6)

        a1 = Auth(name=f'{self.live_server_url}', url=f'{self.live_server_url}', me=False)
        a1.save()
        v1.auths.add(a1)

        v1.create_pubkey()
        v1.start_date = timezone.now()   

        c1 = Census(voting_id=v1.id, voter_id=u1.id)
        c1.save()

        v1.candiancy = c
        v1.save()        
            
    def tearDown(self):           
        super().tearDown()
        self.driver.quit()

        self.base.tearDown()

    def test_send_only_1(self):
        self.driver.get(f'{self.live_server_url}/')
        self.driver.set_window_size(1920, 1080)
        time.sleep(1)
        self.driver.find_element(By.LINK_TEXT, "Login").click()
        time.sleep(1)
        self.driver.find_element(By.ID, "id_username").send_keys("voter1")
        self.driver.find_element(By.ID, "id_password").send_keys("113")
        self.driver.find_element(By.ID, "id_password").send_keys(Keys.ENTER)
        time.sleep(0.5)
        voting = Voting.objects.all()[0]
        self.driver.get(f'{self.live_server_url}/booth/' + str(voting.id))
        time.sleep(20)
        assert self.driver.find_element(By.CSS_SELECTOR, ".question:nth-child(1) .boxesDiv:nth-child(1) > div:nth-child(1) h3:nth-child(4)").text == "Alvaro Aguilar"
        self.driver.find_element(By.CSS_SELECTOR, ".question:nth-child(1) .boxesDiv:nth-child(1) > div:nth-child(1) .flip-card-front:nth-child(1)").click()
        time.sleep(0.5)
        self.driver.find_element(By.ID, "next-question").click()
        time.sleep(0.5)
        self.driver.find_element(By.ID, "voteButton").click()
        time.sleep(0.5)
        assert self.driver.find_element(By.CSS_SELECTOR, "p").text == "Por favor, no deje preguntas vacías"
        self.driver.find_element(By.CSS_SELECTOR, ".btn:nth-child(2)").click()
        self.driver.close()
    
    def test_send_blank(self):
        self.driver.get(f'{self.live_server_url}/')
        self.driver.set_window_size(1920, 1080)
        time.sleep(0.5)
        self.driver.find_element(By.LINK_TEXT, "Login").click()
        time.sleep(0.5)
        self.driver.find_element(By.ID, "id_username").send_keys("voter1")
        self.driver.find_element(By.ID, "id_password").send_keys("113")
        self.driver.find_element(By.ID, "id_password").send_keys(Keys.ENTER)
        time.sleep(0.5)
        voting = Voting.objects.all()[0]
        self.driver.get(f'{self.live_server_url}/booth/' + str(voting.id))
        time.sleep(20)
        self.driver.find_element(By.ID, "voteButton").click()
        time.sleep(4)
        assert self.driver.find_element(By.CSS_SELECTOR, "p").text == "Por favor, no deje preguntas vacías"
        self.driver.find_element(By.CSS_SELECTOR, ".btn:nth-child(2)").click()
        self.driver.close()
    
    def test_languagetest(self):
        self.driver.get(f'{self.live_server_url}/')
        self.driver.set_window_size(1920, 1080)
        time.sleep(0.5)
        self.driver.find_element(By.LINK_TEXT, "Login").click()
        time.sleep(0.5)
        self.driver.find_element(By.ID, "id_username").send_keys("voter1")
        self.driver.find_element(By.ID, "id_password").send_keys("113")
        self.driver.find_element(By.ID, "id_password").send_keys(Keys.ENTER)
        time.sleep(0.5)
        voting = Voting.objects.all()[0]
        self.driver.get(f'{self.live_server_url}/booth/' + str(voting.id))
        time.sleep(20)
        assert self.driver.find_element(By.CSS_SELECTOR, ".moda > div > button").text == 'Guía de votación' 
        self.driver.find_element(By.CSS_SELECTOR, ".languageImg").click()
        time.sleep(0.5)
        assert self.driver.find_element(By.CSS_SELECTOR, ".moda > div > button").text == 'Voting guide' 
        self.driver.close()

    def test_usernotbeingVotingUser(self):
        self.driver.get(f'{self.live_server_url}/')
        self.driver.set_window_size(1920, 1080)
        time.sleep(0.5)
        self.driver.find_element(By.LINK_TEXT, "Login").click()
        time.sleep(0.5)
        self.driver.find_element(By.ID, "id_username").send_keys("voter3")
        self.driver.find_element(By.ID, "id_password").send_keys("113")
        self.driver.find_element(By.ID, "id_password").send_keys(Keys.ENTER)
        time.sleep(0.5)
        self.driver.get(f'{self.live_server_url}/booth')
        time.sleep(1)
        assert self.driver.find_element(By.CSS_SELECTOR, "h3").text == "Votings Visualizer" 
        self.driver.close()
        