
""" Исключения """


class BaseServiceException(Exception):
    """ Базовый класс исключений """
    code = 0


class UnexpectedResultFromMicroService(BaseServiceException):
    """ Не удалось выполнить задачу с помощью микро-сервиса """
    code = 1