import random

def calculate_prize(distance, weight, carrier, service_type, delivery_req):
    price = 0
    distance_multiplier = 1/150
    weight_multiplier = 1
    base_fare = 0
    rating = 0
    otd = 0
    delivery_time = 0
    if (carrier == 'FEDEX' and service_type == 'OVERNIGHT' and delivery_req in [1,2]):
        # distance_multiplier = 1/100
        # weight_multiplier = 1.5
        base_fare = 65
        rating = 10
        otd = 0.99
        delivery_time = 1
    elif (carrier == 'FEDEX' and service_type == 'FEDEX_GROUND' and delivery_req in [1,2]):
        # distance_multiplier = 1/150
        # weight_multiplier = 1
        base_fare = 36
        rating = 10
        otd = 0.99
        delivery_time = 2
    elif (carrier == 'FEDEX' and service_type == 'EXPRESS_SAVER' and delivery_req in [1,2,3]):
        # distance_multiplier = 1/150
        # weight_multiplier = 1
        base_fare = 21
        rating = 10
        otd = 0.97
        delivery_time = 3
    elif (carrier == 'UPS' and service_type == 'UPS_EXPRESS_CRITICAL' and delivery_req in [1,2]):
        # weight_multiplier = 0.96
        base_fare = 60
        rating = 7
        otd = 0.9
        delivery_time = 1
    elif (carrier == 'UPS' and service_type == 'WORLDWIDE_EXPRESS_SAVER' and delivery_req in [1,2,3]):
        # weight_multiplier = 0.97
        base_fare = 17
        rating = 6
        otd = 0.9
        delivery_time = 3
    elif (carrier == 'DHL' and service_type == 'SAMEDAY_JETLINE' and delivery_req in [1,2]):
        # weight_multiplier = 0.97
        base_fare = 33
        rating = 8
        otd = 0.96
        delivery_time = 2
    elif (carrier == 'DHL' and service_type == 'DHL_GROUND' and delivery_req in [1,2,3]):
        # weight_multiplier = 0.95
        base_fare = 21
        rating = 9
        otd = 0.97
        delivery_time = 3
    price = distance_multiplier * distance + base_fare + weight * weight_multiplier
    # cost_function = price - rating - 40*otd + 2* delivery_time
    if(delivery_req < delivery_time):
        cost_function = 9999999
    else:
        cost_function = price - (random.randrange(8, 13, 1)/10)*rating - random.randrange(36, 46, 1)*otd - 2*(delivery_req-delivery_time)
    return price, cost_function, otd, rating