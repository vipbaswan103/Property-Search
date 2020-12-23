import requests
import json

# prop_details = {
#     "searchString":
#         {
#             # Medhurst Way, Oxford OX4
#             "name": "Medhurst Way, Oxford",
#             "administrative": "England",
#             "county": "Oxfordshire",
#             "country": "England",
#             "postcode": "OX4"
#         },
#     "added": "7",
#         "minimum_beds": "0",
#         "maximum_beds": "10",
#         "maximum_price": "5000000",
#         "minimum_price": "0",
#         "radius": "10",
#         "page_number": 1,
#         "page_size": 100,
#         "auction": False,
#         "cash_only": False,
#         "georgian": False,
#         "good_views": False,
#         "growth_zones": False,
#         "high_yield": False,
#         "hmo": False,
#         "holiday_let": False,
#         "investment_portfolio": False,
#         "needs_modernisation": False,
#         "new_build": False,
#         "plot": False,
#         "quick_sale": False,
#         "reduced_price": False,
#         "relisted": False,
#         "repossessed": False,
#         "short_lease": False,
#         "tenanted": False,
#         "sort_by": "most_reduced"
# }


def fill_keywords(prop_details):
    prop_details['keywords'] = []
    if prop_details['auction'] == True:
        prop_details['keywords'].append('auction')
    if prop_details['cash_only'] == True:
        prop_details['keywords'].append('cash buyers only')
    if prop_details['georgian'] == True:
        prop_details['keywords'].append('georgian')
    if prop_details['good_views'] == True:
        prop_details['keywords'].append('view')
    if prop_details['hmo'] == True:
        prop_details['keywords'].append('hmo')
    if prop_details['holiday_let'] == True:
        prop_details['keywords'].append('holiday let')
    if prop_details['investment_portfolio'] == True:
        prop_details['keywords'].append('portfolio')
    if prop_details['needs_modernisation'] == True:
        prop_details['keywords'].append('modernised')
        prop_details['keywords'].append('need of modernisation')
    if prop_details['new_build'] == True:
        prop_details['keywords'].append('new build')
        prop_details['keywords'].append('off plan')
    if prop_details['plot'] == True:
        prop_details['keywords'].append('plot')
        prop_details['keywords'].append('land')
    if prop_details['quick_sale'] == True:
        prop_details['keywords'].append('priced to sell')
    if prop_details['repossessed'] == True:
        prop_details['keywords'].append(
            'now in receipt of an offer for the sum of')
    if prop_details['short_lease'] == True:
        prop_details['keywords'].append('short lease')
    if prop_details['tenanted'] == True:
        prop_details['keywords'].append('tenant in situ')
    # prop_details['keywords'] = json.dumps(prop_details['keywords'])
    return prop_details


def search_properties(prop_details):
    print(prop_details)
    # print(type(prop_details))
    prop_details = fill_keywords(prop_details)
    # print(type(prop_details))
    query_json = {}
    query_json['area'] = prop_details['searchString']['name']

    if 'administrative' in prop_details['searchString']:
        query_json['administrative'] = prop_details['searchString']['administrative']

    if 'county' in prop_details['searchString']:
        query_json['county'] = prop_details['searchString']['county']
    query_json['country'] = prop_details['searchString']['country']
    query_json['postcode'] = prop_details['searchString']['postcode']
    query_json['minimum_beds'] = prop_details['minimum_beds']
    query_json['maximum_beds'] = prop_details['maximum_beds']
    query_json['maximum_price'] = prop_details['maximum_price']
    query_json['minimum_price'] = prop_details['minimum_price']
    query_json['radius'] = prop_details['radius']
    query_json['page_number'] = prop_details['page_number']
    query_json['page_size'] = prop_details['page_size']

    if(prop_details['property_type'] != 'showAll'):
        query_json['property_type'] = prop_details['property_type']

    query_json['keywords'] = '[%27' + \
        '%27,%27'.join(prop_details['keywords']) + '%27]'
    query_string = '&'.join('{}={}'.format(key, value)
                            for key, value in query_json.items())
    query_string = query_string.replace(' ', '%20')
    url = 'https://api.zoopla.co.uk/api/v1/property_listings.js?api_key=j4g48ysr6sf7pu4fv9rhxqkf&' + query_string
    print(url)
    search_output = requests.get(url).json()
    # print(type(search_output))
    # search_output = search_output.json()
    return search_output

