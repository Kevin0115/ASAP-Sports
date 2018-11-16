from . import utils


class DatabaseConnectionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.
        request.db_conn = utils.get_connection()

        try:
            response = self.get_response(request)
            if response.status_code - (response.status_code % 100) == 500:
                request.db_conn.rollback()
            else:
                request.db_conn.commit()
        except Exception as e:
            request.db_conn.rollback()
            raise e
        finally:
            request.db_conn.close()

        # Code to be executed for each request/response after
        # the view is called.

        return response