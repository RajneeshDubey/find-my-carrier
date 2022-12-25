import csv
import pgeocode
import pandas as pd
import random
import math
from rate_card import *

# package_type not needed
# weight and volumetric modified at request level.

#columns = ['from_address','to_addresss', 'package_type' , 'weight', 'volumetric_weight', 'distance', 'shipping_cost', 'rating', 'OTD', 'carrier_serviceType']
columns = ['from_address','to_addresss', 'weight', 'distance', 'delivery_req', 'shipping_costs', 'ratings', 'otds', 'best_shipping_cost', 'carrier_ServiceType']
data_dump = []

dist = pgeocode.GeoDistance('US')
# dist.query_postal_code("01021", "05602")

zipcodes = []
with open(r'./postal_codes.txt', 'r') as fp:
    for line in fp:
        # remove linebreak from a current name
        # linebreak is the last character of each line
        x = line[:-1]

        # add current item to the list
        zipcodes.append(x)

unserviceable_zip_codes = zipcodes
# first shuffle
random.shuffle(unserviceable_zip_codes)
unserviceable_zip_codes = unserviceable_zip_codes[1:math.floor(len(zipcodes)/20)]
print(zipcodes)
carrier_types = {'FEDEX': ['OVERNIGHT','FEDEX_GROUND','EXPRESS_SAVER'], 'UPS': ['UPS_EXPRESS_CRITICAL','WORLDWIDE_EXPRESS_SAVER'],'DHL':['SAMEDAY_JETLINE','DHL_GROUND']}

count = 0
for source in zipcodes:
    if (len(source) == 4):
        source = '0'+source
    for destination in zipcodes:
        if (count == 100000000000):
            break
        if (len(destination) == 4):
            destination = '0'+destination
        row_data = []
        distance = dist.query_postal_code(source, destination)
        weight = random.randrange(1, 10000, 1)/100
        delivery_req = random.randrange(1, 4, 1)
        prices = []
        otds = []
        ratings = []
        best_carrier = ''
        best_service_type = ''
        best_shipping_cost = 1000000
        cost = 100000000

        for key in carrier_types:
            for type in carrier_types[key]:
                shipping_cost, model_cost, otd, rating = calculate_prize(distance, weight, key, type, delivery_req)
                # print (model_cost)
                if ( model_cost < cost):
                    cost = model_cost
                    best_carrier = key
                    best_service_type = type
                    best_shipping_cost = shipping_cost
                prices.append(shipping_cost)
                ratings.append(rating)
                otds.append(otd)
        if (source in unserviceable_zip_codes or destination in unserviceable_zip_codes):
            shipping_cost, model_cost, otd, rating = calculate_prize(distance, weight, 'FEDEX', 'FEDEX_GROUND', delivery_req)
            best_carrier = 'FEDEX'
            best_service_type = 'FEDEX_GROUND'
            best_shipping_cost = shipping_cost


        row_data.append(source)
        row_data.append(destination)
        row_data.append(weight)
        row_data.append(distance)
        row_data.append(delivery_req)
        row_data.append(prices)
        row_data.append(ratings)
        row_data.append(otds)
        row_data.append(best_shipping_cost)
        row_data.append(best_carrier+'_'+best_service_type)
        data_dump.append(row_data)
        count+=1
        print('.') 

print(data_dump)


my_df = pd.DataFrame(data_dump)
my_df.to_csv('./data_dump_40k_exp4.csv', index=False, header=columns)
print('Done')
    


