import requests



def get_country(Country):

    url = "https://corona.lmao.ninja/v2/countries/" + Country +"?yesterday&strict&query "
    response = requests.request("GET", url)
    response = response.json()
    result = dict((i, response[k]) for i, k in (('Cases: ','cases'), ('Deaths: ','deaths'), ('Recovered: ','recovered'), ('Active: ','active'), ('Critical: ','critical'), ('Cases per One Million: ','casesPerOneMillion'), ('Deaths per One Million: ','deathsPerOneMillion'), ('Tests: ','tests'), ('Tests per One Million: ','testsPerOneMillion'), ('Population: ','population')))
    return result
