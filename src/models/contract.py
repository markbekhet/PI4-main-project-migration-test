from typing import Type, List

from src.models.jsonify import Jsonify
from src.models.constraints import (
    ContractConstraint,
    ContractBooleanConstraint,
    ContractMinMaxConstraint,
    ContractIntegerShiftConstraint,
    ContractMinMaxShiftConstraint,
    ContractUnwantedPatterns,
    ContractAlternativeShift,
)

from constants import (
    number_of_free_days_after_shift,
    total_weekends_in_four_weeks,
    min_max_consecutive_weekends,
    min_max_consecutive_shift_type,
    min_max_num_assignments_in_four_weeks,
    identical_shift_during_weekend,
    complete_weekends,
    alternative_shift,
    unwanted_pattern,
    constraint_name,
    contract_name,
    contract_constraints,
    contract_shifts,
)

from src.models.db_document import DBDocument


class ContractConstraintCreator:
    def __init__(self):
        self.dict_contract_constraints: dict[str, Type[ContractConstraint]] = {
            number_of_free_days_after_shift: ContractIntegerShiftConstraint,
            total_weekends_in_four_weeks: ContractMinMaxConstraint,
            min_max_consecutive_shift_type: ContractMinMaxShiftConstraint,
            min_max_consecutive_weekends: ContractMinMaxConstraint,
            min_max_num_assignments_in_four_weeks: ContractMinMaxConstraint,
            identical_shift_during_weekend: ContractBooleanConstraint,
            complete_weekends: ContractBooleanConstraint,
            alternative_shift: ContractAlternativeShift,
            unwanted_pattern: ContractUnwantedPatterns,
        }

    def create_contact_constraint(self, data) -> ContractConstraint:
        return self.dict_contract_constraints[
            data[constraint_name]
        ]().from_json(data)


class Contract(Jsonify, DBDocument):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.name = ""
        self.constraints: List[ContractConstraint] = []
        self.shifts = []

    def from_json(self, data: dict):
        contract = Contract()

        contract.name = data.setdefault(contract_name, "")
        constraint_creator = ContractConstraintCreator()
        constraints = data.setdefault(contract_constraints, [])
        for constraint in constraints:
            new_constraint = constraint_creator.create_contact_constraint(
                constraint
            )
            contract.constraints.append(new_constraint)
            shifts = new_constraint.get_shift()
            for shift in shifts:
                if shift not in contract.shifts:
                    contract.shifts.append(shift)

        return contract

    def to_json(self):
        array_constraints = [
            constraint.to_json() for constraint in self.constraints
        ]
        return {
            contract_name: self.name,
            contract_constraints: array_constraints,
        }

    def db_json(self):
        basic_json = self.to_json()
        basic_json[contract_shifts] = self.shifts
        return basic_json

    def merge_contract_constraints(self, another_contract):
        self.constraints.extend(another_contract.constraints)

    def copy(self):
        return Contract().from_json(self.to_json())
