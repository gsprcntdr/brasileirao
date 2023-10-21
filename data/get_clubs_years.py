import requests
from bs4 import BeautifulSoup
import json

with open('data.json', 'r') as infile:
    players = json.load(infile)

def get_data(player:dict, year:str):
    print(f'Fetching {player["nome"]} - {year}')
    base_url = player['link'][:-4] + year
    response = requests.get(base_url)
    if response.status_code != 200:
        print('Failed to get URL.')
        exit()
    soup = BeautifulSoup(response.content, 'html.parser')
    clubs_dropdown = soup.find('select', {'id':'clube', 'name':'clube', 'class': 'form-control'})
    clubs = clubs_dropdown.find_all('option')
    player['clubs'][year] = []
    if len(clubs) == 1: 
        return
    for i in range(1, len(clubs)):
        player['clubs'][year].append(clubs[i].text.strip())

def get_birth(player:dict):
    print(f'Fetching {player["nome"]}`s birthday')
    base_url = player['link']
    response = requests.get(base_url)
    if response.status_code != 200:
        print('Failed to get URL.')
        exit()
    soup = BeautifulSoup(response.content, 'html.parser')
    profile_list = soup.find('ul', class_='perfil-detalhado')
    list_elements = profile_list.find_all('li')
    list_information = [elements.find('span', class_='valor') for elements in list_elements]
    birthday = list_information[1].text.strip()
    player['birth'] = birthday


print('Started:')

for player in players:
    get_data(player, '2020')
    get_data(player, '2021')
    get_data(player, '2022')
    get_data(player, '2023')
    get_birth(player)
    

with open('data.json', 'w') as outfile:
    json.dump(players, outfile, indent=2)

print('Done.')
