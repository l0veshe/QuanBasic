from pymongo import MongoClient
import jqdatasdk as jq
import datetime
import pandas as pd
import sys

"""
开盘日收盘后执行

"""

jq.auth('15804268950', '3834259hanK')
print(jq.get_query_count())

client = MongoClient('127.0.0.1', 27017)
stock_a_db = client["stock_a"]
print("~~~~ [所有表] ~~~~~~~~~~~~~~~~~~~~~~~~~~~")
for table in stock_a_db.list_collection_names():
    print("表: " + table)

date_str = datetime.datetime.now().strftime("%Y-%m-%d")
trade_days = jq.get_trade_days(start_date=date_str, end_date=None, count=None)
if trade_days and trade_days[0].strftime("%Y-%m-%d") == date_str:
    print("开盘日:", date_str)
else:
    sys.exit()

# stocks_hourly 股票小时行情
# securities 所有标的物
# stocks_hourly = stock_a_db['stocks_hourly']

all_stocks_name = jq.get_all_securities()

all_stocks_name_list = list(all_stocks_name.index)
# 取得股本情况
basic_stocks_plus_1 = jq.get_fundamentals(
    jq.query(jq.valuation).filter(jq.valuation.code.in_(all_stocks_name_list)), date=date_str)
basic_stocks_plus_1 = basic_stocks_plus_1.set_index("code")[
    ['day', 'capitalization', 'circulating_cap', 'market_cap', 'circulating_market_cap', 'turnover_ratio']]
basic_stocks_plus_1['day'] = date_str
# 取股票日candle
basic_stocks_plus_2 = jq.get_price(all_stocks_name_list, start_date=date_str,
                                   end_date=date_str, frequency='1d').major_xs(date_str)
# 合并
stock_basic = pd.merge(all_stocks_name, basic_stocks_plus_1, left_index=True, right_index=True, how='outer')
stock_basic = pd.merge(stock_basic, basic_stocks_plus_2, left_index=True, right_index=True, how='outer')

# 查询10大流通股
date_month_st = datetime.datetime.now().strftime("%Y-%m-01")
mongo_re = list(stock_a_db.share_flo.find({'index': {'$in': all_stocks_name_list}, 'day': date_month_st}))
sf_df = pd.DataFrame(mongo_re, columns=['index', 'share_flow'])
sf_df.set_index('index', inplace=True)
stock_basic = pd.merge(stock_basic, sf_df, left_index=True, right_index=True, how='outer')

# 计算可能换手率，流通股本换手率，以及全股本换手率
stock_basic['r_change'] = stock_basic['volume'] / (stock_basic['circulating_cap'] - stock_basic['share_flow']) / 100
stock_basic['c_change'] = stock_basic['volume'] / stock_basic['circulating_cap'] / 100
stock_basic['change'] = stock_basic['volume'] / stock_basic['capitalization'] / 100
# stock_basic[['change', 'c_change', 'r_change']]
# stock_basic.fillna(0,inplace=True)
# stock_basic.replace(np.inf,0,inplace=True)
# stock_basic[stock_basic['r_change']< 1000] [['r_change']]
# stock_basic[['display_name', 'change', 'c_change', 'r_change']].sort_values('r_change', ascending=False)

stock_basic = stock_basic.reset_index()
stock_a_db['securities'].insert_many(stock_basic.to_dict(orient='recordes'))
