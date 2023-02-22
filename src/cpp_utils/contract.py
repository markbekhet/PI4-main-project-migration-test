from typing import Type, List

from src.cpp_utils.jsonify import Jsonify
from src.cpp_utils.constraints import (
    ContractConstraint, ContractIntegerConstraint,
    ContractBooleanConstraint, ContractMinMaxConstraint,
    ContractIntegerShiftConstraint, ContractMinMaxShiftConstraint,
    ContractUnwantedPatterns, ContractAlternativeShift)

from constants import (
    number_of_free_days_after_shift,
    total_weekends_in_four_weeks, min_max_consecutive_weekends,
    min_max_consecutive_shift_type,
    min_max_num_assignments_in_four_weeks,
    identical_shift_during_weekend,
    complete_weekends, alternative_shift,
    unwanted_pattern, constraint_name,
    contract_name, contract_constraints, contract_skills
)


class ContractConstraintCreator:
    def __init__(self):
        self.dict_contract_constraints: dict[str,
                                             Type[ContractConstraint]] = {
            number_of_free_days_after_shift: ContractIntegerShiftConstraint,
            total_weekends_in_four_weeks: ContractIntegerConstraint,
            min_max_consecutive_shift_type: ContractMinMaxShiftConstraint,
            min_max_consecutive_weekends: ContractMinMaxConstraint,
            min_max_num_assignments_in_four_weeks: ContractMinMaxConstraint,
            identical_shift_during_weekend: ContractBooleanConstraint,
            complete_weekends: ContractBooleanConstraint,
            alternative_shift: ContractAlternativeShift,
            unwanted_pattern: ContractUnwantedPatterns
        }

    def create_contact_constraint(self, data) -> ContractConstraint:
        return (self.dict_contract_constraints[data[constraint_name]]().
                from_json(data))


class Contract(Jsonify):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.name = ""
        self.constraints: List[ContractConstraint] = []
        self.skills = []

    def from_json(self, data: dict):
        contract = Contract()

        contract.name = data[contract_name]
        contract.skills = data[contract_skills]

        constraint_creator = ContractConstraintCreator()
        for constraint in data[contract_constraints]:
            contract.constraints.append(
                constraint_creator.create_contact_constraint(constraint)
            )
        return contract

    def to_json(self):
        array_constraints = [constraint.to_json() for constraint
                             in self.constraints]
        return {
            contract_name: self.name,
            contract_skills: self.skills,
            contract_constraints: array_constraints
        }

    def merge_contract_constraints(self, another_contract):
        self.constraints.extend(another_contract.constraints)