# info about average values of properties in the area, value ranges, value trends, average home values,
# zoopla apis used:
# average_area_sold_prices, area_value_graphs, local_info_graphs
# output : home_values_graph_url, value_trend_graph_url, value_ranges_graph_url, average_values_graph_url
# average_sold_price_1year, average_sold_price_3year, average_sold_price_5year, average_sold_price_7year,
# number_of_sales_1year, number_of_sales_3year, number_of_sales_5year, number_of_sales_7year
# education_graph_url(school performance), council_tax_graph_url(council tax charges),
# crime_graph_url(crime incidents), people_graph_url(population breakdown)


def get_local_nbrhood_details(prop_details):
    prop_details = fill_keywords(prop_details)
    query_json = {}
    result_json = {}
    query_json['area'] = prop_details['searchString']['name']
    query_json['country'] = prop_details['searchString']['country']
    if 'administrative' in prop_details['searchString']:
        query_json['administrative'] = prop_details['searchString']['administrative']

    if 'county' in prop_details['searchString']:
        query_json['county'] = prop_details['searchString']['county']
    query_json['postcode'] = prop_details['searchString']['postcode']
    query_json['radius'] = '1'
    query_json['output_type'] = 'outcode'
    query_json['size'] = 'medium'
    query_json['include_sold'] = '1'
    query_json['page_size'] = prop_details['page_size']
    query_json['keywords'] = prop_details['keywords']
    if(prop_details['property_type'] != 'showAll'):
        query_json['property_type'] = prop_details['property_type']
    query_string = '&'.join('{}={}'.format(key, value)
                            for key, value in query_json.items())
    query_string = query_string.replace(' ', '%20')
    url = 'https://api.zoopla.co.uk/api/v1/property_listings.js?api_key=j4g48ysr6sf7pu4fv9rhxqkf&' + query_string
    # print(url)
    x = requests.get(url)
    props = x.json()

    similar_sold_props = [x for x in props['listing'] if x['status'] == 'sold']
    similar_for_sale = [x for x in props['listing']
                        if x['status'] == 'for_sale']

    query_string_to_rent = query_string+'&listing_status=rent'
    url = 'https://api.zoopla.co.uk/api/v1/property_listings.js?api_key=j4g48ysr6sf7pu4fv9rhxqkf&' + \
        query_string_to_rent

    props = requests.get(url).json()
    similar_for_rent = [x for x in props['listing']
                        if x['status'] == 'to_rent']

    result_json['similar_sold_props'] = similar_sold_props
    result_json['similar_for_sale'] = similar_for_sale
    result_json['similar_for_rent'] = similar_for_rent

    query_json['area'] = query_json['postcode']
    query_string = '&'.join('{}={}'.format(key, value)
                            for key, value in query_json.items())
    query_string = query_string.replace(' ', '%20')
    url = 'https://api.zoopla.co.uk/api/v1/average_area_sold_price.js?api_key=j4g48ysr6sf7pu4fv9rhxqkf&' + query_string
    average_area_sold_price = requests.get(url).json()
    url = 'https://api.zoopla.co.uk/api/v1/local_info_graphs.js?api_key=j4g48ysr6sf7pu4fv9rhxqkf&' + query_string
    local_info_graphs = requests.get(url).json()
    url = 'https://api.zoopla.co.uk/api/v1/area_value_graphs.js?api_key=j4g48ysr6sf7pu4fv9rhxqkf&' + query_string
    area_value_graphs = requests.get(url).json()
    result_json.update(average_area_sold_price)
    result_json.update(local_info_graphs)
    result_json.update(area_value_graphs)
    return result_json


if __name__ == "__main__":
    details = get_local_nbrhood_details(prop_details)
    for key, val in details.items():
        if key[0:7] != 'similar':
            print(key, ':', val)
        else:
            print(key+'['+str(len(val))+'] = ', end='')
            print(val)
