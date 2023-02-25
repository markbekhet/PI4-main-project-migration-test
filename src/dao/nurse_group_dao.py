from src.dao.abstract_dao import AbstractDao
from constants import (
    nurse_group_name,
    mongo_id_field,
    mongo_set_operation,
    mongo_all_operation,
    nurse_group_nurses_list,
    nurse_group_contracts_list
)
from pymongo.collection import Collection
from src.cpp_utils.nurse_group import NurseGroup
from src.exceptions.nurse_exceptions import (
    NurseGroupAlreadyExist
)


class NurseGroupDao(AbstractDao):
    def __init__(self, mongo):
        super().__init__(mongo)
        self.collection: Collection = \
            self.db.nurse_groups

    def insert_one_if_not_exist(self, nurse_group):
        exist = self.exist(
            nurse_group[nurse_group_name]
        )
        if exist is True:
            raise NurseGroupAlreadyExist(
                nurse_group[nurse_group_name])
        self.collection.insert_one(nurse_group)

    def find_nurse_group_by_name(self, name):
        return self.collection.find_one(
            {nurse_group_name: name},
            {mongo_id_field: 0}
        )

    def exist(self, name):
        nurse_group = self.find_nurse_group_by_name(
            name
        )
        return nurse_group is not None

    def get_nurse_groups_with_contracts(self, contracts):
        cursor = self.collection.find(
            {nurse_group_contracts_list:
                {mongo_all_operation: contracts}},
            {mongo_id_field: 0}
        )
        nurse_groups = []
        for nurse_group in cursor:
            nurse_group = (NurseGroup().
                           from_json(nurse_group))
            nurse_groups.append(
                nurse_group.to_json()
            )
        return nurse_groups

    def get_nurse_groups_with_nurses(self, nurses):
        cursor = self.collection.find(
            {nurse_group_nurses_list:
                {mongo_all_operation: nurses}},
            {mongo_id_field: 0}
        )
        nurse_groups = []
        for nurse_group in cursor:
            nurse_group = (NurseGroup().
                           from_json(nurse_group))
            nurse_groups.append(nurse_group.to_json())
        return nurse_groups

    def fetch_all(self):
        cursor = self.collection.find(
            {},
            {mongo_id_field: 0}
        )
        nurse_groups = []
        for nurse_group in cursor:
            nurse_group = (NurseGroup().
                           from_json(nurse_group))
            nurse_groups.append(nurse_group.to_json())

        return nurse_groups

    def update_nurse_group(self, nurse_group):
        self.collection.find_one_and_update(
            {nurse_group_name: nurse_group[
                nurse_group_name]},
            {mongo_set_operation: nurse_group}
        )

    def remove_nurse_group(self, name):
        self.collection.find_one_and_delete(
            {nurse_group_name: name}
        )
