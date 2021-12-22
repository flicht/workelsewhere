import requests
from time import sleep
import json
from tqdm import tqdm

TELEPORT_URL = "https://api.teleport.org/api/urban_areas"

all_data = {}


def get_urban_areas():

    appendage = "?embed={ua:images,ua:scores}"



    data = requests.get(TELEPORT_URL).json()
    for city_url in tqdm(data['_links']['ua:item']):
        try:
            city_data = {}
            # sleep(0.1)
            city_response = requests.get(city_url['href'] + appendage).json()
            city_data['scores'] = city_response['_embedded']['ua:scores']['categories']
            city_data['workelswhere_score'] = city_response['_embedded']['ua:scores']['teleport_city_score']
            city_data['summary'] = city_response['_embedded']['ua:scores']['summary']
            city_data['bounding_box'] = city_response['bounding_box']
            city_data['continent'] = city_response['continent']
            city_data['full_name'] = city_response['full_name']
            city_data['is_government_partner'] = city_response['is_government_partner']
            city_data['mayor'] = city_response.get('mayor')
            city_data['name'] = city_response['name']
            city_data['slug'] = city_response['slug']
            city_data['teleport_city_url'] = city_response['teleport_city_url']
            city_data['ua_id'] = city_response['ua_id']
            city_data['image'] = city_response['_embedded']['ua:images']['photos'][0]['image']

            all_data[city_response['slug']] = city_data

        except KeyError as e:
            print(e)
            print(city_url)

    
    with open('all_data.json', 'w+') as f:
        json.dump(all_data, f, indent=4)







def main():
    get_urban_areas()


if __name__ == "__main__":
    main()