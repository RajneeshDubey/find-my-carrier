import numpy as np
import pgeocode
from .rate_card import *
import pandas as pd
import pickle
from sklearn.preprocessing import StandardScaler
from datetime import timedelta, date

filename = '/Users/r0d025j/Documents/IMD/GT22/find-my-carrier/recommendationEngine/mlCore/finalized_model.sav'
def connectToModel(fromPincode, toPincode, weight, delivery_req):
    input_data={}
    if (len(fromPincode) == 4):
        source = '0'+source
    if (len(toPincode) == 4):
        source = '0'+source
    dist = pgeocode.GeoDistance('US')
    distance=dist.query_postal_code(fromPincode, toPincode)
    print(distance)
    #input_data['from_address']=fromPincode
    #input_data['to_addresss']=toPincode
    input_data['weight']=weight
    input_data['distance']=distance
    input_data['delivery_req']=delivery_req
    carrier_types = {'FEDEX': ['OVERNIGHT','FEDEX_GROUND','EXPRESS_SAVER'], 'UPS': ['UPS_EXPRESS_CRITICAL','WORLDWIDE_EXPRESS_SAVER'],'DHL':['SAMEDAY_JETLINE','DHL_GROUND']}
    i='0'
    for key in carrier_types:
        for type in carrier_types[key]:
                shipping_cost, model_cost, otd, rating = calculate_prize(distance, weight, key, type, delivery_req)
                input_data['shipping_cost_'+i]=shipping_cost
                input_data['rating_'+i]=rating
                input_data['otd_'+i]=otd
                i=int(i)+1
                i=str(i)        
    return input_data
            
def predict_output(fromPincode, toPincode, weight, delivery_req):
    output=connectToModel(fromPincode, toPincode, weight, delivery_req)
    data=[]
    row2=[output['weight'],output['distance'],output['delivery_req'],output['rating_0'],output['rating_1'],output['rating_2'],output['rating_3'],output['rating_4'],output['rating_5'],output['rating_6'],output['otd_0'],output['otd_1'],output['otd_2'],output['otd_3'],output['otd_4'],output['otd_5'],output['otd_6'],output['shipping_cost_0'],output['shipping_cost_1'],output['shipping_cost_2'],output['shipping_cost_3'],output['shipping_cost_4'],output['shipping_cost_5'],output['shipping_cost_6']]
    data.append(row2)
    outdf= pd.DataFrame (data, columns = ['weight',
    'distance',
    'delivery_req',
    'rating_0',
    'rating_1',
    'rating_2',
    'rating_3',
    'rating_4',
    'rating_5',
    'rating_6',
    'otd_0',
    'otd_1',
    'otd_2',
    'otd_3',
    'otd_4',
    'otd_5',
    'otd_6',
    'shipping_cost_0',
    'shipping_cost_1',
    'shipping_cost_2',
    'shipping_cost_3',
    'shipping_cost_4',
    'shipping_cost_5',
    'shipping_cost_6'])

    x = date.today()
    X_train = pd.read_csv('/Users/r0d025j/Documents/IMD/GT22/find-my-carrier/recommendationEngine/mlCore/X_train_data.csv')
    scaler = StandardScaler()
    scaler.fit(X_train)
    outdf=pd.DataFrame(scaler.transform(outdf), index=outdf.index, columns=outdf.columns)
    loaded_model = pickle.load(open(filename, 'rb'))
    prediction=loaded_model.predict(outdf)
    decision = loaded_model.decision_function(outdf)
    decision = np.round(decision, 2)
    print(decision)
    l=[{'Name': 'FEDEX_EXPRESS_SAVER', 'cost': output['shipping_cost_2'], 'delivery_date': x+ timedelta(days=3),'confidence':decision[0][2]},{'Name': 'FEDEX_FEDEX_GROUND', 'cost': output['shipping_cost_1'],'delivery_date': x+ timedelta(days=2),'confidence':decision[0][3]},{'Name': 'FEDEX_OVERNIGHT', 'cost': output['shipping_cost_0'], 'delivery_date': x+ timedelta(days=1),'confidence':decision[0][4]},{'Name': 'UPS_WORLDWIDE_EXPRESS_SAVER', 'cost': output['shipping_cost_4'], 'delivery_date': x+ timedelta(days=3),'confidence':decision[0][6]},{'Name': 'DHL_SAMEDAY_JETLINE', 'cost': output['shipping_cost_5'], 'delivery_date': x+ timedelta(days=2),'confidence':decision[0][1]}]
    #dic={"FEDEX_EXPRESS_SAVER": [decision[0][2],output['shipping_cost_2'],x+ timedelta(days=3)],"FEDEX_FEDEX_GROUND":[decision[0][3],output['shipping_cost_1'],x+ timedelta(days=2)],"FEDEX_OVERNIGHT":[decision[0][4],output['shipping_cost_0'],x+ timedelta(days=1)]}
    #print(sorted(l, key=lambda x: x.get('confidence'), reverse=True))
    return sorted(l, key=lambda x: x.get('confidence'), reverse=True)
#print(predict_output('39442','99678',12,1))