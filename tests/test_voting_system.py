import pytest
from brownie import network, accounts, exceptions
from scripts.deploy import deploy_voting_system
from scripts.helpful_scripts import get_account, GAS_PRICE

def test_vote():
    # Arrange
    account = get_account()
    voting_system = deploy_voting_system()
    # Act
    tx = voting_system.vote("Jan", "Kowalski", "00223390432", "Kandydat 1", {"from": account, "gas_price": GAS_PRICE})
    tx.wait(1)
    # Assert
    assert voting_system.candidates("Kandydat 1")[1] == 1 
    assert voting_system.voters("00223390432")[4] == False
        # voting_system.candidates("Kandydat 1") - returs a struct with 2 fields - (name, receivedVotes), so by indexing [1] we can access the number of votes

def test_vote_twice():
    # Arrange
    account = get_account()
    voting_system = deploy_voting_system()
    # Act
    tx1 = voting_system.vote("Jan", "Kowalski", "00223390432", "Kandydat 1", {"from": account, "gas_price": GAS_PRICE})
    tx1.wait(1)
    # Assert
    assert voting_system.candidates("Kandydat 1")[1] == 1  
    with pytest.raises(exceptions.VirtualMachineError): tx2 = voting_system.vote("Jan", "Kowalski", "00223390432", "Kandydat 1", {"from": account, "gas_price": GAS_PRICE})

def test_finish_voting():
    # Arrange
    account = get_account()
    voting_system = deploy_voting_system()
    # Act
    tx1 = voting_system.finishElection({"from": account, "gas_price": GAS_PRICE})
    tx1.wait(1)
    # Assert
    assert voting_system.electionOpen() == False
    with pytest.raises(exceptions.VirtualMachineError): voting_system.vote("Jan", "Kowalski", "00223390432", "Kandydat 1", {"from": account, "gas_price": GAS_PRICE})

def test_finish_voting_by_unauthorised_account():
    # Arrange
    voting_system = deploy_voting_system()
    unauthourized_account = get_account(index=2)
    # Act
    # Assert
    with pytest.raises(exceptions.VirtualMachineError): voting_system.finishElection({"from": unauthourized_account, "gas_price": GAS_PRICE})
    assert voting_system.electionOpen() == True

def test_determine_winner():
    # Arrange
    owner = get_account()
    voting_system = deploy_voting_system()
    account = get_account(index=2)
    # Act
    tx1 = voting_system.vote("Jan", "Kowalski", "00223390432", "Kandydat 1", {"from": account, "gas_price": GAS_PRICE})
    tx1.wait(1)
    tx2 = voting_system.vote("Ludwik", "Montgommery", "93031065465", "Kandydat 2", {"from": account, "gas_price": GAS_PRICE})
    tx2.wait(1)
    tx3 = voting_system.vote("Halina", "Nowak", "90022074332", "Kandydat 1", {"from": account, "gas_price": GAS_PRICE})
    tx3.wait(1)
    tx4 = voting_system.finishElection({"from": owner, "gas_price": GAS_PRICE})
    tx4.wait(1)
    # Assert
    assert voting_system.listOfCandidates(0)[1] == 2
    assert voting_system.listOfCandidates(1)[1] == 1
    assert voting_system.listOfCandidates(2)[1] == 0

def test_return_votes_value():
    # Arrange
    account = get_account()
    voting_system = deploy_voting_system()
    # Act
    tx1 = voting_system.vote("Jan", "Kowalski", "00223390432", "Kandydat 1", {"from": account, "gas_price": GAS_PRICE})
    tx1.wait(1)
    tx2 = voting_system.vote("Ludwik", "Montgommery", "93031065465", "Kandydat 2", {"from": account, "gas_price": GAS_PRICE})
    tx2.wait(1)
    tx3 = voting_system.vote("Halina", "Nowak", "90022074332", "Kandydat 1", {"from": account, "gas_price": GAS_PRICE})
    tx3.wait(1)
    # Assert 
    assert voting_system.votesValue("Kandydat 1") == 2
    assert voting_system.votesValue("Kandydat 2") == 1
    assert voting_system.votesValue("Kandydat 3") == 0