import datetime


class ASAPObject:
# TODO or add a JSON Decoder class that can handle these objects
# TODO Facebook ID

    def __to_json(self, d):
        for k in list(d.keys()):
            if isinstance(k, str) and "token" in k or "password" in k:
                del d[k]
            elif isinstance(d[k], datetime.datetime):
                d[k] = d[k].strftime('%A, %B %d, %Y %I:%M %p')
            elif isinstance(d[k], dict):
                d[k] = self.__to_json(d[k])
            # TODO check if subclass of ASAPObject
        return d

    def to_json(self):
        return self.__to_json(self.__dict__)
