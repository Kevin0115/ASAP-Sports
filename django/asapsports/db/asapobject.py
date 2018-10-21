import datetime
import json


def __r_dict(d):
    for k in d:
        if type(k) is str and "token" in k or "password" in k:
            del d[k]
        else:
            d[k] = __r_dict(d[k])
    return d


def __r_json(d):
    for k, v in d.items():
        if type(k) is str and "token" in k or "password" in k:
            del d[k]
        elif type(v) is datetime.datetime:
            d[k] = v.strftime('%Y-%m-%d %H-%M')
        else:
            d[k] = __r_json(d[k])
    return d

class ASAPObject:
    def to_dict(self):
        return __r_dict(self.__dict__)


    def to_json(self):
        return json.dumps(__r_json(self.__dict__))