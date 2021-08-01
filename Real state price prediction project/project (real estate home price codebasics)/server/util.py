import json
import pickle
import numpy as np

__location = None
__data_columns = None
__model = None


def get_estimated_price(location, area_sqft, bedrooms, bath):
    # here __model is our trained model
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index = -1      # -1 = __data_columns.index('other')
    x = np.zeros(len(__data_columns))
    x[0], x[1], x[2] = area_sqft, bath, bedrooms
    x[loc_index] = 1

    return round(__model.predict([x])[0],2)


def get_location_names():
    return __location


def load_saved_artifacts():
    print('Loading saved artifacts.....start')
    global __data_columns
    global __location
    global __model

    with open("./artifacts/columns.json", 'r') as f:
        __data_columns = json.load(f)['data_columns']
        __location = __data_columns[3:]

        with open("./artifacts/banglore_home_price_model.pickle", 'rb') as f_model:
            __model = pickle.load(f_model)
        print('Loading saved artifacts ... done')


if __name__ == '__main__':
    load_saved_artifacts()
    print(get_location_names())
    print(get_estimated_price('1st Phase JP Nagar', 1000, 3, 3))
    print(get_estimated_price('1st Phase JP Nagar', 1000, 2, 2))
    print(get_estimated_price('panchgaon', 1000, 3, 3))
    print(get_estimated_price('Ejipura', 1000, 2, 2))


