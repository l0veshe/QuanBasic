import jqdatasdk as jq
import datetime
from pymongo import MongoClient

jq.auth('15804268950','3834259hanK')
print(jq.get_query_count())

"""
**Table: share_flo**

---

##### stock_a_db['share_flo'].find_one()

```python
{'_id': ObjectId('5d5f4f3492600ddf9285d516'),
 'index': '000001.XSHE',
 'share_flow': 8258245083.0, # 流通股(单位 股)
 'day': '2019-08-01'}
```
"""

client = MongoClient('127.0.0.1', 27017)
stock_a_db = client["stock_a"]


def get_real_share(stock):
    # 10大流通股东加和
    #print(stock._name)
    merge_df = jq.finance.run_query(jq.query(jq.finance.STK_SHAREHOLDER_FLOATING_TOP10).filter(
        jq.finance.STK_SHAREHOLDER_FLOATING_TOP10.code == stock._name).limit(10))
    merge_df.groupby('end_date', as_index=False)
    share = merge_df.drop_duplicates(
        subset='company_id', keep='first', inplace=False)['share_number'].sum()
    #print(stock._name, share)
    return share

all_stocks_name = jq.get_all_securities()
date_str = datetime.datetime.now().strftime("%Y-%m-01")
share_flow = all_stocks_name.apply(lambda stock: get_real_share(stock), axis=1).to_frame(name='share_flow')
share_flow['day'] = date_str
stock_a_db['share_flo'].insert_many(share_flow.reset_index().to_dict(orient = 'records'))


