
""" Микро-сервис для работы с каталогом товаров

"""

from envi import SuitApplication
from controllers import UiController, ApiController


application = SuitApplication()
application.route("/api/<action>/", ApiController)

application.route("/", UiController)
application.route("/<action>/", UiController)
application.route("/<action>/<item_id>/", UiController)

application.route_static("static", "/var/www/static/")



