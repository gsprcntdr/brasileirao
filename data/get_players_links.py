import requests
from bs4 import BeautifulSoup
import json

base_url = 'https://www.cbf.com.br/futebol-brasileiro/atletas/campeonato-brasileiro-serie-a/2023'

players = []

for i in range(1, 44): #44 pages with data after base url
    extended_url_page = f'?atleta=&page={i}&csrt=13836262453692584901' if i != 1 else ''
    response = requests.get(base_url+extended_url_page)

    if response.status_code == 200:
        content = response.content
    else:
        print('Failed to get URL.')
        exit()

    soup = BeautifulSoup(content, 'html.parser')
    table = soup.find('table')

    for row in table.find_all('tr'):
        for cell in row.find_all(['td', 'th']):
            player = {}
            links = cell.select('a')
            url = [link['href'] for link in links]
            if len(url) != 0:
                player['nome'] = cell.text.strip()
                player['link'] = url[0]
                player['clubs'] = {}
                players.append(player)
            break

with open ('data.json','w') as outfile:
    json.dump(players, outfile)

print('Data collected.')