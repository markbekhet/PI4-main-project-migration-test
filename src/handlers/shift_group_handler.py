from src.dao.shift_group_dao import ShiftGroup
from constants import shift_group_name, work, rest, contract_name
from src.exceptions.shift_exceptions import (
    ShiftNotExist,
    CannotDeleteDefaultShiftGroup,
    CannotDeleteShiftGroup,
)
from src.handlers.base_handler import BaseHandler


class ShiftGroupHandler(BaseHandler):
    def __init__(self, mongo):
        super().__init__(mongo)

    def verify_shifts_exist(self, shifts, profile):
        not_exist_shifts = []
        for shift in shifts:
            exist_shift = self.shift_dao.exist(shift, profile)
            exist_shift_type = self.shift_type_dao.exist(shift, profile)
            if exist_shift is False and exist_shift_type is False:
                not_exist_shifts.append(shift)
        if len(not_exist_shifts) > 0:
            raise ShiftNotExist(not not_exist_shifts)

    def add(self, token, json):
        super().add(token, json)
        shift_group = ShiftGroup().from_json(json)
        shifts = []
        shifts.extend(shift_group.shifts)
        shifts.extend(shift_group.shift_types)
        self.verify_shifts_exist(shifts, shift_group.profile)
        self.shift_group_dao.insert_one_if_not_exist(shift_group.db_json())

    def update(self, token, json):
        super().update(token, json)
        shift_group = ShiftGroup().from_json(json)
        shifts = []
        shifts.extend(shift_group.shifts)
        shifts.extend(shift_group.shift_types)
        self.verify_shifts_exist(shifts, shift_group.profile)
        self.shift_group_dao.update(shift_group.db_json())

    def delete(self, token, name, profile):
        super().delete(token, name, profile)
        if name == work or name == rest:
            raise CannotDeleteDefaultShiftGroup(name)
        usage = [
            contract[contract_name]
            for contract in self.contract_dao.get_including_shifts(
                [name], profile
            )
        ]
        if len(usage) > 0:
            raise CannotDeleteShiftGroup(name, usage)
        self.shift_group_dao.remove(name, profile)

    def get_all(self, token, profile):
        super().get_all(token, profile)
        return self.shift_group_dao.fetch_all(profile)

    def get_by_name(self, token, name, profile):
        super().get_by_name(token, name, profile)
        shift_group_dict = self.shift_group_dao.find_by_name(name, profile)
        if shift_group_dict is None:
            raise ShiftNotExist(name)
        return ShiftGroup().from_json(shift_group_dict).to_json()

    def get_all_names(self, token, profile):
        return [
            shift_group[shift_group_name]
            for shift_group in self.get_all(token, profile)
        ]
