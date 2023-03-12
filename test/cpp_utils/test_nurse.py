from src.models.nurse import Nurse
from unittest import TestCase
from constants import (
    nurse_name,
    nurse_username,
    nurse_contracts,
    nurse_id,
    profile,
    nurse_contract_groups,
)
from test_constants import profile1


class TestNurse(TestCase):
    def setUp(self) -> None:
        self.nurse_without_contract = {
            nurse_name: "nurse",
            nurse_username: "nurse",
            profile: profile1,
            nurse_contract_groups: [],
        }

    def tearDown(self) -> None:
        pass

    def test_nurse_creation_without_contracts_gets_nurse_with_empty_contract(
        self,
    ):
        nurse = Nurse().from_json(self.nurse_without_contract)
        self.assertEqual([], nurse.direct_contracts)

    def test_nurse_db_json(self):
        nurse = Nurse().from_json(self.nurse_without_contract)
        actual_db_json = nurse.db_json()
        expected = self.nurse_without_contract.copy()
        expected[nurse_contracts] = []
        expected[nurse_id] = None
        self.assertEqual(expected, actual_db_json)
