import datetime


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
            d[k] = v.strftime('%A, %B %d, %Y %I:%M %p')
        else:
            d[k] = __r_json(d[k])
    return d


class ASAPObject:

    def __to_dict(self, d):
        for k in d:
            if type(k) is str and "token" in k or "password" in k:
                del d[k]
            else:
                d[k] = self.__to_dict(d[k])
        return d

    def __to_json(self, d):
        for k, v in d.items():
            if type(k) is str and "token" in k or "password" in k:
                del d[k]
            elif type(v) is datetime.datetime:
                d[k] = v.strftime('%A, %B %d, %Y %I:%M %p')
            else:
                d[k] = self.__to_json(d[k])
        return d

    def to_dict(self):
        return self.__to_dict(self.__dict__)

    def to_json(self):
        return self.__to_json(self.__dict__)