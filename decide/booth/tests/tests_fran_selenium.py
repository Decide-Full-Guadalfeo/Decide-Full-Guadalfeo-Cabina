
from django.test import TestCase
from rest_framework.test import APIClient

from django.contrib.staticfiles.testing import StaticLiveServerTestCase

import time
import json
from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

from django.contrib.auth.models import User
from authentication.models import VotingUser

from base import mods
from base.tests import BaseTestCase

from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework.test import APITestCase

from django.utils import timezone

from django.contrib.auth.models import User
from voting.models import Voting, Question, QuestionOption, Candidatura
from authentication.models import VotingUser
from rest_framework.authtoken.models import Token
from base.models import Auth
from census.models import Census

from base import mods

import time 

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

        u2 = User(username='a', email='a@gmail.com')
        u2.set_password('113')
        u2.save()
        self.user2 = u2
        vu2 = VotingUser(user=u2, dni='45454541T', sexo='Man', titulo='Software', curso='First', edad=18)
        vu2.save()
        self.votingUser = vu2
        t2 = Token(user=u2)
        t2.save()
        self.token2 = t2

        u3 = User(username='b', email='b@gmail.com')
        u3.set_password('113')
        u3.save()
        self.user3 = u3
        vu3 = VotingUser(user=u3, dni='45454542T', sexo='Woman', titulo='Software', curso='First', edad=18)
        vu3.save()
        self.votingUser = vu3
        t3 = Token(user=u3)
        t3.save()
        self.token3 = t3

        u4 = User(username='c', email='c@gmail.com')
        u4.set_password('113')
        u4.save()
        self.user4 = u4
        vu4 = VotingUser(user=u4, dni='45454543T', sexo='Woman', titulo='Software', curso='First', edad=18)
        vu4.save()
        self.votingUser = vu4
        t4 = Token(user=u4)
        t4.save()
        self.token4 = t4

        u5 = User(username='5', email='d@gmail.com')
        u5.set_password('113')
        u5.save()
        self.user5 = u5
        vu5 = VotingUser(user=u5, dni='55555553T', sexo='Woman', titulo='Software', curso='First', edad=18)
        vu5.save()
        self.votingUser = vu5
        t5 = Token(user=u5)
        t5.save()
        self.token5 = t5

        u6 = User(username='6', email='d@gmail.com')
        u6.set_password('113')
        u6.save()
        self.user6 = u6
        vu6 = VotingUser(user=u6, dni='66666663T', sexo='Woman', titulo='Software', curso='First', edad=18)
        vu6.save()
        self.votingUser = vu6
        t6 = Token(user=u6)
        t6.save()
        self.token6 = t6

        u7 = User(username='7', email='d@gmail.com')
        u7.set_password('113')
        u7.save()
        self.user7 = u7
        vu7 = VotingUser(user=u7, dni='77777773T', sexo='Woman', titulo='Software', curso='First', edad=18)
        vu7.save()
        self.votingUser = vu7
        t7 = Token(user=u7)
        t7.save()
        self.token7 = t7
        
        u8 = User(username='8', email='d@gmail.com')
        u8.set_password('113')
        u8.save()
        self.user8 = u8
        vu8 = VotingUser(user=u8, dni='88888888T', sexo='Woman', titulo='Software', curso='First', edad=18)
        vu8.save()
        self.votingUser = vu8
        t8 = Token(user=u8)
        t8.save()
        self.token8 = t8

        u9 = User(username='9', email='d@gmail.com')
        u9.set_password('113')
        u9.save()
        self.user9 = u9
        vu9 = VotingUser(user=u9, dni='99999999T', sexo='Man', titulo='Software', curso='First', edad=19)
        vu9.save()
        self.votingUser = vu9
        t9 = Token(user=u9)
        t9.save()
        self.token9 = t9

        u10 = User(username='10', email='d@gmail.com')
        u10.set_password('113')
        u10.save()
        self.user10 = u10
        vu10 = VotingUser(user=u10, dni='11111111P', sexo='Man', titulo='Software', curso='First', edad=110)
        vu10.save()
        self.votingUser = vu10
        t10 = Token(user=u10)
        t10.save()
        self.token10 = t10

        u11 = User(username='11', email='d@gmail.com')
        u11.set_password('113')
        u11.save()
        self.user11 = u11
        vu11 = VotingUser(user=u11, dni='11111111R', sexo='Man', titulo='Software', curso='First', edad=111)
        vu11.save()
        self.votingUser = vu11
        t11 = Token(user=u11)
        t11.save()
        self.token11 = t11

        u12 = User(username='12', email='d@gmail.com')
        u12.set_password('123')
        u12.save()
        self.user12 = u12
        vu12 = VotingUser(user=u12, dni='12121212T', sexo='Man', titulo='Software', curso='First', edad=121)
        vu12.save()
        self.votingUser = vu12
        t12 = Token(user=u12)
        t12.save()
        self.token12 = t12

        u13 = User(username='13', email='d@gmail.com')
        u13.set_password('133')
        u13.save()
        self.user13 = u13
        vu13 = VotingUser(user=u13, dni='13131313T', sexo='Man', titulo='Software', curso='First', edad=131)
        vu13.save()
        self.votingUser = vu13
        t13 = Token(user=u13)
        t13.save()
        self.token13 = t13

        u14 = User(username='14', email='d@gmail.com')
        u14.set_password('143')
        u14.save()
        self.user14 = u14
        vu14 = VotingUser(user=u14, dni='14141414T', sexo='Man', titulo='Software', curso='First', edad=141)
        vu14.save()
        self.votingUser = vu14
        t14 = Token(user=u14)
        t14.save()
        self.token14 = t14


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
        qo19 = QuestionOption(number="1", option="Alvaro Aguilar / " + str(u2.id), question=q7)
        qo19.save()
        qo20 = QuestionOption(number="2", option="Nuría Garcia / " + str(u3.id), question=q7)
        qo20.save()
        qo21 = QuestionOption(number="3", option="Andrea Solar A / " + str(u4.id), question=q7)
        qo21.save()
        qo22 = QuestionOption(number="4", option="Andrea Solar B / " + str(u5.id), question=q7)
        qo22.save()
        qo23 = QuestionOption(number="5", option="Andrea Solar C / " + str(u6.id), question=q7)
        qo23.save()
        qo24 = QuestionOption(number="6", option="Andrea Solar D / " + str(u7.id), question=q7)
        qo24.save()
        qo25 = QuestionOption(number="7", option="Andrea Solar E / " + str(u8.id), question=q7)
        qo25.save()
        qo26 = QuestionOption(number="8", option="Alvaro Aguilar A / " + str(u9.id), question=q7)
        qo26.save()
        qo27 = QuestionOption(number="9", option="Alvaro Aguilar B / " + str(u10.id), question=q7)
        qo27.save()
        qo28 = QuestionOption(number="10", option="Alvaro Aguilar C / " + str(u11.id), question=q7)
        qo28.save()
        qo29 = QuestionOption(number="11", option="Alvaro Aguilar D / " + str(u12.id), question=q7)
        qo29.save()
        qo30 = QuestionOption(number="12", option="Alvaro Aguilar E / " + str(u13.id), question=q7)
        qo30.save()
        qo31 = QuestionOption(number="13", option="Alvaro Aguilar F / " + str(u14.id), question=q7)
        qo31.save()

        v1 = Voting(name="Votacion 1", desc="Descripcion 1", tipo='GV')
        v1.save()
        v1.question.add(q1)
        v1.question.add(q2)
        v1.question.add(q3)
        v1.question.add(q4)
        v1.question.add(q5)
        v1.question.add(q6)
        v1.question.add(q7)

        a1 = Auth(name=f'{self.live_server_url}', url=f'{self.live_server_url}', me=False)
        a1.save()
        v1.auths.add(a1)

        v1.create_pubkey()
        v1.start_date = timezone.now()   

        c1 = Census(voting_id=v1.id, voter_id=u1.id)
        c1.save()

        v1.save()  
       
    def tearDown(self):
        super().tearDown()
        self.driver.quit()

        self.base.tearDown()

    
    def test_general_5_woman(self):
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
        time.sleep(3)
        #assert self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[1]/div[2]/div/div/div/div/label/div/div/div[1]/h3").text.__contains__("Alvaro Aguilar") 
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[1]/div[2]/div/div/div/div/label/div/div/div[1]").click()
        time.sleep(0.5)
        self.driver.find_element(By.ID, "next-question").click()
        time.sleep(0.5)
        #assert self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[2]/div[2]/div/div/div/div/label/div/div/div[1]/h3").text.__contains__("Andrea Solar")
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[2]/div[2]/div/div/div/div/label/div/div/div[1]").click()
        time.sleep(0.5)
        self.driver.find_element(By.ID, "next-question").click()
        time.sleep(0.5)
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[2]/label/span").click()
        time.sleep(0.5)
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[3]/label/span").click()
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[3]/label/span").click()
        time.sleep(0.5)
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[4]/label/span").click()
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[4]/label/span").click()
        time.sleep(0.5)
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[5]/label/span").click()
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[5]/label/span").click()
        time.sleep(0.5)
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[6]/label/span").click()
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[6]/label/span").click()
        time.sleep(0.5)
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[7]/label/span").click()
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[7]/label/span").click()
        time.sleep(0.5)
        
        
        self.driver.find_element(By.ID, "voteButton").click()
        time.sleep(4)
        assert self.driver.find_element(By.CSS_SELECTOR, "p").text == "Por favor, no deje preguntas vacías. Sólo se pueden seleccionar 10 alumnos en la lista como máximo, y 5 hombres y mujeres respectivamente."
        self.driver.find_element(By.CSS_SELECTOR, ".btn:nth-child(2)").click()
        self.driver.close()
    
    def test_general_5_man(self):
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
        time.sleep(3)
        #assert self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[1]/div[2]/div/div/div/div/label/div/div/div[1]/h3").text.__contains__("Alvaro Aguilar")
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[1]/div[2]/div/div/div/div/label/div/div/div[1]").click()
        time.sleep(0.5)
        self.driver.find_element(By.ID, "next-question").click()
        time.sleep(0.5)
        #assert self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[2]/div[2]/div/div/div/div/label/div/div/div[1]/h3").text.__contains__("Andrea Solar")
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[2]/div[2]/div/div/div/div/label/div/div/div[1]").click()
        time.sleep(0.5)
        self.driver.find_element(By.ID, "next-question").click()
        time.sleep(0.5)
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[8]/label/span").click()
        time.sleep(0.5)
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[9]/label/span").click()
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[9]/label/span").click()
        time.sleep(0.5)
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[10]/label/span").click()
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[10]/label/span").click()
        time.sleep(0.5)
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[11]/label/span").click()
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[11]/label/span").click()
        time.sleep(0.5)
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[12]/label/span").click()
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[12]/label/span").click()
        time.sleep(0.5)
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[13]/label/span").click()
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[13]/label/span").click()
        time.sleep(0.5)
        self.driver.find_element(By.ID, "voteButton").click()
        time.sleep(1)
        assert self.driver.find_element(By.CSS_SELECTOR, "p").text == "Por favor, no deje preguntas vacías. Sólo se pueden seleccionar 10 alumnos en la lista como máximo, y 5 hombres y mujeres respectivamente."
        self.driver.find_element(By.CSS_SELECTOR, ".btn:nth-child(2)").click()
        self.driver.close()

    def test_general_10_selected(self):
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
        time.sleep(3)
        #assert self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[1]/div[2]/div/div/div/div/label/div/div/div[1]/h3").text.__contains__("Alvaro Aguilar")
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[1]/div[2]/div/div/div/div/label/div/div/div[1]").click()
        time.sleep(0.5)
        self.driver.find_element(By.ID, "next-question").click()
        time.sleep(0.5)
        #assert self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[2]/div[2]/div/div/div/div/label/div/div/div[1]/h3").text.__contains__("Andrea Solar")
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[2]/div[2]/div/div/div/div/label/div/div/div[1]").click()
        time.sleep(1)
        self.driver.find_element(By.ID, "next-question").click()
        time.sleep(0.5)
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[1]/label/span").click()
        time.sleep(0.5)
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[2]/label/span").click()
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[2]/label/span").click()
        time.sleep(0.3)
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[3]/label/span").click()
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[3]/label/span").click()
        time.sleep(0.3)
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[4]/label/span").click()
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[4]/label/span").click()
        time.sleep(0.3)
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[5]/label/span").click()
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[5]/label/span").click()
        time.sleep(0.3)
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[6]/label/span").click()
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[6]/label/span").click()
        time.sleep(0.3)
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[7]/label/span").click()
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[7]/label/span").click()
        time.sleep(0.3)
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[9]/label/span").click()
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[9]/label/span").click()
        time.sleep(0.3)
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[10]/label/span").click()
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[10]/label/span").click()
        time.sleep(0.3)
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[11]/label/span").click()
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[11]/label/span").click()
        time.sleep(0.3)
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[12]/label/span").click()
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[3]/div[2]/div/div[12]/label/span").click()
        
        self.driver.find_element(By.ID, "voteButton").click()
        time.sleep(2)
        assert self.driver.find_element(By.CSS_SELECTOR, "p").text == "Por favor, no deje preguntas vacías. Sólo se pueden seleccionar 10 alumnos en la lista como máximo, y 5 hombres y mujeres respectivamente."
        self.driver.find_element(By.CSS_SELECTOR, ".btn:nth-child(2)").click()
        self.driver.close()
    
    def test_flipping_card_functional(self):
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
        time.sleep(3)

        assert self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[1]/div[2]/div/div/div/div/label/div/div/div[1]/h3").text.__contains__("Alvaro Aguilar")
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[1]/div[2]/div/div/div/div/label/div/div/div[1]").click()
        time.sleep(1)
    
        assert self.driver.find_element(By.CSS_SELECTOR, ".flipped .flip-card-back > h4").text == "Has elegido"
        assert self.driver.find_element(By.CSS_SELECTOR, ".flipped .flip-card-back > h3").text.__contains__("Alvaro Aguilar")

        self.driver.find_element(By.CSS_SELECTOR, ".flipped .flip-card-back").click()
        time.sleep(1)

        assert self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div/form/div[1]/div[2]/div/div/div/div/label/div/div/div[1]/h3").text.__contains__("Alvaro Aguilar") 
