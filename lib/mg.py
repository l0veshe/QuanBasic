from pymongo import MongoClient

try:
    stock_a_db
except:
    client = MongoClient('127.0.0.1', 27017)
    stock_a_db = client["stock_a"]


def list_collection_names():
    for collection in stock_a_db.list_collection_names():
        print("表: " + collection)

