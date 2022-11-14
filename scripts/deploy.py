from scripts.helpful_scripts import get_account, GAS_PRICE
from brownie import VotingSystem, config, network

def deploy_voting_system():
    account = get_account()
    voting_system = VotingSystem.deploy({"from":account, "gas_price": GAS_PRICE}, publish_source=config["networks"][network.show_active()].get("verify"))
    print(f"Contract deployed to {voting_system.address}")
    return voting_system

def print_active_network():
    print(network.show_active())
    print(config["networks"][network.show_active()].get("verify"))

def main():
    # print_active_network()
    deploy_voting_system()