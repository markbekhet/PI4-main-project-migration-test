from src.dao.shift_dao import ShiftDao, Shift
from src.dao.shift_type_dao import ShiftTypeDao
from src.dao.shift_group_dao import ShiftGroupDao
from src.dao.contract_dao import ContractDao
from src.handlers.base_handler import BaseHandler
from src.exceptions.shift_exceptions import CannotDeleteShift, ShiftNotExist
from constants import shift_name, work


def add_shift_in_work_shift_group(
    name, shift_group_dao: ShiftGroupDao, profile
):
    shift_group_dao.add_shift_to_shift_group_list(work, name, profile)


def remove_shift_from_work_shift_group(
    name, shift_group_dao: ShiftGroupDao, profile
):
    shift_group_dao.delete_shift_from_shift_group_list(work, name, profile)


class ShiftHandler(BaseHandler):
    def __init__(self, mongo):
        super().__init__(mongo)
        self.shift_dao = ShiftDao(mongo)
        self.shift_type_dao = ShiftTypeDao(mongo)
        self.shift_group_dao = ShiftGroupDao(mongo)
        self.contract_dao = ContractDao(mongo)

    def add(self, token, json):
        super().add(token, json)
        shift = Shift().from_json(json)
        self.shift_dao.insert_one_if_not_exist(shift.db_json())
        add_shift_in_work_shift_group(
            shift.name, self.shift_group_dao, shift.profile
        )

    def update(self, token, json):
        super().update(token, json)
        shift = Shift().from_json(json)
        self.shift_dao.update(shift.db_json())

    def delete(self, token, name, profile):
        super().delete(token, name, profile)
        usage = []
        usage.extend(self.contract_dao.get_including_shifts([name], profile))
        usage.extend(self.shift_type_dao.get_including_shifts([name], profile))
        usage.extend(
            self.shift_group_dao.get_including_shifts([name], profile)
        )
        if len(usage) > 1:
            raise CannotDeleteShift(name)
        self.shift_dao.remove(name, profile)
        remove_shift_from_work_shift_group(name, self.shift_group_dao, profile)

    def get_by_name(self, token, name, profile):
        super().get_by_name(token, name, profile)
        shift_dict = self.shift_dao.find_by_name(name, profile)
        if shift_dict is None:
            raise ShiftNotExist(name)
        return Shift().from_json(shift_dict).to_json()

    def get_all(self, token, profile):
        super().get_all(token, profile)
        return self.shift_dao.fetch_all(profile)

    def get_all_names(self, token, profile):
        return [shift[shift_name] for shift in self.get_all(token, profile)]
