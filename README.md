### Brasileirão 2020 - 2023

Essa API fornece as relações entre os times e jogadores que em algum momento atuaram na Série A entre os anos de 2020 e 2023, com dados coletados a partir do site da CBF.
</br>
URL BASE: <code>https://brasileirao-2020-2023.cyclic.cloud</code> </br>
Por enquanto há 5 maneiras de acessar essas informações:

<ul>
<li><b>Jogadores</b>:</br>
</tab> a partir de <code>/jogadores</code> se obtêm o nome, a idade (data de nascimento (formato date)) e o link para a página de cada jogador no site da CBF. Se <code>/jogadores?page=[numero]</code> os resultados são paginados em 50 entradas. Sem parâmetros, retorna todos os resultados. </br> Retorna um objeto no formato: </br>
</tab> <i>[{"id":numero,"name":"nome do time","link":"[pagina de atleta da cbf]", "birthday":"YYYY-MM-DDT00:00.000Z"}, ...]</i>
<li><b>Times</b>:</br>
</tab> a partir de <code>/times</code> se obtêm os times que estiveram no campeonato dentro do período e seus Estados de origem. Não aceita parâmetros de rota ou de busca.  </br>Retorna um objeto no formato: </br>
</tab> <i>[{"id":numero,"name":"nome do time","state":"UF"}, ...]</i>
<li><b>Equipe por ano</b>:</br>
</tab> a partir de <code>/equipe</code> se obtêm jogadores que compuseram a equipe em determinado ano. Parâmetros de busca devem seguir o formato: <code>/equipe?nome=[time]&ano=[ano]</code>. o parmâmetro <code>nome</code> não faz distinção entre maiúsculas e minúsculas, mas sim com acentuação, e aceita espaços.  </br>Retorna um objeto no formato: </br>
</tab> <i>[{"name": "nome do jogador", "birthday": "YYYY-MM-DDT00:00.000Z", "link":"[pagina de atleta da cbf]"}, ...]</i>
<li><b>Histórico de um time</b>:</br>
</tab> a partir de <code>/historico-time</code> se obtêm jogadores que compuseram a equipe em cada ano. Parâmetros de busca devem seguir o formato: <code>/historico-time?nome=[time]</code>. o parmâmetro <code>nome</code> não faz distinção entre maiúsculas e minúsculas, mas sim com acentuação, e aceita espaços.  </br>Retorna um objeto no formato: </br>
</tab> <i>{"2020":["nomes"],"2021":["nomes"],"2022":["nomes"],"2023":["nomes"],"name":"nome do time"}</i>
<li><b>Histórico de um jogador</b>:</br>
</tab> a partir de <code>/historico-jogador</code> se obtêm os times dos quais um jogador fez parte nos últimos 4 anos (se na Série A). Parâmetros de busca devem seguir o formato: <code>/historico-jogador?nome=[jogador]</code>. o parmâmetro <code>nome</code> não faz distinção entre maiúsculas e minúsculas, mas sim com acentuação, e aceita espaços.  </br>Retorna um objeto no formato: </br>
</tab> <i>{"2020":["time"],"2021":["time"],"2022":["time"],"2023":["time"],"name":"nome do jogador"}</i>
</ul>

Caso o a contagem de times ou jogadores seja diferente de 1 para o valor informado em endpoints que permitem busca, é retornada mensagem de erro correspondente.
