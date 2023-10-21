import psycopg2 as pg
import json
import dotenv as env
import os

env.load_dotenv()

conn = pg.connect(
    host=os.getenv('DB_HOST'),
    database=os.getenv('DB_NAME'),
    user=os.getenv('DB_USER'),
    password=os.getenv('DB_PASSWORD'),
)

cursor = conn.cursor()

player_insert = '''
    insert into players (name, link, birthday) values (%s, %s, %s) returning id
'''
team_insert = '''
    insert into teams (name, state) values (%s, %s) returning id
'''
relation_insert = '''
    insert into relations (player_id, team_id, year) values (%s, %s, %s)
'''

with open('data.json', 'r') as infile:
    players = json.load(infile)

for p in players:
    cursor.execute(player_insert, (p['nome'], p['link'], p['birth']))
    player_insert_return = cursor.fetchone()
    player_id = player_insert_return[0]
    clubs = p['clubs']
    conn.commit()
    for (year, club_names) in clubs.items():
        for name in club_names:
            try:
                cursor.execute(team_insert, (name, name[-2:]))
                team_insert_result = cursor.fetchone()
                team_id = team_insert_result[0]
            except pg.errors.UniqueViolation:
                conn.rollback()
                cursor.execute('select id from teams where name = (%s)', (name,))
                team_search_result = cursor.fetchone()
                team_id = team_search_result[0]
            cursor.execute(relation_insert, (player_id, team_id, year))
            conn.commit()
                

conn.commit()
cursor.close()
conn.close()

        
