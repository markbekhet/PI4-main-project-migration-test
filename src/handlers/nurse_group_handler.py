from src.dao.contract_dao import ContractDao, Contract
from src.dao.nurse_dao import NurseDao
from src.dao.user_dao import UserDao
from src.dao.nurse_group_dao import NurseGroupDao
from src.handlers.user_handler import verify_token
from src.models.nurse_group import NurseGroup
from src.exceptions.contract_exceptions import ContractNotExist
from src.utils.contracts_validator import ContractsValidator
from src.exceptions.nurse_exceptions import NurseNotFound, NurseGroupNotFound
from constants import nurse_group_name

"""
Before inserting or updating a nurse group:
1- Verify that the contracts that in the group don't contradict each other
2- For each nurse in the nurse group verify that their direct contracts nor
the contracts coming from other groups contradict the contracts in this group
"""


class NurseGroupHandler:
    def __init__(self, mongo):
        self.nurse_group_dao = NurseGroupDao(mongo)
        self.nurse_dao = NurseDao(mongo)
        self.user_dao = UserDao(mongo)
        self.contract_dao = ContractDao(mongo)

    def verify_nurse_group_contracts(self, json):
        nurse_group = NurseGroup().from_json(json)
        nurse_group_merged_contract = Contract()
        nurse_group_merged_contract.name = f"{nurse_group.name} contract"
        contract_validator = ContractsValidator()
        for contract_name in nurse_group.contracts:
            contract_dict = self.contract_dao.find_by_name(contract_name)
            if contract_dict is None:
                raise ContractNotExist(contract_name)
            contract = Contract().from_json(contract_dict)
            contract_validator.add_contract_constraints(contract)
            nurse_group_merged_contract.merge_contract_constraints(contract)
        return nurse_group, nurse_group_merged_contract

    def verify_group_combination_with_nurses(
        self, nurse_group, nurse_group_merged_contract: Contract
    ):
        for nurse_name in nurse_group.nurses:
            nurse_group_contract_copy = nurse_group_merged_contract.copy()
            nurse_contract_validator = ContractsValidator()
            nurse_contract_validator.add_contract_constraints(
                nurse_group_contract_copy
            )
            nurse_dict = self.nurse_dao.find_by_username(nurse_name)
            if nurse_dict is None:
                raise NurseNotFound(nurse_name)

    def verify_nurse_group_is_valid(self, json):
        (
            nurse_group,
            nurse_group_merged_contract,
        ) = self.verify_nurse_group_contracts(json)
        self.verify_group_combination_with_nurses(
            nurse_group, nurse_group_merged_contract
        )
        return nurse_group

    def add(self, token, json):
        verify_token(token, self.user_dao)
        nurse_group = self.verify_nurse_group_is_valid(json)
        self.nurse_group_dao.insert_one_if_not_exist(nurse_group.db_json())

    def update(self, token, json):
        verify_token(token, self.user_dao)
        nurse_group = self.verify_nurse_group_is_valid(json)
        self.nurse_group_dao.update(nurse_group.db_json())

    def get_all(self, token):
        verify_token(token, self.user_dao)
        return self.nurse_group_dao.fetch_all()

    def get_all_names(self, token):
        return [
            nurse_group[nurse_group_name]
            for nurse_group in self.get_all(token)
        ]

    def delete(self, token, name):
        verify_token(token, self.user_dao)
        self.nurse_group_dao.remove(name)

    def get_by_name(self, token, name):
        verify_token(token, self.user_dao)
        nurse_group_dict = self.nurse_group_dao.find_by_name(name)
        if nurse_group_dict is None:
            raise NurseGroupNotFound(name)
        nurse_group = NurseGroup().from_json(nurse_group_dict)
        return nurse_group.to_json()
