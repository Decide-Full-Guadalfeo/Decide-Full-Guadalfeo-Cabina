from django.test import TestCase
from django.contrib.staticfiles.testing import StaticLiveServerTestCase

from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from base.tests import BaseTestCase

#Pratica 2: Pruebas de vista
"""
class AuthTestCaseView(StaticLiveServerTestCase):

    def setUp(self):
        #Load base test functionality for decide
        self.base = BaseTestCase()
        self.base.setUp()

        options = webdriver.ChromeOptions()
        options.headless = True
        self.driver = webdriver.Chrome(options=options)

        super().setUp()            
            
    def tearDown(self):           
        super().tearDown()
        self.driver.quit()

        self.base.tearDown()
    
    #Pratica 2: Pruebas de vista - Ejercio 2
    def test_simpleCorrectLogin(self):                    
        self.driver.get(f'{self.live_server_url}/admin/')
        self.driver.find_element_by_id('id_username').send_keys("admin")
        self.driver.find_element_by_id('id_password').send_keys("qwerty",Keys.ENTER)

        #print(self.driver.current_url)
        #In case of a correct loging, a element with id 'user-tools' is shown in the upper right part
        self.assertTrue(len(self.driver.find_elements_by_id('user-tools'))==1)

    #Pratica 2: Pruebas de vista - Ejercio 3
    def test_simpleWrongLogin(self):                    
        self.driver.get(f'{self.live_server_url}/admin/')
        self.driver.find_element_by_id('id_username').send_keys("WRONG")
        self.driver.find_element_by_id('id_password').send_keys("WRONG",Keys.ENTER)
        
        #print(self.driver.current_url)
        #In case of a correct loging, a element with id 'user-tools' is shown in the upper right part
        self.assertTrue(len(self.driver.find_elements_by_class_name('errornote'))==1)
    
    #Pratica 2: Pruebas de vista - Ejercio 4
    
    def test_createQuestionView(self):                    
        self.driver.get(f'{self.live_server_url}/admin/')
        self.driver.find_element_by_id('id_username').send_keys("admin")
        self.driver.find_element_by_id('id_password').send_keys("qwerty",Keys.ENTER)
        self.driver.find_element(By.CSS_SELECTOR, ".model-question .addlink").click()
        self.driver.find_element(By.ID, "id_desc").send_keys("New Question")
        self.driver.find_element(By.ID, "id_options-0-number").send_keys("1")
        self.driver.find_element(By.ID, "id_options-0-option").send_keys("option1")
        self.driver.find_element(By.ID, "id_options-1-number").send_keys("2")
        self.driver.find_element(By.ID, "id_options-1-option").send_keys("option2")
        self.driver.find_element(By.NAME, "_save").click()

        self.assertTrue(len(self.driver.find_elements_by_class_name('success'))==1)
    
    #Pratica 2: Pruebas de vista - Ejercio 5
    def test_CorrectLoginSelenium(self):                    
        self.driver.get(f'{self.live_server_url}/admin/')
        self.driver.find_element_by_id('id_username').send_keys("admin")
        self.driver.find_element_by_id('id_password').send_keys("qwerty",Keys.ENTER)

        self.assertTrue(len(self.driver.find_elements_by_id('user-tools'))==1)
"""