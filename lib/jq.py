import jqdatasdk as jq

class JQ:

    def __init__(self):
        self.accounts = [['15804268950', '3834259hanK', None]]
        self.jq = jq
        self.auth()


    def auth(self):
        for account in self.accounts:
            self.jq.auth(account[0], account[1])
            query_count = self.jq.get_query_count()
            if query_count['total'] - query_count['spare'] > 10000:
                continue


