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
# TODO or add a JSON Decoder class that can handle these objects
# TODO Facebook ID

    def __to_json(self, d):
        for k in list(d.keys()):
            if type(k) is str and "token" in k or "password" in k:
                del d[k]
            elif type(d[k]) is datetime.datetime:
                d[k] = d[k].strftime('%A, %B %d, %Y %I:%M %p')
            elif type(d[k]) is dict:
                d[k] = self.__to_json(d[k])
            # TODO check if subclass of ASAPObject
        return d

    def to_json(self):
        return self.__to_json(self.__dict__)
