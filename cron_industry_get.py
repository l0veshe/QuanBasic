from pymongo import MongoClient
import jqdatasdk as jq
import datetime
import pandas as pd
from dateutil import parser

jq.auth('15804268950', '3834259hanK')
print(jq.get_query_count())

"""
"""

client = MongoClient('127.0.0.1', 27017)
stock_a_db = client["stock_a"]

# 概念板块
concepts = jq.get_concepts()
concepts['type'] = 'concept'
concepts = concepts.reset_index()
concepts.columns = ['code', 'cname', 'start_date', 'type']

industry_stock = {}


def reset_industry(industry):
    stocks = jq.get_concept_stocks(industry.code)
    for one_stock in stocks:
        if one_stock in industry_stock:
            industry_stock[one_stock].append(industry.cname)
        else:
            industry_stock[one_stock] = []
            industry_stock[one_stock].append(industry.cname)
    return stocks


# 板块 concepts

# 股票-板块 industry_stock
# industry_stock_list = [{'index': index, 'stock':stocks} for is in industry_stock]
industry_stock_list = [{'index': ins, 'stock': industry_stock[ins]} for ins in industry_stock]
industry_stock_df = pd.DataFrame(industry_stock_list)

stock_a_db.industry_stock.delete_many({})
stock_a_db.industry.delete_many({})

stock_a_db.industry_stock.insert_many(industry_stock_df.to_dict(orient='recordes'))
stock_a_db.industry.insert_many(concepts.to_dict(orient='recordes'))
