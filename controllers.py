""" Контроллеры сервиса """

import json
from envi import Controller, Request, template
from exceptions import *


def microservice(url: str, data: dict, target_key: str=None):
    """ Функция для работы с микросервисами
    :param url: URL микросервиса
    :param data: Данные для передачи в микросервис
    :param target_key: Ключ, который необходимо вернуть из ответа микросервиса
    :return:
    """
    import json
    import requests
    # noinspection PyBroadException
    try:
        r = requests.post(url, json=data)
    except:
        raise UnexpectedResultFromMicroService("Не удалось выполнить запрос")
    if r.status_code == 200:
        try:
            result = json.loads(r.text)
        except:
            raise UnexpectedResultFromMicroService("Сервер вернул: %s" % r.text)

        if result.get("error"):
            raise UnexpectedResultFromMicroService(
                "Ошибка %s: %s" % (result["error"].get("code"), result["error"].get("message"))
            )

        if target_key:
            if result.get(target_key) is not None:
                return result.get(target_key)
            else:
                raise UnexpectedResultFromMicroService("В ответе не найден ожидаемый ключ")
        else:
            return result
    else:
        raise UnexpectedResultFromMicroService("Не удалось выполнить запрос")


class UiController(Controller):
    """ Контроллер """
    default_action = "feed"

    @staticmethod
    @template("views.feed")
    def feed(request: Request, *args, **kwargs):
        """
        :param request:
        :param args:
        :param kwargs:
        """
        return {
            "items": microservice("http://catalog-api/get_bestsellers", {"quantity": 8}, "items"),
            "categories": microservice("http://catalog-api/get_categories", {}, "categories")
        }

    @staticmethod
    @template("views.edit")
    def new(request: Request, *args, **kwargs):
        """
        :param request:
        :param args:
        :param kwargs:
        """
        return {
            "categories": microservice("http://catalog-api/get_categories", {}, "categories"),
            "attributes": microservice("http://catalog-api/get_attributes", {}, "attributes")
        }

    @staticmethod
    @template("views.edit")
    def edit(request: Request, *args, **kwargs):
        """
        :param request:
        :param args:
        :param kwargs:
        """
        return {
            "item": microservice("http://catalog-api/get_item", {"item_id": request.get("item_id")}, "item"),
            "categories": microservice("http://catalog-api/get_categories", {}, "categories"),
            "attributes": microservice("http://catalog-api/get_attributes", {}, "attributes")
        }


class ApiController(Controller):
    """ Контроллер для ajax-запросов """

    @staticmethod
    def crop(request: Request, *args, **kwargs):
        """ Обрезает загруженное изображение
        :param request:
        :param args:
        :param kwargs:
        :return:
        """
        payload = {"base64": request.get("img"), "coords": request.get("coords"), "from_size": request.get("from_size")}
        cropped_base64 = microservice("http://img/crop", payload, "base64")
        resized_base64_400 = microservice("http://img/scale", {"base64": cropped_base64, "size": 400}, "base64")
        return {"url": microservice("http://s3/upload", {'base64': resized_base64_400}, "url")}

    @staticmethod
    def upload(request: Request, *args, **kwargs):
        """ Загружает изображение в облако и возвращает URL
        :param request:
        :param args:
        :param kwargs:
        :return:
        """
        if request.get("size", False):
            size = int(request.get("size"))
            resized_base64 = microservice("http://img/scale", {"base64": request.get("img"), "size": size}, "base64")
            return {
                "url_%s" % size: microservice("http://s3/upload", {'base64': resized_base64}, "url")
            }
        else:
            resized_base64_800 = microservice("http://img/scale", {"base64": request.get("img"), "size": 800}, "base64")
            resized_base64_400 = microservice("http://img/scale", {"base64": resized_base64_800, "size": 400}, "base64")
            return {
                "url_800": microservice("http://s3/upload", {'base64': resized_base64_800}, "url"),
                "url_400": microservice("http://s3/upload", {'base64': resized_base64_400}, "url")
            }

    @staticmethod
    def save(request: Request, *args, **kwargs):
        """ Сохраняет запись
        :param request:
        :param args:
        :param kwargs:
        :return:
        """
        item_data = {
            "id": request.get("id", False),
            "title": request.get("title", False),
            "article": request.get("article", False),
            "tags": request.get("tags", False),
            "categories": request.get("categories", False),
            "body": request.get("body", False),
            "short": request.get("short", False),
            "imgs": request.get("imgs", []),
            "cost": request.get("cost", 0),
            "quantity": request.get("quantity", 0),
            "attributes": request.get("attributes", [])
        }
        return {"item_id": microservice("http://catalog-api/save", item_data, "item_id")}

    @staticmethod
    def delete_item(request: Request, *args, **kwargs):
        """ Удаляет запись
        :param request:
        :param args:
        :param kwargs:
        :return:
        """
        return microservice("http://catalog-api/delete", {"id": request.get("id", False)}, "result")

    @staticmethod
    def create_category(request: Request, *args, **kwargs):
        """ Создает новую рубрику в блоге
        :param request:
        :param args:
        :param kwargs:
        :return:
        """
        payload = {"category_name": request.get("category_name", False)}
        return {"categories": microservice("http://catalog-api/create_category", payload, "categories")}