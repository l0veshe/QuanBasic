import numpy as np
import pandas as pd
from lib.jq import JQ
jq = JQ().jq

def get_real_share(stock: pd.tseries):
    """
    :param stock:  pandas.series
    :return:
    """
    merge_df = jq.finance.run_query(jq.query(jq.finance.STK_SHAREHOLDER_FLOATING_TOP10).filter(
        jq.finance.STK_SHAREHOLDER_FLOATING_TOP10.code == stock._name).limit(10))
    merge_df.groupby('end_date', as_index=False)
    share = merge_df.drop_duplicates(
        subset='company_id', keep='first', inplace=False)['share_number'].sum()
    r_share = stock['share'] - float(share)
    return r_share

def get_share(stock: pd.tseries):
    # 取所有发行数量
    all_share = jq.get_fundamentals(jq.query(jq.valuation).filter(jq.valuation.code == stock._name), date=stock['date'])[
                    'circulating_cap'] * 10000
    return float(all_share)
