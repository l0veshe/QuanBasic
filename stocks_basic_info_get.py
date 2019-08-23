from pymongo import MongoClient
import jqdatasdk as jq
from lib.jq import JQ
from lib.mg import stock_a_db, list_collection_names
import datetime
from lib.basic_func import get_real_share
"""
更新个股信息
"""


if __name__ == '__main__':
    jqc = JQ()
    jq = jqc.jq
    # show tables
    list_collection_names()

    #
    all_stocks_name = jq.get_all_securities().head(1)
    all_stocks_name['update_date'] = datetime.datetime.now().strftime("%Y-%m-%d")


    print(all_stocks_name)





