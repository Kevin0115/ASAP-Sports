import datetime


class ASAPObject:
# TODO or add a JSON Decoder class that can handle these objects

    def __to_json(self, d):
        for k in list(d.keys()):
            if isinstance(k, str) and ("token" in k or "password" in k):
                del d[k]
            elif isinstance(d[k], datetime.datetime):
                d[k] = d[k].strftime('%A, %B %d, %Y %I:%M %p')
            elif isinstance(d[k], ASAPObject):
                print('ASAPObject', d[k])
                d[k] = d[k].to_json()
            elif isinstance(d[k], list) or isinstance(d[k], set):
                d[k] = [
                    x.to_json() if isinstance(x, ASAPObject) else
                    self.__to_json(x) if isinstance(x, dict) else
                    x for x in d[k]
                ]
            elif isinstance(d[k], dict):
                d[k] = self.__to_json(d[k])
        return d

    def to_json(self):
        return self.__to_json(self.__dict__)
